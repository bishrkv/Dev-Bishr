import React, { useState } from 'react';
import { Project } from '../types';
import { normalizeUrl, cleanProjectImageUrl } from '../utils';
import { X, ExternalLink, Search, Globe, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}

export const AllProjectsModal: React.FC<AllProjectsModalProps> = ({ isOpen, onClose, projects }) => {
  const [search, setSearch] = useState('');
  const [techFilter, setTechFilter] = useState('all');

  if (!isOpen) return null;

  // Extract unique tech tags
  const allTechs = Array.from(
    new Set(
      projects
        .flatMap(p => (p.tech ? p.tech.split(',').map(t => t.trim()) : []))
        .filter(Boolean)
    )
  );

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.toLowerCase().includes(search.toLowerCase());

    const matchesTech =
      techFilter === 'all' ||
      (p.tech && p.tech.toLowerCase().includes(techFilter.toLowerCase()));

    return matchesSearch && matchesTech;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto"
    >
      {/* Top sticky bar */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back Home</span>
            </motion.button>
            <span className="font-bold text-sm gradient-blue hidden sm:inline">Bishr KV Portfolio</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="section-label justify-center">Complete Showcase</div>
          <h1 className="text-3xl sm:text-5xl font-semibold mb-3 tracking-tight">
            <span className="gradient-text">All Projects</span>
          </h1>
          <p className="text-gray-400 font-light text-sm max-w-xl mx-auto">
            A comprehensive catalog of client projects, commercial websites, and applications built by Bishr KV.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by name, keyword, or tech stack..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.02] transition-all"
            />
          </div>

          <select
            value={techFilter}
            onChange={e => setTechFilter(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="all" className="bg-zinc-900 text-white">
              All Technologies
            </option>
            {allTechs.map((tech, idx) => (
              <option key={idx} value={tech} className="bg-zinc-900 text-white">
                {tech}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 card-static">
            <p className="text-gray-400 text-sm">No projects matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, index) => {
              const urlInfo = normalizeUrl(p.url);
              const number = String(index + 1).padStart(2, '0');
              const imgSrc = cleanProjectImageUrl(p.image, index + 1);

              return (
                <motion.a
                  key={p.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  whileHover={{ y: -6 }}
                  href={urlInfo.valid ? urlInfo.url : '#'}
                  target={urlInfo.valid ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group card overflow-hidden flex flex-col transition-colors block"
                >
                  <div className="relative overflow-hidden aspect-[16/10] bg-zinc-950 border-b border-white/[0.06]">
                    <span className="absolute top-3 left-3 z-10 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-xs font-semibold text-blue-400">
                      {number}
                    </span>

                    {p.featured && (
                      <span className="absolute top-3 right-3 z-10 text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded backdrop-blur-sm">
                        ⭐ Featured
                      </span>
                    )}

                    <img
                      src={imgSrc}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = `https://picsum.photos/seed/${index + 1}/600/400.jpg`;
                      }}
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {p.title}
                        </h3>
                        {urlInfo.valid ? (
                          <ExternalLink className="w-3.5 h-3.5 text-blue-400 opacity-60 group-hover:opacity-100 flex-shrink-0" />
                        ) : (
                          <Globe className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                        )}
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
            })}
          </div>
        )}
      </main>
    </motion.div>
  );
};

