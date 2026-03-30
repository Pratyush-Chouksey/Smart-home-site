import React, { useRef } from 'react';
import ReactCountUp from 'react-countup';

const CountUp = ReactCountUp.default || ReactCountUp;
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SectionWrapper from './ui/SectionWrapper';
import GradientText from './ui/GradientText';

const stats = [
  { value: 500, label: "Homes Smartified", suffix: "+" },
  { value: 98, label: "Customer Satisfaction", suffix: "%" },
  { value: 50, label: "Certified Electricians", suffix: "+" },
  { value: 24, label: "Smart Support", suffix: "/7" }
];

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: shouldReduceMotion ? { duration: 0 } : { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <SectionWrapper 
      className="bg-gradient-to-b from-background via-surface to-background border-y border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-hover)_0%,_transparent_70%)] opacity-5 pointer-events-none" />
      
      <motion.div 
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 max-w-7xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} className="text-center p-6 bg-white/5 rounded-3xl backdrop-blur border border-white/10" variants={itemVariants}>
            <div className="text-5xl md:text-6xl font-extrabold mb-4 flex items-center justify-center">
              <GradientText>
                {shouldReduceMotion ? (
                  stat.value
                ) : isInView ? (
                  <CountUp 
                    start={0} 
                    end={stat.value} 
                    duration={2.5} 
                    useEasing={true}
                    separator=","
                  />
                ) : (
                  "0"
                )}
                <span className="text-4xl md:text-5xl">{stat.suffix}</span>
              </GradientText>
            </div>
            <div className="text-sm md:text-base font-semibold uppercase tracking-widest text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
