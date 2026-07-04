"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { WordReveal } from "@/app/components/animations/TextReveal";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Marquee } from "@/components/magicui/marquee";
import { HeroVisual } from "./HeroVisual";

interface HeroConfig {
  heroDescription?: string;
}

export function HeroSection({ config }: { config?: HeroConfig | null }) {
  const { t } = useLanguage();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setShowScroll(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const techItems = ["ERP", "CRM", "SaaS", "Dashboards", "APIs", "E-commerce", "Automação"];

  return (
    <section className="relative min-h-[100svh] flex flex-col grain-overlay overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute left-0 top-1/4 h-px w-full bg-border/60" />
      <div className="absolute right-12 top-24 bottom-24 w-px bg-border/40 hidden lg:block" />

      <div className="container relative z-10 px-4 md:px-6 pt-28 pb-16 md:pt-32 md:pb-20 flex-1 flex flex-col justify-center">
        <div className="mb-10 overflow-hidden border-y border-border/50 py-3">
          <Marquee pauseOnHover className="[--duration:25s]">
            {techItems.map((item) => (
              <span
                key={item}
                className="mx-6 editorial-label text-primary/70 whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="editorial-label mb-6">{t("hero.badge")}</p>

            <h1 className="headline-xl max-w-3xl mb-6">
              <WordReveal text={t("hero.title.part1")} className="block" delay={0.1} immediate />
              <span className="block text-primary mt-1">
                <WordReveal text={t("hero.title.part2")} delay={0.25} wordDelay={0.05} immediate />
              </span>
              <span className="block mt-1">
                <WordReveal text={t("hero.title.part3")} delay={0.45} immediate />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              {config?.heroDescription || t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="#contato"
                className="group relative inline-flex h-14 items-center justify-center px-8 bg-primary text-primary-foreground font-semibold overflow-hidden"
              >
                <BorderBeam size={120} duration={8} />
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex h-14 items-center justify-center px-8 border border-border font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                {t("hero.viewProjects")}
              </Link>
            </motion.div>
          </div>

          <HeroVisual />
        </div>
      </div>

      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10"
        >
          <span className="editorial-label">{t("hero.scroll")}</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
