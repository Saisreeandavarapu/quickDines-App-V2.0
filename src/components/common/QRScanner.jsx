import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  RefreshCw, 
  HelpCircle, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  Bus, 
  ShieldCheck, 
  Sparkles,
  Lock
} from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const QRScanner = () => {
  const { bus, setActiveCustomerTab } = useApp();
  const navigate = useNavigate();

  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null); // null | 'denied' | 'unavailable'
  const [showManualModal, setShowManualModal] = useState(false);
  const [showHelpDrawer, setShowHelpDrawer] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scanState, setScanState] = useState('IDLE'); // 'IDLE' | 'SCANNING' | 'SUCCESS' | 'EXPIRED' | 'INVALID'

  const videoRef = useRef(null);

  // Start Camera Stream
  const startCamera = async () => {
    setIsScanning(true);
    setCameraError(null);
    setScanState('SCANNING');

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Simulate successful QR detection after 2.5s for seamless demo experience
        setTimeout(() => {
          handleScanSuccess();
        }, 2500);

      } else {
        setCameraError('unavailable');
      }
    } catch (err) {
      console.warn("Camera access fallback:", err);
      setCameraError('denied');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const handleScanSuccess = () => {
    stopCamera();
    setScanState('SUCCESS');
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      setShowManualModal(false);
      setScanState('SUCCESS');
    }
  };

  const handleProceedToMenu = () => {
    setActiveCustomerTab('menu');
    navigate('/customer/menu');
  };

  return (
    <div className="min-h-screen bg-[#071535] text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden select-none">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <Logo size="md" lightMode={true} />
        <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          SMART TRANSIT QR
        </span>
      </div>

      {/* Main Scanner Section */}
      <div className="relative z-10 my-auto max-w-md mx-auto w-full space-y-6 text-center">
        
        {scanState !== 'SUCCESS' ? (
          <>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Scan to Order</h1>
              <p className="text-xs sm:text-sm text-blue-200/80 mt-1 max-w-xs mx-auto">
                Scan the QuickDines QR code inside your bus to discover meals available for your journey.
              </p>
            </div>

            {/* Camera Scanner Reticle Frame */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-3xl overflow-hidden bg-black/60 border-2 border-blue-500/40 shadow-glow flex items-center justify-center">
              
              {/* Animated Laser Scanning Line */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-glow animate-pulse top-1/2 -translate-y-1/2 z-20"></div>
              )}

              {/* 4 Glowing Corner Indicators */}
              <div className="absolute top-3 left-3 w-7 h-7 border-t-4 border-l-4 border-blue-400 rounded-tl-xl z-20"></div>
              <div className="absolute top-3 right-3 w-7 h-7 border-t-4 border-r-4 border-blue-400 rounded-tr-xl z-20"></div>
              <div className="absolute bottom-3 left-3 w-7 h-7 border-b-4 border-l-4 border-blue-400 rounded-bl-xl z-20"></div>
              <div className="absolute bottom-3 right-3 w-7 h-7 border-b-4 border-r-4 border-blue-400 rounded-br-xl z-20"></div>

              {/* HTML5 Video Stream */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isScanning ? 'block' : 'hidden'}`}
              />

              {/* Camera Fallback / Idle Reticle Overlay */}
              {!isScanning && (
                <div className="p-6 text-center space-y-3">
                  <Camera className="w-12 h-12 text-blue-400 mx-auto animate-bounce-short" />
                  <span className="text-xs text-slate-300 block font-semibold">
                    Point camera at QuickDines QR code
                  </span>
                </div>
              )}

              {/* Camera Permission Error Overlay */}
              {cameraError && (
                <div className="absolute inset-0 bg-[#071535]/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-2 z-30">
                  <AlertCircle className="w-10 h-10 text-amber-400" />
                  <span className="text-xs font-bold text-white">Camera Access Required</span>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Please grant camera permission or use manual bus code entry below.
                  </p>
                </div>
              )}

            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 max-w-xs mx-auto">
              {!isScanning ? (
                <button
                  onClick={startCamera}
                  className="w-full h-13 bg-navy-gradient text-white font-extrabold text-sm rounded-2xl shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2 border border-white/20 active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan Bus QR Code</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="w-full h-12 bg-red-500/20 text-red-300 font-extrabold text-xs rounded-2xl border border-red-400/40 transition flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span>Stop Scanning</span>
                </button>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setShowManualModal(true)}
                  className="flex-1 h-11 bg-white/10 hover:bg-white/20 text-blue-200 font-bold text-xs rounded-xl border border-white/15 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Enter Code Manually</span>
                </button>

                <button
                  onClick={() => setShowHelpDrawer(true)}
                  className="h-11 px-3 bg-white/10 hover:bg-white/20 text-blue-200 font-bold text-xs rounded-xl border border-white/15 transition flex items-center justify-center"
                  title="How it works"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* SCANNER SUCCESS CONFIRMATION STATE */
          <div className="bg-[#0A1738] border border-blue-400/30 rounded-3xl p-6 text-left shadow-floating space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">QR Code Verified</span>
                <h3 className="text-lg font-extrabold text-white">{bus.busNumber}</h3>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Route:</span>
                <strong className="text-white">{bus.route}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Next Stop Location:</span>
                <strong className="text-white">Rajahmundry Highway Plaza</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Stop ETA:</span>
                <strong className="text-emerald-400 font-extrabold">{bus.etaMinutes} mins ({bus.arrivalTime})</strong>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-white/10 pt-2">
                <span>Available Kitchens:</span>
                <strong className="text-blue-300">3 Restaurants • 24 Items</strong>
              </div>
            </div>

            <button
              onClick={handleProceedToMenu}
              className="w-full h-13 bg-navy-gradient text-white font-extrabold text-sm rounded-2xl shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <span>Explore Available Journey Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Manual Code Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A1738] w-full max-w-sm rounded-3xl p-6 border border-white/20 shadow-floating space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-400" /> Enter Bus Code
              </h3>
              <button onClick={() => setShowManualModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Bus QR Code ID (e.g., QD-908712)
                </label>
                <input
                  type="text"
                  placeholder="QD-XXXXXX"
                  value={manualCode}
                  onChange={e => setManualCode(e.target.value.toUpperCase())}
                  className="w-full h-12 px-4 rounded-xl border border-white/20 bg-slate-900 text-white font-mono text-center font-extrabold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-glow transition"
              >
                Verify & Discover Menu
              </button>
            </form>
          </div>
        </div>
      )}

      {/* How It Works Drawer */}
      {showHelpDrawer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#0A1738] w-full max-w-md rounded-t-3xl p-6 border-t border-white/20 shadow-floating space-y-4 animate-in fade-in slide-in-from-bottom-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" /> How QuickDines Works
              </h3>
              <button onClick={() => setShowHelpDrawer(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                <p>Scan the QuickDines QR sticker printed on your bus window or seat back.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                <p>Browse fresh hot meals from verified transit kitchens at upcoming bus stops.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                <p>Pay securely. Our transit runner delivers your meal right to your seat number!</p>
              </div>
            </div>

            <button
              onClick={() => setShowHelpDrawer(false)}
              className="w-full h-11 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Footer Security */}
      <div className="relative z-10 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-4">
        <ShieldCheck className="w-4 h-4 text-blue-400" />
        <span>No App Download Needed • 100% Mobile Browser Access</span>
      </div>

    </div>
  );
};
