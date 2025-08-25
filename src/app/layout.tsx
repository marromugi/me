import type { Metadata } from 'next';
import {
  Ubuntu,
  Zen_Maru_Gothic,
  Zen_Old_Mincho,
} from 'next/font/google';
import './globals.css';
import { FontProvider } from '@/contexts/font';
import clsx from 'clsx';
import Link from 'next/link';

const zenOldMincho = Zen_Old_Mincho({
  weight: ['400', '600'],
  variable: '--font-zen-old-mincho',
  subsets: ['latin'],
});

const ubuntu = Ubuntu({
  weight: ['400'],
  variable: '--font-ubuntu',
  subsets: ['latin'],
});

const zenKakuGothicAntique = Zen_Maru_Gothic({
  weight: ['700'],
  variable: '--font-zen-kaku-gothic-antique',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'marromugi | Tomoki Shimizu',
  description: "marromugi's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          `${zenOldMincho.variable} ${ubuntu.variable} ${zenKakuGothicAntique.variable}`,
          'w-screen min-h-dvh bg-gray-50 text-gray-800 antialiased font-serif',
          'px-4 max-md:px-3',
        )}
        style={{
          fontFeatureSettings: 'palt',
        }}
      >
        <FontProvider>
          <header
            className={clsx('py-4 bg-gray-50', 'sticky top-0 z-10')}
          >
            <div className={clsx('max-w-[40em] mx-auto')}>
              <Link href={'/'}>
                <h1 className="text-lg">marromugi</h1>
              </Link>
            </div>
            <span
              className={clsx(
                'block h-4 w-full',
                'absolute -bottom-4',
                'bg-gradient-to-t',
                'from-[#00000000] to-gray-50 max-w-[40em]',
              )}
            ></span>
          </header>
          {children}
        </FontProvider>
      </body>
    </html>
  );
}
