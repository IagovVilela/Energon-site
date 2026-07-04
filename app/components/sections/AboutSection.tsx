"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { TextReveal } from "@/app/components/animations/TextReveal";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";

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
    <SectionTransition variant="clipReveal">
      <section id="sobre" className="section-padding border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <p className="editorial-label mb-6">01 — {t("nav.about")}</p>
              <TextReveal>
                <h2 className="headline-lg mb-6">
                  {config?.aboutTitle || t("about.header.title")}{" "}
                  <span className="text-primary">{t("about.header.highlight")}</span>
                </h2>
              </TextReveal>
              <TextReveal delay={0.15}>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {config?.aboutDescription || t("about.header.subtitle")}
                </p>
              </TextReveal>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
                {stats.map((stat, i) => (
                  <BlurFade key={stat.label} delay={0.1 * i}>
                    <div>
                      <p className="font-display text-3xl md:text-4xl text-primary">
                        {stat.prefix}
                        <NumberTicker value={stat.value} />
                        {stat.suffix}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-16">
              <div>
                <p className="editorial-label mb-8">{t("about.whatYouGet.title")}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {whatYouGet.map((item, i) => (
                    <BlurFade key={i} delay={0.05 * i}>
                      <div className="flex items-start gap-3 p-4 border border-border/60 hover:border-primary/40 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>

              <div>
                <p className="editorial-label mb-8">
                  {t("diff.title")} <span className="text-primary">{t("diff.highlight")}</span>
                </p>
                <div className="space-y-0 divide-y divide-border border-y border-border">
                  {differentiators.map((item, i) => (
                    <BlurFade key={item.title} delay={0.08 * i}>
                      <div className="py-8 group">
                        <div className="flex items-start gap-6">
                          <span className="font-display text-4xl text-foreground/20 group-hover:text-primary transition-colors">
                            0{i + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <item.icon className="w-4 h-4 text-primary" />
                              <h3 className="font-display text-xl">{item.title}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-8 border border-primary/30 bg-primary/5"
              >
                <h4 className="font-display text-2xl mb-2">{t("about.cta.title")}</h4>
                <p className="text-muted-foreground mb-6">{t("about.cta.subtitle")}</p>
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  {t("about.cta.button")}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
