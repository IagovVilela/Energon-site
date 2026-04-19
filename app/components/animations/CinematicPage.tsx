"use client";

import { ReactNode } from "react";
import { ScrollProgress } from "@/app/components/animations/ScrollProgress";
import { SectionTransition } from "@/app/components/animations/SectionTransition";

interface CinematicPageProps {
    children: ReactNode;
}

/**
 * Client-side wrapper that adds:
 * - Scroll progress bar
 * - Section transition wrappers
 * - Smooth scroll behavior
 */
export function CinematicPage({ children }: CinematicPageProps) {
    return (
        <>
            <ScrollProgress />
            {children}
        </>
    );
}
