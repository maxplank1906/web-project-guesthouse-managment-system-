import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AMENITIES, TESTIMONIALS, WHATSAPP_LINK } from '../constants';
import * as LucideIcons from 'lucide-react';
import { db } from '../firebase/config';
import { collection, onSnapshot, limit, query } from 'firebase/firestore';
import { Room } from '../types';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    // Fetch featured rooms
    const q = query(collection(db, 'rooms'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Room[];
      setRooms(roomData);
      setLoading(false);
    });

    if (isPaused) return () => unsubscribe();
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, [isPaused, total]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-0">
      <SEO 
        title="Home | Family Palace Guest House"
        description="Experience the finest guest house in Islamabad G-13/1. Premium family rooms with modern amenities, safe stay, and traditional hospitality."
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage 
            src="/images/hero.png" 
            alt="Family Palace Guest House Premium Living"
            className="w-full h-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-primary/50 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/80 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold text-[10px] md:text-xs mb-4 md:mb-6"
          >
            Luxury Living in Islamabad
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-[6rem] font-serif leading-[1.1] md:leading-[1] mb-8 md:mb-10 tracking-tight"
          >
            Family Palace <br/><span className="text-white/70 italic text-4xl md:text-8xl">Guesthouse.</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8"
          >
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-white text-brand-primary font-bold px-10 md:px-14 py-5 md:py-6 rounded-2xl text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              Book Now via WhatsApp
            </a>
            <Link 
              to="/rooms"
              className="text-white border-b-2 border-white/20 hover:border-white transition-all text-[10px] md:text-xs uppercase tracking-widest font-bold pb-1"
            >
              View Our Suites
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-24 md:py-40 px-6 md:px-8 max-w-7xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div className="space-y-4">
            <p className="label-caps mb-2 text-brand-gold">Our Selection</p>
            <h2 className="text-4xl md:text-7xl font-serif text-brand-primary tracking-tighter">Premium Residences</h2>
          </div>
          <Link to="/rooms" className="text-[10px] md:text-xs font-bold text-brand-muted hover:text-brand-primary underline underline-offset-8 uppercase tracking-widest transition-colors">
            Explore All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {loading ? (
            <div className="col-span-full flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
            </div>
          ) : rooms.map((room) => (
            <motion.div 
              key={room.id}
              className="luxury-card rounded-3xl overflow-hidden group"
            >
              <div className="relative h-[450px]">
                <LazyImage 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-brand-primary text-white px-5 py-2 rounded-xl font-bold text-xs shadow-2xl">
                  PKR {room.price.toLocaleString()}
                </div>
              </div>
              <div className="p-10">
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{room.type} Suite</span>
                <h3 className="text-2xl font-serif font-bold mt-2 mb-4 text-brand-primary">{room.name}</h3>
                <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed line-clamp-3">{room.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <a 
                    href={WHATSAPP_LINK} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase text-brand-primary hover:text-brand-gold flex items-center gap-2 tracking-widest transition-colors"
                  >
                    Reserve Now <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="bg-brand-primary border-y border-slate-900 py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end mb-20 text-white">
            <div className="space-y-4">
              <p className="label-caps !text-brand-gold">Our Commitment</p>
              <h2 className="text-4xl md:text-6xl font-serif">Refined Guest Services</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light italic">From high-speed fiber internet to 24/7 concierge support via WhatsApp, we ensure your stay is seamless and comfortable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {AMENITIES.map((amenity) => {
              const IconComponent = (LucideIcons as any)[amenity.icon];
              return (
                <motion.div 
                  key={amenity.id}
                  whileHover={{ y: -5 }}
                  className="space-y-6 transition-all"
                >
                  <div className="w-12 h-12 bg-white/10 shadow-sm border border-white/10 rounded-full flex items-center justify-center text-brand-gold">
                    {IconComponent && <IconComponent className="w-5 h-5 shadow-inner" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3">{amenity.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium uppercase tracking-tight">{amenity.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
          <div className="text-center">
            <p className="label-caps mb-4">Guest Excellence</p>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-primary">Voices of Our Guests</h2>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div 
              className="flex gap-6 md:gap-8"
              animate={{ 
                x: `calc(-${index * 100}% - ${index * 32}px)` 
              }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              style={{ 
                // Desktop: 3 cards (card width = (100% - 2*gap) / 3)
                // Mobile: 1 card (card width = 100%)
                width: "100%"
              }}
            >
              {/* Note: The width logic above is simplified. For 3 cards visible, we need to adjust child width. */}
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div 
                  key={`${t.id}-${idx}`}
                  className="w-full md:w-[calc((100%-64px)/3)] shrink-0 bg-white p-10 rounded-[40px] shadow-[0_10px_50px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between h-[450px]"
                >
                  <div className="space-y-6">
                    <div className="flex gap-1 text-brand-gold">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-brand-muted text-sm leading-relaxed italic overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">"{t.comment}"</p>
                  </div>
                  <div className="mt-8 flex items-center gap-4 border-t border-slate-50 pt-6">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-serif text-brand-primary font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{t.name}</h4>
                      <p className="text-[8px] text-brand-gold uppercase tracking-[0.2em]">Verified Guest</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* To make it appear infinite or allow scrolling past the end without empty space, we could duplicate, 
                  but simplest for "Every 4 seconds slide" is just modulo index and showing the items.
                  If total items = 5, and we show 3, we can only go index up to 2 (total - 3).
              */}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {[...Array(total)].map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${index === i ? 'bg-brand-gold w-8' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-brand-primary rounded-[60px] p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden shadow-2xl"
        >
          {/* Decorative background circle */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

          <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight uppercase tracking-tight">Ready for a Grand Experience?</h2>
          <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto text-white/70">
            Book your stay today via WhatsApp and receive a special complimentary breakfast on your first night.
          </p>
          <div className="flex justify-center">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-white font-bold py-6 px-16 rounded-2xl hover:scale-105 transition-all shadow-xl flex items-center gap-3 group uppercase tracking-widest text-xs"
            >
              Request a Booking Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
