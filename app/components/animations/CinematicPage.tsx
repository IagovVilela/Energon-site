"use client";

import { ReactNode } from "react";
import { ScrollProgress } from "@/app/components/animations/ScrollProgress";
import { SmoothScroll } from "@/app/components/animations/SmoothScroll";

interface CinematicPageProps {
  children: ReactNode;
}

export function CinematicPage({ children }: CinematicPageProps) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      {children}
    </SmoothScroll>
  );
}
