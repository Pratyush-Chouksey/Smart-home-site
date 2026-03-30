import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitContact } from '../services/api';
import SectionWrapper from './ui/SectionWrapper';
import GradientText from './ui/GradientText';
import Button from './ui/Button';

export default function Contact({ selectedPlan }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (selectedPlan && !formData.message.includes(selectedPlan)) {
      setFormData(prev => ({ 
        ...prev, 
        message: `I am interested in booking the ${selectedPlan} plan.` 
      }));
    }
  }, [selectedPlan]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 2) newErrors.name = true;
    if (formData.phone.length < 10) newErrors.phone = true;
    if (!formData.email.includes('@') || !formData.email.includes('.')) newErrors.email = true;
    if (formData.message.length < 10) newErrors.message = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitContact(formData);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      toast.success("Message transmitted successfully!");
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputStyles = (field) => {
    const base = "w-full bg-background border rounded-xl px-4 py-3 text-white focus:outline-none transition-all";
    if (errors[field]) return `${base} border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]`;
    if (formData[field].length > 0) return `${base} border-green-500/50 focus:border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)]`;
    return `${base} border-white/10 focus:border-primary`;
  };

  const shakeAnimation = { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } };

  return (
    <SectionWrapper id="contact" className="relative py-24 bg-surface/30 border-t border-white/5">
      <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-10 pointer-events-none" />

      <div className="text-center mb-16 relative z-10 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Let's <GradientText>Connect</GradientText>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Have questions about a specific layout or looking for custom integrations? Reach out directly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 relative z-10">
        
        {/* Left Col: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between h-full bg-surface/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-lg overflow-hidden relative"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Call Us</h4>
                  <p className="text-gray-400">Harsh Keshkar: 8010529661</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Email Us</h4>
                  <p className="text-gray-400">support@smartify.in</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Service Area</h4>
                  <p className="text-gray-400">Delhi NCR & India-wide Installations</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <a href="https://wa.me/918010529661" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all hover:-translate-y-1">
                <MessageCircle size={18} />
              </a>
            </div>

            {/* Google Maps Placeholder */}
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(0.8)' }} 
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="group-hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative"
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit} 
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div animate={!shouldReduceMotion && errors.name ? shakeAnimation : { x: 0 }} className="relative">
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`peer ${getInputStyles('name')}`} placeholder=" " />
                    <label htmlFor="name" className="absolute left-4 -top-3.5 text-xs text-gray-400 bg-surface/80 px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs">Full Name</label>
                  </motion.div>

                  <motion.div animate={!shouldReduceMotion && errors.phone ? shakeAnimation : { x: 0 }} className="relative">
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={`peer ${getInputStyles('phone')}`} placeholder=" " />
                    <label htmlFor="phone" className="absolute left-4 -top-3.5 text-xs text-gray-400 bg-surface/80 px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs">Phone Number</label>
                  </motion.div>
                </div>

                <motion.div animate={!shouldReduceMotion && errors.email ? shakeAnimation : { x: 0 }} className="relative">
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`peer ${getInputStyles('email')}`} placeholder=" " />
                  <label htmlFor="email" className="absolute left-4 -top-3.5 text-xs text-gray-400 bg-surface/80 px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs">Email Address</label>
                </motion.div>

                <motion.div animate={!shouldReduceMotion && errors.message ? shakeAnimation : { x: 0 }} className="relative">
                  <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows="4" className={`peer resize-none ${getInputStyles('message')}`} placeholder=" " />
                  <label htmlFor="message" className="absolute left-4 -top-3.5 text-xs text-gray-400 bg-surface/80 px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs">Your Message</label>
                </motion.div>

                <Button type="submit" variant="primary" className="w-full h-14" isLoading={isSubmitting}>
                  Send Message <Send size={18} />
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-state"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-surface/30 rounded-3xl backdrop-blur-sm"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 max-w-xs">We got your request. An expert will reach out to you within 24 hours.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
