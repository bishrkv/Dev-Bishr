import React from 'react';
import { Download, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  aboutText: string;
  projectCount: number;
  messageCount: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ aboutText, projectCount, messageCount }) => {
  const paragraphs = aboutText.split('\n').filter(p => p.trim().length > 0);
  const clientCount = Math.max(projectCount, 3);

  return (
    <section id="about" className="relative py-28 px-4">
      <div className="glow w-[400px] h-[300px] bg-blue-500/[0.04] top-20 right-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Left: Image & Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2"
          >
            <div className="relative max-w-sm mx-auto md:max-w-none">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 blur-3xl -z-10" />

              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-[4/5] bg-zinc-900 shadow-2xl">
                <img
                  src="https://i.postimg.cc/qMt8m2xp/Gemini-Generated-Image-vetc6wvetc6wvetc(1).png"
                  alt="Bishr KV"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = 'https://picsum.photos/seed/bishr/500/650.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-gray-200 font-medium">Available for hire</span>
                </div>
              </div>

              {/* Floating Stat Card with subtle bob */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 card-static p-4 flex items-center gap-4 border-glow shadow-xl backdrop-blur-md bg-black/80"
              >
                <div className="text-center">
                  <div className="text-xl font-bold gradient-blue">2+</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">Years</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div id="aboutProjectCount" className="text-xl font-bold gradient-blue">
                    {projectCount}
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">Projects</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <div className="section-label">About Me</div>
            <h2 className="section-title mb-6">
              Crafting Digital
              <br />
              Experiences
            </h2>

            <div className="space-y-4 mb-8 text-gray-400 font-light leading-relaxed text-sm sm:text-base">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Stat Counters with subtle entrance */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Years', val: '2+' },
                { label: 'Projects', val: `${projectCount}`, id: 'statProjects' },
                { label: 'Clients', val: `${clientCount}+`, id: 'statClients' },
                { label: 'Messages', val: `${messageCount}`, id: 'statMessages' },
              ].map((stat, sIdx) => (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * sIdx, duration: 0.4 }}
                  whileHover={{ y: -3, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  className="card-static p-4 text-center transition-colors"
                >
                  <div id={stat.id} className="text-2xl font-bold gradient-blue">
                    {stat.val}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white text-black font-medium text-xs sm:text-sm rounded-lg px-6 py-3 transition-colors cursor-pointer shadow-md shadow-white/5"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-transparent text-white font-medium text-xs sm:text-sm rounded-lg px-6 py-3 border border-white/15 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

