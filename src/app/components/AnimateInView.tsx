'use client';

import { motion } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
};

export function AnimateInView({ children, className, delay = 0, once = true, amount = 0.2 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
