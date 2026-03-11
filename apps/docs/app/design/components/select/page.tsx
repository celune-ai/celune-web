import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoSelect } from '../_demos';

export const metadata = {
  title: 'Select - Components - Design System',
  description:
    'Presents a list of options in an accessible dropdown powered by Radix UI.',
};

export default function SelectPage() {
  return (
    <>
      <h1>Select</h1>
      <p>
        Presents a list of options in an accessible dropdown. Built on Radix Select with the same
        border and focus styling as Input — <code>border-border-control</code> at rest,
        brand-green focus ring on interaction.
      </p>

      <ComponentPreview>
        <DemoSelect />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@repo/ui/components/select'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Basic</h3>
      <p>A minimal select with a placeholder and a few options.</p>

      <ComponentPreview>
        <DemoSelect />
      </ComponentPreview>

      <CodeBlock code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="one">Option One</SelectItem>
    <SelectItem value="two">Option Two</SelectItem>
    <SelectItem value="three">Option Three</SelectItem>
  </SelectContent>
</Select>`} lang="tsx" />

      <h3>With label</h3>

      <CodeBlock code={`import { Label } from '@repo/ui/components/label'

<div className="flex flex-col gap-1.5">
  <Label htmlFor="role">Role</Label>
  <Select>
    <SelectTrigger id="role">
      <SelectValue placeholder="Choose a role..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="editor">Editor</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
</div>`} lang="tsx" />

      <h3>With groups</h3>

      <CodeBlock code={`import { SelectGroup, SelectLabel } from '@repo/ui/components/select'

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose a timezone..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern (UTC-5)</SelectItem>
      <SelectItem value="cst">Central (UTC-6)</SelectItem>
      <SelectItem value="pst">Pacific (UTC-8)</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
      <SelectItem value="cet">CET (UTC+1)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use Select when there are 5+ predefined options. For 2-4 options, consider a
            RadioGroup for faster scanning.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use Select for boolean choices. Use a Switch or Checkbox instead.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Always provide a descriptive placeholder like &quot;Choose a role...&quot; so users
            know what to expect.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use a Select when users need to search or filter options. Use a Combobox or Popover
            with search instead.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <h3>Select (root)</h3>
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
            <td><code>value</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>defaultValue</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>onValueChange</code></td>
            <td><code>(value: string) =&gt; void</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
        </tbody>
      </table>

      <h3>SelectItem</h3>
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
            <td><code>value</code></td>
            <td><code>string</code> (required)</td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
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
            <td><code>Enter</code> / <code>Space</code></td>
            <td>Opens the dropdown or selects the focused item</td>
          </tr>
          <tr>
            <td><code>ArrowDown</code></td>
            <td>Moves focus to the next option</td>
          </tr>
          <tr>
            <td><code>ArrowUp</code></td>
            <td>Moves focus to the previous option</td>
          </tr>
          <tr>
            <td><code>Escape</code></td>
            <td>Closes the dropdown</td>
          </tr>
          <tr>
            <td>Type-ahead</td>
            <td>Typing a letter jumps to the first matching option</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Select implements the WAI-ARIA listbox pattern. The trigger receives{' '}
        <code>role=&quot;combobox&quot;</code> and the content receives{' '}
        <code>role=&quot;listbox&quot;</code> automatically. Always pair with a Label.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/radio-group">Radio Group</a> — Better for 2-4 visible options</li>
        <li><a href="/design/components/popover">Popover</a> — For more complex selection UI with search</li>
        <li><a href="/design/components/label">Label</a> — Required companion for accessible form fields</li>
      </ul>
    </>
  );
}
