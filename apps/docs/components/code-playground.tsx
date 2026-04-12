'use client';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react';

interface CodePlaygroundProps {
  /** Sandpack template: 'react', 'react-ts', 'vanilla', 'vanilla-ts', 'static', etc. */
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts' | 'static';
  /** File map: keys are file paths (e.g. '/App.js'), values are file contents */
  files?: Record<string, string>;
  /** Whether to show the live preview pane (default: true) */
  showPreview?: boolean;
}

/**
 * Interactive code playground powered by Sandpack.
 * Styled to match the docs site dark theme (bg #171717, green #3ecf8e).
 *
 * Usage in MDX:
 * <CodePlayground
 *   template="react"
 *   files={{ '/App.js': `export default function App() { return <h1>Hello</h1>; }` }}
 * />
 */
export function CodePlayground({
  template = 'react',
  files,
  showPreview = true,
}: CodePlaygroundProps) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-neutral-800">
      <SandpackProvider
        template={template}
        files={files}
        theme={{
          colors: {
            surface1: '#171717',
            surface2: '#232323',
            surface3: '#2a2a2a',
            clickable: '#999999',
            base: '#ffffff',
            disabled: '#4b4b4b',
            hover: '#c5c5c5',
            accent: '#3ecf8e',
            error: '#ff453a',
            errorSurface: '#3b1d1d',
          },
          syntax: {
            plain: '#ffffff',
            comment: { color: '#7e7e7e', fontStyle: 'italic' },
            keyword: '#bda4ff',
            tag: '#3ecf8e',
            punctuation: '#ffffff',
            definition: '#3ecf8e',
            property: '#3ecf8e',
            static: '#ffcda1',
            string: '#ffcda1',
          },
          font: {
            body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            mono: '"Fira Code", "Fira Mono", Menlo, Consolas, monospace',
            size: '13px',
            lineHeight: '20px',
          },
        }}
      >
        <SandpackLayout
          style={{
            borderRadius: 0,
            border: 'none',
          }}
        >
          <SandpackCodeEditor showLineNumbers showTabs style={{ minHeight: 300 }} />
          {showPreview && <SandpackPreview style={{ minHeight: 300 }} />}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
