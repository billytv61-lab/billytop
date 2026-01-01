
import React, { useState } from 'react';
import { Page, User } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight, Pickaxe } from 'lucide-react';

interface AuthProps {
  mode: 'login' | 'register';
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  navigate: (page: Page) => void;
}

const Auth: React.FC<AuthProps> = ({ mode, setUser, navigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      balance: 0, // Balance starts at 0, 3000 bonus is given after activation
      isActivated: false,
      miningSpeed: 50,
      miningLevel: 1,
      totalMined: 0,
      referralCount: 0,
      withdrawals: [],
      achievements: ['Loyal Miner']
    };
    setUser(mockUser);
    // After login/register, if not activated, navigate strictly will take them to Activation
    navigate(Page.DASHBOARD);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-yellow-400/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-400/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-yellow-400/10 blur-3xl rounded-full" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-4 shadow-lg transform -rotate-12">
               <Pickaxe size={32} className="text-black" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-gaming font-black mb-2 uppercase tracking-tighter">
              {mode === 'login' ? 'Welcome Back' : 'Mining Fleet Alpha'}
            </h2>
            <p className="text-gray-400 text-sm">
              {mode === 'login' ? 'Enter your credentials to access your terminal.' : 'Register now to start your activation process.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Username</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="MiningHero" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-yellow-400 text-black font-black rounded-xl glow-yellow transition-all hover:bg-yellow-300 flex items-center justify-center gap-2 group"
            >
              {mode === 'login' ? 'INITIALIZE LOGIN' : 'CREATE CORE ACCOUNT'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate(mode === 'login' ? Page.REGISTER : Page.LOGIN)}
              className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
            >
              {mode === 'login' ? "Don't have an account? Join Now" : "Already in the fleet? Access Portal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
