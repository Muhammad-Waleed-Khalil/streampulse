"use client";
import React from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import { motion } from "framer-motion";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultCard({
  data,
}: {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}) {
  return (
    <Link href={`/${data.user.username}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="h-full w-full space-y-4 group"
      >
        <div className="relative rounded-xl overflow-hidden border border-[#2a3142] group-hover:border-cyan-500/50 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/20">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold group-hover:text-cyan-400 transition">
              {data.name}
            </p>
            <p className="text-muted-foreground text-xs">{data.user.username}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function ResultCardSkeleton() {
  return (
    <div className="h-full w-full space-y-4">
      <div className="rounded-xl overflow-hidden border border-[#2a3142]">
        <ThumbnailSkeleton />
      </div>
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
