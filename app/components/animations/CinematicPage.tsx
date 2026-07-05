"use client";

import { ReactNode } from "react";
import { ScrollProgress } from "@/app/components/animations/ScrollProgress";
import { SmoothScroll } from "@/app/components/animations/SmoothScroll";
import { BrandJourneyProvider } from "@/app/components/brand/BrandJourneyContext";

interface CinematicPageProps {
  children: ReactNode;
}

export function CinematicPage({ children }: CinematicPageProps) {
  return (
    <BrandJourneyProvider>
      <SmoothScroll>
        <ScrollProgress />
        {children}
      </SmoothScroll>
    </BrandJourneyProvider>
  );
}
