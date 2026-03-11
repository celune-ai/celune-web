import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoDialog } from '../_demos';

export const metadata = {
  title: 'Dialog - Components - Design System',
  description: 'Radix Dialog modal with surface background.',
};

export default function DialogPage() {
  return (
    <>
      <h1>Dialog</h1>
      <p>Radix Dialog with <code>bg-surface-100</code> background.</p>

      <ComponentPreview>
        <DemoDialog />
      </ComponentPreview>

      <CodeBlock code={`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@repo/ui/components/dialog'

<Dialog>
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
</Dialog>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from '@repo/ui/components/dialog'`} lang="tsx" />
    </>
  );
}
