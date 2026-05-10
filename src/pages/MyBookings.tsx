import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Booking } from '../types';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  CalendarDays
} from 'lucide-react';
import { handleFirestoreError, OperationType } from '../utils/error-handler';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'bookings'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bookingData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'bookings');
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <p className="label-caps !text-left">Your Reservations</p>
        <h1 className="text-4xl md:text-5xl font-serif mt-2 text-brand-primary">Stay History.</h1>
      </div>

      <div className="space-y-6">
        {bookings.length > 0 ? bookings.map((booking) => (
          <motion.div 
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center hover:shadow-xl hover:shadow-gray-200/50 transition-all border-l-4 border-l-brand-gold"
          >
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  booking.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {booking.status}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  ID: #{booking.bookingId}
                </span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-brand-primary mb-6">{booking.roomType}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Stay Dates</p>
                    <p className="text-sm font-semibold">{booking.checkIn} — {booking.checkOut}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Guests</p>
                    <p className="text-sm font-semibold">{booking.guests} {booking.guests === 1 ? 'Person' : 'People'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto pt-6 md:pt-0 md:pl-8 md:border-l border-gray-100 flex flex-col items-center justify-center">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Status</p>
               {booking.status === 'pending' ? (
                 <div className="flex flex-col items-center text-amber-500">
                    <Clock className="w-10 h-10 mb-2 animate-pulse" />
                    <p className="text-xs font-bold uppercase tracking-tight">Reviewing request</p>
                 </div>
               ) : booking.status === 'accepted' ? (
                 <div className="flex flex-col items-center text-green-500">
                    <CheckCircle2 className="w-10 h-10 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-tight">Confirmed stay</p>
                 </div>
               ) : (
                 <div className="flex flex-col items-center text-red-400">
                    <XCircle className="w-10 h-10 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-tight">Reservation declined</p>
                 </div>
               )}
            </div>
          </motion.div>
        )) : (
          <div className="bg-slate-50 rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
            <CalendarDays className="w-16 h-16 text-slate-300 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-slate-500">No Reservations Yet.</h2>
            <p className="text-slate-400 mt-2 max-w-sm mx-auto">Explore our premium rooms and book your first stay at Family Palace Guesthouse.</p>
          </div>
        )}
      </div>
    </div>
  );
}
