import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Receipt } from 'lucide-react';

export const OrderItemSummary = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const items = order?.items || [
    { name: 'Special Hyderabadi Dum Biryani', quantity: 1, price: 220, addOns: ['Extra Salan'] },
    { name: 'Cold Coffee Brew', quantity: 1, price: 120, addOns: [] },
  ];

  const subtotal = order?.subtotal || items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const tax = order?.tax || subtotal * 0.05;
  const total = order?.totalAmount || subtotal + tax + 20;

  return (
    <div className="bg-white dark:bg-[#0A1738] rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-subtle space-y-3">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-white/5 pb-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Receipt className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          YOUR ORDER ({items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'})
        </span>
        <span className="font-extrabold text-[#0F172A] dark:text-white text-xs font-mono">
          ₹{total.toFixed(2)}
        </span>
      </div>

      {/* Primary Summary Bar & Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center justify-between cursor-pointer"
      >
        <span className="truncate text-left font-semibold">
          {items.map(i => `${i.quantity}x ${i.name}`).join(' • ')}
        </span>
        <span className="flex items-center gap-1 text-[#2563EB] dark:text-blue-400 text-[11px] font-extrabold flex-shrink-0 ml-2">
          <span>{isOpen ? 'Hide' : 'View Details'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </button>

      {/* Expanded Order Breakdown */}
      {isOpen && (
        <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-white/5 text-xs animate-in fade-in slide-in-from-top-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-white/5 last:border-none">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-[#2563EB] dark:text-blue-300 font-bold flex items-center justify-center text-[10px]">
                  {item.quantity}×
                </span>
                <div>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{item.name}</span>
                  {item.addOns && item.addOns.length > 0 && (
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 block">+ {item.addOns.join(', ')}</span>
                  )}
                </div>
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">₹{item.price * item.quantity}</span>
            </div>
          ))}

          {/* Pricing Totals Footer */}
          <div className="pt-2 space-y-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Transit Delivery</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">₹{(tax + 20).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs font-black text-[#0F172A] dark:text-white pt-1 border-t border-slate-200 dark:border-white/10">
              <span>Total Paid</span>
              <span className="font-mono text-[#2563EB] dark:text-blue-400">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
