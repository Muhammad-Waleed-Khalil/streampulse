import React, { Suspense } from "react";
import { Metadata } from "next";

import { Results, ResultsSkeleton } from "./_components/results";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="h-full p-4 md:p-8 max-w-screen-2xl mx-auto relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
