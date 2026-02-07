"use client";

import { motion } from "framer-motion";
import { Monitor } from "lucide-react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import LordIcon from "@/app/components/ui/LordIcon";
import { LORDICON_ICONS } from "@/lib/lordicon-icons";

export function ServicesSection() {
    const { t } = useLanguage();

    // Mixed icons: Monitor is static (broken), others are Lordicon
    const services = [
        { icon: LORDICON_ICONS.LAYERS, type: "lordicon", title: t('services.item1.title'), description: t('services.item1.desc') },
        { icon: Monitor, type: "lucide", title: t('services.item2.title'), description: t('services.item2.desc') },
        { icon: LORDICON_ICONS.ZAP, type: "lordicon", title: t('services.item3.title'), description: t('services.item3.desc') },
        { icon: LORDICON_ICONS.TRENDING_UP, type: "lordicon", title: t('services.item4.title'), description: t('services.item4.desc') },
        { icon: LORDICON_ICONS.GLOBE, type: "lordicon", title: t('services.item5.title'), description: t('services.item5.desc') },
        { icon: LORDICON_ICONS.CPU, type: "lordicon", title: t('services.item6.title'), description: t('services.item6.desc') },
    ];

    return (
        <section id="servicos" className="py-24 relative overflow-hidden">
            <div className="container px-4 md:px-6">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        {t('services.title.prefix')} <span className="text-primary">{t('services.title.highlight')}</span>
                    </h2>
                    <p className="text-muted-foreground text-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                        {t('services.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border group transition-all duration-300 cursor-default"
                        >
                            <div className="mb-6 p-4 bg-primary/10 w-fit rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                {service.type === "lordicon" ? (
                                    <LordIcon
                                        src={service.icon as string}
                                        trigger="hover"
                                        size={32}
                                        colors={{ primary: "#3b82f6", secondary: "#3b82f6" }}
                                    />
                                ) : (
                                    <service.icon className="w-8 h-8" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
