import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ceylon Drive Hub — Premium Car Rentals',
    template: '%s | Ceylon Drive Hub'
  },
  description: 'Book first, choose vehicle later. Premium car rentals in Sri Lanka with flexible booking and transparent pricing.',
  keywords: ['car rental', 'Sri Lanka', 'Audi Q2', 'vehicle rental', 'Ceylon Drive Hub'],
  authors: [{ name: 'Ceylon Drive Hub' }],
  openGraph: {
    title: 'Ceylon Drive Hub — Premium Car Rentals',
    description: 'Reserve your dates now. Choose from Audi Q2 2018 and upcoming vehicles.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <NavBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ThemeToggle />
      </body>
    </html>
  );
}
