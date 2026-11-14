import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { WEIGHT_TIERS, PREPARATION_OPTIONS, PIECE_CUT_OPTIONS } from '../data/products';
import {
  X,
  Star,
  Check,
  ShoppingBag,
  Plus,
  Minus,
  Scissors,
  Flame,
  Feather,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Info,
  Bell
} from 'lucide-react';

export default function ProductDetailModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, setNotifyItem } = useStore();

  // Broiler configuration states
  const [selectedTier, setSelectedTier] = useState(WEIGHT_TIERS[1]);
  const [selectedPrep, setSelectedPrep] = useState(PREPARATION_OPTIONS[2]);
  const [selectedPieceCut, setSelectedPieceCut] = useState(PIECE_CUT_OPTIONS[1].label);
  const [keepGizzard, setKeepGizzard] = useState(true);
  const [customNotes, setCustomNotes] = useState('');

  // Livestock slaughter option
  const [livestockPrep, setLivestockPrep] = useState('live'); // 'live' | 'slaughter'

  // Quantity
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!quickViewProduct) return null;

  const isBroiler = quickViewProduct.isBroiler;
  const isLivestock = quickViewProduct.isLivestock;

  // Price calculations
  let unitPrice = quickViewProduct.price;
  if (isBroiler) {
    unitPrice = selectedTier.basePrice + selectedPrep.price;
  } else if (isLivestock && livestockPrep === 'slaughter') {
    unitPrice += 5000; // nominal abattoir slaughter & butchering fee for ram/cow/goat
  }

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    if (isBroiler) {
      addToCart({
        productId: quickViewProduct.id,
        tierId: selectedTier.id,
        tierName: `Fresh Farm Broiler - ${selectedTier.name}`,
        weightRange: selectedTier.weightRange,
        avgWeight: selectedTier.avgWeight,
        preparationId: selectedPrep.id,
        preparationName: selectedPrep.name,
        pieceCut: selectedPrep.requiresCutting ? selectedPieceCut : 'Whole / Live',
        keepGizzard: keepGizzard,
        customNotes: customNotes,
        unitPrice: unitPrice,
        quantity: quantity
      });
    } else if (isLivestock) {
      addToCart({
        productId: quickViewProduct.id,
        tierId: quickViewProduct.id,
        tierName: quickViewProduct.name,
        weightRange: quickViewProduct.unit,
        avgWeight: 40,
        preparationId: livestockPrep,
        preparationName: livestockPrep === 'live' ? 'Delivered Live' : 'Abattoir Slaughtered & Cleaned',
        pieceCut: livestockPrep === 'slaughter' ? 'Custom Abattoir Portions' : 'Live Delivery',
        keepGizzard: false,
        customNotes: '',
        unitPrice: unitPrice,
        quantity: quantity
      });
    } else {
      addToCart({
        productId: quickViewProduct.id,
        tierId: quickViewProduct.id,
        tierName: quickViewProduct.name,
        weightRange: quickViewProduct.unit,
        avgWeight: 1.0,
        preparationId: 'standard',
        preparationName: quickViewProduct.categoryName,
        pieceCut: 'Standard Food Pack',
        keepGizzard: false,
        customNotes: '',
        unitPrice: unitPrice,
        quantity: quantity
      });
    }

    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      setQuickViewProduct(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto text-white">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative">
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-8">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded border border-red-800">
                {quickViewProduct.categoryName}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">Product Details & Customizer</span>
            </div>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start max-h-[75vh] overflow-y-auto">
            {/* Product Image & Fast Specs (5 Cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative h-60 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${quickViewProduct.badgeColor || 'bg-red-600'}`}>
                    {quickViewProduct.badge}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white">{quickViewProduct.rating}</span>
                  <span className="text-slate-500">({quickViewProduct.reviewsCount} verified reviews)</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {quickViewProduct.shortDesc}
                </p>
                <div className="pt-2 border-t border-slate-800 space-y-1">
                  {quickViewProduct.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customization Options & Add to Basket (7 Cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">{quickViewProduct.name}</h3>
                <div className="text-xs text-blue-400 font-semibold mt-0.5">
                  Specification / Pack: {quickViewProduct.unit}
                </div>
              </div>

              {/* IF COMING SOON PRODUCT */}
              {!quickViewProduct.isAvailableNow ? (
                <div className="space-y-4 p-5 rounded-2xl bg-slate-950 border border-blue-900/40">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                    <Bell className="w-5 h-5 text-blue-400 animate-bounce" />
                    <span>Coming Soon • Next Farm Cycle</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This item is currently being reared and prepared for our upcoming batch. Pre-book or join our priority notification list to receive an instant SMS/WhatsApp alert once stock becomes ready for slaughter and dispatch across Lagos, Ogun, and Ibadan.
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                    <span className="text-slate-400">Target Release Price:</span>
                    <span className="text-lg font-black text-white">₦{quickViewProduct.price.toLocaleString()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifyItem(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-900/50 transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Join Priority Waitlist / Pre-Book</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* BROILER SPECIFIC CONTROLS */}
                  {isBroiler && (
                    <div className="space-y-4">
                      {/* Step 1: Weight Tiers */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-300">
                          1. Choose Broiler Weight Range:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {WEIGHT_TIERS.map((tier) => {
                            const isSelected = selectedTier.id === tier.id;
                            return (
                              <div
                                key={tier.id}
                                onClick={() => setSelectedTier(tier)}
                                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                  isSelected
                                    ? 'border-red-500 bg-red-950/30 ring-1 ring-red-500'
                                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                                }`}
                              >
                                <div className="font-bold text-white text-[11px]">{tier.name}</div>
                                <div className="font-black text-blue-400 text-xs">₦{tier.basePrice.toLocaleString()}</div>
                                <div className="text-[10px] text-slate-400">{tier.weightRange}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2: Preparation */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-300">
                          2. Preparation & Dressing:
                        </label>
                        <div className="space-y-1.5">
                          {PREPARATION_OPTIONS.map((prep) => {
                            const isSelected = selectedPrep.id === prep.id;
                            return (
                              <div
                                key={prep.id}
                                onClick={() => setSelectedPrep(prep)}
                                className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? 'border-blue-500 bg-blue-950/30'
                                    : 'border-slate-800 bg-slate-950'
                                }`}
                              >
                                <div>
                                  <div className="font-bold text-white text-[11px]">{prep.name}</div>
                                  <div className="text-[10px] text-slate-400">{prep.description}</div>
                                </div>
                                <span className="text-[10px] font-bold text-red-400 shrink-0 ml-2">
                                  {prep.badge}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {selectedPrep.requiresCutting && (
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 mt-2">
                            <div className="text-[11px] font-bold text-blue-300">
                              Select Pieces Count:
                            </div>
                            <div className="grid grid-cols-4 gap-1.5">
                              {PIECE_CUT_OPTIONS.map((piece) => (
                                <button
                                  key={piece.id}
                                  type="button"
                                  onClick={() => setSelectedPieceCut(piece.label)}
                                  className={`p-1.5 rounded-lg text-center text-[10px] font-bold border ${
                                    selectedPieceCut === piece.label
                                      ? 'border-red-500 bg-red-600 text-white'
                                      : 'border-slate-800 bg-slate-900 text-slate-300'
                                  }`}
                                >
                                  {piece.id} pcs
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <label className="text-xs font-bold text-slate-300">Quantity:</label>
                    <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-2 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-black text-white text-xs">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-2 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Price Banner & Add to Basket */}
                  <div className="p-4 rounded-2xl bg-black border border-red-600/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-medium">Total Payable:</span>
                      <div className="text-xl sm:text-2xl font-black text-white">
                        ₦{totalPrice.toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleAdd}
                      className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-900/50 transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Basket (₦{totalPrice.toLocaleString()})</span>
                    </button>

                    {addedToast && (
                      <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Item added to basket!
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
