import Link from 'next/link';

export default function Landing() {
  return (
    <main className="flex flex-col items-center gap-6 text-center py-20">
      <h1 className="text-4xl md:text-6xl font-bold">RAHL</h1>
      <p className="text-neutral-300 max-w-2xl">
        Build websites with AI and a visual editor. 100% free to start.
      </p>
      <div className="flex gap-3">
        <Link href="/sign-up" className="px-5 py-3 rounded-2xl bg-white text-black font-medium">Get started</Link>
        <Link href="/sign-in" className="px-5 py-3 rounded-2xl border border-white/20">Sign in</Link>
      </div>
    </main>
  );
}
