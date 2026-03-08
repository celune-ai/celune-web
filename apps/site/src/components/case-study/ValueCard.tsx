import { ReactNode } from 'react';

interface ValueCardProps {
  title: string;
  children: ReactNode;
}

export default function ValueCard({ title, children }: ValueCardProps) {
  return (
    <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-5">
      <p className="mb-3 font-heading text-2xl text-foreground md:text-3xl">{title}</p>
      <p className="font-inter text-sm leading-relaxed text-foreground/60">{children}</p>
    </div>
  );
}
