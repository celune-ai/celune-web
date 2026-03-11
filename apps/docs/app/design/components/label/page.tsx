import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Label - Components - Design System',
  description:
    'Associates accessible text with a form control via htmlFor/id pairing.',
};

export default function LabelPage() {
  return (
    <>
      <h1>Label</h1>
      <p>
        Associates accessible text with a form control. Built on Radix Label, it renders as a
        styled <code>&lt;label&gt;</code> element and automatically connects to its input via
        matching <code>htmlFor</code> / <code>id</code> attributes.
      </p>

      <h2>Installation</h2>

      <CodeBlock code={`import { Label } from '@repo/ui/components/label'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>With Input</h3>

      <CodeBlock code={`import { Label } from '@repo/ui/components/label'
import { Input } from '@repo/ui/components/input'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="you@company.com" />
</div>`} lang="tsx" />

      <h3>With Textarea</h3>

      <CodeBlock code={`<div className="flex flex-col gap-1.5">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Write your message..." rows={4} />
</div>`} lang="tsx" />

      <h3>With required indicator</h3>

      <CodeBlock code={`<div className="flex flex-col gap-1.5">
  <Label htmlFor="name">
    Name <span className="text-destructive-500">*</span>
  </Label>
  <Input id="name" required />
</div>`} lang="tsx" />

      <h3>With helper text</h3>

      <CodeBlock code={`<div className="flex flex-col gap-1.5">
  <Label htmlFor="slug">Project slug</Label>
  <Input id="slug" placeholder="my-project" />
  <p className="text-foreground-muted text-xs">
    URL-safe identifier. Cannot be changed later.
  </p>
</div>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Provide a Label for every form control. It is the single most important
            accessibility requirement for forms.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Rely on placeholder text as a label. Placeholders disappear on focus and are not
            reliably announced by all screen readers.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Keep label text short and descriptive: &quot;Email address&quot; not &quot;Please
            enter your email address below.&quot;
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use Label for non-form text. It renders a <code>&lt;label&gt;</code> element which
            has semantic meaning tied to form controls.
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
            <td><code>htmlFor</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
        </tbody>
      </table>

      <p>
        Label renders as <code>text-sm font-medium text-foreground</code>. It forwards all
        native <code>&lt;label&gt;</code> attributes.
      </p>

      <h2>Accessibility</h2>

      <p>
        Label uses the native <code>&lt;label&gt;</code> element which browsers automatically
        associate with the referenced form control. Clicking the label focuses the input. For
        controls that cannot use <code>htmlFor</code> (e.g., custom widgets), wrap the control
        inside the Label element instead.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/input">Input</a> — The most common control to pair with a label</li>
        <li><a href="/design/components/textarea">Textarea</a> — Multi-line text input</li>
        <li><a href="/design/components/select">Select</a> — Dropdown selection control</li>
        <li><a href="/design/components/checkbox">Checkbox</a> — Boolean toggle control</li>
        <li><a href="/design/components/radio-group">Radio Group</a> — Single-choice selection</li>
      </ul>
    </>
  );
}
