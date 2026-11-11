import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MOCK_ORDERS } from '../data/ordersMock';
import { DELIVERY_ZONES } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Navigation View: 'shop' | 'track' | 'admin' | 'account'
  const [currentView, setCurrentView] = useState('shop');

  // Multi-Category Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [notifyItem, setNotifyItem] = useState(null);
  const [activePaymentModal, setActivePaymentModal] = useState(null);

  // Customer Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sajfarm_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('sajfarm_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sajfarm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sajfarm_orders');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ORDERS;
    } catch {
      return INITIAL_MOCK_ORDERS;
    }
  });

  // Tracking State
  const [trackingId, setTrackingId] = useState('SAJ-8942-LG');
  const [activeTrackedOrder, setActiveTrackedOrder] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sajfarm_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sajfarm_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('sajfarm_customer', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('sajfarm_customer');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('sajfarm_admin_auth', isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  // Update active tracked order
  useEffect(() => {
    if (!trackingId) {
      setActiveTrackedOrder(null);
      return;
    }
    const cleanId = trackingId.trim().toUpperCase();
    const found = orders.find(
      (o) => o.id.toUpperCase() === cleanId || o.phone.replace(/\s+/g, '').includes(cleanId.replace(/\s+/g, ''))
    );
    setActiveTrackedOrder(found || null);
  }, [trackingId, orders]);

  // Customer Auth
  const loginCustomer = (emailOrPhone, password) => {
    const namePart = emailOrPhone.split('@')[0];
    const customer = {
      name: namePart ? namePart.charAt(0).toUpperCase() + namePart.slice(1) : 'Valued Customer',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@sajcustomer.com`,
      phone: emailOrPhone.includes('@') ? '0803 123 4567' : emailOrPhone,
      address: '',
      mandatoryFallback: '',
      state: 'Lagos State',
      area: 'Ikeja'
    };
    setCurrentUser(customer);
    setIsAuthModalOpen(false);
    return customer;
  };

  const signupCustomer = (userData) => {
    const customer = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address || '',
      mandatoryFallback: userData.mandatoryFallback || '',
      state: userData.state || 'Lagos State',
      area: userData.area || 'Ikeja'
    };
    setCurrentUser(customer);
    setIsAuthModalOpen(false);
    return customer;
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
  };

  // Admin Auth
  const adminLogin = (passcode) => {
    if (passcode === 'admin123' || passcode === 'sajfarm2026') {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid Admin Passcode (Default passcode: admin123)' };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  // Cart Operations: Add Configured Item (Broilers, Custom Livestock)
  const addToCart = (configuredItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.productId === configuredItem.productId &&
          i.tierId === configuredItem.tierId &&
          i.preparationId === configuredItem.preparationId &&
          i.pieceCut === configuredItem.pieceCut &&
          i.keepGizzard === configuredItem.keepGizzard
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += configuredItem.quantity;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: Date.now() + Math.random().toString(36).substr(2, 4),
          ...configuredItem
        }
      ];
    });
    setIsCartOpen(true);
  };

  // Add Standard Packaged Product to Cart (e.g. Turkey Wings, Eggs, Pork, etc.)
  const addStandardProductToCart = (product, qty = 1) => {
    addToCart({
      productId: product.id,
      tierId: product.id,
      tierName: product.name,
      weightRange: product.unit,
      avgWeight: 1.0,
      preparationId: 'standard',
      preparationName: product.categoryName,
      pieceCut: 'Standard Pack',
      keepGizzard: false,
      customNotes: '',
      unitPrice: product.price,
      quantity: qty
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Place Order
  const placeOrder = (checkoutData, paymentDetails = null) => {
    const statePrefix =
      checkoutData.state.includes('Lagos')
        ? 'LG'
        : checkoutData.state.includes('Ogun')
        ? 'OG'
        : 'IB';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `SAJ-${randomNum}-${statePrefix}`;

    const zoneObj = DELIVERY_ZONES.find((z) => z.state === checkoutData.state) || DELIVERY_ZONES[0];
    const deliveryFee = zoneObj.deliveryFee;

    let paymentStatusText = 'Paid (Online)';
    if (checkoutData.paymentMethod === 'pod') {
      paymentStatusText = 'Pay on Delivery';
    } else if (checkoutData.paymentMethod === 'paystack') {
      paymentStatusText = `Paid via Paystack (Ref: ${paymentDetails?.reference || 'PSTK-' + Date.now().toString(36).toUpperCase()})`;
    } else if (checkoutData.paymentMethod === 'flutterwave') {
      paymentStatusText = `Paid via Flutterwave (Ref: ${paymentDetails?.reference || 'FLW-' + Date.now().toString(36).toUpperCase()})`;
    } else if (checkoutData.paymentMethod === 'transfer') {
      paymentStatusText = 'Bank Transfer (Pending Conf.)';
    }

    const newOrder = {
      id: newOrderId,
      customerName: checkoutData.fullName,
      phone: checkoutData.phone,
      email: checkoutData.email || 'customer@sajfarm.com',
      date: 'Just now',
      state: checkoutData.state,
      area: checkoutData.area,
      address: checkoutData.doorstepAddress,
      mandatoryFallback: checkoutData.mandatoryFallback,
      vanAccessibility: checkoutData.vanAccessibilityNotes || 'Standard delivery van access with fallback landmark',
      items: cart.map((c) => ({
        product: `${c.tierName} (${c.weightRange})`,
        quantity: c.quantity,
        preparation: c.preparationName,
        pieces: c.pieceCut || 'N/A',
        gizzard: c.keepGizzard,
        pricePerBird: c.unitPrice,
        subtotal: c.unitPrice * c.quantity
      })),
      deliveryFee: deliveryFee,
      totalAmount: cartSubtotal + deliveryFee,
      paymentMethod: checkoutData.paymentMethod,
      paymentStatus: paymentStatusText,
      status: 'order_confirmed',
      driverName: 'Assigned upon packing (SAJ Logistics)',
      driverPhone: '0803 725 3276',
      vanPlate: `${statePrefix}-VAN-${Math.floor(100 + Math.random() * 900)}`,
      estimatedArrival: 'Today (within 2-4 hours)',
      currentLocation: 'SAJ Farm Holding & Abattoir Facility',
      timeline: [
        {
          step: 1,
          title: 'Order Confirmed & Logged',
          time: 'Just now',
          completed: true,
          current: true,
          desc: `Order received into SAJFarm dispatch system. Payment: ${paymentStatusText}`
        },
        {
          step: 2,
          title: 'Farm Selection & Certification',
          time: 'Upcoming',
          completed: false,
          desc: 'Farm team inspects and prepares items to order specification.'
        },
        {
          step: 3,
          title: 'Hygienic Preparation / Abattoir Processing',
          time: 'Upcoming',
          completed: false,
          desc: 'Portioned, cleaned, or packaged in certified food-safe crates.'
        },
        {
          step: 4,
          title: 'Chilled Box Packaging & Loading',
          time: 'Upcoming',
          completed: false,
          desc: 'Packed in insulated temperature-controlled boxes inside delivery van.'
        },
        {
          step: 5,
          title: 'Out for Delivery (Doorstep / Fallback Landmark)',
          time: 'Upcoming',
          completed: false,
          desc: 'Van driver en route. Driver calls before reaching location.'
        },
        {
          step: 6,
          title: 'Delivered',
          time: 'Pending',
          completed: false,
          desc: 'Handover complete and fresh order received.'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setTrackingId(newOrderId);
    setCurrentView('track');
    return newOrderId;
  };

  // Admin status update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        let updatedTimeline = order.timeline.map((item) => ({ ...item, current: false }));

        if (newStatus === 'order_confirmed') {
          updatedTimeline = updatedTimeline.map((item, idx) => ({
            ...item,
            completed: idx === 0,
            current: idx === 0
          }));
        } else if (newStatus === 'bird_selection') {
          updatedTimeline = updatedTimeline.map((item, idx) => ({
            ...item,
            completed: idx <= 1,
            current: idx === 1
          }));
        } else if (newStatus === 'dressing_cleaning') {
          updatedTimeline = updatedTimeline.map((item, idx) => ({
            ...item,
            completed: idx <= 2,
            current: idx === 2
          }));
        } else if (newStatus === 'chilled_packing') {
          updatedTimeline = updatedTimeline.map((item, idx) => ({
            ...item,
            completed: idx <= 3,
            current: idx === 3
          }));
        } else if (newStatus === 'out_for_delivery') {
          updatedTimeline = updatedTimeline.map((item, idx) => ({
            ...item,
            completed: idx <= 4,
            current: idx === 4
          }));
        } else if (newStatus === 'delivered') {
          updatedTimeline = updatedTimeline.map((item) => ({
            ...item,
            completed: true,
            current: false
          }));
        }

        return {
          ...order,
          status: newStatus,
          timeline: updatedTimeline
        };
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        notifyItem,
        setNotifyItem,
        activePaymentModal,
        setActivePaymentModal,
        currentUser,
        loginCustomer,
        signupCustomer,
        logoutCustomer,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        cart,
        addToCart,
        addStandardProductToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartSubtotal,
        orders,
        trackingId,
        setTrackingId,
        activeTrackedOrder,
        placeOrder,
        updateOrderStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
