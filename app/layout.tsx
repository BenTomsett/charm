import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'chARM',
  description: 'Visual ARM emulator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-h-dvh">
      <body className={cn(inter.className, 'flex h-svh max-h-svh flex-col')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
