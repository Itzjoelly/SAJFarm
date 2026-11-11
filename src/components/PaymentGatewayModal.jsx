import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, Lock, CreditCard, Building2, Smartphone, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function PaymentGatewayModal() {
  const { activePaymentModal, setActivePaymentModal } = useStore();
  const [paymentTab, setPaymentTab] = useState('card');
  const [cardNumber, setCardNumber] = useState('4084 0841 2345 6789');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('821');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!activePaymentModal) return null;

  const { gateway, amount, customerEmail, customerPhone, onComplete } = activePaymentModal;
  const isPaystack = gateway === 'paystack';

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        const refId = (isPaystack ? 'PSTK-' : 'FLW-') + Math.random().toString(36).substring(2, 9).toUpperCase();
        onComplete({
          gateway,
          reference: refId,
          channel: paymentTab,
          paidAt: new Date().toISOString()
        });
        setActivePaymentModal(null);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => !isProcessing && setActivePaymentModal(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-4 relative">
        <div className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-8 text-white">
          {/* Header */}
          <div
            className={`p-5 flex items-center justify-between border-b ${
              isPaystack
                ? 'bg-gradient-to-r from-teal-900 via-slate-900 to-blue-900 border-teal-800'
                : 'bg-gradient-to-r from-amber-900 via-slate-900 to-blue-900 border-amber-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black text-sm">
                {isPaystack ? '⚡' : '🦋'}
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>Pay with {isPaystack ? 'Paystack' : 'Flutterwave'}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
                    Secured
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300">
                  {customerEmail || 'customer@sajfarm.com'}
                </p>
              </div>
            </div>

            {!isProcessing && (
              <button
                onClick={() => setActivePaymentModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Amount banner */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">SAJFarm Order Amount:</span>
            <span className="text-xl font-black text-white">₦{amount?.toLocaleString()}</span>
          </div>

          {/* Body */}
          <div className="p-5">
            {isSuccess ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-base font-bold text-white">Payment Approved!</h4>
                <p className="text-xs text-slate-400">
                  Verified via {isPaystack ? 'Paystack' : 'Flutterwave'} gateway. Routing to live dispatch tracking...
                </p>
              </div>
            ) : (
              <form onSubmit={handlePay} className="space-y-4">
                {/* Channel tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentTab('card')}
                    className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 transition-colors ${
                      paymentTab === 'card'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('transfer')}
                    className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 transition-colors ${
                      paymentTab === 'transfer'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Transfer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('ussd')}
                    className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 transition-colors ${
                      paymentTab === 'ussd'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>USSD</span>
                  </button>
                </div>

                {paymentTab === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs font-mono px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                        placeholder="•••• •••• •••• ••••"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength="4"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentTab === 'transfer' && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <div className="text-slate-400">Transfer exactly to this temporary virtual account:</div>
                    <div className="font-bold text-white text-sm">Wema Bank / {isPaystack ? 'Paystack-SAJ' : 'Flutterwave-SAJ'}</div>
                    <div className="font-mono text-base font-black text-blue-400 tracking-wider">7829 1102 44</div>
                    <div className="text-[11px] text-slate-500">Account expires in 29:50 minutes</div>
                  </div>
                )}

                {paymentTab === 'ussd' && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <div className="text-slate-400">Dial the USSD string on your registered SIM:</div>
                    <div className="font-mono text-sm font-black text-amber-400 bg-slate-900 p-2 rounded-lg text-center">
                      *737*000*4921# (GTBank / Access / Zenith)
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3.5 rounded-xl font-black text-xs text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isPaystack
                      ? 'bg-teal-600 hover:bg-teal-500 shadow-teal-900/40'
                      : 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/40'
                  } ${isProcessing ? 'opacity-80 cursor-wait' : ''}`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authorizing with Bank 3D-Secure...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pay ₦{amount?.toLocaleString()} Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>256-Bit Bank Grade Encryption • PCI-DSS Certified</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
