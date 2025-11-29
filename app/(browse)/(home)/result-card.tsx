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
  index = 0,
}: {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
  index?: number;
}) {
  return (
    <Link href={`/${data.user.username}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -12, transition: { duration: 0.2 } }}
        className="h-full w-full space-y-4 group"
      >
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#2a3142] group-hover:border-cyan-500/70 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/30">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
        </div>
        <div className="flex gap-x-3 items-center">
          <div className="relative">
            <UserAvatar
              username={data.user.username}
              imageUrl={data.user.imageUrl}
              isLive={data.isLive}
            />
            {data.isLive && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
            )}
          </div>
          <div className="flex flex-col text-sm overflow-hidden flex-1">
            <p className="truncate font-bold group-hover:text-cyan-400 transition">
              {data.name}
            </p>
            <p className="text-muted-foreground text-xs truncate">{data.user.username}</p>
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
