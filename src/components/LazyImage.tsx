import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, referrerPolicy }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-200 animate-pulse z-10"
          />
        )}
      </AnimatePresence>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy={referrerPolicy}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LazyImage;
