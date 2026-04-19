"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A sleek top-of-page scroll progress indicator.
 * Animates a gradient bar across the viewport top as the user scrolls.
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
            style={{
                scaleX,
                background:
                    "linear-gradient(90deg, hsl(var(--primary)), #3b82f6, #06b6d4)",
            }}
        />
    );
}
