'use client';
import { RahlComponentType } from '@/lib/types';

export default function EditablePropsPanel({ selected, onChange }: {
  selected: { index: number; value: RahlComponentType } | null;
  onChange: (v: RahlComponentType) => void;
}) {
  if (!selected) return <div className="text-neutral-400 text-sm">Select a component to edit props.</div>;
  const v = selected.value as any;

  if (v.kind === 'hero') {
    return (
      <div className="space-y-2">
        <input className="w-full px-3 py-2 rounded-xl bg-white/5" value={v.title} onChange={e=>onChange({ ...v, title: e.target.value })} />
        <input className="w-full px-3 py-2 rounded-xl bg-white/5" value={v.subtitle ?? ''} onChange={e=>onChange({ ...v, subtitle: e.target.value })} />
        <input className="w-full px-3 py-2 rounded-xl bg-white/5" value={v.cta ?? ''} onChange={e=>onChange({ ...v, cta: e.target.value })} />
      </div>
    );
  }

  if (v.kind === 'features') {
    return (
      <div className="space-y-2">
        {(v.items ?? []).map((it: any, i: number) => (
          <div key={i} className="space-y-1">
            <input className="w-full px-3 py-2 rounded-xl bg-white/5" value={it.title} onChange={e=>{
              const items = [...v.items]; items[i] = { ...it, title: e.target.value }; onChange({ ...v, items });
            }} />
            <input className="w-full px-3 py-2 rounded-xl bg-white/5" value={it.text} onChange={e=>{
              const items = [...v.items]; items[i] = { ...it, text: e.target.value }; onChange({ ...v, items });
            }} />
          </div>
        ))}
      </div>
    );
  }

  return <div className="text-neutral-400 text-sm">No editor for this component type yet.</div>;
}
