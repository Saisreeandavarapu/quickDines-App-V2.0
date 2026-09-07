import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { PhoneInput } from './PhoneInput';
import { JourneyCard } from './JourneyCard';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';

export const CustomerLoginPage = () => {
  const navigate = useNavigate();
  const { journeyContext, setPendingPhone } = useApp();

  const [phone, setPhone] = useState("9876543210");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await authService.sendCustomerOTP(phone);
      if (res.success) {
        setPendingPhone(res.phone);
        navigate('/verify-otp');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Customer Login" subtitle="Mobile Authentication">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
        
        {/* Title */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black text-[#2563EB] tracking-widest">
            Passenger Access
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
            Welcome to QuickDines
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Enter your mobile number to receive a one-time password (OTP).
          </p>
        </div>

        {/* Journey Card Context */}
        <JourneyCard 
          journey={journeyContext} 
          onChangeJourney={() => navigate('/scan')}
        />

        {/* Login Form */}
        <form onSubmit={handleSendOTP} className="space-y-4">
          <PhoneInput
            value={phone}
            onChange={setPhone}
            error={error}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-glow hover:shadow-floating transition duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loading ? (
              <span>Sending OTP...</span>
            ) : (
              <>
                <span>Send OTP</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Registration CTA Link */}
        <div className="bg-blue-50/60 dark:bg-blue-900/20 p-3 rounded-2xl border border-blue-200 dark:border-blue-800/40 flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-300 font-medium">New passenger? Complete 4-step profile</span>
          <button
            onClick={() => navigate('/register')}
            className="text-[#2563EB] font-bold hover:underline flex items-center gap-1"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>
        </div>

        {/* Terms and Privacy Text */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400 font-medium">
            By continuing, you agree to our <a href="#terms" className="text-[#2563EB] underline font-semibold">Terms & Conditions</a> and <a href="#privacy" className="text-[#2563EB] underline font-semibold">Privacy Policy</a>.
          </p>
        </div>

      </div>
    </AuthLayout>
  );
};
