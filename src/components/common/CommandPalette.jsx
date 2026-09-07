import React, { useState, useEffect } from 'react';
import { Search, Command, X, ArrowRight, Bus, Utensils, Headphones, Truck, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const CommandPalette = () => {
  const { orders, restaurantsList, driversList, supportTicketsList, switchRole, showToast } = useApp();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener: Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const results = [
    ...orders.map(o => ({ type: 'Order', id: `#${o.id}`, title: `${o.passengerName} (Bus ${o.busNumber})`, path: '/customer/orders', role: 'customer' })),
    ...restaurantsList.map(r => ({ type: 'Restaurant', id: r.id, title: r.name, path: '/restaurant/orders', role: 'restaurant' })),
    ...driversList.map(d => ({ type: 'Driver', id: d.id, title: `${d.name} (${d.busAssigned})`, path: '/driver/orders', role: 'driver' })),
    ...supportTicketsList.map(t => ({ type: 'Ticket', id: `#${t.id}`, title: t.issueType, path: '/support/tickets', role: 'support' })),
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.id.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    switchRole(item.role);
    navigate(item.path);
    setIsOpen(false);
    showToast(`Jumped to ${item.type} ${item.id}`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-16 p-4">
      <div className="bg-[#071535] text-white w-full max-w-xl rounded-3xl border border-white/20 shadow-floating overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Command Search Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-400" />
          <input
            type="text"
            placeholder="Type a command or search orders, buses, restaurants, drivers..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching orders, restaurants or tickets found.
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item)}
                className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-left text-xs transition border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-blue-400 font-bold px-2 py-0.5 rounded-lg bg-blue-500/20 text-[10px]">
                    {item.type}
                  </span>
                  <div>
                    <span className="font-extrabold text-white block">{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.id}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))
          )}
        </div>

        {/* Command Footer */}
        <div className="p-3 bg-black/40 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Command className="w-3.5 h-3.5 text-blue-400" /> Use <strong>Ctrl + K</strong> or <strong>/</strong> anytime to launch global search
          </span>
          <span className="font-mono text-[10px]">ESC to close</span>
        </div>

      </div>
    </div>
  );
};
