"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { TextReveal } from "@/app/components/animations/TextReveal";
import { ParallaxLayer } from "@/app/components/animations/ParallaxLayer";
import { cinematicEase } from "@/lib/animations";

export function CTASection() {
    const { t } = useLanguage();

    return (
        <SectionTransition parallaxIntensity={0.06}>
            <section className="py-24 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 bg-primary/10" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

                <ParallaxLayer speed={-0.1}>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 blur-[120px] rounded-full pointer-events-none"
                    />
                </ParallaxLayer>

                <div className="container px-4 md:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: 30,
                            filter: "blur(10px)",
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: cinematicEase,
                        }}
                        className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl relative group overflow-hidden"
                    >
                        {/* Inner glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

                        <div className="relative z-10">
                            <motion.div
                                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary animate-pulse"
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Sparkles className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Start Your Journey</span>
                            </motion.div>

                            <TextReveal delay={0.2}>
                                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground tracking-tight leading-tight">
                                    {t('cta.main.title')}
                                </h2>
                            </TextReveal>

                            <TextReveal delay={0.35}>
                                <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                                    {t('cta.main.subtitle')}
                                </p>
                            </TextReveal>

                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6, ease: cinematicEase }}
                            >
                                <Link
                                    href="#contato"
                                    className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-background bg-foreground rounded-2xl hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-primary/20 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {t('cta.main.button')}
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </span>

                                    {/* Animated reflection */}
                                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[45deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </SectionTransition>
    );
}
