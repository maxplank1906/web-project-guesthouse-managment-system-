import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_LINK } from '../constants';

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center"
    >
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 shadow-2xl rounded-full p-4 flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" />
      </a>
    </motion.div>
  );
}
