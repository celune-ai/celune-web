import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Icons - Design System',
  description:
    'How to import, size, color, and make accessible the lucide-react icons used in the Celune Design System.',
};

export default async function IconsPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Getting Started</p>
      <h1>Icons</h1>

      <p className="lead">
        We use <code>lucide-react</code> for all icons across the admin app and docs site. It
        provides a large set of consistently styled icons with a simple named-import API. Every icon
        is an SVG component with a standard set of props.
      </p>

      <h2>Importing icons</h2>

      <p>
        Always import icons as named exports from <code>lucide-react</code>. Tree-shaking ensures
        that only the icons you import end up in the bundle. Never import the entire library.
      </p>

      <CodeBlock
        code={`// Correct - named imports
import { Plus, ArrowLeft, RefreshCw, Brain } from "lucide-react";

// Incorrect - do not do this
import * as Icons from "lucide-react";`}
        lang="tsx"
      />

      <h2>Sizing</h2>

      <p>
        All icons accept a <code>size</code> prop that sets both width and height simultaneously.
        You can also use Tailwind sizing classes if you prefer. Use consistent sizes within a given
        context.
      </p>

      <table>
        <thead>
          <tr>
            <th>Context</th>
            <th>Size prop</th>
            <th>Tailwind equivalent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inline with UI text (14px)</td>
            <td>
              <code>size={'{14}'}</code>
            </td>
            <td>
              <code>className="h-3.5 w-3.5"</code>
            </td>
          </tr>
          <tr>
            <td>Standard UI icon (16px)</td>
            <td>
              <code>size={'{16}'}</code>
            </td>
            <td>
              <code>className="h-4 w-4"</code>
            </td>
          </tr>
          <tr>
            <td>Slightly larger context (18px)</td>
            <td>
              <code>size={'{18}'}</code>
            </td>
            <td>
              <code>className="h-[18px] w-[18px]"</code>
            </td>
          </tr>
          <tr>
            <td>Larger UI element (20px)</td>
            <td>
              <code>size={'{20}'}</code>
            </td>
            <td>
              <code>className="h-5 w-5"</code>
            </td>
          </tr>
          <tr>
            <td>Empty state illustration (24px+)</td>
            <td>
              <code>size={'{24}'}</code>
            </td>
            <td>
              <code>className="h-6 w-6"</code>
            </td>
          </tr>
        </tbody>
      </table>

      <CodeBlock
        code={`// Button with icon - 14px inline icon
<button className="flex items-center gap-1.5 text-sm">
  <Plus size={14} aria-hidden="true" />
  New task
</button>

// Nav item with icon - 16px
<a href="/tasks" className="flex items-center gap-2 text-sm">
  <ClipboardList size={16} aria-hidden="true" />
  Tasks
</a>

// Empty state - larger icon
<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200">
  <Brain size={18} className="text-foreground-muted" aria-hidden="true" />
</div>`}
        lang="tsx"
      />

      <h2>Color</h2>

      <p>
        Icons inherit their color from the surrounding text. Set the color on the parent element
        using Tailwind text utilities, or pass a class directly to the icon. Never hardcode a color
        value on an icon.
      </p>

      <CodeBlock
        code={`// Inheriting color from parent - preferred
<span className="text-foreground-muted">
  <Search size={16} aria-hidden="true" />
</span>

// Passing class directly - also acceptable
<AlertCircle size={16} className="text-destructive" aria-hidden="true" />

// Using brand color for emphasis
<Check size={16} className="text-brand" aria-hidden="true" />

// Never do this
<Check size={16} style={{ color: "#4ade80" }} />`}
        lang="tsx"
      />

      <h2>Accessibility</h2>

      <p>
        Decorative icons (those next to a text label) must be hidden from assistive technology with{' '}
        <code>aria-hidden="true"</code>. Interactive icons (standalone icon buttons) need a label.
      </p>

      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Required attribute</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Icon beside text label</td>
            <td>
              <code>aria-hidden="true"</code>
            </td>
            <td>
              <code>{'<Plus size={14} aria-hidden="true" />'}</code>
            </td>
          </tr>
          <tr>
            <td>Icon-only button</td>
            <td>
              <code>aria-label</code> on the button element
            </td>
            <td>
              <code>{'<button aria-label="Delete task">'}</code>
            </td>
          </tr>
          <tr>
            <td>Icon conveying status</td>
            <td>
              Paired with visible text or <code>aria-label</code>
            </td>
            <td>Never rely on icon alone for meaning</td>
          </tr>
        </tbody>
      </table>

      <CodeBlock
        code={`// Icon-only action button - label on button, hidden icon
<button
  aria-label="Refresh data"
  onClick={refresh}
  className="rounded-md p-1.5 text-foreground-muted hover:bg-surface-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
>
  <RefreshCw size={14} aria-hidden="true" />
</button>

// Icon alongside text - icon is decorative
<button className="flex items-center gap-1.5">
  <ArrowLeft size={14} aria-hidden="true" />
  Back
</button>`}
        lang="tsx"
      />

      <h2>Common icons in the admin app</h2>

      <p>
        Use these icon choices consistently so that users build muscle memory for what each symbol
        means.
      </p>

      <table>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Import name</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Add / create</td>
            <td>
              <code>Plus</code>
            </td>
            <td>New task, new project, any create action</td>
          </tr>
          <tr>
            <td>Back / previous</td>
            <td>
              <code>ArrowLeft</code>
            </td>
            <td>Back navigation in detail views</td>
          </tr>
          <tr>
            <td>Refresh / retry</td>
            <td>
              <code>RefreshCw</code>
            </td>
            <td>Reload data, retry failed request</td>
          </tr>
          <tr>
            <td>Brain / AI</td>
            <td>
              <code>Brain</code>
            </td>
            <td>MyBrain, AI features, second-brain references</td>
          </tr>
          <tr>
            <td>Search</td>
            <td>
              <code>Search</code>
            </td>
            <td>Search inputs, search actions</td>
          </tr>
          <tr>
            <td>Success / done</td>
            <td>
              <code>Check</code>
            </td>
            <td>Completed state, selected item in dropdown</td>
          </tr>
          <tr>
            <td>Dismiss / remove</td>
            <td>
              <code>X</code>
            </td>
            <td>Close dialog, remove tag, clear input</td>
          </tr>
          <tr>
            <td>Settings</td>
            <td>
              <code>Settings</code>
            </td>
            <td>App settings, configuration panels</td>
          </tr>
          <tr>
            <td>Tasks / clipboard</td>
            <td>
              <code>ClipboardList</code>
            </td>
            <td>Tasks section, to-do lists</td>
          </tr>
          <tr>
            <td>Projects / folder</td>
            <td>
              <code>FolderKanban</code>
            </td>
            <td>Projects section, kanban views</td>
          </tr>
          <tr>
            <td>Warning / caution</td>
            <td>
              <code>AlertTriangle</code>
            </td>
            <td>Warning states, cautionary notices</td>
          </tr>
          <tr>
            <td>Error / danger</td>
            <td>
              <code>AlertCircle</code>
            </td>
            <td>Error states, destructive confirmations</td>
          </tr>
          <tr>
            <td>Info</td>
            <td>
              <code>Info</code>
            </td>
            <td>Informational tooltips and callouts</td>
          </tr>
          <tr>
            <td>External link</td>
            <td>
              <code>ExternalLink</code>
            </td>
            <td>Links that open in a new tab</td>
          </tr>
          <tr>
            <td>Copy</td>
            <td>
              <code>Copy</code>
            </td>
            <td>Copy to clipboard</td>
          </tr>
          <tr>
            <td>Delete</td>
            <td>
              <code>Trash2</code>
            </td>
            <td>Destructive delete actions</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <p>
          When in doubt, check the{' '}
          <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer">
            Lucide icon library
          </a>{' '}
          before creating a custom SVG. The library covers the vast majority of common UI needs.
        </p>
      </blockquote>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design/writing" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Writing
          </span>
        </Link>
        <Link href="/design/tailwind-classes" className="group flex flex-col items-end gap-0.5">
          <span className="text-foreground-muted text-xs">Next</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            Tailwind Classes →
          </span>
        </Link>
      </div>
    </>
  );
}
