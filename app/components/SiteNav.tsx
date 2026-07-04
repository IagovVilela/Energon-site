"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#sobre", key: "nav.about" },
  { href: "#servicos", key: "nav.services" },
  { href: "#portfolio", key: "nav.portfolio" },
  { href: "#processo", key: "nav.process" },
  { href: "#contato", key: "nav.contact" },
] as const;

export function SiteNav() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3 glass-subtle border-b border-border/50" : "py-5 bg-transparent"
      )}
    >
      <div className="container px-4 md:px-6 flex items-center justify-between gap-6">
        <Link href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center">
            E
          </span>
          <span className="font-display font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
            ENERGON
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="editorial-label hover:text-foreground transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={cn(
                "px-2 py-1 transition-colors",
                language === "pt" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              PT
            </button>
            <span className="text-border">/</span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={cn(
                "px-2 py-1 transition-colors",
                language === "en" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>
          <ThemeToggle />
          <Link
            href="#contato"
            className="ml-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t("nav.cta")}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={cn("block w-6 h-px bg-foreground transition-transform", mobileOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block w-6 h-px bg-foreground transition-opacity", mobileOpen && "opacity-0")} />
          <span className={cn("block w-6 h-px bg-foreground transition-transform", mobileOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </div>

      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-border/50 glass-subtle"
        >
          <div className="container px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-display"
              >
                {t(link.key)}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <button type="button" onClick={() => setLanguage("pt")} className={language === "pt" ? "text-primary" : ""}>PT</button>
              <button type="button" onClick={() => setLanguage("en")} className={language === "en" ? "text-primary" : ""}>EN</button>
              <ThemeToggle />
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
