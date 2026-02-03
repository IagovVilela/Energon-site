"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ExternalLink,
    Code,
    ChevronLeft,
    ChevronRight,
    X,
    Layers,
    Zap,
    Layout,
    CheckCircle2,
    Globe
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    videoUrl?: string | null;
    link?: string | null;
    tags: string | string[];
    category: string;
    images: { id: string; url: string; caption?: string }[];
}

export function PortfolioSection({ initialProjects = [] }: { initialProjects: Project[] }) {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState("All");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const getTagsArray = (tags: string | string[]): string[] => {
        if (!tags) return [];
        if (Array.isArray(tags)) return tags;
        return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    };

    const categories = ["All", ...Array.from(new Set(initialProjects.map(p => p.category)))];

    const filteredProjects = filter === "All"
        ? initialProjects
        : initialProjects.filter(p => p.category === filter);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedProject(null);
        };
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            window.addEventListener("keydown", handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener("keydown", handleEsc);
        };
    }, [selectedProject]);

    const nextImage = () => {
        if (!selectedProject || isAnimating || !selectedProject.images?.length) return;
        setIsAnimating(true);
        setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevImage = () => {
        if (!selectedProject || isAnimating || !selectedProject.images?.length) return;
        setIsAnimating(true);
        setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <section id="portfolio" className="py-24 relative overflow-hidden bg-background">
            <div className="container px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4"
                        >
                            {t('portfolio.title.prefix')} <span className="text-primary">{t('portfolio.title.highlight')}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg"
                        >
                            {t('portfolio.subtitle')}
                        </motion.p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                                    : "bg-muted/50 hover:bg-muted text-muted-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group relative bg-card rounded-[2rem] border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={project.imageUrl || "/placeholder-project.jpg"}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                                        {project.category}
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {getTagsArray(project.tags).slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary/80 bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <button
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setCurrentImageIndex(0);
                                        }}
                                        className="group/btn inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors"
                                    >
                                        {t('portfolio.viewDetails')}
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* FIXED & PREMIUM MODAL */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-card border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
                        >
                            {/* Close Button - Stays fixed in top right of modal box */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-[2010] p-3 bg-black/50 hover:bg-primary text-white rounded-full transition-all border border-white/10 backdrop-blur-md hover:rotate-90"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Left Side: Media (Independent Scroll or Fixed) */}
                            <div className="relative w-full lg:w-[60%] h-[350px] lg:h-full bg-black group">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={(selectedProject.images?.[currentImageIndex]?.url) || selectedProject.imageUrl || "/placeholder-project.jpg"}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                {selectedProject.images && selectedProject.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-primary text-white rounded-full transition-all backdrop-blur-md shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 z-10"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-primary text-white rounded-full transition-all backdrop-blur-md shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 z-10"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </>
                                )}

                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/10">
                                    {selectedProject.category} • {currentImageIndex + 1}/{selectedProject.images?.length || 1}
                                </div>
                            </div>

                            {/* Right Side: Info (Scrollable independently) */}
                            <div className="w-full lg:w-[40%] flex flex-col h-full overflow-y-auto scrollbar-hide bg-background/50">
                                <div className="p-8 md:p-12">
                                    {/* Header Info */}
                                    <div className="flex items-center gap-2 mb-4 text-xs font-bold text-primary uppercase tracking-[0.2em]">
                                        <Globe className="w-4 h-4" />
                                        Project Showcase
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                        {selectedProject.description}
                                    </p>

                                    {/* Link Button */}
                                    {selectedProject.link && (
                                        <a
                                            href={selectedProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-primary text-white rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 active:scale-95 mb-12"
                                        >
                                            View Live Demo <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}

                                    {/* Tech Stack */}
                                    <div className="mb-12">
                                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 py-2 border-b border-white/5 text-muted-foreground/50">
                                            <Layout className="w-4 h-4" />
                                            Technology Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {getTagsArray(selectedProject.tags).map(tag => (
                                                <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-semibold text-white/80">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div>
                                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 py-2 border-b border-white/5 text-muted-foreground/50">
                                            <Code className="w-4 h-4" />
                                            {t('portfolio.madeWith')}
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                                <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary" />
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    Developed with a focus on high performance, clean architecture, and responsive design systems.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-20 pt-8 border-t border-white/5 text-center">
                                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-30">
                                            Energon Solutions © 2026
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
