import React from 'react';
import { ShieldCheck, HeartPulse, Sparkles, Truck, Star } from 'lucide-react';

export default function WhySAJFarm() {
  const pillars = [
    {
      icon: HeartPulse,
      title: 'Raised from Chick to Maturity',
      desc: 'We raise our day-old broiler chicks with balanced, nutrient-dense natural feed and clean borehole water until they reach healthy market weights.'
    },
    {
      icon: ShieldCheck,
      title: 'Halal, Clean & Sanitary Processing',
      desc: 'Processed under strict sanitary bio-security standards. Slaughtered, defeathered spotless, gutted, and rinsed with clean treated water.'
    },
    {
      icon: Sparkles,
      title: 'Custom Portions for Your Pot',
      desc: 'Get your broilers exactly as you need them: whole live birds in crates, whole dressed birds, or portioned into 4, 8, 12, or 16 pieces.'
    },
    {
      icon: Truck,
      title: 'Reliable Van Logistics with Fallback',
      desc: 'Dispatched in refrigerated vans across Lagos, Ogun, and Ibadan. If your inner street is blocked, our mandatory fallback landmark ensures on-time handover.'
    }
  ];

  const testimonials = [
    {
      name: 'Mrs. Funke Adeyemi',
      location: 'Magodo Phase 2, Lagos',
      quote: 'The broilers were fresh and heavy! I ordered 4 birds cut into 8 pieces each. They arrived neatly packed with ice, and the meat was succulent and clean.',
      rating: 5
    },
    {
      name: 'Engr. Dapo Alabi',
      location: 'Bodija, Ibadan',
      quote: 'I love the transparency. They weighed the birds, and the live tracking showed me when the van left the farm. Delivery to my junction landmark was seamless.',
      rating: 5
    },
    {
      name: 'Hajiya Aminat Bello',
      location: 'Abeokuta, Ogun State',
      quote: 'Finally an e-commerce farm that understands poultry hygiene. No need to visit messy local abattoirs. SAJFarm is my new family poultry plug.',
      rating: 5
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Why Choose SAJFarm Section */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3.5 py-1 rounded-full border border-blue-800">
              The SAJFarm Quality Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why Families & Caterers Trust SAJFarm
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              We eliminate the stress, foul smell, and unhygienic conditions of local open markets by delivering farm-fresh, health-certified broilers right to your neighborhood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-950 border border-slate-800 hover:border-red-600/60 transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-red-500 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-base">{pillar.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="pt-10 border-t border-slate-800 space-y-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Customer Experiences Across Lagos, Ogun & Ibadan
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Real feedback from households who enjoy fresh, farm-dressed broilers every week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-red-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="font-bold text-white text-xs">{t.name}</div>
                  <div className="text-[11px] text-blue-400 font-semibold">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
