import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoInput } from '../_demos';

export const metadata = {
  title: 'Input - Components - Design System',
  description:
    'Captures a single line of text. Displays a brand-green focus ring to confirm interaction.',
};

export default function InputPage() {
  return (
    <>
      <h1>Input</h1>
      <p>
        Captures a single line of text. The input uses <code>border-border-control</code>{' '}
        (<code>--border-control</code>) at rest and transitions to a brand-green focus ring
        (<code>ring-brand/40</code>, <code>border-brand</code>) on focus.
      </p>

      <ComponentPreview>
        <DemoInput placeholder="Enter your email..." />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Input } from '@repo/ui/components/input'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Default</h3>
      <p>A standard text input with placeholder text.</p>

      <ComponentPreview>
        <DemoInput placeholder="you@company.com" />
      </ComponentPreview>

      <CodeBlock code={`<Input type="email" placeholder="you@company.com" />`} lang="tsx" />

      <h3>With label</h3>
      <p>
        Always pair an Input with a Label for accessibility. Use a wrapping <code>div</code> with
        a vertical gap.
      </p>

      <CodeBlock code={`import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email address</Label>
  <Input type="email" id="email" placeholder="you@company.com" />
</div>`} lang="tsx" />

      <h3>With helper text and error</h3>
      <p>Show validation feedback below the input using a small text element.</p>

      <CodeBlock code={`<div className="flex flex-col gap-1.5">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="celune_user" aria-invalid="true" />
  <p className="text-destructive-500 text-xs">Username is already taken.</p>
</div>`} lang="tsx" />

      <h3>Disabled</h3>

      <CodeBlock code={`<Input disabled placeholder="Cannot edit" />`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use descriptive placeholder text that shows the expected format, like
            &quot;you@company.com&quot; for email fields.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use placeholder text as a substitute for a label. Placeholders disappear on focus,
            leaving users without context.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use the correct <code>type</code> attribute (<code>email</code>, <code>password</code>,{' '}
            <code>url</code>) to trigger the right mobile keyboard and browser autofill.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use an Input for multi-line content. Switch to a Textarea when users may need more
            than one line.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>type</code></td>
            <td><code>string</code> (any HTML input type)</td>
            <td><code>{`"text"`}</code></td>
          </tr>
          <tr>
            <td><code>placeholder</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
        </tbody>
      </table>

      <p>
        Input forwards all standard <code>&lt;input&gt;</code> attributes including{' '}
        <code>onChange</code>, <code>value</code>, <code>name</code>, and <code>aria-*</code> props.
      </p>

      <h2>Accessibility</h2>

      <h3>Keyboard interactions</h3>

      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Tab</code></td>
            <td>Moves focus into or out of the input</td>
          </tr>
        </tbody>
      </table>

      <p>
        Always associate a <code>&lt;Label&gt;</code> with the input via matching{' '}
        <code>htmlFor</code> / <code>id</code> attributes. For inline validation, set{' '}
        <code>aria-invalid=&quot;true&quot;</code> and link the error message with{' '}
        <code>aria-describedby</code>.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/textarea">Textarea</a> — For multi-line text input</li>
        <li><a href="/design/components/label">Label</a> — Required companion for accessible form fields</li>
        <li><a href="/design/components/select">Select</a> — When users choose from a predefined list instead of typing</li>
      </ul>
    </>
  );
}
