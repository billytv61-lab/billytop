
import React, { useState } from 'react';
import { User, Page } from '../types';
import { ShieldCheck, Smartphone, CheckCircle2, Copy, Zap, Gift, Info } from 'lucide-react';

interface ActivationProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  navigate: (page: Page) => void;
}

const Activation: React.FC<ActivationProps> = ({ user, setUser, navigate }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const ussdCode = "*182*1*1*0791385529#";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ussdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment verification delay
    setTimeout(() => {
      setUser(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          isActivated: true, 
          balance: prev.balance + 3000, // 3000 RWF Bonus
          achievements: Array.from(new Set([...prev.achievements, 'Early Bird']))
        };
      });
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  if (user.isActivated && step !== 3) {
    return (
      <div className="p-8 text-center max-w-2xl mx-auto mt-20">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-4xl font-gaming font-black text-white mb-4 uppercase tracking-tighter">ACCOUNT ACTIVE</h2>
        <p className="text-gray-400 mb-8">
          Your node is fully operational. You have access to the core mining terminal.
        </p>
        <button 
          onClick={() => navigate(Page.MINING)}
          className="px-10 py-4 bg-yellow-400 text-black font-black rounded-xl hover:bg-yellow-300 transition-all glow-yellow"
        >
          OPEN MINING TERMINAL
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h2 className="text-4xl lg:text-5xl font-gaming font-black mb-4 uppercase tracking-tighter text-yellow-400">ACTIVATION REQUIRED</h2>
        <div className="bg-yellow-400/10 border border-yellow-400/30 p-6 rounded-3xl mt-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20"><Zap className="text-yellow-400" size={40} /></div>
          <p className="text-white text-lg font-bold leading-relaxed relative z-10">
            Pay <span className="text-yellow-400 underline decoration-2">300 RWF</span> once and unlock your 
            <span className="text-yellow-400"> 3,000 RWF instant bonus</span>. 
            Access is restricted until activation is confirmed.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-[40px] border border-yellow-400/20 overflow-hidden shadow-2xl transition-all duration-500">
        <div className="flex h-1.5 bg-white/5">
          <div className={`transition-all duration-700 bg-yellow-400 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`} />
        </div>

        <div className="p-8 lg:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="inline-block p-4 bg-yellow-400/10 rounded-2xl mb-4">
                  <Smartphone size={40} className="text-yellow-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Initialize Activation</h3>
                <p className="text-gray-400 text-sm">Enter the phone number you will use for payment.</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input 
                    type="tel" 
                    placeholder="07XXXXXXXX" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-all text-lg font-bold tracking-widest"
                  />
                </div>
              </div>

              <button 
                disabled={phoneNumber.length < 10}
                onClick={() => setStep(2)}
                className="w-full py-5 bg-yellow-400 text-black font-black rounded-2xl disabled:opacity-30 hover:bg-yellow-300 transition-all glow-yellow flex flex-col items-center justify-center gap-1 shadow-2xl transform active:scale-95"
              >
                <span className="text-xl uppercase tracking-tighter">GET PAYMENT CODE</span>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-4 space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="space-y-4">
                <div className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em]">Dial this on your phone</div>
                <div className="relative group">
                  <div className="bg-black/60 border-2 border-yellow-400 p-8 rounded-[32px] text-3xl lg:text-4xl font-gaming font-black text-white tracking-widest flex items-center justify-center gap-4 cursor-pointer" onClick={copyToClipboard}>
                    {ussdCode}
                    <Copy size={24} className="text-yellow-400/50 group-hover:text-yellow-400 transition-colors" />
                  </div>
                  {copied && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-yellow-400 text-xs font-bold animate-bounce">
                      Code Copied!
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-black/20 p-6 rounded-3xl border border-white/5 text-left space-y-3">
                <div className="flex gap-3 text-xs font-bold text-gray-400">
                  <div className="w-5 h-5 bg-yellow-400 text-black rounded-full flex items-center justify-center shrink-0">1</div>
                  <span>Dial the code above on your mobile phone.</span>
                </div>
                <div className="flex gap-3 text-xs font-bold text-gray-400">
                  <div className="w-5 h-5 bg-yellow-400 text-black rounded-full flex items-center justify-center shrink-0">2</div>
                  <span>Send exactly 300 RWF to RWANDA MINING terminal.</span>
                </div>
                <div className="flex gap-3 text-xs font-bold text-gray-400">
                  <div className="w-5 h-5 bg-yellow-400 text-black rounded-full flex items-center justify-center shrink-0">3</div>
                  <span>Return here and click the "CONFIRM" button below.</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full py-6 bg-yellow-400 text-black font-black rounded-2xl flex items-center justify-center gap-3 glow-yellow shadow-2xl hover:bg-yellow-300 transition-all transform active:scale-95"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                      <span className="text-xl uppercase tracking-tighter">VERIFYING...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-xl uppercase tracking-tighter">CONFIRM PAYMENT</span>
                      <span className="text-[10px] opacity-70">CLICK AFTER PAYING 300 RWF</span>
                    </div>
                  )}
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-500 hover:text-white transition-colors underline uppercase font-bold tracking-widest"
                >
                  Back to Details
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30 animate-bounce">
                <Gift size={48} className="text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-gaming font-black text-white uppercase tracking-tighter">TRANSACTION SUCCESS</h3>
                <div className="text-2xl font-black text-yellow-400">+3,000 RWF BONUS UNLOCKED</div>
              </div>
              <p className="text-gray-400 max-w-sm mx-auto font-medium">
                Your payment of 300 RWF has been verified. Welcome to the elite fleet of RWANDA MINING.
              </p>
              <button 
                onClick={() => navigate(Page.DASHBOARD)}
                className="w-full max-w-sm py-5 bg-yellow-400 text-black font-black rounded-2xl glow-yellow hover:scale-105 transition-all shadow-2xl uppercase tracking-widest"
              >
                GO TO DASHBOARD
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <FeatureSmall icon={<ShieldCheck size={20} />} label="Secure" />
        <FeatureSmall icon={<Zap size={20} />} label="Instant" />
        <FeatureSmall icon={<Gift size={20} />} label="Bonus" />
        <FeatureSmall icon={<Info size={20} />} label="24/7" />
      </div>
    </div>
  );
};

const FeatureSmall = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="p-4 bg-zinc-900 rounded-2xl border border-white/5 flex flex-col items-center gap-2">
    <div className="text-yellow-400">{icon}</div>
    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{label}</span>
  </div>
);

export default Activation;
