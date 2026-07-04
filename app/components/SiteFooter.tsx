"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { Marquee } from "@/components/magicui/marquee";

interface SiteFooterProps {
  config?: {
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    instagramUrl?: string | null;
    email?: string;
  } | null;
}

export function SiteFooter({ config }: SiteFooterProps) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { href: config?.githubUrl, icon: Github, label: "GitHub" },
    { href: config?.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
    { href: config?.instagramUrl, icon: Instagram, label: "Instagram" },
  ].filter((s) => s.href);

  const marqueeItems = [
    "Sistemas Web",
    "ERP / CRM",
    "SaaS",
    "Automação",
    "Dashboards",
    "APIs",
    "Alta Performance",
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="border-b border-border/50 py-6 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="mx-8 font-display text-4xl md:text-6xl text-foreground/10 uppercase tracking-tighter whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center">
                E
              </span>
              <span className="font-display font-bold text-xl">ENERGON</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <p className="editorial-label mb-4">{t("footer.navigation")}</p>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="#sobre" className="hover:text-primary transition-colors">{t("nav.about")}</a>
              <a href="#servicos" className="hover:text-primary transition-colors">{t("nav.services")}</a>
              <a href="#portfolio" className="hover:text-primary transition-colors">{t("nav.portfolio")}</a>
              <a href="#contato" className="hover:text-primary transition-colors">{t("nav.contact")}</a>
            </nav>
          </div>

          <div>
            <p className="editorial-label mb-4">{t("footer.connect")}</p>
            {config?.email && (
              <a href={`mailto:${config.email}`} className="block text-sm mb-4 hover:text-primary transition-colors">
                {config.email}
              </a>
            )}
            <div className="flex gap-4">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} Energon. {t("footer.rights")}</p>
          <Link href="/admin/login" className="hover:text-foreground transition-colors opacity-50 hover:opacity-100">
            {t("footer.admin")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
