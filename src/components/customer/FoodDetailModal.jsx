import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ShieldCheck, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FoodDetailModal = ({ foodItem, onClose }) => {
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!foodItem) return null;

  const toggleAddOn = (addOnName) => {
    if (selectedAddOns.includes(addOnName)) {
      setSelectedAddOns(selectedAddOns.filter(a => a !== addOnName));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnName]);
    }
  };

  const calculateAddOnsTotal = () => {
    if (!foodItem.addOns) return 0;
    return foodItem.addOns.reduce((sum, ao) => {
      return selectedAddOns.includes(ao.name) ? sum + ao.price : sum;
    }, 0);
  };

  const itemUnitPrice = foodItem.price + calculateAddOnsTotal();
  const totalPrice = itemUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(foodItem, quantity, selectedAddOns);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-[#0A1738] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-floating border border-slate-200 dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 max-h-[90vh] flex flex-col">
        
        {/* Modal Image Header */}
        <div className="relative h-56 bg-slate-100 flex-shrink-0">
          <img src={foodItem.image} alt={foodItem.name} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" /> Prep: {foodItem.prepTimeMins} mins
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          <div>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border ${
                foodItem.isVeg 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {foodItem.isVeg ? '100% Pure Veg' : 'Non-Veg Gourmet'}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{foodItem.restaurantName}</span>
            </div>

            <h3 className="text-xl font-extrabold text-[#0B1F5E] dark:text-white mt-1">
              {foodItem.name}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {foodItem.description}
            </p>
          </div>

          {/* Add-ons Section */}
          {foodItem.addOns && foodItem.addOns.length > 0 && (
            <div className="space-y-2 border-t border-slate-100 dark:border-white/10 pt-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Customize / Optional Add-ons
              </h4>

              <div className="space-y-2">
                {foodItem.addOns.map(ao => {
                  const isChecked = selectedAddOns.includes(ao.name);
                  return (
                    <label
                      key={ao.id}
                      onClick={() => toggleAddOn(ao.name)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-white font-bold'
                          : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{ao.name}</span>
                      </div>
                      <span className="font-extrabold">+₹{ao.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-4">
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Quantity
            </span>

            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-bold shadow-subtle hover:bg-slate-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-base font-extrabold w-6 text-center text-slate-800 dark:text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-bold shadow-subtle hover:bg-slate-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-slate-50 dark:bg-[#071535] border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Price</span>
            <span className="text-xl font-extrabold text-[#0B1F5E] dark:text-white">₹{totalPrice}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 h-12 bg-navy-gradient text-white font-extrabold text-sm rounded-2xl shadow-glow hover:opacity-95 transition flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Transit Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
