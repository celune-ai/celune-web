import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoTextarea } from '../_demos';

export const metadata = {
  title: 'Textarea - Components - Design System',
  description: 'Multi-line text input with matching focus styling.',
};

export default function TextareaPage() {
  return (
    <>
      <h1>Textarea</h1>
      <p>Same focus and border treatment as Input. Set <code>rows</code> for height.</p>

      <ComponentPreview>
        <DemoTextarea />
      </ComponentPreview>

      <CodeBlock code={`import { Textarea } from '@repo/ui/components/textarea'

<Textarea placeholder="Write a message..." rows={3} />`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Textarea } from '@repo/ui/components/textarea'`} lang="tsx" />

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>rows</code></td><td><code>number</code></td><td><code>3</code></td></tr>
          <tr><td><code>placeholder</code></td><td><code>string</code></td><td>—</td></tr>
        </tbody>
      </table>
    </>
  );
}
