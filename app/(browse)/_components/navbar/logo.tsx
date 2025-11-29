import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-3 hover:opacity-75 transition">
        <div className="relative mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/StreamPulseLogo.png" alt="StreamPulse" height="40" width="40" />
        </div>
        <div className={cn(font.className, "hidden lg:block")}>
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">StreamPulse</p>
          <p className="text-xs text-muted-foreground">Live. Stream. Connect.</p>
        </div>
      </div>
    </Link>
  );
}
