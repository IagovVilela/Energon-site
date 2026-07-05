"use client";

import { TrendingUp, Eye, Award, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";

const OUTCOME_ICONS = [TrendingUp, Eye, Award, Clock] as const;
const OUTCOME_KEYS = ["1", "2", "3", "4"] as const;
const PAIN_KEYS = ["1", "2", "3", "4"] as const;

export function HeroOutcomeBridge() {
  const { t } = useLanguage();

  return (
    <div className="border-t border-border bg-surface-elevated/40">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-2xl mb-10">
          <p className="editorial-label mb-3">{t("bridge.label")}</p>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight leading-tight">
            {t("bridge.title")}
          </h2>
        </div>

        <div className="mb-10">
          <p className="editorial-label mb-4">{t("bridge.pains.label")}</p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {PAIN_KEYS.map((key) => (
              <span
                key={key}
                className="px-4 py-2.5 text-sm border border-border bg-background/80 text-muted-foreground"
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
    </div>
  );
}
