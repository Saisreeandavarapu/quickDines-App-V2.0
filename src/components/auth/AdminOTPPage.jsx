import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthLayout } from './AdminAuthLayout';
import { OTPInput } from './OTPInput';
import { SuccessState } from './SuccessState';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';

export const AdminOTPPage = () => {
  const navigate = useNavigate();
  const { pendingPhone, loginAdminSuccess, showToast } = useApp();

  const targetPhone = pendingPhone || "+91 98765 43210";
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyAdminOTP = async (otpCode) => {
    setError(null);
    setIsVerifying(true);

    try {
      const res = await authService.verifyAdminOTP(targetPhone, otpCode);
      if (res.success) {
        setIsVerified(true);
        setTimeout(() => {
          loginAdminSuccess(res.adminUser);
          navigate('/admin/dashboard');
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
      await authService.sendAdminOTP(targetPhone);
      showToast("A new Admin OTP code has been sent (Demo Admin OTP: 888999)", "info");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminAuthLayout title="Verify Administrator" subtitle="Control Center Security Verification">
      {isVerified ? (
        <SuccessState
          title="Authentication Successful ✓"
          message="Welcome to QuickDines Control Center."
          buttonText="Open Admin Dashboard"
          onAction={() => navigate('/admin/dashboard')}
        />
      ) : (
        <div className="space-y-6">
          
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#0F172A] dark:text-white">
              Verify administrator access
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter the 6-digit OTP sent to your registered mobile number (Demo Admin OTP: <span className="text-[#2563EB] font-bold">888999</span>).
            </p>
          </div>

          <OTPInput
            length={6}
            phone={targetPhone}
            onComplete={handleVerifyAdminOTP}
            onResend={handleResend}
            onChangeNumber={() => navigate('/admin/login')}
            error={error}
            isVerifying={isVerifying}
          />

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400 font-semibold">
              Strictly restricted to authorized QuickDines system administrators.
            </span>
          </div>

        </div>
      )}
    </AdminAuthLayout>
  );
};
