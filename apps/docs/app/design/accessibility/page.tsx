import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Accessibility - Design System',
  description:
    'Guidelines for building keyboard-navigable, screen-reader-friendly interfaces with the Smejkal Design System.',
};

export default async function AccessibilityPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Getting Started</p>
      <h1>Accessibility</h1>

      <p className="lead">
        Make the interface work for everyone. Accessibility is not an afterthought - it is built
        into the component primitives. Radix UI handles the structural requirements; your job is to
        wire up the right attributes and follow the patterns below consistently.
      </p>

      <h2>Keyboard navigation</h2>

      <p>
        All interactive elements must be reachable and operable via keyboard. The browser&apos;s
        default tab order is generally correct when the DOM order matches the visual order. Avoid
        setting <code>tabIndex</code> values greater than zero - they create unpredictable tab
        sequences.
      </p>

      <table>
        <thead>
          <tr>
            <th>Pattern</th>
            <th>Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interactive non-button elements</td>
            <td>
              Add <code>tabIndex={'{0}'}</code> and handle <code>onKeyDown</code>
            </td>
          </tr>
          <tr>
            <td>Disabled elements</td>
            <td>
              Use <code>tabIndex={'{-1}'}</code> and <code>aria-disabled="true"</code>
            </td>
          </tr>
          <tr>
            <td>Modal dialogs</td>
            <td>Radix Dialog traps focus automatically</td>
          </tr>
          <tr>
            <td>Dropdowns, menus</td>
            <td>Radix DropdownMenu handles arrow key navigation</td>
          </tr>
        </tbody>
      </table>

      <h2>Focus rings</h2>

      <p>
        Every focusable element must display a visible focus indicator. We use the brand green ring
        pattern across all components. The ring is set to 2px with a 40% opacity brand fill so it is
        visible without overwhelming the design.
      </p>

      <p>
        Apply the following classes to any interactive element that is not already using a Radix
        primitive:
      </p>

      <CodeBlock
        code={`// Standard focus ring - applied to buttons, links, inputs
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background"

// Inset focus - for elements where an outset ring would clip (table rows, list items)
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/40"`}
        lang="tsx"
      />

      <p>
        Never remove focus styles without providing an equivalent replacement. Using{' '}
        <code>focus:outline-none</code> without <code>focus-visible</code>
        alternatives is an accessibility violation.
      </p>

      <h2>Interactive elements</h2>

      <p>
        Use <code>{'<button>'}</code> for actions and <code>{'<a>'}</code> for navigation. When a
        non-semantic element must be interactive (such as a table row that navigates on click), add
        both keyboard support and the appropriate role.
      </p>

      <CodeBlock
        code={`// Table row with click-to-navigate behavior
<tr
  role="button"
  tabIndex={0}
  onClick={() => router.push(\`/tasks/\${task.id}\`)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(\`/tasks/\${task.id}\`);
    }
  }}
  className="cursor-pointer hover:bg-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/40"
>
  <td>{task.title}</td>
</tr>`}
        lang="tsx"
      />

      <h2>Screen readers</h2>

      <p>
        Provide text alternatives for all non-text content. Icons that convey meaning need labels;
        decorative icons should be hidden from the accessibility tree.
      </p>

      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Decorative icon</td>
            <td>
              <code>aria-hidden="true"</code>
            </td>
          </tr>
          <tr>
            <td>Icon-only button</td>
            <td>
              <code>aria-label="Delete task"</code> on the button
            </td>
          </tr>
          <tr>
            <td>Image with content</td>
            <td>
              <code>alt="Descriptive text"</code>
            </td>
          </tr>
          <tr>
            <td>Purely decorative image</td>
            <td>
              <code>alt=""</code>
            </td>
          </tr>
          <tr>
            <td>Visually hidden label</td>
            <td>
              <code>className="sr-only"</code> on a span
            </td>
          </tr>
          <tr>
            <td>Loading state</td>
            <td>
              <code>aria-busy="true"</code> on the container
            </td>
          </tr>
          <tr>
            <td>Live region (toast)</td>
            <td>
              <code>role="status"</code> or <code>aria-live="polite"</code>
            </td>
          </tr>
        </tbody>
      </table>

      <CodeBlock
        code={`// Icon-only delete button
<button
  onClick={() => deleteTask(id)}
  aria-label="Delete task"
  className="rounded-md p-1.5 text-foreground-muted hover:bg-surface-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
>
  <Trash2 size={14} aria-hidden="true" />
</button>

// Visually hidden text alongside an icon
<button className="flex items-center gap-2">
  <Plus size={14} aria-hidden="true" />
  <span>New task</span>
</button>`}
        lang="tsx"
      />

      <h2>Color contrast</h2>

      <p>
        Never use color as the only way to convey information. Status badges, for example, must pair
        a color with a text label or icon. The foreground scale is calibrated to meet WCAG AA
        contrast ratios against the dark surface tokens:
      </p>

      <table>
        <thead>
          <tr>
            <th>Foreground token</th>
            <th>
              On <code>bg-background</code>
            </th>
            <th>Minimum use case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>text-foreground</code>
            </td>
            <td>Passes AAA</td>
            <td>Primary body copy, headings</td>
          </tr>
          <tr>
            <td>
              <code>text-foreground-light</code>
            </td>
            <td>Passes AA</td>
            <td>Secondary body copy</td>
          </tr>
          <tr>
            <td>
              <code>text-foreground-lighter</code>
            </td>
            <td>Passes AA (large text)</td>
            <td>Nav links, metadata at 14px+</td>
          </tr>
          <tr>
            <td>
              <code>text-foreground-muted</code>
            </td>
            <td>Below AA</td>
            <td>Decorative labels only - never the primary information carrier</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <p>
          <strong>Rule:</strong> <code>text-foreground-muted</code> must never be the only indicator
          of state or importance. Always pair it with a shape, position, or icon that conveys the
          same information independently.
        </p>
      </blockquote>

      <h2>Semantic HTML</h2>

      <p>
        Correct element choice reduces the amount of ARIA you need to write. Prefer semantic
        elements and only add ARIA when the default semantics are insufficient.
      </p>

      <ul>
        <li>
          Use <code>{'<nav>'}</code> for navigation landmarks, not <code>{'<div role="nav">'}</code>
          .
        </li>
        <li>
          Use <code>{'<main>'}</code> once per page for the primary content region.
        </li>
        <li>
          Use <code>{'<h1>'}</code> through <code>{'<h6>'}</code> in logical order - do not skip
          heading levels for styling purposes.
        </li>
        <li>
          Use <code>{'<ul>'}</code> / <code>{'<ol>'}</code> for genuine lists, not for layout.
        </li>
        <li>
          Use <code>{'<table>'}</code> with <code>{'<th scope>'}</code> for tabular data, not for
          layout.
        </li>
      </ul>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Introduction
          </span>
        </Link>
        <Link href="/design/colors" className="group flex flex-col items-end gap-0.5">
          <span className="text-foreground-muted text-xs">Next</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            Color Usage →
          </span>
        </Link>
      </div>
    </>
  );
}
