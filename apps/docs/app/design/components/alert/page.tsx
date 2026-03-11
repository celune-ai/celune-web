import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoAlert } from '../_demos';

export const metadata = {
  title: 'Alert - Components - Design System',
  description: 'Callout boxes with semantic color variants.',
};

export default function AlertPage() {
  return (
    <>
      <h1>Alert</h1>
      <p>Callout boxes with semantic color variants.</p>

      <ComponentPreview className="flex-col gap-3">
        <DemoAlert variant="info" title="Info" description="This is an informational message." />
        <DemoAlert variant="success" title="Success" description="Operation completed successfully." />
        <DemoAlert variant="warning" title="Warning" description="This action has side effects." />
        <DemoAlert variant="destructive" title="Error" description="Something went wrong." />
      </ComponentPreview>

      <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from '@repo/ui/components/alert'
import { AlertCircle } from 'lucide-react'

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from '@repo/ui/components/alert'`} lang="tsx" />

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Values</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>variant</code></td><td><code>default</code> | <code>info</code> | <code>success</code> | <code>warning</code> | <code>destructive</code></td><td><code>default</code></td></tr>
        </tbody>
      </table>
    </>
  );
}
