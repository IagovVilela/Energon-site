"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
    children: ReactNode;
    className?: string;
    /** Parallax intensity: negative = floats up on scroll, positive = sinks */
    parallaxIntensity?: number;
    /** Whether to apply the cinematic scale+blur+fade entrance */
    cinematic?: boolean;
    /** Delay before the animation starts (in seconds) */
    delay?: number;
}

/**
 * Wraps a section with a cinematic entrance animation:
 * - Scale 0.95 → 1
 * - Blur 10px → 0px
 * - Opacity 0 → 1
 * - Optional parallax on scroll
 *
 * Inspired by landonorris.com section reveals.
 */
export function SectionTransition({
    children,
    className = "",
    parallaxIntensity = 0,
    cinematic = true,
    delay = 0,
}: SectionTransitionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax: map scroll progress to a Y offset
    const parallaxY = useTransform(
        scrollYProgress,
        [0, 1],
        [parallaxIntensity * 60, -parallaxIntensity * 60]
    );

    // Subtle scale that breathes with scroll (1.02 → 1 → 0.98)
    const scrollScale = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0.98, 1, 1, 0.98]
    );

    if (!cinematic) {
        return (
            <motion.div
                ref={sectionRef}
                style={{ y: parallaxIntensity ? parallaxY : 0 }}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={sectionRef}
            initial={{
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)",
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                y: 0,
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
                y: parallaxIntensity ? parallaxY : undefined,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
