import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { WHATSAPP_LINK, WHATSAPP_BASE_URL } from '../constants';
import { useState, FormEvent } from 'react';
import SEO from '../components/SEO';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Name: ${formState.name}\nPhone: ${formState.phone}\nMessage: ${formState.message}`;
    const url = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSent(true);
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SEO 
        title="Contact Us | Location & Booking in G-13 Islamabad"
        description="Get in touch with Family Palace Guest House. Find our location in G-13/1 Islamabad, call us, or book directly via WhatsApp."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif font-bold">Let's Start Your Journey</h1>
            <p className="text-brand-muted text-lg leading-relaxed">
              Have questions about our suites or special requests for your stay? Our dedicated concierge team is ready to assist you.
            </p>
          </div>

          <div className="space-y-8">
            <a 
              href="https://www.google.com/maps/place/9+Street+87,+G-13%2F1+G+13%2F1+G-13,+Islamabad,+44220,+Pakistan/@33.6436947,72.9583467,20.05z/data=!4m6!3m5!1s0x38df9647f75e9251:0x47bc86b2dfc6e8fc!8m2!3d33.6435739!4d72.9586326!16s%2Fg%2F11kztgxl3p?hl=en&entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="no-referrer"
              className="flex items-start gap-6 p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:border-brand-gold/20 transition-colors"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-gold shrink-0">
                <MapPin size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h4 className="font-bold text-brand-primary uppercase tracking-widest text-[10px] md:text-xs">Guesthouse HQ</h4>
                <p className="text-brand-muted text-sm leading-tight">House 9 Street 87 G-13/1, Islamabad</p>
              </div>
            </a>

            <a 
              href="tel:03004896616"
              className="flex items-start gap-6 p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:border-brand-gold/20 transition-colors"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-gold shrink-0">
                <Phone size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h4 className="font-bold text-brand-primary uppercase tracking-widest text-[10px] md:text-xs">Reservations</h4>
                <p className="text-brand-muted text-sm leading-tight">0300 4896616</p>
              </div>
            </a>

            <div className="flex items-start gap-6 p-10 rounded-[32px] bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-gold">
                <Mail size={28} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-primary uppercase tracking-widest text-xs">Email Enquiries</h4>
                <p className="text-brand-muted text-sm">decentguesthouse@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="p-10 bg-brand-primary rounded-[40px] text-white flex flex-col md:flex-row items-center gap-10">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-serif font-bold">Fastest Response?</h3>
              <p className="text-gray-400 text-sm">Message us directly on WhatsApp for instant booking assistance.</p>
            </div>
            <a 
              href={WHATSAPP_LINK}
              className="bg-[#25D366] text-white p-6 rounded-full hover:scale-110 transition-transform shadow-lg shadow-[#25D366]/20"
            >
              <MessageSquare size={32} />
            </a>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-16 rounded-[60px] shadow-2xl relative"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-accent rounded-full -z-10 blur-3xl opacity-20" />
          
          <h2 className="text-3xl font-serif font-bold mb-10">Send a Detailed Request</h2>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-2">Full Name</label>
              <input 
                type="text" 
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-brand-bg border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-accent outline-none transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-2">WhatsApp Phone Number</label>
              <input 
                type="tel" 
                required
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                placeholder="+1 234 567 890"
                className="w-full bg-brand-bg border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-accent outline-none transition-shadow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-2">Your Message</label>
              <textarea 
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="I'd like to book the Executive Grand Suite for next weekend..."
                className="w-full bg-brand-bg border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-brand-accent outline-none transition-shadow resize-none"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-accent transition-colors flex items-center justify-center gap-3 group"
            >
              {isSent ? "Message Prepared!" : "Proceed to WhatsApp"} <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
            <p className="text-center text-xs text-brand-muted">
              Clicking submit will open WhatsApp with your message pre-filled.
            </p>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <div className="mt-32 rounded-[60px] overflow-hidden h-[450px] bg-brand-bg relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.462704250426!2d72.95605767597148!3d33.64391267331454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9647f75e9251%3A0x47bc86b2dfc6e8fc!2s9%20Street%2087%2C%20G-13%2F1%20G%2013%2F1%20G-13%2C%20Islamabad%2C%2044220%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1714235722245!5m2!1sen!2spk" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
