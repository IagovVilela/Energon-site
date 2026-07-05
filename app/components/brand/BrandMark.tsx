"use client";

import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showFrames?: boolean;
}

const sizes = {
  sm: { box: "w-12 h-12", text: "text-2xl", frame: "-inset-2" },
  md: { box: "w-16 h-16 sm:w-20 sm:h-20", text: "text-4xl sm:text-5xl", frame: "-inset-3" },
  lg: { box: "w-24 h-24 sm:w-28 sm:h-28", text: "text-5xl sm:text-6xl", frame: "-inset-4" },
};

export function BrandMark({ size = "md", className, showFrames = true }: BrandMarkProps) {
  const s = sizes[size];

  return (
    <div className={cn("relative", className)}>
      {showFrames && (
        <>
          <div className={cn("absolute border border-primary/40 rotate-3 pointer-events-none", s.frame)} />
          <div className={cn("absolute border border-border -rotate-3 pointer-events-none", s.frame)} />
        </>
      )}
      <div
        className={cn(
          "relative bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20",
          s.box
        )}
      >
        <span className={cn("font-display font-bold leading-none", s.text)}>E</span>
      </div>
    </div>
  );
}
