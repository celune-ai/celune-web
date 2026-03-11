import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Popover - Components - Design System',
  description: 'Radix Popover for floating content panels.',
};

export default function PopoverPage() {
  return (
    <>
      <h1>Popover</h1>
      <p>Radix Popover for floating content panels. Uses <code>bg-surface-100</code> with border and shadow.</p>

      <CodeBlock code={`import { Popover, PopoverTrigger, PopoverContent } from '@repo/ui/components/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="flex flex-col gap-2">
      <h4 className="font-medium">Popover Title</h4>
      <p className="text-sm text-foreground-light">
        Popover content goes here.
      </p>
    </div>
  </PopoverContent>
</Popover>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Popover, PopoverTrigger, PopoverContent } from '@repo/ui/components/popover'`} lang="tsx" />
    </>
  );
}
