import { AMENITIES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function Services() {
  return (
    <div className="pt-32 pb-20">
      <SEO 
        title="Services & Amenities | Family Palace Guest House"
        description="Explore our world-class services including 24/7 room service, free high-speed Wi-Fi, secure parking, and premium family facilities in Islamabad."
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-4 md:space-y-6 mb-12 md:mb-24 text-center max-w-3xl mx-auto">
          <p className="label-caps">Guest Selection</p>
          <h1 className="text-4xl md:text-7xl font-serif">Dedicated Services.</h1>
          <p className="text-brand-muted text-base md:text-lg font-light italic">
            Experience world-class service where traditional hospitality meets modern elegance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {AMENITIES.map((service, idx) => {
            const IconComponent = (LucideIcons as any)[service.icon];
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group space-y-6"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-stone-100 flex items-center justify-center text-brand-accent transition-colors duration-500">
                  {IconComponent && <IconComponent size={20} strokeWidth={1.5} />}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest">{service.name}</h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tight leading-relaxed">
                    Complimentary • {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Section */}
        <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551882547-ff43c63faf76?auto=format&fit=crop&q=80&w=800"
              alt="Service Staff"
              className="rounded-[60px] shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-accent rounded-full -z-0 opacity-20 blur-3xl animate-pulse" />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Experience Our Signature Concierge</h2>
            <p className="text-brand-muted text-lg leading-relaxed">
              Our 24-hour concierge service is just a WhatsApp message away. Whether you need local recommendations, transportation arrangements, or in-room dining, our dedicated team is at your side.
            </p>
            <ul className="space-y-4">
              {['VIP Travel Arrangements', 'Table Reservations', 'Personalized Tour Planning', 'Event Coordination'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-brand-primary font-medium">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
