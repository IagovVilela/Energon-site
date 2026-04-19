"use client";

import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, Award } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { TextReveal } from "@/app/components/animations/TextReveal";
import { ParallaxLayer } from "@/app/components/animations/ParallaxLayer";
import { cinematicStagger, cinematicItem, cinematicEase } from "@/lib/animations";

export function DifferentiatorsSection() {
    const { t } = useLanguage();

    const differentiators = [
        { icon: Zap, title: t('diff.item1.title'), description: t('diff.item1.desc'), color: "text-amber-500", bg: "bg-amber-500/10" },
        { icon: Shield, title: t('diff.item2.title'), description: t('diff.item2.desc'), color: "text-green-500", bg: "bg-green-500/10" },
        { icon: TrendingUp, title: t('diff.item3.title'), description: t('diff.item3.desc'), color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: Award, title: t('diff.item4.title'), description: t('diff.item4.desc'), color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    const stats = [
        { value: "100%", label: t('about.results.clients') },
        { value: "+50", label: t('about.results.projects') },
    ];

    return (
        <SectionTransition parallaxIntensity={0.04}>
            <section className="py-24 bg-muted/10 relative overflow-hidden">
                {/* Background glow */}
                <ParallaxLayer speed={-0.15}>
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                </ParallaxLayer>

                <div className="container px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        <motion.div
                            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: cinematicEase }}
                        >
                            <TextReveal>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    {t('diff.title')} <br />
                                    <span className="text-primary">{t('diff.highlight')}</span>
                                </h2>
                            </TextReveal>
                            <TextReveal delay={0.15}>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    {t('diff.subtitle')}
                                </p>
                            </TextReveal>

                            <div className="flex items-center gap-8">
                                {stats.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex flex-col gap-1"
                                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.3 + index * 0.1,
                                            duration: 0.5,
                                            ease: cinematicEase,
                                        }}
                                    >
                                        <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                                            {item.value}
                                        </span>
                                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{item.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Grid of Cards */}
                        <motion.div
                            className="grid sm:grid-cols-2 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            variants={cinematicStagger}
                        >
                            {differentiators.map((diff, index) => (
                                <motion.div
                                    key={index}
                                    variants={cinematicItem}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.02,
                                        transition: { duration: 0.3, ease: cinematicEase },
                                    }}
                                    className={`p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 ${index % 2 !== 0 ? "lg:translate-y-12" : ""}`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${diff.bg} flex items-center justify-center mb-6`}>
                                        <diff.icon className={`w-7 h-7 ${diff.color}`} />
                                    </div>
                                    <h3 className="font-bold text-xl mb-3">{diff.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{diff.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                    </div>
                </div>
            </section>
        </SectionTransition>
    );
}
