import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoCard } from '../_demos';

export const metadata = {
  title: 'Card - Components - Design System',
  description:
    'Groups related content in a bordered surface container with optional header, body, and footer slots.',
};

export default function CardPage() {
  return (
    <>
      <h1>Card</h1>
      <p>
        Groups related content in a bordered surface container. Uses{' '}
        <code>bg-surface-100</code> (<code>--surface-100</code>) with{' '}
        <code>border-border</code> and <code>rounded-lg</code> (8 px). Compose with{' '}
        CardHeader, CardContent, and CardFooter sub-components.
      </p>

      <ComponentPreview>
        <DemoCard />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@repo/ui/components/card'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Full card</h3>
      <p>A card with header, content, and footer — the most common layout for settings panels and forms.</p>

      <ComponentPreview>
        <DemoCard />
      </ComponentPreview>

      <CodeBlock code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </CardFooter>
</Card>`} lang="tsx" />

      <h3>Content only</h3>
      <p>A minimal card with no header or footer — useful for dashboard widgets or metric displays.</p>

      <CodeBlock code={`<Card>
  <CardContent className="pt-6">
    <p className="text-2xl font-bold">2,847</p>
    <p className="text-foreground-muted text-xs">Active users this month</p>
  </CardContent>
</Card>`} lang="tsx" />

      <h3>With form</h3>
      <p>Wrap a form inside CardContent with actions in CardFooter.</p>

      <CodeBlock code={`<Card>
  <CardHeader>
    <CardTitle>Profile</CardTitle>
    <CardDescription>Update your display name and email.</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="name">Name</Label>
      <Input id="name" defaultValue="Eric S" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" defaultValue="eric@celune.app" />
    </div>
  </CardContent>
  <CardFooter className="flex justify-end">
    <Button>Save changes</Button>
  </CardFooter>
</Card>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use cards to group a single concept — one settings section, one metric, one form.
            Keep the content focused.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Nest cards inside cards. If you need sub-grouping, use headings or dividers within
            a single card.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use CardFooter for action buttons. Place the primary action on the right.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Overload a card with too many actions. If you have more than two footer buttons,
            reconsider the layout.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Element</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Card</code></td>
            <td><code>div</code></td>
            <td>Outer container with border and surface background</td>
          </tr>
          <tr>
            <td><code>CardHeader</code></td>
            <td><code>div</code></td>
            <td>Top section with padding and bottom border</td>
          </tr>
          <tr>
            <td><code>CardTitle</code></td>
            <td><code>h3</code></td>
            <td>Heading inside CardHeader</td>
          </tr>
          <tr>
            <td><code>CardDescription</code></td>
            <td><code>p</code></td>
            <td>Muted description text inside CardHeader</td>
          </tr>
          <tr>
            <td><code>CardContent</code></td>
            <td><code>div</code></td>
            <td>Main body area with padding</td>
          </tr>
          <tr>
            <td><code>CardFooter</code></td>
            <td><code>div</code></td>
            <td>Bottom section with top border, typically for actions</td>
          </tr>
        </tbody>
      </table>

      <p>All sub-components accept a <code>className</code> prop for layout overrides.</p>

      <h2>Accessibility</h2>

      <p>
        Card is a purely presentational container with no interactive role. If the entire card
        is clickable (e.g., a link card), wrap it in an <code>&lt;a&gt;</code> or use a{' '}
        <code>button</code> element and provide an accessible name. For cards in a grid, ensure
        adequate color contrast between <code>bg-surface-100</code> and <code>bg-background</code>.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/alert">Alert</a> — For brief contextual messages rather than content grouping</li>
        <li><a href="/design/components/dialog">Dialog</a> — For modal content that requires user action</li>
        <li><a href="/design/components/table">Table</a> — For tabular data that does not need card grouping</li>
      </ul>
    </>
  );
}
