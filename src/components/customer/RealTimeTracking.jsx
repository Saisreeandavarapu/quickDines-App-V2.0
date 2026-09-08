import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatusHero } from './tracking/OrderStatusHero';
import { LiveMap } from './tracking/LiveMap';
import { JourneySummaryCard } from './tracking/JourneySummaryCard';
import { OrderProgressTimeline } from './tracking/OrderProgressTimeline';
import { OrderItemSummary } from './tracking/OrderItemSummary';
import { RunnerCard } from './tracking/RunnerCard';
import { SupportCard } from './tracking/SupportCard';

export const RealTimeTracking = () => {
  const { activeOrderId, orders, bus, journeyContext, setActiveCustomerTab, showToast } = useApp();
  const currentOrder = orders?.find(o => o.id === activeOrderId) || orders?.[0] || {};

  const status = currentOrder?.orderStatus || 'PREPARING';
  const orderId = currentOrder?.id || 'QD102948';
  const seatNumber = currentOrder?.seatNumber || bus?.seatNumber || '14B';

  const statusBadgeStyle = {
    PLACED: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    ACCEPTED: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
    PREPARING: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    READY: 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    ON_THE_WAY: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    DELIVERED: 'bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    CANCELLED: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
  }[status] || 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] font-sans selection:bg-[#2563EB] selection:text-white p-3 sm:p-6 pb-36 sm:pb-28">
      <div className="max-w-7xl mx-auto space-y-3.5 sm:space-y-4">

        {/* 1. COMPACT UNCLIPPED TOP TRACKING BAR */}
        <div className="bg-white dark:bg-[#0A1738] rounded-2xl p-3 border border-slate-200/80 dark:border-white/10 shadow-subtle flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setActiveCustomerTab('menu')}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center border border-slate-200 dark:border-white/10 transition active:scale-95 flex-shrink-0 cursor-pointer"
              title="Back to Menu"
              aria-label="Back to Menu"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="text-xs sm:text-sm font-black text-[#0F172A] dark:text-white font-mono">
                #{orderId}
              </span>
              <span className="bg-blue-50 dark:bg-blue-900/40 text-[#2563EB] dark:text-blue-300 px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-blue-200 dark:border-blue-800/40">
                Seat {seatNumber}
              </span>
            </div>
          </div>

          {/* Dynamic Status Pill */}
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider border flex items-center gap-1.5 flex-shrink-0 ${statusBadgeStyle}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {status.replace('_', ' ')}
          </span>
        </div>

        {/* 
          RESPONSIVE LAYOUT ENGINE:
          - Mobile (< 1024px): 1-Column Sequential Flow
          - Desktop (>= 1024px): 2-Column Split View (Left: Live Map & Journey Summary, Right: Status Hero & Progress Timeline)
        */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start space-y-3.5 lg:space-y-0">
          
          {/* LEFT COLUMN (Desktop: Live Journey Map Centerpiece) */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {/* MOBILE ONLY: Status Hero comes first */}
            <div className="block lg:hidden">
              <OrderStatusHero order={currentOrder} bus={bus} />
            </div>

            {/* 3. LIVE JOURNEY MAP — PRIMARY CENTERPIECE */}
            <LiveMap height="h-[300px] sm:h-[360px] md:h-[400px] lg:h-[540px]" />

            {/* DESKTOP ONLY: Journey Context beneath Map */}
            <div className="hidden lg:block">
              <JourneySummaryCard journey={journeyContext} bus={bus} order={currentOrder} />
            </div>

          </div>

          {/* RIGHT COLUMN (Desktop: Status Hero, Timeline, Runner, Items, Support) */}
          <div className="lg:col-span-5 space-y-3.5">
            
            {/* DESKTOP ONLY: Order Status Hero at top right */}
            <div className="hidden lg:block">
              <OrderStatusHero order={currentOrder} bus={bus} />
            </div>

            {/* MOBILE ONLY: Journey Context */}
            <div className="block lg:hidden">
              <JourneySummaryCard journey={journeyContext} bus={bus} order={currentOrder} />
            </div>

            {/* 6. ORDER PROGRESS TIMELINE */}
            <OrderProgressTimeline currentStatus={currentOrder?.orderStatus || 'PREPARING'} />

            {/* 7. DELIVERY RUNNER (Only shown when runner assigned) */}
            {(currentOrder?.driverName || currentOrder?.orderStatus !== 'CANCELLED') && (
              <RunnerCard order={currentOrder} showToast={showToast} />
            )}

            {/* 8. RESTAURANT & ORDER SUMMARY */}
            <OrderItemSummary order={currentOrder} />

            {/* 9. SUPPORT ACTIONS */}
            <SupportCard />

          </div>

        </div>

      </div>
    </div>
  );
};
