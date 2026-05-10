import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { Room } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hotel, 
  Save, 
  DollarSign, 
  Tag,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Users
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { handleFirestoreError, OperationType } from '../../utils/error-handler';
import { ROOMS as DEFAULT_ROOMS } from '../../constants';

export default function RoomsManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      const roomData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Room[];
      
      if (roomData.length === 0) {
        // Seed initial data if DB is empty
        DEFAULT_ROOMS.forEach(async (room) => {
          await setDoc(doc(db, 'rooms', room.id), room);
        });
        setRooms(DEFAULT_ROOMS);
      } else {
        setRooms(roomData);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'rooms');
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateRoom = async (roomId: string, updates: Partial<Room>) => {
    try {
      await updateDoc(doc(db, 'rooms', roomId), updates);
      toast.success('Inventory updated successfully');
      setEditingId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `rooms/${roomId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Rooms & Pricing</h1>
        <p className="text-gray-500 mt-1">Manage rates, status, and availability for all property units.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <motion.div 
            key={room.id}
            layout
            className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="flex justify-between items-end w-full">
                  <div>
                    <h3 className="text-white font-serif text-xl font-bold">{room.name}</h3>
                    <p className="text-white/70 text-xs flex items-center gap-1"><Users size={12}/> Capacity: {room.capacity}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    room.isAvailable ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}>
                    {room.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {editingId === room.id ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Price Per Night (PKR)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="number"
                        defaultValue={room.price}
                        id={`price-${room.id}`}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all font-bold text-gray-900"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Occupancy Status</label>
                    <select 
                      id={`status-${room.id}`}
                      defaultValue={room.status}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm font-medium"
                    >
                      <option value="available">Available</option>
                      <option value="booked">Fully Booked</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={room.isAvailable} 
                        id={`available-${room.id}`}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gold"></div>
                      <span className="ml-3 text-xs font-bold text-gray-500 uppercase tracking-widest">Mark as Bookable</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => {
                        const price = Number((document.getElementById(`price-${room.id}`) as HTMLInputElement).value);
                        const status = (document.getElementById(`status-${room.id}`) as HTMLSelectElement).value as any;
                        const isAvailable = (document.getElementById(`available-${room.id}`) as HTMLInputElement).checked;
                        handleUpdateRoom(room.id, { price, status, isAvailable });
                      }}
                      className="flex-grow bg-brand-primary text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                    >
                      <Save size={14} /> Update Rate
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-1">Standard Rate</p>
                      <h4 className="text-3xl font-bold text-gray-900 tracking-tight">
                        <span className="text-sm font-medium text-gray-400 mr-2">PKR</span>
                        {room?.price?.toLocaleString() || '0'}
                      </h4>
                    </div>
                    <button 
                      onClick={() => setEditingId(room.id)}
                      className="p-4 bg-gray-50 text-brand-primary hover:bg-brand-primary hover:text-white rounded-[20px] transition-all duration-300"
                    >
                      <Tag size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl group/item">
                      <div className={`p-2 rounded-xl ${room.isAvailable ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {room.isAvailable ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      </div>
                      <div className="flex-grow">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Availability</p>
                        <p className="text-xs font-bold text-gray-700">{room.isAvailable ? 'Safe to Book' : 'Restricted'}</p>
                      </div>
                      <Info size={14} className="text-gray-300 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                      <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                        <Hotel size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                        <p className="text-xs font-bold text-gray-700 uppercase tracking-widest">{room.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center gap-2">
                    <AlertCircle size={14} className="text-brand-gold" />
                    <p className="text-[10px] font-medium text-gray-400">Inventory changes reflect instantly on the public site.</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
