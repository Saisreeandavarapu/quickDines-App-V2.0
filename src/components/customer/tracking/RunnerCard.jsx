import React from 'react';
import { Bike, PhoneCall, MessageSquare, ShieldCheck } from 'lucide-react';

export const RunnerCard = ({ order, showToast }) => {
  const runnerName = order?.driverName || 'K. Ramesh';
  const runnerId = '#408';
  const runnerPhone = order?.driverPhone || '+91 91234 56789';
  const runnerStatus = order?.driverStatus || 'On the way to seat';

  return (
    <div className="bg-white dark:bg-[#0A1738] rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-subtle space-y-3">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-white/5 pb-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Bike className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          YOUR QUICKDINES RUNNER
        </span>
        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-300/30 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified
        </span>
      </div>

      {/* Runner Profile & Status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar Icon */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center font-black text-sm shadow-subtle flex-shrink-0">
            KR
          </div>
          
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] dark:text-white truncate">
              {runnerName} <span className="text-slate-400 font-mono text-[11px]">({runnerId})</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              Status: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{runnerStatus}</strong>
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={`tel:${runnerPhone}`}
            className="px-3 py-2 bg-[#0B1F5E] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 active:scale-95 shadow-subtle cursor-pointer"
            title="Call Delivery Runner"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Call</span>
          </a>

          <button
            onClick={() => {
              if (showToast) showToast('Messaging initialized with Runner K. Ramesh', 'info');
            }}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="Message Runner"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
