import React from 'react';
import { Bus, Utensils, ShieldCheck, Sparkles, MapPin, Navigation } from 'lucide-react';
import { Logo } from '../common/Logo';

export const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  showJourneyBadge = true,
  heroImage = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80"
}) => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] flex flex-col justify-between font-sans selection:bg-[#2563EB] selection:text-white">
      
      {/* Top Header */}
      <header className="w-full bg-[#0B1F5E] text-white py-3.5 px-4 sm:px-8 shadow-card flex items-center justify-between z-30 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Logo size="md" lightMode={true} showSubtitle={true} />
        </div>

        {showJourneyBadge && (
          <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-blue-200">Garuda Bus QD-AP-1024</span>
            <span className="text-white/40">•</span>
            <span className="text-amber-300">Seat 14B</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Encrypted Transit Session</span>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8">
        <div className="w-full max-w-5xl bg-white dark:bg-[#0A1738] rounded-3xl shadow-floating border border-slate-200/80 dark:border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: 60% Mobility Tech + 40% Gourmet Food Hero Visual (Desktop Only) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1F5E] via-[#102A72] to-[#162F7A] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
            
            {/* Subtle Map Network Lines Background Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="auth-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#60A5FA" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#auth-grid)" />
              <path d="M 10 180 Q 140 80, 320 220" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="6 4" />
            </svg>

            {/* Top Brand Header */}
            <div className="relative z-10 space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Transit Dining Ecosystem
              </span>
              <h1 className="text-2xl xl:text-3xl font-extrabold leading-tight text-white">
                Fresh Gourmet Meals Delivered to Your Seat
              </h1>
              <p className="text-xs text-blue-200 leading-relaxed font-normal">
                Seamless food ordering on express highways. Order from top-rated transit plazas along your journey.
              </p>
            </div>

            {/* Middle Feature Image Preview */}
            <div className="relative z-10 my-4 rounded-2xl overflow-hidden border border-white/20 shadow-floating group h-44">
              <img 
                src={heroImage} 
                alt="Transit Food Journey" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F5E] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-black/50 backdrop-blur-md p-2.5 rounded-xl border border-white/20">
                <div className="flex items-center gap-2">
                  <Bus className="w-4 h-4 text-blue-400" />
                  <span className="font-extrabold text-white text-[11px]">Visakhapatnam → Hyderabad</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold text-[10px] border border-emerald-400/30">
                  ETA 42m
                </span>
              </div>
            </div>

            {/* Bottom Key Metric Pills */}
            <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <span className="block text-sm font-extrabold text-white">38+</span>
                <span className="text-[10px] text-blue-200">Express Plazas</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <span className="block text-sm font-extrabold text-white">15m</span>
                <span className="text-[10px] text-blue-200 font-medium">Avg Prep Time</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <span className="block text-sm font-extrabold text-emerald-300">100%</span>
                <span className="text-[10px] text-blue-200">Seat Delivered</span>
              </div>
            </div>

          </div>

          {/* Right Column: Customer Card Form */}
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
            
            {/* Mobile Header Graphic (Mobile only) */}
            <div className="lg:hidden mb-5 p-4 rounded-2xl bg-gradient-to-r from-[#0B1F5E] to-[#162F7A] text-white flex items-center justify-between shadow-card">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-300 block">QuickDines Journey</span>
                <span className="text-sm font-extrabold text-white">Visakhapatnam → Hyderabad</span>
              </div>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300/30">
                Seat 14B
              </span>
            </div>

            {children}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#071535]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>QuickDines • Food for the Journey © 2026</span>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#privacy" className="hover:text-blue-600 dark:hover:text-white transition">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-blue-600 dark:hover:text-white transition">Terms of Service</a>
            <span>•</span>
            <a href="#help" className="hover:text-blue-600 dark:hover:text-white transition">Passenger Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
