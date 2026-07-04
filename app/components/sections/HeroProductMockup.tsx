"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { getHeroProjectSlides, type HeroProject } from "@/lib/hero-projects";
import { cn } from "@/lib/utils";

function SlideImage({ src, alt }: { src: string; alt: string }) {
  const isRemote = src.startsWith("http");

  if (isRemote) {
    return <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 520px" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" />
  );
}

export function HeroProductMockup({ projects }: { projects: HeroProject[] }) {
  const { t } = useLanguage();
  const slides = getHeroProjectSlides(projects);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const active = slides[index];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto [perspective:1400px]"
    >
      <div className="absolute -inset-6 bg-primary/15 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative border border-border bg-card shadow-2xl shadow-black/40"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface-elevated/80">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-2 h-2 rounded-full bg-border" />
            <span className="w-2 h-2 rounded-full bg-border" />
            <span className="ml-auto editorial-label text-[10px] truncate max-w-[55%]">
              {active?.title ?? t("hero.visual.label")}
            </span>
          </div>

          <div className="relative aspect-[16/10] bg-background overflow-hidden">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <SlideImage src={active.imageUrl} alt={active.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated">
                  <div className="w-3/4 space-y-3 p-6">
                    <div className="h-3 bg-border rounded-full w-2/3" />
                    <div className="h-3 bg-border rounded-full w-full" />
                    <div className="h-24 border border-border bg-background/50 mt-4" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div
          className="mx-auto w-[92%] h-3 bg-gradient-to-b from-border to-background border-x border-border"
          style={{ transform: "translateZ(20px) rotateX(75deg)", transformOrigin: "top center" }}
        />
        <div
          className="mx-auto w-full h-2 rounded-b-lg bg-gradient-to-b from-muted to-background border border-border"
          style={{ transform: "translateZ(8px)" }}
        />
      </motion.div>

      {slides.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative shrink-0 w-16 h-10 border overflow-hidden transition-colors",
                i === index ? "border-primary" : "border-border opacity-60 hover:opacity-100"
              )}
              aria-label={slide.title}
            >
              <SlideImage src={slide.imageUrl} alt={slide.title} />
            </button>
          ))}
        </motion.div>
      )}

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute -left-2 md:-left-10 top-1/3 font-display text-[6rem] md:text-[8rem] leading-none text-foreground/[0.04] select-none pointer-events-none"
      >
        01
      </motion.span>
    </div>
  );
}
