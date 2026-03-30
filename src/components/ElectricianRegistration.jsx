import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Zap, GraduationCap, Clock, BadgeCheck, Upload, Users, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitElectrician } from '../services/api';
import SectionWrapper from './ui/SectionWrapper';
import GradientText from './ui/GradientText';
import Button from './ui/Button';

const benefits = [
  { icon: <Briefcase size={24} />, title: "Steady Work", desc: "Access a consistent stream of smart home installation jobs." },
  { icon: <Zap size={24} />, title: "Great Pay", desc: "Competitive payouts for every successful installation completed." },
  { icon: <GraduationCap size={24} />, title: "Training Provided", desc: "Free upskilling on the latest IoT and smart home devices." },
  { icon: <Clock size={24} />, title: "Flexible Hours", desc: "Choose assignments that fit your personal schedule." },
  { icon: <BadgeCheck size={24} />, title: "Verified Badge", desc: "Gain trust as a certified Smartify Expert Electrician." }
];

const certificationsList = ["ITI (Electrician)", "Wireman License", "CCTV Installation", "Networking/IoT", "Solar Installation"];

export default function ElectricianRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    experience: '',
    certifications: []
  });
  
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleCheckboxChange = (cert) => {
    setFormData(prev => {
      const isSelected = prev.certifications.includes(cert);
      const newCerts = isSelected 
        ? prev.certifications.filter(c => c !== cert) 
        : [...prev.certifications, cert];
      
      // Clear checkbox error if they specifically un-errored it
      if (errors.certifications && newCerts.length > 0) {
        setErrors({ ...errors, certifications: false });
      }
      
      return { ...prev, certifications: newCerts };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 2) newErrors.name = true;
    if (formData.phone.length < 5) newErrors.phone = true;
    if (formData.city.length < 2) newErrors.city = true;
    if (!formData.experience) newErrors.experience = true;
    if (formData.certifications.length === 0) newErrors.certifications = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    
    const payload = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'certifications') {
        payload.append(key, JSON.stringify(formData[key]));
      } else {
        payload.append(key, formData[key]);
      }
    });
    if (file) payload.append('resume', file);

    try {
      await submitElectrician(payload);
      toast.success('Registration Successful! Welcome to the team.');
      setFormData({ name: '', phone: '', email: '', city: '', experience: '', certifications: [] });
      setFile(null);
      if (document.getElementById('resume-upload')) {
        document.getElementById('resume-upload').value = '';
      }
    } catch (error) {
      // Managed in api.js
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
    <SectionWrapper id="electricians" className="relative py-24 bg-background">
      <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 bg-[radial-gradient(ellipse_at_left,_var(--color-primary)_0%,_transparent_60%)] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10 px-6">
        
        {/* Left Side: Benefits */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-bold tracking-wide mb-6">
              <Users size={16} /> 100+ Electricians Joined
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Join the <GradientText>Smartify Partner</GradientText> Network
            </h2>
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              We are actively looking for certified, driven electricians to partner with us across the country. Grow your business and step into the future of home automation.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            {benefits.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300 flex-shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">Electrician Registration Profile</h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div animate={!shouldReduceMotion && errors.name ? shakeAnimation : {}} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={getInputStyles('name')} placeholder="Ramesh Kumar" />
              </motion.div>
              <motion.div animate={!shouldReduceMotion && errors.phone ? shakeAnimation : {}} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={getInputStyles('phone')} placeholder="+91 98765 43210" />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">Email Address (Optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={getInputStyles('email')} placeholder="ramesh@example.com" />
              </div>
              <motion.div animate={!shouldReduceMotion && errors.city ? shakeAnimation : {}} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-400">City / District</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={getInputStyles('city')} placeholder="Bengaluru" />
              </motion.div>
            </div>

            <motion.div animate={!shouldReduceMotion && errors.experience ? shakeAnimation : {}} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-400">Years of Experience</label>
              <select name="experience" value={formData.experience} onChange={handleInputChange} className={`${getInputStyles('experience')} appearance-none cursor-pointer`}>
                <option value="" disabled>Select experience level</option>
                <option value="0-2">0 - 2 Years</option>
                <option value="3-5">3 - 5 Years</option>
                <option value="5-10">5 - 10 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </motion.div>

            {/* Certifications (Multi-Checkbox) */}
            <motion.div animate={!shouldReduceMotion && errors.certifications ? shakeAnimation : {}} className={`flex flex-col gap-3 p-4 rounded-xl border transition-colors ${errors.certifications ? 'border-red-500/50 bg-red-500/5' : 'border-transparent'}`}>
              <label className="text-sm font-semibold text-gray-400">Certifications & Expertise (Select at least 1)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certificationsList.map(cert => (
                  <label key={cert} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      formData.certifications.includes(cert) ? 'bg-primary border-primary shadow-[0_0_10px_rgba(14,165,233,0.5)]' : 'bg-background border-white/20 group-hover:border-primary'
                    }`}>
                      {formData.certifications.includes(cert) && <CheckCircle size={14} strokeWidth={3} className="text-white" />}
                    </div>
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{cert}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* File Upload */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-semibold text-gray-400">Upload Resume / Certificate (PDF/JPG)</label>
              <label className="w-full relative flex flex-col items-center justify-center py-6 px-4 border-2 border-dashed border-white/10 hover:border-primary/50 bg-background rounded-xl cursor-pointer transition-colors group">
                <Upload size={28} className="text-gray-500 group-hover:text-primary mb-2 transition-colors" />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors text-center">
                  {file ? file.name : "Click to browse or drag and drop files here"}
                </span>
                <input 
                  id="resume-upload"
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-4 h-14" isLoading={isSubmitting}>
              Submit Registration Partner Profile
            </Button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
