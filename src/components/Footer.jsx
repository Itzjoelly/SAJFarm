import React from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, MessageSquare, Truck, ShieldCheck, Lock, User } from 'lucide-react';

export default function Footer() {
  const { setCurrentView, setIsAuthModalOpen, setAuthMode } = useStore();

  return (
    <footer className="bg-black text-slate-400 pt-16 pb-10 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-blue-600 p-[2px] shadow-lg shadow-red-900/30">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl text-white">
                  🐔
                </div>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                SAJ<span className="text-red-500">Farm</span>
              </span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              SAJFarm is an agro e-commerce platform specializing in raising broiler chicks to maturity, dynamic weight-based pricing, custom halal dressing, and temperature-controlled van delivery across South-West Nigeria.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/2348037253276?text=Hello%20SAJFarm,%20I%20would%20like%20to%20order%20broilers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-900/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:08037253276"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 font-bold text-xs border border-slate-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0803 725 3276</span>
              </a>
            </div>
          </div>

          {/* Service Coverage (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Service Delivery Coverage
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> Lagos State
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  Ikeja, Lekki, VI, Surulere, Maryland, Gbagada, Ajah, Magodo, Agege, Ikorodu
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> Ogun State
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  Abeokuta, Sagamu, Mowe, Ibafo, Sango-Ota, Ijebu-Ode corridor
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> Ibadan (Oyo State)
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  Bodija, Ring Road, Oluyole, Jericho, Akobo, UI, Dugbe
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Gateways (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Portals & Gateways
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Customer Login / Profile</span>
                </button>
              </li>
              <li>
                <a
                  href="#admin"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1.5 hover:underline"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Link</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Live Radar Order Tracking</span>
                </button>
              </li>
            </ul>

            {/* Payment badges */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5">
              <div className="text-[11px] font-bold text-white">Accepted Payments:</div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-teal-950 text-teal-400 border border-teal-800 text-[10px] font-black">
                  PAYSTACK
                </span>
                <span className="px-2 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-black">
                  FLUTTERWAVE
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px] font-bold">
                  POD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} SAJFarm E-Commerce. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold">Black • Red • Blue Edition</span>
            <span>•</span>
            <span className="text-blue-400">Lagos, Ogun & Ibadan Dispatch</span>
            <span>•</span>
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                setCurrentView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-500 hover:text-slate-300 underline cursor-pointer"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
