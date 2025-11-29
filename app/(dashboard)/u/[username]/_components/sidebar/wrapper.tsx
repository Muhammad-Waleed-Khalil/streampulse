"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

export function Wrapper({ children }: { children: React.ReactNode }) {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside
      className={cn(
        "z-50 fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#1a1d2e]/80 backdrop-blur-xl border-r border-[#2a3142] shadow-lg",
        collapsed && "lg:w-[70px]"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </aside>
  );
}
