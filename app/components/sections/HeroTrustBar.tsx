"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { Marquee } from "@/components/magicui/marquee";

const CLIENT_LOGOS = [
  { name: "Nexus Labs", initials: "NX" },
  { name: "Voltex", initials: "VX" },
  { name: "Helix Group", initials: "HX" },
  { name: "Prisma Tech", initials: "PR" },
  { name: "Arcos Digital", initials: "AR" },
  { name: "Pulse ERP", initials: "PL" },
  { name: "Orbit SaaS", initials: "OR" },
  { name: "Vertex", initials: "VT" },
];

const TESTIMONIAL_KEYS = ["hero.testimonial1", "hero.testimonial2", "hero.testimonial3"] as const;

export function HeroTrustBar() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIAL_KEYS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = {
    quote: t(`${TESTIMONIAL_KEYS[activeIndex]}.quote`),
    author: t(`${TESTIMONIAL_KEYS[activeIndex]}.author`),
    role: t(`${TESTIMONIAL_KEYS[activeIndex]}.role`),
    company: t(`${TESTIMONIAL_KEYS[activeIndex]}.company`),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.7 }}
      className="mt-12 lg:mt-16 pt-8 border-t border-border/60 space-y-8"
    >
      <div>
        <p className="editorial-label mb-4">{t("hero.clients.label")}</p>
        <Marquee pauseOnHover className="[--duration:35s]">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.name}
              className="mx-4 flex items-center gap-3 px-5 py-3 border border-border/70 bg-card/40 min-w-[180px]"
            >
              <span className="w-9 h-9 flex items-center justify-center bg-primary/10 text-primary font-display text-xs font-bold">
                {client.initials}
              </span>
              <span className="font-display text-sm tracking-tight whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
        <div className="relative min-h-[120px] border border-border p-6 md:p-8 bg-card/30">
          <Quote className="w-5 h-5 text-primary mb-4 opacity-80" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="font-display text-sm">{testimonial.author}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {testimonial.role} · {testimonial.company}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex md:flex-col gap-2">
          {TESTIMONIAL_KEYS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 md:w-1.5 md:h-8 rounded-full transition-all ${
                i === activeIndex ? "w-8 md:w-1.5 bg-primary" : "w-4 md:w-1.5 bg-border"
              }`}
              aria-label={`${t("hero.testimonial.nav")} ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
