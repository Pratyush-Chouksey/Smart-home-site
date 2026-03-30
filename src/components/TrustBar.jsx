import React from 'react';
import { Award, Star, ShieldCheck, CheckCircle } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';

const badges = [
  { icon: <Award size={20} className="text-primary" />, label: "ISI Certified Hardware" },
  { icon: <Star size={20} className="text-accent" />, label: "5-Star Top Rated Service" },
  { icon: <ShieldCheck size={20} className="text-primary" />, label: "Govt Approved Electricians" },
  { icon: <CheckCircle size={20} className="text-accent" />, label: "100% Insured & Verified" }
];

export default function TrustBar() {
  const duplicatedBadges = [...badges, ...badges];

  return (
    <div className="w-full bg-surface border-y border-white/5 py-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Trusted by Homeowners Across India
        </p>

        <div className="relative w-full flex overflow-hidden">
          {/* Edge Fades */}
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-surface to-transparent z-10" />

          <div className="flex w-max animate-trust-scroll">
            {duplicatedBadges.map((badge, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 px-8 md:px-12 opacity-80 hover:opacity-100 transition-opacity"
              >
                {badge.icon}
                <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trustScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-trust-scroll {
          animation: trustScroll 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
