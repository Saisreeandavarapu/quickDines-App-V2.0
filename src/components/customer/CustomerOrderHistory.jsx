import React from 'react';
import { ShoppingBag, ArrowRight, Download, RefreshCw, Clock, Bus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const CustomerOrderHistory = () => {
  const { orders, setActiveOrderId, setActiveCustomerTab, addToCart, foodItems, showToast } = useApp();

  const handleReorder = (order) => {
    order.items.forEach(item => {
      const match = foodItems.find(f => f.name === item.name) || foodItems[0];
      addToCart(match, item.quantity, item.addOns || []);
    });
    setActiveCustomerTab('cart');
    showToast('Items added back to cart for reorder', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] p-4 sm:p-6 pb-28">
      <div className="max-w-3xl mx-auto space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle">
          <div>
            <h2 className="text-xl font-extrabold text-[#0B1F5E] dark:text-white">Customer Order History</h2>
            <p className="text-xs text-slate-500">Your recent QuickDines transit food orders</p>
          </div>
          <button
            onClick={() => setActiveCustomerTab('menu')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-subtle transition active:scale-95"
          >
            Order New Meal
          </button>
        </div>

        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white dark:bg-[#0A1738] p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#0B1F5E] dark:text-white">#{order.id}</span>
                    <Badge status={order.orderStatus} />
                  </div>
                  <span className="text-xs text-slate-500 font-medium block mt-0.5">
                    {order.orderTime} • {order.restaurantName}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-base font-extrabold text-[#0B1F5E] dark:text-white block">₹{order.totalAmount.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{order.paymentMethod}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1 text-xs">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-bold">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Bus & Seat Info (Clean stacked box) */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                  <Bus className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" /> Bus {order.busNumber} (Seat {order.seatNumber})
                </span>
                <span className="truncate">Delivery: {order.deliveryPoint}</span>
              </div>

              {/* Responsive Action Buttons (No clipping, flex rows) */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                {order.orderStatus !== 'DELIVERED' && (
                  <button
                    onClick={() => {
                      setActiveOrderId(order.id);
                      setActiveCustomerTab('tracking');
                    }}
                    className="flex-1 min-w-[120px] py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-subtle transition flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Track Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => handleReorder(order)}
                  className="flex-1 min-w-[100px] py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reorder</span>
                </button>

                <button
                  onClick={() => showToast(`Receipt #${order.id}.pdf downloaded`, 'success')}
                  className="flex-1 min-w-[100px] py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Receipt</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
