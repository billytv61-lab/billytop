
import React from 'react';
import { Phone, Mail, MessageCircle, Youtube, Instagram, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-gaming font-black mb-4 uppercase tracking-tight">Support <span className="text-yellow-400">Terminal</span></h2>
        <p className="text-gray-400">Our team is available 24/7 to assist you with payments, account activation, or technical mining issues.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ContactCard 
          icon={<Phone className="text-yellow-400" />}
          title="Call Us"
          info="0791385529"
          actionLabel="Dial Now"
          link="tel:0791385529"
        />
        <ContactCard 
          icon={<MessageCircle className="text-green-400" />}
          title="WhatsApp"
          info="Direct Chat"
          actionLabel="Chat Now"
          link="https://wa.me/250791385529"
        />
        <ContactCard 
          icon={<Mail className="text-blue-400" />}
          title="Email Support"
          info="billytv61@gmail.com"
          actionLabel="Send Email"
          link="mailto:billytv61@gmail.com"
        />
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden grid lg:grid-cols-2">
        <div className="p-8 lg:p-12 space-y-8">
          <h3 className="text-3xl font-gaming font-bold">SEND A <span className="text-yellow-400">MESSAGE</span></h3>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none w-full" />
              <input type="email" placeholder="Email Address" className="bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none w-full" />
            </div>
            <textarea placeholder="How can we help?" rows={4} className="bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none w-full"></textarea>
            <button className="px-8 py-4 bg-yellow-400 text-black font-black rounded-xl w-full sm:w-auto glow-yellow">SEND TRANSMISSION</button>
          </form>
        </div>
        
        <div className="bg-yellow-400 p-8 lg:p-12 text-black flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-gaming font-black mb-6">JOIN THE COMMUNITY</h3>
            <p className="font-medium text-black/70 mb-8">
              Follow us on social media for daily tips, bonus codes, and payout proofs.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Youtube size={24} />} href="#" />
              <SocialIcon icon={<Instagram size={24} />} href="#" />
              <SocialIcon icon={<Twitter size={24} />} href="#" />
            </div>
          </div>
          <div className="mt-12 pt-12 border-t border-black/10">
            <div className="text-sm font-black uppercase tracking-widest mb-2">Office Location</div>
            <p className="font-bold">Kigali, Rwanda - Downtown Commercial Center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, info, actionLabel, link }: { icon: React.ReactNode, title: string, info: string, actionLabel: string, link: string }) => (
  <div className="bg-zinc-900 p-8 rounded-3xl border border-white/5 text-center group hover:border-yellow-400/30 transition-all">
    <div className="mb-6 flex justify-center">{icon}</div>
    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{title}</h4>
    <div className="text-xl font-bold mb-6">{info}</div>
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-yellow-400 hover:text-black transition-all"
    >
      {actionLabel}
    </a>
  </div>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a 
    href={href} 
    className="w-12 h-12 bg-black text-yellow-400 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
  >
    {icon}
  </a>
);

export default Contact;
