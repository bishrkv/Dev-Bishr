import { SiteData, Project } from './types';

export const INITIAL_SITE_DATA: SiteData = {
  about: "I'm Bishr KV, a passionate full stack web developer from India. I build modern, responsive web applications.\n\nWith expertise in frontend and backend technologies, I bring ideas to life from concept to deployment.",
  skills: [
    { name: 'HTML5', level: 95, category: 'Frontend' },
    { name: 'CSS3', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 92, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'Express.js', level: 78, category: 'Backend' },
    { name: 'MongoDB', level: 75, category: 'Backend' },
    { name: 'Firebase', level: 82, category: 'Backend' },
    { name: 'Git & GitHub', level: 88, category: 'Tools' },
    { name: 'VS Code', level: 95, category: 'Tools' },
    { name: 'Figma', level: 75, category: 'Tools' }
  ],
  services: [
    { title: 'Web Development', description: 'Fast, responsive websites.', icon: 'code-2' },
    { title: 'UI/UX Design', description: 'Intuitive interfaces.', icon: 'palette' },
    { title: 'Backend', description: 'APIs and databases.', icon: 'server' },
    { title: 'Responsive', description: 'Pixel-perfect everywhere.', icon: 'smartphone' },
    { title: 'Performance', description: 'Speed and SEO.', icon: 'zap' },
    { title: 'Maintenance', description: 'Ongoing support.', icon: 'shield-check' }
  ],
  timeline: [
    { title: 'Freelance Developer', company: 'Self Employed', period: '2024 - Present', type: 'work', description: 'Building websites for clients worldwide.' },
    { title: 'Web Dev Intern', company: 'Tech Startup', period: '2023 - 2024', type: 'work', description: 'Web apps and REST APIs.' },
    { title: 'Higher Secondary', company: 'Govt College', period: '2021 - 2023', type: 'education', description: 'Computer Science.' }
  ],
  projects: [
    { id: 'p1', title: 'Nahdi Mandi', description: 'Awonderful Website for Nahdi.', tech: 'React, Tailwind, Node.js', image: 'https://i.postimg.cc/K8wVX2p8/Screenshot-2026-06-21-174520.png', url: 'https://nahdimandi.lovable.app/', featured: true, date: '2025-01-15' },
    { id: 'p2', title: 'Portfolio for Ameershaji', description: 'Awonderful Portfolio for Ameerhsaji.', tech: 'React, Tailwind, Node.js', image: 'https://i.postimg.cc/J4JH3cVR/Screenshot-2026-06-21-173757.png', url: 'https://ameershaji.vercel.app/', featured: true, date: '2025-01-15' },
    { id: 'p3', title: 'Graphic bishr', description: 'Awonderful portfolio for Bishr.', tech: 'React, Tailwind, Node.js', image: 'https://i.postimg.cc/ZKNDLGNF/111.png', url: 'https://graphicbishr.vercel.app/', featured: true, date: '2025-01-15' },
    { id: 'p4', title: 'Shozio', description: 'Awonderful portfolio Shoe brand.', tech: 'React, Tailwind, Node.js', image: 'https://i.postimg.cc/Bn9DR7c6/ghjhgjhg.png', url: 'https://shoezio.vercel.app/', featured: true, date: '2025-01-15' },
    { id: 'p5', title: 'Wami Clubwears', description: 'Awonderful website for a clothing brand.', tech: 'React, Tailwind, Node.js', image: 'https://i.postimg.cc/tTh517F9/3.png', url: 'https://wamiclubwears.vercel.app/', featured: false, date: '2025-01-15' },
    { id: 'p6', title: 'Watchlab', description: 'Dark portfolio with animations and admin panel.', tech: 'HTML, CSS, JS', image: 'https://i.postimg.cc/52Y8Y6V8/3.png', url: 'https://watchlabstore.vercel.app/', featured: false, date: '2025-04-05' },
    { id: 'p7', title: 'Zochafoodie', description: 'Kanban task manager with drag-and-drop.', tech: 'React, MongoDB', image: 'https://i.postimg.cc/tTh517Fq/2.png', url: 'https://zochafoodie.vercel.app/', featured: true, date: '2025-05-12' },
    { id: 'p8', title: 'Mentorship', description: 'A intractive website for maintainnig the ralation between Mentor and Mentee.', tech: 'React, MongoDB', image: 'https://i.postimg.cc/g0cKBBmv/Screenshot-2026-06-21-175130.png', url: 'https://mentorbk.vercel.app/', featured: false, date: '2025-05-12' },
    { id: 'p9', title: 'Juiceio', description: 'Real-time weather with 7-day forecast.', tech: 'JavaScript, API', image: 'https://i.postimg.cc/02ZVd6Ft/1.png', url: 'https://juiceio.vercel.app/', featured: true, date: '2025-06-20' },
    { id: 'p10', title: 'Portfolio for Ameershaji', description: 'Awonderful Portfolio for Ameerhsaji.', tech: 'JavaScript, API', image: 'https://i.postimg.cc/xjLbM3Sn/Screenshot-2026-06-21-175355.png', url: 'https://ameershaji-2.vercel.app/', featured: false, date: '2025-06-01' }
  ],
  testimonials: [
    { name: 'MR Shamal', role: 'Startup Founder', text: 'Outstanding work!', rating: 5 },
    { name: 'Dr Raif Tp', role: 'AI Specialist', text: 'Beyond expectations!', rating: 5 },
    { name: 'Yaseen B', role: 'Designer', text: 'Great attention to detail.', rating: 4 }
  ]
};

export function normalizeUrl(input?: string): { valid: boolean; url: string; display: string } {
  if (!input) return { valid: false, url: '', display: '' };
  let url = input.trim();
  if (!url) return { valid: false, url: '', display: '' };
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (!host.includes('.') && host !== 'localhost') return { valid: false, url: '', display: '' };
    return { valid: true, url, display: u.hostname + (u.pathname === '/' ? '' : u.pathname) };
  } catch {
    return { valid: false, url: '', display: '' };
  }
}

export function getDomainType(url: string): string {
  try {
    const h = new URL(url).hostname.toLowerCase();
    if (h.includes('vercel.app')) return 'Vercel';
    if (h.includes('netlify.app')) return 'Netlify';
    if (h.includes('github.io')) return 'GitHub Pages';
    if (h.includes('lovable.app')) return 'Lovable';
    if (h.includes('cloudflare.pages')) return 'Cloudflare';
    if (h.includes('firebaseapp.com')) return 'Firebase';
    if (h.includes('herokuapp.com')) return 'Heroku';
    return '';
  } catch {
    return '';
  }
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const aTime = a.createdAt || (a.date ? new Date(a.date).getTime() : 0);
    const bTime = b.createdAt || (b.date ? new Date(b.date).getTime() : 0);
    return bTime - aTime;
  });
}

export function getFallbackImage(seed: string | number): string {
  return `https://picsum.photos/seed/${seed}/600/400.jpg`;
}

export function cleanProjectImageUrl(rawUrl?: string, fallbackSeed: string | number = 'project'): string {
  if (!rawUrl || !rawUrl.trim()) {
    return getFallbackImage(fallbackSeed);
  }
  return rawUrl.trim();
}
