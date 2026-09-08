import React from 'react';
import { Bus, ArrowRight } from 'lucide-react';

export const JourneySummaryCard = ({ journey, bus, order }) => {
  const origin = journey?.origin || 'Visakhapatnam';
  const destination = journey?.destination || 'Hyderabad';
  const busNum = journey?.busNumber || bus?.busNumber || 'AP-28-Z-1234';
  const seatNum = order?.seatNumber || journey?.seatNumber || bus?.seatNumber || '14B';
  const stopName = order?.deliveryPoint || journey?.nextStop || bus?.nextStop || 'Vijayawada Transit Hub';

  return (
    <div className="bg-white dark:bg-[#0A1738] rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-subtle space-y-3">
      {/* Route Header */}
      <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-white/5 pb-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          YOUR JOURNEY
        </span>
        <div className="flex items-center gap-1.5 font-extrabold text-[#0F172A] dark:text-white text-xs sm:text-sm">
          <span>{origin}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          <span>{destination}</span>
        </div>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-0.5">
        <div>
          <span className="text-[9px] text-slate-400 uppercase font-extrabold block">Bus</span>
          <span className="font-extrabold text-[#0F172A] dark:text-white font-mono">{busNum}</span>
        </div>

        <div>
          <span className="text-[9px] text-slate-400 uppercase font-extrabold block">Seat</span>
          <span className="font-extrabold text-[#2563EB] dark:text-blue-400 font-mono">Seat {seatNum}</span>
        </div>

        <div>
          <span className="text-[9px] text-slate-400 uppercase font-extrabold block">Next Stop</span>
          <span className="font-bold text-slate-700 dark:text-slate-200 truncate block">{stopName}</span>
        </div>

        <div>
          <span className="text-[9px] text-slate-400 uppercase font-extrabold block">Bay</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Bay 4</span>
        </div>
      </div>
    </div>
  );
};
