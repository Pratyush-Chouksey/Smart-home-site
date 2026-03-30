import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from './ui/Button';
import GradientText from './ui/GradientText';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Plans', href: '#plans' },
  { label: 'Custom Plan', href: '#custom-plan' },
  { label: 'For Electricians', href: '#electricians' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (e, href) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // If it's a generic link like "#home" we can just scroll to top of body if no ID exists, otherwise scroll to element.
    const target = href === '#home' ? document.body : document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Section ${href} not found.`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-background/80 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'py-5 bg-transparent border-transparent shadow-none'
        }`}
      >
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary origin-left z-[60]"
          style={{ scaleX }}
        />
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Brand/Logo */}
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2 group cursor-pointer z-50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-[0_0_15px_rgba(14,165,233,0.5)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all duration-300">
              <Zap size={22} fill="currentColor" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              <GradientText>Smartify</GradientText>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-white text-sm font-semibold tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button onClick={() => toast("Client Portal coming soon!", { icon: "🔒", style: { background: "#1f2937", color: "#fff" } })} variant="outline" className="text-sm px-5 py-2">Log In</Button>
            <Button onClick={(e) => scrollToSection(e, '#plans')} variant="primary" className="text-sm px-6 py-2">Get Started</Button>
          </div>

          {/* Mobile Menu Toggle button */}
          <button 
            className="lg:hidden p-2 text-white relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6 text-center mt-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-2xl font-bold text-gray-200 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 + 0.1 }}
                className="flex flex-col gap-4 mt-8"
              >
                <Button onClick={() => { setIsMobileMenuOpen(false); toast("Client Portal coming soon!", { icon: "🔒", style: { background: "#1f2937", color: "#fff" } }); }} variant="outline" className="w-full">Log In</Button>
                <Button onClick={(e) => scrollToSection(e, '#plans')} variant="primary" className="w-full">Get Started</Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
