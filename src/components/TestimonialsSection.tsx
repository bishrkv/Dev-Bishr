import React from 'react';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">Testimonials</div>
          <h2 className="section-title">What Clients Say</h2>
        </motion.div>

        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">No testimonials added yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6" id="testimonialsGrid">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-7 flex flex-col justify-between transition-colors bg-gradient-to-br from-blue-500/[0.04] to-purple-500/[0.04] border border-white/[0.06] hover:border-blue-500/30"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className={`w-3.5 h-3.5 ${
                          sIdx < t.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-300 font-light leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-sm font-semibold text-blue-300">
                    {t.name ? t.name.charAt(0) : 'U'}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{t.name}</h4>
                    {t.role && <p className="text-[11px] text-gray-400 font-light">{t.role}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

