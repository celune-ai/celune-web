import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Radio Group - Components - Design System',
  description: 'Radix Radio Group for single-choice selection.',
};

export default function RadioGroupPage() {
  return (
    <>
      <h1>Radio Group</h1>
      <p>Radix Radio Group for single-choice selection. Selected state uses <code>bg-brand</code>.</p>

      <CodeBlock code={`import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group'
import { Label } from '@repo/ui/components/label'

<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group'`} lang="tsx" />
    </>
  );
}
