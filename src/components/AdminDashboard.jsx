import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { dbFetchCustomers, dbFetchWaitlist } from '../lib/supabase';
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
  CheckCircle2,
  Database,
  Copy,
  Check,
  ExternalLink,
  X,
  Users,
  RefreshCw,
  MessageSquare,
  PhoneCall,
  Calendar,
  Mail
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    orders,
    updateOrderStatus,
    setTrackingId,
    setCurrentView,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    isSupabaseConfigured
  } = useStore();

  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [filterState, setFilterState] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDbModal, setShowDbModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Admin Navigation Tabs: 'orders' | 'customers' | 'waitlist'
  const [adminTab, setAdminTab] = useState('orders');
  const [registeredCustomers, setRegisteredCustomers] = useState([]);
  const [waitlistEntries, setWaitlistEntries] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const [customers, waitlist] = await Promise.all([
        dbFetchCustomers(),
        dbFetchWaitlist()
      ]);
      setRegisteredCustomers(customers || []);
      setWaitlistEntries(waitlist || []);
    } catch (err) {
      console.warn('Error fetching admin data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadData();
    }
  }, [isAdminLoggedIn]);

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
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-950/80 text-red-400 border border-red-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SAJFarm Central Dispatch Headquarters</span>
              </div>

              {isSupabaseConfigured ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Supabase Live DB Connected</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-400 border border-amber-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Supabase: Local Demo Mode (Keys needed in .env)</span>
                </div>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
              Farm Management & Order Dispatch Console
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Live supervision across Lagos, Ogun, and Ibadan delivery corridors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowDbModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-blue-400 border border-blue-900/50 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Supabase Setup</span>
            </button>
            <button
              onClick={() => setCurrentView('shop')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-colors"
            >
              View Storefront
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Gross Order Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">₦{totalRevenue.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400 font-semibold truncate">Paystack, Flw & POD</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Van Dispatches</span>
              <Truck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-400">{activeDispatches} En Route</div>
            <div className="text-[10px] text-slate-400">Refrigerated vans</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Abattoir Cleaning</span>
              <Flame className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-red-400">{inProcessing} Dressed</div>
            <div className="text-[10px] text-slate-400">Halal spin & portioned</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Broilers Ordered</span>
              <Package className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{totalBirds} Birds</div>
            <div className="text-[10px] text-slate-400">Lagos, Ogun, Ibadan</div>
          </div>

          {/* REGISTERED CUSTOMERS KPI */}
          <div
            onClick={() => {
              setAdminTab('customers');
              loadData();
            }}
            className={`bg-slate-900 border p-4 sm:p-5 rounded-2xl space-y-1.5 cursor-pointer transition-all hover:scale-[1.02] ${
              adminTab === 'customers' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-950/20' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Registered Accounts</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{registeredCustomers.length} Users</div>
            <div className="text-[10px] text-blue-400 font-semibold flex items-center gap-1">
              <span>Live customer roster &rarr;</span>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION BAR: ORDERS VS CUSTOMERS VS WAITLIST */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setAdminTab('orders')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${
                adminTab === 'orders'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders Dispatch ({orders.length})</span>
            </button>

            <button
              onClick={() => {
                setAdminTab('customers');
                loadData();
              }}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${
                adminTab === 'customers'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Registered Customers ({registeredCustomers.length})</span>
            </button>

            <button
              onClick={() => {
                setAdminTab('waitlist');
                loadData();
              }}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${
                adminTab === 'waitlist'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Coming Soon Waitlist ({waitlistEntries.length})</span>
            </button>
          </div>

          <button
            onClick={loadData}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Fetch live records from Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Supabase'}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: ORDERS DISPATCH MANAGEMENT */}
        {/* ========================================================= */}
        {adminTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter & Search */}
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

            {/* Orders Management List */}
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
        )}

        {/* ========================================================= */}
        {/* TAB 2: REGISTERED CUSTOMERS ROSTER (LIVE SUPABASE) */}
        {/* ========================================================= */}
        {adminTab === 'customers' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Customer Accounts Registered in Database ({registeredCustomers.length})</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Every person who registers on the SAJFarm website is recorded live in your Supabase <code className="text-blue-400 font-mono">customers</code> table.
                </p>
              </div>

              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search customer name, phone..."
                  className="text-xs px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white w-full sm:w-64 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {registeredCustomers.length === 0 ? (
              <div className="bg-slate-900 rounded-3xl p-10 text-center border border-slate-800 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-950/60 text-blue-400 border border-blue-800 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">No Registered Customers Yet</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  As soon as a visitor clicks <strong>Sign In &rarr; Register Here</strong> and submits their name, phone, and password, they will instantly appear here with their contact details.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registeredCustomers
                  .filter((c) => {
                    const q = searchTerm.toLowerCase();
                    return (
                      !searchTerm ||
                      c.name?.toLowerCase().includes(q) ||
                      c.phone?.includes(q) ||
                      c.email?.toLowerCase().includes(q) ||
                      c.state?.toLowerCase().includes(q)
                    );
                  })
                  .map((customer, idx) => {
                    const cleanPhone = customer.phone?.replace(/[^0-9]/g, '') || '';
                    const whatsappPhone = cleanPhone.startsWith('0') ? '234' + cleanPhone.slice(1) : cleanPhone;
                    const custOrders = orders.filter(
                      (o) =>
                        o.phone.replace(/\s+/g, '') === customer.phone?.replace(/\s+/g, '') ||
                        o.customerName.toLowerCase().includes(customer.name?.toLowerCase())
                    );

                    return (
                      <div
                        key={customer.id || idx}
                        className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-4 hover:border-blue-700 transition-all shadow-xl"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center text-lg font-black text-white shrink-0">
                              {customer.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">{customer.name}</div>
                              <div className="text-[11px] text-slate-400">{customer.email || 'No email provided'}</div>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 shrink-0">
                            {customer.state || 'Lagos State'}
                          </span>
                        </div>

                        {/* Contact details & Action links */}
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                            <div className="font-mono text-blue-400 font-bold text-xs flex items-center gap-1.5">
                              <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                              <span>{customer.phone}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {cleanPhone && (
                                <>
                                  <a
                                    href={`https://wa.me/${whatsappPhone}?text=Hello%20${encodeURIComponent(customer.name)},%20this%20is%20SAJFarm%20support`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 text-[11px] font-bold flex items-center gap-1"
                                  >
                                    <MessageSquare className="w-3 h-3" />
                                    <span>WhatsApp</span>
                                  </a>
                                  <a
                                    href={`tel:${customer.phone}`}
                                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold"
                                  >
                                    Call
                                  </a>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Address info */}
                          <div className="text-slate-300 text-[11px] space-y-1">
                            <div>
                              <strong>Default Address:</strong>{' '}
                              <span className="text-slate-400">
                                {customer.address ? `${customer.address} (${customer.area || ''})` : 'Not provided yet (adds at checkout)'}
                              </span>
                            </div>
                            {customer.mandatory_fallback && (
                              <div className="text-amber-300">
                                📍 <strong>Fallback Landmark:</strong> {customer.mandatory_fallback}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Footer with registration date and orders */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>
                              {customer.created_at
                                ? new Date(customer.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                : 'Registered'}
                            </span>
                          </div>

                          <div className="font-bold text-slate-300">
                            {custOrders.length > 0 ? (
                              <span className="text-emerald-400">{custOrders.length} Order(s) Placed</span>
                            ) : (
                              <span>0 Orders Placed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: COMING SOON WAITLIST & PRE-ORDERS */}
        {/* ========================================================= */}
        {adminTab === 'waitlist' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Coming Soon Product Waitlist Reservations ({waitlistEntries.length})</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Customers who pre-booked turkey, pork, live rams, cows, or eggs before next farm harvest.
                </p>
              </div>
            </div>

            {waitlistEntries.length === 0 ? (
              <div className="bg-slate-900 rounded-3xl p-10 text-center border border-slate-800 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-950/60 text-amber-400 border border-amber-800 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">No Waitlist Pre-Orders Yet</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  When customers click "Coming Soon • Pre-Book" on Turkey Wings, Live Rams, or Eggs, their reservation is logged here and in Supabase.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {waitlistEntries.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-400 text-sm">{item.product_name || item.productName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                        {item.state || 'Lagos'}
                      </span>
                    </div>
                    <div className="font-bold text-white">{item.full_name || item.name}</div>
                    <div className="text-blue-400 font-mono">{item.phone}</div>
                    <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                      Logged {item.created_at ? new Date(item.created_at).toLocaleString() : 'Recently'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SUPABASE SETUP & SQL SCHEMA MODAL */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto text-white">
          <div
            onClick={() => setShowDbModal(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          ></div>

          <div className="min-h-full flex items-center justify-center p-4 relative">
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center text-white">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Supabase Cloud Database Setup</h3>
                    <p className="text-xs text-slate-400">PostgreSQL tables, orders persistence & RLS policies</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDbModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status indicator */}
              <div className={`p-4 rounded-2xl border text-xs flex items-center justify-between ${
                isSupabaseConfigured
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-800 text-amber-300'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                  <span className="font-bold">
                    {isSupabaseConfigured
                      ? 'Supabase is Live & Connected to SAJFarm!'
                      : 'Supabase credentials not yet detected in .env'}
                  </span>
                </div>
                <span className="text-[11px] font-mono opacity-80">
                  {isSupabaseConfigured ? 'Production Live' : 'Demo LocalStorage'}
                </span>
              </div>

              {/* Step by Step instructions */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="font-bold text-white text-sm">3 Quick Steps to Link Your Supabase Project:</div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                    <div>
                      <strong className="text-white">Run SQL Schema:</strong> Open your Supabase Dashboard &rarr; <strong>SQL Editor</strong> &rarr; Click <strong>New Query</strong>, paste the content of <code className="text-blue-400 font-mono">supabase_schema.sql</code>, and click <strong>Run</strong>.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                    <div>
                      <strong className="text-white">Copy API Credentials:</strong> Go to <strong>Project Settings &rarr; API</strong> in Supabase, and copy your <code className="text-blue-400 font-mono">Project URL</code> and <code className="text-blue-400 font-mono">anon (public) key</code>.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                    <div>
                      <strong className="text-white">Add to .env:</strong> Paste into your <code className="text-emerald-400 font-mono">.env</code> file:
                      <pre className="mt-1.5 p-2 rounded-lg bg-black text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-800">
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schema copy button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  File location: <code className="text-slate-400">c:\Users\SAJ\SAJFarm\supabase_schema.sql</code>
                </span>
                <button
                  onClick={() => {
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 2000);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Schema Ready in Project' : 'Schema File Created'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
