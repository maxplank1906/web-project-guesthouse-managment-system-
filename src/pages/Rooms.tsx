import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, CalendarDays, Loader2 } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Room } from '../types';
import { useAuth } from '../context/AuthContext';
import BookingModal from '../components/BookingModal';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      const roomData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Room[];
      setRooms(roomData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleBookClick = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/rooms' } } });
    } else {
      setIsBookingOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SEO 
        title="Rooms & Suites | Family Palace Guest House"
        description="Discover our range of luxury rooms: Standard, Family, and Executive Suites. Each unit is equipped with air conditioning, Wi-Fi, and 24/7 room service in G-13 Islamabad."
      />
      <div className="space-y-4 md:space-y-6 mb-12 md:mb-20 text-center">
        <p className="label-caps">Signature Stays</p>
        <h1 className="text-4xl md:text-7xl font-serif tracking-tight">Islamabad Residences.</h1>
        <p className="text-brand-muted max-w-2xl mx-auto text-base md:text-lg font-light italic px-4">
          Experience premium family hospitality where comfort meets modern security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            layoutId={room.id}
            onClick={() => setSelectedRoom(room)}
            className="luxury-card rounded-[32px] overflow-hidden cursor-pointer group flex flex-col h-full"
          >
            <div className="relative h-[350px] overflow-hidden">
              <LazyImage 
                src={room.image} 
                alt={room.name}
                className="w-full h-full group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 bg-brand-primary text-white px-5 py-2 rounded-xl shadow-2xl flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  PKR {room.price.toLocaleString()}
                </span>
                {!room.isAvailable && (
                  <span className="text-[8px] bg-rose-500 px-2 py-0.5 rounded-full mt-1">Booked</span>
                )}
              </div>
            </div>
            <div className="p-10 flex-grow flex flex-col">
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-2">{room.type} Exclusive</p>
                <h3 className="text-2xl font-serif font-bold text-brand-primary">{room.name}</h3>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                King Bed • Capacity: {room.capacity} • AC • Wi-Fi • Security
              </p>
              <div className="mt-auto">
                <button className="text-[10px] font-bold uppercase text-brand-primary hover:text-brand-gold tracking-[0.2em] flex items-center gap-2 transition-colors">
                  Check Selection <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Room Details */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRoom(null)}
            className="absolute inset-0 bg-brand-primary/80 backdrop-blur-xl"
          />
          <motion.div 
            layoutId={selectedRoom.id}
            className="bg-white w-full max-w-5xl rounded-[40px] overflow-hidden relative z-10 max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/20"
          >
            <div className="md:w-1/2 h-[300px] md:h-auto font-bold relative">
              <LazyImage src={selectedRoom.image} alt={selectedRoom.name} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent md:hidden" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <button 
                onClick={() => setSelectedRoom(null)}
                className="absolute top-6 right-6 text-brand-primary bg-slate-50 p-3 rounded-2xl hover:bg-brand-primary hover:text-white transition-all shadow-sm z-20"
              >
                <div className="w-5 h-5 flex items-center justify-center text-2xl leading-none">×</div>
              </button>
              
              <div className="space-y-8">
                <div>
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">{selectedRoom.type} Excellence</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 text-brand-primary">{selectedRoom.name}</h2>
                </div>

                <div className="text-4xl font-serif font-bold text-brand-primary flex items-baseline gap-2">
                  PKR {selectedRoom.price}<span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.2em]">/ night</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">About this Suite</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedRoom.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {selectedRoom.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-brand-primary font-bold uppercase tracking-tight">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={handleBookClick}
                    className="flex items-center justify-center gap-3 w-full bg-brand-primary text-white py-6 rounded-2xl font-bold hover:bg-brand-accent transition-all text-xs uppercase tracking-widest shadow-2xl shadow-brand-primary/20"
                  >
                    <CalendarDays size={18} className="text-brand-gold" /> Book Online Now
                  </button>
                  <a 
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full border-2 border-brand-primary text-brand-primary py-6 rounded-2xl font-bold hover:bg-brand-primary hover:text-white transition-all text-xs uppercase tracking-widest"
                  >
                    <MessageCircle size={18} /> WhatsApp Contact
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {selectedRoom && (
        <BookingModal 
          room={selectedRoom} 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
        />
      )}
    </div>
  );
}
