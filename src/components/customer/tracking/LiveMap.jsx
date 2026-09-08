import React, { useState } from 'react';
import { Bus, MapPin, Plus, Minus, RotateCcw, Utensils, Navigation } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const LiveMap = ({ height = 'h-[300px] sm:h-[360px] md:h-[400px] lg:h-[500px]' }) => {
  const { bus, activeOrderId, orders } = useApp();
  const currentOrder = orders?.find(o => o.id === activeOrderId) || orders?.[0] || {};
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.15, 1.25));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.15, 0.85));
  const handleRecenter = () => setZoomLevel(1);

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden bg-[#0B1738] border border-white/15 shadow-2xl flex flex-col justify-between p-3.5 sm:p-4 selection:bg-none transition-all duration-300`}>

      {/* Dark Navy Map Grid & Dynamic Highway Path Line */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-500 origin-center pointer-events-none"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mapGridCanvas" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#162B58" strokeWidth="1" />
            </pattern>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#6EA8FF" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <rect width="100%" height="100%" fill="url(#mapGridCanvas)" />

          {/* Secondary Road Lines */}
          <path d="M 0 130 Q 220 210, 600 140 T 1200 230" fill="none" stroke="#162B58" strokeWidth="3" />
          <path d="M 120 0 Q 180 250, 260 600" fill="none" stroke="#162B58" strokeWidth="3" />

          {/* Highway Route Base Glow */}
          <path
            d="M 50 210 Q 180 90, 340 170 T 700 130"
            fill="none"
            stroke="#2563EB"
            strokeWidth="8"
            strokeLinecap="round"
            className="opacity-30 blur-[2px]"
          />

          {/* Highway Route Animated Path */}
          <path
            d="M 50 210 Q 180 90, 340 170 T 700 130"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="10 6"
            className="animate-pulse"
          />
        </svg>

        {/* Scalable Map Markers Overlay Layer */}
        <div className="absolute inset-0 p-4 sm:p-6 flex items-center justify-between pointer-events-auto">

          {/* 1. RESTAURANT KITCHEN MARKER (Left-bottom node) */}
          <div className="absolute left-[6%] bottom-[22%] flex flex-col items-center">
            <div className="w-8 h-8 rounded-xl bg-[#3B82F6] border-2 border-white flex items-center justify-center text-white shadow-glow">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-extrabold text-slate-200 bg-[#0B1738]/95 px-2 py-0.5 rounded-md border border-white/15 backdrop-blur-md shadow-card">
              Kitchen
            </span>
          </div>

          {/* 2. BUS CURRENT LOCATION MARKER (Center-top node - Visual Centerpiece) */}
          <div className="absolute left-[40%] top-[38%] flex flex-col items-center group cursor-pointer z-20">
            {/* Live Pulsing Radar Ring */}
            <div className="relative">
              <div className="absolute -inset-3 bg-[#3B82F6]/40 rounded-full blur-md animate-ping" />
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#2563EB] border-2 border-white flex items-center justify-center text-white shadow-glow">
                <Bus className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-white" />
              </div>
            </div>

            {/* Compact Floating Bus Chip */}
            <div className="mt-1.5 bg-[#0B1738]/95 border border-blue-400/50 px-2.5 py-0.5 rounded-xl text-center shadow-card backdrop-blur-md whitespace-nowrap">
              <span className="block text-[10px] font-black text-white">{bus.busNumber || 'AP-28-Z-1234'}</span>
            </div>
          </div>

          {/* 3. DESTINATION STOP MARKER (Right-top node) */}
          <div className="absolute right-[8%] top-[20%] flex flex-col items-center z-10">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-[#16A34A] border-2 border-white flex items-center justify-center text-white shadow-glow">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="mt-1 bg-[#0B1738]/95 border border-emerald-400/40 px-2 py-0.5 rounded-xl text-center shadow-card backdrop-blur-md max-w-[130px]">
              <span className="block text-[10px] font-black text-white truncate">{currentOrder.deliveryPoint || 'Vijayawada Hub'}</span>
              <span className="text-[9px] text-[#86EFAC] font-bold block">Seat {bus.seatNumber || '14B'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* TOP FLOATING OVERLAY: Quiet Live Tracking Indicator (Left-aligned) */}
      <div className="relative z-30 flex items-center justify-between gap-2 pointer-events-auto">
        <div className="bg-[#0B1738]/90 backdrop-blur-md px-1 py-1.5 rounded-full border border-blue-400/30 text-white text-[8px] lg:text-[10px] font-bold flex items-center gap-1.5 shadow-card">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-black tracking-wider">LIVE TRACKING</span>
          <span className="text-slate-400">•</span>
          <span className="text-blue-200">Updated 12 sec ago</span>
        </div>

        {/* Map Zoom Controls (Positioned Top Right in single header row - ZERO collision!) */}
        <div className="flex items-center gap-1 bg-[#0B1738]/90 backdrop-blur-md p-1 rounded-2xl border border-white/20 shadow-card">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-xl hover:bg-[#162B58] text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-xl hover:bg-[#162B58] text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRecenter}
            className="w-7 h-7 rounded-xl hover:bg-[#162B58] text-blue-400 flex items-center justify-center transition active:scale-95 cursor-pointer"
            title="Recenter Map"
            aria-label="Recenter Map"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* BOTTOM OVERLAY BAR: Minimal Transit Context */}
      <div className="relative z-30 bg-[#0B1F5E]/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/15 text-[10px] sm:text-[11px] flex items-center justify-between text-slate-200 shadow-card">
        <span className="truncate">Bus: <strong className="text-white font-extrabold">{bus.busNumber || 'AP-28-Z-1234'}</strong></span>
        <span className="text-slate-300 truncate">Halt: <strong className="text-emerald-300 font-extrabold">{currentOrder.deliveryPoint || 'Vijayawada Hub'}</strong></span>
      </div>

    </div>
  );
};
