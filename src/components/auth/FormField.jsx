import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  error = null,
  success = null,
  options = null,
  required = false,
  disabled = false,
  helper = null
}) => {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {success && (
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {success}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full h-12 ${Icon ? 'pl-10' : 'pl-4'} pr-4 rounded-xl border text-xs font-bold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none transition ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-slate-200 dark:border-white/10 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20'
            }`}
          >
            <option value="">Select {label}</option>
            {options.map(opt => (
              <option key={opt.value || opt} value={opt.value || opt}>
                {opt.label || opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full h-12 ${Icon ? 'pl-10' : 'pl-4'} pr-4 rounded-xl border text-xs font-bold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-slate-200 dark:border-white/10 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20'
            }`}
          />
        )}
      </div>

      {helper && !error && (
        <p className="text-[10px] text-slate-400 font-medium">{helper}</p>
      )}

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
