import type { Metadata } from 'next';
import { Inter, Oswald, Space_Mono, Alfa_Slab_One } from 'next/font/google';
import './globals.css';
import { business } from '@/config/business';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const alfaSlabOne = Alfa_Slab_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alfa',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${business.name} | Precision Collision Repair & Auto Body Restoration`,
  description: `Architectural precision collision repair, frame alignment, and spectrophotometer paint matching. Owner-operated in St. Charles, MO. Direct WhatsApp estimate booking!`,
  keywords: [
    'Benjis Auto Body',
    'auto body shop',
    'collision repair',
    'frame repair',
    'custom paint',
    'dent repair',
    'paintless dent removal',
    'St. Charles auto body',
    'insurance claim body shop',
  ],
  openGraph: {
    title: `${business.name} | Collision Repair & Auto Body Excellence`,
    description: `Direct owner-operated collision repair & custom paint matching. Direct WhatsApp instant estimate booking!`,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${spaceMono.variable} ${alfaSlabOne.variable}`}>
      <body className="bg-[#F8FAFC] text-slate-800 min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
