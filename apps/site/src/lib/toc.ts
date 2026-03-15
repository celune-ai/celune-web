export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Convert heading text to a URL-friendly slug. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Extract table-of-contents headings from an MDX file.
 * Reads the raw MDX source and parses h2/h3 markdown headings.
 */
export function extractTOC(slug: string): TOCItem[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
    const content = fs.readFileSync(filePath, 'utf-8') as string;

    // Remove code blocks to avoid matching headings inside them
    const stripped = content.replace(/```[\s\S]*?```/g, '');

    const items: TOCItem[] = [];
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(stripped)) !== null) {
      const level = match[1].length as 2 | 3;
      const text = match[2].trim();
      items.push({
        id: slugify(text),
        text,
        level,
      });
    }

    return items;
  } catch {
    return [];
  }
}
