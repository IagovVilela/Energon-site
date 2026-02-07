"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
// import { ArrowRight, Sparkles } from "lucide-react"; // Removed static icons
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { useEffect } from "react";
import LordIcon from "@/app/components/ui/LordIcon";
import { LORDICON_ICONS } from "@/lib/lordicon-icons";

export function HeroSection({ config }: { config?: any }) {
    const { t } = useLanguage();

    // Seamless loop background animation
    const backgroundY = useMotionValue(0);
    const backgroundOpacity = useMotionValue(0.3);

    useEffect(() => {
        const yAnimation = animate(backgroundY, [0, -100, 0], {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        });

        const opacityAnimation = animate(backgroundOpacity, [0.3, 0.5, 0.3], {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
        });

        return () => {
            yAnimation.stop();
            opacityAnimation.stop();
        };
    }, [backgroundY, backgroundOpacity]);

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">

            {/* Seamless loop background grid */}
            <motion.div
                className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none"
                style={{
                    y: backgroundY,
                    opacity: backgroundOpacity
                }}
            />

            {/* Animated gradient blobs - seamless loop */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"
            />

            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.15, 0.3, 0.15],
                    x: [0, -30, 0],
                    y: [0, 40, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: 2
                }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none"
            />

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">

                {/* Animated Badge with pulse */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative mb-8"
                >
                    {/* Pulsing glow behind badge */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-primary/30 blur-xl rounded-full"
                    />

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary backdrop-blur-md"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <LordIcon
                                src={LORDICON_ICONS.SPARKLES}
                                trigger="loop"
                                size={20}
                                colors={{ primary: "#eab308", secondary: "#eab308" }} // Yellow/Gold
                            />
                        </motion.div>
                        <span className="text-xs font-bold uppercase tracking-widest">{t('hero.badge')}</span>
                    </motion.div>
                </motion.div>

                {/* Animated Title with gradient */}
                <motion.h1
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1]"
                >
                    {t('hero.title.part1')} <br />
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-cyan-500"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: "200% 200%"
                        }}
                    >
                        {t('hero.title.part2')}
                    </motion.span>{" "}
                    {t('hero.title.part3')}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-[700px] text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
                >
                    {t('hero.subtitle')}
                </motion.p>

                {/* Floating Code Symbol with 3D rotation on hover */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                        y: [0, -10, 0],
                        scale: 1
                    }}
                    transition={{
                        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 0.6, delay: 0.6 }
                    }}
                    whileHover={{
                        rotateY: 180,
                        scale: 1.2,
                        opacity: 1
                    }}
                    className="mb-8 text-primary font-mono font-bold text-3xl tracking-tighter cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {`/>`}
                </motion.div>

                {/* Magnetic Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <MagneticButton
                        href="#contato"
                        strength={0.25}
                        className="group relative inline-flex h-14 sm:h-16 items-center justify-center overflow-hidden rounded-2xl bg-primary px-10 font-bold text-lg text-white shadow-2xl shadow-primary/30"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t('hero.cta')}
                            <LordIcon
                                src={LORDICON_ICONS.ARROW_RIGHT}
                                trigger="loop-on-hover"
                                size={24}
                                colors={{ primary: "#ffffff", secondary: "#ffffff" }}
                            />
                        </span>

                        {/* Animated shimmer effect */}
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%"],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                                backgroundSize: "200% 100%"
                            }}
                        />
                    </MagneticButton>

                    <MagneticButton
                        href="#portfolio"
                        strength={0.2}
                        className="inline-flex h-14 sm:h-16 items-center justify-center rounded-2xl border-2 border-border bg-background/50 backdrop-blur-xl px-10 font-bold text-lg hover:bg-accent hover:border-primary/50 transition-all"
                    >
                        {t('hero.viewProjects')}
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
