import React from 'react';
import { Project } from '../types';
import { normalizeUrl, getDomainType, cleanProjectImageUrl } from '../utils';
import { ExternalLink, ArrowUpRight, FolderOpen, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenAllProjects: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onOpenAllProjects }) => {
  const featuredProjects = projects.filter(p => p.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 6);

  return (
    <section id="projects" className="relative py-28 px-4">
      <div className="glow w-[600px] h-[400px] bg-blue-500/[0.05] top-10 right-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <div className="section-label">Selected Work</div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="text-gray-500 font-light text-sm mt-3 max-w-md">
              A curated selection of live client websites and web applications. Click any project to visit.
            </p>
          </div>

          <div>
            <div className="card-static px-5 py-3 flex items-center gap-2">
              <span id="heroProjectCount" className="text-xl font-bold gradient-blue">
                {projects.length}
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Projects</span>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {displayProjects.length === 0 ? (
          <div className="text-center py-20 card-static">
            <FolderOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">No projects added yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="projectsGrid">
            {displayProjects.map((p, index) => {
              const urlInfo = normalizeUrl(p.url);
              const domainType = urlInfo.valid ? getDomainType(urlInfo.url) : '';
              const number = String(index + 1).padStart(2, '0');
              const imgSrc = cleanProjectImageUrl(p.image, index + 1);

              if (urlInfo.valid) {
                return (
                  <motion.a
                    key={p.id || index}
                    href={urlInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.55,
                      delay: (index % 3) * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -6 }}
                    className="group card overflow-hidden flex flex-col block transition-colors hover:border-white/20 cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-[16/10] bg-zinc-950 border-b border-white/[0.06]">
                      <span className="absolute top-3 left-3 z-10 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-xs font-semibold text-blue-400">
                        {number}
                      </span>

                      {domainType && (
                        <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                          <Globe className="w-2.5 h-2.5" />
                          {domainType}
                        </span>
                      )}

                      <img
                        src={imgSrc}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = `https://picsum.photos/seed/${index + 1}/600/400.jpg`;
                        }}
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                        <div className="flex items-center gap-1.5 text-white font-medium text-xs">
                          <span>Visit Live Website</span>
                          <ArrowUpRight className="w-4 h-4 text-blue-400" />
                        </div>
                        <p className="text-[11px] text-gray-300 mt-0.5 truncate">{urlInfo.display}</p>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {p.title}
                          </h3>
                          <ExternalLink className="w-3.5 h-3.5 text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                        <p className="text-xs text-gray-400 font-light leading-relaxed mb-4 line-clamp-2">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {p.tech
                          ? p.tech.split(',').map((t, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              >
                                {t.trim()}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={p.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: (index % 3) * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="card overflow-hidden flex flex-col opacity-80"
                >
                  <div className="relative overflow-hidden aspect-[16/10] bg-zinc-950 border-b border-white/[0.06]">
                    <span className="absolute top-3 left-3 z-10 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-xs font-semibold text-blue-400">
                      {number}
                    </span>
                    <span className="absolute top-3 right-3 z-10 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      Offline
                    </span>
                    <img src={imgSrc} alt={p.title} className="w-full h-full object-cover opacity-60" loading="lazy" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-2">{p.title}</h3>
                      <p className="text-xs text-gray-500 font-light leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {p.tech
                        ? p.tech.split(',').map((t, idx) => (
                            <span key={idx} className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-gray-400">
                              {t.trim()}
                            </span>
                          ))
                        : null}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            id="view-all-projects-btn"
            onClick={onOpenAllProjects}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-transparent text-white font-medium text-sm rounded-lg px-8 py-3.5 border border-white/15 hover:bg-white/5 hover:border-white/30 transition-colors cursor-pointer"
          >
            All Projects ({projects.length})
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

