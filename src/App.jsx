import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BroilerConfigurator from './components/BroilerConfigurator';
import UpcomingShowroom from './components/UpcomingShowroom';
import WhySAJFarm from './components/WhySAJFarm';
import OrderTracker from './components/OrderTracker';
import AdminDashboard from './components/AdminDashboard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import CustomerAuthModal from './components/CustomerAuthModal';
import PaymentGatewayModal from './components/PaymentGatewayModal';
import NotifyModal from './components/NotifyModal';
import BotSupport from './components/BotSupport';
import Footer from './components/Footer';

function MainContent() {
  const { currentView } = useStore();

  return (
    <main className="min-h-screen flex flex-col justify-between bg-slate-950 text-white">
      <div>
        {currentView === 'shop' && (
          <>
            <Hero />
            <BroilerConfigurator />
            <UpcomingShowroom />
            <WhySAJFarm />
          </>
        )}

        {currentView === 'upcoming' && (
          <div className="pt-4">
            <UpcomingShowroom />
            <WhySAJFarm />
          </div>
        )}

        {currentView === 'track' && (
          <OrderTracker />
        )}

        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </div>

      <Footer />

      {/* Global Modals & Bot Assistant */}
      <CartDrawer />
      <CheckoutModal />
      <CustomerAuthModal />
      <PaymentGatewayModal />
      <NotifyModal />
      <BotSupport />
    </main>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 antialiased font-sans selection:bg-red-600 selection:text-white">
        <Navbar />
        <MainContent />
      </div>
    </StoreProvider>
  );
}
