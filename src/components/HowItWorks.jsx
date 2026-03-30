import React from 'react';
import { motion } from 'framer-motion';
import { Package, Zap, Home } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import GradientText from './ui/GradientText';

const steps = [
  {
    icon: <Package size={32} className="text-primary group-hover:text-accent transition-colors duration-300 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />,
    title: "Choose Your Plan",
    desc: "Browse our curated smart home packages or customize your own bundle to perfectly fit your lifestyle and home layout.",
    number: "Step 01"
  },
  {
    icon: <Zap size={32} className="text-primary group-hover:text-accent transition-colors duration-300 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />,
    title: "Our Electrician Visits",
    desc: "A certified local expert arrives at your doorstep to professionally install and configure your new smart devices.",
    number: "Step 02"
  },
  {
    icon: <Home size={32} className="text-primary group-hover:text-accent transition-colors duration-300 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />,
    title: "Go Smart",
    desc: "Take control of your home from your smartphone. Enjoy seamless automation, enhanced security, and ultimate convenience.",
    number: "Step 03"
  }
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 12
      } 
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, scaleY: 0 },
    visible: { 
      scaleX: 1,
      scaleY: 1,
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } 
    }
  };

  return (
    <SectionWrapper id="how-it-works">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          How It <GradientText>Works</GradientText>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Transforming your house into a smart home is easier than ever. Just three simple steps to a more connected life.
        </p>
      </div>

      <motion.div 
        className="relative flex flex-col lg:flex-row justify-between items-center lg:items-start gap-20 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Animated Background Line */}
        <div className="absolute left-1/2 lg:left-[10%] top-0 lg:top-10 w-1 h-full lg:w-[80%] lg:h-1 bg-white/5 -translate-x-1/2 lg:translate-x-0 rounded-full overflow-hidden z-0">
          <motion.div 
            className="w-full h-full bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-primary to-accent origin-top lg:origin-left"
            variants={lineVariants}
          />
        </div>

        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="group relative z-10 flex-1 bg-surface border border-white/10 rounded-3xl p-8 pt-12 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(14,165,233,0.3)] w-full max-w-md lg:max-w-none" 
            variants={itemVariants}
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-background rounded-full flex items-center justify-center border-2 border-white/10 shadow-[0_0_0_10px_var(--color-background),0_0_30px_rgba(14,165,233,0.3)] transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_0_10px_var(--color-background),0_0_40px_rgba(245,158,11,0.5)]">
              {step.icon}
            </div>
            
            <div className="mt-8">
              <span className="inline-block text-xs uppercase tracking-widest text-primary font-bold bg-primary/10 px-3 py-1 rounded-full mb-4">
                {step.number}
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
