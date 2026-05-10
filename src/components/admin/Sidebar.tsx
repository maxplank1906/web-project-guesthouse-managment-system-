import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Tag, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const { logout, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: CalendarDays, label: 'Bookings', path: '/admin/bookings' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Tag, label: 'Pricing', path: '/admin/rooms' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-brand-primary text-white transition-all duration-300 z-50 flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        {isOpen && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="font-serif text-xl font-bold">Admin Panel</h1>
            <p className="text-[10px] uppercase tracking-widest text-white/50">Family Palace</p>
          </div>
        )}
        <button 
          onClick={toggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-auto"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Profile Section */}
      <div className={`p-6 border-b border-white/10 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center font-bold text-sm">
            {profile?.name?.charAt(0) || 'A'}
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{profile?.name || 'Administrator'}</p>
              <p className="text-xs text-white/50 truncate">{profile?.email || 'admin@familypalace.com'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center gap-4 p-3 rounded-xl transition-all group
              ${isActive ? 'bg-brand-gold text-white shadow-lg shadow-brand-gold/20' : 'hover:bg-white/10 text-white/70 hover:text-white'}
            `}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            {!isOpen && (
              <div className="absolute left-20 bg-brand-primary px-3 py-2 rounded-md scale-0 group-hover:scale-100 transition-transform origin-left text-xs whitespace-nowrap shadow-xl">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 mt-auto border-t border-white/10 space-y-2">
        <NavLink
            to="/"
            className="flex items-center gap-4 p-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all font-medium text-sm"
          >
            <Home size={20} className="flex-shrink-0" />
            {isOpen && <span>Back to Site</span>}
          </NavLink>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-medium text-sm"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
