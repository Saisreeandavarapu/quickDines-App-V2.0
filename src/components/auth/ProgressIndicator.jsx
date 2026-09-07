import React from 'react';
import { Check } from 'lucide-react';

export const ProgressIndicator = ({ currentStep = 1, totalSteps = 4, stepLabels = [] }) => {
  const defaultLabels = ["Personal", "Profile", "Preferences", "Complete"];
  const labels = stepLabels.length ? stepLabels : defaultLabels;

  return (
    <div className="w-full space-y-3">
      
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-[#0B1F5E] dark:text-blue-400 uppercase tracking-wider">
          Step {currentStep} of {totalSteps} — {labels[currentStep - 1]}
        </span>
        <span className="text-slate-400 font-mono">
          {Math.round((currentStep / totalSteps) * 100)}% Completed
        </span>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-white/10">
        <div 
          className="h-full bg-gradient-to-r from-[#2563EB] to-emerald-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Stepper Nodes */}
      <div className="grid grid-cols-4 gap-1 text-center pt-1">
        {labels.map((lbl, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#2563EB] text-white ring-4 ring-blue-500/20 scale-110 shadow-subtle'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : stepNum}
              </div>

              <span className={`text-[10px] font-bold tracking-tight hidden sm:block ${
                isCurrent 
                  ? 'text-[#2563EB] dark:text-blue-400' 
                  : isDone 
                  ? 'text-slate-800 dark:text-slate-200' 
                  : 'text-slate-400'
              }`}>
                0{stepNum} {lbl}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
