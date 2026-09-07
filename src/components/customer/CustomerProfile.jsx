import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, CreditCard, Bell, ShieldCheck, Star, Heart, LogOut, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerProfile = () => {
  const navigate = useNavigate();
  const { bus, switchRole, showToast } = useApp();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [foodRating, setFoodRating] = useState(5);
  const [restaurantRating, setRestaurantRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmitRating = (e) => {
    e.preventDefault();
    setShowRatingModal(false);
    showToast('Thank you for rating your QuickDines transit dining experience!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] p-4 sm:p-6 pb-28">
      <div className="max-w-xl mx-auto space-y-5">
        
        {/* Profile Header */}
        <div className="bg-[#0B1F5E] text-white p-5 sm:p-6 rounded-3xl shadow-card flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 border-2 border-white/30 flex items-center justify-center font-extrabold text-xl sm:text-2xl shadow-subtle flex-shrink-0">
            RS
          </div>
          <div className="flex-1">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-300">Transit Passenger</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">{bus.passengerName}</h2>
            <p className="text-xs text-blue-200">{bus.passengerPhone}</p>
          </div>
        </div>

        {/* Profile Options List (Clean non-overlapping flex layout) */}
        <div className="bg-white dark:bg-[#0A1738] p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-subtle space-y-3 text-xs">
          
          <button
            onClick={() => setShowRatingModal(true)}
            className="w-full p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/40 flex items-center justify-between text-amber-900 dark:text-amber-300 font-extrabold transition active:scale-95"
          >
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 flex-shrink-0" />
              <span>Rate Your Last Transit Meal</span>
            </div>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="font-bold text-slate-800 dark:text-white">Personal Information</span>
            </div>
            <span className="text-slate-500 font-medium sm:text-right pl-6 sm:pl-0">Rahul Sharma</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="font-bold text-slate-800 dark:text-white">Saved Payment Methods</span>
            </div>
            <span className="text-slate-500 font-medium sm:text-right pl-6 sm:pl-0">UPI (Google Pay)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="font-bold text-slate-800 dark:text-white">Dietary Preferences</span>
            </div>
            <span className="text-slate-500 font-medium sm:text-right pl-6 sm:pl-0">Non-Veg / Spicy</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span className="font-bold text-slate-800 dark:text-white">Privacy & Terms</span>
            </div>
            <span className="text-slate-500 font-medium sm:text-right pl-6 sm:pl-0">v2.4 Policy</span>
          </div>

          <button
            onClick={() => {
              switchRole('login');
              navigate('/login');
            }}
            className="w-full p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-extrabold flex items-center justify-center gap-2 border border-red-200 dark:border-red-900/40 active:scale-95 transition mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of QuickDines</span>
          </button>

        </div>

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0A1738] w-full max-w-md rounded-3xl p-6 shadow-floating border border-slate-200 dark:border-white/10 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                <h3 className="text-base font-extrabold text-[#0B1F5E] dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Rate QuickDines Experience
                </h3>
                <button onClick={() => setShowRatingModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitRating} className="space-y-4 text-xs">
                
                <div className="space-y-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">Food Quality & Taste</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFoodRating(star)}
                        className={`p-2 rounded-xl transition ${star <= foodRating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
                      >
                        <Star className={`w-6 h-6 ${star <= foodRating ? 'fill-amber-400' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">Seat Delivery Speed</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setDeliveryRating(star)}
                        className={`p-2 rounded-xl transition ${star <= deliveryRating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
                      >
                        <Star className={`w-6 h-6 ${star <= deliveryRating ? 'fill-amber-400' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Optional Journey Feedback
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the hot biryani and seat delivery..."
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-navy-gradient text-white font-extrabold text-xs rounded-xl shadow-glow transition active:scale-95"
                >
                  Submit Ratings & Feedback
                </button>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
