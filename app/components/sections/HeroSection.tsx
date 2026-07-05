"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Marquee } from "@/components/magicui/marquee";
import { HeroProductMockup } from "./HeroProductMockup";
import { HeroTrustBar } from "./HeroTrustBar";
import type { HeroProject } from "@/lib/hero-projects";

interface HeroConfig {
  heroDescription?: string;
}

interface HeroSectionProps {
  config?: HeroConfig | null;
  projects?: HeroProject[];
}

export function HeroSection({ config, projects = [] }: HeroSectionProps) {
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

  const outcomeKeys = [
    "hero.outcome1",
    "hero.outcome2",
    "hero.outcome3",
    "hero.outcome4",
    "hero.outcome5",
    "hero.outcome6",
    "hero.outcome7",
  ] as const;

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section className="relative border-b border-border overflow-x-clip isolate">
      <div className="absolute inset-x-0 top-0 h-[min(100%,720px)] bg-background pointer-events-none -z-10" />

      <div className="container relative z-10 pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 max-w-full">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 items-start min-w-0">
          <div className="min-w-0 w-full max-w-full">
            <motion.div {...fadeIn} className="min-w-0 w-full">
              <p className="editorial-label mb-3 sm:mb-4">{t("hero.badge")}</p>

              <h1 className="headline-xl w-full max-w-full mb-4 sm:mb-5 text-foreground break-words [overflow-wrap:anywhere]">
                {t("hero.title.part1")}{" "}
                <span className="text-primary">{t("hero.title.part2")}</span>{" "}
                {t("hero.title.part3")}
              </h1>

              <p className="w-full max-w-full text-base sm:text-lg text-muted-foreground mb-5 sm:mb-6 leading-relaxed break-words [overflow-wrap:anywhere]">
                {config?.heroDescription || t("hero.subtitle")}
              </p>
            </motion.div>

            {/* Mockup logo abaixo do título no celular */}
            <div className="lg:hidden mb-5 sm:mb-6 min-w-0 w-full">
              <HeroProductMockup projects={projects} />
            </div>

            <motion.div {...fadeIn} className="min-w-0 w-full">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-6">
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
                  className="inline-flex h-12 sm:h-14 w-full sm:w-auto sm:min-w-[12rem] items-center justify-center px-6 sm:px-8 border border-border font-semibold hover:border-primary hover:text-primary transition-colors text-sm sm:text-base"
                >
                  {t("hero.viewProjects")}
                </Link>
              </div>

              <div className="w-full overflow-hidden border-y border-border/50 py-3">
                <Marquee pauseOnHover className="[--duration:25s] max-w-full">
                  {outcomeKeys.map((key) => (
                    <span key={key} className="mx-4 sm:mx-5 editorial-label text-primary/80 whitespace-nowrap">
                      {t(key)}
                    </span>
                  ))}
                </Marquee>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block min-w-0 w-full">
            <HeroProductMockup projects={projects} />
          </div>
        </div>

        <HeroTrustBar />
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
