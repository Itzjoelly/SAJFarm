import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-white">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-950 border border-red-800 text-red-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-white text-base">Your Farm Basket</h3>
                <p className="text-xs text-slate-400">
                  {cart.length} configuration{cart.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-3xl">
                  🐔
                </div>
                <h4 className="font-bold text-white text-sm">Your basket is empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Configure your preferred broiler weight and preparation method to get started.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                >
                  Configure Broiler
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-black text-white text-sm">{item.tierName}</h4>
                      <div className="text-xs font-bold text-blue-400">
                        {item.weightRange} (~{item.avgWeight}kg)
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Preparation:</span>
                      <strong className="text-white">{item.preparationName}</strong>
                    </div>

                    {item.pieceCut && item.pieceCut !== 'Whole / Live' && item.pieceCut !== 'Standard Food Pack' && item.pieceCut !== 'Standard Pack' && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Cut Style:</span>
                        <span className="font-bold text-blue-400">{item.pieceCut}</span>
                      </div>
                    )}

                    {item.keepGizzard && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Gizzards:</span>
                        <span className="text-slate-200">Cleaned & Packed</span>
                      </div>
                    )}

                    {item.customNotes && (
                      <div className="pt-1 text-[11px] text-slate-400 italic">
                        Note: "{item.customNotes}"
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1.5 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1.5 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-white">
                        ₦{(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        ₦{item.unitPrice.toLocaleString()} each
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Broilers Subtotal:</span>
                  <span className="font-black text-white text-sm">₦{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Delivery (Lagos, Ogun, Ibadan):</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-xl shadow-red-900/50 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Paystack & Flutterwave Checkout Supported</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
