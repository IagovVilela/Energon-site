"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, DollarSign, Rocket, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { TiltCard } from "@/app/components/ui/TiltCard";
import { AnimatedCounter } from "@/app/components/ui/AnimatedCounter";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function AboutSection({ config }: { config?: any }) {
    const { t } = useLanguage();
    const { ref: headerRef, isInView: headerInView } = useScrollReveal();
    const { ref: statsRef, isInView: statsInView } = useScrollReveal();

    const benefits = [
        {
            icon: Rocket,
            title: t('about.benefit1.title'),
            description: t('about.benefit1.description'),
            highlight: t('about.benefit1.highlight')
        },
        {
            icon: DollarSign,
            title: t('about.benefit2.title'),
            description: t('about.benefit2.description'),
            highlight: t('about.benefit2.highlight')
        },
        {
            icon: Shield,
            title: t('about.benefit3.title'),
            description: t('about.benefit3.description'),
            highlight: t('about.benefit3.highlight')
        }
    ];

    const results = [
        { icon: Users, value: "100", label: t('about.results.clients'), color: "text-green-500", suffix: "%" },
        { icon: TrendingUp, value: "+50", label: t('about.results.projects'), color: "text-blue-500" },
        { icon: Shield, value: "100%", label: "Garantia de Qualidade", color: "text-purple-500", suffix: "%" },
    ];

    const whatYouGet = [
        { icon: CheckCircle2, text: t('about.whatYouGet.item1') },
        { icon: CheckCircle2, text: t('about.whatYouGet.item2') },
        { icon: CheckCircle2, text: t('about.whatYouGet.item3') },
        { icon: CheckCircle2, text: t('about.whatYouGet.item4') },
        { icon: CheckCircle2, text: t('about.whatYouGet.item5') },
        { icon: CheckCircle2, text: t('about.whatYouGet.item6') },
    ];

    return (
        <section id="sobre" className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
            {/* Subtle background gradient blob */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="container px-4 md:px-6 relative z-10">

                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial="hidden"
                    animate={headerInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        {t('about.header.title')} <span className="text-gradient-primary">{t('about.header.highlight')}</span>
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg text-muted-foreground"
                    >
                        {t('about.header.subtitle')}
                    </motion.p>
                </motion.div>

                {/* Benefits Grid with 3D Tilt */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <TiltCard
                                className="relative group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all overflow-hidden h-full"
                                tiltStrength={8}
                            >
                                {/* Animated gradient on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ transform: "translateZ(-10px)" }}
                                />

                                <div className="relative" style={{ transform: "translateZ(20px)" }}>
                                    <motion.div
                                        className="mb-4 p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary group-hover:text-white transition-all"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <benefit.icon className="w-6 h-6" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground mb-4">{benefit.description}</p>
                                    <motion.div
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <Zap className="w-4 h-4 text-green-500" />
                                        </motion.div>
                                        <span className="text-sm font-semibold text-green-500">{benefit.highlight}</span>
                                    </motion.div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* Results with Animated Counters */}
                <motion.div
                    ref={statsRef}
                    initial="hidden"
                    animate={statsInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="grid grid-cols-3 gap-4 mb-16 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-blue-500/5 border border-primary/20 backdrop-blur-sm"
                >
                    {results.map((result, index) => (
                        <motion.div
                            key={index}
                            className="text-center group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.2
                                }}
                            >
                                <result.icon className={`w-8 h-8 mx-auto mb-2 ${result.color} group-hover:scale-110 transition-transform`} />
                            </motion.div>
                            <div className="text-3xl md:text-4xl font-bold mb-1">
                                {statsInView ? <AnimatedCounter value={result.value} duration={1.5} /> : result.value}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground">{result.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* What You Get */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('about.whatYouGet.title')}</h3>
                        <p className="text-muted-foreground">{t('about.whatYouGet.subtitle')}</p>
                    </motion.div>

                    <motion.div
                        className="grid sm:grid-cols-2 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {whatYouGet.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ x: 4, scale: 1.02 }}
                                className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all group cursor-pointer"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                                >
                                    <item.icon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                </motion.div>
                                <span className="text-sm md:text-base">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 relative overflow-hidden group"
                    >
                        {/* Animated shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{
                                x: ["-100%", "200%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 2
                            }}
                        />

                        <h4 className="text-xl font-bold mb-2 relative z-10">{t('about.cta.title')}</h4>
                        <p className="text-muted-foreground mb-6 relative z-10">{t('about.cta.subtitle')}</p>
                        <motion.a
                            href="#contato"
                            className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg shadow-lg shadow-primary/20"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Rocket className="w-5 h-5" />
                            {t('about.cta.button')}
                        </motion.a>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
