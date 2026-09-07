import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Utensils, 
  Clock, 
  TrendingUp, 
  Wallet, 
  CheckCircle, 
  XCircle, 
  Play, 
  PackageCheck, 
  ChefHat, 
  DollarSign, 
  Filter, 
  ToggleLeft, 
  ToggleRight,
  ArrowUpRight,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';

export const RestaurantPanel = () => {
  const { 
    orders, 
    updateOrderStatus, 
    foodItems, 
    toggleFoodAvailability, 
    restaurantsList, 
    showToast,
    switchRole
  } = useApp();

  useEffect(() => {
    switchRole('restaurant');
  }, []);

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'menu' | 'analytics' | 'wallet'
  const restaurant = restaurantsList[0]; // Annapurna Highway Gourmet

  // Kanban status columns
  const columns = [
    { id: 'PLACED', title: 'NEW ORDERS', color: 'border-blue-500 bg-blue-500/5' },
    { id: 'ACCEPTED', title: 'ACCEPTED', color: 'border-sky-500 bg-sky-500/5' },
    { id: 'PREPARING', title: 'KITCHEN PREPARING', color: 'border-amber-500 bg-amber-500/5' },
    { id: 'READY', title: 'READY FOR RUNNER', color: 'border-emerald-500 bg-emerald-500/5' },
    { id: 'PICKED_UP', title: 'HANDED TO RUNNER', color: 'border-purple-500 bg-purple-500/5' },
  ];

  const navItems = [
    { id: 'orders', label: 'Live Orders Kanban', icon: Utensils, badge: orders.filter(o => o.orderStatus !== 'DELIVERED').length },
    { id: 'menu', label: 'Menu & Time Slots', icon: ChefHat },
    { id: 'analytics', label: 'Revenue Analytics', icon: TrendingUp },
    { id: 'wallet', label: 'Wallet & Payouts', icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] flex flex-col md:flex-row">
      
      {/* Sidebar (Desktop & Mobile Tabs) */}
      <Sidebar
        title="Restaurant Control"
        navItems={navItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
        
        {/* Restaurant Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0A1738] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-blue-600 dark:text-blue-400">
              Kitchen Operations Panel
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1F5E] dark:text-white mt-0.5">
              Good morning, {restaurant.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              FSSAI Lic: #{restaurant.fssaiLicense} • {restaurant.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Kitchen Accepting Orders
            </span>
          </div>
        </div>

        {/* Executive Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Today's Orders" value={restaurant.todayOrdersCount} change="+14.2%" trend="up" icon={Utensils} description="Target: 150 orders/day" />
          <StatCard title="Pending Kitchen" value={orders.filter(o => ['PLACED', 'ACCEPTED', 'PREPARING'].includes(o.orderStatus)).length} change="-2 pending" trend="up" icon={Clock} description="Avg prep time: 12 min" />
          <StatCard title="Ready For Delivery" value={orders.filter(o => o.orderStatus === 'READY').length} change="Live" trend="up" icon={PackageCheck} description="Dispatch runner waiting" />
          <StatCard title="Today's Gross Revenue" value={`₹${restaurant.todayRevenue.toLocaleString()}`} change="+22.8%" trend="up" icon={DollarSign} description="Payout date: Tomorrow" />
        </div>

        {/* TAB 1: LIVE ORDERS KANBAN */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-[#0B1F5E] dark:text-white">
                Real-Time Kanban Order Dispatch Board
              </h3>
              <span className="text-xs text-slate-500 font-semibold">Click order buttons to advance status</span>
            </div>

            {/* Kanban Columns (Horizontal scroll on small screens) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
              {columns.map(col => {
                const colOrders = orders.filter(o => o.orderStatus === col.id);
                return (
                  <div key={col.id} className={`rounded-2xl border-2 p-3 ${col.color} min-h-[360px] flex flex-col space-y-3`}>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                      <h4 className="text-xs font-extrabold text-[#0B1F5E] dark:text-white tracking-wider">{col.title}</h4>
                      <span className="w-5 h-5 rounded-full bg-[#0B1F5E] text-white text-[10px] font-bold flex items-center justify-center">
                        {colOrders.length}
                      </span>
                    </div>

                    {colOrders.length === 0 ? (
                      <div className="my-auto text-center p-4">
                        <p className="text-[11px] text-slate-400 font-medium">No orders in {col.title.toLowerCase()}</p>
                      </div>
                    ) : (
                      colOrders.map(ord => (
                        <div
                          key={ord.id}
                          className="bg-white dark:bg-[#0A1738] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-2.5 hover:shadow-card transition"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">#{ord.id}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{ord.orderTime}</span>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl text-[11px]">
                            <div className="font-bold text-slate-800 dark:text-slate-200">Bus {ord.busNumber}</div>
                            <div className="text-slate-500">Seat <strong className="text-amber-500">{ord.seatNumber}</strong> • ETA {ord.etaMinutes}m</div>
                          </div>

                          <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between font-medium">
                                <span>{it.quantity}x {it.name}</span>
                                <span className="font-bold">₹{it.price}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs font-extrabold pt-2 border-t border-slate-100 dark:border-white/5">
                            <span>Total Amount</span>
                            <span className="text-[#0B1F5E] dark:text-white">₹{ord.totalAmount.toFixed(2)}</span>
                          </div>

                          {/* Interactive Order Action Triggers */}
                          <div className="pt-2">
                            {ord.orderStatus === 'PLACED' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'ACCEPTED')}
                                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-subtle transition flex items-center justify-center gap-1 active:scale-95"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Accept Order
                              </button>
                            )}

                            {ord.orderStatus === 'ACCEPTED' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'PREPARING')}
                                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-subtle transition flex items-center justify-center gap-1 active:scale-95"
                              >
                                <Play className="w-3.5 h-3.5" /> Start Preparing
                              </button>
                            )}

                            {ord.orderStatus === 'PREPARING' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'READY')}
                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-subtle transition flex items-center justify-center gap-1 active:scale-95"
                              >
                                <PackageCheck className="w-3.5 h-3.5" /> Mark Meal Ready
                              </button>
                            )}

                            {ord.orderStatus === 'READY' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'PICKED_UP')}
                                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-subtle transition flex items-center justify-center gap-1 active:scale-95"
                              >
                                <Send className="w-3.5 h-3.5" /> Hand to Runner
                              </button>
                            )}

                            {ord.orderStatus === 'PICKED_UP' && (
                              <div className="text-[11px] text-center font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 py-1 rounded-xl">
                                Runner En Route
                              </div>
                            )}
                          </div>

                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: MENU & TIME-BASED AVAILABILITY */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            
            {/* Time Slot Availability Settings */}
            <div className="bg-white dark:bg-[#0A1738] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
              <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
                Time-Based Menu Slot Availability
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-800 dark:text-white">Morning Breakfast</span>
                    <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">06:00 AM – 11:00 AM</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Slot Inactive</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-800 dark:text-white">Mid-day Transit Snacks</span>
                    <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">11:00 AM – 05:00 PM</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Slot Inactive</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-900 dark:text-emerald-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs">Highway Executive Dinner</span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <span className="text-[11px] opacity-80 block">05:00 PM – 11:00 PM</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Active Peak Dinner Slot</span>
                </div>
              </div>
            </div>

            {/* Responsive Menu Items (Desktop Table + Mobile Cards) */}
            <div className="bg-white dark:bg-[#0A1738] rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle p-5 sm:p-6 space-y-4">
              <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
                Item Stock & Instant Availability Toggle
              </h3>

              {/* Desktop Table View (hidden on mobile) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-white/10">
                    <tr>
                      <th className="p-3">Item Details</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Prep Time</th>
                      <th className="p-3">Stock Status</th>
                      <th className="p-3 text-right">Action Toggle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {foodItems.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                        <td className="p-3 flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <span className="font-extrabold text-[#0B1F5E] dark:text-white block">{item.name}</span>
                            <span className="text-[10px] text-slate-400">{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 capitalize">{item.category}</td>
                        <td className="p-3 font-extrabold text-[#0B1F5E] dark:text-white">₹{item.price}</td>
                        <td className="p-3 text-slate-500">{item.prepTimeMins} mins</td>
                        <td className="p-3">
                          <Badge status={item.available ? 'ONLINE' : 'OFFLINE'} text={item.available ? 'In Stock' : 'Out of Stock'} />
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => toggleFoodAvailability(item.id)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                              item.available 
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300' 
                                : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-300'
                            }`}
                          >
                            {item.available ? 'Set Out of Stock' : 'Enable Stock'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View (visible on mobile < md) */}
              <div className="md:hidden space-y-3">
                {foodItems.map(item => (
                  <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <span className="font-extrabold text-[#0B1F5E] dark:text-white text-xs block">{item.name}</span>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                          <span>₹{item.price} • {item.category}</span>
                          <Badge status={item.available ? 'ONLINE' : 'OFFLINE'} text={item.available ? 'In Stock' : 'Out of Stock'} />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFoodAvailability(item.id)}
                      className={`w-full py-2 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1 active:scale-95 ${
                        item.available 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300' 
                          : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-300'
                      }`}
                    >
                      {item.available ? 'Set Out of Stock' : 'Enable Stock'}
                    </button>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: REVENUE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-white dark:bg-[#0A1738] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-6">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
              Revenue & Order Volume Performance
            </h3>

            {/* Custom SVG Revenue Growth Bar Chart */}
            <div className="h-64 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200 dark:border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Peak Transit Hours Revenue Spike</span>
                <span className="text-emerald-500 font-bold">Highest Demand: 06 PM – 09 PM</span>
              </div>

              <div className="flex items-end justify-between gap-2 sm:gap-4 h-44 px-2 sm:px-4 pt-4 border-b border-slate-200 dark:border-white/10">
                {[
                  { hour: '06 AM', val: 20 },
                  { hour: '09 AM', val: 55 },
                  { hour: '12 PM', val: 75 },
                  { hour: '03 PM', val: 40 },
                  { hour: '06 PM', val: 95 },
                  { hour: '09 PM', val: 90 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div 
                      className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-xl group-hover:from-blue-500 group-hover:to-emerald-400 transition"
                      style={{ height: `${bar.val}%` }}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-400">{bar.hour}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WALLET & SETTLEMENT */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle">
                <span className="text-xs font-bold text-slate-400 uppercase">Available Wallet Balance</span>
                <h3 className="text-3xl font-extrabold text-[#0B1F5E] dark:text-white mt-1">₹48,920.00</h3>
                <button 
                  onClick={() => showToast('Payout request sent to Super Admin for approval', 'success')}
                  className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-subtle transition active:scale-95"
                >
                  Request Instant Bank Payout
                </button>
              </div>

              <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle">
                <span className="text-xs font-bold text-slate-400 uppercase">Pending Settlement</span>
                <h3 className="text-3xl font-extrabold text-amber-500 mt-1">₹12,450.00</h3>
                <p className="text-xs text-slate-500 mt-2">Clearing in 24 hours via Razorpay Payouts</p>
              </div>

              <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Lifetime Earnings</span>
                <h3 className="text-3xl font-extrabold text-emerald-500 mt-1">₹6,84,200.00</h3>
                <p className="text-xs text-slate-500 mt-2">Platform commission: 12% auto-deducted</p>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
