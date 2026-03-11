import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoSkeleton } from '../_demos';

export const metadata = {
  title: 'Skeleton - Components - Design System',
  description: 'Animated pulse loading placeholder.',
};

export default function SkeletonPage() {
  return (
    <>
      <h1>Skeleton</h1>
      <p>Animated pulse loading placeholder.</p>

      <ComponentPreview>
        <DemoSkeleton />
      </ComponentPreview>

      <CodeBlock code={`import { Skeleton } from '@repo/ui/components/skeleton'

<div className="flex flex-col gap-3">
  <Skeleton className="h-4 w-48" />
  <Skeleton className="h-4 w-64" />
  <Skeleton className="h-4 w-40" />
</div>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Skeleton } from '@repo/ui/components/skeleton'`} lang="tsx" />
    </>
  );
}
