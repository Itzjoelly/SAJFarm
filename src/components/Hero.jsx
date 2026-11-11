import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, CheckCircle2, Truck, ShieldCheck, MapPin, Sparkles, Flame } from 'lucide-react';

export default function Hero() {
  const { setCurrentView } = useStore();

  const scrollToConfigurator = () => {
    const el = document.getElementById('broiler-configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('shop');
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 border-b border-slate-800 text-white pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* Background Red & Blue Ambient Lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badges: Red & Blue */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-950/80 text-red-400 border border-red-800">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                Fresh Farm Broilers (Priced by Weight)
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-950/80 text-blue-400 border border-blue-800">
                <MapPin className="w-3 h-3 text-blue-400" /> Lagos • Ogun • Ibadan Only
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight">
              Table-Ready Broilers, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-blue-500">
                Slaughtered, Defeathered
              </span> <br />
              Or Delivered Live.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              At <strong>SAJFarm</strong>, we rear chicks with high-nutrition organic feed until peak maturity. Choose your exact weight, pick whether to receive it <strong>live in safe crates</strong>, <strong>defeathered</strong>, or <strong>butchered into pieces</strong>, with real-time temperature-controlled van delivery.
            </p>

            {/* Value Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm font-semibold text-slate-300">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Fair Weight-Based Pricing</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Paystack & Flutterwave</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Mandatory Van Fallback</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={scrollToConfigurator}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-xl shadow-red-900/50 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Customize & Order Broiler</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setCurrentView('track')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 font-bold text-sm border border-blue-900/50 shadow-lg shadow-blue-950/40 transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Track Active Order</span>
              </button>
            </div>

            {/* Van Delivery Notice Box in Dark Blue & Red Accent */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-3 max-w-xl mx-auto lg:mx-0">
              <div className="p-1.5 rounded-lg bg-blue-950 text-blue-400 shrink-0 mt-0.5 border border-blue-900">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-200">Doorstep + Mandatory Van Fallback:</strong> If your street is closed to delivery vans, our checkout requires a nearby accessible landmark so you never experience missed drop-offs.
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase in Sleek Black & Glowing Red-Blue Border */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing Background Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl blur-lg opacity-40"></div>

              {/* Visual Box */}
              <div className="relative bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
                <div className="relative h-60 sm:h-64 bg-slate-950 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80"
                    alt="Farm-raised broiler chicken"
                    className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-lg">
                      ₦6,500 – ₦10,800+
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-900/90 text-blue-200 border border-blue-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Bio-Secure
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                      Peak Maturity Harvest
                    </div>
                    <div className="text-lg font-black text-white">
                      100% Healthy Broilers
                    </div>
                    <p className="text-xs text-slate-300">
                      Weighed before slaughter. Dressed with clean borehole water.
                    </p>
                  </div>
                </div>

                {/* Preparation Choices Snapshot */}
                <div className="p-4 bg-slate-950/90 border-t border-slate-800 space-y-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Preparation Options
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-lg">📦</div>
                      <div className="font-bold text-slate-200 text-[11px]">Live Bird</div>
                      <div className="text-[9px] text-blue-400">Ventilated box</div>
                    </div>
                    <div className="p-2 rounded-xl bg-red-950/40 border border-red-900/50">
                      <div className="text-lg">✨</div>
                      <div className="font-bold text-red-300 text-[11px]">Defeathered</div>
                      <div className="text-[9px] text-red-400">Whole clean</div>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-900/50">
                      <div className="text-lg">🍗</div>
                      <div className="font-bold text-blue-300 text-[11px]">Portioned</div>
                      <div className="text-[9px] text-blue-400">4, 8, 12 pieces</div>
                    </div>
                  </div>

                  <button
                    onClick={scrollToConfigurator}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold text-xs flex items-center justify-between px-4 hover:opacity-95 transition-opacity"
                  >
                    <span>Configure Weight & Cuts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
