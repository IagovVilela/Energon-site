"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";
import { siteConfig } from "@/app/config/site";
import { sendContactEmail } from "@/app/actions/contact";
import { useLanguage } from "@/app/contexts/LanguageContext";

export function ContactSection({ config }: { config?: any }) {
    const { t } = useLanguage();
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setError(false);
        setSuccess(false);

        startTransition(async () => {
            const result = await sendContactEmail(formData);
            if (result.success) {
                setSuccess(true);
                // Reset form would be nice here but native forms need more handling
            } else {
                setError(true);
            }
        });
    };

    return (
        <section id="contato" className="py-24 relative bg-background overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side: Info */}
                    <div className="space-y-12">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
                            >
                                {t('contact.title')}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-muted-foreground leading-relaxed"
                            >
                                {t('contact.subtitle')}
                            </motion.p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[2rem] bg-card border border-border/50 group hover:border-primary/50 transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                    <Send className="w-6 h-6" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{t('contact.email')}</h4>
                                <p className="font-bold text-lg break-all">{siteConfig.personal.email}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-8 rounded-[2rem] bg-card border border-border/50 group hover:border-primary/50 transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:bg-green-500 group-hover:text-white transition-all">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{t('contact.phone')}</h4>
                                <p className="font-bold text-lg mb-4">{siteConfig.personal.phone}</p>
                                <a
                                    href={`https://wa.me/${siteConfig.personal.phone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-500 font-bold text-sm hover:bg-green-500 hover:text-white transition-all group-hover:shadow-lg shadow-green-500/20"
                                >
                                    Conversar agora
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/10">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                                <CheckCircle2 className="w-4 h-4" />
                                Fast Response
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                I typically respond to all inquiries within 24 hours. Your project is important to me, and I look forward to discussing how we can work together.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-[3rem] bg-card border border-border shadow-2xl relative"
                    >
                        <form action={handleSubmit} className="space-y-6">
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <label className="text-sm font-bold uppercase tracking-wider ml-1">{t('contact.form.name')}</label>
                                <motion.input
                                    name="name"
                                    required
                                    placeholder={t('contact.form.namePlaceholder')}
                                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    whileFocus={{ scale: 1.01 }}
                                />
                            </motion.div>

                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <label className="text-sm font-bold uppercase tracking-wider ml-1">{t('contact.form.email')}</label>
                                <motion.input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder={t('contact.form.emailPlaceholder')}
                                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    whileFocus={{ scale: 1.01 }}
                                />
                            </motion.div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-wider ml-1">{t('contact.form.subject')}</label>
                                <input
                                    name="subject"
                                    required
                                    placeholder={t('contact.form.subjectPlaceholder')}
                                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-wider ml-1">{t('contact.form.message')}</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder={t('contact.form.messagePlaceholder')}
                                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-5 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isPending ? (
                                    <motion.div
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        {t('contact.form.sending')}
                                    </motion.div>
                                ) : (
                                    <>
                                        {t('contact.form.submit')}
                                        <motion.div
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.div>
                                    </>
                                )}
                            </motion.button>

                            {/* Status Messages */}
                            <AnimatePresence>
                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-center font-medium flex items-center justify-center gap-2"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                        </motion.div>
                                        {t('contact.form.success')}
                                    </motion.div>
                                )}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 0 }}
                                        animate={{
                                            opacity: 1,
                                            x: [0, -10, 10, -10, 10, 0]
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center font-medium"
                                    >
                                        {t('contact.form.error')}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
