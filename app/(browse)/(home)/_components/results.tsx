import React from "react";

import { getStreams } from "@/lib/feed-service";
import { Skeleton } from "@/components/ui/skeleton";

import { ResultCard, ResultCardSkeleton } from "../result-card";

export async function Results() {
  const data = await getStreams();

  return (
    <div className="relative z-10">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Live Now
          </h2>
        </div>
        <p className="text-muted-foreground text-base ml-16">
          Discover amazing streams from creators around the world
        </p>
      </div>
      {data.length === 0 && (
        <div className="text-muted-foreground p-12 text-center border border-dashed border-[#2a3142] rounded-2xl bg-[#1a1d2e]/40 backdrop-blur-sm">
          <div className="text-6xl mb-4 opacity-20">📡</div>
          <p className="text-lg font-semibold mb-2">No Live Streams</p>
          <p className="text-sm">Check back later for live content</p>
        </div>
      )}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.map((result, index) => (
          <ResultCard key={result.id} data={result} index={index} />
        ))}
      </div>
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
