import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_BUS,
  INITIAL_FOOD_ITEMS,
  INITIAL_ORDERS,
  RESTAURANTS,
  DRIVERS,
  SUPPORT_TICKETS,
  SYSTEM_STATS
} from '../mockData';
import { INITIAL_JOURNEY } from '../services/authService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Role State ('login' | 'customer' | 'restaurant' | 'driver' | 'support' | 'admin')
  const [currentRole, setCurrentRole] = useState('customer');
  const [activeCustomerTab, setActiveCustomerTab] = useState('menu'); // 'landing' | 'menu' | 'cart' | 'checkout' | 'confirmation' | 'tracking' | 'history'

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  // Authentication & Journey States
  const [journeyContext, setJourneyContext] = useState(INITIAL_JOURNEY);
  const [customerUser, setCustomerUser] = useState({
    id: "USR-102948",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    isAuthenticated: true
  });
  const [pendingPhone, setPendingPhone] = useState("");
  const [adminUser, setAdminUser] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Business Data States
  const [bus, setBus] = useState(INITIAL_BUS);
  const [foodItems, setFoodItems] = useState(INITIAL_FOOD_ITEMS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [restaurantsList, setRestaurantsList] = useState(RESTAURANTS);
  const [driversList, setDriversList] = useState(DRIVERS);
  const [supportTicketsList, setSupportTicketsList] = useState(SUPPORT_TICKETS);
  const [stats, setStats] = useState(SYSTEM_STATS);

  // Customer Cart State
  const [cart, setCart] = useState([
    {
      food: INITIAL_FOOD_ITEMS[0],
      quantity: 1,
      selectedAddOns: ["Extra Mirchi Ka Salan"],
      itemTotal: 370
    }
  ]);

  // Currently Tracked Active Order ID
  const [activeOrderId, setActiveOrderId] = useState("QD102948");

  // Toast Notifications & Header Notification Drawer
  const [toast, setToast] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Order #QD102948", message: "Kitchen started preparing your Dum Biryani", time: "2m ago", read: false, type: "order" },
    { id: 2, title: "Bus ETA Alert", message: "Garuda Bus AP-28-Z-1234 is 42 mins from Vijayawada Hub", time: "10m ago", read: false, type: "bus" },
    { id: 3, title: "Payout Processed", message: "₹48,920 settled to Annapurna Highway Gourmet HDFC account", time: "1h ago", read: true, type: "payment" }
  ]);

  // Dark Mode Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const switchRole = (role) => {
    setCurrentRole(role);
    showToast(`Switched view to ${role.toUpperCase()} module`, 'info');
  };

  // Journey Connect
  const connectJourneyFromQR = (scannedJourney) => {
    setJourneyContext(scannedJourney);
    setBus(prev => ({
      ...prev,
      busNumber: scannedJourney.busNumber,
      route: scannedJourney.route,
      seatNumber: scannedJourney.seatNumber,
      nextStop: scannedJourney.nextStop,
      etaMinutes: scannedJourney.etaMinutes
    }));
    showToast(`Connected to Journey ${scannedJourney.busNumber} (${scannedJourney.route})`, 'success');
  };

  // Auth Functions
  const loginCustomerSuccess = (userData) => {
    setCustomerUser({ ...userData, isAuthenticated: true });
    setCurrentRole('customer');
    showToast(`Welcome back, ${userData.name || 'Traveler'}!`, 'success');
  };

  const loginAdminSuccess = (adminData) => {
    setAdminUser(adminData);
    setIsAdminAuthenticated(true);
    setCurrentRole('admin');
    showToast(`Administrator Access Granted: Welcome ${adminData.name}`, 'success');
  };

  const logoutCustomer = () => {
    setCustomerUser(null);
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setIsAdminAuthenticated(false);
  };

  // Cart Functions
  const addToCart = (foodItem, quantity = 1, selectedAddOns = []) => {
    let addOnPrice = 0;
    if (foodItem.addOns && selectedAddOns.length > 0) {
      foodItem.addOns.forEach(ao => {
        if (selectedAddOns.includes(ao.name)) addOnPrice += ao.price;
      });
    }
    const itemTotal = (foodItem.price + addOnPrice) * quantity;

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.food.id === foodItem.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          selectedAddOns,
          itemTotal: (foodItem.price + addOnPrice) * newQty
        };
        return updated;
      }
      return [...prevCart, { food: foodItem, quantity, selectedAddOns, itemTotal }];
    });

    showToast(`Added ${foodItem.name} to cart`, 'success');
  };

  const updateCartQuantity = (foodId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.food.id === foodId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          let addOnPrice = 0;
          if (item.food.addOns && item.selectedAddOns.length > 0) {
            item.food.addOns.forEach(ao => {
              if (item.selectedAddOns.includes(ao.name)) addOnPrice += ao.price;
            });
          }
          return { ...item, quantity: newQty, itemTotal: (item.food.price + addOnPrice) * newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const toggleCartAddOn = (foodId, addOnName) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.food.id === foodId) {
          const currentAddOns = item.selectedAddOns || [];
          const hasAddOn = currentAddOns.includes(addOnName);
          const newAddOns = hasAddOn 
            ? currentAddOns.filter(a => a !== addOnName)
            : [...currentAddOns, addOnName];
          
          let addOnPrice = 0;
          if (item.food.addOns && newAddOns.length > 0) {
            item.food.addOns.forEach(ao => {
              if (newAddOns.includes(ao.name)) addOnPrice += ao.price;
            });
          }
          return {
            ...item,
            selectedAddOns: newAddOns,
            itemTotal: (item.food.price + addOnPrice) * item.quantity
          };
        }
        return item;
      });
    });
  };

  const removeFromCart = (foodId) => {
    setCart(prev => prev.filter(i => i.food.id !== foodId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  // Place Order Simulation
  const placeOrder = (checkoutDetails) => {
    const newId = "QD" + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cart.reduce((acc, curr) => acc + curr.itemTotal, 0);
    const tax = subtotal * 0.05;
    const deliveryFee = 20;
    const totalAmount = subtotal + tax + deliveryFee;

    const newOrder = {
      id: newId,
      passengerName: checkoutDetails.name || bus.passengerName,
      passengerPhone: checkoutDetails.phone || bus.passengerPhone,
      busNumber: bus.busNumber,
      seatNumber: checkoutDetails.seatNumber || bus.seatNumber,
      route: bus.route,
      restaurantId: "REST-01",
      restaurantName: "Annapurna Highway Gourmet",
      deliveryPoint: bus.nextStop,
      items: cart.map(c => ({
        id: c.food.id,
        name: c.food.name,
        price: c.food.price,
        quantity: c.quantity,
        addOns: c.selectedAddOns
      })),
      subtotal,
      tax,
      deliveryFee,
      totalAmount,
      paymentMethod: checkoutDetails.paymentMethod || "UPI (Google Pay)",
      paymentStatus: "PAID",
      orderStatus: "PLACED",
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryTime: bus.arrivalTime,
      etaMinutes: bus.etaMinutes,
      driverName: "K. Ramesh (Driver #408)",
      driverPhone: "+91 91234 56789",
      driverStatus: "Assigned for Pickup",
      issueReported: false
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newId);
    clearCart();
    setActiveCustomerTab('confirmation');
    showToast(`Order #${newId} placed successfully!`, 'success');

    // Add live notification
    setNotifications(prev => [
      {
        id: Date.now(),
        title: `New Order #${newId}`,
        message: `Payment confirmed via ${newOrder.paymentMethod}. Preparing at ${newOrder.restaurantName}.`,
        time: "Just now",
        read: false,
        type: "order"
      },
      ...prev
    ]);
  };

  // Order Status Workflow
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return { ...ord, orderStatus: newStatus };
      }
      return ord;
    }));
    showToast(`Order #${orderId} marked as ${newStatus}`, 'success');
  };

  // Restaurant Menu Toggles
  const toggleFoodAvailability = (foodId) => {
    setFoodItems(prev => prev.map(item => {
      if (item.id === foodId) {
        const nextAvail = !item.available;
        showToast(`${item.name} is now ${nextAvail ? 'AVAILABLE' : 'OUT OF STOCK'}`, nextAvail ? 'success' : 'warning');
        return { ...item, available: nextAvail };
      }
      return item;
    }));
  };

  // Partner Approvals
  const approvePartner = (type, id, newStatus) => {
    if (type === 'restaurant') {
      setRestaurantsList(prev => prev.map(r => r.id === id ? { ...r, approvalStatus: newStatus } : r));
    } else if (type === 'driver') {
      setDriversList(prev => prev.map(d => r.id === id ? { ...d, approvalStatus: newStatus } : d));
    }
    showToast(`${type.toUpperCase()} #${id} status set to ${newStatus}`, 'success');
  };

  // Refund Ticket Handling
  const processRefund = (ticketId, amount) => {
    setSupportTicketsList(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: 'RESOLVED', refundRequested: true, refundAmount: amount };
      }
      return t;
    }));
    showToast(`Refund of ₹${amount} processed for Ticket #${ticketId}`, 'success');
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      switchRole,
      activeCustomerTab,
      setActiveCustomerTab,
      darkMode,
      toggleDarkMode,
      journeyContext,
      setJourneyContext,
      connectJourneyFromQR,
      customerUser,
      setCustomerUser,
      pendingPhone,
      setPendingPhone,
      adminUser,
      isAdminAuthenticated,
      loginCustomerSuccess,
      loginAdminSuccess,
      logoutCustomer,
      logoutAdmin,
      bus,
      setBus,
      foodItems,
      setFoodItems,
      orders,
      setOrders,
      restaurantsList,
      driversList,
      supportTicketsList,
      stats,
      cart,
      addToCart,
      updateCartQuantity,
      toggleCartAddOn,
      removeFromCart,
      clearCart,
      activeOrderId,
      setActiveOrderId,
      placeOrder,
      updateOrderStatus,
      toggleFoodAvailability,
      approvePartner,
      processRefund,
      toast,
      showToast,
      notifications,
      setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
