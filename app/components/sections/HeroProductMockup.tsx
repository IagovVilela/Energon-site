"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { getHeroProjectSlides, type HeroProject } from "@/lib/hero-projects";
import { cn } from "@/lib/utils";

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

export function HeroProductMockup({ projects }: { projects: HeroProject[] }) {
  const { t } = useLanguage();
  const slides = getHeroProjectSlides(projects);
  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    setTilt({ x, y });
  };

  const active = slides[index];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto min-w-0"
    >
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative overflow-hidden"
        style={{ transform: prefersReducedMotion ? undefined : `rotateY(${tilt.x}deg)` }}
      >
        <div className="relative border border-border bg-card shadow-xl">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface-elevated/80">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-2 h-2 rounded-full bg-border" />
            <span className="w-2 h-2 rounded-full bg-border" />
            <span className="ml-auto editorial-label text-[10px] truncate max-w-[55%]">
              {active?.title ?? t("hero.visual.label")}
            </span>
          </div>

          <div className="relative aspect-[16/10] bg-muted overflow-hidden">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <SlideImage src={active.imageUrl} alt={active.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
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
        </div>

        <div className="mx-auto mt-1 h-2.5 w-[88%] rounded-b-md bg-gradient-to-b from-border to-muted/80" />
        <div className="mx-auto h-1.5 w-[96%] rounded-b bg-muted/60" />
      </motion.div>

      {slides.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative shrink-0 w-14 h-9 border overflow-hidden transition-colors",
                i === index ? "border-primary" : "border-border opacity-60 hover:opacity-100"
              )}
              aria-label={slide.title}
            >
              <SlideImage src={slide.imageUrl} alt={slide.title} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
