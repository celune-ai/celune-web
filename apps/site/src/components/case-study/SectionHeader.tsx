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
      <h2 className={`mb-8 font-heading text-foreground ${titleClassName}`}>{title}</h2>
    </div>
  );
}
