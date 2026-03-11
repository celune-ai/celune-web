import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoAlert } from '../_demos';

export const metadata = {
  title: 'Alert - Components - Design System',
  description:
    'Communicates contextual feedback with semantic color variants and icons.',
};

export default function AlertPage() {
  return (
    <>
      <h1>Alert</h1>
      <p>
        Communicates contextual feedback to the user. Each variant pairs a semantic background
        color with an icon to convey the message type at a glance — informational, success,
        warning, or error.
      </p>

      <ComponentPreview className="flex-col gap-3">
        <DemoAlert variant="info" title="Info" description="This is an informational message." />
        <DemoAlert variant="success" title="Success" description="Operation completed successfully." />
        <DemoAlert variant="warning" title="Warning" description="This action has side effects." />
        <DemoAlert variant="destructive" title="Error" description="Something went wrong." />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from '@repo/ui/components/alert'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Info</h3>
      <p>
        Uses <code>bg-brand-200/20</code> with <code>border-brand-200</code>. Ideal for
        tips, onboarding hints, and non-critical notices.
      </p>

      <ComponentPreview>
        <DemoAlert variant="info" title="Tip" description="You can press Ctrl+K to open the command palette." />
      </ComponentPreview>

      <CodeBlock code={`import { Info } from 'lucide-react'

<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Tip</AlertTitle>
  <AlertDescription>
    You can press Ctrl+K to open the command palette.
  </AlertDescription>
</Alert>`} lang="tsx" />

      <h3>Success</h3>
      <p>
        Confirms a completed action. Uses the brand-green scale.
      </p>

      <ComponentPreview>
        <DemoAlert variant="success" title="Saved" description="Your changes have been saved successfully." />
      </ComponentPreview>

      <CodeBlock code={`import { CheckCircle } from 'lucide-react'

<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Saved</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>`} lang="tsx" />

      <h3>Warning</h3>
      <p>
        Uses <code>bg-warning-200/20</code> with <code>border-warning-200</code> (amber scale).
        Draws attention to potential side effects.
      </p>

      <ComponentPreview>
        <DemoAlert variant="warning" title="Warning" description="Changing your email will sign you out of all devices." />
      </ComponentPreview>

      <CodeBlock code={`import { AlertTriangle } from 'lucide-react'

<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Changing your email will sign you out of all devices.
  </AlertDescription>
</Alert>`} lang="tsx" />

      <h3>Destructive</h3>
      <p>
        Uses <code>bg-destructive-200/20</code> with <code>border-destructive-200</code> (red
        scale). Reserved for errors and critical failures.
      </p>

      <ComponentPreview>
        <DemoAlert variant="destructive" title="Error" description="Failed to save. Please try again." />
      </ComponentPreview>

      <CodeBlock code={`import { AlertCircle } from 'lucide-react'

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Failed to save. Please try again.</AlertDescription>
</Alert>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Keep alert text concise — a short title and one sentence of description. Link to
            details if more context is needed.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Stack more than two alerts on a single page. If multiple messages are needed,
            consolidate them or use a toast notification system.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Place alerts near the content they relate to — above a form for validation errors,
            at the top of a settings section for warnings.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use a destructive alert for non-critical issues. Reserve red for actual errors;
            use warning (amber) for things that might go wrong.
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
            <td><code>{`"default" | "info" | "success" | "warning" | "destructive"`}</code></td>
            <td><code>{`"default"`}</code></td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
        </tbody>
      </table>

      <p>
        <code>AlertTitle</code> renders as a paragraph with bold weight.{' '}
        <code>AlertDescription</code> renders as a paragraph with muted foreground color. Both
        accept <code>className</code>.
      </p>

      <h2>Accessibility</h2>

      <p>
        Alert renders with <code>role=&quot;alert&quot;</code> which causes screen readers to
        announce the content immediately when it appears in the DOM. For non-urgent information
        (info, success), consider using <code>role=&quot;status&quot;</code> instead to avoid
        interrupting the user. Pair the icon with the text — do not rely on color alone to
        convey the variant meaning.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/badge">Badge</a> — For inline status indicators that are more compact</li>
        <li><a href="/design/components/dialog">Dialog</a> — For critical messages that require user acknowledgment</li>
        <li><a href="/design/components/card">Card</a> — For grouping content without semantic color</li>
      </ul>
    </>
  );
}
