import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/blog/code-block';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function MdxPre({ children, ...rest }: React.ComponentPropsWithoutRef<'pre'>) {
  const codeEl = children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;

  if (
    codeEl &&
    typeof codeEl === 'object' &&
    'props' in codeEl &&
    typeof codeEl.props.children === 'string'
  ) {
    const className = codeEl.props.className ?? '';
    const lang = className.replace('language-', '') || 'text';
    const code = codeEl.props.children.trimEnd();
    return <CodeBlock code={code} lang={lang} />;
  }

  return <pre {...rest}>{children}</pre>;
}

function createHeading(level: 2 | 3) {
  const Tag = `h${level}` as const;
  return function MdxHeading({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) {
    const text = typeof children === 'string' ? children : String(children);
    const id = slugify(text);
    return (
      <Tag id={id} {...props}>
        <a href={`#${id}`} className="no-underline hover:underline">
          {children}
        </a>
      </Tag>
    );
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: MdxPre,
    h2: createHeading(2),
    h3: createHeading(3),
  };
}
