import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoAvatar } from '../_demos';

export const metadata = {
  title: 'Avatar - Components - Design System',
  description:
    'Represents a user with a profile image or brand-colored fallback initials.',
};

export default function AvatarPage() {
  return (
    <>
      <h1>Avatar</h1>
      <p>
        Represents a user with a profile image or fallback initials. Built on Radix Avatar,
        the fallback uses <code>bg-brand-200</code> with <code>text-brand-600</code> for a
        consistent brand look when no image is available.
      </p>

      <ComponentPreview>
        <div className="flex items-center gap-3">
          <DemoAvatar initials="ES" />
          <DemoAvatar initials="RK" />
          <DemoAvatar initials="NR" />
        </div>
      </ComponentPreview>

      <h2>Installation</h2>

      <CodeBlock code={`import { Avatar, AvatarImage, AvatarFallback } from '@repo/ui/components/avatar'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>With image</h3>

      <CodeBlock code={`<Avatar>
  <AvatarImage src="/avatars/eric.jpg" alt="Eric S" />
  <AvatarFallback>ES</AvatarFallback>
</Avatar>`} lang="tsx" />

      <h3>Fallback only</h3>
      <p>When no image is provided (or it fails to load), the fallback initials are shown automatically.</p>

      <ComponentPreview>
        <div className="flex items-center gap-3">
          <DemoAvatar initials="ES" />
          <DemoAvatar initials="RK" />
          <DemoAvatar initials="NR" />
        </div>
      </ComponentPreview>

      <CodeBlock code={`<Avatar>
  <AvatarFallback>ES</AvatarFallback>
</Avatar>`} lang="tsx" />

      <h3>Avatar group</h3>
      <p>Stack avatars with negative margin for a compact team display.</p>

      <CodeBlock code={`<div className="flex -space-x-2">
  <Avatar className="border-2 border-background">
    <AvatarImage src="/avatars/eric.jpg" alt="Eric" />
    <AvatarFallback>ES</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="/avatars/rick.jpg" alt="Rick" />
    <AvatarFallback>RK</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+3</AvatarFallback>
  </Avatar>
</div>`} lang="tsx" />

      <h3>Sizes</h3>
      <p>Control size via <code>className</code>. The default is 40 px (h-10 w-10).</p>

      <CodeBlock code={`<Avatar className="h-8 w-8 text-xs">
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback>MD</AvatarFallback>
</Avatar>

<Avatar className="h-14 w-14 text-lg">
  <AvatarFallback>LG</AvatarFallback>
</Avatar>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Always provide a fallback with initials. Users without profile photos should still
            see a recognizable placeholder.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use generic icons as fallbacks. Initials are more personal and help users scan
            lists of team members.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Key props</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Avatar</code></td>
            <td><code>className</code></td>
            <td>Root container (rounded-full by default)</td>
          </tr>
          <tr>
            <td><code>AvatarImage</code></td>
            <td><code>src</code>, <code>alt</code></td>
            <td>Profile image — hidden if it fails to load</td>
          </tr>
          <tr>
            <td><code>AvatarFallback</code></td>
            <td><code>delayMs</code>, <code>className</code></td>
            <td>Shown while image loads or when no image is set</td>
          </tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>

      <p>
        Always provide a meaningful <code>alt</code> attribute on <code>AvatarImage</code> — use
        the person&apos;s name, not &quot;avatar&quot; or &quot;profile picture.&quot; For avatar
        groups, consider wrapping the container in a <code>role=&quot;group&quot;</code> with an{' '}
        <code>aria-label</code> like &quot;Team members.&quot;
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/tooltip">Tooltip</a> — Add a tooltip to show full name on hover in compact layouts</li>
        <li><a href="/design/components/badge">Badge</a> — Pair with an avatar to show online status</li>
        <li><a href="/design/components/skeleton">Skeleton</a> — Use <code>rounded-full</code> skeleton as a loading placeholder</li>
      </ul>
    </>
  );
}
