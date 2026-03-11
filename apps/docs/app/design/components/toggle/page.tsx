import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Toggle - Components - Design System',
  description:
    'Presses on or off for a single option, typically used in toolbars.',
};

export default function TogglePage() {
  return (
    <>
      <h1>Toggle</h1>
      <p>
        Presses on or off for a single option, like bold or italic in a text editor toolbar.
        Built on Radix Toggle, the pressed state uses <code>bg-surface-300</code> to indicate
        activation.
      </p>

      <h2>Installation</h2>

      <CodeBlock code={`import { Toggle } from '@repo/ui/components/toggle'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Basic</h3>

      <CodeBlock code={`import { Toggle } from '@repo/ui/components/toggle'
import { Bold } from 'lucide-react'

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`} lang="tsx" />

      <h3>With text</h3>

      <CodeBlock code={`import { Italic } from 'lucide-react'

<Toggle aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
  Italic
</Toggle>`} lang="tsx" />

      <h3>Outline variant</h3>

      <CodeBlock code={`<Toggle variant="outline" aria-label="Toggle underline">
  <Underline className="h-4 w-4" />
</Toggle>`} lang="tsx" />

      <h3>Toolbar group</h3>
      <p>Combine multiple toggles for a formatting toolbar.</p>

      <CodeBlock code={`import { Bold, Italic, Underline } from 'lucide-react'

<div className="flex items-center gap-1 rounded-md border border-border p-1">
  <Toggle size="sm" aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </Toggle>
  <Toggle size="sm" aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </Toggle>
  <Toggle size="sm" aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </Toggle>
</div>`} lang="tsx" />

      <h3>Controlled</h3>

      <CodeBlock code={`const [pressed, setPressed] = useState(false)

<Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use Toggle for binary formatting options and toolbar actions where the pressed
            state is visually obvious.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use Toggle for settings that persist across sessions. Use a Switch instead — its
            on/off metaphor is clearer for preferences.
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
            <td><code>variant</code></td>
            <td><code>{`"default" | "outline"`}</code></td>
            <td><code>{`"default"`}</code></td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>{`"default" | "sm" | "lg"`}</code></td>
            <td><code>{`"default"`}</code></td>
          </tr>
          <tr>
            <td><code>pressed</code></td>
            <td><code>boolean</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>defaultPressed</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>onPressedChange</code></td>
            <td><code>(pressed: boolean) =&gt; void</code></td>
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
            <td><code>Enter</code></td>
            <td>Toggles the pressed state</td>
          </tr>
          <tr>
            <td><code>Space</code></td>
            <td>Toggles the pressed state</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Toggle renders with <code>aria-pressed</code> that toggles between{' '}
        <code>true</code> and <code>false</code>. Always provide an <code>aria-label</code>{' '}
        that describes the action, especially for icon-only toggles — e.g.,{' '}
        <code>aria-label=&quot;Toggle bold&quot;</code>.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/switch">Switch</a> — Better for persistent settings and preferences</li>
        <li><a href="/design/components/button">Button</a> — For one-time actions that do not have a pressed state</li>
        <li><a href="/design/components/checkbox">Checkbox</a> — For boolean values in form contexts</li>
      </ul>
    </>
  );
}
