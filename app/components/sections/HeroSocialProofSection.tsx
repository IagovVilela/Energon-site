"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionHeader, SectionShell } from "@/app/components/layout/SectionShell";
import { HeroTrustBar } from "./HeroTrustBar";

export function HeroSocialProofSection() {
  const { t } = useLanguage();

  return (
    <SectionShell id="prova-social" tone="default" labelledBy="prova-social-heading">
      <SectionHeader
        label={t("hero.socialProof.label")}
        title={<span id="prova-social-heading">{t("hero.clients.label")}</span>}
      />
      <HeroTrustBar />
    </SectionShell>
  );
}
