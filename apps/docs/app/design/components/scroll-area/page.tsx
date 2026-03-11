import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Scroll Area - Components - Design System',
  description:
    'Provides custom-styled scrollbars that replace native browser scrollbars.',
};

export default function ScrollAreaPage() {
  return (
    <>
      <h1>Scroll Area</h1>
      <p>
        Provides custom-styled scrollbars that replace native browser scrollbars. Built on Radix
        ScrollArea, it renders a themed scrollbar track that blends with the design system while
        maintaining full scrolling functionality.
      </p>

      <h2>Installation</h2>

      <CodeBlock code={`import { ScrollArea } from '@repo/ui/components/scroll-area'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Vertical scroll</h3>
      <p>Set a fixed height and the scrollbar appears when content overflows.</p>

      <CodeBlock code={`<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {items.map((item) => (
      <div key={item} className="text-sm py-1">
        {item}
      </div>
    ))}
  </div>
</ScrollArea>`} lang="tsx" />

      <h3>Horizontal scroll</h3>
      <p>Wrap wide content like tables or code blocks in a horizontal scroll area.</p>

      <CodeBlock code={`<ScrollArea className="w-full whitespace-nowrap rounded-md border" orientation="horizontal">
  <div className="flex gap-4 p-4">
    {cards.map((card) => (
      <div key={card.id} className="w-64 shrink-0 rounded-lg border p-4">
        {card.title}
      </div>
    ))}
  </div>
</ScrollArea>`} lang="tsx" />

      <h3>With a list</h3>
      <p>Common pattern for sidebar navigation or dropdown menus with many items.</p>

      <CodeBlock code={`<ScrollArea className="h-64">
  <div className="flex flex-col gap-1 p-2">
    {projects.map((project) => (
      <button
        key={project.id}
        className="text-sm text-left px-3 py-2 rounded-md hover:bg-surface-200 text-foreground-light"
      >
        {project.name}
      </button>
    ))}
  </div>
</ScrollArea>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use ScrollArea for contained lists, code panels, and sidebars where overflow is
            expected and native scrollbars clash with the design.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Wrap the entire page in a ScrollArea. Let the browser handle page-level scrolling
            natively.
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
            <td><code>orientation</code></td>
            <td><code>{`"vertical" | "horizontal"`}</code></td>
            <td><code>{`"vertical"`}</code></td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>

      <p>
        Radix ScrollArea uses native scrolling semantics under the hood. The scrollable region
        is focusable and keyboard-scrollable. Screen readers interact with the content normally —
        the custom scrollbar is a visual enhancement only. Ensure the scrollable container has a
        defined height or max-height so users know content extends beyond the viewport.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/table">Table</a> — Wrap wide tables for horizontal scrolling</li>
        <li><a href="/design/components/select">Select</a> — Dropdown content uses ScrollArea internally for long lists</li>
      </ul>
    </>
  );
}
