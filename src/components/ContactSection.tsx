import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSectionProps {
  onSendMessage: (data: { name: string; email: string; subject: string; message: string }) => Promise<void>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSendMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await onSendMessage(formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setStatus({
        type: 'success',
        message: '✓ Message received and stored in Bishr KV’s inbox.'
      });
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not send message. Please try emailing directly at bishrkv786@gmail.com.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatus({ type: null, message: '' });
      }, 6000);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4">
      <div className="glow w-[500px] h-[300px] bg-blue-500/[0.05] bottom-0 right-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">Contact</div>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="text-gray-500 font-light text-sm mt-3 max-w-lg mx-auto">
            Got a project in mind, need a full stack developer, or just want to connect? Drop me a message anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Contact Direct Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 space-y-4"
          >
            <motion.a
              id="contact-email-link"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=bishrkv786@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="card-static p-5 flex items-start gap-4 transition-colors hover:border-blue-500/40 hover:bg-blue-500/[0.04] group block cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Email</p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate font-medium">
                  bishrkv786@gmail.com
                </p>
              </div>
            </motion.a>

            <motion.a
              id="contact-phone-link"
              href="tel:+919778024332"
              whileHover={{ x: 5 }}
              className="card-static p-5 flex items-start gap-4 transition-colors hover:border-blue-500/40 hover:bg-blue-500/[0.04] group block cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Phone / WhatsApp</p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">
                  +91 9778024332
                </p>
              </div>
            </motion.a>

            <motion.a
              id="contact-location-link"
              href="https://www.google.com/maps/search/?api=1&query=India"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="card-static p-5 flex items-start gap-4 transition-colors hover:border-blue-500/40 hover:bg-blue-500/[0.04] group block cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Location</p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">
                  India (Available Worldwide)
                </p>
              </div>
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.form
            id="contactForm"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 card p-8 space-y-4 shadow-xl relative"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5 block font-medium">
                  Your Name *
                </label>
                <input
                  id="cName"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.03] transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5 block font-medium">
                  Your Email *
                </label>
                <input
                  id="cEmail"
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.03] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5 block font-medium">
                Subject
              </label>
              <input
                id="cSubject"
                type="text"
                placeholder="e.g. Project Inquiry / Web Development"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.03] transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5 block font-medium">
                Message *
              </label>
              <textarea
                id="cMessage"
                rows={5}
                required
                placeholder="Tell me about your project, timeline, and requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.03] transition-all resize-y"
              />
            </div>

            <motion.button
              id="contact-submit-btn"
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-blue-600/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

