export interface HeroProject {
  id: string;
  title: string;
  category: string;
  imageUrl?: string | null;
  images?: { id: string; url: string }[];
}

export function getHeroProjectSlides(projects: HeroProject[]) {
  const slides: { id: string; title: string; imageUrl: string; category: string }[] = [];

  for (const project of projects) {
    if (project.imageUrl) {
      slides.push({
        id: `${project.id}-cover`,
        title: project.title,
        imageUrl: project.imageUrl,
        category: project.category,
      });
    }

    for (const image of project.images ?? []) {
      if (image.url === project.imageUrl) continue;
      slides.push({
        id: `${project.id}-${image.id}`,
        title: project.title,
        imageUrl: image.url,
        category: project.category,
      });
    }
  }

  return slides.slice(0, 10);
}
