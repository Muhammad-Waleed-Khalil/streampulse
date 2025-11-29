import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="relative">
        <Image src="/StreamPulseLogo.png" alt="StreamPulse" height="120" width="120" />
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">StreamPulse</p>
        <p className="text-sm text-muted-foreground">Live. Stream. Connect.</p>
      </div>
    </div>
  );
}
