import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sliders, Wrench, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitCustomPlan } from '../services/api';
import SectionWrapper from './ui/SectionWrapper';
import GradientText from './ui/GradientText';
import Button from './ui/Button';

export default function CustomPlan() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'apartment',
    roomsCount: '2',
    budget: '',
    goals: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
    if (formData.goals.length < 10) newErrors.goals = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please provide valid contact and automation goal details.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitCustomPlan(formData);
      toast.success("Custom Plan scope submitted! An expert will review your requirements.");
      setFormData({
        name: '', email: '', phone: '', propertyType: 'apartment', roomsCount: '2', budget: '', goals: ''
      });
    } catch (error) {
      // Error handled natively inside api.js via toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputStyles = (field) => {
    const base = "w-full bg-background border rounded-xl px-4 py-3 text-white focus:outline-none transition-all";
    if (errors[field]) return `${base} border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]`;
    if (formData[field] && formData[field].length > 0) return `${base} border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.1)] focus:border-green-500`;
    return `${base} border-white/10 focus:border-primary`;
  };

  const shakeAnimation = { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } };

  return (
    <SectionWrapper id="custom-plan" className="relative py-24 bg-surface/30">
      <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-16 relative z-10 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Design a <GradientText>Custom Scope</GradientText>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Don't see a bundle that fits your massive estate or commercial property? Our engineering team builds automated infrastructures entirely from scratch!
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div animate={!shouldReduceMotion && errors.name ? shakeAnimation : {}} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={getInputStyles('name')} />
              </motion.div>
              <motion.div animate={!shouldReduceMotion && errors.phone ? shakeAnimation : {}} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={getInputStyles('phone')} />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Property Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none appearance-none cursor-pointer">
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa / Independent House</option>
                  <option value="commercial">Commercial / Office</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Rooms Involved</label>
                <select name="roomsCount" value={formData.roomsCount} onChange={handleChange} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none appearance-none cursor-pointer">
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3-5">3 - 5 Rooms</option>
                  <option value="whole-home">Whole Property Layout</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Estimated Budget (Optional)</label>
                <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. ₹50,000" className={getInputStyles('budget')} />
              </div>
            </div>

            <motion.div animate={!shouldReduceMotion && errors.goals ? shakeAnimation : {}} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-400">Primary Automation Goals</label>
              <textarea 
                name="goals" 
                value={formData.goals} 
                onChange={handleChange} 
                rows="4" 
                placeholder="Describe exactly what you want mapped out (e.g. specific brands, massive home-theater automation, dynamic solar triggers, security array mapping...)"
                className={`${getInputStyles('goals')} resize-none`}
              />
            </motion.div>

            <Button type="submit" variant="primary" className="w-full h-14 justify-center" isLoading={isSubmitting}>
              Request Engineering Scope
            </Button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
