import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoTabs } from '../_demos';

export const metadata = {
  title: 'Tabs - Components - Design System',
  description:
    'Switches between content panels with a pill-style active indicator.',
};

export default function TabsPage() {
  return (
    <>
      <h1>Tabs</h1>
      <p>
        Switches between content panels without navigating to a new page. Built on Radix Tabs
        with a pill-style active indicator using <code>bg-background</code> on the active trigger
        over a <code>bg-surface-200</code> track.
      </p>

      <ComponentPreview>
        <DemoTabs />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@repo/ui/components/tabs'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Basic</h3>

      <ComponentPreview>
        <DemoTabs />
      </ComponentPreview>

      <CodeBlock code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
  <TabsContent value="activity">Activity content</TabsContent>
</Tabs>`} lang="tsx" />

      <h3>Controlled</h3>

      <CodeBlock code={`const [tab, setTab] = useState('overview')

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="settings">...</TabsContent>
</Tabs>`} lang="tsx" />

      <h3>With cards</h3>
      <p>Place tab content inside cards for a polished settings panel layout.</p>

      <CodeBlock code={`<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="general">
    <Card>
      <CardHeader>
        <CardTitle>General settings</CardTitle>
        <CardDescription>Manage your workspace preferences.</CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
    </Card>
  </TabsContent>
</Tabs>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use tabs to organize related content into 2-6 panels. Keep tab labels short — one
            or two words.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use tabs as navigation between unrelated pages. Use proper routing with links
            instead.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Default to the most commonly used tab so users see useful content immediately.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use more than 6 tabs. If you need more sections, consider a sidebar navigation or
            accordion layout.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Key props</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Tabs</code></td>
            <td><code>defaultValue</code>, <code>value</code>, <code>onValueChange</code></td>
            <td>Root container</td>
          </tr>
          <tr>
            <td><code>TabsList</code></td>
            <td><code>className</code></td>
            <td>Pill-track container for triggers</td>
          </tr>
          <tr>
            <td><code>TabsTrigger</code></td>
            <td><code>value</code> (required), <code>disabled</code></td>
            <td>Clickable tab label</td>
          </tr>
          <tr>
            <td><code>TabsContent</code></td>
            <td><code>value</code> (required)</td>
            <td>Panel shown when the matching trigger is active</td>
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
            <td><code>ArrowRight</code></td>
            <td>Moves focus to the next tab trigger</td>
          </tr>
          <tr>
            <td><code>ArrowLeft</code></td>
            <td>Moves focus to the previous tab trigger</td>
          </tr>
          <tr>
            <td><code>Home</code></td>
            <td>Moves focus to the first tab trigger</td>
          </tr>
          <tr>
            <td><code>End</code></td>
            <td>Moves focus to the last tab trigger</td>
          </tr>
          <tr>
            <td><code>Tab</code></td>
            <td>Moves focus into the active tab content panel</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Tabs implements the WAI-ARIA tabs pattern: the trigger list has{' '}
        <code>role=&quot;tablist&quot;</code>, each trigger has <code>role=&quot;tab&quot;</code>,
        and each panel has <code>role=&quot;tabpanel&quot;</code> with automatic{' '}
        <code>aria-labelledby</code> linking. Inactive panels are hidden from the accessibility
        tree.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/accordion">Accordion</a> — For vertically stacked expand/collapse sections</li>
        <li><a href="/design/components/card">Card</a> — Common container for tab content panels</li>
      </ul>
    </>
  );
}
