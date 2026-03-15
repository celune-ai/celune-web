import Image from 'next/image';

interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function HeroImage({ src, alt, priority = false }: HeroImageProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/[0.08]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 720px"
      />
    </div>
  );
}
