import React from 'react';
import { Bus, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const JourneyCard = ({ journey, onChangeJourney }) => {
  if (!journey) return null;

  return (
    <div className="bg-gradient-to-r from-[#0B1F5E] to-[#102A72] text-white p-4 sm:p-5 rounded-2xl shadow-card border border-blue-400/30 space-y-3 relative overflow-hidden">
      {/* Background Highway Glow SVG */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Banner Status */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border border-emerald-400/30">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> BUS CONNECTED
        </span>
        <span className="text-[11px] text-blue-200 font-mono font-bold">
          {journey.busNumber || 'QD-AP-1024'}
        </span>
      </div>

      {/* Route & Seat Info */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="space-y-0.5">
          <span className="text-[10px] text-blue-200 uppercase font-bold block">Active Journey</span>
          <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-white">
            <span>{journey.origin || 'Visakhapatnam'}</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
            <span>{journey.destination || 'Hyderabad'}</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-right flex-shrink-0">
          <span className="text-[9px] text-blue-200 uppercase font-bold block">Your Seat</span>
          <span className="text-sm font-extrabold text-amber-300">{journey.seatNumber || '14B'}</span>
        </div>
      </div>

      {/* ETA & Change Journey */}
      <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs">
        <div className="flex items-center gap-1.5 text-blue-200">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Estimated arrival in <strong className="text-white font-bold">{journey.etaMinutes || 42} min</strong></span>
        </div>

        {onChangeJourney && (
          <button
            type="button"
            onClick={onChangeJourney}
            className="text-[11px] text-blue-300 font-bold hover:text-white underline transition"
          >
            Change Journey
          </button>
        )}
      </div>

    </div>
  );
};
