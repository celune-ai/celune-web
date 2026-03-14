import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Writing - Design System',
  description: 'Writing conventions for UI text across the Celune Design System.',
};

export default async function WritingPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Getting Started</p>
      <h1>Writing</h1>

      <p className="lead">
        Clear, consistent copy is as much a part of the design as color and spacing. These
        conventions govern all text that appears in the interface: labels, buttons, error messages,
        status indicators, and empty states.
      </p>

      <h2>Voice</h2>

      <p>
        The interface speaks directly and informatively. It does not apologize unnecessarily, use
        filler phrases, or adopt a chatty tone. Every word should earn its place.
      </p>

      <table>
        <thead>
          <tr>
            <th>Avoid</th>
            <th>Prefer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Oops! Something went wrong.</td>
            <td>Could not save changes. Check your connection and try again.</td>
          </tr>
          <tr>
            <td>Hey there! Ready to get started?</td>
            <td>No tasks yet. Create your first task to get started.</td>
          </tr>
          <tr>
            <td>Please be advised that this action cannot be undone.</td>
            <td>This cannot be undone.</td>
          </tr>
          <tr>
            <td>You have successfully saved your changes!</td>
            <td>Changes saved.</td>
          </tr>
          <tr>
            <td>Click here to learn more.</td>
            <td>Learn more about task statuses.</td>
          </tr>
        </tbody>
      </table>

      <h2>Sentence case</h2>

      <p>
        Use sentence case everywhere in the UI: navigation labels, page headings, button labels,
        table column headers, and form field labels. Title case is reserved for product names and
        proper nouns only.
      </p>

      <table>
        <thead>
          <tr>
            <th>Incorrect</th>
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create New Task</td>
            <td>Create new task</td>
          </tr>
          <tr>
            <td>Project Overview</td>
            <td>Project overview</td>
          </tr>
          <tr>
            <td>Due Date</td>
            <td>Due date</td>
          </tr>
          <tr>
            <td>Assigned To</td>
            <td>Assigned to</td>
          </tr>
          <tr>
            <td>Activity Log</td>
            <td>Activity log</td>
          </tr>
        </tbody>
      </table>

      <h2>Action verbs for CTAs</h2>

      <p>
        Button labels are verbs that describe what the action does, not vague calls to action. Lead
        with the verb. Keep labels short - one or two words is ideal.
      </p>

      <table>
        <thead>
          <tr>
            <th>Avoid</th>
            <th>Prefer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Click here</td>
            <td>Save changes</td>
          </tr>
          <tr>
            <td>Submit</td>
            <td>Create task</td>
          </tr>
          <tr>
            <td>OK</td>
            <td>Confirm</td>
          </tr>
          <tr>
            <td>Yes, delete it</td>
            <td>Delete task</td>
          </tr>
          <tr>
            <td>Close</td>
            <td>Cancel (when dismissing a form) or Close (when closing info)</td>
          </tr>
        </tbody>
      </table>

      <CodeBlock
        code={`// Confirmation dialog - clear, specific actions
<Dialog>
  <DialogHeader>
    <DialogTitle>Delete task</DialogTitle>
    <DialogDescription>
      This task and all associated comments will be permanently deleted.
      This cannot be undone.
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button variant="outline">Cancel</Button>
    <Button variant="destructive">Delete task</Button>
  </DialogFooter>
</Dialog>`}
        lang="tsx"
      />

      <h2>Error messages</h2>

      <p>
        State the problem clearly, then suggest what the user can do about it. Avoid technical
        jargon. Never blame the user.
      </p>

      <table>
        <thead>
          <tr>
            <th>Avoid</th>
            <th>Prefer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Error 422: Unprocessable Entity</td>
            <td>Title is required.</td>
          </tr>
          <tr>
            <td>Something went wrong</td>
            <td>Could not load tasks. Refresh to try again.</td>
          </tr>
          <tr>
            <td>Invalid input</td>
            <td>Due date must be today or later.</td>
          </tr>
          <tr>
            <td>Network error occurred</td>
            <td>Could not connect. Check your internet connection.</td>
          </tr>
        </tbody>
      </table>

      <p>
        Inline field errors appear below the input. They should be short - one sentence - and avoid
        restating the field name if it is already visible.
      </p>

      <CodeBlock
        code={`// Field error - direct and specific
<div className="space-y-1.5">
  <label htmlFor="title" className="text-sm text-foreground">
    Title
  </label>
  <input
    id="title"
    className="border-destructive ring-destructive/20"
    aria-describedby="title-error"
    aria-invalid="true"
  />
  <p id="title-error" className="text-xs text-destructive">
    Title is required.
  </p>
</div>`}
        lang="tsx"
      />

      <h2>Status labels</h2>

      <p>
        Status values are always capitalized as proper nouns. Use consistent terminology across the
        admin app and any client-facing surfaces.
      </p>

      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Display label</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>todo</code>
            </td>
            <td>To do</td>
            <td>Task not yet started</td>
          </tr>
          <tr>
            <td>
              <code>in_progress</code>
            </td>
            <td>In progress</td>
            <td>Actively being worked on</td>
          </tr>
          <tr>
            <td>
              <code>in_review</code>
            </td>
            <td>In review</td>
            <td>Awaiting approval or feedback</td>
          </tr>
          <tr>
            <td>
              <code>done</code>
            </td>
            <td>Done</td>
            <td>Completed successfully</td>
          </tr>
          <tr>
            <td>
              <code>blocked</code>
            </td>
            <td>Blocked</td>
            <td>Cannot proceed - dependency or impediment</td>
          </tr>
          <tr>
            <td>
              <code>cancelled</code>
            </td>
            <td>Cancelled</td>
            <td>Deliberately stopped, not failed</td>
          </tr>
        </tbody>
      </table>

      <h2>Empty states</h2>

      <p>
        Empty states should tell the user why the area is empty and what they can do about it. A
        good empty state has four elements: an icon, a short heading, a one-sentence description,
        and a primary action.
      </p>

      <CodeBlock
        code={`// Empty state pattern
<div className="flex flex-col items-center gap-3 py-16 text-center">
  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200">
    <ClipboardList size={18} className="text-foreground-muted" aria-hidden="true" />
  </div>
  <div className="space-y-1">
    <p className="text-sm font-medium text-foreground">No tasks yet</p>
    <p className="text-sm text-foreground-lighter">
      Create your first task to start tracking work.
    </p>
  </div>
  <Button size="md" onClick={onCreateTask}>
    <Plus size={14} aria-hidden="true" />
    New task
  </Button>
</div>`}
        lang="tsx"
      />

      <h2>Numeric formatting</h2>

      <p>
        Use consistent number formatting across the interface. Never abbreviate numbers in a context
        where precision matters (a task count, a record ID). Abbreviate only in dashboards and
        summary tiles where space is constrained.
      </p>

      <table>
        <thead>
          <tr>
            <th>Context</th>
            <th>Format</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Record count in a table</td>
            <td>Full number</td>
            <td>1,284 tasks</td>
          </tr>
          <tr>
            <td>Dashboard summary tile</td>
            <td>Abbreviated</td>
            <td>1.3k</td>
          </tr>
          <tr>
            <td>Dates (absolute)</td>
            <td>Day Mon Year</td>
            <td>12 Jan 2025</td>
          </tr>
          <tr>
            <td>Dates (relative, recent)</td>
            <td>Relative phrase</td>
            <td>2 hours ago, yesterday</td>
          </tr>
          <tr>
            <td>Percentages</td>
            <td>No decimal unless significant</td>
            <td>72%, not 72.3%</td>
          </tr>
        </tbody>
      </table>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design/colors" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Color Usage
          </span>
        </Link>
        <Link href="/design/icons" className="group flex flex-col items-end gap-0.5">
          <span className="text-foreground-muted text-xs">Next</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            Icons →
          </span>
        </Link>
      </div>
    </>
  );
}
