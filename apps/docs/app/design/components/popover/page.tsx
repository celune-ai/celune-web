import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Popover - Components - Design System',
  description:
    'Floats supplementary interactive content near a trigger element.',
};

export default function PopoverPage() {
  return (
    <>
      <h1>Popover</h1>
      <p>
        Floats supplementary interactive content near a trigger element. Built on Radix Popover
        with <code>bg-surface-100</code> background, <code>border-border</code>, and a drop
        shadow. Unlike Tooltip, Popover content can contain interactive elements like links,
        buttons, and form controls.
      </p>

      <h2>Installation</h2>

      <CodeBlock code={`import { Popover, PopoverTrigger, PopoverContent } from '@repo/ui/components/popover'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Basic</h3>

      <CodeBlock code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="flex flex-col gap-2">
      <h4 className="font-medium">Popover Title</h4>
      <p className="text-sm text-foreground-light">
        Popover content goes here. This can include any interactive elements.
      </p>
    </div>
  </PopoverContent>
</Popover>`} lang="tsx" />

      <h3>With form</h3>
      <p>Use a popover for quick inline forms — changing a value without opening a full dialog.</p>

      <CodeBlock code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" size="sm">Set due date</Button>
  </PopoverTrigger>
  <PopoverContent className="w-72">
    <div className="flex flex-col gap-3">
      <Label htmlFor="due-date">Due date</Label>
      <Input id="due-date" type="date" />
      <Button size="sm">Save</Button>
    </div>
  </PopoverContent>
</Popover>`} lang="tsx" />

      <h3>With positioning</h3>

      <CodeBlock code={`<PopoverContent side="right" align="start" sideOffset={8}>
  Content aligned to the right side, start position.
</PopoverContent>`} lang="tsx" />

      <h3>Controlled</h3>

      <CodeBlock code={`const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline">Filter</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Filter options here</p>
    <Button size="sm" onClick={() => setOpen(false)}>Apply</Button>
  </PopoverContent>
</Popover>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use Popover for contextual actions, quick edits, and filter panels that relate to a
            specific trigger element.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use Popover for destructive confirmations. Use a Dialog instead — it demands full
            attention and prevents accidental clicks.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Keep popover content focused and concise. One form, one action, one piece of info.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use Popover for simple text hints. Use a Tooltip instead — it is lighter and does
            not require a click.
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
            <td><code>Popover</code></td>
            <td><code>open</code>, <code>onOpenChange</code></td>
            <td>Root — controls open state</td>
          </tr>
          <tr>
            <td><code>PopoverTrigger</code></td>
            <td><code>asChild</code></td>
            <td>Element that toggles the popover</td>
          </tr>
          <tr>
            <td><code>PopoverContent</code></td>
            <td><code>side</code>, <code>align</code>, <code>sideOffset</code></td>
            <td>Floating content panel</td>
          </tr>
        </tbody>
      </table>

      <h3>PopoverContent props</h3>
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
            <td><code>{`"bottom"`}</code></td>
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
            <td><code>Enter</code> / <code>Space</code></td>
            <td>Opens or closes the popover (on trigger)</td>
          </tr>
          <tr>
            <td><code>Escape</code></td>
            <td>Closes the popover and returns focus to the trigger</td>
          </tr>
          <tr>
            <td><code>Tab</code></td>
            <td>Moves focus through interactive elements inside the popover</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Popover manages focus: when opened, focus moves into the popover content. When
        closed, focus returns to the trigger. The content receives <code>role=&quot;dialog&quot;</code>{' '}
        for screen readers.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/tooltip">Tooltip</a> — For non-interactive text hints on hover</li>
        <li><a href="/design/components/dialog">Dialog</a> — For modal content requiring full attention</li>
        <li><a href="/design/components/select">Select</a> — For option selection in a dropdown</li>
      </ul>
    </>
  );
}
