import React from 'react';
import { Check, Sparkles, ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

interface Plan {
  id: string;
  number: string;
  name: string;
  price: string;
  badge?: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  actionText: string;
}

const PLANS: Plan[] = [
  {
    id: 'plan-portfolio',
    number: '01',
    name: 'Portfolio',
    price: '₹2,500 – ₹5,000',
    description: 'Perfect for students, creators, and professionals needing a high-impact personal digital presence.',
    features: [
      'Personal portfolio website',
      '1–4 pages',
      'Modern responsive design',
      'Basic animations',
      'Contact & social links',
      'Mobile optimization'
    ],
    icon: <Zap className="w-4 h-4 text-blue-400" />,
    actionText: 'Choose Portfolio'
  },
  {
    id: 'plan-business',
    number: '02',
    name: 'Business',
    price: '₹8,000 – ₹15,000',
    popular: true,
    badge: 'Recommended',
    description: 'Designed for startups, business ventures, and agencies wanting high conversion and brand authority.',
    features: [
      'Business/company website',
      '5–8 pages',
      'Custom UI/UX',
      'Advanced animations',
      'WhatsApp & contact integration',
      'SEO basics',
      'Responsive across devices'
    ],
    icon: <Sparkles className="w-4 h-4 text-blue-400" />,
    actionText: 'Choose Business'
  },
  {
    id: 'plan-custom',
    number: '03',
    name: 'Custom',
    price: '₹18,000+',
    description: 'Full-fledged custom web applications, bespoke UI systems, scalable APIs, and tailored engineering.',
    features: [
      'Fully custom website',
      'Unique UI/UX system',
      'Advanced interactions & animations',
      'Custom features',
      'Database/API integration',
      'Performance & SEO optimization',
      'Deployment & post-launch support'
    ],
    icon: <Rocket className="w-4 h-4 text-purple-400" />,
    actionText: 'Request Custom Plan'
  }
];

export const PricingSection: React.FC = () => {
  const handleSelectPlan = (plan: Plan) => {
    // Scroll smoothly to contact section with message
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="relative py-28 px-4 border-t border-white/[0.04]">
      {/* Ambient background glows */}
      <div className="glow w-[600px] h-[350px] bg-blue-500/[0.04] top-1/4 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="glow w-[350px] h-[350px] bg-purple-500/[0.03] bottom-10 right-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
            Pricing & Plans
          </div>
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto mt-3 font-light leading-relaxed">
            Transparent, value-driven pricing tailored for personal portfolios, business brands, and custom web applications.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, index) => {
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -8 }}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-colors group ${
                  isPopular
                    ? 'bg-gradient-to-b from-blue-950/20 via-[#0d0d0f] to-[#080809] border border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.12)]'
                    : 'bg-[#09090b]/80 border border-white/[0.07] hover:border-white/20 hover:bg-[#0c0c0e]'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-lg border border-blue-400/30 flex items-center gap-1.5 animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-blue-400/80 tracking-widest uppercase">
                      {plan.number} — {plan.name}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {plan.icon}
                    </div>
                  </div>

                  {/* Plan Name & Price */}
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight text-gradient">
                      {plan.price}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-6 border-b border-white/[0.06] pb-6">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-500 block mb-2">
                      What's Included
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isPopular ? 'bg-blue-500/20 text-blue-400' : 'bg-white/[0.06] text-gray-400'
                        }`}>
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <motion.button
                  onClick={() => handleSelectPlan(plan)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isPopular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-gray-200 border border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <span>{plan.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>Need a custom quotation or have a tight deadline?</span>
          </div>
          <a
            href="https://wa.me/919778024332?text=Hi%20Bishr,%20I%20would%20like%20to%20discuss%20a%20website%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5 transition-colors"
          >
            Direct WhatsApp Chat <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

