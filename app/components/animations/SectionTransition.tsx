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
          initial: { opacity: 0, scale: 0.97, filter: "blur(8px)", y: 48 },
          whileInView: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
          transition: { duration: 0.9, delay, ease },
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.7, delay, ease },
        };
      case "clipReveal":
        return {
          initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          whileInView: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
          transition: { duration: 1, delay, ease },
        };
      case "slideUp":
      default:
        return {
          initial: { opacity: 0, y: 64 },
          whileInView: { opacity: 1, y: 0 },
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
      viewport={{ once: true, margin: "-10%" }}
      transition={motionProps.transition}
      style={{ y: parallaxIntensity ? parallaxY : undefined }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
