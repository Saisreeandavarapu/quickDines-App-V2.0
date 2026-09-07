import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const SuccessState = ({
  title = "Authentication Successful",
  message = "You're connected to your journey.",
  buttonText = "Continue to Dashboard",
  onAction
}) => {
  return (
    <div className="text-center p-6 space-y-5 animate-in zoom-in-95 duration-300">

      {/* Animated Checkmark Circle */}
      <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto shadow-glow">
        <CheckCircle2 className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-extrabold text-[#0F172A] dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          {message}
        </p>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="w-full h-16 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-glow transition flex items-center justify-center gap-2"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Verified Transit Session</span>
      </div>

    </div>
  );
};
