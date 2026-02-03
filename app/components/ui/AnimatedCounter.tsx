"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: string;
    duration?: number;
}

export function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(value);

    // Extrai número do valor se houver
    const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
    const hasNumber = numericValue > 0;
    const prefix = value.match(/^[^\d]*/)?.[0] || "";
    const suffix = value.match(/[^\d]*$/)?.[0] || "";

    const spring = useSpring(0, { duration: duration * 1000 });

    useEffect(() => {
        if (isInView && hasNumber) {
            spring.set(numericValue);
        }
    }, [isInView, numericValue, spring, hasNumber]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            if (hasNumber) {
                setDisplayValue(`${prefix}${Math.floor(latest)}${suffix}`);
            }
        });

        return unsubscribe;
    }, [spring, prefix, suffix, hasNumber]);

    return (
        <span ref={ref}>
            {isInView ? displayValue : value}
        </span>
    );
}
