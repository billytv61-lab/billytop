
import React from 'react';
import { Page, User } from '../types';
import { Menu, LogOut, User as UserIcon, Coins } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onMenuClick: () => void;
  navigate: (page: Page) => void;
  onLogout: () => void;
  currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ user, onMenuClick, navigate, onLogout, currentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-yellow-400/20 z-50 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        {user && (
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-yellow-400/10 rounded-lg text-yellow-400"
          >
            <Menu size={24} />
          </button>
        )}
        <div 
          onClick={() => navigate(Page.HOME)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center glow-yellow transition-transform group-hover:scale-105">
            <Coins className="text-black" size={24} strokeWidth={3} />
          </div>
          <span className="text-2xl font-gaming font-extrabold tracking-tighter text-yellow-400 hidden sm:block">
            RWANDA MINING
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <div className="flex gap-2">
            <button 
              onClick={() => navigate(Page.LOGIN)}
              className="px-4 py-2 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => navigate(Page.REGISTER)}
              className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all glow-yellow"
            >
              Join Now
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs text-gray-400">Balance</span>
              <span className="text-sm font-bold text-yellow-400">{user.balance.toLocaleString()} RWF</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full">
              <UserIcon size={18} className="text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400 hidden sm:block">{user.username}</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
