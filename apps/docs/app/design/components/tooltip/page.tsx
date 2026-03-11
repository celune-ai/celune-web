import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoTooltip } from '../_demos';

export const metadata = {
  title: 'Tooltip - Components - Design System',
  description:
    'Shows brief contextual information on hover or focus with a dark contrasting background.',
};

export default function TooltipPage() {
  return (
    <>
      <h1>Tooltip</h1>
      <p>
        Shows brief contextual information on hover or focus. Uses a dark background
        (<code>bg-surface-400</code>) with white text for high contrast against any surface.
        Built on Radix Tooltip.
      </p>

      <ComponentPreview>
        <DemoTooltip />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@repo/ui/components/tooltip'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Basic</h3>
      <p>Wrap your app (or a subtree) in a <code>TooltipProvider</code>, then add tooltips to individual elements.</p>

      <ComponentPreview>
        <DemoTooltip />
      </ComponentPreview>

      <CodeBlock code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon-sm">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Edit task</TooltipContent>
  </Tooltip>
</TooltipProvider>`} lang="tsx" />

      <h3>With side and alignment</h3>

      <CodeBlock code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon-sm">
      <Info className="h-3.5 w-3.5" />
    </Button>
  </TooltipTrigger>
  <TooltipContent side="right" align="start">
    This field is required for billing.
  </TooltipContent>
</Tooltip>`} lang="tsx" />

      <h3>With delay</h3>
      <p>
        Control the open delay via <code>TooltipProvider</code> to prevent tooltips from
        appearing too eagerly during normal mouse movement.
      </p>

      <CodeBlock code={`<TooltipProvider delayDuration={300}>
  {/* All Tooltips inside will wait 300ms before opening */}
</TooltipProvider>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use tooltips for icon-only buttons and truncated text to provide essential context
            that is not otherwise visible.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Hide critical information in tooltips. If the user needs the information to
            complete a task, show it inline.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Keep tooltip text to one short sentence or a few words. Tooltips should be
            scannable at a glance.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Put interactive content (links, buttons) inside a tooltip. Use a Popover for
            interactive overlays.
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
            <td><code>TooltipProvider</code></td>
            <td><code>delayDuration</code>, <code>skipDelayDuration</code></td>
            <td>Wrap app or subtree once</td>
          </tr>
          <tr>
            <td><code>Tooltip</code></td>
            <td><code>open</code>, <code>onOpenChange</code></td>
            <td>Root for a single tooltip instance</td>
          </tr>
          <tr>
            <td><code>TooltipTrigger</code></td>
            <td><code>asChild</code></td>
            <td>Element that activates the tooltip</td>
          </tr>
          <tr>
            <td><code>TooltipContent</code></td>
            <td><code>side</code>, <code>align</code>, <code>sideOffset</code></td>
            <td>Floating content panel</td>
          </tr>
        </tbody>
      </table>

      <h3>TooltipContent props</h3>
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
            <td><code>side</code></td>
            <td><code>{`"top" | "right" | "bottom" | "left"`}</code></td>
            <td><code>{`"top"`}</code></td>
          </tr>
          <tr>
            <td><code>align</code></td>
            <td><code>{`"start" | "center" | "end"`}</code></td>
            <td><code>{`"center"`}</code></td>
          </tr>
          <tr>
            <td><code>sideOffset</code></td>
            <td><code>number</code></td>
            <td><code>4</code></td>
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
            <td><code>Tab</code></td>
            <td>Focuses the trigger and opens the tooltip</td>
          </tr>
          <tr>
            <td><code>Escape</code></td>
            <td>Closes the tooltip</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Tooltip adds <code>role=&quot;tooltip&quot;</code> to the content and links it
        to the trigger via <code>aria-describedby</code>. The tooltip opens on both hover and
        focus, ensuring keyboard and screen reader users can access the information.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/popover">Popover</a> — For interactive floating content that can contain links and buttons</li>
        <li><a href="/design/components/button">Button</a> — Always add a tooltip to icon-only buttons</li>
      </ul>
    </>
  );
}
