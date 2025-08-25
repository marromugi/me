'use client';

import { motion } from 'motion/react';
import { ShellProps } from './type';

export const Shell = ({ children }: ShellProps) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ minHeight: '100dvh' }}
    >
      {children}
    </motion.main>
  );
};
