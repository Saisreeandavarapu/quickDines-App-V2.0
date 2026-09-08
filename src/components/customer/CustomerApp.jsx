import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QRLandingPage } from './QRLandingPage';
import { CustomerHome } from './CustomerHome';
import { FoodDetailModal } from './FoodDetailModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutPage } from './CheckoutPage';
import { OrderConfirmation } from './OrderConfirmation';
import { RealTimeTracking } from './RealTimeTracking';
import { CustomerOrderHistory } from './CustomerOrderHistory';
import { Utensils, ShoppingBag, Navigation, Clock, QrCode, User, ArrowRight } from 'lucide-react';
import { CustomerProfile } from './CustomerProfile';

export const CustomerApp = () => {
  const { activeCustomerTab, setActiveCustomerTab, cart } = useApp();
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  const handleTabChange = (tab) => {
    setActiveCustomerTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.itemTotal, 0);

  if (activeCustomerTab === 'landing') {
    return <QRLandingPage />;
  }

  return (
    <div className="relative min-h-screen bg-[#F7F9FC] dark:bg-[#071535]">
      
      {/* Active Screen View */}
      {activeCustomerTab === 'menu' && (
        <CustomerHome onSelectFoodItem={(food) => setSelectedFoodItem(food)} />
      )}

      {activeCustomerTab === 'cart' && <CartDrawer />}
      {activeCustomerTab === 'checkout' && <CheckoutPage />}
      {activeCustomerTab === 'confirmation' && <OrderConfirmation />}
      {activeCustomerTab === 'tracking' && <RealTimeTracking />}
      {activeCustomerTab === 'history' && <CustomerOrderHistory />}
      {activeCustomerTab === 'profile' && <CustomerProfile />}

      {/* Modal for Food Details */}
      {selectedFoodItem && (
        <FoodDetailModal
          foodItem={selectedFoodItem}
          onClose={() => setSelectedFoodItem(null)}
        />
      )}

      {/* 1. DESKTOP FLOATING CART TOAST (Desktop Only: hidden md:block) */}
      {cartCount > 0 && activeCustomerTab === 'menu' && (
        <div className="hidden md:block fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4">
          <button
            onClick={() => handleTabChange('cart')}
            className="bg-[#0B1F5E] hover:bg-[#102A72] text-white p-4 rounded-2xl shadow-floating border border-blue-400/40 flex items-center gap-4 transition group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-subtle flex-shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="text-left leading-tight">
              <span className="text-[10px] text-blue-200 font-extrabold block uppercase tracking-wide">{cartCount} ITEM{cartCount > 1 ? 'S' : ''} SELECTED</span>
              <span className="text-base font-extrabold text-white">₹{cartSubtotal} <span className="text-xs font-normal text-slate-300">+ taxes</span></span>
            </div>
            <div className="flex items-center gap-1 text-xs font-extrabold text-blue-300 group-hover:text-white pl-2">
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4 text-blue-300" />
            </div>
          </button>
        </div>
      )}

      {/* 2. UNIFIED MOBILE BOTTOM DOCK (Mobile Only: md:hidden) */}
      {/* Combines Cart Bar + Bottom Navigation into ONE clean stacked container */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto rounded-t-3xl shadow-floating border-t border-slate-200 dark:border-white/10 overflow-hidden bg-white/95 dark:bg-[#0A1738]/95 backdrop-blur-md">
        
        {/* Top Strip: Deep Navy Cart Action Bar (Shown when items in cart & on menu tab) */}
        {cartCount > 0 && activeCustomerTab === 'menu' && (
          <button
            onClick={() => handleTabChange('cart')}
            className="w-full bg-[#0B1F5E] hover:bg-[#102A72] text-white px-4 py-3 border-b border-blue-400/20 flex items-center justify-between transition group active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-subtle flex-shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] text-blue-200 font-bold block uppercase tracking-wide">{cartCount} ITEM{cartCount > 1 ? 'S' : ''} SELECTED</span>
                <span className="text-xs sm:text-sm font-extrabold text-white">₹{cartSubtotal} <span className="text-[9px] font-normal text-slate-300">+ taxes</span></span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-extrabold text-blue-300 group-hover:text-white">
              <span>View Cart & Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
            </div>
          </button>
        )}

        {/* Bottom Strip: Navigation Tabs */}
        <div className="py-2 px-1 flex items-center justify-around">
          <button
            onClick={() => handleTabChange('landing')}
            className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition active:scale-95 px-2 py-1"
          >
            <QrCode className="w-4 h-4" />
            <span className="text-[10px] font-bold">Bus QR</span>
          </button>

          <button
            onClick={() => handleTabChange('menu')}
            className={`flex flex-col items-center gap-0.5 transition active:scale-95 px-2 py-1 ${
              activeCustomerTab === 'menu' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span className="text-[10px]">Menu</span>
          </button>

          <button
            onClick={() => handleTabChange('cart')}
            className={`relative flex flex-col items-center gap-0.5 transition active:scale-95 px-2 py-1 ${
              activeCustomerTab === 'cart' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-1 bg-emerald-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[10px]">Cart</span>
          </button>

          <button
            onClick={() => handleTabChange('tracking')}
            className={`flex flex-col items-center gap-0.5 transition active:scale-95 px-2 py-1 ${
              activeCustomerTab === 'tracking' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span className="text-[10px]">Tracking</span>
          </button>

          <button
            onClick={() => handleTabChange('history')}
            className={`flex flex-col items-center gap-0.5 transition active:scale-95 px-2 py-1 ${
              activeCustomerTab === 'history' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-[10px]">Orders</span>
          </button>

          <button
            onClick={() => handleTabChange('profile')}
            className={`flex flex-col items-center gap-0.5 transition active:scale-95 px-2 py-1 ${
              activeCustomerTab === 'profile' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>

      </div>

    </div>
  );
};
