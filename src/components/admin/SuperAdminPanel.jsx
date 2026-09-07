import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Building2, 
  Truck, 
  Bus, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Activity, 
  Search, 
  Filter, 
  ShieldAlert,
  ArrowUpRight,
  ChevronRight,
  Sliders,
  Lock,
  Calendar,
  Download,
  RefreshCw,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { MapVisualizer } from '../common/MapVisualizer';
import { RevenueChart, OrderVolumeChart, CommissionPieChart } from '../charts/AnalyticsCharts';
import { REVENUE_GRAPH_DATA, AUDIT_LOGS } from '../../mockData';

export const SuperAdminPanel = ({ initialTab = 'dashboard' }) => {
  const { 
    stats, 
    restaurantsList, 
    driversList, 
    orders, 
    approvePartner, 
    showToast,
    switchRole
  } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Today');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    switchRole('admin');
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const navItems = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: ShieldCheck },
    { id: 'operations', label: 'Live Operations & Map', icon: Activity, badge: `${stats.activeBuses} Buses` },
    { id: 'analytics', label: 'Revenue & Analytics', icon: TrendingUp },
    { id: 'approvals', label: 'Partner Approvals', icon: CheckCircle, badge: '1 Pending' },
    { id: 'users', label: 'User & Fleet Directory', icon: Users },
    { id: 'financials', label: 'Commission & Settlements', icon: DollarSign },
    { id: 'reports', label: 'Executive Reports', icon: FileText },
    { id: 'security', label: 'Security & Audit Logs', icon: Lock },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] flex flex-col md:flex-row">
      
      {/* Enterprise Sidebar */}
      <Sidebar
        title="Super Admin Control"
        navItems={navItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
        
        {/* Enterprise Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0B1F5E] via-[#102A72] to-[#162F7A] text-white p-6 rounded-3xl border border-white/15 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3.5 py-1 rounded-full text-xs font-extrabold border border-blue-400/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ENTERPRISE SAAS CONTROL CENTER
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good morning, Super Admin
            </h1>
            <p className="text-xs text-blue-200 mt-1 font-medium">
              System Health: 100% Operational • 64 Transit Buses Active • 38 Partner Kitchens
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-bold px-4 py-2 rounded-2xl flex items-center gap-2 shadow-subtle">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Platform GMV: ₹1,84,950</span>
            </div>
          </div>
        </div>

        {/* Global Key Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Platform Orders" value={stats.totalOrders.toLocaleString()} change="+18.4%" trend="up" icon={FileText} description="Lifetime completed orders" />
          <StatCard title="Today's Active Orders" value={stats.todayOrders} change="+32 vs yesterday" trend="up" icon={Activity} description="Peak evening transit spike" />
          <StatCard title="Active Partner Kitchens" value={stats.activeRestaurants} change="38 Online" trend="up" icon={Building2} description="1 Pending Approval" />
          <StatCard title="Active Bus Fleet" value={`${stats.activeBuses} Buses`} change="64 Total" trend="up" icon={Bus} description="Coverage: 12 Expressways" />
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recharts Area Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
                      Platform Revenue & Growth Trajectory
                    </h3>
                    <p className="text-xs text-slate-500">Hourly GMV velocity across transit routes</p>
                  </div>
                  <span className="text-xs text-emerald-500 font-extrabold flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-300">
                    <ArrowUpRight className="w-4 h-4" /> +24.6% Monthly
                  </span>
                </div>

                <RevenueChart />
              </div>

              {/* Commission Pie Chart Breakdown */}
              <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
                <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
                  Revenue Split Distribution
                </h3>

                <CommissionPieChart />

                <div className="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-white/5">
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                    <span>Restaurant Share (76%)</span>
                    <span className="text-emerald-500">₹1,42,800.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                    <span>Platform Commission (14%)</span>
                    <span className="text-blue-500">₹24,040.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                    <span>Driver Incentives (10%)</span>
                    <span className="text-amber-500">₹18,110.00</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: LIVE OPERATIONS & MAP */}
        {activeTab === 'operations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
                Highway Transit Fleet & Real-Time Telematics
              </h3>
              <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> 64 Buses Connected
              </span>
            </div>
            <MapVisualizer height="h-[460px]" />
          </div>
        )}

        {/* TAB 3: ANALYTICS DASHBOARD */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white dark:bg-[#0A1738] p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-slate-700 dark:text-slate-300">Time Range:</span>
                {['Today', '7 Days', '30 Days', 'This Quarter'].map(t => (
                  <button
                    key={t}
                    onClick={() => setDateFilter(t)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition ${
                      dateFilter === t 
                        ? 'bg-blue-600 text-white shadow-subtle' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                onClick={() => showToast('Analytics CSV exported', 'success')}
                className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export Analytics Report
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
                <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">Revenue Growth Curve</h3>
                <RevenueChart />
              </div>

              <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
                <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">Transit Meal Volume Breakdown</h3>
                <OrderVolumeChart />
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: PARTNER APPROVALS */}
        {activeTab === 'approvals' && (
          <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
              Partner & Kitchen Onboarding Approval Desk
            </h3>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th className="p-3">Partner Name</th>
                    <th className="p-3">Category / Route</th>
                    <th className="p-3">FSSAI / License</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {restaurantsList.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                      <td className="p-3 font-extrabold text-[#0B1F5E] dark:text-white">{r.name}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{r.category}</td>
                      <td className="p-3 font-mono text-slate-500">{r.fssaiLicense}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{r.phone}</td>
                      <td className="p-3"><Badge status={r.approvalStatus} /></td>
                      <td className="p-3 text-right flex justify-end gap-2">
                        <button
                          onClick={() => approvePartner('restaurant', r.id, 'APPROVED')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-subtle transition active:scale-95"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => approvePartner('restaurant', r.id, 'REJECTED')}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-subtle transition active:scale-95"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {restaurantsList.map(r => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#0B1F5E] dark:text-white">{r.name}</span>
                    <Badge status={r.approvalStatus} />
                  </div>
                  <div className="text-slate-500">{r.category} • FSSAI: #{r.fssaiLicense}</div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => approvePartner('restaurant', r.id, 'APPROVED')}
                      className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded-xl active:scale-95"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => approvePartner('restaurant', r.id, 'REJECTED')}
                      className="flex-1 py-2 bg-red-600 text-white font-bold rounded-xl active:scale-95"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: USER DIRECTORY */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
                Ecosystem Users & Drivers Data Directory
              </h3>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search user name..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th className="p-3">Driver / User Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Assigned Bus Route</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {driversList.map(drv => (
                    <tr key={drv.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                      <td className="p-3 font-extrabold text-[#0B1F5E] dark:text-white">{drv.name}</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-300">{drv.phone}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{drv.busAssigned}</td>
                      <td className="p-3"><Badge status={drv.status} /></td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => showToast(`User ${drv.name} status updated`, 'info')}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl"
                        >
                          Permissions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: FINANCIALS */}
        {activeTab === 'financials' && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
              Platform Financial Control & Commission Audit
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase">Gross Platform GMV Today</span>
                <h3 className="text-3xl font-extrabold text-[#0B1F5E] dark:text-white mt-1">₹1,84,950</h3>
              </div>
              <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase">Net SaaS Commission (12%)</span>
                <h3 className="text-3xl font-extrabold text-emerald-500 mt-1">₹24,040</h3>
              </div>
              <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase">Pending Restaurant Withdrawals</span>
                <h3 className="text-3xl font-extrabold text-blue-500 mt-1">₹48,920</h3>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: REPORTS */}
        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" /> Executive Transit Operations Reports
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-2">
                <span className="font-extrabold text-[#0B1F5E] dark:text-white block">Monthly Transit GMV Summary</span>
                <p className="text-slate-500">Comprehensive report on GMV, commissions, and restaurant payouts for August 2026.</p>
                <button onClick={() => showToast('Report PDF generated', 'success')} className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-xl">Download PDF</button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-2">
                <span className="font-extrabold text-[#0B1F5E] dark:text-white block">Bus Route Delivery SLA Performance</span>
                <p className="text-slate-500">Average transit delivery time per highway segment (Visakhapatnam - Vijayawada).</p>
                <button onClick={() => showToast('Report CSV generated', 'success')} className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-xl">Export CSV</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: SECURITY & AUDIT LOGS */}
        {activeTab === 'security' && (
          <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-500" /> Platform Audit Trail & Security Logs
            </h3>

            <div className="space-y-3">
              {AUDIT_LOGS.map(log => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 mr-2">[{log.action}]</span>
                    <span className="text-slate-800 dark:text-slate-200">{log.detail}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    <span>{log.user}</span> • <span>{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-[#0A1738] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" /> Platform Configuration & Gateway Controls
            </h3>

            <div className="space-y-4 text-xs max-w-xl">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Standard SaaS Platform Commission (%)</label>
                <input type="number" defaultValue={12} className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-extrabold" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Razorpay Live Gateway Merchant ID</label>
                <input type="text" defaultValue="rzp_live_qd_88991122" className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono" />
              </div>

              <button onClick={() => showToast('System settings saved', 'success')} className="px-6 py-3 bg-blue-600 text-white font-extrabold rounded-xl shadow-glow">
                Save Platform Settings
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
