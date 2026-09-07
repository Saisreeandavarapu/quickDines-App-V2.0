import React from 'react';

export const Sidebar = ({ title, navItems, activeTab, onSelectTab }) => {
  return (
    <>
      {/* Desktop Sidebar (hidden on mobile, visible on md+) */}
      <aside className="w-64 bg-[#071535] text-slate-300 border-r border-white/10 flex-col justify-between hidden md:flex min-h-[calc(100vh-4.5rem)] flex-shrink-0">
        <div className="p-4">
          <div className="px-3 py-2 mb-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">{title}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-subtle font-bold border border-blue-400/40'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-blue-900' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-3 rounded-2xl border border-blue-500/20 text-xs">
            <div className="flex items-center justify-between font-bold text-white mb-1">
              <span>QuickDines SaaS v2.4</span>
              <span className="text-[10px] text-emerald-400">OPERATIONAL</span>
            </div>
            <p className="text-[11px] text-slate-300">Live telemetry sync with 64 highway buses</p>
          </div>
        </div>
      </aside>

      {/* Mobile Horizontal Top Navigation Pill Bar (visible on < md) */}
      <div className="md:hidden w-full bg-[#071535] p-3 border-b border-white/10 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-subtle border border-blue-400/40'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
