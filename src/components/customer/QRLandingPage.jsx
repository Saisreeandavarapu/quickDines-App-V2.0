import React from 'react';
import { Bus, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles, Utensils } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';

export const QRLandingPage = () => {
  const { bus, setActiveCustomerTab } = useApp();

  return (
    <div className="min-h-screen bg-[#071535] text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar (Stacked on small screens to prevent logo crowding) */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveCustomerTab('menu')}
          className="text-left focus:outline-none hover:opacity-90 transition active:scale-95 flex-shrink-0"
          title="Go to Menu"
        >
          <Logo size="md" lightMode={true} showSubtitle={false} />
        </button>
        <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          BUS QR VERIFIED
        </span>
      </div>

      {/* Main Welcome Hero */}
      <div className="relative z-10 my-auto max-w-md mx-auto w-full space-y-5 text-center pt-4">

        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-navy-gradient p-0.5 shadow-floating flex items-center justify-center">
          <div className="w-full h-full bg-[#0B1F5E] rounded-[22px] flex items-center justify-center border border-white/20">
            <Bus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 animate-bus-float" />
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-400">Transit Dining Service</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Welcome to QuickDines</h1>
          <p className="text-xs sm:text-sm text-blue-100/80 mt-1 font-medium leading-relaxed max-w-xs mx-auto">
            Enjoy your journey. Your fresh, hot gourmet food is just a few taps away.
          </p>
        </div>

        {/* Bus Journey Info Card (Clean stacked layout, no horizontal collisions) */}
        <div className="bg-[#0A1738] border border-blue-400/30 rounded-3xl p-4 sm:p-5 text-left shadow-card space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Bus Number</span>
              <span className="text-lg sm:text-xl font-extrabold text-white tracking-wide">{bus.busNumber}</span>
            </div>
            <span className="self-start sm:self-auto bg-blue-500/20 text-blue-300 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
              {bus.operator}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 flex items-center gap-1 text-[10px] mb-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" /> Route
              </span>
              <span className="font-extrabold text-white block">{bus.route}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-slate-400 flex items-center gap-1 text-[10px] mb-0.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Next Stop ETA
              </span>
              <span className="font-extrabold text-emerald-300 block">{bus.etaMinutes} mins ({bus.arrivalTime})</span>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-xs flex items-center gap-3">
            <Utensils className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="font-bold text-white block">Annapurna Food Transit Plaza</span>
              <span className="text-[10px] sm:text-[11px] text-slate-300">Vijayawada Highway Hub • 14 Kitchens</span>
            </div>
          </div>
        </div>

        {/* Explore CTA */}
        <button
          onClick={() => setActiveCustomerTab('menu')}
          className="w-full h-14 sm:h-16 bg-navy-gradient hover:opacity-95 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-glow transition flex items-center justify-center gap-3 border border-white/20 active:scale-95"
        >
          <span>Explore Journey Menu</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>

      {/* Footer Assurance */}
      <div className="relative z-10 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-4">
        <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
        <span>Hygienic Transit Delivery • Guaranteed Hot to Seat</span>
      </div>

    </div>
  );
};
