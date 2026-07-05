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
import { SectionHeader, SectionShell } from "@/app/components/layout/SectionShell";
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

function projectDescriptionPreview(description: string, maxLength = 140): string {
  const plain = description
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}…`;
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
      <SectionShell id="portfolio" tone="muted" labelledBy="portfolio-heading">
        <SectionHeader
          index="03"
          align="split"
          label={t("nav.portfolio")}
          title={
            <span id="portfolio-heading">
              {t("portfolio.title.prefix")}{" "}
              <span className="text-primary">{t("portfolio.title.highlight")}</span>
            </span>
          }
          subtitle={t("portfolio.subtitle")}
          className="max-w-none"
        />

        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 pb-6 border-b border-border/60">
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
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
                      isFeatured ? "md:col-span-7 md:row-span-2 min-h-[260px] sm:min-h-[320px] md:min-h-[400px]" : "md:col-span-5 min-h-[240px] sm:min-h-[280px]"
                    )}
                    onClick={() => {
                      setSelectedProject(project);
                      setCurrentImageIndex(0);
                    }}
                  >
                    <Image
                      src={project.imageUrl || "/placeholder-project.jpg"}
                      alt=""
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background from-35% via-background/75 via-55% to-transparent"
                      aria-hidden
                    />
                    <div
                      className={cn(
                        "absolute inset-x-0 bottom-0 z-10 border-t border-border/60",
                        "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/88",
                        isFeatured ? "p-5 sm:p-6 md:p-8" : "p-4 sm:p-5"
                      )}
                    >
                      <span className="editorial-label text-primary mb-1.5 sm:mb-2 block">
                        {project.category}
                      </span>
                      <h3
                        className={cn(
                          "font-display text-foreground leading-tight mb-1.5 sm:mb-2",
                          isFeatured ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl line-clamp-2"
                        )}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground leading-snug",
                          isFeatured ? "line-clamp-2 max-w-lg" : "line-clamp-1"
                        )}
                      >
                        {projectDescriptionPreview(project.description, isFeatured ? 160 : 100)}
                      </p>
                      <span className="inline-flex items-center gap-2 mt-3 sm:mt-4 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {t("portfolio.viewDetails")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
      </SectionShell>

        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[2000] flex items-stretch sm:items-center justify-center p-0 sm:p-4 md:p-8">
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
                className="relative w-full h-full sm:h-auto sm:max-w-6xl sm:max-h-[90vh] bg-card border-0 sm:border border-border overflow-hidden flex flex-col lg:flex-row"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-background/80 border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={t("portfolio.modal.close")}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative w-full lg:w-[58%] h-[38vh] sm:h-[300px] lg:h-auto lg:min-h-[500px] bg-black group shrink-0">
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
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-background/80 border border-border sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-background/80 border border-border sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        aria-label="Next"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="w-full lg:w-[42%] overflow-y-auto p-5 sm:p-8 md:p-12 flex-1 min-h-0">
                  <p className="editorial-label text-primary mb-3 sm:mb-4">{t("portfolio.modal.showcase")}</p>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">{selectedProject.title}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 whitespace-pre-line">
                    {projectDescriptionPreview(selectedProject.description, 2000)}
                  </p>

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
    </SectionTransition>
  );
}
