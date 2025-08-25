'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import z from 'zod';

type Font = 'common' | 'special';
type FontContextType = {
  font: 'common' | 'special';
  setFont: (font: Font) => void;
};
const fontSchema = z.union([z.literal('common'), z.literal('special')]);

const FontContext = createContext<FontContextType | undefined>(
  undefined,
);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useLocalStorage<Font>('app-font', 'special', {
    serializer: (value) => value,
    deserializer: (value) => fontSchema.parse(value),
  });

  useEffect(() => {
    switch (font) {
      case 'common': {
        document.body.style.fontFamily = 'var(--font-sans)';
        document.documentElement.style.setProperty(
          '--font-title',
          'var(--font-sans)',
        );
      }
      case 'special': {
        document.body.style.fontFamily = 'var(--font-serif)';
        document.documentElement.style.setProperty(
          '--font-title',
          'var(--font-zen-kaku-gothic-antique)',
        );
      }
    }
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
