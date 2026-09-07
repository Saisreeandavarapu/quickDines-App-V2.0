// QuickDines Mock Data Service

export const INITIAL_BUS = {
  id: "BUS-AP28-1234",
  busNumber: "AP-28-Z-1234",
  operator: "Garuda Express Deluxe",
  route: "Visakhapatnam → Hyderabad",
  currentLocation: "Anakapalle Highway Stretch (Km 142)",
  nextStop: "Annapurna Food Transit Plaza - Vijayawada Bypass",
  etaMinutes: 42,
  arrivalTime: "08:15 PM",
  speedKmH: 74,
  totalPassengers: 42,
  seatNumber: "14B",
  passengerName: "Rahul Sharma",
  passengerPhone: "+91 98765 43210"
};

export const FOOD_CATEGORIES = [
  { id: "all", name: "All Items", icon: "Utensils" },
  { id: "breakfast", name: "Breakfast", icon: "Coffee" },
  { id: "snacks", name: "Transit Snacks", icon: "Cookie" },
  { id: "meals", name: "Full Thali & Meals", icon: "UtensilsCrossed" },
  { id: "dinner", name: "Executive Dinner", icon: "Moon" },
  { id: "beverages", name: "Beverages & Drinks", icon: "CupSoda" },
  { id: "desserts", name: "Desserts & Sweets", icon: "IceCream" }
];

export const TIME_SLOTS = [
  { id: "breakfast", name: "Morning Breakfast", time: "06:00 AM – 11:00 AM", active: false },
  { id: "snacks", name: "Mid-day Transit Snacks", time: "11:00 AM – 05:00 PM", active: false },
  { id: "dinner", name: "Highway Executive Dinner", time: "05:00 PM – 11:00 PM", active: true },
];

export const INITIAL_FOOD_ITEMS = [
  {
    id: "FD-101",
    name: "Hyderabadi Chicken Dum Biryani",
    category: "dinner",
    restaurantId: "REST-01",
    restaurantName: "Annapurna Highway Gourmet",
    price: 340,
    rating: 4.8,
    reviewsCount: 312,
    isVeg: false,
    available: true,
    prepTimeMins: 15,
    description: "Authentic slow-cooked saffron basmati rice with tender spiced chicken pieces, served with mirchi ka salan & raita in sealed heat-retaining container.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    addOns: [
      { id: "ao-1", name: "Extra Mirchi Ka Salan", price: 30 },
      { id: "ao-2", name: "Double Egg Add-on", price: 25 },
      { id: "ao-3", name: "Sweet Gulab Jamun (2 pcs)", price: 50 }
    ]
  },
  {
    id: "FD-102",
    name: "Special Paneer Butter Masala Meal",
    category: "dinner",
    restaurantId: "REST-01",
    restaurantName: "Annapurna Highway Gourmet",
    price: 290,
    rating: 4.7,
    reviewsCount: 184,
    isVeg: true,
    available: true,
    prepTimeMins: 12,
    description: "Rich cottage cheese cubes in buttery tomato cashewnut gravy, served with 3 Butter Naans, Jeera Rice, Dal Tadka and Salad.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
    addOns: [
      { id: "ao-4", name: "Extra Garlic Naan", price: 40 },
      { id: "ao-5", name: "Jeera Rice Upgrade", price: 35 }
    ]
  },
  {
    id: "FD-103",
    name: "Andhra Guntur Spicy Chicken Fry Combo",
    category: "dinner",
    restaurantId: "REST-02",
    restaurantName: "Spicy Transit Hub Vijayawada",
    price: 320,
    rating: 4.9,
    reviewsCount: 420,
    isVeg: false,
    available: true,
    prepTimeMins: 14,
    description: "Fiery Guntur chilli roasted chicken fry paired with Steamed Sona Masoori Rice, Rasam, and Roasted Papad.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80",
    addOns: [
      { id: "ao-6", name: "Extra Rasam Bowl", price: 20 },
      { id: "ao-7", name: "Curd Rice Bowl", price: 60 }
    ]
  },
  {
    id: "FD-104",
    name: "Ghee Podi Idli & Masala Dosa Combo",
    category: "breakfast",
    restaurantId: "REST-01",
    restaurantName: "Annapurna Highway Gourmet",
    price: 180,
    rating: 4.9,
    reviewsCount: 560,
    isVeg: true,
    available: true,
    prepTimeMins: 8,
    description: "4 Steaming soft idlis dusted with aromatic gun-powder ghee podi + crispy potato masala dosa served with coconut & tomato chutneys + sambar.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    addOns: [
      { id: "ao-8", name: "Filter Coffee Thermos Cup", price: 40 },
      { id: "ao-9", name: "Extra Vada (1 pc)", price: 35 }
    ]
  },
  {
    id: "FD-105",
    name: "Crispy Highway Samosa & Masala Chai Box",
    category: "snacks",
    restaurantId: "REST-02",
    restaurantName: "Spicy Transit Hub Vijayawada",
    price: 130,
    rating: 4.6,
    reviewsCount: 290,
    isVeg: true,
    available: true,
    prepTimeMins: 5,
    description: "2 Golden spiced potato samosas with mint chutney & sweet imli dip + hot 200ml kulhad ginger tea.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
    addOns: [
      { id: "ao-10", name: "Extra Samosa", price: 30 }
    ]
  },
  {
    id: "FD-106",
    name: "Cold Brew Iced Coffee & Butter Cookies",
    category: "beverages",
    restaurantId: "REST-01",
    restaurantName: "Annapurna Highway Gourmet",
    price: 160,
    rating: 4.7,
    reviewsCount: 145,
    isVeg: true,
    available: true,
    prepTimeMins: 3,
    description: "Refreshing 350ml chilled dark roast cold brew coffee with almond syrup and 2 fresh bakery butter cookies.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
    addOns: []
  },
  {
    id: "FD-107",
    name: "Royal Matka Kulfi & Mango Rabri",
    category: "desserts",
    restaurantId: "REST-01",
    restaurantName: "Annapurna Highway Gourmet",
    price: 140,
    rating: 4.9,
    reviewsCount: 210,
    isVeg: true,
    available: true,
    prepTimeMins: 3,
    description: "Traditional earthen pot malai kulfi topped with pistachio flakes and fresh Alphonso mango rabri.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80",
    addOns: []
  }
];

export const INITIAL_ORDERS = [
  {
    id: "QD102948",
    passengerName: "Rahul Sharma",
    passengerPhone: "+91 98765 43210",
    busNumber: "AP-28-Z-1234",
    seatNumber: "14B",
    route: "Visakhapatnam → Hyderabad",
    restaurantId: "REST-01",
    restaurantName: "Annapurna Highway Gourmet",
    deliveryPoint: "Vijayawada Transit Hub (Bay 4)",
    items: [
      { id: "FD-101", name: "Hyderabadi Chicken Dum Biryani", price: 340, quantity: 1, addOns: ["Extra Mirchi Ka Salan"] },
      { id: "FD-106", name: "Cold Brew Iced Coffee & Butter Cookies", price: 160, quantity: 1, addOns: [] }
    ],
    subtotal: 530,
    tax: 26.50,
    deliveryFee: 20,
    totalAmount: 576.50,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "PAID",
    orderStatus: "PREPARING", // PLACED -> ACCEPTED -> PREPARING -> READY -> PICKED_UP -> ON_THE_WAY -> DELIVERED
    orderTime: "07:32 PM",
    estimatedDeliveryTime: "08:15 PM",
    etaMinutes: 24,
    driverName: "K. Ramesh (Driver #408)",
    driverPhone: "+91 91234 56789",
    driverStatus: "En route to restaurant for pickup",
    issueReported: false
  },
  {
    id: "QD102947",
    passengerName: "Priya Venkatesh",
    passengerPhone: "+91 97654 32109",
    busNumber: "AP-28-Z-1234",
    seatNumber: "08A",
    route: "Visakhapatnam → Hyderabad",
    restaurantId: "REST-01",
    restaurantName: "Annapurna Highway Gourmet",
    deliveryPoint: "Vijayawada Transit Hub (Bay 4)",
    items: [
      { id: "FD-102", name: "Special Paneer Butter Masala Meal", price: 290, quantity: 1, addOns: [] }
    ],
    subtotal: 290,
    tax: 14.50,
    deliveryFee: 20,
    totalAmount: 324.50,
    paymentMethod: "Razorpay Card",
    paymentStatus: "PAID",
    orderStatus: "READY",
    orderTime: "07:28 PM",
    estimatedDeliveryTime: "08:15 PM",
    etaMinutes: 18,
    driverName: "K. Ramesh (Driver #408)",
    driverPhone: "+91 91234 56789",
    driverStatus: "Waiting at restaurant pickup counter",
    issueReported: false
  },
  {
    id: "QD102946",
    passengerName: "Vikram Reddy",
    passengerPhone: "+91 95432 10987",
    busNumber: "AP-09-Y-8899",
    seatNumber: "22C",
    route: "Bengaluru → Vijayawada",
    restaurantId: "REST-02",
    restaurantName: "Spicy Transit Hub Vijayawada",
    deliveryPoint: "Tirupati Highway Junction Stop",
    items: [
      { id: "FD-103", name: "Andhra Guntur Spicy Chicken Fry Combo", price: 320, quantity: 2, addOns: [] }
    ],
    subtotal: 640,
    tax: 32,
    deliveryFee: 25,
    totalAmount: 697.00,
    paymentMethod: "Paytm Wallet",
    paymentStatus: "PAID",
    orderStatus: "ON_THE_WAY",
    orderTime: "07:15 PM",
    estimatedDeliveryTime: "07:55 PM",
    etaMinutes: 8,
    driverName: "S. Venkatesh (Driver #312)",
    driverPhone: "+91 98888 77766",
    driverStatus: "Approaching Bus Seat 22C",
    issueReported: false
  },
  {
    id: "QD102940",
    passengerName: "Ananya Roy",
    passengerPhone: "+91 94321 09876",
    busNumber: "TS-07-UB-5544",
    seatNumber: "04B",
    route: "Hyderabad → Visakhapatnam",
    restaurantId: "REST-01",
    restaurantName: "Annapurna Highway Gourmet",
    deliveryPoint: "Suryapet Transit Plaza",
    items: [
      { id: "FD-105", name: "Crispy Highway Samosa & Masala Chai Box", price: 130, quantity: 2, addOns: [] }
    ],
    subtotal: 260,
    tax: 13,
    deliveryFee: 20,
    totalAmount: 293.00,
    paymentMethod: "Net Banking",
    paymentStatus: "PAID",
    orderStatus: "DELIVERED",
    orderTime: "06:10 PM",
    estimatedDeliveryTime: "06:45 PM",
    etaMinutes: 0,
    driverName: "M. Satish (Driver #204)",
    driverPhone: "+91 97777 66655",
    driverStatus: "Order handed over to passenger",
    issueReported: false
  }
];

export const RESTAURANTS = [
  {
    id: "REST-01",
    name: "Annapurna Highway Gourmet",
    location: "Vijayawada Highway Hub - Mile 180",
    rating: 4.8,
    activeOrders: 14,
    todayRevenue: 48920,
    todayOrdersCount: 124,
    status: "ACTIVE",
    category: "North & South Indian Thali",
    phone: "+91 866 244 5566",
    fssaiLicense: "10123004000892",
    approvalStatus: "APPROVED",
    commissionRate: "12%"
  },
  {
    id: "REST-02",
    name: "Spicy Transit Hub Vijayawada",
    location: "NH-65 Expressway Plaza, Zone B",
    rating: 4.7,
    activeOrders: 9,
    todayRevenue: 34150,
    todayOrdersCount: 88,
    status: "ACTIVE",
    category: "Andhra Biryani & Fast Bites",
    phone: "+91 866 299 1122",
    fssaiLicense: "10123004000955",
    approvalStatus: "APPROVED",
    commissionRate: "14%"
  },
  {
    id: "REST-03",
    name: "Grand Transit Kitchen & Bakery",
    location: "Rajahmundry Highway Junction",
    rating: 4.6,
    activeOrders: 0,
    todayRevenue: 0,
    todayOrdersCount: 0,
    status: "PENDING_APPROVAL",
    category: "Bakery, Continental & Beverages",
    phone: "+91 883 277 8899",
    fssaiLicense: "10123004001102",
    approvalStatus: "PENDING",
    commissionRate: "12%"
  }
];

export const DRIVERS = [
  {
    id: "DRV-408",
    name: "K. Ramesh",
    phone: "+91 91234 56789",
    busAssigned: "AP-28-Z-1234 (Visakhapatnam → Hyderabad)",
    assignedStop: "Annapurna Highway Gourmet - Vijayawada",
    status: "ONLINE",
    activeDeliveries: 3,
    todayEarnings: 1250,
    incentiveBonusProgress: 80, // percentage
    incentiveTarget: 1500,
    rating: 4.9,
    vehicleType: "Transit Electric Scooter #04",
    approvalStatus: "APPROVED"
  },
  {
    id: "DRV-312",
    name: "S. Venkatesh",
    phone: "+91 98888 77766",
    busAssigned: "AP-09-Y-8899 (Bengaluru → Vijayawada)",
    assignedStop: "Spicy Transit Hub - Tirupati",
    status: "ONLINE",
    activeDeliveries: 1,
    todayEarnings: 980,
    incentiveBonusProgress: 60,
    incentiveTarget: 1500,
    rating: 4.8,
    vehicleType: "Transit Runner Bike #12",
    approvalStatus: "APPROVED"
  },
  {
    id: "DRV-501",
    name: "T. Suresh Kumar",
    phone: "+91 93333 44455",
    busAssigned: "Unassigned",
    assignedStop: "Suryapet Transit Plaza",
    status: "OFFLINE",
    activeDeliveries: 0,
    todayEarnings: 0,
    incentiveBonusProgress: 0,
    incentiveTarget: 1500,
    rating: 4.5,
    vehicleType: "Transit Bike #08",
    approvalStatus: "PENDING"
  }
];

export const SUPPORT_TICKETS = [
  {
    id: "TKT-8902",
    orderId: "QD102941",
    customerName: "Siddharth Rao",
    customerPhone: "+91 98111 22334",
    issueType: "Bus ETA Delayed by Traffic",
    priority: "HIGH",
    status: "INVESTIGATING", // OPEN, ASSIGNED, INVESTIGATING, RESOLVED, CLOSED
    assignedTo: "Support Agent Arjun",
    createdAt: "10 mins ago",
    description: "Passenger reported bus is delayed 15 mins due to highway toll jam. Requests update on whether food will remain hot.",
    notes: [
      "Contacted restaurant Annapurna Highway Gourmet to keep insulated bag sealed.",
      "Driver Ramesh confirmed holding container in warming station."
    ],
    refundRequested: false,
    refundAmount: 0
  },
  {
    id: "TKT-8899",
    orderId: "QD102935",
    customerName: "Meera Krishnan",
    customerPhone: "+91 97222 33445",
    issueType: "Wrong Beverage Item Delivered",
    priority: "MEDIUM",
    status: "OPEN",
    assignedTo: "Unassigned",
    createdAt: "25 mins ago",
    description: "Received regular iced tea instead of Cold Brew Coffee.",
    notes: [],
    refundRequested: true,
    refundAmount: 160
  }
];

export const SYSTEM_STATS = {
  totalOrders: 14820,
  todayOrders: 418,
  activeBuses: 64,
  activeRestaurants: 38,
  onlineDrivers: 52,
  grossRevenueToday: 184950,
  platformCommissionToday: 24040,
  satisfactionRate: "98.6%",
  avgDeliveryTimeMinutes: "14.2 min"
};

export const REVENUE_GRAPH_DATA = [
  { time: "06:00 AM", revenue: 4200, orders: 18 },
  { time: "09:00 AM", revenue: 18500, orders: 62 },
  { time: "12:00 PM", revenue: 32400, orders: 104 },
  { time: "03:00 PM", revenue: 21100, orders: 56 },
  { time: "06:00 PM", revenue: 54900, orders: 142 },
  { time: "09:00 PM", revenue: 53850, orders: 136 },
];

export const AUDIT_LOGS = [
  { id: "LOG-901", action: "Partner Approved", detail: "Annapurna Highway Gourmet updated FSSAI verification", user: "Super Admin", time: "12 mins ago" },
  { id: "LOG-902", action: "Refund Processed", detail: "₹160 refunded for Order #QD102935", user: "Support Agent Arjun", time: "28 mins ago" },
  { id: "LOG-903", action: "Driver Status", detail: "Driver K. Ramesh toggled ONLINE for Bus AP-28-Z-1234", user: "System Auto", time: "45 mins ago" },
  { id: "LOG-904", action: "Bus Route Synced", detail: "GPS waypoint updated for Garuda Bus AP-28-Z-1234", user: "Transit IoT Gateway", time: "1 hour ago" }
];
