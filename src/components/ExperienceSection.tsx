import React from 'react';
import { TimelineItem } from '../types';
import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface ExperienceSectionProps {
  timeline: TimelineItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ timeline }) => {
  return (
    <section id="experience" className="relative py-28 px-4 dot-pattern">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">Journey</div>
          <h2 className="section-title">Experience & Education</h2>
        </motion.div>

        <div className="relative pl-8 sm:pl-10" id="timelineContainer">
          {/* Timeline Vertical Track Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute left-[15px] top-2 bottom-4 w-px bg-white/[0.08] origin-top"
          />

          <div className="space-y-8">
            {timeline.map((item, idx) => {
              const isWork = item.type === 'work';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative group"
                >
                  {/* Timeline node dot */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[29px] top-1.5 w-3 h-3 rounded-full border-2 border-[#050505] z-10 transition-transform group-hover:scale-125 ${
                      isWork ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                    }`}
                  />

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="card-static p-5 sm:p-6 ml-2 transition-all hover:border-white/15 cursor-default"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isWork ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                          }`}
                        >
                          {isWork ? <Briefcase className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                          <p className="text-xs text-blue-400 font-medium">{item.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-[11px] text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-full font-mono">
                          {item.period}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isWork ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed pl-9 sm:pl-9">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

