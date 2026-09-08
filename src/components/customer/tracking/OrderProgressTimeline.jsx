import React, { useState } from 'react';
import { Check, Clock, CookingPot, PackageCheck, Bus, ChevronDown, ChevronUp } from 'lucide-react';

export const OrderProgressTimeline = ({ currentStatus = 'PREPARING' }) => {
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  const steps = [
    { id: 'PLACED', title: 'Order Placed', time: '07:32 PM', desc: 'Received by system' },
    { id: 'ACCEPTED', title: 'Restaurant Accepted', time: '07:34 PM', desc: 'Confirmed by kitchen' },
    { id: 'PREPARING', title: 'Preparing your meal', time: 'Now', desc: 'Your food is being prepared' },
    { id: 'READY', title: 'Ready for pickup', time: 'Upcoming', desc: 'Packed in thermal container' },
    { id: 'ON_THE_WAY', title: 'On the way to seat', time: 'Upcoming', desc: 'Runner en route to bus' },
    { id: 'DELIVERED', title: 'Delivered to Seat 14B', time: 'Upcoming', desc: 'Enjoy your hot meal!' },
  ];

  const activeIndex = steps.findIndex(s => s.id === currentStatus);
  const currentIndex = activeIndex >= 0 ? activeIndex : 2;

  return (
    <div className="bg-white dark:bg-[#0A1738] rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-subtle space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          YOUR ORDER JOURNEY
        </span>
        <button
          onClick={() => setShowFullTimeline(!showFullTimeline)}
          className="text-[11px] font-bold text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>{showFullTimeline ? 'Compact View' : 'Full Timeline'}</span>
          {showFullTimeline ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Human-Friendly Vertical Step List */}
      <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 dark:border-white/10 ml-2 py-1">
        {steps.slice(0, showFullTimeline ? steps.length : 4).map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.id} className="relative pl-5">
              {/* Bullet Node */}
              <div 
                className={`absolute -left-[21px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition duration-300 ${
                  isCurrent
                    ? 'bg-[#2563EB] text-white ring-4 ring-blue-500/20 scale-105 shadow-glow'
                    : isCompleted
                    ? 'bg-emerald-500 text-white shadow-subtle'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : isCurrent ? <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />}
              </div>

              {/* Step Title & Subtitle */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className={`font-extrabold block ${
                    isCurrent 
                      ? 'text-[#2563EB] dark:text-blue-400 text-sm' 
                      : isCompleted 
                      ? 'text-slate-800 dark:text-slate-200' 
                      : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {step.desc}
                  </span>
                </div>

                <span className={`text-[10px] font-mono ${isCurrent ? 'text-amber-500 font-extrabold' : 'text-slate-400'}`}>
                  {step.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
