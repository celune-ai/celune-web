import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoSelect } from '../_demos';

export const metadata = {
  title: 'Select - Components - Design System',
  description: 'Radix Select with matching input styling.',
};

export default function SelectPage() {
  return (
    <>
      <h1>Select</h1>
      <p>Radix Select with matching input styling.</p>

      <ComponentPreview>
        <DemoSelect />
      </ComponentPreview>

      <CodeBlock code={`import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@repo/ui/components/select'

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="one">Option One</SelectItem>
    <SelectItem value="two">Option Two</SelectItem>
    <SelectItem value="three">Option Three</SelectItem>
  </SelectContent>
</Select>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from '@repo/ui/components/select'`} lang="tsx" />
    </>
  );
}
