import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Bell, CheckCircle2, Sparkles } from 'lucide-react';
import { dbSaveWaitlistEntry } from '../lib/supabase';

export default function NotifyModal() {
  const { notifyItem, setNotifyItem } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('Lagos State');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!notifyItem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    dbSaveWaitlistEntry({
      productId: notifyItem.id,
      productName: notifyItem.name,
      name,
      phone,
      state
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setNotifyItem(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto text-white">
      <div
        onClick={() => setNotifyItem(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-800 overflow-hidden my-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-700 via-slate-950 to-blue-700 p-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-black/50 text-blue-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black">Pre-Order & Waitlist</h3>
                <p className="text-xs text-slate-300">{notifyItem.category}</p>
              </div>
            </div>
            <button
              onClick={() => setNotifyItem(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-black text-white">You're On The Priority List!</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                We have logged your reservation for <strong>{notifyItem.name}</strong>. You will receive an SMS/WhatsApp dispatch alert once available.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <img
                  src={notifyItem.image}
                  alt={notifyItem.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="text-xs">
                  <div className="font-bold text-white">{notifyItem.name}</div>
                  <div className="text-blue-400 font-semibold">{notifyItem.status}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alhaji Mustapha"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0802 345 6789"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Delivery Region *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500 font-semibold"
                >
                  <option value="Lagos State">Lagos State</option>
                  <option value="Ogun State">Ogun State</option>
                  <option value="Ibadan (Oyo State)">Ibadan (Oyo State)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Quantity / Event Date (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 2 large Rams for Ileya festive booking"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-red-900/40"
              >
                <Sparkles className="w-4 h-4 text-blue-300" />
                <span>Reserve / Get Notified</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
