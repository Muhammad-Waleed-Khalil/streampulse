import React from "react";
import { Check } from "lucide-react";

export function VerifiedMark() {
  return (
    <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400">
      <Check className="h-[10px] w-[10px] text-white stroke-[4px]" />
    </div>
  );
}
