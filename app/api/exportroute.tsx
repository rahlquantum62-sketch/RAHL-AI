import { NextRequest } from 'next/server';
import JSZip from 'jszip';

export const runtime = 'edge'; // remove if JSZip causes issues on edge; Node runtime works too

function htmlFor(components: any[]) {
  const body = components.map((c: any) => {
    if (c.kind === 'hero') {
      return `<section style="padding:64px;text-align:center"><h1 style="font-size:40px">${c.title}</h1><p>${c.subtitle ?? ''}</p><a href="#" style="padding:10px 16px;border-radius:16px;background:#000;color:#fff;display:inline-block;margin-top:12px">${c.cta ?? 'Get Started'}</a></section>`;
    }
    if (c.kind === 'features') {
      const cards = c.items.map((it: any) => `<div style="padding:16px;border:1px solid #e5e5e5;border-radius:16px"><div style="font-weight:600">${it.title}</div><div style="color:#555">${it.text}</div></div>`).join('');
      return `<section style="padding:48px;display:grid;gap:16px;grid-template-columns:repeat(3,minmax(0,1fr))">${cards}</section>`;
    }
    return '';
  }).join('');

  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>RAHL Export</title></head><body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">${body}</body></html>`;
}

export async function POST(req: NextRequest) {
  const project = await req.json();
  const zip = new JSZip();
  const html = htmlFor(project.pages?.[0]?.components ?? []);
  zip.file('index.html', html);
  const content = await zip.generateAsync({ type: 'uint8array' });
  return new Response(content, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="site.zip"'
    }
  });
}
