"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { SectionHeader, SectionShell } from "@/app/components/layout/SectionShell";

export function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    { icon: MessageSquare, title: t("process.step1.title"), description: t("process.step1.desc") },
    { icon: FileText, title: t("process.step2.title"), description: t("process.step2.desc") },
    { icon: Code2, title: t("process.step3.title"), description: t("process.step3.desc") },
    { icon: Rocket, title: t("process.step4.title"), description: t("process.step4.desc") },
  ];

  return (
    <SectionTransition variant="slideUp">
      <SectionShell id="processo" tone="default" labelledBy="processo-heading">
        <SectionHeader
          index="04"
          label={t("nav.process")}
          title={
            <span id="processo-heading">
              {t("process.title.prefix")}{" "}
              <span className="text-primary">{t("process.title.highlight")}</span>
            </span>
          }
          subtitle={t("process.subtitle")}
          className="max-w-none"
        />

        <div className="relative section-inset">
          <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-primary/40" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="hidden md:flex w-3 h-3 bg-primary mb-8 relative z-10" />
                <span className="font-display text-5xl text-foreground/10 mb-4 block md:hidden">
                  0{index + 1}
                </span>
                <step.icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="font-display text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionShell>
    </SectionTransition>
  );
}
