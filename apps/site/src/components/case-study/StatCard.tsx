import { ChevronsDown, ChevronsUp, LucideIcon } from 'lucide-react';

type StatDirection = 'up' | 'down';

interface StatCardProps {
  value: string;
  description: string;
  direction?: StatDirection;
  icon?: LucideIcon;
}

export default function StatCard({
  value,
  description,
  direction = 'down',
  icon: CustomIcon,
}: StatCardProps) {
  const Icon = CustomIcon || (direction === 'up' ? ChevronsUp : ChevronsDown);
  const iconColor = direction === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-4">
      <div className="mb-1 flex items-center gap-2">
        <Icon className={`${iconColor} shrink-0`} size={24} />
        <p className="font-heading text-2xl text-foreground md:text-3xl">{value}</p>
      </div>
      <p className="font-inter text-xs leading-relaxed text-foreground/60">{description}</p>
    </div>
  );
}
