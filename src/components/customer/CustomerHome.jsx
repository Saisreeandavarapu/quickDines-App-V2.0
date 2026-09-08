import React, { useState, useEffect } from 'react';
import {
  Search,
  Utensils,
  Coffee,
  Cookie,
  UtensilsCrossed,
  Moon,
  CupSoda,
  IceCream,
  ShoppingBag,
  Clock,
  MapPin,
  Plus,
  Check,
  Flame,
  Filter,
  Sparkles,
  ArrowRight,
  ArrowUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FOOD_CATEGORIES, TIME_SLOTS } from '../../mockData';

export const CustomerHome = ({ onSelectFoodItem }) => {
  const { foodItems, bus, cart, setActiveCustomerTab } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('dinner');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryIcons = {
    all: Utensils,
    breakfast: Coffee,
    snacks: Cookie,
    meals: UtensilsCrossed,
    dinner: Moon,
    beverages: CupSoda,
    desserts: IceCream
  };

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] pb-32">

      {/* Mobile-first Header Banner */}
      <div className="bg-[#0B1F5E] text-white pt-5 pb-7 px-4 sm:px-6 rounded-b-3xl shadow-card relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3.5 relative z-10">

          {/* Top greeting & bus seat */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-blue-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Executive Highway Menu
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">Good Evening!</h2>
              <p className="text-xs text-blue-200 mt-0.5">What would you like for your journey tonight?</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border border-white/20 text-right flex-shrink-0">
              <span className="text-[9px] sm:text-[10px] text-blue-200 uppercase font-bold block">Your Seat</span>
              <span className="text-base sm:text-lg font-extrabold text-white">Seat {bus.seatNumber}</span>
            </div>
          </div>

          {/* Time-Based Menu Slots Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot.id}
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 border ${selectedTimeSlot === slot.id
                    ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-subtle'
                    : 'bg-white/10 text-blue-200 border-white/15 hover:bg-white/20'
                  }`}
              >
                <Clock className="w-3 h-3 text-amber-300" />
                <span>{slot.name}</span>
                <span className="text-[10px] opacity-75">({slot.time})</span>
              </button>
            ))}
          </div>

          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Biryani, Dosa, Cold Brew, Thali..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 truncate"
            />
          </div>

        </div>
      </div>

      {/* Main Category Bar & Filters */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-3 relative z-20">
        <div className="bg-white dark:bg-[#0A1738] p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card flex items-center justify-between gap-2 overflow-x-auto">

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {FOOD_CATEGORIES.map(cat => {
              const Icon = categoryIcons[cat.id] || Utensils;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${isSelected
                      ? 'bg-[#0B1F5E] text-white shadow-subtle'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Veg Only Toggle Switch */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 dark:border-white/10 flex-shrink-0">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">Veg Only</span>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`w-9 h-5 sm:w-10 sm:h-6 rounded-full transition-colors p-0.5 flex items-center ${vegOnly ? 'bg-emerald-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                }`}
            >
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-md"></span>
            </button>
          </div>

        </div>
      </div>

      {/* Food Items List Grid */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-5 space-y-4">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <h3 className="text-base sm:text-lg font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-2">
            <span>Available Journey Items</span>
            <span className="text-xs font-normal text-slate-500">({filteredItems.length} items)</span>
          </h3>
          <span className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Next Stop: {bus.nextStop}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectFoodItem(item)}
              className="bg-white dark:bg-[#0A1738] rounded-2xl border border-slate-200/80 dark:border-white/10 p-3.5 sm:p-4 shadow-subtle hover:shadow-card transition duration-200 flex gap-3.5 cursor-pointer group"
            >
              {/* Item Image with Veg/Non-Veg Badge */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Veg / Non-Veg Indicator */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md p-1 rounded-md shadow">
                  <div className={`w-3.5 h-3.5 border-2 flex items-center justify-center ${item.isVeg ? 'border-emerald-600' : 'border-red-600'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`}></div>
                  </div>
                </div>
              </div>

              {/* Item Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#0B1F5E] dark:text-white line-clamp-1 group-hover:text-blue-600 transition">
                      {item.name}
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-[#0B1F5E] dark:text-white">₹{item.price}</span>
                    <span className="text-[10px] text-slate-400 block font-medium">Prep: {item.prepTimeMins}m</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFoodItem(item);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-subtle transition flex items-center gap-1 active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 md:bottom-24 md:right-8 z-50 p-3.5 bg-[#0B1F5E] hover:bg-[#102A72] text-white rounded-full shadow-floating border border-blue-400/40 transition-all duration-300 animate-in fade-in zoom-in-75 active:scale-90 flex items-center justify-center group"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-blue-300 group-hover:text-white transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

    </div>
  );
};
