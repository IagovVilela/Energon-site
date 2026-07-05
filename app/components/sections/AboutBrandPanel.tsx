"use client";

import { RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/app/contexts/LanguageContext";

interface AboutBrandPanelProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function AboutBrandPanel({ sectionRef }: AboutBrandPanelProps) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const panelY = useTransform(scrollYProgress, [0, 0.45, 1], [48, 0, -32]);
  const glowY = useTransform(scrollYProgress, [0, 1], [24, -48]);
  const markScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { y: panelY }}
      className="relative mt-4 sm:mt-6 lg:mt-8 w-full min-h-[280px] sm:min-h-[340px] lg:min-h-[min(560px,calc(100vh-11rem))] flex-1"
    >
      <div className="relative h-full min-h-[inherit] border border-border bg-card/40 overflow-hidden grain-overlay">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url(/grid.svg)",
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          style={prefersReducedMotion ? undefined : { y: glowY }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-3xl rounded-full pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 pointer-events-none" />

        <div className="relative z-10 h-full min-h-[inherit] flex flex-col items-center justify-center p-8 sm:p-10">
          <motion.div
            style={prefersReducedMotion ? undefined : { scale: markScale }}
            className="relative mb-6 sm:mb-8"
          >
            <div className="absolute -inset-4 border border-primary/30 rotate-3 pointer-events-none" />
            <div className="absolute -inset-4 border border-border -rotate-3 pointer-events-none" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-primary text-primary-foreground flex items-center justify-center">
              <span className="font-display font-bold text-5xl sm:text-6xl leading-none">E</span>
            </div>
          </motion.div>

          <p className="font-display text-2xl sm:text-3xl tracking-[0.35em] text-foreground mb-3">
            ENERGON
          </p>

          <p className="editorial-label text-primary/90 text-center max-w-[14rem] sm:max-w-xs">
            {t("about.brand.tagline")}
          </p>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute top-6 left-6 editorial-label text-[9px] opacity-60">
            {t("about.brand.label")}
          </div>
          <div className="absolute bottom-6 right-6 editorial-label text-[9px] opacity-60">
            {t("about.brand.since")}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
