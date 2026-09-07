import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle, 
  Wallet, 
  Phone, 
  Award, 
  Bus, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MapVisualizer } from '../common/MapVisualizer';
import { Badge } from '../common/Badge';

export const DriverApp = () => {
  const { driversList, orders, updateOrderStatus, bus, showToast, switchRole } = useApp();

  useEffect(() => {
    switchRole('driver');
  }, []);
  const driver = driversList[0]; // K. Ramesh

  const [isOnline, setIsOnline] = useState(driver.status === 'ONLINE');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'map' | 'wallet'

  const driverOrders = orders.filter(o => ['READY', 'PICKED_UP', 'ON_THE_WAY'].includes(o.orderStatus));

  const toggleStatus = () => {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    showToast(`Driver status set to ${nextStatus ? 'ONLINE (Ready for Pickups)' : 'OFFLINE'}`, nextStatus ? 'success' : 'warning');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] pb-24">
      
      {/* Mobile-first Header Bar */}
      <div className="bg-[#0B1F5E] text-white p-5 rounded-b-3xl shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 border border-white/20 flex items-center justify-center font-extrabold text-lg shadow-subtle">
              KR
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-300">Transit Delivery Runner</span>
              <h2 className="text-lg font-extrabold text-white">{driver.name}</h2>
              <span className="text-xs text-blue-200">{driver.vehicleType}</span>
            </div>
          </div>

          {/* ONLINE / OFFLINE Toggle Switch */}
          <button
            onClick={toggleStatus}
            className={`px-4 py-2 rounded-2xl font-extrabold text-xs flex items-center gap-2 border transition ${
              isOnline 
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-glow' 
                : 'bg-slate-700 text-slate-300 border-slate-600'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-white animate-ping' : 'bg-slate-400'}`}></span>
            <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>
        </div>

        {/* Assigned Bus Details */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bus className="w-4 h-4 text-amber-400" />
            <div>
              <span className="font-extrabold text-white block">{driver.busAssigned}</span>
              <span className="text-[10px] text-blue-200">Current Stop: {driver.assignedStop}</span>
            </div>
          </div>
          <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-1 rounded-lg border border-blue-400/30">
            {driverOrders.length} Pickups
          </span>
        </div>
      </div>

      {/* Driver View Container */}
      <div className="max-w-xl mx-auto px-4 mt-6 space-y-6">

        {/* View Switcher Tabs */}
        <div className="bg-white dark:bg-[#0A1738] p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-subtle flex items-center justify-between text-xs font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2.5 rounded-xl transition ${
              activeTab === 'orders' ? 'bg-[#0B1F5E] text-white shadow-subtle' : 'text-slate-500'
            }`}
          >
            Assigned Orders ({driverOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-2.5 rounded-xl transition ${
              activeTab === 'map' ? 'bg-[#0B1F5E] text-white shadow-subtle' : 'text-slate-500'
            }`}
          >
            GPS Transit Route
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 py-2.5 rounded-xl transition ${
              activeTab === 'wallet' ? 'bg-[#0B1F5E] text-white shadow-subtle' : 'text-slate-500'
            }`}
          >
            Earnings & Bonus
          </button>
        </div>

        {/* TAB 1: ASSIGNED ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white uppercase tracking-wider">
              Transit Pickups & Delivery Queue
            </h3>

            {driverOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#0A1738] p-8 rounded-3xl text-center border border-slate-200 dark:border-white/10">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-base font-extrabold text-slate-800 dark:text-white">All Pickups Clear!</h4>
                <p className="text-xs text-slate-500">No pending orders awaiting runner pickup right now.</p>
              </div>
            ) : (
              driverOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                    <div>
                      <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">Order #{order.id}</span>
                      <span className="text-[10px] text-slate-400 block">{order.restaurantName}</span>
                    </div>
                    <Badge status={order.orderStatus} />
                  </div>

                  {/* Delivery Location Specs */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
                      <span className="text-slate-400 text-[10px] font-bold block uppercase">Passenger</span>
                      <span className="font-extrabold text-slate-800 dark:text-white block mt-0.5">{order.passengerName}</span>
                      <span className="text-amber-500 font-extrabold text-sm block">Seat {order.seatNumber}</span>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
                      <span className="text-slate-400 text-[10px] font-bold block uppercase">Pickup & Delivery</span>
                      <span className="font-bold text-slate-800 dark:text-white block mt-0.5">{order.deliveryPoint}</span>
                      <span className="text-emerald-500 font-bold">ETA {order.etaMinutes} mins</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl">
                    <span className="font-bold block mb-1">Items to deliver:</span>
                    {order.items.map((it, idx) => (
                      <span key={idx} className="block">• {it.quantity}x {it.name}</span>
                    ))}
                  </div>

                  {/* Runner Action Triggers */}
                  <div className="pt-2">
                    {order.orderStatus === 'READY' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'PICKED_UP')}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl shadow-subtle transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirm Pickup from Kitchen</span>
                      </button>
                    )}

                    {order.orderStatus === 'PICKED_UP' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ON_THE_WAY')}
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-subtle transition flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Start Seat Delivery Walk</span>
                      </button>
                    )}

                    {order.orderStatus === 'ON_THE_WAY' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-glow transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Handed to Passenger Seat {order.seatNumber}</span>
                      </button>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: GPS ROUTE MAP */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white uppercase tracking-wider">
              Live GPS Transit Telematics
            </h3>
            <MapVisualizer height="h-96" />
          </div>
        )}

        {/* TAB 3: WALLET & INCENTIVE PROGRESS */}
        {activeTab === 'wallet' && (
          <div className="space-y-4">
            
            <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Today's Earnings</span>
              <h3 className="text-4xl font-extrabold text-[#0B1F5E] dark:text-white">₹{driver.todayEarnings}</h3>

              {/* Incentive Bonus Gauge */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-amber-500">
                    <Award className="w-4 h-4" /> Daily Bonus Target
                  </span>
                  <span className="text-slate-800 dark:text-white">₹1,250 / ₹1,500</span>
                </div>

                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" style={{ width: `${driver.incentiveBonusProgress}%` }}></div>
                </div>

                <p className="text-[11px] text-slate-500">Complete 2 more transit deliveries today to earn ₹250 instant bonus!</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
