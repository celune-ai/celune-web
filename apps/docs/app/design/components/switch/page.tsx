import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoSwitch } from '../_demos';

export const metadata = {
  title: 'Switch - Components - Design System',
  description:
    'Toggles a setting between two states with immediate visual feedback.',
};

export default function SwitchPage() {
  return (
    <>
      <h1>Switch</h1>
      <p>
        Toggles a setting between two states. Built on Radix Switch, the &quot;on&quot; state
        uses <code>bg-brand</code> (<code>--brand</code>) and the &quot;off&quot; state uses{' '}
        <code>bg-surface-400</code>. The thumb slides with a CSS transition.
      </p>

      <ComponentPreview>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <DemoSwitch on />
            <span className="text-foreground text-sm">Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <DemoSwitch />
            <span className="text-foreground text-sm">Disabled</span>
          </div>
        </div>
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Switch } from '@repo/ui/components/switch'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>With label</h3>

      <ComponentPreview>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <DemoSwitch on />
            <span className="text-foreground text-sm">Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <DemoSwitch />
            <span className="text-foreground text-sm">Disabled</span>
          </div>
        </div>
      </ComponentPreview>

      <CodeBlock code={`import { Switch } from '@repo/ui/components/switch'
import { Label } from '@repo/ui/components/label'

<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`} lang="tsx" />

      <h3>Controlled</h3>

      <CodeBlock code={`const [enabled, setEnabled] = useState(false)

<Switch checked={enabled} onCheckedChange={setEnabled} />`} lang="tsx" />

      <h3>In a settings row</h3>
      <p>A common SaaS pattern: label on the left, switch on the right, with helper text below.</p>

      <CodeBlock code={`<div className="flex items-center justify-between">
  <div>
    <Label htmlFor="analytics">Analytics</Label>
    <p className="text-foreground-muted text-xs">
      Collect anonymous usage data to improve the product.
    </p>
  </div>
  <Switch id="analytics" />
</div>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use a Switch for settings that take effect immediately — notifications, feature
            flags, preferences.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use a Switch when the change requires a &quot;Save&quot; button to apply. Use a
            Checkbox in form contexts instead.
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
            <td><code>boolean</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>defaultChecked</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>onCheckedChange</code></td>
            <td><code>(checked: boolean) =&gt; void</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
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
            <td>Toggles the switch</td>
          </tr>
          <tr>
            <td><code>Enter</code></td>
            <td>Toggles the switch</td>
          </tr>
          <tr>
            <td><code>Tab</code></td>
            <td>Moves focus to the next focusable element</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Switch renders with <code>role=&quot;switch&quot;</code> and manages{' '}
        <code>aria-checked</code> automatically. Always provide a visible label or{' '}
        <code>aria-label</code>.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/checkbox">Checkbox</a> — Better for form fields saved with a submit action</li>
        <li><a href="/design/components/toggle">Toggle</a> — For icon-based on/off in toolbars</li>
        <li><a href="/design/components/label">Label</a> — Required companion for accessible form fields</li>
      </ul>
    </>
  );
}
