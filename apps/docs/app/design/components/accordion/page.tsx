import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Accordion - Components - Design System',
  description: 'Radix Accordion for collapsible content sections.',
};

export default function AccordionPage() {
  return (
    <>
      <h1>Accordion</h1>
      <p>Radix Accordion for collapsible content sections with animated expand/collapse.</p>

      <CodeBlock code={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@repo/ui/components/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It uses design tokens from theme.css.
    </AccordionContent>
  </AccordionItem>
</Accordion>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@repo/ui/components/accordion'`} lang="tsx" />
    </>
  );
}
