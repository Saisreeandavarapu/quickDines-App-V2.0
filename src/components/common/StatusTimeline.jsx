import React, { useState } from 'react';
import { Check, Clock, CookingPot, PackageCheck, Bike, Bus, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const StatusTimeline = ({ currentStatus = 'PREPARING' }) => {
  const [showFullLog, setShowFullLog] = useState(false);

  const steps = [
    { id: 'PLACED', title: 'Order Placed', desc: 'Received & Confirmed', time: '07:32 PM', icon: Clock },
    { id: 'ACCEPTED', title: 'Accepted by Kitchen', desc: 'Annapurna Highway Gourmet', time: '07:34 PM', icon: Check },
    { id: 'PREPARING', title: 'Preparing Meal', desc: 'Fresh cooking in kitchen', time: 'In Progress', icon: CookingPot },
    { id: 'READY', title: 'Ready for Pickup', desc: 'Packed in thermal container', time: 'Est 07:48 PM', icon: PackageCheck },
    { id: 'PICKED_UP', title: 'Picked Up by Runner', desc: 'Handed to K. Ramesh (#408)', time: 'Upcoming', icon: Bike },
    { id: 'ON_THE_WAY', title: 'En Route to Bus', desc: 'Transit to Vijayawada Bay 4', time: 'Upcoming', icon: Bus },
    { id: 'DELIVERED', title: 'Delivered to Seat', desc: 'Seat 14B', time: 'Upcoming', icon: Check },
  ];

  const currentIndex = steps.findIndex(s => s.id === currentStatus);
  const activeStepIndex = currentIndex >= 0 ? currentIndex : 2; // Default to PREPARING
  const progressPercent = Math.round(((activeStepIndex + 1) / steps.length) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Order Preparation Progress</span>
          </span>
          <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-md text-[11px]">
            {progressPercent}% Complete
          </span>
        </div>
        
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500 shadow-glow"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Primary Stepper Pipeline (Clean 4-Stage Horizontal Indicator on Desktop & Mobile) */}
      <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-1">
        {[
          { label: 'Placed', stepIdx: 0 },
          { label: 'Kitchen', stepIdx: 2 },
          { label: 'Transit', stepIdx: 4 },
          { label: 'Seat 14B', stepIdx: 6 },
        ].map((stage, i) => {
          const isDone = activeStepIndex >= stage.stepIdx;
          const isCurrent = activeStepIndex === stage.stepIdx || (activeStepIndex > stage.stepIdx && (i === 3 || activeStepIndex < [0, 2, 4, 6][i + 1]));

          return (
            <div key={i} className="flex flex-col items-center text-center">
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition duration-300 ${
                  isCurrent
                    ? 'bg-[#2563EB] text-white ring-4 ring-blue-500/20 shadow-glow scale-105'
                    : isDone
                    ? 'bg-emerald-500 text-white shadow-subtle'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {isDone && !isCurrent ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : i + 1}
              </div>
              <span className={`text-[10px] sm:text-xs font-bold mt-1.5 truncate max-w-full ${
                isCurrent 
                  ? 'text-blue-600 dark:text-blue-400 font-black' 
                  : isDone 
                  ? 'text-slate-800 dark:text-slate-200' 
                  : 'text-slate-400'
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Expandable Step-by-Step Audit Log Toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-white/5">
        <button
          onClick={() => setShowFullLog(!showFullLog)}
          className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold transition"
        >
          <span>Current Stage: <strong className="text-[#0B1F5E] dark:text-white font-extrabold">{steps[activeStepIndex]?.title}</strong></span>
          <span className="flex items-center gap-1 text-[#2563EB] dark:text-blue-400 text-[11px] font-extrabold">
            {showFullLog ? 'Hide Details' : 'Full Timeline'}
            {showFullLog ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </button>

        {showFullLog && (
          <div className="mt-3 space-y-2.5 pl-2 border-l-2 border-slate-200 dark:border-white/10 ml-2 animate-in fade-in slide-in-from-top-2">
            {steps.map((step, idx) => {
              const isDone = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="relative pl-5 py-1">
                  {/* Node bullet */}
                  <div className={`absolute -left-[13px] top-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-2 ring-blue-500/30'
                      : isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    <StepIcon className="w-3 h-3" />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className={`font-extrabold block ${isCurrent ? 'text-blue-600 dark:text-blue-400' : isDone ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{step.desc}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-medium ${isCurrent ? 'text-amber-500 font-bold' : 'text-slate-400'}`}>
                      {step.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

