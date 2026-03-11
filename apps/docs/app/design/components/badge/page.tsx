import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoBadge } from '../_demos';

export const metadata = {
  title: 'Badge - Components - Design System',
  description:
    'Displays a status indicator, count, or classification tag as a compact pill.',
};

export default function BadgePage() {
  return (
    <>
      <h1>Badge</h1>
      <p>
        Displays a status indicator, count, or classification tag. Renders as an inline pill that
        can sit alongside text, inside table cells, or on card headers.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoBadge>Default</DemoBadge>
          <DemoBadge variant="secondary">Secondary</DemoBadge>
          <DemoBadge variant="outline">Outline</DemoBadge>
          <DemoBadge variant="brand">Brand</DemoBadge>
          <DemoBadge variant="success">Success</DemoBadge>
          <DemoBadge variant="warning">Warning</DemoBadge>
          <DemoBadge variant="destructive">Destructive</DemoBadge>
          <DemoBadge variant="ghost">Ghost</DemoBadge>
        </div>
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Badge } from '@repo/ui/components/badge'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Semantic variants</h3>
      <p>
        Use <strong>success</strong> for healthy / active states, <strong>warning</strong> for
        attention-needed states, and <strong>destructive</strong> for errors or critical statuses.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoBadge variant="success">Active</DemoBadge>
          <DemoBadge variant="warning">Pending</DemoBadge>
          <DemoBadge variant="destructive">Failed</DemoBadge>
        </div>
      </ComponentPreview>

      <CodeBlock code={`<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Failed</Badge>`} lang="tsx" />

      <h3>Neutral variants</h3>
      <p>
        <strong>Secondary</strong>, <strong>outline</strong>, and <strong>ghost</strong> work well
        for metadata tags, categories, or counts where semantic color is unnecessary.
      </p>

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <DemoBadge variant="secondary">v2.1.0</DemoBadge>
          <DemoBadge variant="outline">12 tasks</DemoBadge>
          <DemoBadge variant="ghost">Draft</DemoBadge>
        </div>
      </ComponentPreview>

      <CodeBlock code={`<Badge variant="secondary">v2.1.0</Badge>
<Badge variant="outline">12 tasks</Badge>
<Badge variant="ghost">Draft</Badge>`} lang="tsx" />

      <h3>Brand variant</h3>
      <p>
        The <strong>brand</strong> variant uses the emerald token scale
        (<code>bg-brand-200</code> / <code>text-brand-600</code>) for feature tags or
        promotional labels.
      </p>

      <ComponentPreview>
        <DemoBadge variant="brand">New feature</DemoBadge>
      </ComponentPreview>

      <CodeBlock code={`<Badge variant="brand">New feature</Badge>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use semantic variants consistently across the app. If &quot;Active&quot; is{' '}
            <code>success</code> on one page, keep it <code>success</code> everywhere.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Mix semantic meanings. Avoid using <code>destructive</code> for a category label just
            because you want a red badge.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Keep badge text short — one or two words. Badges are scanning aids, not sentences.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Put long descriptions inside a badge. If you need more context, use an Alert or
            Tooltip instead.
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
            <td><code>{`"default" | "secondary" | "outline" | "brand" | "success" | "warning" | "destructive" | "ghost"`}</code></td>
            <td><code>{`"default"`}</code></td>
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
        Badge renders as a <code>&lt;div&gt;</code> with no interactive role. For dynamic status
        badges that update in real time, add <code>aria-live=&quot;polite&quot;</code> to the
        container so screen readers announce changes. If a badge conveys critical information, pair
        it with visible text — do not rely on color alone to communicate meaning.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/alert">Alert</a> — For longer contextual messages that need more space than a badge</li>
        <li><a href="/design/components/tooltip">Tooltip</a> — Add a tooltip to a badge when the abbreviated text needs explanation</li>
        <li><a href="/design/components/button">Button</a> — Use a button, not a badge, when the element is interactive</li>
      </ul>
    </>
  );
}
