"use client";
import React from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";

export function ResultCard({
  data,
}: {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
}) {
  return (
    <Link href={`/${data.user.username}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ x: 4 }}
        className="w-full flex gap-x-4 p-4 rounded-xl border border-[#2a3142] hover:border-cyan-500/50 transition-all duration-300 bg-[#1a1d2e]/40 backdrop-blur-sm group"
      >
        <div className="relative h-[9rem] w-[16rem] flex-shrink-0 rounded-lg overflow-hidden">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer group-hover:text-cyan-400 transition truncate">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export function ResultCardSkeleton() {
  return (
    <div className="w-full flex gap-x-4 p-4 rounded-xl border border-[#2a3142] bg-[#1a1d2e]/40">
      <div className="relative h-[9rem] w-[16rem] flex-shrink-0 rounded-lg overflow-hidden">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}
