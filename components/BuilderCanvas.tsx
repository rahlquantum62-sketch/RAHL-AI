'use client';
import { RahlComponentType } from '@/lib/types';

function RenderBlock({ b }: { b: RahlComponentType }) {
  if (b.kind === 'hero') {
    return (
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-3">{b.title}</h1>
        {b.subtitle && <p className="text-neutral-400 mb-6">{b.subtitle}</p>}
        {b.cta && <button className="px-4 py-2 rounded-2xl bg-white text-black">{b.cta}</button>}
      </section>
    );
  }
  if (b.kind === 'features') {
    return (
      <section className="py-12 grid md:grid-cols-3 gap-4">
        {b.items.map((it, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-neutral-400">{it.text}</div>
          </div>
        ))}
      </section>
    );
  }
  if (b.kind === 'faq') {
    return (
      <section className="py-12 space-y-3">
        {b.items.map((it, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-medium">{it.q}</div>
            <div className="text-sm text-neutral-400">{it.a}</div>
          </div>
        ))}
      </section>
    );
  }
  return null;
}

export default function BuilderCanvas({ blocks, setBlocks, onSelect }: {
  blocks: RahlComponentType[];
  setBlocks: (b: RahlComponentType[]) => void;
  onSelect: (index: number) => void;
}) {
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const copy = [...blocks];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setBlocks(copy);
  }

  return (
    <div className="space-y-3">
      {blocks.map((b, i) => (
        <div key={i} className="relative group border border-white/10 rounded-2xl">
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition flex gap-2">
            <button onClick={() => move(i, -1)} className="px-2 py-1 rounded-xl bg-white/10">↑</button>
            <button onClick={() => move(i, 1)} className="px-2 py-1 rounded-xl bg-white/10">↓</button>
          </div>
          <button onClick={() => onSelect(i)} className="w-full text-left">
            <RenderBlock b={b} />
          </button>
        </div>
      ))}
    </div>
  );
}
