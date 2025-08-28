'use client';
import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { RahlComponentType, Project } from '@/lib/types';
import ComponentPalette from '@/components/ComponentPalette';
import BuilderCanvas from '@/components/BuilderCanvas';
import EditablePropsPanel from '@/components/EditablePropsPanel';
import { saveProject } from '@/lib/db';
import { useSearchParams } from 'next/navigation';
import { nanoid } from 'nanoid';

export default function Dashboard() {
  const params = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const u = onAuthStateChanged(auth, setUser);
    return () => u();
  }, []);

  useEffect(() => {
    const id = params.get('open') ?? nanoid();
    const p: Project = {
      id,
      name: 'My First RAHL Site',
      ownerUid: user?.uid ?? 'anon',
      pages: [{ id: 'home', name: 'Home', components: [] }],
      updatedAt: Date.now(),
    };
    setProject(p);
  }, [params, user]);

  const page = project?.pages[0];
  const blocks = page?.components ?? [];

  async function add(c: RahlComponentType) {
    if (!project) return;
    const copy = { ...project };
    copy.pages = [{ ...copy.pages[0], components: [...blocks, c] }];
    setProject(copy);
    await saveProject(copy);
  }

  async function updateSelected(v: RahlComponentType) {
    if (!project || selectedIndex == null) return;
    const copy = { ...project };
    const comps = [...blocks];
    comps[selectedIndex] = v;
    copy.pages = [{ ...copy.pages[0], components: comps }];
    setProject(copy);
    await saveProject(copy);
  }

  async function exportZip() {
    const res = await fetch('/api/export', { method: 'POST', body: JSON.stringify(project) });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${project?.name || 'site'}.zip`; a.click();
    URL.revokeObjectURL(url);
  }

  async function aiGenerate() {
    const idea = prompt('Describe your site (e.g., dark portfolio for a photographer)');
    if (!idea) return;
    const res = await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ prompt: idea }) });
    const plan = await res.json();
    if (!project) return;
    const copy = { ...project };
    copy.pages = [{ ...copy.pages[0], components: plan.components }];
    setProject(copy);
    await saveProject(copy);
  }

  const selected = useMemo(() => selectedIndex == null ? null : { index: selectedIndex, value: blocks[selectedIndex] }, [selectedIndex, blocks]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-3 space-y-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="font-semibold">Create</div>
          <div className="text-sm text-neutral-400">Drag or click to add.</div>
          <div className="mt-3">
            <ComponentPalette onAdd={add} />
          </div>
          <button onClick={aiGenerate} className="mt-4 w-full px-4 py-2 rounded-2xl bg-white text-black">AI Generate</button>
          <button onClick={exportZip} className="mt-2 w-full px-4 py-2 rounded-2xl border border-white/20">Export ZIP</button>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="font-semibold mb-2">Props</div>
          <EditablePropsPanel selected={selected} onChange={updateSelected} />
        </div>
      </aside>
      <main className="col-span-9 p-4 rounded-2xl bg-white/5 border border-white/10">
        <BuilderCanvas blocks={blocks} setBlocks={() => {}} onSelect={(i)=>setSelectedIndex(i)} />
      </main>
    </div>
  );
      }
