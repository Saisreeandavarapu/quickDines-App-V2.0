import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({ title, value, change, trend = 'up', icon: Icon, description }) => {
  return (
    <div className="bg-white dark:bg-[#0A1738] p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-subtle hover:shadow-card transition duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0B1F5E] dark:text-white tracking-tight">{value}</h3>
        {change && (
          <div className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-lg ${
            trend === 'up' 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
              : 'bg-red-500/10 text-red-600 dark:text-red-400'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {description && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">{description}</p>
      )}
    </div>
  );
};
