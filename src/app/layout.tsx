'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <title>Ceylon Drive Hub — Premium Car Rentals</title>
        <meta name="description" content="Book first, choose vehicle later. Premium car rentals in Sri Lanka with flexible booking and transparent pricing." />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <LanguageProvider>
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ThemeToggle />
        </LanguageProvider>
      </body>
    </html>
  );
}
