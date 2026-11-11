import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { DELIVERY_ZONES } from '../data/products';
import { X, Truck, AlertTriangle, ShieldCheck, MapPin, ArrowRight, CreditCard, Banknote, Sparkles, User } from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    placeOrder,
    currentUser,
    setActivePaymentModal
  } = useStore();

  // Form State
  const [selectedState, setSelectedState] = useState(DELIVERY_ZONES[0].state);
  const [selectedArea, setSelectedArea] = useState(DELIVERY_ZONES[0].areas[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [doorstepAddress, setDoorstepAddress] = useState('');
  const [vanAccessibility, setVanAccessibility] = useState('yes');
  const [mandatoryFallback, setMandatoryFallback] = useState('');
  const [vanNotes, setVanNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paystack'); // default to paystack
  const [errors, setErrors] = useState({});

  // Auto-fill from logged-in customer profile if available
  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setFullName(currentUser.name);
      if (currentUser.phone) setPhone(currentUser.phone);
      if (currentUser.email) setEmail(currentUser.email);
      if (currentUser.address) setDoorstepAddress(currentUser.address);
      if (currentUser.mandatoryFallback) setMandatoryFallback(currentUser.mandatoryFallback);
      if (currentUser.state) {
        setSelectedState(currentUser.state);
        const z = DELIVERY_ZONES.find((zone) => zone.state === currentUser.state);
        if (z && z.areas.length > 0) setSelectedArea(z.areas[0]);
      }
    }
  }, [currentUser]);

  if (!isCheckoutOpen) return null;

  const currentZone = DELIVERY_ZONES.find((z) => z.state === selectedState) || DELIVERY_ZONES[0];
  const deliveryFee = currentZone.deliveryFee;
  const grandTotal = cartSubtotal + deliveryFee;

  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    const zone = DELIVERY_ZONES.find((z) => z.state === stateName);
    if (zone && zone.areas.length > 0) {
      setSelectedArea(zone.areas[0]);
    }
  };

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required for dispatch driver';
    } else if (phone.trim().length < 10) {
      errs.phone = 'Please enter a valid Nigerian phone number';
    }
    if (!doorstepAddress.trim()) errs.doorstepAddress = 'Please enter your primary delivery address';
    
    // MANDATORY FALLBACK VALIDATION
    if (!mandatoryFallback.trim()) {
      errs.mandatoryFallback = 'Mandatory: Please provide a nearby van-accessible landmark or meeting spot in case our van cannot access your street.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderPayload = {
      fullName,
      phone,
      email: email || `${phone}@sajfarm.com`,
      state: selectedState,
      area: selectedArea,
      doorstepAddress,
      mandatoryFallback,
      vanAccessibilityNotes: `Van Access: ${vanAccessibility.toUpperCase()}. Note: ${vanNotes || 'None'}`,
      paymentMethod
    };

    // If Paystack or Flutterwave selected, launch interactive payment gateway modal!
    if (paymentMethod === 'paystack' || paymentMethod === 'flutterwave') {
      setActivePaymentModal({
        gateway: paymentMethod,
        amount: grandTotal,
        customerEmail: email || `${phone}@sajfarm.com`,
        customerPhone: phone,
        orderData: orderPayload,
        onComplete: (paymentDetails) => {
          placeOrder(orderPayload, paymentDetails);
        }
      });
    } else {
      // Direct Bank Transfer or Pay on Delivery
      placeOrder(orderPayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative text-white">
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-700 via-slate-950 to-blue-700 p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-red-400">
                <Truck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black">SAJFarm Dispatch Checkout</h3>
                <p className="text-xs text-slate-300">
                  Direct Van Delivery to Lagos, Ogun State & Ibadan
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
            {/* Coverage Notice */}
            <div className="p-3 rounded-2xl bg-blue-950/60 border border-blue-800/80 text-xs text-blue-300 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong>Active Coverage:</strong> We currently operate refrigerated farm vans only within <strong>Lagos State</strong>, <strong>Ogun State</strong>, and <strong>Ibadan</strong> to guarantee fresh delivery within hours of slaughter.
              </div>
            </div>

            {/* SECTION 1: CONTACT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  1. Recipient Information
                </h4>
                {currentUser && (
                  <span className="text-[11px] text-blue-400 font-semibold flex items-center gap-1">
                    <User className="w-3 h-3" /> Profile details loaded
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                      errors.fullName ? 'border-red-500' : 'border-slate-800'
                    } text-white focus:outline-hidden focus:border-blue-500`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number (Driver Contact) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                      errors.phone ? 'border-red-500' : 'border-slate-800'
                    } text-white focus:outline-hidden focus:border-blue-500`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address (For receipt & payment confirmation)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. adeleke@gmail.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {/* SECTION 2: DESTINATION */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Delivery Destination
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    State / Region *
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-hidden focus:border-blue-500"
                  >
                    {DELIVERY_ZONES.map((zone) => (
                      <option key={zone.state} value={zone.state}>
                        {zone.state} (₦{zone.deliveryFee.toLocaleString()} van fee)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Area / LGA *
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                  >
                    {currentZone.areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Doorstep Address (House Number, Street, Estate/Close) *
                </label>
                <textarea
                  rows="2"
                  value={doorstepAddress}
                  onChange={(e) => setDoorstepAddress(e.target.value)}
                  placeholder="e.g. House 14, Olusegun Obasanjo Crescent, Greenview Estate, Opebi, Ikeja"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border ${
                    errors.doorstepAddress ? 'border-red-500' : 'border-slate-800'
                  } text-white focus:outline-hidden focus:border-blue-500`}
                ></textarea>
                {errors.doorstepAddress && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.doorstepAddress}</p>
                )}
              </div>
            </div>

            {/* SECTION 3: MANDATORY VAN ACCESSIBILITY & FALLBACK */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-950 border-2 border-red-800/80 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-950 text-red-400 border border-red-800 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-red-400 flex items-center gap-1.5">
                    <span>Mandatory Delivery Van Accessibility Check</span>
                    <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded-full bg-red-600 text-white">
                      Required
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Our farm deliveries use high-roof refrigerated vans. If your street has narrow access, closed gates, or untarred terrain, <strong>you must provide a van-accessible fallback landmark</strong> very close to your location.
                  </p>
                </div>
              </div>

              {/* Radio */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Can our delivery van easily drive into your street up to your gate?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs cursor-pointer hover:border-slate-700">
                    <input
                      type="radio"
                      name="vanAccessibility"
                      value="yes"
                      checked={vanAccessibility === 'yes'}
                      onChange={() => setVanAccessibility('yes')}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="font-semibold text-slate-200">Yes, fully accessible</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs cursor-pointer hover:border-slate-700">
                    <input
                      type="radio"
                      name="vanAccessibility"
                      value="no"
                      checked={vanAccessibility === 'no'}
                      onChange={() => setVanAccessibility('no')}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="font-semibold text-slate-200">No, road is restricted</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs cursor-pointer hover:border-slate-700">
                    <input
                      type="radio"
                      name="vanAccessibility"
                      value="uncertain"
                      checked={vanAccessibility === 'uncertain'}
                      onChange={() => setVanAccessibility('uncertain')}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="font-semibold text-slate-200">Uncertain / Estate gate</span>
                  </label>
                </div>
              </div>

              {/* MANDATORY FALLBACK FIELD */}
              <div>
                <label className="block text-xs font-extrabold text-red-400 mb-1">
                  Mandatory Nearby Van Landmark / Alternative Drop-Off Point *
                </label>
                <input
                  type="text"
                  value={mandatoryFallback}
                  onChange={(e) => setMandatoryFallback(e.target.value)}
                  placeholder="e.g. TotalEnergies Station by Estate Gate, or Junction Pharmacy"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-900 border ${
                    errors.mandatoryFallback ? 'border-red-500' : 'border-red-800'
                  } text-white focus:outline-hidden focus:border-red-500`}
                />
                {errors.mandatoryFallback && (
                  <p className="text-[11px] text-red-400 font-bold mt-1">
                    {errors.mandatoryFallback}
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 4: PAYMENT SELECTION (PAYSTACK & FLUTTERWAVE) */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Choose Payment Method (Paystack & Flutterwave Supported)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Paystack Option */}
                <label
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'paystack'
                      ? 'border-teal-500 bg-teal-950/30'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={paymentMethod === 'paystack'}
                      onChange={() => setPaymentMethod('paystack')}
                      className="text-teal-500 focus:ring-teal-400"
                    />
                    <div>
                      <div className="text-xs font-black text-white flex items-center gap-1.5">
                        <span className="text-teal-400 font-extrabold">Paystack</span>
                        <span className="text-[10px] font-bold text-teal-300 bg-teal-900/60 px-1.5 py-0.2 rounded">Cards • USSD</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Instant verification & receipt</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-950 border border-teal-800 px-2 py-0.5 rounded">
                    Recommended
                  </span>
                </label>

                {/* Flutterwave Option */}
                <label
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'flutterwave'
                      ? 'border-amber-500 bg-amber-950/30'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="flutterwave"
                      checked={paymentMethod === 'flutterwave'}
                      onChange={() => setPaymentMethod('flutterwave')}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div className="text-xs font-black text-white flex items-center gap-1.5">
                        <span className="text-amber-400 font-extrabold">Flutterwave</span>
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-900/60 px-1.5 py-0.2 rounded">Barter • Mobile Money</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Global cards & transfers</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded">
                    Fast
                  </span>
                </label>

                {/* Bank Transfer */}
                <label
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-blue-500 bg-blue-950/30'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                      className="text-blue-500 focus:ring-blue-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                        <span>Direct Bank Transfer</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Automated virtual farm account</div>
                    </div>
                  </div>
                </label>

                {/* Pay on Delivery */}
                <label
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'pod'
                      ? 'border-red-500 bg-red-950/30'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="pod"
                      checked={paymentMethod === 'pod'}
                      onChange={() => setPaymentMethod('pod')}
                      className="text-red-500 focus:ring-red-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Banknote className="w-3.5 h-3.5 text-red-400" />
                        <span>Pay on Delivery</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Cash or POS at van handover</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* ORDER TOTAL & SUBMIT */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Broilers Subtotal ({cart.length} configuration{cart.length > 1 ? 's' : ''}):</span>
                  <span className="font-bold text-white">₦{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Refrigerated Delivery ({selectedState}):</span>
                  <span className="font-bold text-white">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm sm:text-base font-black text-white">
                  <span>Total Amount Due:</span>
                  <span className="text-red-500 text-lg sm:text-xl">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-xl shadow-red-900/50 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>
                  {paymentMethod === 'paystack'
                    ? `Pay ₦${grandTotal.toLocaleString()} with Paystack`
                    : paymentMethod === 'flutterwave'
                    ? `Pay ₦${grandTotal.toLocaleString()} with Flutterwave`
                    : 'Confirm Order & Track Delivery'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Instant Tracking ID generated after payment/order confirmation.</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
