import React from 'react';
import { ShieldCheck, Activity, Database, Server, Lock, Cpu } from 'lucide-react';
import { Logo } from '../common/Logo';

export const AdminAuthLayout = ({ children, title = "Admin Portal", subtitle = "Secure access to your control center" }) => {
  return (
    <div className="min-h-screen bg-[#071535] text-white flex flex-col justify-between font-sans selection:bg-[#2563EB] selection:text-white">
      
      {/* Top Header */}
      <header className="w-full bg-[#0B1F5E] py-4 px-6 sm:px-10 border-b border-white/10 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <Logo size="md" lightMode={true} showSubtitle={true} />
          <span className="bg-blue-600/30 text-blue-300 border border-blue-400/40 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-widest">
            Control Center
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">256-Bit Hardware Security Lock</span>
        </div>
      </header>

      {/* Main Split Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl bg-[#0A1738] rounded-3xl shadow-floating border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* LEFT COLUMN: Enterprise Dark Control Center Visual (Desktop) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B1F5E] via-[#071535] to-[#102A72] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden hidden lg:flex border-r border-white/10">
            
            {/* Grid & Telemetry Lines SVG Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="admin-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#admin-grid)" />
              <circle cx="200" cy="200" r="140" stroke="#3B82F6" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            </svg>

            {/* Top Visual Header */}
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-blue-400">
                <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
                <span className="uppercase tracking-wider">Enterprise Operations Command</span>
              </div>

              <h1 className="text-3xl font-extrabold text-white leading-tight">
                Control the entire QuickDines ecosystem.
              </h1>

              <p className="text-xs text-blue-200 leading-relaxed">
                Manage passengers, restaurants, drivers, buses, orders, finance and platform operations from one secure workspace.
              </p>
            </div>

            {/* Middle Real-time Metrics Display */}
            <div className="relative z-10 grid grid-cols-2 gap-3 my-6">
              <div className="bg-[#0B1F5E]/80 backdrop-blur-md p-3.5 rounded-2xl border border-blue-400/20">
                <div className="flex items-center justify-between text-blue-300 mb-1">
                  <span className="text-[10px] font-bold uppercase">Restaurants</span>
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-xl font-black text-white">38 Active</span>
              </div>

              <div className="bg-[#0B1F5E]/80 backdrop-blur-md p-3.5 rounded-2xl border border-blue-400/20">
                <div className="flex items-center justify-between text-blue-300 mb-1">
                  <span className="text-[10px] font-bold uppercase">Transit Drivers</span>
                  <Server className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-xl font-black text-white">52 Online</span>
              </div>

              <div className="bg-[#0B1F5E]/80 backdrop-blur-md p-3.5 rounded-2xl border border-blue-400/20">
                <div className="flex items-center justify-between text-blue-300 mb-1">
                  <span className="text-[10px] font-bold uppercase">Connected Buses</span>
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-xl font-black text-white">64 Active</span>
              </div>

              <div className="bg-[#0B1F5E]/80 backdrop-blur-md p-3.5 rounded-2xl border border-blue-400/20">
                <div className="flex items-center justify-between text-blue-300 mb-1">
                  <span className="text-[10px] font-bold uppercase">Total Orders</span>
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-xl font-black text-emerald-400">14.8k+</span>
              </div>
            </div>

            {/* Bottom Security Notice */}
            <div className="relative z-10 bg-white/5 p-3 rounded-xl border border-white/10 text-[11px] text-blue-200 flex items-center justify-between">
              <span>Security Protocol: TLS 1.3 Audit Active</span>
              <span className="text-emerald-400 font-bold">● SYSTEM STABLE</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Admin Login Card */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-[#0A1738] text-slate-900 dark:text-white">
            
            <div className="mb-6 space-y-1">
              <span className="text-[10px] uppercase font-black text-[#2563EB] tracking-widest">
                Authorized Personnel Only
              </span>
              <h2 className="text-2xl font-black text-[#0F172A] dark:text-white">
                {title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            </div>

            {children}

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-3.5 text-center text-xs text-slate-500 border-t border-white/10 bg-[#071535]">
        <span>QuickDines Administration System • Enterprise Edition 2.0</span>
      </footer>

    </div>
  );
};
