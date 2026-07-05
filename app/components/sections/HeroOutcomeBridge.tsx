"use client";

import { TrendingUp, Eye, Award, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { NumberTicker } from "@/components/magicui/number-ticker";

const OUTCOME_ICONS = [TrendingUp, Eye, Award, Clock] as const;
const OUTCOME_KEYS = ["1", "2", "3", "4"] as const;
const PAIN_KEYS = ["1", "2", "3", "4"] as const;

export function HeroOutcomeBridge() {
  const { t } = useLanguage();

  const stats = [
    { value: 50, prefix: "+", suffix: "", label: t("bridge.stat.projects") },
    { value: 100, prefix: "", suffix: "%", label: t("bridge.stat.satisfaction") },
    { value: 24, prefix: "", suffix: "h", label: t("bridge.stat.response") },
  ];

  return (
    <section
      id="resultados"
      aria-label={t("bridge.label")}
      className="relative z-10 border-y border-border bg-surface-elevated/60"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_55%)] pointer-events-none" />

      <div className="container relative px-4 md:px-6 py-14 md:py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end mb-12">
          <div className="max-w-2xl">
            <p className="editorial-label mb-3">{t("bridge.label")}</p>
            <h2 className="font-display text-2xl md:text-4xl tracking-tight leading-tight">
              {t("bridge.title")}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6 lg:gap-10 border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl text-primary tabular-nums">
                  {stat.prefix}
                  <NumberTicker value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[8rem]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p className="editorial-label mb-4">{t("bridge.pains.label")}</p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {PAIN_KEYS.map((key) => (
              <span
                key={key}
                className="px-4 py-2.5 text-sm border border-border bg-background text-foreground/90"
              >
                {t(`bridge.pain${key}`)}
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {OUTCOME_KEYS.map((key, i) => {
            const Icon = OUTCOME_ICONS[i];
            return (
              <div
                key={key}
                className="group p-6 border border-border bg-background hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg mb-2">{t(`bridge.outcome${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`bridge.outcome${key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-border/60">
          <p className="text-muted-foreground text-sm md:text-base max-w-xl">{t("bridge.cta.text")}</p>
          <Link
            href="#servicos"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all shrink-0"
          >
            {t("bridge.cta.link")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
