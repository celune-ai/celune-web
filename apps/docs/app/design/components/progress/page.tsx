import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoProgress } from '../_demos';

export const metadata = {
  title: 'Progress - Components - Design System',
  description: 'Radix Progress bar with brand fill color.',
};

export default function ProgressPage() {
  return (
    <>
      <h1>Progress</h1>
      <p>Radix Progress with brand fill. Accepts a <code>value</code> prop (0-100).</p>

      <ComponentPreview className="flex-col gap-4">
        <DemoProgress value={25} />
        <DemoProgress value={65} />
        <DemoProgress value={100} />
      </ComponentPreview>

      <CodeBlock code={`import { Progress } from '@repo/ui/components/progress'

<Progress value={65} />`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Progress } from '@repo/ui/components/progress'`} lang="tsx" />

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>value</code></td><td><code>number</code> (0-100)</td><td><code>0</code></td></tr>
        </tbody>
      </table>
    </>
  );
}
