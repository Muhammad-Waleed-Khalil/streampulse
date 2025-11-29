"use client";

import React from "react";
import { useIsClient } from "usehooks-ts";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

export function Wrapper({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar((state) => state);
  const isClient = useIsClient();

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-60 h-full bg-[#1a1d2e]/80 backdrop-blur-xl border-r border-[#2a3142] z-50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="relative z-10">
          <ToggleSkeleton />
          <FollowingSkeleton />
          <RecommendedSkeleton />
        </div>
      </aside>
    );

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-[#1a1d2e]/80 backdrop-blur-xl border-r border-[#2a3142] z-50 shadow-lg",
        collapsed && "w-[70px]"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </aside>
  );
}
