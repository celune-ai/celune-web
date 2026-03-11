import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoProgress } from '../_demos';

export const metadata = {
  title: 'Progress - Components - Design System',
  description:
    'Shows completion percentage of a task with a brand-green fill bar.',
};

export default function ProgressPage() {
  return (
    <>
      <h1>Progress</h1>
      <p>
        Shows the completion percentage of a task. Built on Radix Progress with a{' '}
        <code>bg-brand</code> fill bar over a <code>bg-surface-300</code> track. Pass a{' '}
        <code>value</code> from 0 to 100.
      </p>

      <ComponentPreview className="flex-col gap-4">
        <DemoProgress value={25} />
        <DemoProgress value={65} />
        <DemoProgress value={100} />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Progress } from '@repo/ui/components/progress'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Static values</h3>

      <ComponentPreview className="flex-col gap-4">
        <DemoProgress value={25} />
        <DemoProgress value={65} />
        <DemoProgress value={100} />
      </ComponentPreview>

      <CodeBlock code={`<Progress value={25} />
<Progress value={65} />
<Progress value={100} />`} lang="tsx" />

      <h3>With label</h3>

      <CodeBlock code={`<div className="flex flex-col gap-1.5">
  <div className="flex justify-between text-sm">
    <span className="text-foreground-light">Upload progress</span>
    <span className="text-foreground-muted">65%</span>
  </div>
  <Progress value={65} />
</div>`} lang="tsx" />

      <h3>Animated</h3>
      <p>The fill bar transitions smoothly when the value changes via the built-in CSS transition.</p>

      <CodeBlock code={`const [progress, setProgress] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => Math.min(prev + 10, 100))
  }, 500)
  return () => clearInterval(timer)
}, [])

<Progress value={progress} />`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use Progress when you know the completion percentage — file uploads, multi-step
            forms, quota usage.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use Progress for indeterminate loading. Use a Skeleton or spinner when you do not
            know how long the operation will take.
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
            <td><code>value</code></td>
            <td><code>number</code> (0-100)</td>
            <td><code>0</code></td>
          </tr>
          <tr>
            <td><code>max</code></td>
            <td><code>number</code></td>
            <td><code>100</code></td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>

      <p>
        Radix Progress renders with <code>role=&quot;progressbar&quot;</code> and automatically
        sets <code>aria-valuenow</code>, <code>aria-valuemin</code> (0), and{' '}
        <code>aria-valuemax</code> (100). Add an <code>aria-label</code> to describe what the
        progress represents:
      </p>

      <CodeBlock code={`<Progress value={65} aria-label="Upload progress" />`} lang="tsx" />

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/skeleton">Skeleton</a> — For indeterminate loading when layout is known</li>
        <li><a href="/design/components/badge">Badge</a> — To display a status label alongside the progress bar</li>
      </ul>
    </>
  );
}
