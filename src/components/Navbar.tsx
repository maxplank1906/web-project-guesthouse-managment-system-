import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hotel, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, profile, isAdmin, logout } = useAuth();

  const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/services' },
    { name: 'Branches', path: '/branches' },
  ];

  if (user && isAdmin) {
    NAV_LINKS.push({ name: 'Dashboard', path: '/admin' });
  } else if (user) {
    NAV_LINKS.push({ name: 'My Bookings', path: '/my-bookings' });
  }

  NAV_LINKS.push({ name: 'Contact', path: '/contact' });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-serif italic text-2xl shadow-lg group-hover:rotate-6 transition-transform">F</div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight uppercase leading-none">Family Palace</span>
            <span className="font-light text-brand-muted text-[10px] uppercase tracking-[0.2em]">Guesthouse</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors relative group",
                location.pathname === link.path ? "text-brand-gold" : "text-stone-500 hover:text-brand-gold"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4 ml-2 border-l border-stone-200 pl-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-stone-600">
                {profile?.name || 'User'}
              </span>
              <button 
                onClick={logout}
                className="text-stone-500 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-brand-primary"
            >
              Login
            </Link>
          )}

          <Link 
            to="/rooms"
            className="btn-primary"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-primary p-2 -mr-2 flex items-center justify-center rounded-xl bg-slate-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-xl font-serif font-bold uppercase tracking-tight py-2 border-b border-slate-50",
                    location.pathname === link.path ? "text-brand-gold" : "text-brand-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-center gap-3 text-brand-primary">
                    <User size={20} />
                    <span className="font-bold">{profile?.name}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-3 text-red-500 font-bold py-2"
                  >
                    <LogOut size={20} />
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="text-xl font-serif font-bold uppercase tracking-tight py-2 text-brand-primary"
                >
                  LOGIN / SIGNUP
                </Link>
              )}

              <Link 
                to="/rooms"
                className="btn-primary w-full py-5 text-sm mt-4"
              >
                Book Your Stay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
