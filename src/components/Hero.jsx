import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Truck, ShieldCheck, MapPin, Sparkles, Flame, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function Hero() {
  const { setSelectedCategory, setCurrentView } = useStore();

  const scrollToCatalog = (categoryId = 'all') => {
    setSelectedCategory(categoryId);
    setCurrentView('shop');
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-slate-950 border-b border-slate-800 text-white pt-6 pb-12 sm:pt-8 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* STANDARD E-COMMERCE HERO BANNER GRID (3-COLUMN LAYOUT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* MAIN PROMOTIONAL HERO BANNER (8 COLS) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 sm:p-10 flex flex-col justify-between shadow-2xl">
            {/* Ambient Red-Blue Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-red-950/80 text-red-400 border border-red-800">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span>SAJFarm Direct E-Commerce Store</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Fresh Poultry, Meats & Live Livestock, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-blue-500">
                  Delivered To Your Door.
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Order <strong>mature broilers</strong> (priced fairly by weight, live or halal slaughtered and cut into pieces), <strong>blast-frozen turkey wings & pork</strong>, <strong>live festive rams, cattle & goats</strong>, and <strong>fresh crate eggs</strong> dispatched daily across Lagos, Ogun State & Ibadan.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => scrollToCatalog('all')}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-950/50 transition-all flex items-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop All Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToCatalog('poultry')}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 border border-slate-800 text-xs sm:text-sm font-bold transition-all"
                >
                  🐔 Fresh Broilers
                </button>
              </div>
            </div>

            {/* Bottom badges */}
            <div className="relative pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                <span>Weight-Based Fair Pricing</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Lagos • Ogun • Ibadan Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Paystack & Flutterwave</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PROMO CARDS (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Promo Card 1: Live Rams & Cattle */}
            <div
              onClick={() => scrollToCatalog('livestock')}
              className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 p-5 flex flex-col justify-between hover:border-red-600/60 transition-all cursor-pointer shadow-lg flex-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded border border-red-800">
                    Festive & Events
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 group-hover:text-red-400 transition-colors">
                    Live Balami Rams & Cattle
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct farm supply. Health certified by veterinary doctors.
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=200&q=80"
                    alt="Live Balami Ram"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs font-bold text-blue-400">
                <span>From ₦185,000</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Livestock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Promo Card 2: Frozen Turkey & Pork */}
            <div
              onClick={() => scrollToCatalog('frozen')}
              className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 p-5 flex flex-col justify-between hover:border-blue-600/60 transition-all cursor-pointer shadow-lg flex-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800">
                    Chilled & Frozen
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">
                    Turkey Wings & Pork Chops
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Blast-frozen at -18°C. Packed in thermal boxes.
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=200&q=80"
                    alt="Turkey Wings"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs font-bold text-red-400">
                <span>From ₦8,500</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Frozen Meats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
