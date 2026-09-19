export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Tools' | string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface TimelineItem {
  title: string;
  company: string;
  period: string;
  type: 'work' | 'education';
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  image: string;
  url: string;
  featured: boolean;
  date?: string;
  createdAt?: number;
}

export interface Testimonial {
  name: string;
  role?: string;
  text: string;
  rating: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  emailSent?: boolean;
  emailError?: string;
}

export interface SiteData {
  about: string;
  skills: Skill[];
  services: Service[];
  timeline: TimelineItem[];
  projects: Project[];
  testimonials: Testimonial[];
}
