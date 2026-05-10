import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Room } from '../types';
import { X, Calendar, Users, Phone, User, FileText, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { handleFirestoreError, OperationType } from '../utils/error-handler';

const bookingSchema = z.object({
  guestName: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number required'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1).max(10),
  specialRequest: z.string().optional(),
}).refine((data) => new Date(data.checkIn) < new Date(data.checkOut), {
  message: "Check-out must be after check-in",
  path: ["checkOut"],
});

type BookingForm = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ room, isOpen, onClose }: BookingModalProps) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: profile?.name || '',
      email: profile?.email || '',
      guests: 1,
    }
  });

  const onSubmit = async (data: BookingForm) => {
    if (!user) {
      toast.error('Please login to book a room');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        ...data,
        userId: user.uid,
        bookingId: Math.random().toString(36).substr(2, 9).toUpperCase(),
        roomType: room.name,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      toast.success('Booking request submitted! We will contact you shortly.');
      onClose();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 shadow-2xl"
          >
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Reserve Your Stay</h2>
                <p className="text-white/80 text-sm">{room.name} • PKR {room.price}/night</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('guestName')}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="Enter guest name"
                    />
                  </div>
                  {errors.guestName && <p className="text-red-500 text-xs mt-1">{errors.guestName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('phone')}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="e.g. 0300 1234567"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-In Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('checkIn')}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-Out Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('checkOut')}
                      type="date"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('guests', { valueAsNumber: true })}
                      type="number"
                      min="1"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      {...register('specialRequest')}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="Any specific needs or arrival time..."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 disabled:opacity-50 mt-4"
              >
                {loading ? 'Processing...' : (
                  <>
                    <Send size={18} className="text-brand-gold" /> Confirm Booking Request
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
