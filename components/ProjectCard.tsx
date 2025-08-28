import Link from 'next/link';

export default function ProjectCard({ id, name }: { id: string; name: string }) {
  return (
    <Link href={`/dashboard?open=${id}`} className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
      <div className="font-medium">{name}</div>
      <div className="text-xs text-neutral-400">Open builder →</div>
    </Link>
  );
}
