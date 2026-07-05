"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { getHeroProjectSlides, type HeroProject } from "@/lib/hero-projects";
import { cn } from "@/lib/utils";

const AUTO_PLAY_MS = 4500;

function SlideImage({ src, alt }: { src: string; alt: string }) {
  const isRemote = src.startsWith("http");

  if (isRemote) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 520px"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" />
  );
}

export function HeroProductMockup({
  projects,
  compact = false,
}: {
  projects: HeroProject[];
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const slides = getHeroProjectSlides(projects);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 26,
  });

  const goToSlide = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [slides.length, prefersReducedMotion, index]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const active = slides[index];

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="relative w-full max-w-xl mx-auto min-w-0"
    >
      <div className="relative overflow-hidden py-2 [perspective:1400px]">
        <div className="absolute -inset-4 bg-primary/12 blur-3xl rounded-full pointer-events-none" />

        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
          }
          className="relative"
        >
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { rotateX, rotateY, transformStyle: "preserve-3d" }
            }
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-border bg-card shadow-2xl shadow-black/30"
              style={prefersReducedMotion ? undefined : { transform: "translateZ(36px)" }}
            >
              <div className="flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-border bg-surface-elevated/80 min-w-0">
                {slides.length > 1 &&
                  slides.map((slide, i) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goToSlide(i)}
                      className={cn(
                        "rounded-full shrink-0 transition-colors",
                        slides.length > 6 ? "w-1.5 h-1.5" : "w-2 h-2",
                        i === index ? "bg-primary" : "bg-border hover:bg-muted-foreground/40"
                      )}
                      aria-label={slide.title}
                      aria-current={i === index ? "true" : undefined}
                    />
                  ))}
                <span className="ml-auto editorial-label text-[10px] truncate max-w-[50%]">
                  {active?.title ?? t("hero.visual.label")}
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-background overflow-hidden">
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <SlideImage src={active.imageUrl} alt={active.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated p-6">
                      <div className="w-full space-y-3">
                        <div className="h-3 bg-border rounded-full w-2/3" />
                        <div className="h-3 bg-border rounded-full w-full" />
                        <div className="h-20 border border-border bg-background/50 mt-2" />
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <div
              className="mx-auto mt-1.5 w-[90%] h-2.5 rounded-b-md bg-gradient-to-b from-border to-muted/80 border-x border-border"
              style={prefersReducedMotion ? undefined : { transform: "translateZ(18px)" }}
            />
            <div
              className="mx-auto w-[96%] h-1.5 rounded-b bg-muted/50"
              style={prefersReducedMotion ? undefined : { transform: "translateZ(8px)" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {slides.length > 1 && (
        <>
          <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label={t("hero.carousel.nav")}>
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                onClick={() => goToSlide(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/50"
                )}
                aria-label={slide.title}
                aria-selected={i === index}
              />
            ))}
          </div>

          {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 flex gap-2 overflow-x-auto pb-1 max-w-full"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(i)}
                className={cn(
                  "relative shrink-0 w-14 h-9 sm:w-16 sm:h-10 border overflow-hidden transition-all",
                  i === index
                    ? "border-primary ring-2 ring-primary/30 scale-105"
                    : "border-border opacity-60 hover:opacity-100"
                )}
                aria-label={slide.title}
                aria-current={i === index ? "true" : undefined}
              >
                <SlideImage src={slide.imageUrl} alt={slide.title} />
              </button>
            ))}
          </motion.div>
          )}
        </>
      )}
    </div>
  );
}
