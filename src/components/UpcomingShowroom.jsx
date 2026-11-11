import React, { useState } from 'react';
import { UPCOMING_SERVICES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Bell, Sparkles, Snowflake, Beef } from 'lucide-react';

export default function UpcomingShowroom() {
  const { setNotifyItem } = useStore();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems =
    activeFilter === 'all'
      ? UPCOMING_SERVICES
      : UPCOMING_SERVICES.filter((item) => item.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="upcoming-section" className="py-14 sm:py-20 bg-slate-950 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-950 text-blue-400 border border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Farm Expansion Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Upcoming Meats & Livestock Services
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Beyond fresh broilers, SAJFarm is rolling out <strong>blast-frozen chicken, turkey, pork</strong> and <strong>live farm animals (rams, cows, goats, rabbits, pigs)</strong> across Lagos, Ogun State, and Ibadan. Pre-order or join our priority waitlist below!
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Upcoming ({UPCOMING_SERVICES.length})
          </button>
          <button
            onClick={() => setActiveFilter('frozen')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'frozen'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5 text-blue-400" />
            <span>Frozen Meats</span>
          </button>
          <button
            onClick={() => setActiveFilter('livestock')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'livestock'
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Beef className="w-3.5 h-3.5 text-red-400" />
            <span>Live Farm Animals (Ram, Cow, Goat, Pig, Rabbit)</span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-blue-500/50 transition-all flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
                    {item.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold text-slate-300">
                    Launch: {item.launchDate}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setNotifyItem(item)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-800 hover:border-red-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                  <span>Notify Me / Pre-Book</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
