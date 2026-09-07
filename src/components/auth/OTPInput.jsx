import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Lock, ShieldCheck } from 'lucide-react';

export const OTPInput = ({ 
  length = 6, 
  onComplete, 
  onResend, 
  onChangeNumber, 
  phone = "+91 98765 43210",
  error = null,
  isVerifying = false
}) => {
  const [digits, setDigits] = useState(Array(length).fill(""));
  const [timer, setTimer] = useState(28);
  const inputRefs = useRef([]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    const char = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    // Auto-advance focus to next field
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check completion
    const fullOtp = newDigits.join("");
    if (fullOtp.length === length) {
      onComplete(fullOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pastedData) {
      const newDigits = Array(length).fill("");
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i];
      }
      setDigits(newDigits);
      if (pastedData.length === length) {
        onComplete(pastedData);
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  const handleResendClick = () => {
    if (timer === 0) {
      setTimer(28);
      setDigits(Array(length).fill(""));
      onResend && onResend();
    }
  };

  return (
    <div className="space-y-5 w-full">
      
      {/* Target Phone display */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#2563EB]" />
          <span>OTP sent to <strong className="text-slate-900 dark:text-white font-mono font-bold">{phone}</strong></span>
        </div>
        <button
          type="button"
          onClick={onChangeNumber}
          className="text-xs text-[#2563EB] font-bold hover:underline"
        >
          Change
        </button>
      </div>

      {/* 6 Digit Input Boxes */}
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={el => inputRefs.current[idx] = el}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            disabled={isVerifying}
            className={`w-11 h-13 sm:w-13 sm:h-14 rounded-2xl border text-xl sm:text-2xl font-black text-center bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none transition duration-200 shadow-subtle ${
              error
                ? 'border-red-500 ring-2 ring-red-500/20'
                : digit
                ? 'border-[#2563EB] bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-slate-200 dark:border-white/10 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20'
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 font-semibold text-center flex items-center justify-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}

      {/* Timer & Resend */}
      <div className="flex items-center justify-between text-xs pt-1">
        <span className="text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Valid for limited time</span>
        </span>

        {timer > 0 ? (
          <span className="text-slate-500 font-mono font-bold">
            Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResendClick}
            className="text-[#2563EB] font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resend OTP</span>
          </button>
        )}
      </div>

    </div>
  );
};
