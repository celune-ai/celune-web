import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Table - Components - Design System',
  description: 'Styled table primitives for data display.',
};

export default function TablePage() {
  return (
    <>
      <h1>Table</h1>
      <p>Styled table primitives for data display. Uses <code>border-border</code> dividers and <code>text-foreground-light</code> for body text.</p>

      <CodeBlock code={`import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@repo/ui/components/table'

<Table>
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
  </TableBody>
</Table>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@repo/ui/components/table'`} lang="tsx" />
    </>
  );
}
