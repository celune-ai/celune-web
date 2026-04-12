interface SectionHeaderProps {
  category: string;
  title: string;
  accentColor: string;
  titleClassName?: string;
}
export default function SectionHeader({
  category,
  title,
  accentColor,
  titleClassName = 'text-3xl md:text-5xl',
}: SectionHeaderProps) {
  return (
    <div>
      <h2 className={`font-heading text-foreground mb-8 ${titleClassName}`}>{title}</h2>
    </div>
  );
}
