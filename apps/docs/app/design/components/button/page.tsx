import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoButton, Mail, Pencil, MoreVertical } from '../_demos';

export const metadata = {
  title: 'Button - Components - Design System',
  description:
    'Triggers an action or event. Variants map to semantic intent so users can predict the outcome of a click.',
};

export default function ButtonPage() {
  return (
    <>
      <h1>Button</h1>
      <p>
        Triggers an action or event. Each variant communicates a different level of emphasis or
        intent, helping users predict the outcome of a click.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoButton>Primary</DemoButton>
          <DemoButton variant="secondary">Secondary</DemoButton>
          <DemoButton variant="outline">Outline</DemoButton>
          <DemoButton variant="ghost">Ghost</DemoButton>
          <DemoButton variant="destructive">Destructive</DemoButton>
          <DemoButton variant="warning">Warning</DemoButton>
          <DemoButton variant="link">Link</DemoButton>
        </div>
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Button } from '@repo/ui/components/button'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Variants</h3>
      <p>
        Seven variants cover the full range of emphasis. <strong>Default</strong> is the primary
        call-to-action using <code>bg-brand</code>. <strong>Secondary</strong> and{' '}
        <strong>outline</strong> are medium-emphasis alternatives. <strong>Ghost</strong> is for
        toolbar-style actions. <strong>Destructive</strong> and <strong>warning</strong> signal
        consequences. <strong>Link</strong> renders as inline text.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoButton>Primary</DemoButton>
          <DemoButton variant="secondary">Secondary</DemoButton>
          <DemoButton variant="outline">Outline</DemoButton>
          <DemoButton variant="ghost">Ghost</DemoButton>
          <DemoButton variant="destructive">Destructive</DemoButton>
          <DemoButton variant="warning">Warning</DemoButton>
          <DemoButton variant="link">Link</DemoButton>
        </div>
      </ComponentPreview>

      <CodeBlock code={`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="warning">Warning</Button>
<Button variant="link">Link</Button>`} lang="tsx" />

      <h3>Sizes</h3>
      <p>
        Three text sizes — <strong>sm</strong> (28 px), <strong>md</strong> (32 px, default), and{' '}
        <strong>lg</strong> (40 px) — plus two icon-only sizes for toolbars and inline actions.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoButton size="sm">Small</DemoButton>
          <DemoButton>Medium</DemoButton>
          <DemoButton size="lg">Large</DemoButton>
          <DemoButton size="icon"><Mail size={16} /></DemoButton>
          <DemoButton variant="outline" size="icon-sm"><Pencil size={14} /></DemoButton>
          <DemoButton variant="ghost" size="icon"><MoreVertical size={16} /></DemoButton>
        </div>
      </ComponentPreview>

      <CodeBlock code={`<Button size="sm">Small</Button>
<Button>Medium</Button>              {/* md is default */}
<Button size="lg">Large</Button>
<Button size="icon"><Mail /></Button>
<Button variant="outline" size="icon-sm"><Pencil /></Button>
<Button variant="ghost" size="icon"><MoreVertical /></Button>`} lang="tsx" />

      <h3>With icon</h3>
      <p>
        Place an icon before or after the label. The built-in <code>gap-2</code> handles spacing.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoButton><Mail size={16} /> Send email</DemoButton>
          <DemoButton variant="outline"><Pencil size={14} /> Edit</DemoButton>
        </div>
      </ComponentPreview>

      <CodeBlock code={`<Button><Mail className="h-4 w-4" /> Send email</Button>
<Button variant="outline"><Pencil className="h-3.5 w-3.5" /> Edit</Button>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use one primary button per section. Pair it with outline or ghost buttons for secondary actions.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Place multiple primary buttons side by side. It dilutes the visual hierarchy and confuses
            the intended action.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Reserve <code>destructive</code> for irreversible actions like deleting data. Use{' '}
            <code>warning</code> for actions with recoverable side effects.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use <code>destructive</code> for actions like &quot;Remove filter&quot; or &quot;Clear
            search&quot; that are easily undone. Ghost or outline is more appropriate.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use <code>ghost</code> for toolbar actions, row actions in tables, and icon-only buttons
            that sit alongside content.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use <code>ghost</code> as the only button in a prominent CTA area. It lacks the visual
            weight to draw attention.
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
            <td><code>{`"default" | "secondary" | "outline" | "ghost" | "destructive" | "warning" | "link"`}</code></td>
            <td><code>{`"default"`}</code></td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>{`"sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-md"`}</code></td>
            <td><code>{`"default"`}</code></td>
          </tr>
          <tr>
            <td><code>asChild</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
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
            <td>Activates the button</td>
          </tr>
          <tr>
            <td><code>Space</code></td>
            <td>Activates the button</td>
          </tr>
          <tr>
            <td><code>Tab</code></td>
            <td>Moves focus to the next focusable element</td>
          </tr>
        </tbody>
      </table>

      <p>
        Use the native <code>&lt;button&gt;</code> element (the default). When rendering as a link
        with <code>asChild</code>, ensure the child is an <code>&lt;a&gt;</code> so screen readers
        announce it correctly. Always provide visible text or an <code>aria-label</code> for
        icon-only buttons.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/dialog">Dialog</a> — Pair destructive buttons with a confirmation dialog</li>
        <li><a href="/design/components/tooltip">Tooltip</a> — Add a tooltip to icon-only buttons for clarity</li>
        <li><a href="/design/components/toggle">Toggle</a> — For binary on/off actions instead of a button</li>
      </ul>
    </>
  );
}
