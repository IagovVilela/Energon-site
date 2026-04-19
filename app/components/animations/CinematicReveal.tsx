"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CinematicRevealProps {
    children: ReactNode;
    className?: string;
    /** Delay before reveal starts */
    delay?: number;
    /** Duration of the reveal */
    duration?: number;
    /** Direction of the clip reveal */
    direction?: "up" | "down" | "left" | "right";
}

const getClipPath = (direction: string) => {
    switch (direction) {
        case "up":
            return {
                hidden: "inset(100% 0% 0% 0%)",
                visible: "inset(0% 0% 0% 0%)",
            };
        case "down":
            return {
                hidden: "inset(0% 0% 100% 0%)",
                visible: "inset(0% 0% 0% 0%)",
            };
        case "left":
            return {
                hidden: "inset(0% 0% 0% 100%)",
                visible: "inset(0% 0% 0% 0%)",
            };
        case "right":
            return {
                hidden: "inset(0% 100% 0% 0%)",
                visible: "inset(0% 0% 0% 0%)",
            };
        default:
            return {
                hidden: "inset(100% 0% 0% 0%)",
                visible: "inset(0% 0% 0% 0%)",
            };
    }
};

/**
 * A cinematic clip-path reveal animation.
 * The content slides in from a direction using CSS clip-path,
 * creating a wipe/curtain effect reminiscent of editorial designs.
 */
export function CinematicReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    direction = "up",
}: CinematicRevealProps) {
    const clips = getClipPath(direction);

    return (
        <motion.div
            initial={{
                clipPath: clips.hidden,
                opacity: 0.3,
            }}
            whileInView={{
                clipPath: clips.visible,
                opacity: 1,
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
