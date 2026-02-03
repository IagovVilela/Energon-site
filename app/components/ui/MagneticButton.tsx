"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { stiffSpring } from "@/lib/animations";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    strength?: number;
}

export function MagneticButton({
    children,
    className = "",
    href,
    onClick,
    strength = 0.3
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * strength;
        const distanceY = (e.clientY - centerY) * strength;

        setPosition({ x: distanceX, y: distanceY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const motionProps = {
        ref: ref as any,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        animate: position,
        transition: stiffSpring,
        whileTap: { scale: 0.95 },
        className,
    };

    if (href) {
        return (
            <motion.a href={href} {...motionProps}>
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button onClick={onClick} {...motionProps}>
            {children}
        </motion.button>
    );
}
