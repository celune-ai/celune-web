import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Label - Components - Design System',
  description: 'Radix Label for accessible form field labeling.',
};

export default function LabelPage() {
  return (
    <>
      <h1>Label</h1>
      <p>
        Radix Label for accessible form field labeling. Automatically associates with inputs
        via <code>htmlFor</code>.
      </p>

      <CodeBlock code={`import { Label } from '@repo/ui/components/label'
import { Input } from '@repo/ui/components/input'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="you@company.com" />
</div>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Label } from '@repo/ui/components/label'`} lang="tsx" />
    </>
  );
}
