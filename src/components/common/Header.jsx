import React, { useState } from 'react';
import { 
  Bus, 
  Bell, 
  Moon, 
  Sun, 
  Building2, 
  Truck, 
  Headphones, 
  ShieldCheck, 
  LogOut,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  Navigation,
  Search,
  Clock,
  QrCode,
  Utensils,
  TrendingUp,
  Wallet,
  MapPin,
  Activity,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const { 
    currentRole, 
    switchRole, 
    activeCustomerTab,
    setActiveCustomerTab, 
    darkMode, 
    toggleDarkMode, 
    bus, 
    cart, 
    notifications, 
    setNotifications,
    showToast
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBusDetailsModal, setShowBusDetailsModal] = useState(false);

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const unreadCount = notifications.filter(n => !n.read).length;

  const roles = [
    { id: 'customer', label: 'Passenger (QR)', icon: Bus, desc: 'Seat Menu & Live Ordering', color: 'from-blue-500 to-indigo-600' },
    { id: 'restaurant', label: 'Restaurant Partner', icon: Building2, desc: 'Live Kanban & Kitchen', color: 'from-amber-500 to-orange-600' },
    { id: 'driver', label: 'Driver Partner', icon: Truck, desc: 'GPS & Delivery Dispatch', color: 'from-emerald-500 to-teal-600' },
    { id: 'support', label: 'Support Team', icon: Headphones, desc: 'Command Center & Refunds', color: 'from-purple-500 to-pink-600' },
    { id: 'admin', label: 'Super Admin', icon: ShieldCheck, desc: 'SaaS Analytics & Approvals', color: 'from-cyan-500 to-blue-600' },
    { id: 'login', label: 'Sign In Screen', icon: LogOut, desc: 'Role Authentication View', color: 'from-slate-600 to-slate-800' },
  ];

  const currentRoleObj = roles.find(r => r.id === currentRole) || roles[0];

  // Dynamic navbar navigation links based on active role
  const getNavLinks = () => {
    switch (currentRole) {
      case 'customer':
        return [
          { label: 'Discover Menu', icon: Utensils, action: () => { setActiveCustomerTab('menu'); navigate('/customer/menu'); }, active: activeCustomerTab === 'menu' || location.pathname === '/customer/menu' },
          { label: 'Live Tracking', icon: Navigation, action: () => { setActiveCustomerTab('tracking'); navigate('/customer'); }, active: activeCustomerTab === 'tracking' },
          { label: 'My Orders', icon: Clock, action: () => { setActiveCustomerTab('history'); navigate('/customer'); }, active: activeCustomerTab === 'history' },
          { label: 'Seat QR', icon: QrCode, action: () => { setActiveCustomerTab('landing'); navigate('/customer'); }, active: activeCustomerTab === 'landing' },
        ];
      case 'restaurant':
        return [
          { label: 'Live Kanban', icon: Utensils, action: () => navigate('/restaurant/orders'), active: location.pathname.includes('/restaurant') },
          { label: 'Menu & Slots', icon: Sliders, action: () => navigate('/restaurant/menu'), active: location.pathname.includes('/restaurant/menu') },
          { label: 'Revenue', icon: TrendingUp, action: () => navigate('/restaurant/analytics'), active: location.pathname.includes('/restaurant/analytics') },
          { label: 'Wallet', icon: Wallet, action: () => navigate('/restaurant/wallet'), active: location.pathname.includes('/restaurant/wallet') },
        ];
      case 'driver':
        return [
          { label: 'Order Queue', icon: Utensils, action: () => navigate('/driver/orders'), active: location.pathname.includes('/driver/orders') },
          { label: 'GPS Route', icon: Navigation, action: () => navigate('/driver/route'), active: location.pathname.includes('/driver/route') },
          { label: 'Earnings', icon: Wallet, action: () => navigate('/driver/wallet'), active: location.pathname.includes('/driver/wallet') },
        ];
      case 'support':
        return [
          { label: 'Tickets', icon: Headphones, action: () => navigate('/support/tickets'), active: location.pathname.includes('/support/tickets') },
          { label: 'Orders', icon: Utensils, action: () => navigate('/support/orders'), active: location.pathname.includes('/support/orders') },
          { label: 'Refunds', icon: Wallet, action: () => navigate('/support/refunds'), active: location.pathname.includes('/support/refunds') },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', icon: ShieldCheck, action: () => navigate('/admin/dashboard'), active: location.pathname === '/admin/dashboard' || location.pathname === '/admin' },
          { label: 'Seat QR Hub', icon: QrCode, action: () => navigate('/admin/qr-management'), active: location.pathname.includes('/admin/qr-management') },
          { label: 'Analytics', icon: TrendingUp, action: () => navigate('/admin/analytics'), active: location.pathname.includes('/admin/analytics') },
          { label: 'Approvals', icon: CheckCircle2, action: () => navigate('/admin/approvals'), active: location.pathname.includes('/admin/approvals') },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#071535]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-x-clip">
        
        {/* Glow accent top hairline */}
        <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-indigo-400 to-emerald-400"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 sm:h-18 flex items-center justify-between gap-2">
          
          {/* LEFT: Brand Logo & Optional Bus Pill */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button 
              onClick={() => {
                if (currentRole === 'customer') {
                  setActiveCustomerTab('landing');
                  navigate('/customer');
                } else if (currentRole === 'admin') {
                  navigate('/admin/dashboard');
                } else if (currentRole === 'restaurant') {
                  navigate('/restaurant');
                } else if (currentRole === 'driver') {
                  navigate('/driver');
                } else if (currentRole === 'support') {
                  navigate('/support');
                }
              }} 
              className="text-left focus:outline-none hover:opacity-90 transition flex items-center gap-2 group flex-shrink-0"
            >
              <Logo size="sm" smSize="md" lightMode={true} showSubtitle={false} />
            </button>

            {/* Live Bus Status Pill (Visible on XL+ screens to prevent laptop overcrowding) */}
            <button 
              onClick={() => setShowBusDetailsModal(true)}
              className="hidden xl:flex items-center gap-2 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 px-3 py-1.5 rounded-full border border-white/15 text-xs font-medium transition shadow-sm active:scale-95 group flex-shrink-0"
              title="Click to view bus live telemetry"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              
              <div className="flex items-center gap-1 text-blue-200">
                <Bus className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition" />
                <span className="text-white font-extrabold">{bus.busNumber}</span>
              </div>
              <span className="text-white/20 hidden 2xl:inline">•</span>
              <span className="text-slate-300 font-semibold truncate max-w-[120px] hidden 2xl:inline">{bus.route}</span>
              
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                ETA {bus.etaMinutes}m
              </span>
            </button>
          </div>

          {/* CENTER: Desktop Navigation Links Bar (Sleek & Adaptive) */}
          {navLinks.length > 0 && (
            <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 shadow-inner overflow-hidden max-w-full">
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <button
                    key={idx}
                    onClick={link.action}
                    className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                      link.active
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-glow'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${link.active ? 'text-white' : 'text-blue-300'}`} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* RIGHT: Role Switcher & Utilities (Never clipped, flex-shrink-0) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Quick Role Switcher Pill Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#0B1F5E] to-[#102A72] hover:from-[#102A72] hover:to-[#16368c] border border-blue-400/40 text-white text-xs font-semibold px-2.5 sm:px-3.5 py-2 rounded-2xl transition shadow-floating active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse flex-shrink-0" />
                <span className="text-blue-200 hidden 2xl:inline">Role View:</span>
                <span className="font-extrabold text-white truncate max-w-[100px] sm:max-w-[130px]">{currentRoleObj.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-blue-300 transition-transform duration-200 flex-shrink-0 ${showRoleDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showRoleDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-[#071535] border border-white/20 rounded-2xl shadow-floating py-2 z-50 animate-in fade-in zoom-in-95 backdrop-blur-2xl"
                  onMouseLeave={() => setShowRoleDropdown(false)}
                >
                  <div className="px-3.5 py-2 border-b border-white/10 mb-1 flex items-center justify-between">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-blue-300">Switch Ecosystem Persona</p>
                    <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">2.0 Live</span>
                  </div>

                  {roles.map(r => {
                    const Icon = r.icon;
                    const isActive = currentRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          switchRole(r.id);
                          setShowRoleDropdown(false);
                          if (r.id === 'customer') {
                            setActiveCustomerTab('menu');
                            navigate('/customer');
                          } else if (r.id === 'restaurant') {
                            navigate('/restaurant');
                          } else if (r.id === 'driver') {
                            navigate('/driver');
                          } else if (r.id === 'support') {
                            navigate('/support');
                          } else if (r.id === 'admin') {
                            navigate('/admin/dashboard');
                          } else if (r.id === 'login') {
                            navigate('/login');
                          }
                        }}
                        className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 hover:bg-white/10 transition ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-l-4 border-blue-400 text-white font-semibold' 
                            : 'text-slate-300'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${r.color} text-white shadow-sm flex-shrink-0 mt-0.5`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span className="truncate">{r.label}</span>
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">{r.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Quick Launcher (Customer View Only) */}
            {currentRole === 'customer' && (
              <button
                onClick={() => {
                  setActiveCustomerTab('cart');
                  navigate('/customer');
                }}
                className="relative bg-white/5 hover:bg-white/10 p-2 sm:p-2.5 rounded-2xl border border-white/10 text-white transition flex items-center justify-center active:scale-95 group flex-shrink-0"
                title="View Cart"
              >
                <ShoppingBag className="w-4 h-4 text-blue-300 group-hover:scale-110 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#071535] shadow-subtle animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Notification Center Trigger */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative bg-white/5 hover:bg-white/10 p-2 sm:p-2.5 rounded-2xl border border-white/10 text-white transition flex items-center justify-center active:scale-95 group"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-blue-300 group-hover:scale-110 transition" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-[#071535] animate-ping"></span>
                )}
              </button>

              {/* Notification Popover Drawer */}
              {showNotifications && (
                <div 
                  className="fixed inset-x-3 top-16 sm:absolute sm:inset-auto sm:right-0 sm:mt-2 sm:w-80 max-w-sm ml-auto bg-[#071535] border border-white/20 rounded-2xl shadow-floating p-3.5 z-50 text-slate-100 animate-in fade-in zoom-in-95 backdrop-blur-2xl"
                  onMouseLeave={() => setShowNotifications(false)}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 text-blue-400" /> Live System Telemetry Alerts
                    </h4>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllNotificationsRead}
                          className="text-[10px] bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30 transition"
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        className={`p-2.5 rounded-xl border text-xs transition ${
                          !n.read 
                            ? 'bg-blue-600/15 border-blue-400/30' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-white mb-0.5">
                          <span className="flex items-center gap-1.5">
                            {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="bg-white/5 hover:bg-white/10 p-2 sm:p-2.5 rounded-2xl border border-white/10 text-white transition flex items-center justify-center active:scale-95 flex-shrink-0"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-300" />}
            </button>

            {/* Mobile Menu Hamburger Trigger */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 p-2 sm:p-2.5 rounded-2xl text-white border border-blue-400/40 transition flex items-center justify-center active:scale-95 shadow-glow flex-shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* MOBILE MENU SLIDE-DOWN DRAWER (< md) */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#071535] border-b border-white/20 px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 backdrop-blur-2xl">
            
            {/* 1. Live Bus Status Badge (Mobile Drawer) */}
            <button
              onClick={() => {
                setShowMobileMenu(false);
                setShowBusDetailsModal(true);
              }}
              className="w-full bg-gradient-to-r from-white/10 to-white/5 p-3.5 rounded-2xl border border-white/15 text-xs text-left space-y-2 hover:bg-white/15 transition active:scale-98"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Bus className="w-4 h-4 text-blue-400" /> {bus.busNumber}
                </span>
                <span className="text-emerald-300 font-extrabold bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30 text-[10px]">
                  ETA {bus.etaMinutes}m
                </span>
              </div>
              <p className="text-slate-300 text-[11px] font-medium truncate">{bus.route}</p>
            </button>

            {/* 2. Contextual Nav Links (Mobile Menu) */}
            {navLinks.length > 0 && (
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-blue-300 block mb-2">
                  Active Module Quick Links ({currentRoleObj.label})
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {navLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          link.action();
                          setShowMobileMenu(false);
                        }}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition active:scale-95 ${
                          link.active
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white font-bold shadow-glow'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0 text-blue-300" />
                        <span className="text-xs truncate font-semibold">{link.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Role Persona Switcher Grid for Mobile */}
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-blue-300 block mb-2">
                Switch Ecosystem View Persona
              </span>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(r => {
                  const Icon = r.icon;
                  const isActive = currentRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        switchRole(r.id);
                        setShowMobileMenu(false);
                        if (r.id === 'customer') {
                          setActiveCustomerTab('menu');
                          navigate('/customer');
                        } else if (r.id === 'restaurant') {
                          navigate('/restaurant');
                        } else if (r.id === 'driver') {
                          navigate('/driver');
                        } else if (r.id === 'support') {
                          navigate('/support');
                        } else if (r.id === 'admin') {
                          navigate('/admin/dashboard');
                        } else if (r.id === 'login') {
                          navigate('/login');
                        }
                      }}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition active:scale-95 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white font-bold shadow-glow'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${r.color} text-white shadow-sm flex-shrink-0`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs truncate font-semibold">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Seat QR Code Shortcut Button */}
            <button
              onClick={() => {
                setShowMobileMenu(false);
                navigate('/customer/scan');
              }}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-2xl shadow-subtle border border-emerald-400/40 flex items-center justify-center gap-2 active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span>Launch Seat QR Scanner</span>
            </button>

          </div>
        )}
      </header>

      {/* BUS LIVE TELEMETRY MODAL */}
      {showBusDetailsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#071535] border border-white/20 rounded-3xl max-w-md w-full p-6 text-white space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowBusDetailsModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider block">Live Vehicle Telemetry</span>
                <h3 className="text-lg font-extrabold text-white">{bus.busNumber}</h3>
                <p className="text-xs text-slate-300">{bus.route}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 font-medium block text-[10px]">Current Velocity</span>
                <span className="text-base font-extrabold text-white">68 km/h</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 font-medium block text-[10px]">Next Halt Point</span>
                <span className="text-xs font-bold text-amber-400 truncate block">{bus.nextStop}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 font-medium block text-[10px]">Estimated Arrival</span>
                <span className="text-base font-extrabold text-emerald-400">{bus.etaMinutes} Mins</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 font-medium block text-[10px]">Passenger Name</span>
                <span className="text-xs font-bold text-white truncate block">{bus.passengerName}</span>
              </div>
            </div>

            <div className="bg-blue-600/20 p-3.5 rounded-2xl border border-blue-400/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Seat Location: <strong className="text-white">{bus.seatNumber}</strong></span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">GPS Verified</span>
            </div>

            <button
              onClick={() => setShowBusDetailsModal(false)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-xs shadow-subtle transition active:scale-95"
            >
              Close Telemetry
            </button>
          </div>
        </div>
      )}
    </>
  );
};
