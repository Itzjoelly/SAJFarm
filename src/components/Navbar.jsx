import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import {
  ShoppingBag,
  Truck,
  MapPin,
  Search,
  Menu,
  X,
  User,
  Lock,
  ChevronDown,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    cartItemCount,
    cartSubtotal,
    setIsCartOpen,
    currentUser,
    setIsAuthModalOpen,
    setAuthMode,
    isAdminLoggedIn,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleNav = (viewId, categoryId = null) => {
    setCurrentView(viewId);
    if (categoryId) {
      setSelectedCategory(categoryId);
      const el = document.getElementById('products-catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentView('shop');
    const el = document.getElementById('products-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuthClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-2xl">
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-gradient-to-r from-red-950 via-slate-950 to-blue-950 border-b border-slate-800/80 text-[11px] py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-bold text-red-400">SAJFarm Direct:</span>
            <span>Broilers, Frozen Meats, Live Rams & Cows dispatched to <strong className="text-white">Lagos</strong>, <strong className="text-white">Ogun</strong> & <strong className="text-white">Ibadan</strong></span>
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

      {/* 2. MAIN MEGA HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('shop', 'all')}
            className="flex items-center gap-2.5 text-left shrink-0 group focus:outline-hidden"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-red-600 to-blue-600 p-[2px] shadow-lg shadow-red-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl">
                🐔
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  SAJ<span className="text-red-500">Farm</span>
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800 px-1 rounded hidden sm:inline">
                  E-Commerce
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Meats, Poultry & Livestock Market
              </p>
            </div>
          </button>

          {/* LARGE CENTRAL SEARCH BAR (STANDARD E-COMMERCE STYLE) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl items-center border border-slate-700 bg-slate-900 rounded-2xl overflow-hidden focus-within:border-blue-500 shadow-inner"
          >
            {/* Category dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-bold bg-slate-950 text-slate-300 border-r border-slate-800 px-3 py-2.5 focus:outline-hidden cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Input */}
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search broilers, turkey wings, rams, pork, eggs..."
              className="w-full text-xs px-3.5 py-2.5 bg-slate-900 text-white placeholder-slate-500 focus:outline-hidden"
            />

            <button
              type="submit"
              className="p-2.5 px-4 bg-red-600 hover:bg-red-500 text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* RIGHT ACTION BUTTONS: TRACK, ACCOUNT, BASKET */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Track Order Button */}
            <button
              onClick={() => handleNav('track')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                currentView === 'track'
                  ? 'bg-blue-600/20 text-blue-400 border-blue-500/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-red-500" />
              <span>Track Order</span>
            </button>

            {/* Customer Account Trigger */}
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
                  <span className="hidden sm:inline text-slate-200">Sign In</span>
                </>
              )}
            </button>

            {/* Basket Button with Item Count & NGN Subtotal */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-xl shadow-red-950/50 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="text-left hidden sm:block leading-none">
                <div className="text-[10px] text-red-200">Basket</div>
                <div className="text-xs font-black">₦{cartSubtotal.toLocaleString()}</div>
              </div>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible on small screens) */}
        <div className="mt-3 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-slate-700 bg-slate-900 rounded-xl overflow-hidden"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search broilers, meats, rams..."
              className="w-full text-xs px-3 py-2 bg-slate-900 text-white focus:outline-hidden"
            />
            <button type="submit" className="p-2 px-3 bg-red-600 text-white">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. SECONDARY DEPARTMENT NAVIGATION BAR */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs py-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleNav('shop', 'all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedCategory === 'all' && currentView === 'shop'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Departments
            </button>

            <button
              onClick={() => handleNav('shop', 'poultry')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedCategory === 'poultry' && currentView === 'shop'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Fresh Broilers & Poultry
            </button>

            <button
              onClick={() => handleNav('shop', 'frozen')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedCategory === 'frozen' && currentView === 'shop'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Frozen Meats & Turkey
            </button>

            <button
              onClick={() => handleNav('shop', 'livestock')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedCategory === 'livestock' && currentView === 'shop'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Live Rams, Cows & Goats
            </button>

            <button
              onClick={() => handleNav('shop', 'eggs')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                selectedCategory === 'eggs' && currentView === 'shop'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Farm Eggs & Feeds
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('admin')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                currentView === 'admin'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-red-400'
              }`}
            >
              <Lock className="w-3 h-3 text-red-500" />
              <span>Admin Portal</span>
              {isAdminLoggedIn && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 p-4 space-y-2 text-xs">
          <div className="font-bold text-slate-400 uppercase text-[10px] px-2">Departments</div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleNav('shop', cat.id)}
              className={`w-full p-2.5 rounded-xl text-left font-bold flex items-center gap-2 ${
                selectedCategory === cat.id ? 'bg-red-600/20 text-red-400' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => handleNav('track')}
              className="w-full p-2.5 rounded-xl text-left font-bold text-blue-400 flex items-center gap-2 bg-slate-900"
            >
              <Truck className="w-4 h-4 text-red-500" />
              <span>Track Live Delivery</span>
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="w-full p-2.5 rounded-xl text-left font-bold text-slate-400 flex items-center gap-2 hover:bg-slate-900"
            >
              <Lock className="w-4 h-4 text-red-400" />
              <span>Admin Management Hub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
