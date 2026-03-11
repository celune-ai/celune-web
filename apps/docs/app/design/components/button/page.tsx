import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoButton, Mail, Pencil, MoreVertical } from '../_demos';

export const metadata = {
  title: 'Button - Components - Design System',
  description: 'The primary action component with semantic variants and size scale.',
};

export default function ButtonPage() {
  return (
    <>
      <h1>Button</h1>
      <p>
        The primary action component. Variants map to semantic intent. All variants share the same
        size scale and focus ring.
      </p>

      <h2>Variants</h2>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoButton>Button rest</DemoButton>
          <DemoButton variant="secondary">Secondary</DemoButton>
          <DemoButton variant="outline">Outline</DemoButton>
          <DemoButton variant="ghost">Ghost</DemoButton>
          <DemoButton variant="destructive">Destructive</DemoButton>
          <DemoButton variant="warning">Warning</DemoButton>
          <DemoButton variant="link">Link</DemoButton>
        </div>
      </ComponentPreview>

      <CodeBlock code={`import { Button } from '@repo/ui/components/button'

export function ButtonDemo() {
  return (
    <div className="flex gap-3">
      <Button>Button rest</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`} />

      <h2>Sizes</h2>
      <p>
        Three sizes: <strong>sm</strong> (28px), <strong>md</strong> (32px, default),{' '}
        <strong>lg</strong> (40px). Each has a matching icon-only variant.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoButton size="sm">Small</DemoButton>
          <DemoButton>Medium</DemoButton>
          <DemoButton size="lg">Large</DemoButton>
          <DemoButton size="icon"><Mail size={16} /></DemoButton>
          <DemoButton variant="outline" size="icon-sm"><Pencil size={14} /></DemoButton>
          <DemoButton variant="ghost" size="icon"><MoreVertical size={16} /></DemoButton>
        </div>
      </ComponentPreview>

      <CodeBlock code={`<Button size="sm">Small</Button>
<Button>Medium</Button>              {/* md is default */}
<Button size="lg">Large</Button>
<Button size="icon"><Mail /></Button>
<Button variant="outline" size="icon-sm"><Pencil /></Button>
<Button variant="ghost" size="icon"><MoreVertical /></Button>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Button } from '@repo/ui/components/button'`} lang="tsx" />

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Values</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>variant</code></td><td><code>default</code> | <code>secondary</code> | <code>outline</code> | <code>ghost</code> | <code>destructive</code> | <code>warning</code> | <code>link</code></td><td><code>default</code></td></tr>
          <tr><td><code>size</code></td><td><code>sm</code> | <code>md</code> | <code>lg</code> | <code>icon</code> | <code>icon-sm</code> | <code>icon-md</code></td><td><code>md</code></td></tr>
        </tbody>
      </table>
    </>
  );
}
