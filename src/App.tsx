import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { SiteData, Message } from './types';
import { INITIAL_SITE_DATA } from './utils';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { Marquee } from './components/Marquee';
import { AboutSection } from './components/AboutSection';
import { PricingSection } from './components/PricingSection';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AllProjectsModal } from './components/AllProjectsModal';
import { AdminModal } from './components/AdminModal';
import { Toast } from './components/Toast';
import {
  getSiteDataFromFirestore,
  saveSiteDataToFirestore,
  getMessagesFromFirestore,
  saveMessageToFirestore,
  deleteMessageFromFirestore,
  clearAllMessagesFromFirestore
} from './firebase';

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bkv_site_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.projects) && parsed.projects.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Use default
      }
    }
    return INITIAL_SITE_DATA;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bkv_messages');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // Use empty
      }
    }
    return [];
  });

  const [allProjectsModalOpen, setAllProjectsModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Smooth scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // 1. Fetch site data: Firebase Firestore first, fallback to API / localStorage
  const fetchSiteData = useCallback(async () => {
    try {
      const cloudData = await getSiteDataFromFirestore();
      if (cloudData && Array.isArray(cloudData.projects) && cloudData.projects.length > 0) {
        setSiteData(cloudData);
        try {
          localStorage.setItem('bkv_site_data', JSON.stringify(cloudData));
        } catch {
          // Ignore
        }
        return;
      }
    } catch {
      // Fall through to server API or local storage
    }

    try {
      const res = await fetch('/api/site-data');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data && typeof data === 'object' && Array.isArray(data.projects) && data.projects.length > 0) {
          setSiteData(data);
          try {
            localStorage.setItem('bkv_site_data', JSON.stringify(data));
            // Seed Firestore with initial site data
            saveSiteDataToFirestore(data).catch(() => {});
          } catch {
            // Ignore storage errors
          }
          return;
        }
      }
    } catch {
      // Fallback handled by initial state
    }
  }, []);

  // 2. Fetch messages: Firebase Firestore first, fallback to API / localStorage
  const fetchMessages = useCallback(async () => {
    try {
      const cloudMessages = await getMessagesFromFirestore();
      if (Array.isArray(cloudMessages) && cloudMessages.length > 0) {
        setMessages(cloudMessages);
        try {
          localStorage.setItem('bkv_messages', JSON.stringify(cloudMessages));
        } catch {
          // Ignore
        }
        return;
      }
    } catch {
      // Fall through
    }

    try {
      const res = await fetch('/api/messages');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setMessages(data);
          try {
            localStorage.setItem('bkv_messages', JSON.stringify(data));
          } catch {
            // Ignore
          }
        }
      }
    } catch {
      // Handled by localStorage
    }
  }, []);

  useEffect(() => {
    fetchSiteData();
    fetchMessages();
  }, [fetchSiteData, fetchMessages]);

  // 3. Handlers with triple persistence (Firebase Firestore + LocalStorage + Server API)
  const handleSaveSiteData = async (newData: SiteData) => {
    setSiteData(newData);
    try {
      localStorage.setItem('bkv_site_data', JSON.stringify(newData));
    } catch {
      // Ignore
    }

    // Save to Firebase Firestore permanently
    try {
      await saveSiteDataToFirestore(newData);
    } catch (err) {
      console.warn('Firebase sync warning:', err);
    }

    try {
      await fetch('/api/site-data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
    } catch {
      // Local & Firebase already handled
    }
  };

  const handleSendMessage = async (msgData: { name: string; email: string; subject: string; message: string }) => {
    const newMessage: Message = {
      id: 'msg_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: msgData.name.trim(),
      email: msgData.email.trim(),
      subject: msgData.subject.trim() || 'Portfolio Inquiry',
      message: msgData.message.trim(),
      date: new Date().toISOString().slice(0, 10),
      emailSent: false,
      emailError: 'Stored permanently in Firestore & inbox.'
    };

    // Update state and localStorage immediately
    setMessages(prev => {
      const updated = [newMessage, ...prev];
      try {
        localStorage.setItem('bkv_messages', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });

    // Save permanently to Firebase Firestore
    try {
      await saveMessageToFirestore(newMessage);
    } catch (err) {
      console.warn('Firebase message save warning:', err);
    }

    // Also attempt server sync if API is running
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
    } catch {
      // Offline / static host mode (Vercel)
    }

    showToast('Message sent to Bishr KV!');
  };

  const handleDeleteMessage = async (id: string) => {
    setMessages(prev => {
      const updated = prev.filter(m => m.id !== id);
      try {
        localStorage.setItem('bkv_messages', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });

    // Delete from Firebase Firestore
    try {
      await deleteMessageFromFirestore(id);
    } catch (err) {
      console.warn('Firebase message delete warning:', err);
    }

    try {
      await fetch(`/api/messages/${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {
      // Ignore
    }
  };

  const handleClearAllMessages = async () => {
    setMessages([]);
    try {
      localStorage.removeItem('bkv_messages');
    } catch {
      // Ignore
    }

    // Clear all from Firebase Firestore
    try {
      await clearAllMessagesFromFirestore();
    } catch (err) {
      console.warn('Firebase clear warning:', err);
    }

    try {
      await fetch('/api/messages', { method: 'DELETE' });
    } catch {
      // Ignore
    }
  };

  const handleResetAllData = async () => {
    setSiteData(INITIAL_SITE_DATA);
    setMessages([]);
    try {
      localStorage.setItem('bkv_site_data', JSON.stringify(INITIAL_SITE_DATA));
      localStorage.removeItem('bkv_messages');
    } catch {
      // Ignore
    }

    // Reset Firebase Firestore to clean initial data
    try {
      await saveSiteDataToFirestore(INITIAL_SITE_DATA);
      await clearAllMessagesFromFirestore();
    } catch (err) {
      console.warn('Firebase reset warning:', err);
    }

    try {
      await fetch('/api/site-data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(INITIAL_SITE_DATA)
      });
      await fetch('/api/messages', { method: 'DELETE' });
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-[60] origin-left pointer-events-none"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <ProjectsSection
          projects={siteData.projects}
          onOpenAllProjects={() => setAllProjectsModalOpen(true)}
        />
        <Marquee />
        <AboutSection
          aboutText={siteData.about}
          projectCount={siteData.projects.length}
          messageCount={messages.length}
        />
        <PricingSection />
        <SkillsSection skills={siteData.skills} />
        <ServicesSection services={siteData.services} />
        <ExperienceSection timeline={siteData.timeline} />
        <TestimonialsSection testimonials={siteData.testimonials} />
        <ContactSection onSendMessage={handleSendMessage} />
      </main>

      <Footer onOpenAdminLogin={() => setAdminModalOpen(true)} />

      {/* Back to Top Smooth Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#0e101a]/90 border border-white/10 text-gray-300 hover:text-white hover:border-blue-500/50 shadow-lg shadow-black/40 backdrop-blur-md flex items-center justify-center cursor-pointer transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* All Projects Fullscreen Catalogue */}
      <AllProjectsModal
        isOpen={allProjectsModalOpen}
        onClose={() => setAllProjectsModalOpen(false)}
        projects={siteData.projects}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        siteData={siteData}
        messages={messages}
        onSaveSiteData={handleSaveSiteData}
        onDeleteMessage={handleDeleteMessage}
        onClearAllMessages={handleClearAllMessages}
        onResetAllData={handleResetAllData}
        onShowToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
