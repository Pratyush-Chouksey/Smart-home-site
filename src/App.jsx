import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SkeletonLoader from './components/ui/SkeletonLoader';
import './index.css';

// Lazy Load "Below the Fold" components to optimize LCP and TTI
const TrustBar = lazy(() => import('./components/TrustBar'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const SmartFeatures = lazy(() => import('./components/SmartFeatures'));
const Plans = lazy(() => import('./components/Plans'));
const CustomPlan = lazy(() => import('./components/CustomPlan'));
const ElectricianRegistration = lazy(() => import('./components/ElectricianRegistration'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const StatsBar = lazy(() => import('./components/StatsBar'));
const Contact = lazy(() => import('./components/Contact'));

function Home() {
  const [selectedPlan, setSelectedPlan] = useState('');

  return (
    <ErrorBoundary>
      <Toaster position="top-center" toastOptions={{ 
        style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } 
      }} />
      <div className="w-full flex-col items-center">
        <Navbar />
        
        <main>
          {/* Hero is strictly NOT lazy loaded to ensure perfect LCP / FCP metrics */}
          <Hero />
          
          <Suspense fallback={<SkeletonLoader />}>
            <TrustBar />
            <HowItWorks />
            <SmartFeatures />
            <Plans onSelectPlan={setSelectedPlan} />
            <CustomPlan />
            <ElectricianRegistration />
            <Testimonials />
            <StatsBar />
            <Contact selectedPlan={selectedPlan} />
          </Suspense>
        </main>

        <Footer />

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/918010529661" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:bg-green-600 transition-colors animate-bounce"
        >
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        </a>
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
