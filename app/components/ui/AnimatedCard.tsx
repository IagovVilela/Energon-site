"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { fadeInUp } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
    const { ref, isInView } = useScrollReveal();
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            ref={ref}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? false : (isInView ? "visible" : "hidden")}
            variants={fadeInUp}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
