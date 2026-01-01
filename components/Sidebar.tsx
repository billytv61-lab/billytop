
import React from 'react';
import { Page } from '../types';
import { LayoutDashboard, Pickaxe, ShieldCheck, Mail, Wallet, Users, X, Home } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  navigate: (page: Page) => void;
  currentPage: Page;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, navigate, currentPage, onClose }) => {
  const navItems = [
    { id: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: Page.MINING, label: 'Mining Game', icon: Pickaxe },
    { id: Page.WITHDRAW, label: 'Withdraw Funds', icon: Wallet },
    { id: Page.REFERRALS, label: 'Referral Center', icon: Users },
    { id: Page.ACTIVATION, label: 'Activate Account', icon: ShieldCheck },
    { id: Page.CONTACT, label: 'Support', icon: Mail },
    { id: Page.HOME, label: 'Home Page', icon: Home },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed top-16 bottom-0 left-0 w-64 bg-black border-r border-yellow-400/10 z-50 transition-transform duration-300 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 flex flex-col gap-2">
          <div className="lg:hidden flex justify-end mb-2">
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-yellow-400">
              <X size={24} />
            </button>
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)]' 
                    : 'text-gray-400 hover:bg-yellow-400/10 hover:text-yellow-400'}`}
              >
                <Icon size={20} className={isActive ? 'text-black' : 'text-yellow-400/60 group-hover:text-yellow-400'} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-8 left-4 right-4 p-4 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-transparent border border-yellow-400/10">
          <h4 className="text-xs font-bold text-yellow-400 mb-1 uppercase tracking-widest">Global Status</h4>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 w-3/4 animate-pulse"></div>
            </div>
            <span className="text-[10px] text-gray-500 font-bold">LIVE</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-2">Miners: 4,821 | Paid: 1.2M RWF</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
