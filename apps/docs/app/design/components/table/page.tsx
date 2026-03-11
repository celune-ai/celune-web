import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Table - Components - Design System',
  description:
    'Organizes data in rows and columns with consistent border and typography styling.',
};

export default function TablePage() {
  return (
    <>
      <h1>Table</h1>
      <p>
        Organizes data in rows and columns. Provides styled primitives that render semantic HTML
        table elements with <code>border-border</code> dividers, <code>text-foreground-light</code>{' '}
        body text, and muted header text via <code>text-foreground-muted</code>.
      </p>

      <h2>Installation</h2>

      <CodeBlock code={`import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@repo/ui/components/table'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Basic</h3>

      <CodeBlock code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Project Alpha</TableCell>
      <TableCell>Active</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Project Beta</TableCell>
      <TableCell>Paused</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`} lang="tsx" />

      <h3>With badges</h3>
      <p>Combine Table with Badge for status columns.</p>

      <CodeBlock code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Task</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Assignee</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Update landing page</TableCell>
      <TableCell><Badge variant="success">Done</Badge></TableCell>
      <TableCell>Eric S</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Fix auth bug</TableCell>
      <TableCell><Badge variant="warning">In Progress</Badge></TableCell>
      <TableCell>Rick K</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Write API docs</TableCell>
      <TableCell><Badge variant="secondary">Backlog</Badge></TableCell>
      <TableCell>Unassigned</TableCell>
    </TableRow>
  </TableBody>
</Table>`} lang="tsx" />

      <h3>With row actions</h3>

      <CodeBlock code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead className="w-10" />
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Eric S</TableCell>
      <TableCell>Admin</TableCell>
      <TableCell>
        <Button variant="ghost" size="icon-sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`} lang="tsx" />

      <h3>Empty state</h3>

      <CodeBlock code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell colSpan={2} className="h-24 text-center text-foreground-muted">
        No results found.
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use tables for structured data where users need to compare values across rows —
            members lists, invoices, task lists.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use tables for layout purposes. Use CSS Grid or Flexbox for non-tabular content.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Right-align numeric columns for easy scanning and comparison.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Omit headers or use vague column names. Clear headers are essential for both
            usability and accessibility.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>HTML element</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Table</code></td>
            <td><code>table</code></td>
            <td>Root container with border-collapse styling</td>
          </tr>
          <tr>
            <td><code>TableHeader</code></td>
            <td><code>thead</code></td>
            <td>Header row group</td>
          </tr>
          <tr>
            <td><code>TableBody</code></td>
            <td><code>tbody</code></td>
            <td>Body row group</td>
          </tr>
          <tr>
            <td><code>TableRow</code></td>
            <td><code>tr</code></td>
            <td>Hover state with <code>bg-surface-75</code></td>
          </tr>
          <tr>
            <td><code>TableHead</code></td>
            <td><code>th</code></td>
            <td>Muted text, left-aligned by default</td>
          </tr>
          <tr>
            <td><code>TableCell</code></td>
            <td><code>td</code></td>
            <td>Standard cell with padding</td>
          </tr>
        </tbody>
      </table>

      <p>All components accept <code>className</code> for overrides.</p>

      <h2>Accessibility</h2>

      <p>
        Table uses semantic HTML (<code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>,{' '}
        <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>) so screen readers automatically
        announce row and column headers. For sortable columns, add{' '}
        <code>aria-sort=&quot;ascending&quot;</code> or <code>aria-sort=&quot;descending&quot;</code>{' '}
        to the <code>TableHead</code>. Wrap the table in a <code>ScrollArea</code> for
        horizontal scroll on narrow viewports.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/badge">Badge</a> — For status indicators inside table cells</li>
        <li><a href="/design/components/scroll-area">Scroll Area</a> — Wrap wide tables for horizontal scrolling</li>
        <li><a href="/design/components/card">Card</a> — Alternative layout for small data sets or summaries</li>
        <li><a href="/design/components/skeleton">Skeleton</a> — For table loading states</li>
      </ul>
    </>
  );
}
