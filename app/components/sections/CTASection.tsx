"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";

export function CTASection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-primary/10" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="container px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl relative group overflow-hidden"
                >
                    {/* Inner glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary animate-pulse">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Start Your Journey</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight leading-tight">
                            {t('cta.main.title')}
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                            {t('cta.main.subtitle')}
                        </p>

                        <Link
                            href="#contato"
                            className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-black bg-white rounded-2xl hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-white/10 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {t('cta.main.button')}
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </span>

                            {/* Animated reflection */}
                            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[45deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
