import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoCheckbox } from '../_demos';

export const metadata = {
  title: 'Checkbox - Components - Design System',
  description:
    'Toggles a boolean value on or off. Checked state uses brand-green fill.',
};

export default function CheckboxPage() {
  return (
    <>
      <h1>Checkbox</h1>
      <p>
        Toggles a boolean value on or off. Built on Radix Checkbox, the checked state uses{' '}
        <code>bg-brand</code> (<code>--brand</code>) with a white checkmark. Unchecked state
        shows <code>border-border-control</code> over <code>bg-surface-100</code>.
      </p>

      <ComponentPreview>
        <div className="flex flex-col gap-3">
          <DemoCheckbox label="Accept terms and conditions" checked />
          <DemoCheckbox label="Send me marketing emails" />
        </div>
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Checkbox } from '@repo/ui/components/checkbox'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>With label</h3>
      <p>Always pair a Checkbox with a Label. Connect them via matching <code>id</code> / <code>htmlFor</code>.</p>

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
</div>`} lang="tsx" />

      <h3>Controlled</h3>

      <CodeBlock code={`const [checked, setChecked] = useState(false)

<Checkbox
  checked={checked}
  onCheckedChange={(value) => setChecked(value === true)}
/>`} lang="tsx" />

      <h3>Indeterminate</h3>
      <p>
        Use the indeterminate state for &quot;select all&quot; checkboxes when only some children
        are checked.
      </p>

      <CodeBlock code={`<Checkbox checked="indeterminate" />`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use checkboxes for multi-select scenarios where users can choose zero or more
            options from a list.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use a checkbox for a single on/off setting. Use a Switch instead — it better
            communicates an immediate state change.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use positive phrasing for labels: &quot;Send me updates&quot; not &quot;Don&apos;t
            send me updates.&quot;
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use checkboxes for mutually exclusive choices. Use a RadioGroup instead.
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
            <td><code>checked</code></td>
            <td><code>{`boolean | "indeterminate"`}</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>defaultChecked</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>onCheckedChange</code></td>
            <td><code>{`(checked: boolean | "indeterminate") => void`}</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>required</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>name</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
        </tbody>
      </table>

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
            <td><code>Space</code></td>
            <td>Toggles the checkbox</td>
          </tr>
          <tr>
            <td><code>Tab</code></td>
            <td>Moves focus to the next focusable element</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Checkbox renders with <code>role=&quot;checkbox&quot;</code> and manages{' '}
        <code>aria-checked</code> automatically, including the <code>mixed</code> state for
        indeterminate. Always provide a visible label or <code>aria-label</code>.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/switch">Switch</a> — Better for single on/off settings that take effect immediately</li>
        <li><a href="/design/components/radio-group">Radio Group</a> — For mutually exclusive single-choice selection</li>
        <li><a href="/design/components/label">Label</a> — Required companion for accessible form fields</li>
      </ul>
    </>
  );
}
