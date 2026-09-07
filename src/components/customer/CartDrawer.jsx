import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Bus, 
  ShoppingBag, 
  CheckSquare, 
  Square,
  Sparkles,
  Info,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Individual Cart Item Card with Swipe Right to Delete
const CartItemCard = ({ item, updateCartQuantity, toggleCartAddOn, removeFromCart }) => {
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStartX;
    if (isOpen) {
      const newOffset = Math.max(0, Math.min(84, 84 + diffX));
      setDragOffsetX(newOffset);
    } else {
      const newOffset = Math.max(0, Math.min(84, diffX));
      setDragOffsetX(newOffset);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffsetX > 35) {
      setIsOpen(true);
      setDragOffsetX(84);
    } else {
      setIsOpen(false);
      setDragOffsetX(0);
    }
    setTouchStartX(null);
  };

  const toggleSwipeState = (e) => {
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
      setDragOffsetX(0);
    } else {
      setIsOpen(true);
      setDragOffsetX(84);
    }
  };

  const hasAddOns = item.food.addOns && item.food.addOns.length > 0;
  const defaultAddOnName = hasAddOns ? item.food.addOns[0].name : "Add Extra Topping";
  const isAddOnChecked = item.selectedAddOns && item.selectedAddOns.includes(defaultAddOnName);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-subtle border border-slate-200/80 dark:border-white/10 bg-red-600">
      
      {/* Red Delete Background revealed when swiped right */}
      <div 
        onClick={() => removeFromCart(item.food.id)}
        className="absolute inset-y-0 left-0 bg-red-600 text-white flex items-center justify-center gap-1.5 font-extrabold text-xs px-4 cursor-pointer transition-colors z-0 w-24 rounded-l-3xl active:bg-red-700"
        style={{ width: `${Math.max(84, dragOffsetX)}px` }}
      >
        <Trash2 className="w-5 h-5 stroke-[2.5]" />
        <span className="text-[11px] uppercase tracking-wider font-extrabold">Delete</span>
      </div>

      {/* Sliding Main Card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(${dragOffsetX}px)` }}
        className="bg-white dark:bg-[#0A1738] p-3.5 sm:p-4 rounded-3xl relative z-10 flex items-center gap-3.5 transition-transform duration-200 ease-out select-none"
      >
        {/* Swipe Toggle / Remove Handle Button */}
        <button
          onClick={toggleSwipeState}
          className={`absolute top-3 right-3 p-1.5 rounded-full transition ${
            isOpen ? 'text-red-600 bg-red-50 dark:bg-red-950/40' : 'text-slate-300 hover:text-red-500'
          }`}
          title={isOpen ? "Close delete action" : "Swipe right or click to delete"}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: Circular Image + Pill Quantity Selector */}
        <div className="flex flex-col items-center flex-shrink-0 w-20 sm:w-24">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-700 shadow-md bg-slate-100 flex-shrink-0">
            <img src={item.food.image} alt={item.food.name} className="w-full h-full object-cover" />
          </div>

          <div className="bg-slate-100 dark:bg-slate-800/90 rounded-full px-2 py-1 flex items-center justify-between gap-1 mt-2 shadow-inner border border-slate-200/60 dark:border-white/10 w-full">
            <button
              onClick={() => updateCartQuantity(item.food.id, -1)}
              className="w-6 h-6 rounded-full bg-white dark:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-extrabold text-xs shadow-subtle hover:bg-slate-200 transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-extrabold text-xs text-slate-800 dark:text-white select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => updateCartQuantity(item.food.id, 1)}
              className="w-6 h-6 rounded-full bg-white dark:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-extrabold text-xs shadow-subtle hover:bg-slate-200 transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Details & Checkbox */}
        <div className="flex-1 min-w-0 pr-4">
          <h4 className="text-xs sm:text-sm font-extrabold text-[#0B1F5E] dark:text-white leading-tight line-clamp-1 pr-4">
            {item.food.name}
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {item.food.category ? `${item.food.category.toUpperCase()} • ` : ''}{item.food.description}
          </p>
          <div className="text-xs sm:text-sm font-black text-[#0B1F5E] dark:text-white mt-1">
            ₹{item.itemTotal}
          </div>

          {/* Add-on Checkbox */}
          <div
            onClick={() => toggleCartAddOn(item.food.id, defaultAddOnName)}
            className="flex items-center gap-1.5 mt-1.5 cursor-pointer text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 select-none w-fit"
          >
            {isAddOnChecked ? (
              <CheckSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            ) : (
              <Square className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            )}
            <span className={isAddOnChecked ? "text-blue-900 dark:text-blue-300 font-bold" : ""}>
              {hasAddOns ? `${defaultAddOnName} (+₹${item.food.addOns[0].price})` : "Add Extra Topping"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export const CartDrawer = () => {
  const { 
    cart, 
    updateCartQuantity, 
    toggleCartAddOn,
    removeFromCart, 
    clearCart, 
    bus, 
    setActiveCustomerTab 
  } = useApp();

  const [showBillDetails, setShowBillDetails] = useState(false);

  const subtotal = cart.reduce((acc, curr) => acc + curr.itemTotal, 0);
  const tax = subtotal * 0.05;
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const grandTotal = subtotal + tax + deliveryFee;

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#071535] p-4 sm:p-6 pb-36 font-sans">
      <div className="max-w-xl mx-auto space-y-4">
        
        {/* Responsive Header matching user screenshot */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveCustomerTab('menu')}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 transition"
              aria-label="Back to menu"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0B1F5E] dark:text-white">
                Your Transit Cart
              </h2>
              <p className="text-xs text-slate-500">Bus {bus.busNumber} • Seat {bus.seatNumber}</p>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          )}
        </div>

        {/* Delivery Location Banner */}
        <div className="bg-[#0B1F5E] text-white p-3.5 sm:p-4 rounded-2xl shadow-card flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-blue-300 flex-shrink-0">
              <Bus className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-bold block">Delivery Stop Point</span>
              <span className="font-extrabold text-white text-xs sm:text-sm line-clamp-1">{bus.nextStop}</span>
            </div>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold text-[10px] border border-emerald-400/30 whitespace-nowrap ml-2">
            ETA {bus.etaMinutes}m
          </span>
        </div>

        {/* Swipe Right Feature Hint Banner */}
        {cart.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 px-3.5 py-2 rounded-xl flex items-center justify-between text-[11px] text-blue-800 dark:text-blue-200 font-semibold">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Swipe item right to reveal Delete option</span>
            </div>
            <span className="text-[10px] text-blue-500 dark:text-blue-400 uppercase font-bold">Touch or Drag</span>
          </div>
        )}

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="bg-white dark:bg-[#0A1738] p-8 rounded-3xl text-center border border-slate-200 dark:border-white/10 space-y-4 my-8">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-700 dark:text-slate-200">Your cart is currently empty</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">Browse our executive highway menu and add fresh meals for your journey.</p>
            <button
              onClick={() => setActiveCustomerTab('menu')}
              className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-subtle hover:bg-blue-700 transition"
            >
              Browse Journey Menu
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <CartItemCard
                key={item.food.id}
                item={item}
                updateCartQuantity={updateCartQuantity}
                toggleCartAddOn={toggleCartAddOn}
                removeFromCart={removeFromCart}
              />
            ))}

            {/* Expandable Bill Summary Card */}
            <div className="bg-white dark:bg-[#0A1738] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3 text-xs shadow-subtle">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <h4 className="font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Payment Summary
                </h4>
                <button
                  onClick={() => setShowBillDetails(!showBillDetails)}
                  className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline"
                >
                  {showBillDetails ? "Hide Breakdown" : "View Breakdown"}
                </button>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹{subtotal.toFixed(2)}</span>
              </div>

              {showBillDetails && (
                <>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Taxes & GST (5%)</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Seat Packaging & Handling</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">₹{deliveryFee.toFixed(2)}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between text-sm font-extrabold text-[#0B1F5E] dark:text-white border-t border-slate-100 dark:border-white/5 pt-2.5">
                <span>Grand Total</span>
                <span className="text-base text-blue-600 dark:text-blue-400">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Floating Sticky Bottom Bar for Mobile & Desktop */}
      {cart.length > 0 && (
        <div className="fixed bottom-14 md:bottom-6 left-0 right-0 z-30 p-3 sm:p-4 max-w-xl mx-auto pointer-events-none">
          <div className="bg-[#0B1F5E] text-white p-4 rounded-3xl shadow-floating border border-blue-400/30 flex items-center justify-between gap-4 pointer-events-auto">
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-bold block">Total Bill</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">₹{grandTotal.toFixed(0)}</span>
            </div>

            <button
              onClick={() => setActiveCustomerTab('checkout')}
              className="bg-white text-[#0B1F5E] hover:bg-blue-50 font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-full shadow-lg transition flex items-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Place Order</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
