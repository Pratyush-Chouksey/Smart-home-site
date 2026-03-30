import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function SectionWrapper({ 
  children, 
  id, 
  className = '', 
  delay = 0 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  // If the user has OS-level reduced motion settings enabled, nullify the slide-up
  const initialVariants = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 50 };
  const animateVariants = shouldReduceMotion 
    ? (isInView ? { opacity: 1 } : { opacity: 0 }) 
    : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 });

  return (
    <section id={id} className={`w-full ${className}`}>
      <motion.div
        ref={ref}
        initial={initialVariants}
        animate={animateVariants}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        className="w-full max-w-7xl mx-auto px-6 py-24"
      >
        {children}
      </motion.div>
    </section>
  );
}
