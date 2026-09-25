'use client';

import { IconHome, IconTrophy, IconStopwatch, IconUser } from '@/components/icons';

export type ViewId = 'start' | 'liga' | 'trening' | 'profil';

const ITEMS: { id: ViewId; label: string; Icon: any }[] = [
  { id: 'start', label: 'Start', Icon: IconHome },
  { id: 'liga', label: 'Liga', Icon: IconTrophy },
  { id: 'trening', label: 'Trening', Icon: IconStopwatch },
  { id: 'profil', label: 'Profil', Icon: IconUser },
];

export default function BottomNav({
  active,
  onChange,
  liveCount,
}: {
  active: ViewId;
  onChange: (v: ViewId) => void;
  liveCount: number;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-ink-900/95 backdrop-blur-md border-t border-ink-700/60">
      <div className="max-w-4xl mx-auto grid grid-cols-4">
        {ITEMS.map((item) => {
          const activeItem = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-semibold transition-colors ${
                activeItem ? 'text-brand-light' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.Icon className="w-6 h-6" />
              {item.label}
              {activeItem && <span className="absolute -top-px h-0.5 w-8 rounded-full bg-brand-light" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
