import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoTooltip } from '../_demos';

export const metadata = {
  title: 'Tooltip - Components - Design System',
  description: 'Radix Tooltip with dark background for contrast.',
};

export default function TooltipPage() {
  return (
    <>
      <h1>Tooltip</h1>
      <p>Radix Tooltip with dark background for contrast.</p>

      <ComponentPreview>
        <DemoTooltip />
      </ComponentPreview>

      <CodeBlock code={`import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@repo/ui/components/tooltip'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon-sm"><Pencil /></Button>
    </TooltipTrigger>
    <TooltipContent>Edit task</TooltipContent>
  </Tooltip>
</TooltipProvider>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@repo/ui/components/tooltip'`} lang="tsx" />
    </>
  );
}
