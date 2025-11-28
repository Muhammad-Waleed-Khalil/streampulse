import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return null;
  }

  if (self.username !== username) {
    return null;
  }

  return user;
};
