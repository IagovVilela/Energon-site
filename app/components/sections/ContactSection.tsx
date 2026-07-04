"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { siteConfig } from "@/app/config/site";
import { sendContactEmail } from "@/app/actions/contact";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { TextReveal } from "@/app/components/animations/TextReveal";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactConfig {
  email?: string;
  phone?: string;
  location?: string;
}

export function ContactSection({ config }: { config?: ContactConfig | null }) {
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const email = config?.email || siteConfig.personal.email;
  const phone = config?.phone || siteConfig.personal.phone;
  const location = config?.location || siteConfig.personal.location;

  const handleSubmit = async (formData: FormData) => {
    setError(false);
    setSuccess(false);

    startTransition(async () => {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(true);
      }
    });
  };

  return (
    <SectionTransition variant="slideUp">
      <section id="contato" className="section-padding border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="editorial-label mb-6">05 — {t("nav.contact")}</p>
              <TextReveal>
                <h2 className="headline-lg mb-6">{t("contact.title")}</h2>
              </TextReveal>
              <TextReveal delay={0.1}>
                <p className="text-muted-foreground text-lg mb-12">{t("contact.subtitle")}</p>
              </TextReveal>

              <div className="space-y-8">
                <BlurFade>
                  <div className="border-l-2 border-primary pl-6">
                    <p className="editorial-label mb-1">{t("contact.email")}</p>
                    <a href={`mailto:${email}`} className="font-display text-xl hover:text-primary transition-colors">
                      {email}
                    </a>
                  </div>
                </BlurFade>
                <BlurFade delay={0.1}>
                  <div className="border-l-2 border-border pl-6">
                    <p className="editorial-label mb-1">{t("contact.phone")}</p>
                    <p className="font-display text-xl mb-3">{phone}</p>
                    <a
                      href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {t("contact.chatNow")}
                    </a>
                  </div>
                </BlurFade>
                <BlurFade delay={0.2}>
                  <div className="border-l-2 border-border pl-6">
                    <p className="editorial-label mb-1">{t("contact.location")}</p>
                    <p className="text-muted-foreground">{location}</p>
                  </div>
                </BlurFade>
              </div>
            </div>

            <BlurFade delay={0.15}>
              <form action={handleSubmit} className="border border-border p-8 md:p-10 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="editorial-label block mb-2">{t("contact.form.name")}</label>
                    <Input name="name" required placeholder={t("contact.form.namePlaceholder")} className="bg-background border-border rounded-none" />
                  </div>
                  <div>
                    <label className="editorial-label block mb-2">{t("contact.form.email")}</label>
                    <Input name="email" type="email" required placeholder={t("contact.form.emailPlaceholder")} className="bg-background border-border rounded-none" />
                  </div>
                </div>
                <div>
                  <label className="editorial-label block mb-2">{t("contact.form.subject")}</label>
                  <Input name="subject" required placeholder={t("contact.form.subjectPlaceholder")} className="bg-background border-border rounded-none" />
                </div>
                <div>
                  <label className="editorial-label block mb-2">{t("contact.form.message")}</label>
                  <Textarea name="message" required rows={5} placeholder={t("contact.form.messagePlaceholder")} className="bg-background border-border rounded-none resize-none" />
                </div>

                <AnimatePresence>
                  {success && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary">
                      {t("contact.form.success")}
                    </motion.p>
                  )}
                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive">
                      {t("contact.form.error")}
                    </motion.p>
                  )}
                </AnimatePresence>

                <Button type="submit" disabled={isPending} className="w-full h-14 rounded-none font-semibold">
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t("contact.form.submit")}
                    </>
                  )}
                </Button>
              </form>
            </BlurFade>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
