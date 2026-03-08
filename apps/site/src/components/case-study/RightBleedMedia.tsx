import { ReactNode } from 'react';

interface RightBleedMediaProps {
  children: ReactNode;
  onClick?: () => void;
  height?: string;
}

export default function RightBleedMedia({
  children,
  onClick,
  height = '70vh',
}: RightBleedMediaProps) {
  return (
    <div
      className={`relative overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
        height,
        width: '170.67%',
        maxWidth: 'none',
        marginRight: '-70.67%',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface RightBleedVideoProps {
  src: string;
  onClick?: () => void;
  height?: string;
}

export function RightBleedVideo({ src, onClick, height }: RightBleedVideoProps) {
  return (
    <RightBleedMedia onClick={onClick} height={height}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="block h-full w-full object-contain object-left"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
        }}
      />
    </RightBleedMedia>
  );
}

interface RightBleedImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
  height?: string;
}

export function RightBleedImage({ src, alt, onClick, height }: RightBleedImageProps) {
  return (
    <RightBleedMedia onClick={onClick} height={height}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block h-full w-full object-contain object-left"
        style={{
          maskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
        }}
      />
    </RightBleedMedia>
  );
}
