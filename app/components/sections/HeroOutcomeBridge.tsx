"use client";

import { TrendingUp, Eye, Award, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionBlock, SectionHeader, SectionShell } from "@/app/components/layout/SectionShell";
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
    <SectionShell
      id="resultados"
      tone="contrast"
      labelledBy="resultados-heading"
      className="relative z-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_55%)] pointer-events-none" />

      <SectionHeader
        label={t("bridge.label")}
        title={<span id="resultados-heading">{t("bridge.title")}</span>}
        className="relative max-w-none"
      />

      <SectionBlock className="mb-10 sm:mb-12 bg-background/60">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0 text-center sm:text-left">
              <p className="font-display text-2xl sm:text-3xl md:text-4xl text-primary tabular-nums">
                {stat.prefix}
                <NumberTicker value={stat.value} />
                {stat.suffix}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title={t("bridge.pains.label")} className="mb-10 sm:mb-12 bg-background/40">
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
      </SectionBlock>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
        {OUTCOME_KEYS.map((key, i) => {
          const Icon = OUTCOME_ICONS[i];
          return (
            <div
              key={key}
              className="group p-6 border border-border bg-background/80 hover:border-primary/50 transition-colors"
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

      <SectionBlock className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-primary/5 border-primary/20">
        <p className="text-muted-foreground text-sm md:text-base max-w-xl">{t("bridge.cta.text")}</p>
        <Link
          href="#servicos"
          className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all shrink-0"
        >
          {t("bridge.cta.link")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </SectionBlock>
    </SectionShell>
  );
}
