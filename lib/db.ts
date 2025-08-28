import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Project } from './types';

export async function saveProject(p: Project) {
  const ref = doc(db, 'projects', p.id);
  await setDoc(ref, { ...p, updatedAt: Date.now(), ts: serverTimestamp() }, { merge: true });
}

export async function getProject(id: string): Promise<Project | null> {
  const ref = doc(db, 'projects', id);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as Project) : null;
}
