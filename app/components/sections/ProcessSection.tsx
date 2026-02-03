"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";

export function ProcessSection() {
    const { t } = useLanguage();

    const steps = [
        { icon: MessageSquare, title: t('process.step1.title'), description: t('process.step1.desc') },
        { icon: FileText, title: t('process.step2.title'), description: t('process.step2.desc') },
        { icon: Code2, title: t('process.step3.title'), description: t('process.step3.desc') },
        { icon: Rocket, title: t('process.step4.title'), description: t('process.step4.desc') },
    ];

    return (
        <section id="processo" className="py-24 relative overflow-hidden bg-muted/5">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] -rotate-12 rounded-full pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        {t('process.title.prefix')} <span className="text-primary">{t('process.title.highlight')}</span>
                    </motion.h2>
                    <p className="text-muted-foreground">{t('process.subtitle')}</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[24px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Dot on line */}
                                <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full z-10 group-hover:scale-150 group-hover:bg-primary transition-all duration-300" />

                                <div className="mt-8 md:mt-12 p-6 rounded-2xl bg-card border border-border/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 w-full h-full flex flex-col items-center">
                                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
