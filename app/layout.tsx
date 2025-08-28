import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'RAHL — AI Site Builder',
  description: 'A free Lovable-style builder',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </body>
    </html>
  );
} 
