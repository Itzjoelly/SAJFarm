import React, { useState } from 'react';
import { WEIGHT_TIERS, PREPARATION_OPTIONS, PIECE_CUT_OPTIONS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Check, ShoppingBag, Plus, Minus, Info, Scissors, Flame, Feather, CheckCircle } from 'lucide-react';

export default function BroilerConfigurator() {
  const { addToCart } = useStore();

  // State
  const [selectedTier, setSelectedTier] = useState(WEIGHT_TIERS[1]); // default Medium 2.1 - 2.4kg
  const [selectedPrep, setSelectedPrep] = useState(PREPARATION_OPTIONS[2]); // default Cut into pieces
  const [selectedPieceCut, setSelectedPieceCut] = useState(PIECE_CUT_OPTIONS[1].label); // 8 pieces
  const [keepGizzard, setKeepGizzard] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  // Price Calculation
  const unitPrice = selectedTier.basePrice + selectedPrep.price;
  const totalPrice = unitPrice * quantity;

  // Handle Add to Cart
  const handleAddToCart = () => {
    const itemToAdd = {
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      weightRange: selectedTier.weightRange,
      avgWeight: selectedTier.avgWeight,
      preparationId: selectedPrep.id,
      preparationName: selectedPrep.name,
      pieceCut: selectedPrep.requiresCutting ? selectedPieceCut : 'Whole / Live',
      keepGizzard: keepGizzard,
      customNotes: customNotes,
      unitPrice: unitPrice,
      quantity: quantity
    };

    addToCart(itemToAdd);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const getPrepIcon = (id) => {
    switch (id) {
      case 'live':
        return <Feather className="w-5 h-5 text-blue-400" />;
      case 'dressed':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'portioned':
        return <Scissors className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <section id="broiler-configurator" className="py-14 sm:py-20 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-950/80 px-3.5 py-1 rounded-full border border-red-800">
            Interactive Product Builder
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Configure Your Farm Broiler
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Broiler price is calculated based on exact bird weight. Choose your weight range, then select whether to receive your bird <strong>live in a crate</strong>, <strong>defeathered</strong>, or <strong>neatly cut into portions</strong>.
          </p>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Tiers and Preparation (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: WEIGHT TIER SELECTION */}
            <div className="bg-slate-950 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-black">1</span>
                    Choose Broiler Weight Range
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Price corresponds to verified live farm weight.
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-400 bg-blue-950/70 border border-blue-900 px-2.5 py-0.5 rounded-md">
                  Weight Scale
                </span>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {WEIGHT_TIERS.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-red-500 bg-red-950/20 shadow-lg shadow-red-950/40 ring-1 ring-red-500/50'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 right-3 bg-red-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                          {tier.tag}
                        </span>
                      )}

                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-bold text-white">{tier.name}</div>
                          <div className="text-xs font-black text-blue-400 bg-blue-950/60 inline-block px-1.5 py-0.5 rounded mt-0.5 border border-blue-900">
                            {tier.weightRange}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-base sm:text-lg font-black text-white">
                            ₦{tier.basePrice.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-500">per bird</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {tier.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Avg: ~{tier.avgWeight}kg</span>
                        {isSelected ? (
                          <span className="text-red-400 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Selected
                          </span>
                        ) : (
                          <span className="text-slate-500">Select</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: PREPARATION PREFERENCE */}
            <div className="bg-slate-950 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-black">2</span>
                  Select Bird Preparation Method
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  How should our farm dispatch prepare your order?
                </p>
              </div>

              <div className="space-y-3">
                {PREPARATION_OPTIONS.map((prep) => {
                  const isSelected = selectedPrep.id === prep.id;
                  return (
                    <div
                      key={prep.id}
                      onClick={() => setSelectedPrep(prep)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/50'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                            {getPrepIcon(prep.id)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{prep.name}</span>
                              <span className="text-[10px] font-bold text-red-300 bg-red-950/80 border border-red-800 px-2 py-0.5 rounded-full">
                                {prep.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {prep.description}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-blue-500 bg-blue-600 text-white' : 'border-slate-700'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>

                      {/* Portions sub-selection if 'portioned' */}
                      {isSelected && prep.requiresCutting && (
                        <div className="mt-4 pt-3 border-t border-slate-800 bg-slate-900/90 p-3 rounded-xl space-y-2">
                          <div className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                            <Scissors className="w-3.5 h-3.5 text-blue-400" />
                            Select Number of Pieces per Bird:
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {PIECE_CUT_OPTIONS.map((piece) => {
                              const isPieceSelected = selectedPieceCut === piece.label;
                              return (
                                <button
                                  key={piece.id}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPieceCut(piece.label);
                                  }}
                                  className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                                    isPieceSelected
                                      ? 'border-red-500 bg-red-600 text-white shadow-md shadow-red-900/40'
                                      : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800'
                                  }`}
                                >
                                  <div>{piece.label}</div>
                                  <div className={`text-[10px] font-normal ${isPieceSelected ? 'text-red-100' : 'text-slate-500'}`}>
                                    {piece.detail.split(' ')[0]}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: OFFALS & NOTES */}
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold">3</span>
                Gizzards & Special Butcher Instructions
              </h3>

              {selectedPrep.id !== 'live' && (
                <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={keepGizzard}
                    onChange={(e) => setKeepGizzard(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-700"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-white">Include cleaned Gizzard, Heart & Liver</span>
                    <p className="text-slate-400 text-[11px]">Hygienically scraped, degreased, and packed in clean thermal pouch.</p>
                  </div>
                </label>
              )}

              <div>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Optional butcher instructions (e.g., skin-on, separate wings)..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Price Summary Box (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-black rounded-3xl border-2 border-red-600 shadow-2xl shadow-red-950/40 p-6 space-y-6">
              {/* Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded border border-red-800">
                    Live Calculation
                  </span>
                  <span className="text-xs text-blue-400 font-mono font-bold">₦ NGN</span>
                </div>
                <h3 className="text-xl font-black text-white mt-2">
                  {selectedTier.name}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <span className="font-bold text-blue-400">{selectedTier.weightRange}</span>
                  <span>•</span>
                  <span>{selectedPrep.shortName}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Weight ({selectedTier.weightRange})</span>
                  <span className="font-bold text-white">₦{selectedTier.basePrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Preparation: {selectedPrep.shortName}</span>
                  <span className="font-bold text-white">
                    {selectedPrep.price === 0 ? 'FREE' : `+₦${selectedPrep.price.toLocaleString()}`}
                  </span>
                </div>

                {selectedPrep.requiresCutting && (
                  <div className="flex justify-between text-slate-400 pl-3 border-l-2 border-blue-500">
                    <span>Portions:</span>
                    <span className="font-bold text-blue-400">{selectedPieceCut}</span>
                  </div>
                )}

                {selectedPrep.id !== 'live' && keepGizzard && (
                  <div className="flex justify-between text-slate-400 pl-3 border-l-2 border-red-500">
                    <span>Gizzard & Offals:</span>
                    <span className="font-bold text-red-400">Cleaned & Sealed</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-slate-300">
                  <span>Unit Price Per Bird:</span>
                  <span className="text-base font-black text-white">₦{unitPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Number of Birds (Quantity):
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-3 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-black text-white text-sm">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-3 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-400">
                    Est. Total Weight: <br />
                    <strong className="text-blue-400">~{(selectedTier.avgWeight * quantity).toFixed(1)} kg</strong>
                  </div>
                </div>
              </div>

              {/* Grand Total Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950 via-slate-950 to-blue-950 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Total Amount:</span>
                  <span className="text-blue-400 font-bold">{quantity} bird{quantity > 1 ? 's' : ''}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  ₦{totalPrice.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                  <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Delivery fee added at checkout based on state.</span>
                </div>
              </div>

              {/* Add to Basket Action */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-xl shadow-red-900/50 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add To Basket (₦{totalPrice.toLocaleString()})</span>
                </button>

                {addedToast && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-fadeIn">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Added to basket! Ready for checkout.
                  </div>
                )}
              </div>

              {/* Guarantee */}
              <div className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-blue-400 font-bold">✓</span> Pay via <strong>Paystack</strong>, <strong>Flutterwave</strong>, or <strong>POD</strong>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-red-400 font-bold">✓</span> Mandatory van accessibility fallback guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
