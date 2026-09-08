import React, { useState } from 'react';
import { Headphones, AlertTriangle, XCircle, X } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const SupportCard = () => {
  const { showToast } = useApp();
  const [activeModal, setActiveModal] = useState(null);

  const handleSupportAction = (action) => {
    setActiveModal(null);
    if (action === 'support') {
      showToast('Connecting you to QuickDines Passenger Support desk...', 'info');
    } else if (action === 'delay') {
      showToast('Delay report logged. Dispatch team alerted.', 'warning');
    } else if (action === 'cancel') {
      showToast('Cancellation request submitted for processing.', 'error');
    }
  };

  return (
    <div className="bg-slate-100/70 dark:bg-slate-900/40 rounded-3xl p-4 border border-slate-200/60 dark:border-white/5 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Headphones className="w-3.5 h-3.5 text-slate-500" />
          NEED HELP WITH YOUR ORDER?
        </span>
        <span className="text-[10px] text-slate-400 font-medium">QuickDines 24/7 Desk</span>
      </div>

      {/* Secondary Subtle Actions Row */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <button
          onClick={() => handleSupportAction('support')}
          className="p-2.5 rounded-2xl bg-white dark:bg-[#0A1738] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold transition text-center flex flex-col items-center gap-1 active:scale-95 cursor-pointer"
        >
          <Headphones className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
          <span className="text-[10px] sm:text-xs">Contact Desk</span>
        </button>

        <button
          onClick={() => setActiveModal('delay')}
          className="p-2.5 rounded-2xl bg-white dark:bg-[#0A1738] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold transition text-center flex flex-col items-center gap-1 active:scale-95 cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] sm:text-xs">Report Delay</span>
        </button>

        <button
          onClick={() => setActiveModal('cancel')}
          className="p-2.5 rounded-2xl bg-white dark:bg-[#0A1738] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold transition text-center flex flex-col items-center gap-1 active:scale-95 cursor-pointer"
        >
          <XCircle className="w-4 h-4 text-red-500" />
          <span className="text-[10px] sm:text-xs">Cancel Order</span>
        </button>
      </div>

      {/* Modal Dialog for Delay / Cancellation */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1738] border border-white/20 rounded-3xl p-6 max-w-sm w-full space-y-4 text-white shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-extrabold flex items-center gap-2">
              {activeModal === 'delay' ? <AlertTriangle className="w-5 h-5 text-amber-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
              <span>{activeModal === 'delay' ? 'Report Transit Delay' : 'Request Cancellation'}</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeModal === 'delay' 
                ? 'Is your bus running delayed or route changed? Alerting our dispatch runner will reschedule your seat drop at the next halt.'
                : 'Are you sure you want to cancel order #QD102948? Full refund will be processed back to original UPI payment.'}
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Go Back
              </button>
              <button
                onClick={() => handleSupportAction(activeModal)}
                className={`flex-1 py-2.5 text-white font-extrabold text-xs rounded-xl ${
                  activeModal === 'delay' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm {activeModal === 'delay' ? 'Report' : 'Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
