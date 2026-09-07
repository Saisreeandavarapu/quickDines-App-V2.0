import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { OTPInput } from './OTPInput';
import { SuccessState } from './SuccessState';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';

export const CustomerOTPPage = () => {
  const navigate = useNavigate();
  const { pendingPhone, loginCustomerSuccess, showToast } = useApp();

  const targetPhone = pendingPhone || "+91 98765 43210";
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyOTP = async (otpCode) => {
    setError(null);
    setIsVerifying(true);

    try {
      const res = await authService.verifyCustomerOTP(targetPhone, otpCode);
      if (res.success) {
        setIsVerified(true);
        setTimeout(() => {
          loginCustomerSuccess(res.user);
          navigate('/dashboard');
        }, 1200);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    try {
      await authService.sendCustomerOTP(targetPhone);
      showToast("A new 6-digit OTP code has been sent (Demo OTP: 123456)", "info");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Verify Number" subtitle="OTP Verification">
      {isVerified ? (
        <SuccessState
          title="You're Verified ✓"
          message="Authentication complete. Connecting you to your journey menu."
          buttonText="Continue to Customer Dashboard"
          onAction={() => navigate('/dashboard')}
        />
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
          
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-[#2563EB] tracking-widest">
              Security Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
              Verify your number
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Enter the 6-digit one-time password sent to <strong className="text-slate-900 dark:text-white font-mono">{targetPhone}</strong> (Demo OTP: <span className="text-[#2563EB] font-bold">123456</span>).
            </p>
          </div>

          <OTPInput
            length={6}
            phone={targetPhone}
            onComplete={handleVerifyOTP}
            onResend={handleResend}
            onChangeNumber={() => navigate('/login')}
            error={error}
            isVerifying={isVerifying}
          />

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400 font-semibold">
              Trouble logging in? Contact QuickDines Passenger Help desk at 1800-420-9999
            </span>
          </div>

        </div>
      )}
    </AuthLayout>
  );
};
