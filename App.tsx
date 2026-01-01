
import React, { useState, useEffect } from 'react';
import { Page, User } from './types';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import MiningGame from './components/MiningGame';
import Activation from './components/Activation';
import Withdraw from './components/Withdraw';
import Referrals from './components/Referrals';
import Contact from './components/Contact';
import Auth from './components/Auth';
import Footer from './components/Footer';
import { Bell } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // Mock persistence
  useEffect(() => {
    const savedUser = localStorage.getItem('mineNowUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mineNowUser', JSON.stringify(user));
    }
  }, [user]);

  const showNotification = (message: string, type: 'success' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mineNowUser');
    setCurrentPage(Page.HOME);
  };

  const navigate = (page: Page) => {
    // STRICT ENFORCEMENT: If user is logged in but not activated, force them to the Activation page
    // Only allow Contact and Logout (via Navbar) or Home
    if (user && !user.isActivated && page !== Page.ACTIVATION && page !== Page.CONTACT && page !== Page.HOME) {
      showNotification('Access Denied: Activation Required', 'info');
      setCurrentPage(Page.ACTIVATION);
    } else {
      setCurrentPage(page);
    }
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (!user && [Page.DASHBOARD, Page.MINING, Page.ACTIVATION, Page.WITHDRAW, Page.REFERRALS].includes(currentPage)) {
      return <Auth mode="login" setUser={setUser} navigate={navigate} />;
    }

    // Force activation view if user is logged in but not activated and trying to access app features
    if (user && !user.isActivated && [Page.DASHBOARD, Page.MINING, Page.WITHDRAW, Page.REFERRALS].includes(currentPage)) {
      return <Activation user={user!} setUser={setUser} navigate={navigate} />;
    }

    switch (currentPage) {
      case Page.HOME: return <Home navigate={navigate} user={user} />;
      case Page.DASHBOARD: return <Dashboard user={user!} setUser={setUser} showNotification={showNotification} navigate={navigate} />;
      case Page.MINING: return <MiningGame user={user!} setUser={setUser} showNotification={showNotification} />;
      case Page.ACTIVATION: return <Activation user={user!} setUser={setUser} navigate={navigate} />;
      case Page.WITHDRAW: return <Withdraw user={user!} setUser={setUser} showNotification={showNotification} />;
      case Page.REFERRALS: return <Referrals user={user!} />;
      case Page.CONTACT: return <Contact />;
      case Page.LOGIN: return <Auth mode="login" setUser={setUser} navigate={navigate} />;
      case Page.REGISTER: return <Auth mode="register" setUser={setUser} navigate={navigate} />;
      default: return <Home navigate={navigate} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar 
        user={user} 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        navigate={navigate}
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      
      <div className="flex flex-1 relative pt-16">
        {user && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            navigate={navigate} 
            currentPage={currentPage} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        )}
        
        <main className={`flex-1 transition-all duration-300 ${user ? 'lg:ml-64' : ''}`}>
          {renderPage()}
        </main>
      </div>

      {/* Real-time Notification Overlay */}
      {notification && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-8 duration-300">
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl ${notification.type === 'success' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-yellow-400/20 border-yellow-400 text-yellow-400'}`}>
            <Bell size={18} className="animate-ring" />
            <span className="font-bold text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      <Footer navigate={navigate} />
    </div>
  );
};

export default App;
