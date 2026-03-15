import Image from 'next/image';
import { formatDate } from '@/lib/blog';

interface AuthorCardProps {
  author: string;
  date: string;
  readingTime: number;
}

export function AuthorCard({ author, date, readingTime }: AuthorCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Author info */}
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/[0.08]">
          <Image
            src="/celune-logomark.svg"
            alt={author}
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{author}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1.5 border-t border-dashed border-white/[0.08] pt-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-neutral-500">Published</span>
        </div>
        <time dateTime={date} className="text-sm text-neutral-400">
          {formatDate(date)}
        </time>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-neutral-500">Read time</span>
        <span className="text-sm text-neutral-400">{readingTime} min read</span>
      </div>
    </div>
  );
}
