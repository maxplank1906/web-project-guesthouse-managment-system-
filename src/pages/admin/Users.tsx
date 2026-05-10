import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { UserProfile, UserRole } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Trash2, 
  Shield, 
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Mail,
  Calendar,
  UserCheck,
  UserX
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { handleFirestoreError, OperationType } from '../../utils/error-handler';

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('email', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as UserProfile[];
      setUsers(userData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
    });

    return () => unsubscribe();
  }, []);

  const toggleUserStatus = async (uid: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await updateDoc(doc(db, 'users', uid), { status: newStatus });
      toast.success(`User is now ${newStatus}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
    }
  };

  const handleChangeRole = async (uid: string, currentRole: UserRole) => {
    const newRole: UserRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Are you sure you want to change this user to ${newRole}?`)) return;
    
    try {
      await updateDoc(doc(db, 'users', uid), { role: newRole });
      toast.success(`Role updated to ${newRole}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'users', uid));
      toast.success('User deleted');
      if (selectedUser?.uid === uid) setSelectedUser(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${uid}`);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-serif font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Control access and manage registered community members.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm w-full md:w-80"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div 
                key={user.uid}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white p-6 rounded-[32px] border transition-all cursor-pointer ${
                  selectedUser?.uid === user.uid ? 'border-brand-gold shadow-lg shadow-brand-gold/5' : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold ${
                      user.role === 'admin' ? 'bg-amber-100 text-amber-600' : 'bg-brand-primary/5 text-brand-primary'
                    }`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        {user.name}
                        {user.role === 'admin' && <Shield size={14} className="text-amber-600" />}
                      </h3>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                      user.status === 'inactive' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {user.status || 'active'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{user.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* User Quick Controls */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 h-fit lg:sticky lg:top-8">
          <AnimatePresence mode="wait">
            {selectedUser ? (
              <motion.div
                key={selectedUser.uid}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-3xl font-bold mb-4 shadow-xl ${
                    selectedUser.role === 'admin' ? 'bg-amber-500 text-white' : 'bg-brand-primary text-white'
                  }`}>
                    {selectedUser.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl text-xs font-semibold text-gray-600">
                    <ShieldAlert size={16} className="text-gray-400" />
                    Role: <span className="text-brand-primary ml-auto uppercase tracking-widest">{selectedUser.role}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl text-xs font-semibold text-gray-600">
                    <Mail size={16} className="text-gray-400" />
                    Verified: <span className="text-emerald-600 ml-auto">Yes</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => handleChangeRole(selectedUser.uid, selectedUser.role)}
                    className="w-full flex items-center justify-center gap-3 py-3.5 bg-gray-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
                  >
                    <Shield size={16} />
                    {selectedUser.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                  </button>
                  <button 
                    onClick={() => toggleUserStatus(selectedUser.uid, selectedUser.status || 'active')}
                    className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                      selectedUser.status === 'inactive'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    {selectedUser.status === 'inactive' ? <UserCheck size={16} /> : <UserX size={16} />}
                    {selectedUser.status === 'inactive' ? 'Activate Account' : 'Deactivate Account'}
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(selectedUser.uid)}
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  >
                    <Trash2 size={16} />
                    Delete User
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center text-gray-400">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                  <Users size={24} />
                </div>
                <h3 className="font-bold text-gray-900">Select a User</h3>
                <p className="text-xs max-w-[200px] mt-2">Manage permissions, roles, and account status for registered users.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
