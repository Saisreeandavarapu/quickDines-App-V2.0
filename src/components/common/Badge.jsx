import React from 'react';

export const Badge = ({ status, text }) => {
  const normalized = (status || text || '').toUpperCase();

  const styles = {
    PLACED: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    ACCEPTED: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800',
    PREPARING: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    READY: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    PICKED_UP: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    ON_THE_WAY: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    DELIVERED: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    PAID: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    PENDING: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    APPROVED: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    REJECTED: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
    ONLINE: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    OFFLINE: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800',
    HIGH: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
    MEDIUM: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    LOW: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800',
  };

  const selected = styles[normalized] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border tracking-wider uppercase ${selected}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {text || normalized.replace('_', ' ')}
    </span>
  );
};
