import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { optimizeImagePath } from '../lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, referrerPolicy }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const optimizedSrc = optimizeImagePath(src);

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
        src={optimizedSrc}
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
        className={`w-full ${className?.includes('h-full') ? 'h-full' : 'h-auto'} object-cover`}
      />
    </div>
  );
};

export default LazyImage;
