export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  image?: string;
  customizable: boolean;
  tags?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image?: string;
  url?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  isNew?: boolean;
  image?: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: string;
}

