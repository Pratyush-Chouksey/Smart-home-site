import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  isLoading = false,
  disabled = false,
  ...props 
}) {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 500); // 500ms ripple duration
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  const handlePointerDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleButtonClick = (e) => {
    if (isLoading || disabled) return;
    if (onClick) onClick(e);
  };

  const baseStyles = "relative overflow-hidden px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5"
  };

  const currentVariant = variants[variant] || variants.primary;
  const isButtonDisabled = disabled || isLoading;

  return (
    <motion.button
      whileTap={isButtonDisabled ? {} : { scale: 0.95 }}
      whileHover={isButtonDisabled ? {} : { scale: 1.02 }}
      className={`${baseStyles} ${currentVariant} ${isButtonDisabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      onClick={handleButtonClick}
      onPointerDown={isButtonDisabled ? undefined : handlePointerDown}
      disabled={isButtonDisabled}
      {...props}
    >
      {/* Ripple Element */}
      {isRippling && !isButtonDisabled && (
        <span
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
            width: 20,
            height: 20,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Button Content / Spinner */}
      <span className={`flex items-center gap-2 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={20} className="animate-spin text-current" />
        </div>
      )}

      {/* Tailwind specific local keyframes injection for Ripple */}
      <style>{`
        @keyframes ripple {
          0% { transform: scale(0) translate(-50%, -50%); opacity: 1; }
          100% { transform: scale(20) translate(-50%, -50%); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.5s ease-out forwards;
        }
      `}</style>
    </motion.button>
  );
}
