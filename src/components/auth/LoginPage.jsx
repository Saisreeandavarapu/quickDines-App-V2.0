import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';
import { Shield, Bus, Utensils, Truck, Headphones, ArrowRight, CheckCircle, Smartphone, Lock, UserPlus } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { switchRole, showToast } = useApp();
  const [email, setEmail] = useState('rahul.sharma@quickdines.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRolePreset, setSelectedRolePreset] = useState('customer');

  const roleRoutes = {
    customer: '/dashboard',
    admin: '/admin/dashboard',
    restaurant: '/restaurant/orders',
    driver: '/driver/orders',
    support: '/support/tickets',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    switchRole(selectedRolePreset);
    const targetRoute = roleRoutes[selectedRolePreset] || '/dashboard';
    navigate(targetRoute);
    showToast(`Authenticated successfully as ${selectedRolePreset.toUpperCase()}`, 'success');
  };

  const rolePresets = [
    { id: 'customer', label: 'Passenger QR Web', icon: Bus, desc: 'Scan & Order from Bus' },
    { id: 'restaurant', label: 'Restaurant Partner', icon: Utensils, desc: 'Kitchen Kanban & Orders' },
    { id: 'driver', label: 'Driver Partner', icon: Truck, desc: 'GPS Transit Delivery' },
    { id: 'support', label: 'Support Team', icon: Headphones, desc: 'Tickets & Refund Workflow' },
    { id: 'admin', label: 'Super Admin', icon: Shield, desc: 'Full SaaS Ecosystem Control' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F9FC] dark:bg-[#071535]">
      
      {/* Left: Deep Navy Branded Section */}
      <div className="lg:w-1/2 bg-[#0B1F5E] text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Background Subtle Gradient & Grid */}
        <div className="absolute inset-0 bg-navy-gradient opacity-90 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <Logo size="lg" lightMode={true} showSubtitle={true} />
        </div>

        <div className="relative z-10 my-12 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            TRANSIT DINING PLATFORM V2.0
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Smarter Dining.<br />
            <span className="text-blue-400">Better Journeys.</span>
          </h1>
          <p className="text-base text-blue-100/90 leading-relaxed">
            Connecting passengers, restaurants, and drivers through one intelligent transit dining ecosystem. Enjoy gourmet hot meals delivered straight to your bus seat with real-time GPS tracking.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl font-extrabold text-white">64+</div>
              <div className="text-xs text-blue-200">Active Bus Routes</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl font-extrabold text-emerald-400">14.2 min</div>
              <div className="text-xs text-blue-200">Average Transit Pickup</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-blue-300/80 flex items-center justify-between border-t border-white/10 pt-4">
          <span>© 2026 QuickDines Inc. All rights reserved.</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> SOC2 Type II Certified SaaS</span>
        </div>
      </div>

      {/* Right: Modern SaaS Split Login Card */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          
          <div>
            <h2 className="text-3xl font-extrabold text-[#0B1F5E] dark:text-white tracking-tight">
              Sign In to QuickDines
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Select your role preset or enter enterprise credentials to access the platform.
            </p>
          </div>

          {/* Quick Role Selector Cards */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Select Ecosystem Role Persona:
            </label>
            <div className="grid grid-cols-1 gap-2">
              {rolePresets.map(preset => {
                const Icon = preset.icon;
                const isSelected = selectedRolePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedRolePreset(preset.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-white ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A1738] text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold">{preset.label}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{preset.desc}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Work Email or Mobile Number
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A1738] text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A1738] text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span>Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-navy-gradient hover:opacity-95 text-white font-extrabold text-sm rounded-xl shadow-card transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Sign In as {selectedRolePreset.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Alternative Auth Options */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Passenger OTP Auth</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/login')}
                className="text-slate-600 dark:text-slate-400 font-bold hover:underline flex items-center gap-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin OTP Portal</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
