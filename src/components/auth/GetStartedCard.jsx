import React from 'react';
import { Sparkles, ArrowRight, RefreshCw, Utensils } from 'lucide-react';
import { getGreetingByTime } from '../../services/authService';
import { JourneyCard } from './JourneyCard';

export const GetStartedCard = ({ journey, onGetStarted, onChangeJourney }) => {
  const greeting = getGreetingByTime();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Dynamic Time Greeting & Heading */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-extrabold uppercase border border-blue-200 dark:border-blue-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Express Transit Menu Active
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white leading-tight">
          {greeting}.<br />
          <span className="text-[#2563EB]">Let's make your journey delicious.</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium pt-1">
          Discover gourmet meals available on your route, order in seconds and track your food until it reaches your seat.
        </p>
      </div>

      {/* Connected Journey Card */}
      <JourneyCard journey={journey} onChangeJourney={onChangeJourney} />

      {/* Primary CTAs */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onGetStarted}
          className="w-full h-14 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-glow hover:shadow-floating transition duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
        >
          <Utensils className="w-5 h-5" />
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {onChangeJourney && (
          <button
            onClick={onChangeJourney}
            className="w-full h-12 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-xs rounded-xl border border-slate-200 dark:border-white/10 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Change Journey / Scan Another QR</span>
          </button>
        )}
      </div>

      {/* Footer Helper */}
      <div className="text-center pt-2">
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
          QuickDines • Food for the journey
        </span>
      </div>

    </div>
  );
};
