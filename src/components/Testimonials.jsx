import React from 'react';
import { Star } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import GradientText from './ui/GradientText';

const reviews = [
  {
    name: "Rahul M.",
    city: "Mumbai, MH",
    initials: "RM",
    rating: 5,
    text: "Getting Smartify to automate our apartment was the best decision. The smart lighting scenes are incredibly intuitive, and the electricians were highly professional."
  },
  {
    name: "Priya S.",
    city: "Bengaluru, KA",
    initials: "PS",
    rating: 5,
    text: "I love the remote access feature. Being able to check my security cameras and turn off the AC from my office brings so much peace of mind."
  },
  {
    name: "Amit V.",
    city: "Delhi, DL",
    initials: "AV",
    rating: 4,
    text: "The energy monitoring dashboard alone is worth it. We reduced our power bill by 20% in the first two months just by tracking our usage."
  },
  {
    name: "Sneha K.",
    city: "Pune, MH",
    initials: "SK",
    rating: 5,
    text: "Voice control via Alexa integrated flawlessly. The setup process was handled entirely by their team, requiring zero effort on my part!"
  },
  {
    name: "Vikram R.",
    city: "Hyderabad, TS",
    initials: "VR",
    rating: 5,
    text: "Excellent service from start to finish. The custom plan they built for our 3BHK covered everything perfectly without upselling us on things we didn't need."
  },
  {
    name: "Neha D.",
    city: "Chennai, TN",
    initials: "ND",
    rating: 5,
    text: "Absolutely stunning app interface. It feels premium and doesn't lag at all compared to other smart hubs we've tried in the past."
  }
];

export default function Testimonials() {
  // We duplicate the reviews array to create the seamless infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="py-24 bg-background relative overflow-hidden border-t border-white/5">
      <div className="text-center mb-16 relative z-10 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Loved by Homeowners <GradientText>Across India</GradientText>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. See what our community has to say about their upgraded lifestyles.
        </p>
      </div>

      {/* The Auto-Scrolling Container */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* Left/Right Fade Masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
          {duplicatedReviews.map((review, index) => (
            <div 
              key={index} 
              className="w-[350px] md:w-[400px] flex-shrink-0 mx-4 p-8 rounded-3xl bg-surface/50 backdrop-blur-sm border border-white/10 shadow-lg hover:bg-surface/80 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-gray-400 text-sm">{review.city}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < review.rating ? "text-accent fill-accent" : "text-gray-600"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infiniteScroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
