import React from 'react';
import { Bus, MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MapVisualizer = ({ height = 'min-h-[360px]', interactive = true }) => {
  const { bus, activeOrderId, orders } = useApp();
  const currentOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden bg-[#071535] border border-white/15 shadow-floating flex flex-col justify-between p-3.5 sm:p-5 selection:bg-none`}>
      
      {/* Dark Navy Map Canvas SVG Simulation */}
      <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162F7A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Curved Highway Path Line */}
        <path 
          d="M 40 220 Q 180 90, 360 160 T 720 130" 
          fill="none" 
          stroke="#2563EB" 
          strokeWidth="6" 
          strokeLinecap="round"
          strokeDasharray="8 6" 
          className="animate-pulse"
        />
        <path 
          d="M 40 220 Q 180 90, 360 160 T 720 130" 
          fill="none" 
          stroke="#60A5FA" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>

      {/* Top Map Header Badges (Stacked on mobile, row on desktop) */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-[#0B1F5E]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-400/30 text-white shadow-subtle text-[11px]">
          <Navigation className="w-3.5 h-3.5 text-blue-400 animate-spin flex-shrink-0" style={{ animationDuration: '8s' }} />
          <span className="font-extrabold tracking-wider">LIVE TELEMATICS</span>
          <span className="text-slate-400">•</span>
          <span className="text-blue-200">GPS Lock</span>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/40 text-emerald-300 text-[11px] font-extrabold">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>ETA to Stop: {bus.etaMinutes} mins</span>
        </div>
      </div>

      {/* Simulated Map Markers */}
      <div className="relative z-10 my-4 sm:my-auto flex items-center justify-around px-2 sm:px-8">
        
        {/* Bus Marker */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/30 rounded-full blur-md animate-ping"></div>
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 border-2 border-white flex items-center justify-center shadow-glow text-white">
              <Bus className="w-5 h-5 sm:w-6 sm:h-6 animate-bus-float" />
            </div>
          </div>
          <div className="mt-1.5 bg-[#0A1738] border border-blue-400/30 px-2.5 py-1 rounded-xl text-center shadow-card">
            <span className="block text-[10px] sm:text-[11px] font-extrabold text-white">{bus.busNumber}</span>
            <span className="text-[9px] sm:text-[10px] text-blue-300">Speed: {bus.speedKmH} km/h</span>
          </div>
        </div>

        {/* Dynamic Transit Route Line Indicator */}
        <div className="flex-1 max-w-xs mx-2 hidden sm:flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-widest font-bold text-blue-300 mb-1">Transit Segment 2 of 4</span>
          <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 rounded-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border-2 border-blue-600 shadow-md"></div>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 font-mono">18.4 km remaining</span>
        </div>

        {/* Restaurant Stop Marker */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 border-2 border-white flex items-center justify-center shadow-card text-white">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="mt-1.5 bg-[#0A1738] border border-emerald-400/30 px-2.5 py-1 rounded-xl text-center shadow-card">
            <span className="block text-[10px] sm:text-[11px] font-extrabold text-white">Annapurna Hub</span>
            <span className="text-[9px] sm:text-[10px] text-emerald-300">Vijayawada Stop</span>
          </div>
        </div>

      </div>

      {/* Bottom Map Info Footer Overlay (Clean, non-clipping responsive layout) */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-[#0B1F5E]/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/10 text-[11px]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span className="text-slate-300 truncate">Hub: <strong className="text-white font-bold">{currentOrder.deliveryPoint}</strong></span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] text-slate-300">
          <span>Seat: <strong className="text-amber-300 font-bold">Seat {bus.seatNumber}</strong></span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span>Runner: <strong className="text-blue-200 font-bold">K. Ramesh (#408)</strong></span>
        </div>
      </div>

    </div>
  );
};
