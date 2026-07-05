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

function motionPropsForVariant(variant: SectionVariant, delay: number) {
  switch (variant) {
    case "none":
      return null;
    case "cinematic":
      return {
        initial: { y: 24, opacity: 0.85 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.55, delay, ease },
      };
    case "fade":
      return {
        initial: { opacity: 0.5 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.45, delay, ease },
      };
    case "clipReveal":
      return {
        initial: { y: 20 },
        whileInView: { y: 0 },
        transition: { duration: 0.55, delay, ease },
      };
    case "slideUp":
    default:
      return {
        initial: { y: 20 },
        whileInView: { y: 0 },
        transition: { duration: 0.5, delay, ease },
      };
  }
}

function SectionTransitionParallax({
  children,
  className = "",
  parallaxIntensity,
  variant,
  delay = 0,
}: Required<Pick<SectionTransitionProps, "children" | "parallaxIntensity">> &
  Pick<SectionTransitionProps, "className" | "variant" | "delay">) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const motionProps = motionPropsForVariant(variant ?? "slideUp", delay);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxIntensity * 40, -parallaxIntensity * 40]
  );

  if (!motionProps) {
    return (
      <motion.div ref={sectionRef} style={{ y: parallaxY }} className={className}>
        {children}
      </motion.div>
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
      style={{ y: parallaxY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTransitionPlain({
  children,
  className = "",
  variant = "slideUp",
  delay = 0,
}: SectionTransitionProps) {
  const motionProps = motionPropsForVariant(variant, delay);

  if (variant === "none" || !motionProps) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-cinematic
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      viewport={{ once: true, amount: 0.08 }}
      transition={motionProps.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTransition({
  children,
  className = "",
  parallaxIntensity = 0,
  variant = "slideUp",
  delay = 0,
}: SectionTransitionProps) {
  if (parallaxIntensity > 0) {
    return (
      <SectionTransitionParallax
        className={className}
        parallaxIntensity={parallaxIntensity}
        variant={variant}
        delay={delay}
      >
        {children}
      </SectionTransitionParallax>
    );
  }

  return (
    <SectionTransitionPlain className={className} variant={variant} delay={delay}>
      {children}
    </SectionTransitionPlain>
  );
}
