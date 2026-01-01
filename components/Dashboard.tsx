
import React, { useState } from 'react';
import { User, Page } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, ArrowUpRight, Clock, Zap, Award, Gift, Star, TrendingUp, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  showNotification: (msg: string, type?: 'success' | 'info') => void;
  navigate?: (page: Page) => void;
}

const chartData = [
  { name: 'Mon', balance: 1200 },
  { name: 'Tue', balance: 1900 },
  { name: 'Wed', balance: 3400 },
  { name: 'Thu', balance: 2800 },
  { name: 'Fri', balance: 4200 },
  { name: 'Sat', balance: 5800 },
  { name: 'Sun', balance: 7500 },
];

const Dashboard: React.FC<DashboardProps> = ({ user, setUser, showNotification, navigate }) => {
  const [claiming, setClaiming] = useState(false);

  const canClaimBonus = !user.dailyBonusLastClaimed || Date.now() - user.dailyBonusLastClaimed > 86400000;

  const handleClaimBonus = () => {
    if (!canClaimBonus) return;
    setClaiming(true);
    setTimeout(() => {
      setUser(prev => prev ? {
        ...prev,
        balance: prev.balance + 150,
        dailyBonusLastClaimed: Date.now(),
        achievements: Array.from(new Set([...prev.achievements, 'Early Bird']))
      } : null);
      setClaiming(false);
      showNotification('Daily Bonus Claimed! +150 RWF', 'success');
    }, 1500);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Activation Prompt for non-activated users */}
      {!user.isActivated && (
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl p-6 lg:p-10 text-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(251,191,36,0.2)] animate-pulse hover:animate-none transition-all">
          <div className="flex items-center gap-6">
            <div className="bg-black/10 p-4 rounded-2xl">
              <AlertTriangle size={48} className="text-black" />
            </div>
            <div>
              <h3 className="text-3xl font-gaming font-black uppercase tracking-tighter">ACCOUNT INACTIVE</h3>
              <p className="font-bold opacity-80 max-w-md">Activate your account for only 300 RWF to unlock withdrawals and premium mining speed!</p>
            </div>
          </div>
          <button 
            onClick={() => navigate && navigate(Page.ACTIVATION)}
            className="w-full md:w-auto px-10 py-5 bg-black text-yellow-400 font-black rounded-2xl text-xl hover:scale-105 transition-transform shadow-xl flex flex-col items-center"
          >
            <span>CLICK HERE TO PAY</span>
          </button>
        </div>
      )}

      {/* Level & Bonus Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-yellow-400/20 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              <Star size={32} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase">Mining Authority</h3>
              <div className="text-2xl font-gaming font-black text-yellow-400">LEVEL {user.miningLevel}</div>
              <div className="text-xs text-gray-500 mt-1">Next Level: {((user.totalMined / (user.miningLevel * 2000)) * 100).toFixed(0)}%</div>
            </div>
          </div>
          <div className="flex-1 max-w-[120px] ml-4">
             <div className="h-2 bg-white/5 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-yellow-400 transition-all duration-1000" 
                 style={{ width: `${Math.min(100, (user.totalMined / (user.miningLevel * 2000)) * 100)}%` }} 
               />
             </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${canClaimBonus ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-500'}`}>
              <Gift size={32} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase">Daily Gift</h3>
              <div className="text-xl font-bold">{canClaimBonus ? 'Available Now!' : 'Come back later'}</div>
            </div>
          </div>
          <button 
            disabled={!canClaimBonus || claiming}
            onClick={handleClaimBonus}
            className={`px-6 py-3 rounded-xl font-black text-xs transition-all ${canClaimBonus ? 'bg-yellow-400 text-black glow-yellow' : 'bg-white/5 text-gray-500'}`}
          >
            {claiming ? 'CLAIMING...' : 'CLAIM BONUS'}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-yellow-400/20 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Wallet size={80} className="text-yellow-400" />
          </div>
          <div className="relative z-10">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Total Balance</div>
            <div className="text-4xl font-gaming font-black text-yellow-400 mb-4">{user.balance.toLocaleString()} RWF</div>
            <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
              <ArrowUpRight size={16} />
              <span>Healthy Status</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-xl">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Referrals</div>
          <div className="text-4xl font-gaming font-black text-white mb-4">{user.referralCount}</div>
          <div className="text-xs text-gray-400">Earn 500 RWF per active friend</div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-xl">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Power Mode</div>
          <div className="text-4xl font-gaming font-black text-white mb-4">
            {user.miningSpeed} <span className="text-xl text-gray-500">U/H</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
            <Zap size={16} className="animate-pulse" />
            <span>Optimal Hardware</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-xl">
        <h3 className="text-xl font-gaming font-bold mb-8 flex items-center gap-2">
          <TrendingUp className="text-yellow-400" size={24} />
          Mining Growth
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #fbbf24', borderRadius: '12px' }}
                itemStyle={{ color: '#fbbf24' }}
              />
              <Area type="monotone" dataKey="balance" stroke="#fbbf24" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5">
        <h3 className="text-xl font-gaming font-bold mb-6 flex items-center gap-2">
          <Award className="text-yellow-400" size={24} />
          Achievements & Badges
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {['First Strike', 'Big Earner', 'Loyal Miner', 'Social Butterfly', 'Level Pro', 'Early Bird'].map((ach) => {
            const isUnlocked = user.achievements.includes(ach);
            return (
              <div 
                key={ach} 
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${isUnlocked ? 'border-yellow-400/40 bg-yellow-400/5 opacity-100 shadow-[0_0_10px_rgba(251,191,36,0.1)]' : 'border-white/5 bg-white/5 opacity-30 grayscale'}`}
              >
                <Award size={32} className={isUnlocked ? 'text-yellow-400' : 'text-gray-600'} />
                <span className="text-[10px] font-bold text-center uppercase tracking-tighter">{ach}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
