import React from 'react';
import { Service } from '../types';
import { Code2, Palette, Server, Smartphone, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'palette':
        return <Palette className="w-5 h-5 text-blue-400" />;
      case 'server':
        return <Server className="w-5 h-5 text-blue-400" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-blue-400" />;
      case 'shield-check':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'code-2':
      default:
        return <Code2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="services" className="relative py-28 px-4">
      <div className="glow w-[500px] h-[300px] bg-purple-500/[0.04] top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">Services</div>
          <h2 className="section-title">What I Can Do For You</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6" id="servicesGrid">
          {services.map((sv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -6 }}
              className="card p-6 flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all">
                  {getServiceIcon(sv.icon)}
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{sv.title}</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{sv.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

