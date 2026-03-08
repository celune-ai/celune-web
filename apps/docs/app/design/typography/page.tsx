import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Typography — Design System',
  description: 'Font families, type scale, and prose rendering for the Smejkal Design System.',
};

export default async function TypographyPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Getting Started</p>
      <h1>Typography</h1>

      <p className="lead">
        The type system uses Inter 300 for all UI text and Source Code Pro for monospace content.
        Both fonts are loaded at the app level via Next.js <code>next/font</code> and exposed as CSS
        variables that feed into the <code>@theme inline</code> token bridge.
      </p>

      <h2>Font families</h2>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Font</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--font-sans</code>
            </td>
            <td>Inter 300</td>
            <td>All body text, labels, headings, UI copy</td>
          </tr>
          <tr>
            <td>
              <code>--font-mono</code>
            </td>
            <td>Source Code Pro</td>
            <td>Code blocks, inline code, terminal output, token names</td>
          </tr>
        </tbody>
      </table>

      <p>
        Inter is loaded from Google Fonts via <code>next/font/google</code> at weight 300. Source
        Code Pro is also loaded from Google Fonts. Both use the <code>variable</code> option to emit
        CSS custom properties that feed into the Tailwind token bridge. All text uses{' '}
        <code>letter-spacing: 0.001em</code> (0.1% text spacing) for improved readability.
      </p>

      <h2>How fonts are loaded</h2>

      <CodeBlock
        code={`// apps/docs/app/layout.tsx
import { Inter, Source_Code_Pro } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "300",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Applied to <body>:
// className={\`\${inter.variable} \${sourceCodePro.variable} font-sans antialiased\`}`}
        lang="tsx"
      />

      <p>
        The <code>variable</code> option on each font emits a CSS custom property (
        <code>--font-inter</code>, <code>--font-source-code-pro</code>) scoped to the element the
        class is applied to. The <code>@theme inline</code> block then maps these to the
        Tailwind-facing tokens:
      </p>

      <CodeBlock
        code={`/* globals.css @theme inline block */
@theme inline {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-source-code-pro);
}`}
        lang="css"
      />

      <p>
        Using <code>font-sans</code> in any Tailwind class therefore resolves to Inter, and{' '}
        <code>font-mono</code> resolves to Source Code Pro. Each app can point these tokens at
        different fonts by overriding the mapping in its own <code>globals.css</code>.
      </p>

      <h2>Type scale</h2>

      <p>
        The design system uses Tailwind&apos;s default type scale with no custom additions. The
        scale is grid-aligned: every size and its corresponding line height are multiples of 4px.
      </p>

      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Size</th>
            <th>Line height</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>text-xs</code>
            </td>
            <td>12px</td>
            <td>16px</td>
            <td>Captions, timestamps, section labels, badge text</td>
          </tr>
          <tr>
            <td>
              <code>text-sm</code>
            </td>
            <td>14px</td>
            <td>20px</td>
            <td>UI body text, table cells, nav items, helper text</td>
          </tr>
          <tr>
            <td>
              <code>text-base</code>
            </td>
            <td>16px</td>
            <td>24px</td>
            <td>
              Default prose body (set on <code>{'<body>'}</code>)
            </td>
          </tr>
          <tr>
            <td>
              <code>text-lg</code>
            </td>
            <td>18px</td>
            <td>28px</td>
            <td>Lead paragraphs, sub-section titles</td>
          </tr>
          <tr>
            <td>
              <code>text-xl</code>
            </td>
            <td>20px</td>
            <td>28px</td>
            <td>Section headings (h3 in UI contexts)</td>
          </tr>
          <tr>
            <td>
              <code>text-2xl</code>
            </td>
            <td>24px</td>
            <td>32px</td>
            <td>Page sub-headings (h2)</td>
          </tr>
          <tr>
            <td>
              <code>text-3xl</code>
            </td>
            <td>30px</td>
            <td>36px</td>
            <td>Page titles (h1)</td>
          </tr>
        </tbody>
      </table>

      <h2>Heading examples</h2>

      <p>
        These headings are rendered by the prose layer. In UI components, apply the same sizing and
        weight via Tailwind utilities directly rather than relying on the prose plugin.
      </p>

      <h1>Heading 1 — page title</h1>
      <h2>Heading 2 — section</h2>
      <h3>Heading 3 — sub-section</h3>
      <h4>Heading 4 — detail</h4>

      <h2>Prose rendering</h2>

      <p>
        Long-form documentation content is wrapped in a <code>prose prose-sm</code> container from
        the <code>@tailwindcss/typography</code> plugin. The plugin&apos;s CSS variables are
        remapped to our design system tokens in <code>globals.css</code> so that prose content
        inherits the correct colors automatically.
      </p>

      <table>
        <thead>
          <tr>
            <th>Prose variable</th>
            <th>Mapped to token</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--tw-prose-body</code>
            </td>
            <td>
              <code>--foreground-light</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-headings</code>
            </td>
            <td>
              <code>--foreground-default</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-lead</code>
            </td>
            <td>
              <code>--foreground-lighter</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-links</code>
            </td>
            <td>
              <code>--brand-link</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-bold</code>
            </td>
            <td>
              <code>--foreground-default</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-bullets</code>
            </td>
            <td>
              <code>--brand-default</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-code</code>
            </td>
            <td>
              <code>--brand-300</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-pre-bg</code>
            </td>
            <td>
              <code>--background-surface-75</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-th-borders</code>
            </td>
            <td>
              <code>--border-default</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>--tw-prose-td-borders</code>
            </td>
            <td>
              <code>--border-muted</code>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        The prose container max-width in this docs site is set to <code>max-w-[57.6rem]</code> with{' '}
        <code>mx-auto</code> centering, matching Supabase&apos;s documentation layout proportions.
      </p>

      <h2>Code</h2>

      <p>
        Use inline <code>code</code> for variable names, file paths, token names, and short
        snippets. Use fenced code blocks for multi-line examples. Inline code renders with a subtle
        surface background and border. Block code uses the same surface background with a rounded
        border and full monospace font.
      </p>

      <CodeBlock
        code={`// Example: cn() utility for class merging
import { cn } from "@repo/ui/utils";

function StatusBadge({
  status,
  className,
}: {
  status: "todo" | "in_progress" | "done" | "blocked";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        {
          "bg-surface-200 text-foreground-lighter": status === "todo",
          "bg-brand-400 text-brand-600": status === "in_progress",
          "bg-brand-500 text-brand": status === "done",
          "bg-destructive-300 text-destructive-600": status === "blocked",
        },
        className
      )}
    >
      {statusLabel[status]}
    </span>
  );
}`}
        lang="tsx"
      />

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design/theming" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Theming
          </span>
        </Link>
        <div />
      </div>
    </>
  );
}
