'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { docs } from '@/lib/docs';

export function DocEditor({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const doc = docs.find((d) => d.slug === slug);
  const title = doc?.title ?? slug;

  useEffect(() => {
    fetch(`/api/docs/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setContent(data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/docs/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    setSaving(false);
    router.push(pathname);
  };

  const handleCancel = () => {
    router.push(pathname);
  };

  if (loading) {
    return (
      <div className="px-10 py-10">
        <div className="mx-auto max-w-[57.6rem] space-y-4">
          <div className="bg-surface-200 h-8 w-48 animate-pulse rounded" />
          <div className="bg-surface-200 h-[calc(100vh-200px)] animate-pulse rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 py-6">
      <div className="mx-auto max-w-[57.6rem]">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-foreground text-lg font-semibold">{title}</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="text-foreground-lighter hover:bg-surface-200 hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-brand text-foreground-contrast hover:bg-brand/90 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-border bg-surface-75 text-foreground placeholder:text-foreground-muted focus:border-brand min-h-[calc(100vh-49px-120px)] w-full resize-none rounded-md border p-4 font-mono text-sm focus:outline-none"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
