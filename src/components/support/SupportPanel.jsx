import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  AlertTriangle, 
  Clock, 
  RotateCcw, 
  ShieldAlert, 
  MessageSquare, 
  CheckCircle, 
  X, 
  DollarSign, 
  User, 
  Bus, 
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';

export const SupportPanel = () => {
  const { supportTicketsList, orders, processRefund, showToast, switchRole } = useApp();

  useEffect(() => {
    switchRole('support');
  }, []);

  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'orders' | 'refunds'
  const [selectedTicket, setSelectedTicket] = useState(supportTicketsList[0]);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState(selectedTicket ? selectedTicket.refundAmount || 160 : 160);

  const navItems = [
    { id: 'tickets', label: 'Support Ticket Center', icon: Headphones, badge: supportTicketsList.length },
    { id: 'orders', label: 'Order Risk Monitoring', icon: AlertTriangle, badge: '2 Delayed' },
    { id: 'refunds', label: 'Refund Processing', icon: RotateCcw },
  ];

  const handleConfirmRefund = () => {
    if (!selectedTicket) return;
    processRefund(selectedTicket.id, refundAmount);
    setShowRefundModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <Sidebar
        title="Support Command Center"
        navItems={navItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
        
        {/* Support Command Center Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0A1738] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-blue-600 dark:text-blue-400">
              Operations & Customer Support Command Center
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1F5E] dark:text-white mt-0.5">
              Live Support & Incident Desk
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Monitoring 64 highway buses & 14 active transit orders
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-300">
              <Headphones className="w-4 h-4" /> 4 Agents Active
            </span>
          </div>
        </div>

        {/* Support KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Transit Orders" value={orders.filter(o => o.orderStatus !== 'DELIVERED').length} change="Live" trend="up" icon={Clock} description="Monitoring dispatch" />
          <StatCard title="Delayed Order Risk" value="2 Orders" change="High Risk" trend="down" icon={AlertTriangle} description="Bus toll jam flagged" />
          <StatCard title="Open Support Tickets" value={supportTicketsList.filter(t => t.status !== 'RESOLVED').length} change="Priority 1" trend="down" icon={Headphones} description="Avg SLA: 3 mins" />
          <StatCard title="Refund Requests" value="1 Pending" change="₹160.00" trend="up" icon={RotateCcw} description="Requires agent review" />
        </div>

        {/* TAB 1: TICKET CENTER */}
        {activeTab === 'tickets' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Tickets List */}
            <div className="lg:col-span-1 bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
              <h3 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white uppercase tracking-wider">
                Support Ticket Queue
              </h3>

              <div className="space-y-3">
                {supportTicketsList.map(ticket => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      selectedTicket?.id === ticket.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">#{ticket.id}</span>
                      <Badge status={ticket.priority} />
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 dark:text-white mt-1">{ticket.issueType}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">{ticket.description}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 mt-2 border-t border-slate-100 dark:border-white/5">
                      <span>Customer: {ticket.customerName}</span>
                      <span>{ticket.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticket Detail & Resolution Workspace */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0A1738] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-5">
              {selectedTicket ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-[#0B1F5E] dark:text-white">Ticket #{selectedTicket.id}</h3>
                        <Badge status={selectedTicket.status} />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Assigned to: {selectedTicket.assignedTo}</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowRefundModal(true);
                        setRefundAmount(selectedTicket.refundAmount || 160);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-subtle transition flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Process Refund</span>
                    </button>
                  </div>

                  {/* Customer & Order Context */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5">
                      <span className="text-slate-400 font-bold uppercase block text-[10px]">Customer Info</span>
                      <span className="font-extrabold text-slate-800 dark:text-white text-sm block mt-1">{selectedTicket.customerName}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-mono">{selectedTicket.customerPhone}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5">
                      <span className="text-slate-400 font-bold uppercase block text-[10px]">Related Order</span>
                      <span className="font-extrabold text-slate-800 dark:text-white text-sm block mt-1">Order #{selectedTicket.orderId}</span>
                      <span className="text-slate-500">Bus AP-28-Z-1234 (Seat 14B)</span>
                    </div>
                  </div>

                  {/* Issue Description */}
                  <div className="bg-amber-500/10 border border-amber-300/40 p-4 rounded-2xl text-xs space-y-1">
                    <span className="font-extrabold text-amber-600 dark:text-amber-400 block uppercase">Issue Summary: {selectedTicket.issueType}</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedTicket.description}</p>
                  </div>

                  {/* Internal Notes History */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Internal Agent Case Notes</h4>
                    <div className="space-y-2">
                      {selectedTicket.notes.map((note, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-slate-400 text-center py-8">Select a ticket to view details</p>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: ORDER RISK MONITORING */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-[#0A1738] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
              Highway Transit Order Monitoring Grid
            </h3>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Bus & Route</th>
                    <th className="p-3">Restaurant</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {orders.map(ord => (
                    <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                      <td className="p-3 font-extrabold text-blue-600 dark:text-blue-400">#{ord.id}</td>
                      <td className="p-3">
                        <span className="font-bold text-slate-800 dark:text-white block">{ord.passengerName}</span>
                        <span className="text-[10px] text-slate-400">Seat {ord.seatNumber}</span>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{ord.busNumber}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{ord.restaurantName}</td>
                      <td className="p-3"><Badge status={ord.orderStatus} /></td>
                      <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{ord.paymentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Grid View */}
            <div className="md:hidden space-y-3">
              {orders.map(ord => (
                <div key={ord.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">#{ord.id}</span>
                    <Badge status={ord.orderStatus} />
                  </div>
                  <div className="font-bold text-slate-800 dark:text-white">{ord.passengerName} (Seat {ord.seatNumber})</div>
                  <div className="text-slate-500">Bus {ord.busNumber} • {ord.restaurantName}</div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* REFUND MODAL CONFIRMATION */}
        {showRefundModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0A1738] w-full max-w-md rounded-3xl p-6 shadow-floating border border-slate-200 dark:border-white/10 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-emerald-500" /> Confirm Support Refund
                </h3>
                <button onClick={() => setShowRefundModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Refund Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={refundAmount}
                    onChange={e => setRefundAmount(Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-extrabold text-lg focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-800 dark:text-amber-300">
                  Refund will be instantly credited to customer's original UPI/Razorpay payment source.
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRefund}
                  className="flex-1 py-3 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-glow active:scale-95"
                >
                  Approve & Issue Refund
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
