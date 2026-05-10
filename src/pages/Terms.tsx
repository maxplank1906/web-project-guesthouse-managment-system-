import React from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-12 shadow-sm border border-stone-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
              <FileText size={28} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-stone-900">Terms & Conditions</h1>
          </div>

          <div className="prose prose-stone max-w-none space-y-6 text-stone-600">
            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-3">1. Booking Policies</h2>
              <p>All booking requests submitted through this website are subject to availability and confirmation by the Family Palace Guesthouse management.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-3">2. Cancellation Policy</h2>
              <p>Please contact us directly at least 24 hours in advance for any cancellations. Specific refund terms depend on the booking type and will be shared during confirmation.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-3">3. Guest Responsibilities</h2>
              <p>Guests are expected to provide accurate information and follow the house rules of Family Palace Guesthouse during their stay.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-3">4. Limitation of Liability</h2>
              <p>Family Palace shall not be liable for any indirect or consequential loss arising from the use of this website or our services.</p>
            </section>

            <p className="pt-8 text-sm italic">Last updated: May 10, 2026</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
