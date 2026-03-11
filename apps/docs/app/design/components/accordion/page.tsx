import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Accordion - Components - Design System',
  description:
    'Expands and collapses content sections with animated transitions.',
};

export default function AccordionPage() {
  return (
    <>
      <h1>Accordion</h1>
      <p>
        Expands and collapses content sections vertically. Built on Radix Accordion with
        smooth CSS transitions. Supports both single-item and multi-item expansion modes.
      </p>

      <h2>Installation</h2>

      <CodeBlock code={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@repo/ui/components/accordion'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Single (collapsible)</h3>
      <p>Only one section open at a time. Set <code>collapsible</code> to allow closing all sections.</p>

      <CodeBlock code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It uses design tokens from theme.css for consistent styling.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Can I animate it?</AccordionTrigger>
    <AccordionContent>
      Yes. The expand/collapse is animated with CSS transitions.
    </AccordionContent>
  </AccordionItem>
</Accordion>`} lang="tsx" />

      <h3>Multiple</h3>
      <p>Allow multiple sections to be open simultaneously.</p>

      <CodeBlock code={`<Accordion type="multiple" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>General</AccordionTrigger>
    <AccordionContent>General settings content.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Advanced</AccordionTrigger>
    <AccordionContent>Advanced settings content.</AccordionContent>
  </AccordionItem>
</Accordion>`} lang="tsx" />

      <h3>Controlled</h3>

      <CodeBlock code={`const [value, setValue] = useState<string | undefined>('item-1')

<Accordion type="single" collapsible value={value} onValueChange={setValue}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section One</AccordionTrigger>
    <AccordionContent>Content for section one.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section Two</AccordionTrigger>
    <AccordionContent>Content for section two.</AccordionContent>
  </AccordionItem>
</Accordion>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use accordions for FAQ sections, settings pages, and long forms where users do not
            need to see all sections at once.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use accordions to hide essential content that users need to complete a task. If
            content is required, show it directly.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Default the most relevant section to open so users see useful content on load.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use an accordion for only two sections. Consider showing both or using Tabs for
            side-by-side comparison.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <h3>Accordion (root)</h3>
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
            <td><code>type</code></td>
            <td><code>{`"single" | "multiple"`}</code> (required)</td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>collapsible</code></td>
            <td><code>boolean</code> (only when type is &quot;single&quot;)</td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>defaultValue</code></td>
            <td><code>string | string[]</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>value</code></td>
            <td><code>string | string[]</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>onValueChange</code></td>
            <td><code>(value: string | string[]) =&gt; void</code></td>
            <td>--</td>
          </tr>
        </tbody>
      </table>

      <h3>AccordionItem</h3>
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
            <td>Toggles the focused accordion section</td>
          </tr>
          <tr>
            <td><code>ArrowDown</code></td>
            <td>Moves focus to the next trigger</td>
          </tr>
          <tr>
            <td><code>ArrowUp</code></td>
            <td>Moves focus to the previous trigger</td>
          </tr>
          <tr>
            <td><code>Home</code></td>
            <td>Moves focus to the first trigger</td>
          </tr>
          <tr>
            <td><code>End</code></td>
            <td>Moves focus to the last trigger</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Accordion follows the WAI-ARIA accordion pattern: triggers have{' '}
        <code>role=&quot;button&quot;</code> with <code>aria-expanded</code>, and content
        regions have <code>role=&quot;region&quot;</code> linked via{' '}
        <code>aria-labelledby</code>.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/tabs">Tabs</a> — For horizontally organized content switching</li>
        <li><a href="/design/components/card">Card</a> — For grouping content that is always visible</li>
      </ul>
    </>
  );
}
