import React from 'react';
import { Logo } from './Logo';
import { Download, Printer, QrCode, Bus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QRGenerator = ({ busNumber = "AP-28-Z-1234", route = "Visakhapatnam → Hyderabad", qrId = "QD-889901" }) => {
  const { showToast } = useApp();

  const handleDownload = () => {
    showToast(`Downloaded QR Code SVG asset for Bus ${busNumber}`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#0B1F5E] text-white p-6 rounded-3xl border border-white/20 shadow-floating max-w-sm mx-auto text-center space-y-4 relative overflow-hidden">
      
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 pointer-events-none"></div>

      <Logo size="md" lightMode={true} showSubtitle={true} className="justify-center" />

      <div className="bg-white p-4 rounded-2xl shadow-card inline-block border-4 border-blue-600/30">
        <img 
          src="/logo.png" 
          alt="QuickDines Bus QR Code" 
          className="w-44 h-44 object-contain rounded-xl" 
        />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block">Scan Seat QR to Order</span>
        <h4 className="text-xl font-extrabold text-white">{busNumber}</h4>
        <p className="text-xs text-blue-200">{route}</p>
        <span className="text-[10px] font-mono text-slate-400 block pt-1">QR ID: {qrId}</span>
      </div>

      <div className="flex gap-2 pt-2 border-t border-white/10">
        <button
          onClick={handleDownload}
          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" /> Download SVG
        </button>

        <button
          onClick={handlePrint}
          className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" /> Print Sticker
        </button>
      </div>

    </div>
  );
};
