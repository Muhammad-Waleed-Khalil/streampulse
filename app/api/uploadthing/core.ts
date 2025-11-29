import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

const uploadthing = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: uploadthing({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await currentUser();

      if (!self || !self.username) {
        throw new Error("Unauthorized");
      }

      const user = await db.user.findUnique({
        where: {
          externalUserId: self.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return { user };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      await db.stream.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
