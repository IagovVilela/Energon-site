"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { TextReveal } from "@/app/components/animations/TextReveal";

export function ProcessSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  const steps = [
    { icon: MessageSquare, title: t("process.step1.title"), description: t("process.step1.desc") },
    { icon: FileText, title: t("process.step2.title"), description: t("process.step2.desc") },
    { icon: Code2, title: t("process.step3.title"), description: t("process.step3.desc") },
    { icon: Rocket, title: t("process.step4.title"), description: t("process.step4.desc") },
  ];

  return (
    <SectionTransition variant="slideUp">
      <section id="processo" className="section-padding border-t border-border">
        <div className="container" ref={containerRef}>
          <div className="mb-10 sm:mb-20">
            <p className="editorial-label mb-6">04 — {t("nav.process")}</p>
            <TextReveal>
              <h2 className="headline-lg">
                {t("process.title.prefix")}{" "}
                <span className="text-primary">{t("process.title.highlight")}</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.1}>
              <p className="text-muted-foreground mt-4 max-w-lg">{t("process.subtitle")}</p>
            </TextReveal>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-border">
              <motion.div className="h-full bg-primary origin-left" style={{ width: lineWidth }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
        </div>
      </section>
    </SectionTransition>
  );
}
