"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { BorderBeam } from "@/components/magicui/border-beam";

interface HeroConfig {
  heroDescription?: string;
}

interface HeroSectionProps {
  config?: HeroConfig | null;
}

export function HeroSection({ config }: HeroSectionProps) {
  const { t } = useLanguage();
  const [showScroll, setShowScroll] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowScroll(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section className="relative bg-background border-b border-border overflow-x-clip isolate min-h-[85svh] lg:min-h-[70svh] flex flex-col">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none -z-10"
        style={{
          backgroundImage: "url(/grid.svg)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none -z-10 hidden lg:block" />

      <div className="container relative z-10 flex-1 flex flex-col justify-center pt-20 pb-12 sm:pt-24 sm:pb-14 md:pt-28 md:pb-16 max-w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center min-w-0 max-w-4xl lg:max-w-none">
          <motion.div {...fadeIn} className="min-w-0 w-full">
            <p className="editorial-label mb-3 sm:mb-4">{t("hero.badge")}</p>

            <h1 className="headline-xl w-full max-w-full mb-4 sm:mb-5 text-foreground break-words [overflow-wrap:anywhere]">
              {t("hero.title.part1")}{" "}
              <span className="text-primary">{t("hero.title.part2")}</span>{" "}
              {t("hero.title.part3")}
            </h1>

            <p className="w-full max-w-full text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed break-words [overflow-wrap:anywhere]">
              {config?.heroDescription || t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                href="#contato"
                className="group relative inline-flex h-12 sm:h-14 w-full sm:w-auto sm:min-w-[12rem] items-center justify-center px-6 sm:px-8 bg-primary text-primary-foreground font-semibold overflow-hidden text-sm sm:text-base"
              >
                <BorderBeam size={120} duration={8} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </span>
              </Link>
              <Link
                href="#portfolio"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors text-center sm:text-left"
              >
                {t("hero.viewProjects")} →
              </Link>
            </div>
          </motion.div>

          <div className="hidden lg:block relative min-h-[280px] rounded-sm border border-border/40 bg-gradient-to-br from-primary/5 via-transparent to-transparent" aria-hidden />
        </div>
      </div>

      {showScroll && (
        <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground z-10 pointer-events-none">
          <span className="editorial-label text-[10px]">{t("hero.scroll")}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      )}
    </section>
  );
}
