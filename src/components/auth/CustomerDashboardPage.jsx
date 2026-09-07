import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, 
  Clock, 
  Utensils, 
  ShoppingBag, 
  Navigation, 
  User, 
  Sparkles, 
  ChevronRight, 
  Star, 
  Flame, 
  ChefHat, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getGreetingByTime, getDynamicMealPeriod } from '../../services/authService';

export const CustomerDashboardPage = () => {
  const navigate = useNavigate();
  const { 
    journeyContext, 
    foodItems, 
    restaurantsList, 
    cart, 
    setActiveCustomerTab, 
    customerUser,
    orders,
    switchRole
  } = useApp();

  useEffect(() => {
    switchRole('customer');
  }, []);

  const greeting = getGreetingByTime();
  const mealPeriod = getDynamicMealPeriod();
  const userName = customerUser?.name?.split(' ')[0] || "Traveler";
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const activeOrder = orders[0];

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] text-[#0F172A] dark:text-slate-100 font-sans pb-28">
      
      {/* Top Mobile Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1F5E] via-[#102A72] to-[#162F7A] text-white pt-5 pb-8 px-4 sm:px-6 rounded-b-3xl shadow-card relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          
          {/* Top greeting bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-blue-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Transit Dining Ecosystem
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {greeting}, {userName} 👋
              </h1>
              <p className="text-xs text-blue-200 mt-0.5">Welcome to your in-journey food control dashboard.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 text-right flex-shrink-0">
              <span className="text-[9px] text-blue-200 uppercase font-bold block">Your Seat</span>
              <span className="text-base sm:text-lg font-extrabold text-amber-300">Seat {journeyContext.seatNumber || '14B'}</span>
            </div>
          </div>

          {/* YOUR JOURNEY Context Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-blue-200 uppercase font-bold flex items-center gap-1">
                <Bus className="w-3.5 h-3.5 text-blue-300" /> YOUR JOURNEY
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold text-[10px] border border-emerald-400/30">
                STATUS: ON JOURNEY
              </span>
            </div>

            <div className="flex items-center justify-between text-sm sm:text-base font-extrabold text-white">
              <span>{journeyContext.origin || 'Visakhapatnam'}</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
              <span>{journeyContext.destination || 'Hyderabad'}</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-blue-200 pt-1 border-t border-white/10">
              <span>Bus: <strong className="text-white">{journeyContext.busNumber || 'QD-AP-1024'}</strong></span>
              <span>ETA to Stop: <strong className="text-emerald-300 font-bold">{journeyContext.etaMinutes || 42} mins</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Dashboard Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 relative z-20 space-y-6">
        
        {/* Dynamic Meal Period Banner (Changes automatically according to system time) */}
        <div className="bg-white dark:bg-[#0A1738] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-[#2563EB] dark:text-blue-300 px-2.5 py-0.5 rounded-md font-extrabold text-[10px] uppercase">
                AVAILABLE NOW
              </span>
              <span className="text-xs text-slate-400 font-bold">({mealPeriod.timeSlot})</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#0B1F5E] dark:text-white">
              {mealPeriod.label}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mealPeriod.banner}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveCustomerTab('menu');
              navigate('/customer/menu');
            }}
            className="px-5 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-glow transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Order Food</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Track Active Order Callout (If active order exists) */}
        {activeOrder && (
          <div className="bg-gradient-to-r from-blue-900 to-[#0B1F5E] text-white p-4 rounded-2xl shadow-card border border-blue-400/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-blue-200 uppercase font-bold block">Active Order #{activeOrder.id}</span>
                <span className="font-extrabold text-white text-sm">Status: {activeOrder.orderStatus} • ETA {activeOrder.etaMinutes}m</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveCustomerTab('tracking');
                navigate('/customer/menu');
              }}
              className="px-4 py-2 bg-white text-[#0B1F5E] font-bold text-xs rounded-xl shadow hover:bg-blue-50 transition"
            >
              Track Live
            </button>
          </div>
        )}

        {/* Available Plazas & Restaurants Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-[#2563EB]" />
              <span>Available Express Plazas on Route</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">({restaurantsList.length} verified)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurantsList.map(rest => (
              <div
                key={rest.id}
                onClick={() => {
                  setActiveCustomerTab('menu');
                  navigate('/customer/menu');
                }}
                className="bg-white dark:bg-[#0A1738] p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-subtle hover:shadow-card transition duration-200 cursor-pointer space-y-2 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white group-hover:text-[#2563EB] transition">
                      {rest.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{rest.location}</p>
                  </div>
                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-black text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {rest.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
                  <span className="text-slate-500">{rest.category}</span>
                  <span className="text-[#2563EB] font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                    View Menu <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular on Your Route Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Popular Meals on Visakhapatnam Route</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {foodItems.slice(0, 3).map(food => (
              <div
                key={food.id}
                onClick={() => {
                  setActiveCustomerTab('menu');
                  navigate('/customer/menu');
                }}
                className="bg-white dark:bg-[#0A1738] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-subtle hover:shadow-card transition duration-200 cursor-pointer group"
              >
                <div className="h-28 bg-slate-100 relative overflow-hidden">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Prep: {food.prepTimeMins}m
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-extrabold text-[#0B1F5E] dark:text-white line-clamp-1 group-hover:text-[#2563EB]">
                    {food.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-extrabold text-slate-900 dark:text-white">₹{food.price}</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      100% Seat Delivery
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Unified Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto rounded-t-3xl shadow-floating border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0A1738]/95 backdrop-blur-md py-2 px-2 flex items-center justify-around">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center gap-0.5 text-[#2563EB] font-extrabold text-[10px] px-3 py-1"
        >
          <Utensils className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveCustomerTab('menu');
            navigate('/customer/menu');
          }}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#2563EB] text-[10px] px-3 py-1"
        >
          <ChefHat className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => {
            setActiveCustomerTab('cart');
            navigate('/customer/menu');
          }}
          className="relative flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#2563EB] text-[10px] px-3 py-1"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 bg-emerald-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span>Cart</span>
        </button>

        <button
          onClick={() => {
            setActiveCustomerTab('tracking');
            navigate('/customer/menu');
          }}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#2563EB] text-[10px] px-3 py-1"
        >
          <Navigation className="w-4 h-4" />
          <span>Tracking</span>
        </button>

        <button
          onClick={() => {
            setActiveCustomerTab('profile');
            navigate('/customer/profile');
          }}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#2563EB] text-[10px] px-3 py-1"
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>

    </div>
  );
};
