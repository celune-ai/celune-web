import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoCheckbox } from '../_demos';

export const metadata = {
  title: 'Checkbox - Components - Design System',
  description: 'Radix Checkbox with brand-colored checked state.',
};

export default function CheckboxPage() {
  return (
    <>
      <h1>Checkbox</h1>
      <p>Radix Checkbox. Checked state uses <code>bg-brand</code>.</p>

      <ComponentPreview>
        <div className="flex flex-col gap-3">
          <DemoCheckbox label="Accept terms and conditions" checked />
          <DemoCheckbox label="Send me marketing emails" />
        </div>
      </ComponentPreview>

      <CodeBlock code={`import { Checkbox } from '@repo/ui/components/checkbox'
import { Label } from '@repo/ui/components/label'

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Checkbox } from '@repo/ui/components/checkbox'`} lang="tsx" />
    </>
  );
}
