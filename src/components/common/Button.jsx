import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-extrabold rounded-2xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none shadow-subtle';

  const variants = {
    primary: 'bg-navy-gradient text-white hover:opacity-95 focus:ring-blue-500 shadow-glow border border-white/20',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border border-red-500/30',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 border border-emerald-500/30 shadow-glow',
    outline: 'border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 shadow-none'
  };

  const sizes = {
    sm: 'h-9 px-3.5 text-xs gap-1.5',
    md: 'h-11 px-5 text-xs sm:text-sm gap-2',
    lg: 'h-14 px-7 text-base gap-2.5 rounded-3xl'
  };

  return (
    <button
      disabled={isDisabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
