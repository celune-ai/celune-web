import Link from 'next/link';

export const metadata = {
  title: 'Color Usage - Design System',
  description:
    'Full color token vocabulary for the Smejkal Design System, with live-rendered swatches.',
};

export default function ColorsPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Getting Started</p>
      <h1>Color Usage</h1>

      <p className="lead">
        The token system follows a two-layer architecture: primitive gray and color scales are
        defined first, then semantic tokens reference those primitives. All values are CSS custom
        properties defined in <code>@repo/ui/theme.css</code> and mapped to Tailwind utilities via{' '}
        <code>@theme inline</code> in each app&apos;s <code>globals.css</code>. This page documents
        the semantic tokens you should use in components.
      </p>

      <h2>Text</h2>

      <p>
        Use the foreground scale to create visual hierarchy in text. The scale ranges from
        high-contrast body text down to near-invisible muted labels. Never rely solely on color to
        convey meaning; pair color changes with font-weight or position to maintain accessibility.
      </p>

      {/* Text swatches */}
      <div className="not-prose border-border my-6 overflow-hidden rounded-lg border">
        <div className="border-border bg-surface-75 flex items-center justify-between border-b px-4 py-3">
          <span className="text-foreground text-sm font-medium">
            The quick brown fox jumps over the lazy dog
          </span>
          <div className="flex items-center gap-3">
            <code className="text-foreground-lighter font-mono text-xs">text-foreground</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 98%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center justify-between border-b px-4 py-3">
          <span className="text-foreground-light text-sm font-medium">
            The quick brown fox jumps over the lazy dog
          </span>
          <div className="flex items-center gap-3">
            <code className="text-foreground-lighter font-mono text-xs">text-foreground-light</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 70.6%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center justify-between border-b px-4 py-3">
          <span className="text-foreground-lighter text-sm font-medium">
            The quick brown fox jumps over the lazy dog
          </span>
          <div className="flex items-center gap-3">
            <code className="text-foreground-lighter font-mono text-xs">
              text-foreground-lighter
            </code>
            <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 53.7%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center justify-between border-b px-4 py-3">
          <span className="text-foreground-muted text-sm font-medium">
            The quick brown fox jumps over the lazy dog
          </span>
          <div className="flex items-center gap-3">
            <code className="text-foreground-lighter font-mono text-xs">text-foreground-muted</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 30.2%)</span>
          </div>
        </div>
        <div className="bg-surface-75 flex items-center justify-between px-4 py-3">
          <span className="text-sm font-medium">
            <span className="bg-brand inline-flex items-center rounded px-2 py-0.5">
              <span className="text-foreground-contrast text-sm font-medium">
                The quick brown fox
              </span>
            </span>
          </span>
          <div className="flex items-center gap-3">
            <code className="text-foreground-lighter font-mono text-xs">
              text-foreground-contrast
            </code>
            <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 8.6%)</span>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Tailwind class</th>
            <th>Usage</th>
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
            <td>Primary body text, headings</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-light</code>
            </td>
            <td>
              <code>text-foreground-light</code>
            </td>
            <td>Secondary body text, descriptions</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-lighter</code>
            </td>
            <td>
              <code>text-foreground-lighter</code>
            </td>
            <td>Nav links, placeholders, metadata</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-muted</code>
            </td>
            <td>
              <code>text-foreground-muted</code>
            </td>
            <td>Captions, section labels, timestamps</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-contrast</code>
            </td>
            <td>
              <code>text-foreground-contrast</code>
            </td>
            <td>Text placed on colored backgrounds (brand, destructive)</td>
          </tr>
        </tbody>
      </table>

      <h2>Background</h2>

      <p>
        A six-level surface scale creates depth and visual hierarchy across the interface. The
        background token is the outermost canvas; higher-numbered surfaces sit progressively on top.
        Use the scale consistently so that visual elevation always matches semantic importance.
      </p>

      {/* Background swatches */}
      <div className="not-prose border-border my-6 overflow-hidden rounded-lg border">
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-background border-border h-8 w-8 shrink-0 rounded border" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-background</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Main canvas</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 7.1%)</span>
            </div>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-surface-75 border-border h-8 w-8 shrink-0 rounded border" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-surface-75</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Sidebar, action bar</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 9%)</span>
            </div>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-surface-100 border-border h-8 w-8 shrink-0 rounded border" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-surface-100</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Cards, panels</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 12.2%)</span>
            </div>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-surface-200 border-border h-8 w-8 shrink-0 rounded border" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-surface-200</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Hover states, nested surfaces</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 12.9%)</span>
            </div>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-surface-300 border-border h-8 w-8 shrink-0 rounded border" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-surface-300</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Stacked layers</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 16.1%)</span>
            </div>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-surface-400 border-border h-8 w-8 shrink-0 rounded border" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-surface-400</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Deepest stacked layer</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 16.1%)</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-75 flex items-center gap-4 px-4 py-3">
          <div className="bg-muted border-border h-8 w-8 shrink-0 rounded border" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-muted</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Muted area background</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 14.1%)</span>
            </div>
          </div>
        </div>
      </div>

      <h2>Border</h2>

      <p>
        Five border tokens cover the range from nearly invisible separators to high-contrast strokes
        for inputs and emphasis. Use the weakest token that still provides sufficient separation at
        the given depth.
      </p>

      {/* Border swatches */}
      <div className="not-prose border-border my-6 overflow-hidden rounded-lg border">
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="border-border bg-surface-100 h-8 w-8 shrink-0 rounded border-2" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">border-border</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Default dividers, card edges</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 18%)</span>
            </div>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="border-border-muted bg-surface-100 h-8 w-8 shrink-0 rounded border-2" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">border-border-muted</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Very subtle separators</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 14.1%)</span>
            </div>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="border-border-control bg-surface-100 h-8 w-8 shrink-0 rounded border-2" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">border-border-control</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">
                Input and form control borders
              </span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 22.4%)</span>
            </div>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="border-border-strong bg-surface-100 h-8 w-8 shrink-0 rounded border-2" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">border-border-strong</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">Emphasized dividers</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 21.2%)</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-75 flex items-center gap-4 px-4 py-3">
          <div className="border-border-stronger bg-surface-100 h-8 w-8 shrink-0 rounded border-2" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">border-border-stronger</code>
            <div className="flex items-center gap-4">
              <span className="text-foreground-lighter text-xs">High-contrast dividers</span>
              <span className="text-foreground-muted font-mono text-xs">hsl(0° 0% 27.1%)</span>
            </div>
          </div>
        </div>
      </div>

      <h2>Semantic colors</h2>

      <p>
        Three semantic scales carry meaning beyond surface and text: brand (the primary green),
        destructive (errors and delete actions), and warning (cautions and non-critical alerts).
        Each scale runs from 200 (lightest, used for tinted backgrounds) through 600 (for text on
        light surfaces), with a <code>-default</code> token for the primary use case.
      </p>

      <h3>Brand</h3>
      <p>
        Emerald green is the identity color. Use <code>bg-brand</code> for primary buttons and
        active indicator bars. Use <code>text-brand</code> for link text and icon accents.
      </p>

      {/* Brand swatches */}
      <div className="not-prose border-border my-6 overflow-hidden rounded-lg border">
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-brand h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-brand</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(153.1° 60.2% 52.7%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-brand-600 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-brand-600</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(154.9° 59.5% 70%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-brand-500 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-brand-500</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(154.9° 100% 19.2%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-brand-400 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-brand-400</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(155.5° 100% 9.6%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-brand-300 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-brand-300</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(155.1° 100% 8%)</span>
          </div>
        </div>
        <div className="bg-surface-75 flex items-center gap-4 px-4 py-3">
          <div className="bg-brand-200 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-brand-200</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(162° 100% 2%)</span>
          </div>
        </div>
      </div>

      <h3>Destructive</h3>
      <p>
        Used for error states, delete confirmations, and any action that is irreversible. The{' '}
        <code>-200</code> token is the tinted background for destructive banners; the{' '}
        <code>-default</code> token is the button fill.
      </p>

      {/* Destructive swatches */}
      <div className="not-prose border-border my-6 overflow-hidden rounded-lg border">
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-destructive h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-destructive</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(10.2° 77.9% 53.9%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-destructive-600 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-destructive-600</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(9.7° 85.2% 62.9%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-destructive-500 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-destructive-500</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(7.9° 71.6% 29%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-destructive-400 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-destructive-400</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(6.7° 60% 20.6%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-destructive-300 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-destructive-300</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(7.5° 51.3% 15.3%)</span>
          </div>
        </div>
        <div className="bg-surface-75 flex items-center gap-4 px-4 py-3">
          <div className="bg-destructive-200 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-destructive-200</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(10.9° 23.4% 9.2%)</span>
          </div>
        </div>
      </div>

      <h3>Warning</h3>
      <p>
        Used for cautionary states and non-critical alerts. Warning does not imply data loss; use
        destructive for that. Amber fills are most visible against dark surfaces, so apply the full
        scale consistently.
      </p>

      {/* Warning swatches */}
      <div className="not-prose border-border my-6 overflow-hidden rounded-lg border">
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-warning h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-warning</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(38.9° 100% 42.9%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-warning-600 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-warning-600</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(38.9° 100% 42.9%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-warning-500 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-warning-500</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(34.8° 90.9% 21.6%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-warning-400 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-warning-400</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(33.2° 100% 14.5%)</span>
          </div>
        </div>
        <div className="border-border bg-surface-75 flex items-center gap-4 border-b px-4 py-3">
          <div className="bg-warning-300 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-warning-300</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(32.3° 100% 10.2%)</span>
          </div>
        </div>
        <div className="bg-surface-75 flex items-center gap-4 px-4 py-3">
          <div className="bg-warning-200 h-8 w-8 shrink-0 rounded" />
          <div className="flex flex-1 items-center justify-between">
            <code className="text-foreground font-mono text-sm">bg-warning-200</code>
            <span className="text-foreground-muted font-mono text-xs">hsl(36.6° 100% 8%)</span>
          </div>
        </div>
      </div>

      <blockquote>
        <p>
          <strong>Scale convention:</strong> <code>-200</code> tokens are tinted backgrounds for
          banners and callouts. <code>-300</code> to <code>-400</code> are used for borders on those
          backgrounds. <code>-500</code> is the muted fill state. <code>-600</code> is the text
          color on dark surfaces. The <code>-default</code> token (e.g. <code>bg-brand</code>,{' '}
          <code>bg-destructive</code>) is the primary button or badge fill.
        </p>
      </blockquote>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design/accessibility" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Accessibility
          </span>
        </Link>
        <Link href="/design/writing" className="group flex flex-col items-end gap-0.5">
          <span className="text-foreground-muted text-xs">Next</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            Writing →
          </span>
        </Link>
      </div>
    </>
  );
}
