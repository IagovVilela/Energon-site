"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, CheckCircle2, Zap } from "lucide-react";
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
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{t('contact.phone')}</h4>
                                <p className="font-bold text-lg">{siteConfig.personal.phone}</p>
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
