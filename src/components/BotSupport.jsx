import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Truck,
  PhoneCall,
  ArrowRight,
  User,
  Bot,
  Flame,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { WEIGHT_TIERS, PREPARATION_OPTIONS, DELIVERY_ZONES } from '../data/products';

export default function BotSupport() {
  const { orders, setTrackingId, setCurrentView, setIsCartOpen, currentUser, setSelectedCategory } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello${currentUser?.name ? ' ' + currentUser.name.split(' ')[0] : ''}! 👋 I am **SAJBot**, your 24/7 SAJFarm digital assistant.\n\nI can help you with:\n• Broiler prices & weight ranges\n• Halal slaughtering & custom butcher cuts\n• Delivery coverage (Lagos, Ogun, Ibadan)\n• Live order tracking & payment options`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    { label: '🐔 Broiler Prices & Weight', query: 'What are your broiler weights and prices?' },
    { label: '🔪 Slaughter & Butcher Cuts', query: 'How does the slaughter, defeathering and cutting into pieces work?' },
    { label: '🚚 Delivery & Van Fallback', query: 'Where do you deliver and what is the mandatory van fallback landmark?' },
    { label: '📦 Track My Order', query: 'How can I track my order?' },
    { label: '💳 Paystack & Flutterwave', query: 'What payment methods do you accept?' },
    { label: '💬 Chat on WhatsApp', query: 'Can I speak with a human farm agent?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Intelligent response generator
  const generateBotReply = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    // 1. Order ID Lookup
    const orderMatch = userQuery.match(/SAJ-\d{4}-[A-Z]{2}/i);
    if (orderMatch) {
      const foundOrder = orders.find(
        (o) => o.id.toUpperCase() === orderMatch[0].toUpperCase()
      );
      if (foundOrder) {
        return {
          text: `🔍 **Order Found:** \`${foundOrder.id}\`\n\n• **Customer:** ${foundOrder.customerName}\n• **Status:** ${foundOrder.status.replace(/_/g, ' ').toUpperCase()}\n• **Estimated Arrival:** ${foundOrder.estimatedArrival}\n• **Driver:** ${foundOrder.driverName} (${foundOrder.driverPhone})\n• **Van Plate:** ${foundOrder.vanPlate}\n• **Van Fallback Landmark:** ${foundOrder.mandatoryFallback}\n\nWould you like me to open the live radar tracking screen for you?`,
          action: { label: 'Open Live Radar Tracker', type: 'track', value: foundOrder.id }
        };
      } else {
        return {
          text: `I looked up **${orderMatch[0]}**, but couldn't locate it in the system. Please verify the ID or check your phone number.`
        };
      }
    }

    // 2. Track order inquiry
    if (q.includes('track') || q.includes('where is my order') || q.includes('status')) {
      return {
        text: `You can track any active order in real time! Just enter your **Tracking ID** (e.g., \`SAJ-8942-LG\`) right here in this chat, or open our live radar tracker.`,
        action: { label: 'Go to Order Tracker', type: 'nav', value: 'track' }
      };
    }

    // 3. Price & Weight inquiry
    if (q.includes('price') || q.includes('cost') || q.includes('weight') || q.includes('how much') || q.includes('broiler')) {
      let tiersText = `Here is our official **SAJFarm Broiler Weight & Price List**:\n\n`;
      WEIGHT_TIERS.forEach((t) => {
        tiersText += `• **${t.name} (${t.weightRange})**: ₦${t.basePrice.toLocaleString()} per bird\n`;
      });
      tiersText += `\n*Birds are priced dynamically by verified farm weight!*`;
      return {
        text: tiersText,
        action: { label: 'Customize Your Broiler', type: 'nav', value: 'shop' }
      };
    }

    // 4. Slaughtering, Defeathering & Butcher Cuts
    if (q.includes('cut') || q.includes('slaughter') || q.includes('kill') || q.includes('feather') || q.includes('pieces') || q.includes('dress') || q.includes('gizzard')) {
      return {
        text: `We offer **3 preparation options** for every broiler:\n\n1. **Live Bird** (₦0): Delivered alive in ventilated, sanitized crates.\n2. **Kill & Defeather** (+₦500): Halal slaughtered, plucked spotless, singed, gutted, and rinsed with clean treated water.\n3. **Kill, Defeather & Cut into Pieces** (+₦800): Butchered into **4, 8, 12, or 16 pieces** of your choice!\n\n*(You can also request cleaned gizzard, liver & heart at no extra charge).*`,
        action: { label: 'Configure Preparation', type: 'nav', value: 'shop' }
      };
    }

    // 5. Delivery Coverage & Van Fallback Landmark
    if (q.includes('deliver') || q.includes('location') || q.includes('lagos') || q.includes('ogun') || q.includes('ibadan') || q.includes('fallback') || q.includes('landmark') || q.includes('van')) {
      return {
        text: `🚚 **Delivery Coverage & Policy:**\n\n• **States Covered:** We deliver exclusively across **Lagos State**, **Ogun State**, and **Ibadan (Oyo State)** in refrigerated farm vans.\n\n• **Mandatory Van Fallback Landmark:** Because our refrigerated transit vans cannot enter narrow alleys or locked gates, you must provide a nearby accessible landmark (e.g. Estate Gate, Filling Station, or Junction) during checkout so our driver never misses your drop-off.`
      };
    }

    // 6. Payment methods (Paystack, Flutterwave, POD)
    if (q.includes('pay') || q.includes('paystack') || q.includes('flutterwave') || q.includes('transfer') || q.includes('pod') || q.includes('card')) {
      return {
        text: `💳 **We accept all major secure payment channels:**\n\n• **Paystack** (Debit Cards, Bank Transfer, USSD)\n• **Flutterwave** (Cards, Mobile Money, Barter)\n• **Direct Bank Transfer**\n• **Pay on Delivery (Cash / POS)**\n\nAll online transactions are 256-bit encrypted and PCI-DSS certified.`
      };
    }

    // 7. Livestock, Ram, Cow, Goat, Pig, Frozen Meats & Eggs
    if (q.includes('ram') || q.includes('cow') || q.includes('goat') || q.includes('pig') || q.includes('rabbit') || q.includes('frozen') || q.includes('turkey') || q.includes('pork') || q.includes('egg') || q.includes('livestock')) {
      return {
        text: `🌟 **Multi-Category Farm Catalog:**\n\nYou can order all of these directly from our store right now:\n\n• **Live Livestock:** Balami Rams (₦185,000+), Fulani Cows (₦480,000+), Boer Goats, and Rabbits (Live or abattoir slaughtered)\n• **Frozen Meats:** Prime Turkey Wings (2kg @ ₦11,500), Pork Chops & Ribs (1.5kg @ ₦8,500)\n• **Daily Farm Eggs:** Fresh Jumbo Eggs (Crate of 30 @ ₦4,200)\n\nAll items dispatched in our refrigerated vans across Lagos, Ogun & Ibadan!`,
        action: { label: 'Shop Meats & Livestock', type: 'category', value: 'livestock' }
      };
    }

    // 8. Human agent / WhatsApp
    if (q.includes('human') || q.includes('agent') || q.includes('whatsapp') || q.includes('call') || q.includes('speak') || q.includes('phone')) {
      return {
        text: `You can chat directly with our farm logistics coordinator on WhatsApp or call our dispatch hotline:\n\n📞 **Hotline:** 0803 725 3276\n💬 **WhatsApp:** Click the link below to start a live chat!`,
        action: {
          label: 'Chat with Agent on WhatsApp',
          type: 'link',
          value: 'https://wa.me/2348037253276?text=Hello%20SAJFarm,%20I%20need%20assistance'
        }
      };
    }

    // Default fallback
    return {
      text: `Thank you for contacting SAJFarm! We are a full-scale farm e-commerce platform offering **Fresh Broilers**, **Frozen Turkey & Pork**, **Live Rams, Cows & Goats**, and **Crates of Eggs** across Lagos, Ogun, and Ibadan.\n\nHow can I help you today?`
    };
  };

  const handleSendMessage = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(textToSend);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply.text,
        action: reply.action,
        time: 'Just now'
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleActionClick = (action) => {
    if (action.type === 'category') {
      setSelectedCategory(action.value);
      setCurrentView('shop');
      setIsOpen(false);
      const el = document.getElementById('products-catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action.type === 'nav') {
      setCurrentView(action.value);
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action.type === 'track') {
      setTrackingId(action.value);
      setCurrentView('track');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action.type === 'link') {
      window.open(action.value, '_blank');
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `Chat restarted! How can I assist you with your fresh poultry order today?`,
        time: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* FLOATING BOT TRIGGER BUTTON (BOTTOM RIGHT) */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-extrabold text-xs shadow-2xl shadow-red-950/60 border border-white/20 transition-all hover:scale-105 active:scale-95"
            aria-label="Open SAJBot Support"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-white animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950"></span>
            </div>
            <div className="text-left">
              <div className="text-[11px] font-black leading-tight flex items-center gap-1">
                <span>SAJBot Support</span>
                <span className="text-[9px] bg-white/20 px-1 py-0.2 rounded font-bold">AI</span>
              </div>
              <div className="text-[9px] text-slate-200 font-normal">Need help? Ask me anything</div>
            </div>
          </button>
        )}
      </div>

      {/* CHATBOT DRAWER / POPUP WINDOW */}
      {isOpen && (
        <div className="fixed bottom-5 right-3 sm:right-5 z-50 w-[94vw] sm:w-[420px] max-h-[85vh] h-[580px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white animate-fadeIn">
          {/* BOT HEADER: BLACK, RED & BLUE */}
          <div className="p-4 bg-gradient-to-r from-red-700 via-slate-950 to-blue-700 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-red-400 shadow-md">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm text-white">SAJBot Assistant</h3>
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800 uppercase">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Instant help for poultry, logistics & tracking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Restart conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES BODY */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/80">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      🤖
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2 ${isBot ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        isBot
                          ? 'bg-slate-900 border border-slate-800 text-slate-200'
                          : 'bg-red-600 text-white font-medium shadow-md shadow-red-900/40 rounded-br-xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Interactive Action Button from Bot */}
                    {isBot && msg.action && (
                      <button
                        type="button"
                        onClick={() => handleActionClick(msg.action)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-md shadow-blue-900/40 transition-colors"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="text-[10px] text-slate-500 px-1">
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800 w-fit">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-[11px]">SAJBot is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPT PILLS */}
          <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-thin">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p.query)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-600/60 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about weights, slaughter cuts, tracking..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white transition-all shadow-md shadow-red-900/40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
