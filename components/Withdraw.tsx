
import React, { useState } from 'react';
import { User, Withdrawal } from '../types';
import { Wallet, Smartphone, History, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface WithdrawProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  showNotification: (msg: string, type?: 'success' | 'info') => void;
}

const Withdraw: React.FC<WithdrawProps> = ({ user, setUser, showNotification }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'MTN' | 'Tigo'>('MTN');
  const [isProcessing, setIsProcessing] = useState(false);
  const minWithdrawal = 3000;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount < minWithdrawal) {
      showNotification(`Minimum withdrawal is ${minWithdrawal} RWF`, 'info');
      return;
    }
    
    if (withdrawAmount > user.balance) {
      showNotification('Insufficient balance', 'info');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const newWithdrawal: Withdrawal = {
        id: Math.random().toString(36).substr(2, 9),
        amount: withdrawAmount,
        date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }),
        status: 'Pending',
        method: method === 'MTN' ? 'MTN MoMo' : 'Airtel/Tigo Money'
      };

      setUser(prev => prev ? {
        ...prev,
        balance: prev.balance - withdrawAmount,
        withdrawals: [newWithdrawal, ...prev.withdrawals]
      } : null);
      
      setIsProcessing(false);
      setAmount('');
      showNotification(`Withdrawal to ${method} submitted!`, 'success');
    }, 2000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-gaming font-black mb-2 uppercase tracking-tighter">Payout <span className="text-yellow-400">Terminal</span></h2>
        <p className="text-gray-400">Transfer your digital earnings to your preferred wallet.</p>
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold uppercase animate-pulse">
          <Clock size={14} />
          Withdrawals active every hour
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-zinc-900 p-8 rounded-3xl border border-yellow-400/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/5 blur-3xl rounded-full"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-yellow-400 rounded-xl text-black shadow-lg">
              <Wallet size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Available Balance</div>
              <div className="text-3xl font-black text-white">{user.balance.toLocaleString()} <span className="text-sm text-yellow-400">RWF</span></div>
            </div>
          </div>

          <form onSubmit={handleWithdraw} className="space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Payout Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={() => setMethod('MTN')}
                  className={`py-3 rounded-xl border-2 transition-all font-bold text-sm ${method === 'MTN' ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400' : 'border-white/5 bg-black/40 text-gray-500 hover:border-white/10'}`}
                >
                  MTN MoMo
                </button>
                <button 
                  type="button"
                  onClick={() => setMethod('Tigo')}
                  className={`py-3 rounded-xl border-2 transition-all font-bold text-sm ${method === 'Tigo' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white/5 bg-black/40 text-gray-500 hover:border-white/10'}`}
                >
                  Airtel / Tigo
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Amount to Withdraw</label>
              <div className="relative">
                <input 
                  required
                  type="number" 
                  placeholder="Min: 3,000" 
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-4 px-6 focus:border-yellow-400 outline-none transition-all text-xl font-bold"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 font-bold">RWF</span>
              </div>
            </div>

            <div className="p-4 bg-yellow-400/5 rounded-2xl border border-yellow-400/10 flex items-start gap-3">
              <AlertCircle size={20} className="text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-400 leading-relaxed uppercase font-bold">
                Fast Processing: Withdrawals are authorized and paid out every hour. Make sure your number is correct.
              </p>
            </div>

            <button 
              disabled={isProcessing}
              className="w-full py-5 bg-yellow-400 text-black font-black rounded-xl glow-yellow transition-all hover:bg-yellow-300 disabled:opacity-50 text-lg uppercase tracking-tighter"
            >
              {isProcessing ? 'COMMUNICATING WITH NETWORK...' : 'INITIATE PAYOUT NOW'}
            </button>
          </form>
        </div>

        {/* History */}
        <div className="space-y-6">
          <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 shadow-xl">
            <h3 className="font-bold flex items-center gap-2 mb-6 uppercase text-sm tracking-widest text-gray-400">
              <History size={18} className="text-yellow-400" />
              Withdrawal History
            </h3>
            <div className="space-y-3">
              {user.withdrawals.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  <Smartphone size={40} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">No payout history</p>
                </div>
              ) : (
                user.withdrawals.map((w) => (
                  <div key={w.id} className="bg-black/40 p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-yellow-400/20 transition-all">
                    <div>
                      <div className="font-black text-white text-lg">{w.amount.toLocaleString()} <span className="text-[10px] text-yellow-400">RWF</span></div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase">{w.method} • {w.date}</div>
                    </div>
                    <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                      w.status === 'Paid' ? 'bg-green-500/20 text-green-500 border border-green-500/20' : 
                      w.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/20 animate-pulse' : 'bg-red-500/20 text-red-500 border border-red-500/20'
                    }`}>
                      {w.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-transparent p-6 rounded-3xl border border-green-500/20 flex items-center gap-4">
             <div className="p-3 bg-green-500 rounded-full text-black shadow-lg">
               <CheckCircle size={20} strokeWidth={3} />
             </div>
             <div>
                <span className="font-bold uppercase text-xs text-white block">Hourly Payouts Enabled</span>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Our automated system processes requests every 60 minutes.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
