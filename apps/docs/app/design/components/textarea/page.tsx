import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoTextarea } from '../_demos';

export const metadata = {
  title: 'Textarea - Components - Design System',
  description:
    'Captures multi-line text input with the same focus styling as Input.',
};

export default function TextareaPage() {
  return (
    <>
      <h1>Textarea</h1>
      <p>
        Captures multi-line text input. Shares the same border and focus-ring treatment as Input
        (<code>border-border-control</code> at rest, <code>ring-brand/40</code> on focus). Set
        the <code>rows</code> prop to control the default visible height.
      </p>

      <ComponentPreview>
        <DemoTextarea />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Textarea } from '@repo/ui/components/textarea'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Default</h3>

      <ComponentPreview>
        <DemoTextarea />
      </ComponentPreview>

      <CodeBlock code={`<Textarea placeholder="Write a message..." rows={3} />`} lang="tsx" />

      <h3>With label</h3>

      <CodeBlock code={`import { Textarea } from '@repo/ui/components/textarea'
import { Label } from '@repo/ui/components/label'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="description">Description</Label>
  <Textarea id="description" placeholder="Describe the issue..." rows={4} />
</div>`} lang="tsx" />

      <h3>With character count</h3>

      <CodeBlock code={`const [value, setValue] = useState('')

<div className="flex flex-col gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea
    id="bio"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    maxLength={280}
    rows={3}
  />
  <p className="text-foreground-muted text-xs text-right">
    {value.length}/280
  </p>
</div>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Set <code>rows</code> to match expected content length — 3 for short messages,
            6+ for long-form content like descriptions.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use a Textarea for single-line values like names or emails. Use an Input instead.
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
            <td><code>rows</code></td>
            <td><code>number</code></td>
            <td><code>3</code></td>
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
        Textarea forwards all standard <code>&lt;textarea&gt;</code> attributes including{' '}
        <code>onChange</code>, <code>value</code>, <code>maxLength</code>, and{' '}
        <code>aria-*</code> props.
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
            <td>Moves focus into or out of the textarea</td>
          </tr>
          <tr>
            <td><code>Enter</code></td>
            <td>Inserts a new line (does not submit)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Always pair with a <code>&lt;Label&gt;</code>. If providing a character counter or
        helper text, link it via <code>aria-describedby</code> so screen readers announce it.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/input">Input</a> — For single-line text capture</li>
        <li><a href="/design/components/label">Label</a> — Required companion for accessible form fields</li>
      </ul>
    </>
  );
}
