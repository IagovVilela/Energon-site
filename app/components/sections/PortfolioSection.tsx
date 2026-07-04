"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { SectionTransition } from "@/app/components/animations/SectionTransition";
import { TextReveal } from "@/app/components/animations/TextReveal";
import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  link?: string | null;
  tags: string | string[];
  category: string;
  images?: { id: string; url: string; caption?: string }[];
}

export function PortfolioSection({ initialProjects = [] }: { initialProjects: Project[] }) {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getTagsArray = (tags: string | string[]): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    return tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0);
  };

  const categories = ["All", ...Array.from(new Set(initialProjects.map((p) => p.category)))];

  const filteredProjects =
    filter === "All" ? initialProjects : initialProjects.filter((p) => p.category === filter);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedProject]);

  const nextImage = () => {
    const images = selectedProject?.images;
    if (!images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = selectedProject?.images;
    if (!images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <SectionTransition variant="fade">
      <section id="portfolio" className="section-padding border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <p className="editorial-label mb-6">03 — {t("nav.portfolio")}</p>
              <TextReveal>
                <h2 className="headline-lg">
                  {t("portfolio.title.prefix")}{" "}
                  <span className="text-primary">{t("portfolio.title.highlight")}</span>
                </h2>
              </TextReveal>
              <TextReveal delay={0.1}>
                <p className="text-muted-foreground mt-4 max-w-lg">{t("portfolio.subtitle")}</p>
              </TextReveal>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-4 py-2 text-xs font-medium uppercase tracking-wider border transition-colors",
                    filter === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-foreground"
                  )}
                >
                  {cat === "All" ? t("portfolio.filterAll") : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isFeatured = index === 0;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={cn(
                      "group relative border border-border overflow-hidden cursor-pointer",
                      isFeatured ? "md:col-span-7 md:row-span-2 min-h-[400px]" : "md:col-span-5 min-h-[280px]"
                    )}
                    onClick={() => {
                      setSelectedProject(project);
                      setCurrentImageIndex(0);
                    }}
                  >
                    <Image
                      src={project.imageUrl || "/placeholder-project.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <span className="editorial-label text-primary mb-2 block">{project.category}</span>
                      <h3 className="font-display text-2xl md:text-3xl mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">{project.description}</p>
                      <span className="inline-flex items-center gap-2 mt-4 text-sm font-medium group-hover:text-primary transition-colors">
                        {t("portfolio.viewDetails")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-background/95 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                className="relative w-full max-w-6xl max-h-[90vh] bg-card border border-border overflow-hidden flex flex-col lg:flex-row"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-background/80 border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={t("portfolio.modal.close")}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative w-full lg:w-[58%] h-[300px] lg:h-auto lg:min-h-[500px] bg-black group">
                  <Image
                    src={
                      selectedProject.images?.[currentImageIndex]?.url ||
                      selectedProject.imageUrl ||
                      "/placeholder-project.jpg"
                    }
                    alt={selectedProject.title}
                    fill
                    className="object-contain"
                  />
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="w-full lg:w-[42%] overflow-y-auto p-8 md:p-12">
                  <p className="editorial-label text-primary mb-4">{t("portfolio.modal.showcase")}</p>
                  <h2 className="font-display text-3xl md:text-4xl mb-4">{selectedProject.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{selectedProject.description}</p>

                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold mb-8 hover:opacity-90 transition-opacity"
                    >
                      {t("portfolio.modal.liveDemo")}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <BlurFade>
                    <p className="editorial-label mb-4">{t("portfolio.modal.techStack")}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {getTagsArray(selectedProject.tags).map((tag) => (
                        <span key={tag} className="px-3 py-1.5 text-sm border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </BlurFade>

                  <p className="text-xs text-muted-foreground">{t("portfolio.modal.footer")}</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </SectionTransition>
  );
}
