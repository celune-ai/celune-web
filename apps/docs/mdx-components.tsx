import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/code-block';

// Override the <pre><code> output from MDX fenced code blocks so they use
// the same Shiki-highlighted CodeBlock as the tsx design-system pages.
// MDX renders fenced code blocks as <pre><code className="language-tsx">...</code></pre>.
// We intercept <pre> here, extract the code string + language, and delegate.
function MdxPre({ children, ...rest }: React.ComponentPropsWithoutRef<'pre'>) {
  const codeEl = children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;

  // Only handle <pre><code> pairs (fenced code blocks)
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

  // Fallback for <pre> without a <code> child
  return <pre {...rest}>{children}</pre>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: MdxPre,
  };
}
