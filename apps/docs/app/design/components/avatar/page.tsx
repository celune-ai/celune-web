import { CodeBlock } from '@/components/code-block';
import { ComponentPreview } from '@/components/component-preview';
import { DemoAvatar } from '../_demos';

export const metadata = {
  title: 'Avatar - Components - Design System',
  description: 'Radix Avatar with brand-colored fallback initials.',
};

export default function AvatarPage() {
  return (
    <>
      <h1>Avatar</h1>
      <p>Radix Avatar with brand-colored fallback initials.</p>

      <ComponentPreview>
        <div className="flex items-center gap-3">
          <DemoAvatar initials="ES" />
          <DemoAvatar initials="RK" />
          <DemoAvatar initials="NR" />
        </div>
      </ComponentPreview>

      <CodeBlock code={`import { Avatar, AvatarImage, AvatarFallback } from '@repo/ui/components/avatar'

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Eric" />
  <AvatarFallback>ES</AvatarFallback>
</Avatar>`} />

      <h2>Usage</h2>

      <CodeBlock code={`import { Avatar, AvatarImage, AvatarFallback } from '@repo/ui/components/avatar'`} lang="tsx" />
    </>
  );
}
