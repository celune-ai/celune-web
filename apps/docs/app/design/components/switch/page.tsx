import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoSwitch } from '../_demos';

export const metadata = {
  title: 'Switch - Components - Design System',
  description: 'Radix Switch toggle with brand-colored on state.',
};

export default function SwitchPage() {
  return (
    <>
      <h1>Switch</h1>
      <p>Radix Switch. On: <code>bg-brand</code>. Off: <code>bg-surface-400</code>.</p>

      <ComponentPreview>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <DemoSwitch on />
            <span className="text-foreground text-sm">Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <DemoSwitch />
            <span className="text-foreground text-sm">Disabled</span>
          </div>
        </div>
      </ComponentPreview>

      <CodeBlock code={`import { Switch } from '@repo/ui/components/switch'
import { Label } from '@repo/ui/components/label'

<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Switch } from '@repo/ui/components/switch'`} lang="tsx" />
    </>
  );
}
