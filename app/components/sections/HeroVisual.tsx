"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/contexts/LanguageContext";

const bars = [40, 72, 55, 88, 63, 95, 48, 78];

export function HeroVisual() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative border border-border bg-card/80 backdrop-blur-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-elevated/50">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="editorial-label text-[10px]">{t("hero.visual.label")}</span>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: t("hero.visual.metric1"), value: "99.9%" },
              { label: t("hero.visual.metric2"), value: "<1s" },
              { label: t("hero.visual.metric3"), value: "24/7" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="border border-border p-3 bg-background/50"
              >
                <p className="font-display text-lg text-primary">{item.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="editorial-label">{t("hero.visual.chart")}</p>
            <div className="flex items-end gap-1.5 h-28 border border-border p-3 bg-background/30">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-primary/80 origin-bottom"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.8 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Next.js", "PostgreSQL", "TypeScript", "Prisma"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.08 }}
                className="px-2 py-1 text-[10px] uppercase tracking-wider border border-primary/30 text-primary"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 hidden md:block"
      >
        <span className="font-display text-[8rem] leading-none text-foreground/[0.04] select-none">01</span>
      </motion.div>
    </div>
  );
}
