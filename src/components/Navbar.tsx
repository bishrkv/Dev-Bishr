import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        id="main-nav"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-5 px-4"
      >
        <div className="nav-glass rounded-full py-2.5 px-5 flex items-center justify-between gap-6 max-w-2xl w-full">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="font-bold text-sm tracking-tight whitespace-nowrap gradient-blue"
          >
            Bishr KV.
          </motion.a>

          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <a href="#home" className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5">
              Home
            </a>
            <a href="#projects" className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5">
              Work
            </a>
            <a href="#about" className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5">
              About
            </a>
            <a href="#pricing" className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5">
              Pricing
            </a>
            <a href="#skills" className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5">
              Skills
            </a>
            <a href="#contact" className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex items-center gap-1.5 bg-white text-black font-medium text-xs rounded-full px-4 py-1.5 shadow-md shadow-white/5 transition-colors"
            >
              Let's Talk
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>

            <motion.button
              id="mobile-menu-btn"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Navigation Menu"
              className="md:hidden w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-7"
          >
            <motion.button
              onClick={closeMobileMenu}
              whileTap={{ scale: 0.9 }}
              aria-label="Close Navigation Menu"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {[
              { href: '#home', label: 'Home' },
              { href: '#projects', label: 'Work' },
              { href: '#about', label: 'About' },
              { href: '#pricing', label: 'Pricing' },
              { href: '#skills', label: 'Skills' },
              { href: '#contact', label: 'Contact' },
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.35 }}
                className="text-2xl font-light text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              onClick={closeMobileMenu}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

