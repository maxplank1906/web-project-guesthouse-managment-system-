import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES as DEFAULT_GALLERY } from '../constants';
import { X, ZoomIn } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import SEO from '../components/SEO';
import LazyImage from '../components/LazyImage';

import { optimizeImagePath } from '../lib/utils';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(DEFAULT_GALLERY);

  const optimizedSelectedImage = optimizeImagePath(selectedImage);

  useEffect(() => {
    const docRef = doc(db, 'siteConfig', 'gallery');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setImages(snapshot.data().images || []);
      } else {
        setImages(DEFAULT_GALLERY);
      }
    }, (error) => {
      console.error("Gallery Error:", error);
      setImages(DEFAULT_GALLERY);
    });

    return () => unsubscribe();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SEO 
        title="Gallery | Inside Family Palace Guest House"
        description="Take a visual tour of Family Palace Guest House in G-13 Islamabad. View our premium rooms, reception, and guest facilities."
      />
      <div className="space-y-6 mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold">A Glimpse of Perfection</h1>
        <p className="text-brand-muted max-w-2xl mx-auto text-lg underline-offset-8 underline decoration-brand-accent/30 lowercase">
          capturing the essence of Lumina Grand architecture and interior design
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="columns-2 md:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6"
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            variants={item}
            onClick={() => setSelectedImage(img)}
            className="relative group cursor-pointer overflow-hidden rounded-3xl"
          >
            <LazyImage 
              src={img} 
              alt={`Gallery image ${idx}`} 
              className="w-full transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white p-3 rounded-full text-brand-primary">
                <ZoomIn size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-primary/95 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-brand-accent transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={optimizedSelectedImage} 
              alt="Full size view" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
