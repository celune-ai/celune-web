import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { docs } from '@/lib/docs';

export const dynamic = 'force-dynamic';

function mdxPath(slug: string) {
  const doc = docs.find((d) => d.slug === slug);
  if (doc?.route) {
    return join(process.cwd(), 'app', doc.route, slug, 'page.mdx');
  }
  return join(process.cwd(), 'app', slug, 'page.mdx');
}

function vaultPath(slug: string): string | null {
  const doc = docs.find((d) => d.slug === slug);
  if (!doc?.vaultPath) return null;
  return join(process.cwd(), '..', '..', 'my-brain', 'MyBrain', doc.vaultPath);
}

/**
 * Strip the MDX wrapper (# Title, > Description, ---) to get the raw body.
 */
function stripMdxWrapper(content: string): string {
  // Pattern: # Title\n\n> Description\n\n---\n\n{body}
  const match = content.match(/^#\s+.+\n\n>.+\n\n---\n\n([\s\S]*)$/);
  if (match) return match[1];
  return content;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const filePath = mdxPath(slug);

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  const content = readFileSync(filePath, 'utf-8');
  const doc = docs.find((d) => d.slug === slug);

  return NextResponse.json({
    content,
    synced: doc?.synced ?? false,
  });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = mdxPath(slug);

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  const { content } = (await request.json()) as { content: string };

  // Write to the MDX file
  writeFileSync(filePath, content, 'utf-8');

  // Write back to vault source if synced
  const vault = vaultPath(slug);
  if (vault && existsSync(vault)) {
    const body = stripMdxWrapper(content);
    writeFileSync(vault, body, 'utf-8');
  }

  return NextResponse.json({ ok: true });
}
