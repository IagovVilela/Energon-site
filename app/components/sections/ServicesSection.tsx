"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Monitor,
  Zap,
  TrendingUp,
  Globe,
  Cpu,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { TextReveal } from "@/app/components/animations/TextReveal";
import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

const iconMap = [Layers, Monitor, Zap, TrendingUp, Globe, Cpu];

export function ServicesSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    { title: t("services.item1.title"), description: t("services.item1.desc") },
    { title: t("services.item2.title"), description: t("services.item2.desc") },
    { title: t("services.item3.title"), description: t("services.item3.desc") },
    { title: t("services.item4.title"), description: t("services.item4.desc") },
    { title: t("services.item5.title"), description: t("services.item5.desc") },
    { title: t("services.item6.title"), description: t("services.item6.desc") },
  ];

  return (
    <SectionTransition variant="none">
      <section id="servicos" className="section-padding border-t border-border bg-surface-elevated/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <p className="editorial-label mb-6">02 — {t("nav.services")}</p>
              <TextReveal>
                <h2 className="headline-lg">
                  {t("services.title.prefix")}{" "}
                  <span className="text-primary">{t("services.title.highlight")}</span>
                </h2>
              </TextReveal>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <TextReveal delay={0.1}>
                <p className="text-muted-foreground text-lg">{t("services.subtitle")}</p>
              </TextReveal>
            </div>
          </div>

          <div className="border-t border-border">
            {services.map((service, index) => {
              const Icon = iconMap[index];
              const isOpen = openIndex === index;

              return (
                <BlurFade key={service.title} delay={index * 0.05}>
                  <div className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center gap-6 py-8 text-left group"
                    >
                      <span className="font-display text-3xl text-foreground/20 group-hover:text-primary transition-colors w-12">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-display text-xl md:text-2xl flex-1">{service.title}</span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-8 pl-[4.5rem] md:pl-24 pr-12 text-muted-foreground max-w-2xl leading-relaxed">
                            {service.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
