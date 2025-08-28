'use client';
import { RahlComponentType } from '@/lib/types';

const presets: RahlComponentType[] = [
  { kind: 'hero', title: 'Welcome to RAHL', subtitle: 'Generated with AI', cta: 'Get Started' },
  { kind: 'features', items: [
    { title: 'Fast', text: 'Blazing dev speed' },
    { title: 'Free', text: 'No billing to start' },
    { title: 'Flexible', text: 'Drag-and-drop' },
  ]},
  { kind: 'faq', items: [
    { q: 'What is RAHL?', a: 'A free Lovable-style builder.' },
    { q: 'How do I publish?', a: 'Export static HTML/ZIP.' },
  ]}
];

export default function ComponentPalette({ onAdd }: { onAdd: (c: RahlComponentType) => void }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm text-neutral-400">Components</h3>
      {presets.map((c, i) => (
        <button key={i} onClick={() => onAdd({ ...c })} className="w-full text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10">
          {c.kind}
        </button>
      ))}
    </div>
  );
}
