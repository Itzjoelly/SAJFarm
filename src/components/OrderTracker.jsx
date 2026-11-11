import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  AlertTriangle,
  User,
  Package,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function OrderTracker() {
  const { trackingId, setTrackingId, activeTrackedOrder, orders } = useStore();
  const [searchInput, setSearchInput] = useState(trackingId || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setTrackingId(searchInput.trim());
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'order_confirmed':
        return { label: 'Order Confirmed', color: 'bg-blue-950 text-blue-400 border-blue-800' };
      case 'bird_selection':
        return { label: 'Selecting Broilers', color: 'bg-indigo-950 text-indigo-400 border-indigo-800' };
      case 'dressing_cleaning':
        return { label: 'Slaughtering & Defeathering', color: 'bg-red-950 text-red-400 border-red-800' };
      case 'chilled_packing':
        return { label: 'Chilled Box Packaging', color: 'bg-cyan-950 text-cyan-400 border-cyan-800' };
      case 'out_for_delivery':
        return { label: 'Van Out For Delivery', color: 'bg-red-600 text-white border-red-500 animate-pulse' };
      case 'delivered':
        return { label: 'Delivered', color: 'bg-emerald-950 text-emerald-400 border-emerald-800' };
      default:
        return { label: 'Processing', color: 'bg-slate-900 text-slate-300 border-slate-700' };
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-950 min-h-[85vh] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Search Bar */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-950/80 text-red-400 border border-red-800">
            <Truck className="w-3.5 h-3.5 text-red-500" />
            <span>SAJFarm Dispatch Radar</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Track Your Fresh Broiler Order
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Enter your <strong>Tracking ID</strong> (e.g. <code className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-blue-400">SAJ-8942-LG</code>) or customer phone number to monitor real-time farm dressing and refrigerated van transit.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Tracking ID or 11-digit phone number"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-hidden focus:border-blue-500 font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-red-900/40"
            >
              Track
            </button>
          </form>

          {/* Quick Demo Previews */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>Demo sample:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchInput(o.id);
                  setTrackingId(o.id);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono font-bold text-blue-400 transition-colors"
              >
                {o.id} ({o.state.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* TRACKING RESULTS */}
        {activeTrackedOrder ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Order Status Card */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xl sm:text-2xl font-black text-white">
                      {activeTrackedOrder.id}
                    </span>
                    {(() => {
                      const badge = getStatusBadge(activeTrackedOrder.status);
                      return (
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="text-xs text-slate-400 mt-1.5 flex flex-wrap items-center gap-3">
                    <span>Ordered: <strong className="text-white">{activeTrackedOrder.date}</strong></span>
                    <span>•</span>
                    <span>Recipient: <strong className="text-white">{activeTrackedOrder.customerName}</strong> ({activeTrackedOrder.phone})</span>
                    <span>•</span>
                    <span className="text-blue-400 font-semibold">{activeTrackedOrder.state}</span>
                  </div>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                  <div className="text-xs text-slate-400">Estimated Arrival:</div>
                  <div className="text-base sm:text-lg font-black text-red-400">
                    {activeTrackedOrder.estimatedArrival}
                  </div>
                </div>
              </div>

              {/* TIMELINE PROGRESS STEPPER: BLUE & RED */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
                  Live Farm-To-Table Journey
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-slate-800">
                  {activeTrackedOrder.timeline.map((item, idx) => {
                    const isDone = item.completed;
                    const isCurrent = item.current;

                    return (
                      <div key={idx} className="relative group">
                        {/* Dot */}
                        <div
                          className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCurrent
                              ? 'bg-red-600 text-white ring-4 ring-red-950 animate-pulse'
                              : isDone
                              ? 'bg-blue-600 text-white shadow-sm ring-4 ring-blue-950'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>

                        {/* Step Card */}
                        <div
                          className={`p-4 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-red-950/20 border-red-700/80 shadow-lg shadow-red-950/40 ring-1 ring-red-600/30'
                              : isDone
                              ? 'bg-slate-950/60 border-slate-800'
                              : 'bg-slate-950/20 border-dashed border-slate-800/80 opacity-50'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4
                              className={`text-sm font-bold ${
                                isCurrent ? 'text-red-400' : isDone ? 'text-white' : 'text-slate-500'
                              }`}
                            >
                              {item.title}
                            </h4>
                            <span
                              className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                                isCurrent
                                  ? 'bg-red-950 text-red-300 border border-red-800 font-bold'
                                  : isDone
                                  ? 'text-slate-400 bg-slate-900'
                                  : 'text-slate-600'
                              }`}
                            >
                              {item.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* TWO-COLUMN LOGISTICS & ITEMS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Delivery Address & Mandatory Van Fallback Landmark (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    Delivery Logistics & Meeting Point
                  </h3>
                  <span className="text-xs font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2.5 py-0.5 rounded-full">
                    {activeTrackedOrder.state}
                  </span>
                </div>

                {/* Primary Doorstep */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Primary Doorstep Address
                  </div>
                  <div className="text-sm font-bold text-white leading-snug">
                    {activeTrackedOrder.address}
                  </div>
                  <div className="text-slate-400">
                    Zone/Area: <strong className="text-blue-400">{activeTrackedOrder.area}</strong>
                  </div>
                </div>

                {/* MANDATORY VAN FALLBACK LANDMARK */}
                <div className="p-4 rounded-2xl bg-red-950/30 border-2 border-red-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-400">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Mandatory Van-Accessible Fallback Landmark</span>
                  </div>
                  <div className="text-sm font-black text-white">
                    📍 {activeTrackedOrder.mandatoryFallback}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong>Driver Protocol:</strong> If our delivery van cannot enter your street due to locked security gates or unpaved terrain, the driver will call you to meet and hand over your fresh poultry at this agreed landmark.
                  </p>
                </div>

                {/* Van Driver Card */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Assigned Van Driver
                    </span>
                    <span className="text-xs font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                      {activeTrackedOrder.vanPlate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{activeTrackedOrder.driverName}</div>
                        <div className="text-xs text-blue-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {activeTrackedOrder.driverPhone}
                        </div>
                      </div>
                    </div>

                    <a
                      href={`tel:${activeTrackedOrder.driverPhone.replace(/\s+/g, '')}`}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                    >
                      Call Driver
                    </a>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Radar Location: <strong className="text-white">{activeTrackedOrder.currentLocation}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Items & Payment Info (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-400" />
                    Items In Order
                  </h3>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                    {activeTrackedOrder.paymentStatus}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {activeTrackedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5"
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-white text-sm">
                          {item.quantity}x {item.product}
                        </div>
                        <div className="font-mono font-bold text-red-400">
                          ₦{item.subtotal.toLocaleString()}
                        </div>
                      </div>

                      <div className="text-slate-400 space-y-0.5 text-[11px]">
                        <div>Prep: <strong className="text-slate-200">{item.preparation}</strong></div>
                        {item.pieces && item.pieces !== 'N/A' && (
                          <div>Cuts: <strong className="text-blue-400">{item.pieces}</strong></div>
                        )}
                        <div>Gizzard: <strong className="text-slate-200">{item.gizzard ? 'Cleaned & Packed' : 'No'}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Refrigerated Delivery Fee:</span>
                    <span className="font-bold text-white">₦{activeTrackedOrder.deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-slate-800">
                    <span>Total Order Value:</span>
                    <span className="text-red-500">₦{activeTrackedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* WhatsApp Chat */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/2348037253276?text=Hello%20SAJFarm,%20I%20am%20tracking%20my%20order%20${activeTrackedOrder.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-blue-400 border border-blue-900/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                    <span>Chat with Farm Logistics on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-3xl p-10 border border-slate-800 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-950 text-slate-500 flex items-center justify-center mx-auto text-2xl border border-slate-800">
              🔍
            </div>
            <h3 className="text-base font-bold text-white">No Active Order Found</h3>
            <p className="text-xs text-slate-400">
              We couldn't find an order matching <code className="font-bold text-red-400">{searchInput || 'your query'}</code>. Try one of the test order IDs above.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
