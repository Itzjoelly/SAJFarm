import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, User, Lock, Mail, Phone, MapPin, ArrowRight, CheckCircle2, ShieldCheck, LogOut, Package } from 'lucide-react';

export default function CustomerAuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    currentUser,
    loginCustomer,
    signupCustomer,
    logoutCustomer,
    orders,
    setTrackingId,
    setCurrentView
  } = useStore();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  // Signup form
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [state, setState] = useState('Lagos State');
  const [area, setArea] = useState('Ikeja');
  const [address, setAddress] = useState('');
  const [fallback, setFallback] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setError('Please enter your email or phone number');
      return;
    }
    setError('');
    loginCustomer(emailOrPhone, password);
  };

  const handleQuickDemoLogin = () => {
    loginCustomer('adebayo.ogunlesi@gmail.com', 'password123');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name.trim() || !signupPhone.trim()) {
      setError('Name and Phone Number are required');
      return;
    }
    setError('');
    signupCustomer({
      name,
      email: signupEmail || `${signupPhone}@sajfarm.com`,
      phone: signupPhone,
      state,
      area,
      address,
      mandatoryFallback: fallback
    });
  };

  const userOrders = currentUser
    ? orders.filter(
        (o) =>
          o.phone.replace(/\s+/g, '') === currentUser.phone.replace(/\s+/g, '') ||
          o.customerName.toLowerCase().includes(currentUser.name.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative">
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-8 text-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-700 via-slate-950 to-blue-700 p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-red-400">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-white">
                  {currentUser ? 'My SAJFarm Account' : authMode === 'login' ? 'Customer Sign In' : 'Create SAJFarm Account'}
                </h3>
                <p className="text-xs text-slate-300">
                  {currentUser ? 'Manage orders and delivery preferences' : 'Direct farm access across Lagos, Ogun & Ibadan'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-6">
            {currentUser ? (
              /* LOGGED IN PROFILE VIEW */
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center text-lg font-black text-white">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">{currentUser.name}</div>
                      <div className="text-xs text-slate-400">{currentUser.phone} • {currentUser.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={logoutCustomer}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Saved Address & Fallback */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-blue-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> Default Delivery Address
                  </div>
                  {currentUser.address ? (
                    <>
                      <div className="text-slate-200">
                        {currentUser.address}
                      </div>
                      {currentUser.mandatoryFallback && (
                        <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-300">
                          📍 <strong>Van Fallback Landmark:</strong> {currentUser.mandatoryFallback}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-slate-400 italic">
                      No delivery address saved yet. (You can type your address and fallback landmark when placing an order at checkout).
                    </div>
                  )}
                </div>

                {/* Orders History */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>Recent Poultry Orders</span>
                    <span>{userOrders.length} Found</span>
                  </div>

                  {userOrders.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500">
                      No past orders found with this phone number.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {userOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-mono font-bold text-blue-400">{ord.id}</div>
                            <div className="text-slate-400 text-[11px]">{ord.items[0]?.product}</div>
                          </div>
                          <button
                            onClick={() => {
                              setTrackingId(ord.id);
                              setCurrentView('track');
                              setIsAuthModalOpen(false);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1"
                          >
                            <span>Track</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold text-xs"
                >
                  Continue Shopping
                </button>
              </div>
            ) : authMode === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs text-center">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email or Nigerian Phone Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="e.g. 0803 234 5678 or you@domain.com"
                      className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-lg shadow-red-900/40 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Sign In To SAJFarm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Quick 1-Click Demo Login */}
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-blue-400 border border-blue-900/40 text-xs font-bold transition-colors"
                >
                  ⚡ One-Click Demo Customer Login
                </button>

                <div className="text-center pt-2 text-xs text-slate-400">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setError('');
                    }}
                    className="text-blue-400 hover:text-blue-300 font-bold underline ml-1"
                  >
                    Register Here
                  </button>
                </div>
              </form>
            ) : (
              /* SIGNUP FORM */
              <form onSubmit={handleSignup} className="space-y-3">
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs text-center">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Babatunde Ogunlesi"
                    className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="0803 000 0000"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      State *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500 font-semibold"
                    >
                      <option value="Lagos State">Lagos State</option>
                      <option value="Ogun State">Ogun State</option>
                      <option value="Ibadan (Oyo State)">Ibadan (Oyo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="babatunde@gmail.com"
                    className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="pt-1 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">
                      Doorstep Address <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <span className="text-[10px] text-blue-400">Can add at checkout</span>
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 15 Allen Avenue, Ikeja, Lagos (Optional)"
                    className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">
                      Nearby Landmark <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <span className="text-[10px] text-slate-500">Not required now</span>
                  </div>
                  <input
                    type="text"
                    value={fallback}
                    onChange={(e) => setFallback(e.target.value)}
                    placeholder="e.g. Total Filling Station by Estate Gate (Optional)"
                    className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Tip: You only need to provide your full delivery address when placing an order.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>Create Account & Save Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-1 text-xs text-slate-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setError('');
                    }}
                    className="text-blue-400 hover:text-blue-300 font-bold underline ml-1"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
