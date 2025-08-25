'use client';

import { AnimatePresence } from 'motion/react';
import { PresenceProps } from './type';
import { usePathname } from 'next/navigation';

export const Presence = ({ children }: PresenceProps) => {
  const pathname = usePathname();
  return (
    <AnimatePresence key={pathname} mode="wait" initial={false}>
      {children}
    </AnimatePresence>
  );
};
