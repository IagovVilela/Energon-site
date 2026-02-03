"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltStrength?: number;
}

export function TiltCard({ children, className = "", tiltStrength = 10 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateXValue = -(e.clientY - centerY) / (rect.height / 2) * tiltStrength;
        const rotateYValue = (e.clientX - centerX) / (rect.width / 2) * tiltStrength;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
