import { BRANCHES, WHATSAPP_LINK } from '../constants';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Branches() {
  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="space-y-4 md:space-y-6 mb-12 md:mb-20 text-center">
        <p className="label-caps">Our Locations</p>
        <h1 className="text-4xl md:text-8xl font-serif tracking-tighter">Islamabad Branches.</h1>
        <p className="text-brand-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light italic px-4">
          Experience the same standard of hospitality across the capital's most prestigious sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {BRANCHES.map((branch, idx) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card rounded-[40px] overflow-hidden flex flex-col md:flex-row h-full group"
          >
            <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
              <img 
                src={branch.image} 
                alt={branch.name} 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/10" />
            </div>
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2 block">Premium Branch</span>
                    <h3 className="text-3xl font-serif font-bold text-brand-primary mb-2">{branch.name}</h3>
                    <div className="flex items-center gap-2 text-brand-muted text-[10px] font-bold uppercase tracking-widest">
                      <MapPin size={10} className="text-brand-gold" /> {branch.location}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {branch.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs font-bold text-brand-primary uppercase tracking-wider">
                    <Phone size={14} className="text-brand-gold" /> {branch.phone}
                  </div>
                  <div className="flex items-start gap-3 text-xs font-bold text-brand-primary uppercase tracking-wider">
                    <MapPin size={14} className="text-brand-gold shrink-0" /> {branch.address}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a 
                  href={WHATSAPP_LINK}
                  className="w-full bg-brand-primary text-white py-5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors shadow-lg shadow-brand-primary/10"
                >
                  <MessageSquare size={16} /> Contact Branch
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expansion Section */}
      <div className="mt-32 relative h-[400px] rounded-[60px] overflow-hidden bg-brand-primary flex items-center justify-center text-center p-8">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1920" 
          alt="World Map" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 space-y-6 max-w-2xl">
          <p className="label-caps !text-white/60">Expansion Plans</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">More Locations Coming Soon</h2>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
            E-11 & Bahria Town • Launching 2026
          </p>
        </div>
      </div>
    </div>
  );
}
