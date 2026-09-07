import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthLayout } from './AdminAuthLayout';
import { PhoneInput } from './PhoneInput';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { setPendingPhone } = useApp();

  const [phone, setPhone] = useState("9876543210");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendAdminOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await authService.sendAdminOTP(phone);
      if (res.success) {
        setPendingPhone(res.phone);
        navigate('/admin/verify-otp');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthLayout title="Admin Portal" subtitle="Secure access to your control center">
      <div className="space-y-6">
        
        <form onSubmit={handleSendAdminOTP} className="space-y-5">
          <PhoneInput
            value={phone}
            onChange={setPhone}
            error={error}
            disabled={loading}
            placeholder="Enter admin mobile number"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-glow transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loading ? (
              <span>Authenticating Administrator...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Send Administrator OTP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Indicator */}
        <div className="bg-blue-950/40 border border-blue-500/30 p-3.5 rounded-2xl text-xs text-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Enterprise Authentication</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Hardware Encrypted</span>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/login')}
            className="text-xs text-slate-400 hover:text-white underline font-medium"
          >
            Switch to Passenger Login
          </button>
        </div>

      </div>
    </AdminAuthLayout>
  );
};
