// QuickDines Mock Authentication & Journey Service

export const INITIAL_JOURNEY = {
  qrId: "QD-BUS-1024",
  busNumber: "QD-AP-1024",
  operator: "Garuda Highway Executive",
  route: "Visakhapatnam → Hyderabad",
  origin: "Visakhapatnam",
  destination: "Hyderabad",
  nextStop: "Annapurna Food Transit Plaza - Vijayawada Bypass",
  seatNumber: "14B",
  etaMinutes: 42,
  passengerName: "Rahul Sharma",
  availableRestaurantsCount: 3,
  activeMealSlot: getDynamicMealPeriod()
};

export function getDynamicMealPeriod() {
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 11) {
    return { id: 'breakfast', label: 'Morning Breakfast', timeSlot: '06:00 AM – 11:00 AM', banner: 'Fresh Idli, Dosa & Filter Coffee' };
  } else if (currentHour >= 11 && currentHour < 16) {
    return { id: 'lunch', label: 'Highway Lunch Thali', timeSlot: '11:00 AM – 04:00 PM', banner: 'Full Meal Thalis & Biryani Specials' };
  } else if (currentHour >= 16 && currentHour < 19) {
    return { id: 'snacks', label: 'Mid-Day Transit Snacks', timeSlot: '04:00 PM – 07:00 PM', banner: 'Hot Samosa, Chai & Cold Brews' };
  } else {
    return { id: 'dinner', label: 'Highway Executive Dinner', timeSlot: '07:00 PM – 11:00 PM', banner: 'Saffron Dum Biryani & Gourmet Curries' };
  }
}

export function getGreetingByTime() {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

// Simulated API Calls
export const authService = {
  async scanQRCode(qrString) {
    await new Promise(r => setTimeout(r, 600));
    if (!qrString || qrString.toLowerCase().includes("invalid")) {
      throw new Error("Invalid or unreadable QuickDines QR Code. Please try again.");
    }
    if (qrString.toLowerCase().includes("expired")) {
      throw new Error("This bus QR session has expired. Please ask the driver or scan the active bus QR.");
    }
    return {
      success: true,
      journey: {
        ...INITIAL_JOURNEY,
        qrId: qrString.toUpperCase()
      }
    };
  },

  async sendCustomerOTP(phone) {
    await new Promise(r => setTimeout(r, 700));
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      throw new Error("Please enter a valid 10-digit mobile number.");
    }
    return {
      success: true,
      phone: `+91 ${cleaned}`,
      sessionToken: "SESSION_CUST_" + Date.now(),
      message: "OTP sent to +91 " + cleaned + " (Mock OTP: 123456)"
    };
  },

  async verifyCustomerOTP(phone, otp) {
    await new Promise(r => setTimeout(r, 800));
    if (otp !== "123456" && otp !== "654321" && otp.length !== 6) {
      throw new Error("Invalid OTP code. Please enter the 6-digit code sent to your phone (Demo OTP: 123456).");
    }
    return {
      success: true,
      user: {
        id: "USR-" + Math.floor(100000 + Math.random() * 900000),
        name: "Rahul Sharma",
        phone: phone,
        role: "customer"
      }
    };
  },

  async sendAdminOTP(phone) {
    await new Promise(r => setTimeout(r, 700));
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      throw new Error("Please enter a valid 10-digit administrator phone number.");
    }
    return {
      success: true,
      phone: `+91 ${cleaned}`,
      sessionToken: "SESSION_ADMIN_" + Date.now(),
      message: "Admin verification OTP sent (Mock Admin OTP: 888999)"
    };
  },

  async verifyAdminOTP(phone, otp) {
    await new Promise(r => setTimeout(r, 800));
    if (otp !== "888999" && otp !== "123456" && otp.length !== 6) {
      throw new Error("Invalid Administrator OTP code. Security verification failed (Demo Admin OTP: 888999).");
    }
    return {
      success: true,
      adminUser: {
        id: "ADM-9001",
        name: "Super Administrator",
        email: "admin@quickdines.com",
        role: "superadmin"
      }
    };
  },

  async registerCustomer(formData) {
    await new Promise(r => setTimeout(r, 1000));
    return {
      success: true,
      user: {
        id: "USR-" + Math.floor(100000 + Math.random() * 900000),
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.mobileNumber,
        email: formData.email,
        dietaryPreference: formData.dietaryPreference
      }
    };
  }
};
