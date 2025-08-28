export type RahlComponentType =
  | { kind: 'hero'; title: string; subtitle?: string; cta?: string }
  | { kind: 'features'; items: { title: string; text: string }[] }
  | { kind: 'faq'; items: { q: string; a: string }[] };

export type RahlPage = {
  id: string;
  name: string;
  components: RahlComponentType[];
};

export type Project = {
  id: string;
  name: string;
  pages: RahlPage[];
  ownerUid?: string;
  updatedAt?: number;
};
