import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoDialog } from '../_demos';

export const metadata = {
  title: 'Dialog - Components - Design System',
  description:
    'Interrupts the user with a modal overlay requiring action or acknowledgment.',
};

export default function DialogPage() {
  return (
    <>
      <h1>Dialog</h1>
      <p>
        Interrupts the user with a modal overlay that requires action or acknowledgment. Built
        on Radix Dialog with <code>bg-surface-100</code> background, a backdrop overlay, and
        focus-trapped content.
      </p>

      <ComponentPreview>
        <DemoDialog />
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@repo/ui/components/dialog'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Confirmation dialog</h3>
      <p>
        The most common pattern in SaaS apps: confirm a destructive action before it runs. Place
        the destructive button on the right, cancel on the left.
      </p>

      <ComponentPreview>
        <DemoDialog />
      </ComponentPreview>

      <CodeBlock code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete project</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete project?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. All tasks and data will be permanently removed.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} lang="tsx" />

      <h3>Form dialog</h3>
      <p>Use a dialog for short forms like creating a resource or inviting a team member.</p>

      <CodeBlock code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Invite member</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite team member</DialogTitle>
      <DialogDescription>
        Send an invitation to join your workspace.
      </DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="invite-email">Email</Label>
        <Input id="invite-email" type="email" placeholder="colleague@company.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="invite-role">Role</Label>
        <Select>
          <SelectTrigger id="invite-role">
            <SelectValue placeholder="Select a role..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Send invite</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} lang="tsx" />

      <h3>Controlled</h3>

      <CodeBlock code={`const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled dialog</DialogTitle>
    </DialogHeader>
    <p>Open state is managed externally.</p>
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use a dialog for destructive confirmations, short forms (1-3 fields), and actions
            that need full user attention.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use a dialog for content the user might want to reference while interacting with
            the page. Use a Popover or slide-over panel instead.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Always include a DialogTitle and DialogDescription for context. Keep dialog text
            scannable.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Open dialogs from other dialogs. If you need nested workflows, navigate to a
            dedicated page instead.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Make the destructive action button label specific: &quot;Delete project&quot; not
            just &quot;Delete&quot; or &quot;Confirm.&quot;
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use generic button labels like &quot;OK&quot; and &quot;Cancel&quot; for
            destructive dialogs. Users should know exactly what will happen.
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
            <td><code>Dialog</code></td>
            <td><code>open</code>, <code>onOpenChange</code></td>
            <td>Root — controls open state</td>
          </tr>
          <tr>
            <td><code>DialogTrigger</code></td>
            <td><code>asChild</code></td>
            <td>Button that opens the dialog</td>
          </tr>
          <tr>
            <td><code>DialogContent</code></td>
            <td><code>className</code></td>
            <td>Modal panel with focus trap and overlay</td>
          </tr>
          <tr>
            <td><code>DialogHeader</code></td>
            <td><code>className</code></td>
            <td>Container for title and description</td>
          </tr>
          <tr>
            <td><code>DialogTitle</code></td>
            <td><code>className</code></td>
            <td>Required for accessibility (aria-labelledby)</td>
          </tr>
          <tr>
            <td><code>DialogDescription</code></td>
            <td><code>className</code></td>
            <td>Announced by screen readers (aria-describedby)</td>
          </tr>
          <tr>
            <td><code>DialogFooter</code></td>
            <td><code>className</code></td>
            <td>Action button container</td>
          </tr>
          <tr>
            <td><code>DialogClose</code></td>
            <td><code>asChild</code></td>
            <td>Closes the dialog on click</td>
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
            <td><code>Escape</code></td>
            <td>Closes the dialog</td>
          </tr>
          <tr>
            <td><code>Tab</code></td>
            <td>Cycles focus through focusable elements inside the dialog</td>
          </tr>
          <tr>
            <td><code>Shift+Tab</code></td>
            <td>Cycles focus in reverse</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix Dialog implements the WAI-ARIA dialog pattern: focus is trapped inside the modal,
        the background is inert, and <code>aria-labelledby</code> / <code>aria-describedby</code>{' '}
        are linked to DialogTitle and DialogDescription. Always include both a title and description
        for screen readers.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/popover">Popover</a> — For non-blocking floating content that does not require confirmation</li>
        <li><a href="/design/components/alert">Alert</a> — For inline messages that do not need modal interruption</li>
        <li><a href="/design/components/button">Button</a> — Pair destructive buttons with confirmation dialogs</li>
      </ul>
    </>
  );
}
