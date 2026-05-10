import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, onSnapshot, getDocs, orderBy, limit } from 'firebase/firestore';
import { Booking, UserProfile } from '../../types';
import { motion } from 'motion/react';
import { 
  Users, 
  CalendarDays, 
  Clock, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Overview() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeUsers: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    rejectedBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats and recent bookings
    const fetchDashboardData = async () => {
      // Get all users for stats
      const usersSnap = await getDocs(collection(db, 'users'));
      const activeUsersCount = usersSnap.docs.filter(d => d.data().status !== 'inactive').length;

      // Real-time listener for bookings
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bookingData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];

        // Calculate Revenue
        const revenue = bookingData
          .filter(b => b.status === 'accepted')
          .reduce((acc, b) => {
            const checkIn = new Date(b.checkIn);
            const checkOut = new Date(b.checkOut);
            const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
            // Assume 5000 as base if not specified (simplification for stats)
            return acc + (nights * 5000); 
          }, 0);

        setStats({
          totalRevenue: revenue,
          totalBookings: bookingData.length,
          activeUsers: activeUsersCount,
          pendingBookings: bookingData.filter(b => b.status === 'pending').length,
          acceptedBookings: bookingData.filter(b => b.status === 'accepted').length,
          rejectedBookings: bookingData.filter(b => b.status === 'rejected').length
        });

        setRecentBookings(bookingData.slice(0, 5));
        setLoading(false);
      });

      return unsubscribe;
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { 
      label: 'Total Revenue', 
      value: `PKR ${stats.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      trend: { value: '12%', up: true }
    },
    { 
      label: 'Active Bookings', 
      value: stats.acceptedBookings, 
      icon: CalendarDays, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      trend: { value: '5%', up: true }
    },
    { 
      label: 'Pending Requests', 
      value: stats.pendingBookings, 
      icon: Clock, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      trend: { value: '2%', up: false }
    },
    { 
      label: 'Total Customers', 
      value: stats.activeUsers, 
      icon: Users, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50',
      trend: { value: '8%', up: true }
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Moiz. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                stat.trend.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {stat.trend.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend.value}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-900">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1 uppercase tracking-widest">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center font-bold">
                    {booking.guestName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{booking.guestName}</h4>
                    <p className="text-xs text-gray-500">{booking.roomType} • {booking.checkIn}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    booking.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                    booking.status === 'rejected' ? 'bg-rose-50 text-rose-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-brand-primary text-white p-8 rounded-[40px] shadow-xl shadow-brand-primary/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-serif font-bold mb-2">Need Help?</h3>
              <p className="text-white/70 text-sm mb-6">Access our support system or documentation for managing your property.</p>
              <button className="w-full bg-brand-gold py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/90 transition-all">
                Contact Developer
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">Pending Approvals</span>
                <span className="font-bold text-amber-600">{stats.pendingBookings}</span>
              </div>
              <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: `${(stats.pendingBookings / (stats.totalBookings || 1)) * 100}%` }} />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-500 font-medium">Acceptance Rate</span>
                <span className="font-bold text-emerald-600">
                  {Math.round((stats.acceptedBookings / (stats.acceptedBookings + stats.rejectedBookings || 1)) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${(stats.acceptedBookings / (stats.acceptedBookings + stats.rejectedBookings || 1)) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
