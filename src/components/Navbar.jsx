import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Truck, MapPin, ShieldCheck, Menu, X, Sparkles, User, LogIn, Lock } from 'lucide-react';

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    cartItemCount,
    setIsCartOpen,
    currentUser,
    setIsAuthModalOpen,
    setAuthMode,
    isAdminLoggedIn
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl shadow-black/40">
      {/* Top Ticker: Black & Red Accent Bar */}
      <div className="bg-gradient-to-r from-red-950 via-slate-950 to-blue-950 border-b border-slate-800/80 text-[11px] sm:text-xs py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-bold text-red-400">SAJFarm Direct:</span>
            <span>Same-Day Live & Dressed Broiler Delivery in <strong className="text-white">Lagos</strong>, <strong className="text-white">Ogun</strong> & <strong className="text-white">Ibadan</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1 text-blue-400">
              <MapPin className="w-3 h-3 text-red-500" /> Doorstep + Mandatory Van Fallback
            </span>
            <span className="text-slate-200 font-mono font-semibold">
              Hotline: 0803 725 3276
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo: Black-Red-Blue */}
          <button
            onClick={() => handleNav('shop')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-red-600 via-slate-900 to-blue-600 p-[2px] shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl sm:text-2xl">
                🐔
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  SAJ<span className="text-red-500">Farm</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800 px-1.5 py-0.5 rounded">
                  E-Commerce
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                Fresh Broilers & Livestock Logistics
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNav('shop')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                currentView === 'shop'
                  ? 'bg-red-600/10 text-red-400 border border-red-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Order Broilers
            </button>

            <button
              onClick={() => handleNav('upcoming')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'upcoming'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Upcoming Meat & Livestock</span>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-600 text-white uppercase">
                New
              </span>
            </button>

            <button
              onClick={() => handleNav('track')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'track'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-red-500" />
              <span>Track Order</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => handleNav('admin')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Lock className="w-3 h-3 text-red-400" />
              <span>Admin Portal</span>
              {isAdminLoggedIn && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              )}
            </button>
          </nav>

          {/* Right Action Icons: Customer Login / Profile + Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Customer Account Button */}
            <button
              onClick={handleAuthClick}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 text-xs font-bold transition-all"
            >
              {currentUser ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-slate-200">{currentUser.name.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="hidden sm:inline text-slate-200">Customer Login</span>
                </>
              )}
            </button>

            {/* Shopping Basket Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-900/40 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Basket</span>
              {cartItemCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[11px] flex items-center justify-center">
                  {cartItemCount}
                </span>
              ) : (
                <span className="hidden sm:inline text-red-200 text-xs font-normal">0</span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 text-xs">
          <button
            onClick={() => handleNav('shop')}
            className={`w-full p-3 rounded-xl text-left font-bold flex items-center gap-2 ${
              currentView === 'shop' ? 'bg-red-600/20 text-red-400 border border-red-500/40' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span>🐔</span>
            <span>Order Broilers</span>
          </button>

          <button
            onClick={() => handleNav('upcoming')}
            className={`w-full p-3 rounded-xl text-left font-bold flex items-center gap-2 ${
              currentView === 'upcoming' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Upcoming Meat & Livestock</span>
          </button>

          <button
            onClick={() => handleNav('track')}
            className={`w-full p-3 rounded-xl text-left font-bold flex items-center gap-2 ${
              currentView === 'track' ? 'bg-red-600/20 text-red-400 border border-red-500/40' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Truck className="w-4 h-4 text-red-500" />
            <span>Track Order Status</span>
          </button>

          <button
            onClick={() => handleNav('admin')}
            className={`w-full p-3 rounded-xl text-left font-bold flex items-center gap-2 ${
              currentView === 'admin' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Lock className="w-4 h-4 text-red-400" />
            <span>Admin Portal</span>
          </button>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={handleAuthClick}
              className="w-full p-3 rounded-xl bg-slate-900 text-blue-400 font-bold flex items-center justify-center gap-2 border border-slate-800"
            >
              <User className="w-4 h-4" />
              <span>{currentUser ? `My Account (${currentUser.name})` : 'Customer Sign In / Register'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
