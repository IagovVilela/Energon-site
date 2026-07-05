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
import { SectionHeader, SectionShell } from "@/app/components/layout/SectionShell";
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
      <SectionShell id="servicos" tone="default" labelledBy="servicos-heading">
        <SectionHeader
          index="02"
          align="split"
          label={t("nav.services")}
          title={
            <span id="servicos-heading">
              {t("services.title.prefix")}{" "}
              <span className="text-primary">{t("services.title.highlight")}</span>
            </span>
          }
          subtitle={t("services.subtitle")}
          className="max-w-none"
        />

        <div className="section-inset border-t-0 pt-0">
            {services.map((service, index) => {
              const Icon = iconMap[index];
              const isOpen = openIndex === index;

              return (
                <BlurFade key={service.title} delay={index * 0.05}>
                  <div className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center gap-3 sm:gap-6 py-5 sm:py-8 text-left group min-w-0"
                    >
                      <span className="font-display text-2xl sm:text-3xl text-foreground/20 group-hover:text-primary transition-colors w-8 sm:w-12 shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                      <span className="font-display text-base sm:text-xl md:text-2xl flex-1 min-w-0 pr-2">{service.title}</span>
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
                          <p className="pb-5 sm:pb-8 px-1 sm:px-0 sm:pl-24 md:pr-12 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
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
      </SectionShell>
    </SectionTransition>
  );
}
