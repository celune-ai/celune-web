import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoTabs } from '../_demos';

export const metadata = {
  title: 'Tabs - Components - Design System',
  description: 'Radix Tabs with pill-style active indicator.',
};

export default function TabsPage() {
  return (
    <>
      <h1>Tabs</h1>
      <p>Radix Tabs with pill-style active indicator.</p>

      <ComponentPreview>
        <DemoTabs />
      </ComponentPreview>

      <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@repo/ui/components/tabs'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
  <TabsContent value="activity">Activity content</TabsContent>
</Tabs>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@repo/ui/components/tabs'`} lang="tsx" />
    </>
  );
}
