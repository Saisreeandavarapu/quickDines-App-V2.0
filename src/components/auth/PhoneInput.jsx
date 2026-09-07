import React from 'react';
import { Smartphone, CheckCircle2 } from 'lucide-react';

export const PhoneInput = ({ 
  value, 
  onChange, 
  disabled = false, 
  error = null,
  placeholder = "Enter 10-digit mobile number" 
}) => {
  const isComplete = value.replace(/\D/g, '').length === 10;

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase tracking-wider">
        Mobile Number
      </label>

      <div className="relative flex items-center">
        {/* Country Code Prefix Pill */}
        <div className="absolute left-3 flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-extrabold select-none">
          <span>🇮🇳</span>
          <span>+91</span>
        </div>

        {/* Input */}
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          value={value}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '');
            onChange(digits);
          }}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full h-13 pl-24 pr-10 rounded-2xl border text-sm font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition duration-200 ${
            error 
              ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
              : isComplete
              ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
              : 'border-slate-200 dark:border-white/10 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20'
          }`}
        />

        {/* Valid Indicator */}
        {isComplete && !error && (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute right-3 pointer-events-none" />
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1 mt-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
};
