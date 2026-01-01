
import React from 'react';
import { Page, User } from '../types';
import { Pickaxe, Shield, Zap, TrendingUp, PlayCircle, ArrowRight } from 'lucide-react';

interface HomeProps {
  navigate: (page: Page) => void;
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ navigate, user }) => {
  return (
    <div className="relative overflow-hidden bg-black">
      {/* Hero Section with Investment Background */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 px-4 overflow-hidden">
        {/* Investment Image Background with Numbers & Charts */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1611974714024-46274431969d?auto=format&fit=crop&q=80&w=2070" 
            alt="Investment Background" 
            className="w-full h-full object-cover object-center opacity-40 scale-110 animate-pulse-slow"
          />
          {/* Overlay Grid of Scrolling Numbers (simulated with CSS) */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none overflow-hidden font-mono text-[10px] text-yellow-500/50 flex flex-wrap gap-4 p-4 leading-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 1000).toFixed(2)} RWF 
                <br /> {Math.random().toString(36).substring(7).toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 mb-8 animate-bounce">
            < Zap size={16} className="text-yellow-400" />
            <span className="text-xs font-black text-yellow-400 tracking-widest uppercase">Earn 10,000+ RWF Daily</span>
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-gaming font-extrabold mb-6 tracking-tighter leading-tight uppercase">
            RWANDA <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">MINING</span><br />
            GROW YOUR <span className="text-white underline decoration-yellow-400 decoration-8 underline-offset-8">WEALTH</span>
          </h1>
          
          <p className="text-gray-300 text-lg lg:text-2xl max-w-3xl mx-auto mb-12 font-medium">
            Join Rwanda's elite mining network. Pay <span className="text-yellow-400 font-black">300 RWF</span> once, receive <span className="text-yellow-400 font-black text-2xl">3,000 RWF</span> bonus instantly, and start generating daily profits.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => user ? navigate(Page.MINING) : navigate(Page.REGISTER)}
              className="w-full sm:w-auto px-12 py-5 bg-yellow-400 text-black text-xl font-black rounded-2xl hover:bg-yellow-300 transition-all glow-yellow transform hover:-translate-y-2 flex items-center justify-center gap-3 group"
            >
              START MINING NOW
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => navigate(Page.CONTACT)}
              className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/20 text-white text-xl font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-md"
            >
              HOW IT WORKS
            </button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-gray-400 grayscale opacity-50">
             <div className="flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-widest">Secure by</span>
                <span className="text-xl font-gaming font-black">MTN MoMo</span>
             </div>
             <div className="w-px h-8 bg-white/20"></div>
             <div className="flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-widest">Partnered with</span>
                <span className="text-xl font-gaming font-black">AIRTEL MONEY</span>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="py-8 bg-zinc-950/80 border-y border-yellow-400/10 backdrop-blur-xl relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-gaming font-black text-yellow-400">15,420</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Active Miners</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-gaming font-black text-yellow-400">1.2M RWF</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Payouts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-gaming font-black text-yellow-400">300 RWF</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Access Fee</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-gaming font-black text-yellow-400">3,000 RWF</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Instant Bonus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Investment Showcase */}
      <section className="py-24 px-4 bg-black relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-6xl font-gaming font-black leading-tight uppercase">
                THE SMARTEST <br /><span className="text-yellow-400 underline decoration-4 underline-offset-4">INVESTMENT</span> YOU'LL MAKE TODAY.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Why wait? Our platform uses high-frequency mining algorithms optimized for local mobile hardware. 
                Activate once, earn forever. Join thousands of Rwandans who are already withdrawing daily earnings.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-center p-6 bg-zinc-900 rounded-3xl border border-white/5">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-black">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold">Automated Growth</h4>
                    <p className="text-sm text-gray-500">Your balance increases even while you sleep.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center p-6 bg-zinc-900 rounded-3xl border border-white/5">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-black">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold">Secure Withdrawals</h4>
                    <p className="text-sm text-gray-500">Direct to your MoMo wallet every hour.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-yellow-400 blur-[100px] opacity-20 rounded-full animate-pulse"></div>
              <div className="relative bg-zinc-900 border border-yellow-400/20 p-8 rounded-[40px] shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full animate-bounce"></div>
                    <span className="font-gaming font-black text-xl">LIVE EARNINGS</span>
                  </div>
                  <div className="text-xs font-bold text-gray-500 bg-black/50 px-3 py-1 rounded-full uppercase tracking-widest">Real-time</div>
                </div>
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Current Alpha Pool</span>
                    <span className="text-6xl font-gaming font-black text-white">45,821.40</span>
                    <span className="text-xl text-yellow-400 ml-2">RWF</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-black p-4 rounded-2xl border border-white/5 text-center">
                        <span className="text-[10px] text-gray-500 uppercase block">Daily Yield</span>
                        <span className="text-xl font-bold text-green-400">+12.4%</span>
                     </div>
                     <div className="bg-black p-4 rounded-2xl border border-white/5 text-center">
                        <span className="text-[10px] text-gray-500 uppercase block">Active Rate</span>
                        <span className="text-xl font-bold text-blue-400">98.2%</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Overlay */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[40px] p-8 lg:p-16 text-center text-black relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-4xl lg:text-6xl font-gaming font-black mb-6 tracking-tighter">JOIN THE FLEET TODAY</h3>
            <p className="text-black/80 text-xl mb-12 font-bold max-w-2xl mx-auto">
              Unlock your 3,000 RWF bonus and start mining. The future of wealth in Rwanda is here.
            </p>
            <button 
              onClick={() => navigate(Page.REGISTER)}
              className="px-16 py-6 bg-black text-yellow-400 text-2xl font-black rounded-3xl hover:bg-zinc-900 transition-all shadow-2xl transform group-hover:scale-105"
            >
              CREATE CORE ACCOUNT
            </button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.1) opacity: 0.4; }
          50% { transform: scale(1.05) opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s infinite ease-in-out;
        }
        @keyframes float {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        .animate-float {
          animation: float 20s infinite linear;
        }
      `}} />
    </div>
  );
};

export default Home;
