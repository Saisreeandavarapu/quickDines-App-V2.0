import React, { useState } from 'react';
import { QrCode, Plus, Download, Printer, RefreshCw, Eye, ShieldAlert, CheckCircle, X, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { QRGenerator } from '../common/QRGenerator';
import { Badge } from '../common/Badge';

export const QRManagement = () => {
  const { bus, showToast } = useApp();
  const [selectedBusForQr, setSelectedBusForQr] = useState(null);

  const qrRecords = [
    { id: "QD-889901", busNumber: "AP-28-Z-1234", operator: "Garuda Express", route: "Visakhapatnam → Hyderabad", status: "ACTIVE", created: "2026-08-01", lastScanned: "4m ago", scanCount: 3420 },
    { id: "QD-889902", busNumber: "AP-09-Y-8899", operator: "Kaveri Travels", route: "Bengaluru → Vijayawada", status: "ACTIVE", created: "2026-08-05", lastScanned: "18m ago", scanCount: 1890 },
    { id: "QD-889903", busNumber: "TS-07-UB-5544", operator: "Orange Transit", route: "Hyderabad → Visakhapatnam", status: "ACTIVE", created: "2026-08-10", lastScanned: "1h ago", scanCount: 2410 },
    { id: "QD-889904", busNumber: "AP-16-TX-9900", operator: "Morning Star", route: "Vijayawada → Tirupati", status: "INACTIVE", created: "2026-08-12", lastScanned: "2 days ago", scanCount: 420 },
  ];

  const handleDeactivate = (qrId) => {
    showToast(`QR Code ${qrId} status toggled`, 'warning');
  };

  const handleRegenerate = (qrId) => {
    showToast(`Regenerated new security token for ${qrId}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] flex flex-col md:flex-row">
      <Sidebar
        title="Super Admin Control"
        navItems={[
          { id: 'dashboard', label: 'Ecosystem KPI Overview', icon: QrCode },
          { id: 'qr', label: 'Smart QR Management', icon: QrCode, badge: '4 Active' },
        ]}
        activeTab="qr"
        onSelectTab={() => {}}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0A1738] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 dark:text-blue-400">
              Fleet QR Telematics Engine
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1F5E] dark:text-white mt-0.5">
              Bus QR Code Management
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Generate, print, and track physical QR sticker scans across 64 express buses
            </p>
          </div>

          <button
            onClick={() => setSelectedBusForQr(qrRecords[0])}
            className="px-4 py-2.5 bg-navy-gradient text-white font-extrabold text-xs rounded-2xl shadow-glow transition flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Bus QR</span>
          </button>
        </div>

        {/* QR Directory Table / Cards */}
        <div className="bg-white dark:bg-[#0A1738] p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
          <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white">
            Active Fleet QR Directory
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-3">Bus & QR ID</th>
                  <th className="p-3">Route</th>
                  <th className="p-3">Scan Velocity</th>
                  <th className="p-3">Last Scanned</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {qrRecords.map(rec => (
                  <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                    <td className="p-3">
                      <span className="font-extrabold text-[#0B1F5E] dark:text-white block">{rec.busNumber}</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">{rec.id}</span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{rec.route}</td>
                    <td className="p-3 font-extrabold text-emerald-600 dark:text-emerald-400">{rec.scanCount.toLocaleString()} scans</td>
                    <td className="p-3 text-slate-500">{rec.lastScanned}</td>
                    <td className="p-3"><Badge status={rec.status === 'ACTIVE' ? 'APPROVED' : 'REJECTED'} text={rec.status} /></td>
                    <td className="p-3 text-right flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedBusForQr(rec)}
                        className="px-2.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-subtle flex items-center gap-1 active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5" /> View QR
                      </button>

                      <button
                        onClick={() => handleRegenerate(rec.id)}
                        className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1 active:scale-95"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR Preview Modal */}
        {selectedBusForQr && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0A1738] rounded-3xl p-6 border border-white/20 shadow-floating relative max-w-sm w-full animate-in fade-in zoom-in-95">
              <button
                onClick={() => setSelectedBusForQr(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <QRGenerator
                busNumber={selectedBusForQr.busNumber}
                route={selectedBusForQr.route}
                qrId={selectedBusForQr.id}
              />
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
