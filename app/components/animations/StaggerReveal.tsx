"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface StaggerRevealProps {
    children: ReactNode;
    className?: string;
    /** Delay between each child element */
    staggerDelay?: number;
    /** Initial delay before stagger starts */
    initialDelay?: number;
    /** Direction of the stagger entrance */
    direction?: "up" | "down" | "left" | "right";
    /** Include blur in the entrance? */
    blur?: boolean;
}

const getDirectionOffset = (direction: string) => {
    switch (direction) {
        case "up": return { x: 0, y: 30 };
        case "down": return { x: 0, y: -30 };
        case "left": return { x: 30, y: 0 };
        case "right": return { x: -30, y: 0 };
        default: return { x: 0, y: 30 };
    }
};

/**
 * Container that staggers its children's entrance animations.
 * Each direct child gets a sequential delay for a cascade effect.
 */
export function StaggerReveal({
    children,
    className = "",
    staggerDelay = 0.08,
    initialDelay = 0,
    direction = "up",
    blur = true,
}: StaggerRevealProps) {
    const offset = getDirectionOffset(direction);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: initialDelay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            x: offset.x,
            y: offset.y,
            filter: blur ? "blur(6px)" : "blur(0px)",
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className={className}
        >
            {Array.isArray(children)
                ? children.map((child, i) => (
                    <motion.div key={i} variants={itemVariants}>
                        {child}
                    </motion.div>
                ))
                : <motion.div variants={itemVariants}>{children}</motion.div>
            }
        </motion.div>
    );
}
