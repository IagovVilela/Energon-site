"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionHeader, SectionShell } from "@/app/components/layout/SectionShell";
import { HeroProductMockup } from "./HeroProductMockup";
import type { HeroProject } from "@/lib/hero-projects";

export function HeroShowcaseSection({ projects = [] }: { projects?: HeroProject[] }) {
  const { t } = useLanguage();

  return (
    <SectionShell id="destaques" tone="muted" labelledBy="destaques-heading">
      <SectionHeader
        label={t("hero.showcase.label")}
        title={<span id="destaques-heading">{t("hero.showcase.title")}</span>}
        subtitle={t("hero.showcase.subtitle")}
      />

      <div className="section-inset max-w-2xl mx-auto lg:max-w-3xl">
        <HeroProductMockup projects={projects} />
      </div>

      <div className="mt-10 sm:mt-12 flex justify-center">
        <Link
          href="#portfolio"
          className="inline-flex h-12 sm:h-14 items-center justify-center px-6 sm:px-8 border border-border font-semibold hover:border-primary hover:text-primary transition-colors text-sm sm:text-base gap-2 bg-background/50"
        >
          {t("hero.viewProjects")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionShell>
  );
}
