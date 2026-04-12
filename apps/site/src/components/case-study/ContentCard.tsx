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
      className="bg-foreground/5 hover:bg-foreground/10 cursor-pointer rounded-lg border-2 px-6 py-4 text-left transition-all duration-200 focus:outline-none focus-visible:outline-none active:outline-none md:px-8 md:py-6"
      style={{
        borderColor: isSelected ? selectedColor : 'transparent',
      }}
    >
      <h3 className="font-inter text-foreground mb-3 text-lg font-medium">{title}</h3>
      <p className="font-inter text-foreground/70 leading-relaxed">{description}</p>
    </button>
  );
}
