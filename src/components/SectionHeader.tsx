import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  children?: ReactNode;
  key?: any;
}

export default function SectionHeader({ number, title, children }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-border pt-8 pb-16 grid grid-cols-1 md:grid-cols-12 gap-8"
    >
      <div className="md:col-span-2 overflow-hidden">
        <motion.span 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] text-meta uppercase tracking-[0.2em] block"
        >
          {number}
        </motion.span>
      </div>
      <div className="md:col-span-10">
        <div className="overflow-hidden mb-8">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-sans font-light leading-[0.85] tracking-[-0.04em]"
          >
            {title}
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
