import React from "react";

import { Logo } from "./logo";
import { Actions } from "./actions";

export function Navbar() {
  return (
    <div className="fixed top-0 w-full h-20 z-[49] bg-[#1a1d2e]/80 backdrop-blur-xl border-b border-[#2a3142] px-2 lg:px-4 flex justify-between items-center shadow-lg shadow-black/10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
      <div className="relative z-10 flex justify-between items-center w-full">
        <Logo />
        <Actions />
      </div>
    </div>
  );
}
