import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Theming - Design System',
  description:
    'How the Smejkal Design System token architecture enables dark-first theming with a two-layer CSS custom property system.',
};

export default async function ThemingPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Getting Started</p>
      <h1>Theming</h1>

      <p className="lead">
        Both apps are always dark. The token architecture is a two-layer CSS custom property system:
        primitive gray and color scales live in <code>:root</code>, and semantic tokens in{' '}
        <code>.dark</code> point at those primitives. Tailwind utilities reference the semantic
        layer via <code>@theme inline</code>.
      </p>

      <h2>Always dark</h2>

      <p>
        The admin app and this docs site both apply <code>class="dark"</code> to the{' '}
        <code>{'<html>'}</code> element in their root layouts. This is not a user preference toggle
 - it is the intended aesthetic. The dark selector activates all semantic token overrides
        immediately on page load with no flash of light content.
      </p>

      <CodeBlock
        code={`// apps/admin/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={\`\${fontVars} font-sans antialiased bg-background\`}>
        {children}
      </body>
    </html>
  );
}`}
        lang="tsx"
      />

      <h2>Two-layer token architecture</h2>

      <p>
        The token system is intentionally split into two layers so that the primitive values never
        bleed into component code. Components only ever reference semantic tokens; the semantic
        tokens handle the translation to actual color values.
      </p>

      <h3>Layer 1: Primitive scales</h3>

      <p>
        Raw gray steps and brand color values. These are defined once in <code>:root</code> and
        never used directly in components. They exist so that layer 2 tokens have a consistent
        vocabulary to reference.
      </p>

      <CodeBlock
        code={`/* Layer 1 - primitive scales in :root */
:root {
  --colors-gray-dark-100: hsl(0deg 0% 8.6%);
  --colors-gray-dark-200: hsl(0deg 0% 11%);
  --colors-gray-dark-300: hsl(0deg 0% 13.7%);
  --colors-gray-dark-400: hsl(0deg 0% 15.7%);
  --colors-gray-dark-500: hsl(0deg 0% 18%);
  /* ... continues to 1200 */
}`}
        lang="css"
      />

      <h3>Layer 2: Semantic tokens</h3>

      <p>
        Named by intent, not by value. <code>--background-surface-100</code> means "the first-level
        card surface" regardless of what color that actually is. Light mode defines values in{' '}
        <code>:root</code>; dark mode overrides them in the <code>.dark</code> selector.
      </p>

      <CodeBlock
        code={`/* Layer 2 - semantic tokens, light mode (in :root) */
:root, .light {
  --background-default:        hsl(0deg 0% 98.8%);
  --background-surface-75:     hsl(0deg 0% 100%);
  --background-surface-100:    hsl(0deg 0% 98.8%);
  --foreground-default:        hsl(0deg 0% 9%);
  --foreground-lighter:        hsl(0deg 0% 43.9%);
  --brand-default:             hsl(152.9deg 60% 52.9%);
  --border-default:            hsl(0deg 0% 87.5%);
}

/* Layer 2 - dark mode overrides */
.dark {
  --background-default:        hsl(0deg 0% 7.1%);
  --background-surface-75:     hsl(0deg 0% 9%);
  --background-surface-100:    hsl(0deg 0% 12.2%);
  --foreground-default:        hsl(0deg 0% 98%);
  --foreground-lighter:        hsl(0deg 0% 53.7%);
  --brand-default:             hsl(153.1deg 60.2% 52.7%);
  --border-default:            hsl(0deg 0% 18%);
}`}
        lang="css"
      />

      <h2>CSS variable to Tailwind bridge</h2>

      <p>
        The <code>@theme inline</code> block in each app&apos;s <code>globals.css</code> is the
        bridge between CSS variables and Tailwind utilities. It maps a<code>--color-*</code>{' '}
        variable name to the semantic token, and Tailwind generates the full suite of utilities from
        that name.
      </p>

      <CodeBlock
        code={`/* The bridge - in globals.css */
@theme inline {
  /* bg-background, text-background, border-background */
  --color-background: var(--background-default);

  /* bg-surface-100, text-surface-100, border-surface-100 */
  --color-surface-100: var(--background-surface-100);

  /* bg-brand, text-brand, border-brand */
  --color-brand: var(--brand-default);

  /* Also exposes brand-200 through brand-600 */
  --color-brand-200: var(--brand-200);
  --color-brand-300: var(--brand-300);
  --color-brand-400: var(--brand-400);
  --color-brand-500: var(--brand-500);
  --color-brand-600: var(--brand-600);

  /* Typography */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-source-code-pro);
}`}
        lang="css"
      />

      <h2>Per-app token overrides</h2>

      <p>
        Each app can override or extend the shared token set by adding its own declarations to{' '}
        <code>globals.css</code>. This is how the docs app uses a different font from the admin app
 - both reference <code>--font-sans</code>, but each app points that variable at a different
        font family.
      </p>

      <CodeBlock
        code={`/* apps/docs/app/globals.css */
@theme inline {
  /* Docs uses Inter; admin uses a different font */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-source-code-pro);

  /* Override a surface color for docs-specific depth */
  /* --color-surface-75: var(--background-surface-75); */
}

/* apps/admin/app/globals.css */
@theme inline {
  /* Admin could use its own font here */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}`}
        lang="css"
      />

      <h2>Future light mode support</h2>

      <p>
        Light mode is fully defined in the token system already. Both the <code>:root</code> and{' '}
        <code>.light</code> selectors have complete semantic token values. Enabling light mode in
        either app requires only two changes:
      </p>

      <ol>
        <li>
          Remove <code>className="dark"</code> from the <code>{'<html>'}</code> element (or make it
          conditional on a user preference).
        </li>
        <li>
          Audit component-level styles for any that hardcode dark-specific assumptions not captured
          by tokens.
        </li>
      </ol>

      <p>
        Because all color decisions flow through semantic tokens, and all semantic tokens have both
        light and dark values, the majority of the UI will render correctly in light mode without
        any additional work.
      </p>

      <blockquote>
        <p>
          <strong>Discipline matters.</strong> The only way light mode works automatically is if
          every color in every component is expressed through a token. Hard-coded HSL values in{' '}
          <code>style</code> props or arbitrary Tailwind colors will break the theme switch. Use
          tokens everywhere.
        </p>
      </blockquote>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design/tailwind-classes" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Tailwind Classes
          </span>
        </Link>
        <Link href="/design/typography" className="group flex flex-col items-end gap-0.5">
          <span className="text-foreground-muted text-xs">Next</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            Typography →
          </span>
        </Link>
      </div>
    </>
  );
}
