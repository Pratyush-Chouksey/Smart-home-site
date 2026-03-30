import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import GradientText from './ui/GradientText';
import Button from './ui/Button';

const plans = [
  {
    id: "starter",
    name: "Starter Smart",
    price: "₹4,999",
    features: ["1 Room Setup", "Smart Lighting Control", "Smart Fan Control", "Basic App Setup"],
    isPopular: false
  },
  {
    id: "pro",
    name: "Home Pro",
    price: "₹12,999",
    features: ["Up to 3 Rooms", "Full Appliance Control", "Energy Monitor Dashboard", "Voice Assistant Integration"],
    isPopular: true
  },
  {
    id: "ultimate",
    name: "Ultimate Smart",
    price: "₹24,999",
    features: ["Whole Home Coverage", "Security Cams & Locks", "Solar-Ready Integration", "Priority Support + 1Yr Warranty"],
    isPopular: false
  }
];

// Extracted Sub-Component to isolate localized 3D Mouse Tracking State per Card
const PlanCard = ({ plan, index, onSelectPlan, shouldReduceMotion }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    
    // Calculate precise mouse offset across the specific card dimensions
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const width = rect.width;
    const height = rect.height;

    // Convert into a -1 to 1 degree of rotation matrix logic
    const rotateY = ((x / width) - 0.5) * 20; 
    const rotateX = ((y / height) - 0.5) * -20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleBookClick = () => {
    if (onSelectPlan) onSelectPlan(plan.name);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
    <motion.div 
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Apply the 3D Rotation Transform inline exclusively tied to mouse state!
      style={{
        transform: shouldReduceMotion ? 'none' : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease-out",
        transformStyle: "preserve-3d"
      }}
      className={`relative flex flex-col p-8 rounded-3xl backdrop-blur-md bg-background border ${
        plan.isPopular 
          ? 'border-primary shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:shadow-[0_0_50px_rgba(14,165,233,0.3)] md:-mt-4 md:mb-4' 
          : 'border-white/10 hover:border-white/30'
      }`}
    >
      {/* 3D Offset Content Wrapper */}
      <div style={{ transform: shouldReduceMotion ? 'none' : 'translateZ(30px)' }} className="flex flex-col h-full z-10">
        
        {plan.isPopular && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
            Most Popular
          </div>
        )}
        
        {plan.isPopular && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl opacity-50 pointer-events-none" style={{ transform: 'translateZ(-30px)' }} />
        )}

        <h3 className="text-xl text-gray-300 font-bold mb-2">{plan.name}</h3>
        <div className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">{plan.price}</div>
        
        <ul className="flex-1 flex flex-col gap-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="drop-shadow-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={plan.isPopular ? "primary" : "outline"} 
          className="w-full mt-auto"
          onClick={handleBookClick}
        >
          Book This Plan
        </Button>
      </div>
    </motion.div>
  );
};

export default function Plans({ onSelectPlan }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  return (
    <SectionWrapper id="plans" className="relative z-10 bg-surface/30 py-24 border-y border-white/5">
      <div className="text-center mb-16 relative z-10 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Choose Your <GradientText>Smart Plan</GradientText>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Transparent pricing. No hidden fees. Choose the bundle that perfectly fits the size of your home and your lifestyle.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {plans.map((plan, i) => (
          <PlanCard 
            key={plan.id} 
            index={i} 
            plan={plan} 
            onSelectPlan={onSelectPlan} 
            shouldReduceMotion={shouldReduceMotion} 
          />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
