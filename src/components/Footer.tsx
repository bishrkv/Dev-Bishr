import React from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminLogin }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-t border-white/[0.04] pt-16 pb-10 px-4 bg-black/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="text-xl font-bold gradient-blue">
              Bishr KV.
            </a>
            <p className="text-sm text-gray-400 font-light mt-3 leading-relaxed max-w-sm">
              Full stack developer crafting high-performance, aesthetically pleasing web experiences for global clients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">Quick Links</h4>
            <div className="space-y-2.5">
              <a href="#home" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="#projects" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#about" className="block text-sm text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#skills" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Skills
              </a>
              <a href="#contact" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <img src="https://i.postimg.cc/rw94Yj3C/icons8-github-50-(1).png" alt="GitHub" className="w-4 h-4 object-contain" loading="lazy" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <img src="https://i.postimg.cc/QMXLkNGS/icons8-linkedin-48.png" alt="LinkedIn" className="w-4 h-4 object-contain" loading="lazy" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <img src="https://i.postimg.cc/XvTz1nTB/icons8-pinterest-48.png" alt="Pinterest" className="w-4 h-4 object-contain" loading="lazy" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <img src="https://i.postimg.cc/zGQt3JDk/icons8-instagram-logo-94.png" alt="Instagram" className="w-4 h-4 object-contain" loading="lazy" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919778024332?text=Hi%20Bishr%2C%20I%20found%20your%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <img src="https://i.postimg.cc/qMwBPFJ1/icons8-whatsapp-logo-94.png" alt="WhatsApp" className="w-4 h-4 object-contain" loading="lazy" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()}{' '}
            <button
              id="admin-trigger-link"
              onClick={onOpenAdminLogin}
              title="Admin Access"
              className="text-gray-400 hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-4 cursor-pointer inline-flex items-center gap-1"
            >
              <span>Bishr KV</span>
              <Lock className="w-3 h-3 opacity-60" />
            </button>
            . All rights reserved.
          </p>
          <p>
            Built with <span className="text-red-400">♥</span> by{' '}
            <span className="text-gray-300 font-medium">Graphic.bishr</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

