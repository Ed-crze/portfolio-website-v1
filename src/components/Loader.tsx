import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Brief pause at 100%
          return 100;
        }
        // Randomly ease up the progress string to mimic realistic loading
        return Math.min(p + Math.floor(Math.random() * 15) + 5, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-bg flex flex-col justify-between p-6 md:p-12"
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] text-meta uppercase tracking-[0.2em] block">Identity / Digital</span>
        <span className="text-[10px] text-meta uppercase tracking-[0.2em] w-12 text-right">{progress.toString().padStart(3, '0')}%</span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="overflow-hidden">
           <motion.div
             initial={{ y: "100%" }}
             animate={{ y: 0 }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="font-serif italic text-4xl md:text-6xl text-white"
           >
             ES. Studio&trade;
           </motion.div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="w-1/3 max-w-[200px] h-[1px] bg-border overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        <span className="text-[10px] text-meta uppercase tracking-[0.2em]">Loading. . .</span>
      </div>
    </motion.div>
  );
}
