import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Booking } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { handleFirestoreError, OperationType } from '../../utils/error-handler';

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
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
  }, []);

  const handleUpdateStatus = async (bookingId: string, status: 'accepted' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
      toast.success(`Booking ${status}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${bookingId}`);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking history?')) return;
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      toast.success('Booking deleted');
      if (selectedBooking?.id === bookingId) setSelectedBooking(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `bookings/${bookingId}`);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-500 mt-1">Review and manage guest reservations.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search guests or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm w-full md:w-64"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Bookings Table */}
        <div className="xl:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Guest / ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date Range</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className={`hover:bg-gray-50/50 transition-colors cursor-pointer group ${selectedBooking?.id === booking.id ? 'bg-brand-primary/5' : ''}`}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-brand-gold/10 group-hover:text-brand-gold transition-colors">
                          {booking.guestName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{booking.guestName}</p>
                          <p className="text-[10px] font-mono text-gray-400">#{booking.bookingId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                        <Calendar size={12} className="text-gray-400" />
                        {booking.checkIn} — {booking.checkOut}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        booking.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                        booking.status === 'rejected' ? 'bg-rose-50 text-rose-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                        {booking.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(booking.id!, 'accepted')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(booking.id!, 'rejected')}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => handleDeleteBooking(booking.id!)}
                          className="p-1.5 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBookings.length === 0 && (
            <div className="p-12 text-center text-gray-400 font-medium">
              No bookings found.
            </div>
          )}
        </div>

        {/* Sidebar Detail View */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 h-fit lg:sticky lg:top-8">
          <AnimatePresence mode="wait">
            {selectedBooking ? (
              <motion.div
                key={selectedBooking.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="label-caps !text-left block mb-2">Detailed View</span>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">{selectedBooking.guestName}</h2>
                    <p className="text-xs text-gray-500 font-mono mt-1">Ref: {selectedBooking.bookingId}</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    selectedBooking.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                    selectedBooking.status === 'rejected' ? 'bg-rose-50 text-rose-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {selectedBooking.status === 'accepted' ? <CheckCircle size={24} /> : 
                     selectedBooking.status === 'rejected' ? <XCircle size={24} /> : 
                     <Clock size={24} />}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Check In</p>
                    <p className="font-bold text-sm text-gray-900 leading-tight">{selectedBooking.checkIn}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Check Out</p>
                    <p className="font-bold text-sm text-gray-900 leading-tight">{selectedBooking.checkOut}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    <span>{selectedBooking.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    <span>{selectedBooking.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{selectedBooking.roomType} • {selectedBooking.guests} Guests</span>
                  </div>
                </div>

                {selectedBooking.specialRequest && (
                  <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
                    <p className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2">
                       <MessageSquare size={12} /> Special Request
                    </p>
                    <p className="text-xs text-gray-700 italic">"{selectedBooking.specialRequest}"</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {selectedBooking.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => handleUpdateStatus(selectedBooking.id!, 'accepted')}
                        className="flex-grow bg-emerald-600 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(selectedBooking.id!, 'rejected')}
                        className="flex-grow bg-rose-600 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleUpdateStatus(selectedBooking.id!, 'pending')}
                      className="w-full border-2 border-gray-100 text-gray-500 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
                    >
                      Reset to Pending
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center text-gray-400">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Calendar size={24} />
                </div>
                <h3 className="font-bold text-gray-900">Select a booking</h3>
                <p className="text-xs max-w-[200px] mt-2">Pick a reservation from the list to view full details and manage status.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
