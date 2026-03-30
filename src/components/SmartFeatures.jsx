import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Activity, ShieldCheck, Lightbulb, Wind, Globe } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import GradientText from './ui/GradientText';

const features = [
  {
    title: "Voice & App Control",
    desc: "Command your entire home with your voice via Alexa, Google Assistant, or tap intuitively through the Smartify app.",
    icon: <Mic size={32} />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Automated Lighting",
    desc: "Set morning wake-up routines or dramatic movie night scenes instantly.",
    icon: <Lightbulb size={32} />,
    colSpan: "col-span-1",
  },
  {
    title: "Energy Monitoring",
    desc: "Track real-time power consumption in our dashboard to cut down utility bills.",
    icon: <Activity size={32} />,
    colSpan: "col-span-1",
  },
  {
    title: "Smart Security Integration",
    desc: "HD cameras, automated locks, and motion sensors that securely ping your phone when activity is detected 24/7.",
    icon: <ShieldCheck size={32} />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Smart AC & Climate",
    desc: "Geofencing adjusts your thermostat perfectly before you walk through the door.",
    icon: <Wind size={32} />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    title: "Remote Access Anywhere",
    desc: "Unlock the door for guests or turn off the oven from anywhere in the world.",
    icon: <Globe size={32} />,
    colSpan: "col-span-1 md:col-span-2",
  }
];

export default function SmartFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <SectionWrapper id="features" className="relative">
      {/* Background Subtle Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Next-Gen <GradientText>Smart Features</GradientText>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Experience total control and peace of mind with our state-of-the-art automation ecosystem designed specifically for modern living.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className={`group relative rounded-3xl bg-surface/80 backdrop-blur border border-white/5 p-8 overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${feature.colSpan}`}
            variants={itemVariants}
          >
            {/* Animated Gradient Border Layer (Reveals on Hover) */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl mix-blend-screen pointer-events-none" />
            <div className="absolute inset-[1px] bg-surface rounded-3xl pointer-events-none z-0" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10 shadow-[0_0_0_rgba(14,165,233,0)] group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
