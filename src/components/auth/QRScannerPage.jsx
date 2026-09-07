import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Key,
  ShieldCheck,
  Bus,
  RefreshCw,
  Clock
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';

export const QRScannerPage = () => {
  const navigate = useNavigate();
  const { connectJourneyFromQR } = useApp();

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [showManualModal, setShowManualModal] = useState(false);
  const [scannedJourney, setScannedJourney] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const videoRef = useRef(null);

  // Initialize browser camera stream if requested
  const startCamera = async () => {
    setCameraError(null);
    setErrorMsg(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } else {
        setCameraError("Camera access is not supported on this browser.");
      }
    } catch (err) {
      setCameraError("Camera permission was denied or camera is unavailable. You can enter the QR code manually.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Simulate scanning QR code
  const handleSimulateScan = async (code = "QD-BUS-1024") => {
    setIsScanning(true);
    setErrorMsg(null);
    try {
      const res = await authService.scanQRCode(code);
      if (res.success) {
        setScannedJourney(res.journey);
        connectJourneyFromQR(res.journey);
        stopCamera();
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsScanning(false);
    }
  };

  const handleContinueToGetStarted = () => {
    navigate('/get-started');
  };

  return (
    <div className="min-h-screen bg-[#0B1F5E] text-white flex flex-col justify-between p-4 sm:p-6 font-sans selection:bg-[#2563EB] selection:text-white">

      {/* Top Header */}
      <header className="w-full max-w-lg mx-auto flex items-center justify-between py-3 border-b border-white/10">
        <Logo size="md" lightMode={true} showSubtitle={true} />
        <div className="flex items-center gap-1.5 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30 text-xs font-bold text-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Bus Entry Scanner</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-lg mx-auto my-auto py-6 space-y-6">

        {/* Title Text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Scan Your QuickDines QR
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 font-medium max-w-xs mx-auto">
            Your journey. Your food. One scan. Connect to the menu available on your bus.
          </p>
        </div>

        {/* Successful Scan Card Overlay */}
        {scannedJourney ? (
          <div className="bg-[#0A1738] p-6 rounded-3xl border-2 border-emerald-400/50 shadow-floating space-y-5 text-center animate-in zoom-in-95 duration-400">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="bg-emerald-500/20 text-emerald-300 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
                ✓ BUS CONNECTED
              </span>
              <h3 className="text-xl font-extrabold text-white pt-1">
                You're connected to your journey
              </h3>
            </div>

            {/* Journey Details Box */}
            <div className="bg-[#0B1F5E] p-4 rounded-2xl border border-blue-400/30 text-xs text-left space-y-2.5">
              <div className="flex items-center justify-between text-blue-200">
                <span>Bus Code: <strong className="text-white font-mono font-bold">{scannedJourney.busNumber}</strong></span>
                <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md font-bold text-[10px]">
                  Seat {scannedJourney.seatNumber}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-extrabold text-white border-t border-white/10 pt-2">
                <span>{scannedJourney.origin}</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
                <span>{scannedJourney.destination}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-blue-200 border-t border-white/10 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  ETA to Stop: <strong className="text-white">{scannedJourney.etaMinutes} mins</strong>
                </span>
                <span className="text-emerald-400 font-bold">3 Plazas Available</span>
              </div>
            </div>

            <button
              onClick={handleContinueToGetStarted}
              className="w-full h-14 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-glow transition flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Main Camera Frame */
          <div className="bg-[#0A1738] p-4 sm:p-6 rounded-3xl border border-white/15 shadow-floating space-y-5 relative overflow-hidden">

            {/* Realistic Camera Frame */}
            <div className="relative w-full aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden bg-black border-2 border-blue-500/40 shadow-inner flex items-center justify-center">

              {/* Actual Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
              />

              {/* Camera Overlay Grid & Bracket Frame */}
              <div className="absolute inset-0 border-2 border-white/20 pointer-events-none flex flex-col justify-between p-4">
                {/* 4 Corner Bracket Highlight Markers */}
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
                  <div className="w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
                </div>

                {/* Animated Scanning Line */}
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse shadow-glow" />

                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                  <div className="w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />
                </div>
              </div>

              {/* Text inside Scanner Frame */}
              {!cameraActive && (
                <div className="text-center p-4 space-y-2 z-10">
                  <Camera className="w-10 h-10 text-blue-400 mx-auto animate-pulse" />
                  <p className="text-xs font-bold text-white">Scan the QR code inside your bus</p>
                  <p className="text-[10px] text-slate-400">Position the QR code inside the frame</p>
                </div>
              )}
            </div>

            {/* Error Message Alert */}
            {(errorMsg || cameraError) && (
              <div className="bg-red-950/60 border border-red-500/40 p-3 rounded-2xl text-xs text-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMsg || cameraError}</span>
              </div>
            )}

            {/* Camera Actions */}
            <div className="space-y-2.5">
              {!cameraActive ? (
                <button
                  onClick={startCamera}
                  className="w-full h-12 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-glow transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Open Camera</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span>Close Camera</span>
                </button>
              )}

              {/* Demo Fast Scan Simulator Button */}
              <button
                onClick={() => handleSimulateScan("QD-BUS-1024")}
                disabled={isScanning}
                className="w-full h-12 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isScanning ? (
                  <span>Scanning Bus QR...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Simulate Quick Bus Scan (QD-AP-1024)</span>
                  </>
                )}
              </button>

              {/* Manual Entry Secondary CTA */}
              <button
                onClick={() => setShowManualModal(true)}
                className="w-full text-center text-xs text-blue-300 hover:text-white font-bold py-1 underline transition block"
              >
                Enter QR Code Manually
              </button>
            </div>

            <p className="text-[11px] text-blue-200 text-center">
              Your QR connects you to the menu available on your journey.
            </p>
          </div>
        )}

      </main>

      {/* Manual Input Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1738] w-full max-w-sm rounded-3xl p-6 border border-white/20 shadow-floating space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-400" /> Enter Bus QR Code
              </h3>
              <button onClick={() => setShowManualModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
              placeholder="e.g. QD-BUS-1024"
              className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-white/20 text-white font-mono text-sm uppercase focus:outline-none focus:border-blue-500"
            />

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowManualModal(false)}
                className="flex-1 h-11 bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowManualModal(false);
                  handleSimulateScan(manualCode || "QD-BUS-1024");
                }}
                className="flex-1 h-11 bg-[#2563EB] text-white font-bold text-xs rounded-xl"
              >
                Connect Bus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full max-w-lg mx-auto text-center text-xs text-blue-300 py-2 border-t border-white/10">
        <span>QuickDines • Transit Dining Ecosystem © 2026</span>
      </footer>

    </div>
  );
};
