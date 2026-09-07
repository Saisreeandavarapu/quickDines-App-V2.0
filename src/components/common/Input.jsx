import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full h-11 px-4 ${Icon ? 'pl-10' : ''} rounded-xl border ${
            error 
              ? 'border-red-500 ring-1 ring-red-500' 
              : 'border-slate-200 dark:border-white/10'
          } bg-white dark:bg-[#0A1738] text-slate-800 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-[11px] font-bold text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};

export const Select = ({ label, options = [], className = '', id, ...props }) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A1738] text-slate-800 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${className}`}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value !== undefined ? opt.value : opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SearchInput = ({ placeholder = "Search...", value, onChange, className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A1738] text-slate-800 dark:text-white text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      />
    </div>
  );
};
