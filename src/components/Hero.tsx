import React from 'react';
import { ArrowDownRight, Send, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const roleText = 'Full Stack Developer';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Background ambient lighting with organic floating movement */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="glow w-[700px] h-[500px] bg-blue-500/[0.07] -top-40 -left-40"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="glow w-[550px] h-[450px] bg-purple-500/[0.05] bottom-0 right-0"
      />

      {/* Subtle orbital concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.025] spin-slow pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.025] spin-slow pointer-events-none"
        style={{ animationDirection: 'reverse', animationDuration: '18s' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8 backdrop-blur-sm shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-300 font-medium">Available for work</span>
        </motion.div>

        {/* Hero Title with staggered letter reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold leading-[1.05] mb-6 tracking-tight text-4xl sm:text-6xl md:text-7xl"
        >
          <span className="gradient-text">I'm Bishr KV</span>
          <br />
          <span className="block gradient-blue mt-2 min-h-[3.8rem] sm:min-h-[4.5rem]">
            {roleText.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.035,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          I design and build beautiful, high-performance web experiences with modern frontend and backend architectures.
        </motion.p>

        {/* Call to actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.a
            id="hero-view-work-btn"
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-white text-black font-medium text-sm rounded-lg px-6 py-3 shadow-lg shadow-white/5 transition-colors cursor-pointer"
          >
            View My Work
            <ArrowDownRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            id="hero-contact-btn"
            href="#contact"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-transparent text-white font-medium text-sm rounded-lg px-6 py-3 border border-white/15 transition-all cursor-pointer"
          >
            Get In Touch
            <Send className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">Connect</span>
          <div className="flex items-center justify-center gap-3">
            {[
              {
                id: 'social-github',
                href: 'https://github.com',
                title: 'GitHub',
                img: 'https://i.postimg.cc/rw94Yj3C/icons8-github-50-(1).png'
              },
              {
                id: 'social-linkedin',
                href: 'https://www.linkedin.com',
                title: 'LinkedIn',
                img: 'https://i.postimg.cc/QMXLkNGS/icons8-linkedin-48.png'
              },
              {
                id: 'social-pinterest',
                href: 'https://www.pinterest.com',
                title: 'Pinterest',
                img: 'https://i.postimg.cc/XvTz1nTB/icons8-pinterest-48.png'
              },
              {
                id: 'social-instagram',
                href: 'https://www.instagram.com',
                title: 'Instagram',
                img: 'https://i.postimg.cc/zGQt3JDk/icons8-instagram-logo-94.png'
              },
              {
                id: 'social-whatsapp',
                href: 'https://wa.me/919778024332?text=Hi%20Bishr%2C%20I%20found%20your%20portfolio',
                title: 'WhatsApp',
                img: 'https://i.postimg.cc/qMwBPFJ1/icons8-whatsapp-logo-94.png'
              }
            ].map((soc, sIdx) => (
              <motion.a
                key={soc.id}
                id={soc.id}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.title}
                title={soc.title}
                whileHover={{ scale: 1.15, y: -3, borderColor: 'rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <img src={soc.img} alt={soc.title} className="w-5 h-5 object-contain" loading="lazy" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.a
          href="#projects"
          whileHover={{ y: 2 }}
          className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <ChevronDown className="w-3.5 h-3.5 text-white/50 animate-bounce" />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
};

