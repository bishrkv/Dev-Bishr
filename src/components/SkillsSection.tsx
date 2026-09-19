import React from 'react';
import { Skill } from '../types';
import { Monitor, Server, Wrench, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const categories = Array.from(new Set(skills.map(s => s.category || 'General')));

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Monitor className="w-4 h-4 text-blue-400" />;
      case 'backend':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-blue-400" />;
      default:
        return <Code2 className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-28 px-4 dot-pattern">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">My Skills</div>
          <h2 className="section-title">Technologies I Work With</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6" id="skillsContainer">
          {categories.map((cat, idx) => {
            const catSkills = skills.filter(s => (s.category || 'General') === cat);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -6 }}
                className="card p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        {getCategoryIcon(cat)}
                      </div>
                      <h3 className="text-sm font-semibold text-white">{cat}</h3>
                    </div>
                    <span className="text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full font-medium">
                      {catSkills.length} skills
                    </span>
                  </div>

                  <div className="space-y-4">
                    {catSkills.map((skill, sIdx) => {
                      const level = Math.min(100, Math.max(0, skill.level));
                      return (
                        <div key={sIdx}>
                          <div className="flex items-center justify-between mb-1.5 text-xs">
                            <span className="text-gray-300 font-medium">{skill.name}</span>
                            <span className="text-gray-500 font-mono text-[11px]">{level}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.9,
                                delay: 0.2 + sIdx * 0.08,
                                ease: [0.16, 1, 0.3, 1]
                              }}
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

