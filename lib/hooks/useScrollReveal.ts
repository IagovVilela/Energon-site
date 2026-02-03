import { useRef } from "react";
import { useInView } from "framer-motion";

interface UseScrollRevealOptions {
    once?: boolean;
    margin?: string;
    amount?: number | "some" | "all";
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
    const {
        once = true,
        margin = "-100px",
        amount = 0.3,
    } = options;

    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        margin: margin as any,
        amount
    });

    return { ref, isInView };
}
