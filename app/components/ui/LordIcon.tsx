"use client";

import React, { useEffect, useRef } from "react";

import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

// Register the custom element with the lottie-web instance
if (typeof window !== "undefined") {
    // @ts-ignore - The installed version types expect 0 arguments but runtime requires lottie instance
    defineElement(lottie.loadAnimation);
}

export type LordIconTrigger =
    | "hover"
    | "click"
    | "loop"
    | "loop-on-hover"
    | "morph"
    | "boomerang";

interface LordIconProps {
    src: string;
    trigger?: LordIconTrigger;
    colors?: {
        primary?: string;
        secondary?: string;
    };
    delay?: number;
    size?: number;
    className?: string;
}

const LordIcon = ({
    src,
    trigger = "hover",
    colors,
    delay,
    size = 24,
    className,
}: LordIconProps) => {
    const iconRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (iconRef.current) {
            const element = iconRef.current as any;

            // Handle colors if provided
            if (colors) {
                element.colors = `primary:${colors.primary},secondary:${colors.secondary}`;
            }
        }
    }, [colors]);

    return (
        <div
            className={`flex items-center justify-center ${className || ""}`}
            style={{ width: size, height: size }}
        >
            <lord-icon
                ref={iconRef}
                src={src}
                trigger={trigger}
                delay={delay}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

// Add type definition for the custom element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "lord-icon": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    src?: string;
                    trigger?: string;
                    delay?: number;
                    colors?: string;
                },
                HTMLElement
            >;
        }
    }
}

export default LordIcon;
