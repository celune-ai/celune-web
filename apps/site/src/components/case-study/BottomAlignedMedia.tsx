interface BottomAlignedMediaProps {
  src: string;
  alt: string;
  isActive: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
}

export default function BottomAlignedMedia({
  src,
  alt,
  isActive,
  onClick,
  width = '60%',
  height = '45%',
}: BottomAlignedMediaProps) {
  return (
    <div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 ease-in-out ${
        onClick ? 'cursor-pointer' : ''
      } ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
      style={{
        width,
        height,
        transition: 'all 500ms ease-in-out 200ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.height = '47%';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.height = height;
      }}
      onClick={onClick}
    >
      <div className="relative h-full w-full overflow-hidden rounded-b-none rounded-t-lg">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover object-top"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
}
