import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoInput } from '../_demos';

export const metadata = {
  title: 'Input - Components - Design System',
  description: 'Standard text input with brand-green focus ring.',
};

export default function InputPage() {
  return (
    <>
      <h1>Input</h1>
      <p>
        Standard text input with brand-green focus ring. Uses <code>border-border-control</code> at
        rest and <code>ring-2 ring-brand/40 border-brand</code> on focus.
      </p>

      <ComponentPreview>
        <DemoInput placeholder="Enter your email..." />
      </ComponentPreview>

      <CodeBlock code={`import { Input } from '@repo/ui/components/input'

<Input placeholder="Enter your email..." />`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Input } from '@repo/ui/components/input'`} lang="tsx" />

      <CodeBlock code={`<Input type="email" placeholder="you@company.com" />`} lang="tsx" />

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>type</code></td><td>HTML input type</td><td><code>text</code></td></tr>
          <tr><td><code>placeholder</code></td><td><code>string</code></td><td>—</td></tr>
          <tr><td><code>disabled</code></td><td><code>boolean</code></td><td><code>false</code></td></tr>
        </tbody>
      </table>
    </>
  );
}
