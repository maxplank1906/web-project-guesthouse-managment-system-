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
  const [hasError, setHasError] = useState(false);
  const optimizedSrc = optimizeImagePath(src);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-200 animate-pulse z-10 flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-brand-gold animate-spin" />
          </motion.div>
        )}
        {hasError && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-200 z-10 flex flex-col items-center justify-center p-4 text-center"
          >
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">Image Unavailable</div>
            <div className="text-slate-300 italic text-[8px] break-all">{src}</div>
          </motion.div>
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
        onError={() => setHasError(true)}
        className={`w-full ${className?.includes('h-full') ? 'h-full' : 'h-auto'} object-cover ${hasError ? 'hidden' : 'block'}`}
      />
    </div>
  );
};

export default LazyImage;
