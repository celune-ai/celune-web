import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoCard } from '../_demos';

export const metadata = {
  title: 'Card - Components - Design System',
  description: 'Surface container with header, content, and footer slots.',
};

export default function CardPage() {
  return (
    <>
      <h1>Card</h1>
      <p>
        Surface container using <code>bg-surface-100 border-border</code>.
      </p>

      <ComponentPreview>
        <DemoCard />
      </ComponentPreview>

      <CodeBlock code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@repo/ui/components/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </CardFooter>
</Card>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from '@repo/ui/components/card'`} lang="tsx" />
    </>
  );
}
