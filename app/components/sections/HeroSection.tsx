"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { WordReveal } from "@/app/components/animations/TextReveal";
import { BorderBeam } from "@/components/magicui/border-beam";

interface HeroConfig {
  heroTitle?: string;
  heroHighlight?: string;
  heroDescription?: string;
}

export function HeroSection({ config }: { config?: HeroConfig | null }) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [showScroll, setShowScroll] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 120]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setShowScroll(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const titleLine1 = config?.heroTitle?.split(config?.heroHighlight || "")[0]?.trim() || t("hero.title.part1");
  const highlight = config?.heroHighlight || t("hero.title.part2");
  const titleLine3 = config?.heroTitle?.includes(highlight)
    ? config.heroTitle.split(highlight)[1]?.trim() || t("hero.title.part3")
    : t("hero.title.part3");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 grain-overlay overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <motion.div
        className="absolute left-0 top-1/3 h-px w-full bg-border origin-left"
        style={{ scaleX: lineScale }}
      />
      <motion.div
        className="absolute right-8 md:right-16 top-1/3 bottom-32 w-px bg-border/50 origin-top hidden md:block"
        style={{ scaleY: lineScale }}
      />

      <motion.div style={{ opacity, y }} className="container relative z-10 px-4 md:px-6 pt-32">
        <p className="editorial-label mb-8">{t("hero.badge")}</p>

        <h1 className="headline-xl max-w-5xl mb-8">
          <WordReveal text={titleLine1} className="block" delay={0.1} />
          <span className="block text-primary mt-1">
            <WordReveal text={highlight} delay={0.35} wordDelay={0.06} />
          </span>
          {titleLine3 && (
            <span className="block mt-1">
              <WordReveal text={titleLine3} delay={0.55} />
            </span>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-lg text-muted-foreground mb-12 leading-relaxed"
        >
          {config?.heroDescription || t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
      </motion.div>

      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
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
