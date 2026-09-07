import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Globe, 
  Utensils, 
  Flame, 
  AlertTriangle, 
  CreditCard, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Camera
} from 'lucide-react';
import { FormField } from './FormField';
import { ProgressIndicator } from './ProgressIndicator';
import { PhoneInput } from './PhoneInput';

export const RegistrationForm = ({ onSubmitSuccess, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // 18 Fields Total State
  const [formData, setFormData] = useState({
    // Step 1: Personal (1-5)
    firstName: "Rahul",
    lastName: "Sharma",
    mobileNumber: "9876543210",
    email: "rahul.sharma@example.com",
    dob: "1996-08-14",

    // Step 2: Profile (6-10)
    gender: "Male",
    profilePhoto: "avatar-1",
    preferredLanguage: "English",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",

    // Step 3: Journey Preferences (11-15)
    favoriteFoodType: "South Indian",
    dietaryPreference: "Non-Vegetarian",
    preferredMeal: "Dinner",
    spicePreference: "Medium",
    foodAllergies: "None",

    // Step 4: Account & Preferences (16-18)
    paymentMethod: "UPI (Google Pay / PhonePe)",
    emergencyName: "Suresh Sharma",
    emergencyPhone: "9765432109",
    agreeTerms: true,
    agreePrivacy: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (formData.mobileNumber.replace(/\D/g, '').length < 10) newErrors.mobileNumber = "Valid 10-digit mobile number required";
      if (!formData.email.includes('@')) newErrors.email = "Valid email address required";
      if (!formData.dob) newErrors.dob = "Date of birth required";
    }

    if (step === 2) {
      if (!formData.gender) newErrors.gender = "Please select gender";
      if (!formData.preferredLanguage) newErrors.preferredLanguage = "Please select preferred language";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
    }

    if (step === 3) {
      if (!formData.favoriteFoodType) newErrors.favoriteFoodType = "Select favorite food type";
      if (!formData.dietaryPreference) newErrors.dietaryPreference = "Select dietary preference";
      if (!formData.preferredMeal) newErrors.preferredMeal = "Select preferred meal time";
      if (!formData.spicePreference) newErrors.spicePreference = "Select spice preference";
    }

    if (step === 4) {
      if (!formData.paymentMethod) newErrors.paymentMethod = "Select preferred payment method";
      if (!formData.emergencyName.trim()) newErrors.emergencyName = "Emergency contact name required";
      if (formData.emergencyPhone.replace(/\D/g, '').length < 10) newErrors.emergencyPhone = "Valid 10-digit emergency contact phone required";
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to Terms & Conditions";
      if (!formData.agreePrivacy) newErrors.agreePrivacy = "You must agree to Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(4, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <span className="text-[10px] uppercase font-black text-[#2563EB] tracking-widest block mb-1">
          Passenger Onboarding
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
          Create Your QuickDines Account
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Personalize your transit dining experience & seat delivery preferences.
        </p>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} totalSteps={4} />

      {/* Multi-Step Form Wizard Container */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* STEP 1: PERSONAL INFORMATION (Fields 1-5) */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Rahul"
                icon={User}
                error={errors.firstName}
                required
              />
              <FormField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Sharma"
                icon={User}
                error={errors.lastName}
                required
              />
            </div>

            <PhoneInput
              value={formData.mobileNumber}
              onChange={(val) => setFormData(prev => ({ ...prev, mobileNumber: val }))}
              error={errors.mobileNumber}
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="rahul.sharma@example.com"
              icon={Mail}
              error={errors.email}
              required
            />

            <FormField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              icon={Calendar}
              error={errors.dob}
              required
            />
          </div>
        )}

        {/* STEP 2: PROFILE INFORMATION (Fields 6-10) */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* Avatar Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase tracking-wider">
                Profile Avatar Photo
              </label>
              <div className="flex items-center gap-3">
                {["avatar-1", "avatar-2", "avatar-3", "avatar-4"].map((av, idx) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, profilePhoto: av }))}
                    className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center font-bold text-xs transition ${
                      formData.profilePhoto === av
                        ? 'border-[#2563EB] bg-blue-50 dark:bg-blue-900/40 text-[#2563EB] ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-white/10 text-slate-500'
                    }`}
                  >
                    👤 {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <FormField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female", "Non-Binary", "Prefer not to say"]}
              error={errors.gender}
              required
            />

            <FormField
              label="Preferred Language"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              options={["English", "Telugu", "Hindi", "Tamil", "Kannada"]}
              icon={Globe}
              error={errors.preferredLanguage}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Visakhapatnam"
                icon={MapPin}
                error={errors.city}
                required
              />
              <FormField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Andhra Pradesh"
                icon={MapPin}
                error={errors.state}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 3: JOURNEY PREFERENCES (Fields 11-15) */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <FormField
              label="Favorite Food Cuisine"
              name="favoriteFoodType"
              value={formData.favoriteFoodType}
              onChange={handleChange}
              options={["South Indian", "North Indian", "Continental", "Fast Food", "Chinese"]}
              icon={Utensils}
              error={errors.favoriteFoodType}
              required
            />

            <FormField
              label="Dietary Preference"
              name="dietaryPreference"
              value={formData.dietaryPreference}
              onChange={handleChange}
              options={["Vegetarian", "Non-Vegetarian", "Vegan", "Jain"]}
              error={errors.dietaryPreference}
              required
            />

            <FormField
              label="Preferred Journey Meal Period"
              name="preferredMeal"
              value={formData.preferredMeal}
              onChange={handleChange}
              options={["Morning Breakfast", "Highway Lunch", "Mid-day Snacks", "Executive Dinner"]}
              error={errors.preferredMeal}
              required
            />

            <FormField
              label="Spice Preference"
              name="spicePreference"
              value={formData.spicePreference}
              onChange={handleChange}
              options={["Mild", "Medium", "Spicy (Andhra Style)"]}
              icon={Flame}
              error={errors.spicePreference}
              required
            />

            <FormField
              label="Food Allergies / Notes"
              name="foodAllergies"
              value={formData.foodAllergies}
              onChange={handleChange}
              options={["None", "Dairy / Lactose Intolerant", "Nuts / Peanut Allergy", "Gluten Sensitive", "Other"]}
              icon={AlertTriangle}
            />
          </div>
        )}

        {/* STEP 4: ACCOUNT & EMERGENCY (Fields 16-18 + Checkboxes) */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <FormField
              label="Preferred Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              options={[
                "UPI (Google Pay / PhonePe / Paytm)",
                "Razorpay Gateway",
                "Credit / Debit Card",
                "Net Banking",
                "Digital Wallets"
              ]}
              icon={CreditCard}
              error={errors.paymentMethod}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                label="Emergency Contact Name"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                placeholder="Suresh Sharma"
                icon={User}
                error={errors.emergencyName}
                required
              />
              <FormField
                label="Emergency Contact Phone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                placeholder="9765432109"
                icon={Phone}
                error={errors.emergencyPhone}
                required
              />
            </div>

            {/* Terms & Privacy Checkboxes */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/10">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-blue-500 w-4 h-4"
                />
                <span>I agree to QuickDines <a href="#terms" className="text-[#2563EB] underline font-bold">Terms & Conditions</a> for highway food delivery.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 select-none">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-blue-500 w-4 h-4"
                />
                <span>I agree to QuickDines <a href="#privacy" className="text-[#2563EB] underline font-bold">Privacy Policy</a> & passenger data security.</span>
              </label>

              {errors.agreeTerms && (
                <p className="text-xs text-red-600 font-semibold">⚠️ {errors.agreeTerms}</p>
              )}
            </div>
          </div>
        )}

        {/* Wizard Controls Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10 gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 h-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-200 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 h-12 text-slate-400 font-semibold text-xs hover:text-slate-600 transition"
            >
              Cancel
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 h-12 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-glow transition flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <span>Next: Step 0{currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-glow transition flex items-center gap-2 cursor-pointer ml-auto"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Create QuickDines Account</span>
                </>
              )}
            </button>
          )}
        </div>

      </form>

    </div>
  );
};
