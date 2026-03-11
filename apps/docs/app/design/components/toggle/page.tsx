import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Toggle - Components - Design System',
  description: 'Radix Toggle for binary on/off state.',
};

export default function TogglePage() {
  return (
    <>
      <h1>Toggle</h1>
      <p>Radix Toggle for binary on/off state. Pressed state uses <code>bg-surface-300</code>.</p>

      <CodeBlock code={`import { Toggle } from '@repo/ui/components/toggle'
import { Bold } from 'lucide-react'

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Toggle } from '@repo/ui/components/toggle'`} lang="tsx" />

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Values</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>variant</code></td><td><code>default</code> | <code>outline</code></td><td><code>default</code></td></tr>
          <tr><td><code>size</code></td><td><code>default</code> | <code>sm</code> | <code>lg</code></td><td><code>default</code></td></tr>
        </tbody>
      </table>
    </>
  );
}
