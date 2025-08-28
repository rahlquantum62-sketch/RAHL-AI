'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/dashboard');
    } catch (e: any) { setErr(e.message); }
  }

  return (
    <div className="max-w-sm mx-auto py-16">
      <h2 className="text-2xl font-semibold mb-6">Create your account</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button className="mt-2 px-4 py-3 rounded-2xl bg-white text-black">Sign up</button>
        <p className="text-sm text-neutral-400">Have an account? <Link className="underline" href="/sign-in">Sign in</Link></p>
      </form>
    </div>
  );
}
