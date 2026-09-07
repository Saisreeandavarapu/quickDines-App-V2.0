import React, { useState } from 'react';
import { 
  Bus, 
  MapPin, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  RefreshCw, 
  ChefHat, 
  Bike,
  Sparkles,
  Navigation,
  ChevronDown,
  ChevronUp,
  Receipt,
  Utensils,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusTimeline } from '../common/StatusTimeline';
import { MapVisualizer } from '../common/MapVisualizer';
import { Badge } from '../common/Badge';

export const RealTimeTracking = () => {
  const { activeOrderId, orders, bus, setActiveCustomerTab } = useApp();
  const currentOrder = orders.find(o => o.id === activeOrderId) || orders[0];
  const [showItemsBreakdown, setShowItemsBreakdown] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] p-3.5 sm:p-6 pb-36 font-sans">
      <div className="max-w-xl sm:max-w-3xl mx-auto space-y-4 sm:space-y-5">
        
        {/* Header Hero Banner (Matching App theme with high-contrast live ETA) */}
        <div className="bg-gradient-to-br from-[#0B1F5E] via-[#102A72] to-[#162F7A] text-white p-4 sm:p-6 rounded-3xl shadow-card relative overflow-hidden border border-blue-400/20">
          <div className="relative z-10 space-y-3 sm:space-y-4">
            
            {/* Top row: Back button, Title, Status badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveCustomerTab('menu')}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition active:scale-95 flex-shrink-0"
                  aria-label="Back to menu"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <span className="text-[10px] text-blue-200 uppercase font-extrabold tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" /> Live Transit Telematics
                  </span>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight">
                    Order Tracking
                  </h2>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>{currentOrder.orderStatus}</span>
                </span>
              </div>
            </div>

            {/* Order details summary line */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-blue-200">
                <span>Order <strong className="text-white font-mono">#{currentOrder.id}</strong></span>
                <span>•</span>
                <span>Seat <strong className="text-amber-300 font-bold">{currentOrder.seatNumber}</strong></span>
              </div>

              {/* Live ETA Badge */}
              <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-extrabold border border-emerald-400/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>ETA {currentOrder.etaMinutes} mins to seat</span>
              </div>
            </div>

          </div>
        </div>

        {/* Live Telematics GPS Map Card */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-slate-200 dark:border-white/10">
          <MapVisualizer height="h-[280px] sm:h-[340px]" />
        </div>

        {/* Live Order Status Step Timeline */}
        <div className="bg-white dark:bg-[#0A1738] p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
            <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1F5E] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Live Order Status Timeline</span>
            </h3>
            <span className="text-[10px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded-full font-bold">
              Real-time Sync
            </span>
          </div>

          <StatusTimeline currentStatus={currentOrder.orderStatus} />
        </div>

        {/* Driver & Restaurant Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Driver Info Card */}
          <div className="bg-white dark:bg-[#0A1738] p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Assigned Transit Runner</span>
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-emerald-300/40">
                Verified Runner
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center font-extrabold text-base shadow-subtle flex-shrink-0">
                <Bike className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white truncate">
                  {currentOrder.driverName}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {currentOrder.driverStatus}
                </p>
              </div>
            </div>

            <a
              href={`tel:${currentOrder.driverPhone}`}
              className="w-full py-2.5 bg-[#0B1F5E] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 active:scale-95 shadow-subtle"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>Call Delivery Runner</span>
            </a>
          </div>

          {/* Restaurant Info Card */}
          <div className="bg-white dark:bg-[#0A1738] p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gourmet Transit Kitchen</span>
              <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                FSSAI Certified
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-extrabold text-base shadow-subtle flex-shrink-0">
                <ChefHat className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white truncate">
                  {currentOrder.restaurantName}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {currentOrder.deliveryPoint}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowItemsBreakdown(!showItemsBreakdown)}
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>View Order Items ({currentOrder.items.length})</span>
              </span>
              <span className="flex items-center gap-1 font-extrabold text-[#0B1F5E] dark:text-white">
                ₹{currentOrder.totalAmount.toFixed(2)}
                {showItemsBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </span>
            </button>
          </div>

        </div>

        {/* Expandable Order Items List */}
        {showItemsBreakdown && (
          <div className="bg-white dark:bg-[#0A1738] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-3 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-xs font-extrabold text-[#0B1F5E] dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-white/5 pb-2">
              Order Items Summary
            </h4>

            <div className="space-y-2">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 dark:border-white/5 last:border-none">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center text-[10px]">
                      {item.quantity}x
                    </span>
                    <div>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">{item.name}</span>
                      {item.addOns && item.addOns.length > 0 && (
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 block">+ {item.addOns.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
