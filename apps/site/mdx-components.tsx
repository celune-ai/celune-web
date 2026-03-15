import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/blog/code-block';

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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: MdxPre,
  };
}
