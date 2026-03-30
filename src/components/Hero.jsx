import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Button from './ui/Button';
import GradientText from './ui/GradientText';
import { Battery, Wifi, Star } from 'lucide-react';

// Floating Badge Component
const FloatingBadge = ({ icon: Icon, title, desc, className, delay, shouldReduceMotion }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -15, 0] }}
    transition={{ 
      opacity: { duration: 0.8, delay },
      scale: { duration: 0.8, delay, type: "spring" },
      y: shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className={`absolute z-20 flex items-center gap-4 bg-surface/80 backdrop-blur-md border border-white/10 p-3 pr-6 rounded-2xl shadow-xl ${className}`}
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary border border-white/5">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-white font-bold text-sm">{title}</h4>
      <p className="text-gray-400 text-xs">{desc}</p>
    </div>
  </motion.div>
);

// CSS Dust Particles Array Generator
const generateParticles = (count) => {
  return [...Array(count)].map((_, i) => (
    <div 
      key={i} 
      className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-[floatDust_10s_linear_infinite]"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${10 + Math.random() * 20}s`
      }}
    />
  ));
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center pt-24 overflow-hidden bg-background">
      
      {/* Animated Grid & Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!shouldReduceMotion && (
          <div className="absolute top-0 left-0 w-full h-[200%] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMzkgNDBWMGgxLDFMMCAwaDQwdjRweiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] animate-[slideUp_20s_linear_infinite]" />
        )}
        
        {/* Render CSS Paricles */}
        {!shouldReduceMotion && generateParticles(30)}

        {/* Radial Glows */}
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/15 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center text-center lg:text-left pt-10 lg:pt-0"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold tracking-wide w-fit mx-auto lg:mx-0 mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            #1 SMART HOME PLATFORM
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Turn Any Home Into a <GradientText>Smart Home</GradientText>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Seamlessly upgrade your lifestyle. Control your lights, security, and climate from anywhere in the world with Smartify's next-generation automation system.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mx-auto lg:mx-0">
            <Button variant="primary" onClick={() => handleScroll('plans')} className="w-full sm:w-auto px-8 py-4 text-lg">Explore Plans</Button>
            <Button variant="outline" onClick={() => handleScroll('contact')} className="w-full sm:w-auto px-8 py-4 text-lg">Book Consultation</Button>
          </div>
        </motion.div>

        {/* 3D SVG Illustration Area */}
        <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center perspective-1000 mt-10 lg:mt-0">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center transform-style-3d preserve-3d"
          >
            {/* Base platform */}
            <div className="absolute bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform rotate-x-60" />

            {/* Render a custom isometric SVG house */}
            <svg viewBox="0 0 400 400" className={`w-full h-full max-w-[450px] drop-shadow-[0_20px_40px_rgba(14,165,233,0.3)] filter ${!shouldReduceMotion ? 'animate-[float_6s_ease-in-out_infinite]' : ''}`}>
              <defs>
                <linearGradient id="wall-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-surface)" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="roof-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <g transform="translate(200, 200) scale(1.2)">
                <g>
                   {/* Left Wall */}
                  <path d="M-80 0 L0 40 L0 -40 L-80 -80 Z" fill="url(#wall-grad)" opacity="0.9" />
                  {/* Right Wall */}
                  <path d="M0 40 L80 0 L80 -80 L0 -40 Z" fill="url(#wall-grad)" opacity="0.7" />
                  {/* Roof Left */}
                  <path d="M-90 -75 L0 -120 L0 -40 L-90 -5 Z" fill="url(#roof-grad)" opacity="0.9" />
                  {/* Roof Right */}
                  <path d="M0 -120 L90 -75 L90 -5 L0 -40 Z" fill="url(#roof-grad)" opacity="0.8" />
                  
                  {/* Door */}
                  <path d="M20 10 L50 -5 L50 -35 L20 -20 Z" fill="#0f172a" />
                  
                  {/* Glowing Window Left */}
                  <path d="M-50 -20 L-20 -5 L-20 -25 L-50 -40 Z" fill="var(--color-primary)" filter="url(#glow)" className={!shouldReduceMotion ? "animate-pulse" : ""} />
                  {/* Glowing Window Right */}
                  <path d="M30 -40 L60 -55 L60 -75 L30 -60 Z" fill="var(--color-accent)" filter="url(#glow)" className={!shouldReduceMotion ? "animate-pulse" : ""} style={{ animationDelay: '1s' }} />

                  {/* Antenna / Smart Hub on Roof */}
                  <circle cx="0" cy="-120" r="4" fill="var(--color-accent)" filter="url(#glow)" className={!shouldReduceMotion ? "animate-[ping_3s_infinite]" : ""} />
                  <path d="M0 -120 L0 -140" stroke="white" strokeWidth="2" opacity="0.5" />
                </g>
              </g>
            </svg>

            {/* Badges mapped around illustration */}
            <FloatingBadge 
              icon={Battery} 
              title="40% Energy Saved" 
              desc="Average Monthly Data" 
              delay={0.5} 
              className="top-10 lg:top-20 -left-4 lg:-left-10" 
              shouldReduceMotion={shouldReduceMotion}
            />
            <FloatingBadge 
              icon={Wifi} 
              title="10K+ Homes" 
              desc="Connected Globally" 
              delay={0.8} 
              className="bottom-20 lg:bottom-40 -right-4 lg:-right-10" 
              shouldReduceMotion={shouldReduceMotion}
            />
            <FloatingBadge 
              icon={Star} 
              title="5-Star Rated" 
              desc="Trusted App Store" 
              delay={1.1} 
              className="-top-10 lg:-top-5 right-10 lg:right-20" 
              shouldReduceMotion={shouldReduceMotion}
            />
          </motion.div>
        </div>
      </div>

      {/* Global CSS for custom animations inside Hero */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes floatDust {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        @keyframes slideUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>
    </section>
  );
}
