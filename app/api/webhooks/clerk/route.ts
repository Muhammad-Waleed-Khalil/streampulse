import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { resetIngresses } from "@/actions/ingress";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  try {
    // Ignore session events - they don't need database operations
    if (eventType === "session.created" || eventType === "session.removed" || eventType === "session.ended") {
      console.log(`Ignoring ${eventType} event`);
      return new Response("", { status: 200 });
    }

    if (eventType === "user.created") {
      console.log("Processing user.created event for user:", payload.data.id);

      // Skip if username is not set
      if (!payload.data.username) {
        console.log("Username not set for user:", payload.data.id);
        return new Response("Username required", { status: 400 });
      }

      console.log("Creating user in database:", payload.data.username);
      await db.user.create({
        data: {
          externalUserId: payload.data.id,
          username: payload.data.username,
          imageUrl: payload.data.image_url,
          stream: {
            create: {
              name: `${payload.data.username}'s stream`,
            },
          },
        },
      });
      console.log("User created successfully:", payload.data.username);
    }

    if (eventType === "user.updated") {
      console.log("Processing user.updated event for user:", payload.data.id);

      // Only update if username is set
      if (!payload.data.username) {
        console.log("Username not set, skipping update for user:", payload.data.id);
        return new Response("", { status: 200 });
      }

      const currentUser = await db.user.findUnique({
        where: { externalUserId: payload.data.id },
      });

      // If user doesn't exist and now has username, create them
      if (!currentUser) {
        console.log("User not found in DB, creating:", payload.data.username);
        await db.user.create({
          data: {
            externalUserId: payload.data.id,
            username: payload.data.username,
            imageUrl: payload.data.image_url,
            stream: {
              create: {
                name: `${payload.data.username}'s stream`,
              },
            },
          },
        });
        console.log("User created successfully:", payload.data.username);
      } else {
        // Update existing user
        console.log("Updating existing user:", payload.data.username);
        await db.user.update({
          where: {
            externalUserId: payload.data.id,
          },
          data: {
            username: payload.data.username,
            imageUrl: payload.data.image_url,
          },
        });
        console.log("User updated successfully:", payload.data.username);
      }
    }

    if (eventType === "user.deleted") {
      console.log("Processing user.deleted event for user:", payload.data.id);

      const userToDelete = await db.user.findUnique({
        where: { externalUserId: payload.data.id },
      });

      if (userToDelete) {
        await resetIngresses(payload.data.id);

        await db.user.delete({
          where: {
            externalUserId: payload.data.id,
          },
        });
        console.log("User deleted successfully:", payload.data.id);
      }
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    console.error("Event type:", eventType);
    console.error("Payload:", JSON.stringify(payload, null, 2));
    return new Response("Error processing webhook", { status: 500 });
  }
}
