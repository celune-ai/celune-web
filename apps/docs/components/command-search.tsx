'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { searchDocs, type SearchEntry } from '../lib/search-index';

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const results = searchDocs(query);

  // Cmd+K / Ctrl+K to toggle
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery('');
      router.push(href);
    },
    [router],
  );

  // Group results by section
  const grouped = results.reduce<Record<string, SearchEntry[]>>((acc, entry) => {
    if (!acc[entry.section]) acc[entry.section] = [];
    acc[entry.section].push(entry);
    return acc;
  }, {});

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          setOpen(false);
          setQuery('');
        }}
      />

      {/* Command palette */}
      <div className="relative mx-auto mt-[min(20vh,200px)] w-full max-w-[560px] px-4">
        <Command
          className="overflow-hidden rounded-xl border border-white/[0.08] bg-[hsl(0deg_0%_9%)] shadow-2xl"
          shouldFilter={false}
          loop
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
            <Search size={16} className="shrink-0 text-white/40" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search documentation..."
              className="h-12 w-full bg-transparent text-[15px] text-white placeholder:text-white/30 focus:outline-none"
            />
            <kbd className="hidden shrink-0 rounded border border-white/[0.1] bg-white/[0.04] px-1.5 py-0.5 text-[11px] text-white/40 sm:inline">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <Command.List className="max-h-[min(50vh,400px)] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-8 text-center text-[14px] text-white/40">
              No results found.
            </Command.Empty>

            {Object.entries(grouped).map(([section, entries]) => (
              <Command.Group
                key={section}
                heading={section}
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-white/30 [&_[cmdk-group-heading]]:uppercase"
              >
                {entries.map((entry) => (
                  <Command.Item
                    key={entry.href}
                    value={entry.href}
                    onSelect={() => handleSelect(entry.href)}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-white/80 transition-colors select-none data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-white"
                  >
                    <FileText
                      size={16}
                      className="shrink-0 text-white/25 group-data-[selected=true]:text-[hsl(153deg_60%_53%)]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] leading-tight">{entry.title}</p>
                      <p className="mt-0.5 truncate text-[12px] text-white/35 group-data-[selected=true]:text-white/50">
                        {entry.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-white/0 transition-colors group-data-[selected=true]:text-white/40"
                    />
                  </Command.Item>
                ))}
              </Command.Group>
            ))}

            {/* Show all pages when no query */}
            {!query && (
              <div className="px-4 py-6 text-center text-[13px] text-white/30">
                Type to search across all documentation pages.
              </div>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
