'use client';

import { IconHome } from '@/components/icons';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-b from-brand to-brand-dark shadow-glow flex items-center justify-center mb-6">
        <IconHome className="w-12 h-12 text-white" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
      <p className="text-slate-400 text-lg mb-8">
        Strona nie została znaleziona
      </p>
      
      <Link href="/" className="btn-primary">
        ← Wróć do strony głównej
      </Link>
    </main>
  );
}
