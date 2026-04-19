"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    /** Delay before the animation starts */
    delay?: number;
    /** The HTML element to render (defaults to span) */
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Premium text reveal animation.
 * Text slides up from behind a mask with blur, 
 * creating a refined editorial entrance effect.
 */
export function TextReveal({
    children,
    className = "",
    delay = 0,
    as: Component = "div",
}: TextRevealProps) {
    const MotionComponent = motion(Component);

    return (
        <div className="overflow-hidden">
            <MotionComponent
                initial={{
                    y: "100%",
                    opacity: 0,
                    filter: "blur(4px)",
                }}
                whileInView={{
                    y: "0%",
                    opacity: 1,
                    filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                    duration: 0.7,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={className}
            >
                {children}
            </MotionComponent>
        </div>
    );
}

interface WordRevealProps {
    text: string;
    className?: string;
    /** Delay before the first word starts */
    delay?: number;
    /** Delay between each word */
    wordDelay?: number;
}

/**
 * Word-by-word staggered reveal.
 * Each word enters individually, creating a reading-pace animation.
 */
export function WordReveal({
    text,
    className = "",
    delay = 0,
    wordDelay = 0.04,
}: WordRevealProps) {
    const words = text.split(" ");

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: wordDelay,
                delayChildren: delay,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={containerVariants}
            className={className}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}
