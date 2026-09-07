import React from 'react';
import { CheckCircle2, Clock, CookingPot, PackageCheck, Bike, Bus, Check } from 'lucide-react';

export const StatusTimeline = ({ currentStatus = 'PREPARING' }) => {
  const steps = [
    { id: 'PLACED', label: 'Order Placed', time: '07:32 PM', icon: Clock },
    { id: 'ACCEPTED', label: 'Accepted', time: '07:34 PM', icon: CheckCircle2 },
    { id: 'PREPARING', label: 'Preparing Meal', time: 'In Progress', icon: CookingPot },
    { id: 'READY', label: 'Ready for Pickup', time: 'Upcoming', icon: PackageCheck },
    { id: 'PICKED_UP', label: 'Picked Up by Runner', time: 'Upcoming', icon: Bike },
    { id: 'ON_THE_WAY', label: 'On The Way to Seat', time: 'Upcoming', icon: Bus },
    { id: 'DELIVERED', label: 'Delivered to Seat 14B', time: 'Upcoming', icon: Check },
  ];

  const currentIndex = steps.findIndex(s => s.id === currentStatus);

  return (
    <div className="w-full">
      
      {/* MOBILE VIEW: Ultra-clean vertical timeline (Eliminates horizontal text collision completely) */}
      <div className="sm:hidden space-y-3 relative pl-4 border-l-2 border-slate-200 dark:border-white/10 ml-3 my-2">
        {steps.map((step, index) => {
          const isDone = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative pl-6 pb-2">
              {/* Timeline Bullet Node */}
              <div 
                className={`absolute -left-[25px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 scale-110 shadow-glow'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Step Info */}
              <div className="flex items-center justify-between text-xs">
                <span className={`font-extrabold ${
                  isCurrent 
                    ? 'text-blue-600 dark:text-blue-400 text-sm' 
                    : isDone 
                    ? 'text-slate-800 dark:text-slate-200' 
                    : 'text-slate-400'
                }`}>
                  {step.label}
                </span>

                <span className={`text-[10px] font-mono ${isCurrent ? 'text-amber-500 font-bold' : 'text-slate-400'}`}>
                  {step.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW: Sleek horizontal step line */}
      <div className="hidden sm:block py-4">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 -z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 -translate-y-1/2 transition-all duration-500 -z-0"
            style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((step, index) => {
            const isDone = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition duration-300 ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 scale-110 shadow-glow'
                      : isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400 dark:bg-[#071535] dark:text-slate-600 border border-slate-300 dark:border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-semibold mt-2 text-center transition ${
                  isCurrent
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : isDone
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'text-slate-400 dark:text-slate-600'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
