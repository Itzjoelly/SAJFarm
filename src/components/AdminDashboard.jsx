import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  MapPin,
  Lock,
  LogOut,
  Search,
  Filter,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    orders,
    updateOrderStatus,
    setTrackingId,
    setCurrentView,
    isAdminLoggedIn,
    adminLogin,
    adminLogout
  } = useStore();

  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [filterState, setFilterState] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdminAuth = (e) => {
    e.preventDefault();
    const result = adminLogin(passcodeInput);
    if (!result.success) {
      setAuthError(result.error);
    } else {
      setAuthError('');
      setPasscodeInput('');
    }
  };

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeDispatches = orders.filter((o) => o.status === 'out_for_delivery').length;
  const inProcessing = orders.filter((o) => o.status === 'dressing_cleaning' || o.status === 'bird_selection').length;
  const totalBirds = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  const filteredOrders = orders.filter((order) => {
    const matchesState = filterState === 'All' || order.state.includes(filterState);
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    return matchesState && matchesSearch;
  });

  const statusOptions = [
    { value: 'order_confirmed', label: '1. Order Confirmed' },
    { value: 'bird_selection', label: '2. Weighed & Certified' },
    { value: 'dressing_cleaning', label: '3. Slaughter & Defeather' },
    { value: 'chilled_packing', label: '4. Chilled Packaged' },
    { value: 'out_for_delivery', label: '5. Van Dispatched' },
    { value: 'delivered', label: '6. Delivered' }
  ];

  const handleTrackCustomerView = (orderId) => {
    setTrackingId(orderId);
    setCurrentView('track');
  };

  /* ADMIN LOGIN GATE IF NOT LOGGED IN */
  if (!isAdminLoggedIn) {
    return (
      <section className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-950 text-white">
        <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-blue-600 p-[2px] mx-auto shadow-xl shadow-red-900/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-red-500">
                <Lock className="w-7 h-7" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              SAJFarm Admin Portal
            </h2>
            <p className="text-xs text-slate-400">
              Restricted management console for farm logistics, order dispatch, and abattoir workflow.
            </p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-semibold text-center">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Security Passcode
              </label>
              <input
                type="password"
                required
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-red-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Default demonstration passcode: <code className="text-red-400 font-bold font-mono">admin123</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-xl shadow-red-900/40 transition-all"
            >
              Unlock Admin Portal
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-500">
            Protected by SAJFarm Role-Based Access Control
          </div>
        </div>
      </section>
    );
  }

  /* AUTHENTICATED ADMIN CONSOLE */
  return (
    <section className="py-10 sm:py-14 bg-slate-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-950/80 text-red-400 border border-red-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SAJFarm Central Dispatch Headquarters</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
              Farm Management & Order Dispatch Console
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Live supervision across Lagos, Ogun, and Ibadan delivery corridors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('shop')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-colors"
            >
              View Customer Storefront
            </button>
            <button
              onClick={adminLogout}
              className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-800 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>

        {/* KPI METRIC CARDS: BLACK, RED, BLUE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Gross Order Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">₦{totalRevenue.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-400 font-semibold">Paystack, Flutterwave & Transfers</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Active Van Dispatches</span>
              <Truck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-400">{activeDispatches} En Route</div>
            <div className="text-[11px] text-slate-400">Refrigerated transit vans</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Abattoir Processing</span>
              <Flame className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-black text-red-400">{inProcessing} Birds Dressed</div>
            <div className="text-[11px] text-slate-400">Halal plucking & portion cut</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Total Broilers Ordered</span>
              <Package className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">{totalBirds} Live Birds</div>
            <div className="text-[11px] text-slate-400">Lagos, Ogun & Ibadan batches</div>
          </div>
        </div>

        {/* FILTER & SEARCH */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400">State:</span>
            {['All', 'Lagos', 'Ogun', 'Ibadan'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterState(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterState === st
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, customer, or phone..."
              className="text-xs px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white w-full sm:w-64 focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        {/* ORDERS MANAGEMENT LIST */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-slate-900 rounded-2xl p-8 text-center text-slate-400 text-xs border border-slate-800">
              No orders found matching the filter criteria.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4 hover:border-blue-800 transition-all"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-base font-black text-white bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl">
                      {order.id}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                      {order.state}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                      Payment: <strong className="text-white">{order.paymentStatus}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => handleTrackCustomerView(order.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-blue-400 hover:text-blue-300 text-xs font-bold border border-slate-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>View Customer Radar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Details Grid: Customer, Doorstep & Mandatory Landmark */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  {/* Customer Info (4 Cols) */}
                  <div className="md:col-span-4 space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Customer Contact
                    </div>
                    <div className="font-black text-white text-sm">{order.customerName}</div>
                    <div className="text-blue-400 font-mono font-semibold">{order.phone}</div>
                    <div className="text-slate-400">{order.email}</div>
                  </div>

                  {/* Address & Mandatory Fallback Landmark (5 Cols) */}
                  <div className="md:col-span-5 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Delivery Address & Van Meeting Point
                    </div>
                    <div className="text-slate-200">
                      🏠 <strong>Doorstep:</strong> {order.address} ({order.area})
                    </div>
                    <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-800/80 text-red-300 font-semibold">
                      📍 <strong>Mandatory Fallback Landmark:</strong> {order.mandatoryFallback}
                    </div>
                  </div>

                  {/* Value (3 Cols) */}
                  <div className="md:col-span-3 space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Items & Value
                    </div>
                    <div className="text-lg font-black text-red-400">
                      ₦{order.totalAmount.toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      {order.items[0]?.quantity}x {order.items[0]?.product}
                    </div>
                    <div className="text-blue-400 text-[11px]">
                      Prep: {order.items[0]?.preparation}
                    </div>
                  </div>
                </div>

                {/* Status Updater: Controls live tracking for customer! */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-300">Advance Stage:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border border-red-600 bg-slate-900 text-white focus:outline-hidden focus:ring-1 focus:ring-red-500"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Driver: <strong className="text-white">{order.driverName}</strong> | Van: <strong className="text-blue-400 font-mono">{order.vanPlate}</strong></span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
