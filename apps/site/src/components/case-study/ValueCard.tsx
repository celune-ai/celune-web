import { ReactNode } from 'react';

interface ValueCardProps {
  title: string;
  children: ReactNode;
}

export default function ValueCard({ title, children }: ValueCardProps) {
  return (
    <div className="border-foreground/10 bg-foreground/5 rounded-lg border p-5">
      <p className="font-heading text-foreground mb-3 text-2xl md:text-3xl">{title}</p>
      <p className="font-inter text-foreground/60 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
