import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // Simple rules-based mock to keep v1 free
  const dark = /dark|black|night|evil/i.test(prompt);
  const business = /business|startup|agency/i.test(prompt);

  const components = [
    { kind: 'hero', title: prompt.length > 3 ? prompt : 'Welcome to RAHL', subtitle: dark ? 'Dark aesthetic applied' : 'Light aesthetic', cta: 'Contact' },
    { kind: 'features', items: [
      { title: business ? 'Professional' : 'Creative', text: 'Designed by AI' },
      { title: 'Fast', text: 'Optimized static export' },
      { title: 'Free', text: 'No billing to start' },
    ] }
  ];

  return NextResponse.json({ components });
}
