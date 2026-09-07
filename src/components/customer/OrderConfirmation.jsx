import React from 'react';
import { CheckCircle2, Bus, MapPin, Clock, ArrowRight, ShieldCheck, Download, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrderConfirmation = () => {
  const { activeOrderId, orders, bus, setActiveCustomerTab } = useApp();
  const currentOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] p-4 sm:p-6 pb-28 flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-[#0A1738] rounded-3xl border border-slate-200 dark:border-white/10 shadow-floating p-6 text-center space-y-6 animate-in fade-in zoom-in-95">
        
        {/* Animated Check Success Icon */}
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full mx-auto flex items-center justify-center border border-emerald-500/30 shadow-subtle">
          <CheckCircle2 className="w-12 h-12 animate-bounce-short" />
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">Payment Successful</span>
          <h2 className="text-2xl font-extrabold text-[#0B1F5E] dark:text-white mt-1">Order Confirmed!</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Your meal is currently being prepared at the kitchen.
          </p>
        </div>

        {/* Key Order Ticket Summary */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-left text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
            <span className="text-slate-400">Order ID</span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono text-sm">#{currentOrder.id}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Bus Number</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{currentOrder.busNumber} (Seat {currentOrder.seatNumber})</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Restaurant</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{currentOrder.restaurantName}</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-2 text-sm font-extrabold text-[#0B1F5E] dark:text-white">
            <span>Estimated Delivery</span>
            <span className="text-emerald-600 dark:text-emerald-400">{currentOrder.etaMinutes} minutes ({currentOrder.estimatedDeliveryTime})</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => setActiveCustomerTab('tracking')}
            className="w-full h-13 bg-navy-gradient text-white font-extrabold text-sm rounded-2xl shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <span>Track Order Real-Time</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveCustomerTab('history')}
            className="w-full h-11 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Digital Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
};
