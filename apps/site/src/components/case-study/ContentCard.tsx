import { ReactNode } from 'react';

interface ContentCardProps {
  title: string;
  description: string | ReactNode;
  isSelected?: boolean;
  selectedColor?: string;
  onClick?: () => void;
}

export default function ContentCard({
  title,
  description,
  isSelected = false,
  selectedColor = 'transparent',
  onClick,
}: ContentCardProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-lg border-2 bg-foreground/5 px-6 py-4 text-left transition-all duration-200 hover:bg-foreground/10 focus:outline-none focus-visible:outline-none active:outline-none md:px-8 md:py-6"
      style={{
        borderColor: isSelected ? selectedColor : 'transparent',
      }}
    >
      <h3 className="mb-3 font-inter text-lg font-medium text-foreground">{title}</h3>
      <p className="font-inter leading-relaxed text-foreground/70">{description}</p>
    </button>
  );
}
