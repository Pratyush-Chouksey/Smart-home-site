import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 animate-pulse">
      {/* Skeleton Header Area */}
      <div className="flex flex-col items-center justify-center mb-16 gap-6">
        <div className="h-12 bg-white/10 rounded-xl w-3/4 md:w-1/2"></div>
        <div className="h-6 bg-white/5 rounded-md w-5/6 md:w-1/3"></div>
      </div>

      {/* Skeleton Content Grid (Matching standard 3-col or flexible layouts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col h-full bg-surface/50 rounded-3xl p-8 border border-white/5 shadow-lg">
            {/* Top Badge/Icon skeleton */}
            <div className="w-16 h-16 bg-white/10 rounded-2xl mb-8"></div>
            
            {/* Title & Body */}
            <div className="h-8 bg-white/10 rounded-md w-3/4 mb-4"></div>
            <div className="h-4 bg-white/5 rounded-md w-full mb-3"></div>
            <div className="h-4 bg-white/5 rounded-md w-5/6 mb-8"></div>
            
            {/* Button skeleton pushed to bottom */}
            <div className="mt-auto h-14 bg-white/5 rounded-full w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
