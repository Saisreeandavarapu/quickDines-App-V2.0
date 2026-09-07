import React from 'react';

export const Logo = ({ size = 'md', showSubtitle = true, lightMode = false, className = '' }) => {
  // Size presets
  const logoSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8 rounded-xl',
    md: 'w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl',
    lg: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 rounded-3xl',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  const isLightText = lightMode || className.includes('text-white');

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* QuickDines Logo icon thumbnail rendered with rounded border */}
      <div className={`relative overflow-hidden shadow-card border border-white/20 flex-shrink-0 bg-[#0B1F5E] p-0.5 ${logoSizes[size] || logoSizes.md}`}>
        <img 
          src="/logo.png" 
          alt="QuickDines Logo" 
          className="w-full h-full object-cover rounded-[10px] sm:rounded-[14px]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/image.png";
          }}
        />
      </div>

      <div className="flex flex-col leading-none text-left">
        <span className={`font-black tracking-tight ${textSizes[size] || textSizes.md}`}>
          <span className={isLightText ? 'text-white' : 'text-[#0B1F5E] dark:text-white'}>
            QUICK
          </span>
          <span className="text-[#3B82F6] dark:text-[#60A5FA]">
            DINES
          </span>
        </span>
        {showSubtitle && (
          <span className={`hidden sm:block font-semibold tracking-wider uppercase opacity-80 mt-0.5 text-[9px] sm:text-xs ${isLightText ? 'text-blue-200' : 'text-slate-500 dark:text-blue-400'}`}>
            Transit Dining Ecosystem
          </span>
        )}
      </div>
    </div>
  );
};
