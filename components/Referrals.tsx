
import React, { useState } from 'react';
import { User } from '../types';
import { Users, Copy, Share2, Award, Zap } from 'lucide-react';

interface ReferralsProps {
  user: User;
}

const Referrals: React.FC<ReferralsProps> = ({ user }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `https://rwandamining.com/join?ref=${user.username.toLowerCase()}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div className="bg-zinc-900 p-8 lg:p-12 rounded-3xl border border-yellow-400/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Users size={200} className="text-yellow-400" />
        </div>
        
        <div className="relative z-10 text-center lg:text-left max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-gaming font-black mb-6 uppercase tracking-tight">Refer & <span className="text-yellow-400">Earn</span></h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Invite your friends to RWANDA MINING and receive <strong>500 RWF</strong> instantly for every friend who activates their account. There is no limit to how much you can earn!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <div className="flex-1 bg-black border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs text-gray-500 truncate mr-4">{referralLink}</span>
                <button 
                  onClick={copyLink}
                  className="p-2 hover:bg-yellow-400 hover:text-black rounded-lg transition-all"
                >
                  <Copy size={20} />
                </button>
             </div>
             <button className="px-8 py-4 bg-yellow-400 text-black font-black rounded-2xl glow-yellow flex items-center justify-center gap-2">
                <Share2 size={20} /> SHARE LINK
             </button>
          </div>
          {copied && <p className="text-yellow-400 text-xs mt-3 font-bold animate-pulse">Link copied to clipboard!</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatBox icon={<Users className="text-blue-400" />} label="Total Invites" value={user.referralCount.toString()} />
        <StatBox icon={<Zap className="text-yellow-400" />} label="Active Referrals" value={Math.floor(user.referralCount * 0.6).toString()} />
        <StatBox icon={<Award className="text-green-400" />} label="Total Commission" value={`${(user.referralCount * 500).toLocaleString()} RWF`} />
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
        <h3 className="text-xl font-gaming font-bold mb-8 uppercase tracking-widest">Global Leaderboard</h3>
        <div className="space-y-4">
          {[
            { user: 'Rwanda_King', count: 154, earnings: '77,000 RWF' },
            { user: 'MiningPro99', count: 89, earnings: '44,500 RWF' },
            { user: 'Keza_M', count: 42, earnings: '21,000 RWF' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500">#{i + 1}</div>
                <div>
                  <div className="font-bold">{item.user}</div>
                  <div className="text-[10px] text-gray-500">{item.count} friends invited</div>
                </div>
              </div>
              <div className="font-black text-yellow-400">{item.earnings}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 flex items-center gap-4">
    <div className="p-3 bg-white/5 rounded-2xl">{icon}</div>
    <div>
      <div className="text-xs text-gray-500 uppercase font-bold">{label}</div>
      <div className="text-2xl font-black">{value}</div>
    </div>
  </div>
);

export default Referrals;
