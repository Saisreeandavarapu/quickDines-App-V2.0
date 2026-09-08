import React from 'react';
import { Bus, MapPin, Navigation, Clock, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MapVisualizer = ({ height = 'h-[260px] sm:h-[320px]', interactive = true }) => {
  const { bus, activeOrderId, orders } = useApp();
  const currentOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden bg-[#071535] border border-white/15 shadow-floating flex flex-col justify-between p-3.5 sm:p-5 selection:bg-none`}>
      
      {/* Dark Navy Grid & Curved Route SVG Canvas */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#1E3A8A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Glowing Dynamic Transit Route Line */}
        <path 
          d="M 30 180 Q 160 70, 320 130 T 640 100" 
          fill="none" 
          stroke="#2563EB" 
          strokeWidth="5" 
          strokeLinecap="round"
          strokeDasharray="8 6" 
          className="animate-pulse"
        />
        <path 
          d="M 30 180 Q 160 70, 320 130 T 640 100" 
          fill="none" 
          stroke="#60A5FA" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>

      {/* Top Map Header Badges (Sleek 1-row Flex) */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-[#0B1F5E]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-400/30 text-white text-[10px] sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="font-extrabold tracking-wider">LIVE GPS TELEMATICS</span>
        </div>

        <div className="flex items-center gap-1 bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-xs font-extrabold">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Halt in {bus.etaMinutes}m</span>
        </div>
      </div>

      {/* Middle Interactive Route Map Nodes */}
      <div className="relative z-10 my-auto flex items-center justify-between px-2 sm:px-10">
        
        {/* Bus Vehicle Marker */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/30 rounded-full blur-md animate-ping"></div>
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 border-2 border-white flex items-center justify-center shadow-glow text-white">
              <Bus className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="mt-2 bg-[#0B1F5E]/90 backdrop-blur-md border border-blue-400/40 px-2.5 py-1 rounded-xl text-center shadow-card">
            <span className="block text-[11px] font-black text-white">{bus.busNumber}</span>
            <span className="text-[9px] text-blue-200 font-bold">{bus.speedKmH} km/h</span>
          </div>
        </div>

        {/* Connecting Transit Line Indicator */}
        <div className="flex-1 max-w-[160px] mx-3 flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-300 mb-1">Transit En Route</span>
          <div className="w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 rounded-full relative shadow-glow">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-blue-600 shadow-md"></div>
          </div>
        </div>

        {/* Express Plaza Destination Marker */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 border-2 border-white flex items-center justify-center shadow-card text-white">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="mt-2 bg-[#0B1F5E]/90 backdrop-blur-md border border-emerald-400/40 px-2.5 py-1 rounded-xl text-center shadow-card">
            <span className="block text-[11px] font-black text-white">Vijayawada Hub</span>
            <span className="text-[9px] text-emerald-300 font-bold">Express Plaza</span>
          </div>
        </div>

      </div>

      {/* Bottom Map Info Overlay Bar */}
      <div className="relative z-10 bg-[#0B1F5E]/90 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-[11px] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-slate-200 truncate">Stop: <strong className="text-white font-extrabold">{currentOrder.deliveryPoint}</strong></span>
        </div>
        <div className="flex items-center gap-3 text-slate-200 flex-shrink-0 text-[10px] sm:text-[11px]">
          <span>Seat: <strong className="text-amber-300 font-bold">Seat {bus.seatNumber}</strong></span>
          <span>Runner: <strong className="text-blue-300 font-bold">K. Ramesh</strong></span>
        </div>
      </div>

    </div>
  );
};

