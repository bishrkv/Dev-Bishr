import React from 'react';
import { Star } from 'lucide-react';

export const Marquee: React.FC = () => {
  const items = [
    'Web Development',
    'React',
    'Node.js',
    'Tailwind CSS',
    'JavaScript',
    'MongoDB',
    'Firebase',
    'UI/UX Design',
    'Full Stack',
    'Express.js'
  ];

  return (
    <div className="border-y border-white/[0.04] py-4 overflow-hidden mask-image-gradient bg-black/40">
      <div className="marquee-track flex whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-2.5 px-6 text-white/20 text-xs sm:text-sm font-medium">
            <Star className="w-3 h-3 text-blue-500/40 fill-blue-500/20" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
