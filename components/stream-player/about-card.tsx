"use client";

import React from "react";

import { VerifiedMark } from "@/components/verified-mark";

import { BioModal } from "./bio-modal";

export function AboutCard({
  bio,
  followedByCount,
  hostIdentity,
  hostName,
  viewerIdentity,
}: {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "Follower" : "Followers";

  return (
    <div className="group rounded-xl bg-[#1a1d2e]/60 backdrop-blur-sm border border-[#2a3142] p-6 lg:p-10 flex flex-col gap-y-4 hover:border-cyan-500/30 transition-all duration-300 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About {hostName}
          </span>
          <VerifiedMark />
        </div>
        {isHost && <BioModal initialValue={bio} />}
      </div>
      <div className="flex items-center gap-x-2">
        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-500/30">
          <span className="font-bold text-cyan-400">{followedByCount}</span>
          <span className="text-sm text-muted-foreground ml-1">{followedByLabel}</span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {bio || "This user prefers to keep an air of mystery about them."}
      </p>
    </div>
  );
}
