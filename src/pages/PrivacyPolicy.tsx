import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-12 shadow-sm border border-stone-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-stone-900">Privacy Policy</h1>
          </div>

          <div className="prose prose-stone max-w-none space-y-6 text-stone-600">
            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you make a booking, including your name, email address, phone number, and any special requests you provide.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to process your reservations, communicate with you about your stay, and provide the services you request.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-3">3. Data Security</h2>
              <p>We implement secure storage and authentication methods via Google Firebase to protect your personal information from unauthorized access.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-3">4. Cookies</h2>
              <p>Our website uses essential cookies for authentication and to ensure a smooth booking experience.</p>
            </section>

            <p className="pt-8 text-sm italic">Last updated: May 10, 2026</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
