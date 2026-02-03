import {
  Service,
  PortfolioItem,
  Certification,
  NewsItem,
  Testimonial,
  ProcessStep,
  Differentiator,
} from './content-types';

// Import JSON files directly - Next.js will handle this
import servicesData from '@/data/services.json';
import portfolioData from '@/data/portfolio.json';
import certificationsData from '@/data/certifications.json';
import newsData from '@/data/news.json';
import testimonialsData from '@/data/testimonials.json';
import processData from '@/data/process.json';
import differentiatorsData from '@/data/differentiators.json';

export function loadServices(): Service[] {
  return servicesData as Service[];
}

export function loadPortfolio(): PortfolioItem[] {
  return portfolioData as PortfolioItem[];
}

export function loadCertifications(): Certification[] {
  return certificationsData as Certification[];
}

export function loadNews(): NewsItem[] {
  return newsData as NewsItem[];
}

export function loadTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function loadProcess(): ProcessStep[] {
  return processData as ProcessStep[];
}

export function loadDifferentiators(): Differentiator[] {
  return differentiatorsData as Differentiator[];
}

