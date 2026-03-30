import React from 'react';
import { Zap, Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import GradientText from './ui/GradientText';

export default function Footer() {
  const currentYear = new Date().getFullYear() > 2025 ? new Date().getFullYear() : 2025;

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = href === '#home' ? document.body : document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-background pt-20 pb-10 overflow-hidden border-t-2 border-transparent" style={{ borderImage: 'linear-gradient(to right, var(--color-primary), var(--color-accent)) 1' }}>
      
      {/* Background glow for aesthetic */}
      <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[20rem] h-[20rem] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-gray-400">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-6">
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2 group cursor-pointer inline-flex w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                <Zap size={22} fill="currentColor" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                <GradientText>Smartify</GradientText>
              </span>
            </a>
            <p className="leading-relaxed">
              Making every home smarter. Transform your lifestyle with next-generation automation and security infrastructure.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://wa.me/918010529661" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-gray-400 hover:text-green-500 hover:bg-surface/80 hover:border-green-500/50 transition-all hover:-translate-y-1">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-surface/80 hover:border-pink-500/50 transition-all hover:-translate-y-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-surface/80 hover:border-blue-500/50 transition-all hover:-translate-y-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg mb-2">Quick Links</h4>
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-primary transition-colors hover:translate-x-1 duration-300 w-fit">Home</a>
            <a href="#plans" onClick={(e) => scrollToSection(e, '#plans')} className="hover:text-primary transition-colors hover:translate-x-1 duration-300 w-fit">Plans</a>
            <a href="#plans" onClick={(e) => scrollToSection(e, '#plans')} className="hover:text-primary transition-colors hover:translate-x-1 duration-300 w-fit">Custom Plan</a>
            <a href="#electricians" onClick={(e) => scrollToSection(e, '#electricians')} className="hover:text-primary transition-colors hover:translate-x-1 duration-300 w-fit">For Electricians</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-primary transition-colors hover:translate-x-1 duration-300 w-fit">Contact</a>
          </div>

          {/* Col 3: Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg mb-2">Services</h4>
            <span className="hover:text-white transition-colors cursor-default">Smart Lighting</span>
            <span className="hover:text-white transition-colors cursor-default">AC Automation</span>
            <span className="hover:text-white transition-colors cursor-default">Security Systems</span>
            <span className="hover:text-white transition-colors cursor-default">Energy Monitoring</span>
            <span className="hover:text-white transition-colors cursor-default">Voice Control Interface</span>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <span>+91 8010529661</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-accent" />
                  <span>support@smartify.in</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <span>India-wide Service</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-2">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Newsletter</h4>
              <form onSubmit={(e) => e.preventDefault()} className="relative flex">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full bg-surface border border-white/10 rounded-l-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-500"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white px-4 rounded-r-xl flex items-center justify-center group"
                >
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {currentYear} Smartify. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p className="flex items-center gap-1 font-medium italic text-gray-500">
            Made with <span className="text-accent not-italic">⚡</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
