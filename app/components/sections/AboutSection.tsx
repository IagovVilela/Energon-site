"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AboutBrandPanel } from "./AboutBrandPanel";
import { SectionHeader, SectionShell } from "@/app/components/layout/SectionShell";

interface AboutConfig {
  aboutTitle?: string;
  aboutDescription?: string;
}

export function AboutSection({ config }: { config?: AboutConfig | null }) {
  const { t } = useLanguage();

  const stats = [
    { value: 100, suffix: "%", label: t("about.results.clients") },
    { value: 50, prefix: "+", label: t("about.results.projects") },
    { value: 24, suffix: "h", label: t("about.results.support") },
  ];

  const differentiators = [
    { icon: Zap, title: t("diff.item1.title"), desc: t("diff.item1.desc") },
    { icon: Shield, title: t("diff.item2.title"), desc: t("diff.item2.desc") },
    { icon: Rocket, title: t("diff.item3.title"), desc: t("diff.item3.desc") },
  ];

  const whatYouGet = [
    t("about.whatYouGet.item1"),
    t("about.whatYouGet.item2"),
    t("about.whatYouGet.item3"),
    t("about.whatYouGet.item4"),
    t("about.whatYouGet.item5"),
    t("about.whatYouGet.item6"),
  ];

  return (
    <SectionTransition variant="none">
      <SectionShell id="sobre" tone="muted" labelledBy="sobre-heading">
        <SectionHeader
          index="01"
          label={t("nav.about")}
          title={
            <span id="sobre-heading">
              {config?.aboutTitle || t("about.header.title")}{" "}
              <span className="text-primary">{t("about.header.highlight")}</span>
            </span>
          }
          subtitle={config?.aboutDescription || t("about.header.subtitle")}
          className="max-w-none"
        />

        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-24 items-start">
          <div className="lg:col-span-5 min-w-0">
            <div className="lg:sticky lg:top-24 xl:top-28 flex flex-col">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-border section-inset">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <p className="font-display text-2xl sm:text-3xl md:text-4xl text-primary">
                      {stat.prefix}
                      <NumberTicker value={stat.value} />
                      {stat.suffix}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <AboutBrandPanel />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10 sm:space-y-12 min-w-0">
            <div className="section-inset">
              <p className="editorial-label mb-6 sm:mb-8">{t("about.whatYouGet.title")}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {whatYouGet.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 border border-border/60 bg-background/50 hover:border-primary/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-inset">
              <p className="editorial-label mb-6 sm:mb-8">
                {t("diff.title")} <span className="text-primary">{t("diff.highlight")}</span>
              </p>
              <div className="space-y-0 divide-y divide-border border-y border-border">
                {differentiators.map((item, i) => (
                  <div key={item.title} className="py-6 sm:py-8 group">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="font-display text-3xl sm:text-4xl text-foreground/20 group-hover:text-primary transition-colors shrink-0">
                        0{i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <item.icon className="w-4 h-4 text-primary shrink-0" />
                          <h3 className="font-display text-lg sm:text-xl">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-5 sm:p-8 border border-primary/30 bg-primary/5"
            >
              <h4 className="font-display text-xl sm:text-2xl mb-2">{t("about.cta.title")}</h4>
              <p className="text-muted-foreground text-sm sm:text-base mb-6">{t("about.cta.subtitle")}</p>
              <a
                href="#contato"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                {t("about.cta.button")}
              </a>
            </motion.div>
          </div>
        </div>
      </SectionShell>
    </SectionTransition>
  );
}
