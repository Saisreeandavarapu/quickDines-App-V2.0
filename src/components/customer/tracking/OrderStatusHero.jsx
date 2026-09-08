import React from 'react';
import { Clock, Sparkles } from 'lucide-react';

export const OrderStatusHero = ({ order, bus }) => {
  const status = order?.orderStatus || 'PREPARING';
  const etaMinutes = order?.etaMinutes || bus?.etaMinutes || 24;
  const seatNumber = order?.seatNumber || bus?.seatNumber || '14B';
  const itemCount = order?.items?.length || 2;
  const deliveryHub = order?.deliveryPoint || 'Vijayawada Transit Hub';

  const statusConfig = {
    PLACED: {
      label: 'ORDER PLACED',
      message: 'Order received by kitchen',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      dotBg: 'bg-blue-400',
    },
    ACCEPTED: {
      label: 'ACCEPTED',
      message: 'Kitchen confirmed your order',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
      dotBg: 'bg-sky-400',
    },
    PREPARING: {
      label: 'PREPARING',
      message: 'Your meal is being prepared',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      dotBg: 'bg-amber-400',
    },
    READY: {
      label: 'READY FOR PICKUP',
      message: 'Packed & waiting for runner',
      badgeBg: 'bg-blue-600/20 text-blue-300 border-blue-400/30',
      dotBg: 'bg-blue-400',
    },
    PICKED_UP: {
      label: 'PICKED UP',
      message: 'Runner collected your meal',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
      dotBg: 'bg-indigo-400',
    },
    ON_THE_WAY: {
      label: 'ON THE WAY',
      message: 'Meal is on the move to your seat',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      dotBg: 'bg-emerald-400',
    },
    DELIVERED: {
      label: 'DELIVERED',
      message: 'Enjoy your meal at Seat 14B!',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      dotBg: 'bg-emerald-400',
    },
    CANCELLED: {
      label: 'CANCELLED',
      message: 'Order has been cancelled',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-400/30',
      dotBg: 'bg-red-400',
    }
  };

  const config = statusConfig[status] || statusConfig.PREPARING;

  return (
    <div className="bg-gradient-to-br from-[#0B1F5E] via-[#102A72] to-[#162F7A] text-white rounded-3xl p-4 sm:p-5 border border-blue-400/25 shadow-card space-y-4 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Row 1: Status Pill (Left) & Live Tracking Indicator (Right) */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        <div className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase border flex items-center gap-1.5 ${config.badgeBg}`}>
          <span className={`w-2 h-2 rounded-full ${config.dotBg} animate-pulse`} />
          <span>{config.label}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>LIVE TRACKING</span>
        </div>
      </div>

      {/* Row 2: Human Order Message */}
      <div className="relative z-10">
        <h2 className="text-base sm:text-lg font-black text-white leading-snug">
          {config.message}
        </h2>
        <p className="text-[11px] text-blue-200 mt-0.5 font-medium">
          Order <span className="font-mono text-white font-bold">#{order?.id || 'QD102948'}</span> • {itemCount} {itemCount === 1 ? 'item' : 'items'} • Seat <strong className="text-amber-300 font-extrabold">{seatNumber}</strong>
        </p>
      </div>

      {/* Row 3: Prominent ETA Hero Display */}
      <div className="bg-white/10 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15 flex items-center justify-between gap-3 relative z-10">
        <div className="space-y-0.5">
          <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-blue-200 block">
            ARRIVING AT YOUR SEAT
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono tracking-tight leading-none">
              {etaMinutes}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white uppercase">min</span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-blue-100 block truncate font-medium">
            To Seat <strong className="text-amber-300 font-bold">{seatNumber}</strong> • {deliveryHub}
          </span>
        </div>

        <div className="text-right flex-shrink-0 space-y-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center ml-auto">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <span className="text-[9px] text-blue-200 block font-mono">Updated just now</span>
        </div>
      </div>
    </div>
  );
};
