import { createHighlighter, type Highlighter } from 'shiki';
import { supabaseTheme } from './supabase-theme';
import { CopyButton } from './copy-button';

let highlighter: Highlighter | null = null;

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [supabaseTheme],
      langs: [
        'tsx',
        'typescript',
        'javascript',
        'json',
        'bash',
        'shell',
        'css',
        'html',
        'sql',
        'python',
        'yaml',
        'markdown',
        'mdx',
        'diff',
      ],
    });
  }
  return highlighter;
}

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export async function CodeBlock({ code, lang = 'tsx', filename }: CodeBlockProps) {
  const hl = await getHighlighter();
  const trimmed = code.trim();
  const html = hl.codeToHtml(trimmed, {
    lang,
    theme: 'supabase',
  });

  return (
    <div className="not-prose group border-border relative my-6 overflow-hidden rounded-lg border text-sm">
      {filename && (
        <div className="border-border bg-surface-200 flex items-center gap-2 border-b px-4 py-2">
          <span className="text-foreground-lighter font-mono text-xs">{filename}</span>
        </div>
      )}
      <div className="shiki-block overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
      <CopyButton code={trimmed} />
    </div>
  );
}
