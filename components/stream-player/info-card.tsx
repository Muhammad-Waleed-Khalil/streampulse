"use client";

import React from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { InfoModal } from "./info-modal";

export function InfoCard({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
}) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="rounded-xl bg-[#1a1d2e]/60 backdrop-blur-sm border border-[#2a3142] overflow-hidden shadow-lg">
      <div className="flex items-center gap-x-2.5 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <div className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 h-auto w-auto">
          <Pencil className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm lg:text-lg font-semibold capitalize">
            Edit your stream info
          </h2>
          <p className="text-muted-foreground text-xs lg:text-sm">
            Maximize your visibility
          </p>
        </div>
        <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
      </div>
      <Separator className="bg-[#2a3142]" />
      <div className="p-4 lg:p-6 space-y-4">
        <div>
          <h3 className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Name</h3>
          <p className="text-sm font-semibold">{name}</p>
        </div>
        <div>
          <h3 className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Thumbnail</h3>
          {thumbnailUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden w-[200px] border border-[#2a3142] shadow-md">
              <Image
                fill
                src={thumbnailUrl}
                alt={name}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
