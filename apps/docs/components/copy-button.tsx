'use client';

import { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-foreground-muted hover:bg-surface-300 hover:text-foreground absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-md transition-colors"
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
