import { Hotel, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 pb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-sm flex items-center justify-center text-white font-serif italic text-xl">F</div>
            <span className="font-serif text-xl tracking-wide uppercase">Family Palace <span className="font-light text-slate-400">Guesthouse</span></span>
          </div>
          <p className="text-slate-500 text-xs font-semibold leading-relaxed uppercase tracking-tight">
            Premium family accommodation in the heart of Islamabad. Comfort, security, and tranquility redefined.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-brand-gold transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-slate-400 hover:text-brand-gold transition-colors"><Facebook size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-brand-primary">Our Location</h4>
          <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <li>G-13/1, Islamabad</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-brand-primary">Corporate</h4>
          <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <li>About Us</li>
            <li>Private Bookings</li>
            <li><Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-primary transition-colors">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-brand-primary">Contact Support</h4>
          <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
              <span>House 9 Street 87 G-13/1, Islamabad</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <span>0300 4896616</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-200 px-8 py-4 flex items-center justify-center md:justify-between text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center md:text-left">
        <div className="flex gap-8">
          <span>© {new Date().getFullYear()} FAMILY PALACE GUESTHOUSE GROUP</span>
        </div>

      </div>
    </footer>
  );
}
