import Image from 'next/image';

interface ProductScreenshotProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  layout?: 'full' | 'float-right' | 'float-left';
  caption?: string;
}

export function ProductScreenshot({
  src,
  alt,
  width,
  height,
  layout = 'full',
  caption,
}: ProductScreenshotProps) {
  if (layout === 'full') {
    return (
      <figure className="my-8">
        <div className="relative overflow-hidden rounded-lg border border-white/[0.08]">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center font-mono text-[11px] text-neutral-500">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  const floatClass =
    layout === 'float-right'
      ? 'md:float-right md:ml-6 md:mr-0'
      : 'md:float-left md:mr-6 md:ml-0';

  return (
    <figure className={`my-4 w-full md:mb-4 md:mt-1 md:w-1/2 ${floatClass}`}>
      <div className="relative overflow-hidden rounded-lg border border-white/[0.08]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 360px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-[11px] text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Utility to clear floats after a floated screenshot section */
export function ClearFloat() {
  return <div className="clear-both" />;
}
