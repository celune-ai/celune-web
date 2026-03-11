import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoBadge } from '../_demos';

export const metadata = {
  title: 'Badge - Components - Design System',
  description: 'Status indicators, count chips, and classification tags.',
};

export default function BadgePage() {
  return (
    <>
      <h1>Badge</h1>
      <p>
        Status indicators, count chips, and classification tags. Renders as an inline-flex pill.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoBadge>Default</DemoBadge>
          <DemoBadge variant="secondary">Secondary</DemoBadge>
          <DemoBadge variant="outline">Outline</DemoBadge>
          <DemoBadge variant="brand">Brand</DemoBadge>
          <DemoBadge variant="success">Success</DemoBadge>
          <DemoBadge variant="warning">Warning</DemoBadge>
          <DemoBadge variant="destructive">Destructive</DemoBadge>
          <DemoBadge variant="ghost">Ghost</DemoBadge>
        </div>
      </ComponentPreview>

      <CodeBlock code={`import { Badge } from '@repo/ui/components/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="ghost">Ghost</Badge>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Badge } from '@repo/ui/components/badge'`} lang="tsx" />

      <CodeBlock code={`<Badge variant="outline">Badge</Badge>`} lang="tsx" />

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Values</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>variant</code></td><td><code>default</code> | <code>secondary</code> | <code>outline</code> | <code>brand</code> | <code>success</code> | <code>warning</code> | <code>destructive</code> | <code>ghost</code></td><td><code>default</code></td></tr>
        </tbody>
      </table>
    </>
  );
}
