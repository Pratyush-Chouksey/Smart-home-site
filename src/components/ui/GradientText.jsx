import React from 'react';

export default function GradientText({ children, className = '' }) {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent ${className}`}>
      {children}
    </span>
  );
}
