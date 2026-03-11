import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Scroll Area - Components - Design System',
  description: 'Radix Scroll Area with custom scrollbar styling.',
};

export default function ScrollAreaPage() {
  return (
    <>
      <h1>Scroll Area</h1>
      <p>Radix Scroll Area with custom scrollbar styling. Replaces native scrollbars with a themed track.</p>

      <CodeBlock code={`import { ScrollArea } from '@repo/ui/components/scroll-area'

<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {items.map((item) => (
      <div key={item} className="text-sm">
        {item}
      </div>
    ))}
  </div>
</ScrollArea>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { ScrollArea } from '@repo/ui/components/scroll-area'`} lang="tsx" />
    </>
  );
}
