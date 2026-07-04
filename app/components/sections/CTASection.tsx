"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { WordReveal } from "@/app/components/animations/TextReveal";
import { BorderBeam } from "@/components/magicui/border-beam";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <SectionTransition variant="cinematic">
      <section className="section-padding border-t border-border relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="relative border border-border p-12 md:p-20 lg:p-28 overflow-hidden">
            <BorderBeam size={250} duration={12} />

            <p className="editorial-label mb-8">{t("cta.badge")}</p>

            <h2 className="headline-xl max-w-4xl mb-8">
              <WordReveal text={t("cta.main.title")} wordDelay={0.05} />
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
              {t("cta.main.subtitle")}
            </p>

            <Link
              href="#contato"
              className="group relative inline-flex h-16 items-center gap-3 px-10 bg-foreground text-background font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              {t("cta.main.button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
