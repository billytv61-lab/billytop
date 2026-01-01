
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { Pickaxe, Sparkles, TrendingUp, AlertCircle, Cpu, Zap, Target } from 'lucide-react';
import { getMiningInsights } from '../services/geminiService';

interface MiningGameProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  showNotification: (msg: string, type?: 'success' | 'info') => void;
}

const MiningGame: React.FC<MiningGameProps> = ({ user, setUser, showNotification }) => {
  const [isMining, setIsMining] = useState(false);
  const [sessionBalance, setSessionBalance] = useState(0);
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const currentSpeed = isBoosting ? user.miningSpeed * 1.5 : user.miningSpeed;

  const startMining = () => {
    if (!user.isActivated) return;
    setIsMining(true);
    fetchInsight();
    showNotification('Mining hardware online', 'info');
    
    intervalRef.current = window.setInterval(() => {
      setSessionBalance(prev => prev + (currentSpeed / 3600));
    }, 1000);
  };

  const stopMining = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsMining(false);
    setIsBoosting(false);
    
    const finalSessionEarning = sessionBalance;
    setUser(prev => {
      if (!prev) return null;
      const newTotalMined = prev.totalMined + finalSessionEarning;
      const newLevel = Math.floor(newTotalMined / 2000) + 1;
      const updatedAchievements = [...prev.achievements];
      if (!updatedAchievements.includes('First Strike')) updatedAchievements.push('First Strike');
      
      return {
        ...prev,
        balance: prev.balance + finalSessionEarning,
        totalMined: newTotalMined,
        miningLevel: newLevel,
        lastMiningTime: Date.now(),
        achievements: Array.from(new Set(updatedAchievements))
      };
    });
    setSessionBalance(0);
    showNotification(`Session saved: +${finalSessionEarning.toFixed(2)} RWF`, 'success');
  };

  const fetchInsight = async () => {
    setIsLoadingInsight(true);
    const text = await getMiningInsights(user.balance, user.miningSpeed);
    setInsight(text || null);
    setIsLoadingInsight(false);
  };

  const activateBoost = () => {
    if (!isMining || isBoosting) return;
    setIsBoosting(true);
    showNotification('Overclocking active! x1.5 speed', 'info');
    setTimeout(() => setIsBoosting(false), 30000); // 30s boost
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!user.isActivated) {
    return (
      <div className="p-4 lg:p-8 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="bg-white/5 border border-yellow-400/20 p-8 rounded-3xl text-center max-w-md">
          <AlertCircle size={64} className="text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-gaming font-bold mb-4">TERMINAL LOCKED</h2>
          <p className="text-gray-400 mb-8">
            You must activate your account for 300 RWF before you can access the core mining engine.
          </p>
          <button className="w-full py-4 bg-yellow-400 text-black font-black rounded-xl glow-yellow">
            ACTIVATE NOW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className={`bg-zinc-900 border transition-all duration-500 rounded-3xl p-8 relative overflow-hidden ${isBoosting ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-yellow-400/20'}`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className={`h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${isBoosting ? 'from-blue-400' : 'from-yellow-400'} via-transparent to-transparent ${isMining ? 'animate-pulse' : ''}`} />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-widest">Engine Status</h2>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isMining ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
                    <span className="font-gaming font-bold uppercase">{isMining ? (isBoosting ? 'OVERCLOCKED' : 'ACTIVE') : 'IDLE'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-widest">Processing Speed</h2>
                  <span className="font-gaming font-bold text-2xl">{currentSpeed.toFixed(0)} <span className="text-sm text-gray-500">U/H</span></span>
                </div>
              </div>

              <div className="relative group cursor-pointer" onClick={isMining ? stopMining : startMining}>
                <div className={`w-48 h-48 lg:w-64 lg:h-64 rounded-full border-4 border-dashed flex items-center justify-center transition-all duration-500 ${isMining ? 'rotate-180' : ''} ${isBoosting ? 'border-blue-500/50' : 'border-yellow-400/30'}`}>
                  <div className={`w-40 h-40 lg:w-52 lg:h-52 rounded-full flex items-center justify-center shadow-2xl transition-all transform ${isMining ? 'scale-110 animate-pulse' : 'hover:scale-105'} ${isBoosting ? 'bg-blue-500 text-white' : 'bg-yellow-400 text-black'}`}>
                    <Pickaxe size={64} className={`${isMining ? 'animate-bounce' : ''}`} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center w-full">
                <div className="text-xs text-gray-400 uppercase tracking-tighter mb-1">Session Profits</div>
                <div className="text-4xl lg:text-7xl font-gaming font-black text-white">
                  {sessionBalance.toFixed(4)} <span className="text-2xl opacity-50 text-yellow-400">RWF</span>
                </div>
              </div>

              <div className="mt-10 flex gap-4 w-full max-w-md">
                <button 
                  onClick={isMining ? stopMining : startMining}
                  className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all ${isMining ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black glow-yellow'}`}
                >
                  {isMining ? 'STOP MINING' : 'START MINING'}
                </button>
                
                {isMining && (
                  <button 
                    onClick={activateBoost}
                    disabled={isBoosting}
                    className={`px-6 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${isBoosting ? 'bg-blue-500/50 text-white cursor-wait' : 'bg-blue-500 text-white shadow-lg hover:scale-105'}`}
                  >
                    <Zap size={24} />
                    BOOST
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Target size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Mined (Lifetime)</div>
                <div className="text-lg font-bold">{user.totalMined.toFixed(2)} RWF</div>
              </div>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <Sparkles size={24} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Next Upgrade At</div>
                <div className="text-lg font-bold">{((user.miningLevel) * 2000).toLocaleString()} RWF</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-zinc-900 border border-yellow-400/20 rounded-3xl p-6">
            <div className="flex items-center gap-2 text-yellow-400 mb-4">
              <Sparkles size={20} />
              <h3 className="font-bold uppercase tracking-wider text-sm">AI Mining Insights</h3>
            </div>
            {isLoadingInsight ? (
              <div className="space-y-3">
                <div className="h-4 bg-white/5 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-white/5 animate-pulse rounded w-full"></div>
              </div>
            ) : (
              <p className="text-gray-300 text-sm leading-relaxed italic">"{insight || 'Idle for now. Start mining to get strategic insights.'}"</p>
            )}
          </div>

          <div className="bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/20 rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-yellow-400" size={20} />
              Top Global Earners
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Keza_M', amount: '45,200 RWF', level: 14 },
                { name: 'AlphaMinr', amount: '38,100 RWF', level: 12 },
                { name: 'RwandaGamer', amount: '31,500 RWF', level: 9 },
              ].map((top, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-300">#{i + 1} {top.name}</span>
                    <span className="text-[10px] text-gray-500">LEVEL {top.level}</span>
                  </div>
                  <span className="font-bold text-yellow-400">{top.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningGame;
