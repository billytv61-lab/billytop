
import React from 'react';
import { Page } from '../types';
import { Coins, Youtube, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  navigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-black border-t border-yellow-400/10 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Coins className="text-black" size={24} strokeWidth={3} />
              </div>
              <span className="text-2xl font-gaming font-extrabold tracking-tighter text-yellow-400">RWANDA MINING</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Rwanda's premium digital mining experience. Secure, rewarding, and built for everyone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-zinc-900 rounded-lg text-gray-400 hover:text-yellow-400 transition-colors"><Youtube size={20} /></a>
              <a href="#" className="p-2 bg-zinc-900 rounded-lg text-gray-400 hover:text-yellow-400 transition-colors"><Instagram size={20} /></a>
              <a href="https://wa.me/250791385529" className="p-2 bg-zinc-900 rounded-lg text-gray-400 hover:text-yellow-400 transition-colors"><MessageCircle size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-yellow-400 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => navigate(Page.HOME)} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => navigate(Page.MINING)} className="text-gray-400 hover:text-white transition-colors">Mining Game</button></li>
              <li><button onClick={() => navigate(Page.DASHBOARD)} className="text-gray-400 hover:text-white transition-colors">Dashboard</button></li>
              <li><button onClick={() => navigate(Page.ACTIVATION)} className="text-gray-400 hover:text-white transition-colors">Account Activation</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-yellow-400 mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => navigate(Page.CONTACT)} className="text-gray-400 hover:text-white transition-colors">Contact Us</button></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-yellow-400 mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for the latest mining strategies and bonuses.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your Email" className="bg-zinc-900 border border-white/5 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-400 w-full" />
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm">JOIN</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} RWANDA MINING. Built with passion for the Rwandan mining community. 
            All payments processed securely via MTN/Airtel.
          </p>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/250791385529" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl z-[60] hover:scale-110 transition-transform animate-bounce lg:animate-none"
      >
        <MessageCircle size={32} />
      </a>
    </footer>
  );
};

export default Footer;
