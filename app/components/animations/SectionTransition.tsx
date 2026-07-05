"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type SectionVariant = "cinematic" | "fade" | "slideUp" | "clipReveal" | "none";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  parallaxIntensity?: number;
  variant?: SectionVariant;
  delay?: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function SectionTransition({
  children,
  className = "",
  parallaxIntensity = 0,
  variant = "slideUp",
  delay = 0,
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxIntensity * 40, -parallaxIntensity * 40]
  );

  const motionProps = (() => {
    switch (variant) {
      case "none":
        return null;
      case "cinematic":
        return {
          initial: { y: 40, filter: "blur(6px)" },
          whileInView: { y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, delay, ease },
        };
      case "fade":
        return {
          initial: { opacity: 0.4 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.7, delay, ease },
        };
      case "clipReveal":
        return {
          initial: { y: 32 },
          whileInView: { y: 0 },
          transition: { duration: 1, delay, ease },
        };
      case "slideUp":
      default:
        return {
          initial: { y: 32 },
          whileInView: { y: 0 },
          transition: { duration: 0.8, delay, ease },
        };
    }
  })();

  if (variant === "none" || !motionProps) {
    return (
      <div ref={sectionRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={sectionRef}
      data-cinematic
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      viewport={{ once: true, amount: 0.08 }}
      transition={motionProps.transition}
      style={{ y: parallaxIntensity ? parallaxY : undefined }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
