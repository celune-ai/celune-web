import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoSkeleton } from '../_demos';

export const metadata = {
  title: 'Skeleton - Components - Design System',
  description:
    'Indicates loading state with animated pulse placeholders that mirror the final layout.',
};

export default function SkeletonPage() {
  return (
    <>
      <h1>Skeleton</h1>
      <p>
        Indicates loading state with animated pulse placeholders. Shape the skeleton to mirror
        the final content layout using <code>className</code> for width, height, and border
        radius. Uses <code>bg-surface-300</code> with Tailwind&apos;s <code>animate-pulse</code>.
      </p>

      <ComponentPreview>
        <DemoSkeleton />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Skeleton } from '@repo/ui/components/skeleton'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Text lines</h3>
      <p>Vary widths to suggest natural text wrapping.</p>

      <ComponentPreview>
        <DemoSkeleton />
      </ComponentPreview>

      <CodeBlock code={`<div className="flex flex-col gap-3">
  <Skeleton className="h-4 w-48" />
  <Skeleton className="h-4 w-64" />
  <Skeleton className="h-4 w-40" />
</div>`} lang="tsx" />

      <h3>Card skeleton</h3>
      <p>Match the skeleton shape to the card layout users will eventually see.</p>

      <CodeBlock code={`<div className="w-80 rounded-lg border border-border p-6">
  <Skeleton className="h-5 w-32 mb-2" />
  <Skeleton className="h-3 w-48 mb-6" />
  <Skeleton className="h-20 w-full mb-4" />
  <div className="flex justify-end gap-2">
    <Skeleton className="h-8 w-20 rounded-md" />
    <Skeleton className="h-8 w-20 rounded-md" />
  </div>
</div>`} lang="tsx" />

      <h3>Avatar + text</h3>

      <CodeBlock code={`<div className="flex items-center gap-3">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Match skeleton shapes to the real content layout. Users should recognize the
            loading state as a preview of what is coming.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use a single skeleton rectangle for complex layouts. Take the time to approximate
            the real structure.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use skeletons for initial data loads where the layout is known. They reduce
            perceived wait time compared to spinners.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use skeletons for actions where a spinner or progress bar is more appropriate, like
            file uploads or form submissions.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
        </tbody>
      </table>

      <p>
        Skeleton is a simple <code>div</code> with <code>animate-pulse</code> and{' '}
        <code>bg-surface-300</code>. Control dimensions and shape entirely via{' '}
        <code>className</code>. Use <code>rounded-full</code> for circular skeletons (avatars)
        and <code>rounded-md</code> for rectangular elements (buttons, cards).
      </p>

      <h2>Accessibility</h2>

      <p>
        Skeleton placeholders are decorative. Add <code>aria-hidden=&quot;true&quot;</code> to
        skeleton containers and use <code>aria-busy=&quot;true&quot;</code> on the parent section
        that is loading. Include a visually hidden loading message for screen readers:
      </p>

      <CodeBlock code={`<section aria-busy={isLoading}>
  <span className="sr-only">Loading content...</span>
  {isLoading ? <Skeleton className="h-4 w-48" /> : <p>{content}</p>}
</section>`} lang="tsx" />

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/progress">Progress</a> — For determinate loading with a known percentage</li>
        <li><a href="/design/components/card">Card</a> — Common container to build skeleton layouts for</li>
        <li><a href="/design/components/avatar">Avatar</a> — Use <code>rounded-full</code> skeleton for avatar placeholders</li>
      </ul>
    </>
  );
}
