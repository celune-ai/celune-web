import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Tailwind Classes — Design System',
  description: 'How our design tokens map to Tailwind CSS utilities in the Smejkal Design System.',
};

export default async function TailwindClassesPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Getting Started</p>
      <h1>Tailwind Classes</h1>

      <p className="lead">
        Our design tokens are CSS custom properties. Tailwind v4 exposes them as utility classes
        through the <code>@theme inline</code> directive in each app&apos;s <code>globals.css</code>
        . This page documents the full mapping from token name to utility class.
      </p>

      <h2>How it works</h2>

      <p>
        Tailwind v4 replaces the old <code>tailwind.config.js</code> approach with a CSS-first
        configuration. The <code>@theme inline</code> block maps named CSS custom properties to
        Tailwind color names. Any property you define there becomes a Tailwind utility
        automatically.
      </p>

      <CodeBlock
        code={`/* globals.css — simplified excerpt */
@import "tailwindcss";

/* Semantic tokens defined in .dark selector */
.dark {
  --background-default: hsl(0deg 0% 7.1%);
  --brand-default: hsl(153.1deg 60.2% 52.7%);
}

/* @theme inline maps CSS vars → Tailwind utilities */
@theme inline {
  --color-background: var(--background-default);
  /* bg-background is now available */

  --color-brand: var(--brand-default);
  /* bg-brand, text-brand, border-brand are all available */
}`}
        lang="css"
      />

      <p>
        Because the mapping is indirect (utility references a CSS var, which references another CSS
        var), swapping the entire theme at runtime is possible without touching the class names in
        JSX. The <code>.dark</code> selector changes the underlying values; the utilities stay the
        same.
      </p>

      <h2>Background utilities</h2>

      <table>
        <thead>
          <tr>
            <th>CSS variable</th>
            <th>Tailwind class</th>
            <th>Dark mode value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--background-default</code>
            </td>
            <td>
              <code>bg-background</code>
            </td>
            <td>hsl(0° 0% 7.1%)</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-75</code>
            </td>
            <td>
              <code>bg-surface-75</code>
            </td>
            <td>hsl(0° 0% 9%)</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-100</code>
            </td>
            <td>
              <code>bg-surface-100</code>
            </td>
            <td>hsl(0° 0% 12.2%)</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-200</code>
            </td>
            <td>
              <code>bg-surface-200</code>
            </td>
            <td>hsl(0° 0% 12.9%)</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-300</code>
            </td>
            <td>
              <code>bg-surface-300</code>
            </td>
            <td>hsl(0° 0% 16.1%)</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-400</code>
            </td>
            <td>
              <code>bg-surface-400</code>
            </td>
            <td>hsl(0° 0% 16.1%)</td>
          </tr>
          <tr>
            <td>
              <code>--background-muted</code>
            </td>
            <td>
              <code>bg-muted</code>
            </td>
            <td>hsl(0° 0% 14.1%)</td>
          </tr>
        </tbody>
      </table>

      <h2>Foreground utilities</h2>

      <table>
        <thead>
          <tr>
            <th>CSS variable</th>
            <th>Tailwind class</th>
            <th>Dark mode value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--foreground-default</code>
            </td>
            <td>
              <code>text-foreground</code>
            </td>
            <td>hsl(0° 0% 98%)</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-light</code>
            </td>
            <td>
              <code>text-foreground-light</code>
            </td>
            <td>hsl(0° 0% 70.6%)</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-lighter</code>
            </td>
            <td>
              <code>text-foreground-lighter</code>
            </td>
            <td>hsl(0° 0% 53.7%)</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-muted</code>
            </td>
            <td>
              <code>text-foreground-muted</code>
            </td>
            <td>hsl(0° 0% 30.2%)</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-contrast</code>
            </td>
            <td>
              <code>text-foreground-contrast</code>
            </td>
            <td>hsl(0° 0% 8.6%)</td>
          </tr>
        </tbody>
      </table>

      <p>
        The <code>text-*</code> utilities also work as <code>bg-*</code> and <code>border-*</code>{' '}
        where the token is mapped. For example, <code>--color-foreground</code> enables{' '}
        <code>text-foreground</code>, <code>bg-foreground</code>, and <code>border-foreground</code>{' '}
        simultaneously.
      </p>

      <h2>Border utilities</h2>

      <table>
        <thead>
          <tr>
            <th>CSS variable</th>
            <th>Tailwind class</th>
            <th>Dark mode value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--border-default</code>
            </td>
            <td>
              <code>border-border</code>
            </td>
            <td>hsl(0° 0% 18%)</td>
          </tr>
          <tr>
            <td>
              <code>--border-muted</code>
            </td>
            <td>
              <code>border-border-muted</code>
            </td>
            <td>hsl(0° 0% 14.1%)</td>
          </tr>
          <tr>
            <td>
              <code>--border-control</code>
            </td>
            <td>
              <code>border-border-control</code>
            </td>
            <td>hsl(0° 0% 22.4%)</td>
          </tr>
          <tr>
            <td>
              <code>--border-strong</code>
            </td>
            <td>
              <code>border-border-strong</code>
            </td>
            <td>hsl(0° 0% 21.2%)</td>
          </tr>
          <tr>
            <td>
              <code>--border-stronger</code>
            </td>
            <td>
              <code>border-border-stronger</code>
            </td>
            <td>hsl(0° 0% 27.1%)</td>
          </tr>
          <tr>
            <td>
              <code>--border-overlay</code>
            </td>
            <td>
              <code>border-border-overlay</code>
            </td>
            <td>hsl(0° 0% 20%)</td>
          </tr>
        </tbody>
      </table>

      <h2>Brand utilities</h2>

      <table>
        <thead>
          <tr>
            <th>CSS variable</th>
            <th>Tailwind class</th>
            <th>Dark mode value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--brand-default</code>
            </td>
            <td>
              <code>bg-brand / text-brand / border-brand</code>
            </td>
            <td>hsl(153.1° 60.2% 52.7%)</td>
          </tr>
          <tr>
            <td>
              <code>--brand-200</code>
            </td>
            <td>
              <code>bg-brand-200</code>
            </td>
            <td>hsl(162° 100% 2%)</td>
          </tr>
          <tr>
            <td>
              <code>--brand-300</code>
            </td>
            <td>
              <code>bg-brand-300 / text-brand-300</code>
            </td>
            <td>hsl(155.1° 100% 8%)</td>
          </tr>
          <tr>
            <td>
              <code>--brand-400</code>
            </td>
            <td>
              <code>bg-brand-400</code>
            </td>
            <td>hsl(155.5° 100% 9.6%)</td>
          </tr>
          <tr>
            <td>
              <code>--brand-500</code>
            </td>
            <td>
              <code>bg-brand-500</code>
            </td>
            <td>hsl(154.9° 100% 19.2%)</td>
          </tr>
          <tr>
            <td>
              <code>--brand-600</code>
            </td>
            <td>
              <code>bg-brand-600 / text-brand-600</code>
            </td>
            <td>hsl(154.9° 59.5% 70%)</td>
          </tr>
        </tbody>
      </table>

      <h2>Shorthands and aliases</h2>

      <p>
        Some utility names are deliberately short for readability in dense component code. These
        aliases are defined in the <code>@theme inline</code> block alongside the full names.
      </p>

      <table>
        <thead>
          <tr>
            <th>Shorthand class</th>
            <th>Equivalent to</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>bg-background</code>
            </td>
            <td>
              <code>var(--background-default)</code>
            </td>
            <td>Main app canvas</td>
          </tr>
          <tr>
            <td>
              <code>text-foreground</code>
            </td>
            <td>
              <code>var(--foreground-default)</code>
            </td>
            <td>
              Primary text — drops the <code>-default</code> suffix
            </td>
          </tr>
          <tr>
            <td>
              <code>border-border</code>
            </td>
            <td>
              <code>var(--border-default)</code>
            </td>
            <td>Default border — the double "border" is intentional</td>
          </tr>
          <tr>
            <td>
              <code>bg-muted</code>
            </td>
            <td>
              <code>var(--background-muted)</code>
            </td>
            <td>Muted area fill</td>
          </tr>
          <tr>
            <td>
              <code>text-muted-foreground</code>
            </td>
            <td>
              <code>var(--foreground-muted)</code>
            </td>
            <td>shadcn/ui compat alias</td>
          </tr>
          <tr>
            <td>
              <code>bg-brand</code>
            </td>
            <td>
              <code>var(--brand-default)</code>
            </td>
            <td>Primary brand green</td>
          </tr>
          <tr>
            <td>
              <code>bg-destructive</code>
            </td>
            <td>
              <code>var(--destructive-default)</code>
            </td>
            <td>Primary red</td>
          </tr>
          <tr>
            <td>
              <code>bg-warning</code>
            </td>
            <td>
              <code>var(--warning-default)</code>
            </td>
            <td>Primary amber</td>
          </tr>
        </tbody>
      </table>

      <h2>Opacity support</h2>

      <p>
        Because our tokens are exposed through <code>@theme inline</code> as color utilities, they
        support Tailwind&apos;s opacity modifier syntax out of the box. Use the slash notation to
        apply any opacity to any token-based color.
      </p>

      <CodeBlock
        code={`// Opacity modifier on any token-backed utility
<div className="bg-surface-300/90" />      // 90% opaque surface
<div className="bg-brand/10" />            // subtle brand tint
<div className="border-border/50" />       // half-opacity border
<div className="text-foreground/70" />     // slightly faded text

// Useful for focus rings
className="focus-visible:ring-2 focus-visible:ring-brand/40"

// Useful for overlay backgrounds
className="bg-black/60 backdrop-blur-sm"   // modal backdrop`}
        lang="tsx"
      />

      <h2>Adding a new token</h2>

      <p>
        To add a new design token and make it available as a Tailwind utility, follow these three
        steps in <code>apps/[app]/app/globals.css</code>:
      </p>

      <CodeBlock
        code={`/* Step 1: Define the primitive value in :root or .dark */
.dark {
  --my-custom-token: hsl(200deg 80% 50%);
}

/* Step 2: Expose it in the @theme inline block */
@theme inline {
  --color-custom: var(--my-custom-token);
}

/* Step 3: Use it in JSX */
// <div className="bg-custom text-custom border-custom" />`}
        lang="css"
      />

      <blockquote>
        <p>
          Always define tokens in <code>@repo/ui/theme.css</code> if they should be shared across
          apps. App-specific overrides go in each app&apos;s own <code>globals.css</code>.
        </p>
      </blockquote>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design/icons" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Icons
          </span>
        </Link>
        <Link href="/design/theming" className="group flex flex-col items-end gap-0.5">
          <span className="text-foreground-muted text-xs">Next</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            Theming →
          </span>
        </Link>
      </div>
    </>
  );
}
