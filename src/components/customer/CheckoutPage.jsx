import React, { useState } from 'react';
import { 
  Bus, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  Wallet, 
  ArrowLeft, 
  CheckCircle,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CheckoutPage = () => {
  const { cart, bus, placeOrder, setActiveCustomerTab } = useApp();

  const [name, setName] = useState(bus.passengerName);
  const [phone, setPhone] = useState(bus.passengerPhone);
  const [seatNumber, setSeatNumber] = useState(bus.seatNumber);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI (Google Pay)');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, curr) => acc + curr.itemTotal, 0);
  const tax = subtotal * 0.05;
  const deliveryFee = 20;
  const grandTotal = subtotal + tax + deliveryFee;

  const paymentMethods = [
    { id: 'UPI (Google Pay)', label: 'UPI Payments (GPay / PhonePe / Paytm)', icon: Smartphone, popular: true },
    { id: 'Razorpay Gateway', label: 'Razorpay Secure Gateway', icon: ShieldCheck },
    { id: 'Credit / Debit Card', label: 'Credit Card / Debit Card', icon: CreditCard },
    { id: 'Net Banking', label: 'Net Banking (HDFC, ICICI, SBI)', icon: Building },
    { id: 'Wallet Payments', label: 'Digital Wallets (Paytm, Mobikwik)', icon: Wallet },
  ];

  const handlePayAndPlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      placeOrder({
        name,
        phone,
        seatNumber,
        paymentMethod: selectedPaymentMethod
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] p-4 sm:p-6 pb-28">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveCustomerTab('cart')}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-extrabold text-[#0B1F5E] dark:text-white">Secure Transit Checkout</h2>
            <p className="text-xs text-slate-500">Order verification & seat dispatch setup</p>
          </div>
        </div>

        <form onSubmit={handlePayAndPlaceOrder} className="space-y-6">
          
          {/* Section 1: Customer Details */}
          <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <h3 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Passenger Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number (SMS Updates)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Journey & Seat Details */}
          <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <h3 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Transit & Seat Dispatch Point</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Bus Number</span>
                <span className="font-extrabold text-[#0B1F5E] dark:text-white text-sm mt-0.5 block">{bus.busNumber}</span>
                <span className="text-[10px] text-slate-400">{bus.operator}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Your Bus Seat</span>
                <input
                  type="text"
                  value={seatNumber}
                  onChange={e => setSeatNumber(e.target.value)}
                  className="w-full h-8 px-2 mt-1 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-extrabold text-sm focus:outline-none"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Upcoming Stop</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs mt-0.5 block line-clamp-1">{bus.nextStop}</span>
                <span className="text-[10px] text-emerald-500">ETA {bus.etaMinutes} mins</span>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="bg-white dark:bg-[#0A1738] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-4">
            <h3 className="text-sm font-extrabold text-[#0B1F5E] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Select Payment Gateway</span>
            </h3>

            <div className="space-y-2">
              {paymentMethods.map(pm => {
                const Icon = pm.icon;
                const isSelected = selectedPaymentMethod === pm.id;
                return (
                  <label
                    key={pm.id}
                    onClick={() => setSelectedPaymentMethod(pm.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs cursor-pointer transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-white font-extrabold ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{pm.label}</span>
                    </div>

                    {pm.popular && (
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                        Instant 1-Tap
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Order Summary & Final Pay CTA */}
          <div className="bg-[#0B1F5E] text-white p-6 rounded-3xl shadow-floating border border-blue-400/30 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-200">Total Payable Amount:</span>
              <span className="text-2xl font-extrabold text-white">₹{grandTotal.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base rounded-2xl shadow-glow transition flex items-center justify-center gap-2 border border-emerald-400/40"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{grandTotal.toFixed(2)} & Place Order</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit Encrypted Payment • QuickDines Refund Guarantee</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
