"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
    children: ReactNode;
    className?: string;
    /** Speed factor: 0 = no parallax, 1 = full speed, negative = reverse */
    speed?: number;
    /** Optional horizontal parallax */
    horizontal?: boolean;
}

/**
 * A lightweight parallax layer.
 * Wraps content to move at a different rate than the scroll.
 * Use speed values between -0.5 and 0.5 for subtle, premium effects.
 */
export function ParallaxLayer({
    children,
    className = "",
    speed = 0.2,
    horizontal = false,
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const yRange = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
    const xRange = useTransform(scrollYProgress, [0, 1], [speed * 50, -speed * 50]);

    return (
        <motion.div
            ref={ref}
            style={{
                y: yRange,
                x: horizontal ? xRange : 0,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
