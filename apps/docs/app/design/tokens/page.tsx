import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Design Tokens - Design System',
  description:
    'Complete reference of all CSS custom properties (design tokens) used across the Celune platform.',
};

export default function TokensPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Foundations</p>
      <h1>Design Tokens</h1>

      <p className="lead">
        Complete reference of every CSS custom property in the system. Source:{' '}
        <code>packages/ui/src/theme.css</code>. Two-layer architecture: primitive scales in{' '}
        <code>:root</code>, semantic tokens in <code>.dark</code> / <code>.light</code>.
      </p>

      <h2>Foreground</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--foreground-default</code>
            </td>
            <td>Primary text, headings</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-light</code>
            </td>
            <td>Secondary text, descriptions</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-lighter</code>
            </td>
            <td>Tertiary text, timestamps</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-muted</code>
            </td>
            <td>Placeholder text, disabled states</td>
          </tr>
          <tr>
            <td>
              <code>--foreground-contrast</code>
            </td>
            <td>Text on colored backgrounds</td>
          </tr>
        </tbody>
      </table>

      <h2>Background &amp; Surface</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--background-default</code>
            </td>
            <td>Page background</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-75</code>
            </td>
            <td>Card backgrounds, elevated surfaces</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-100</code>
            </td>
            <td>Input backgrounds, subtle containers</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-200</code>
            </td>
            <td>Active/selected states, hover backgrounds</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-300</code>
            </td>
            <td>Borders on interactive elements</td>
          </tr>
          <tr>
            <td>
              <code>--background-surface-400</code>
            </td>
            <td>Strong dividers</td>
          </tr>
          <tr>
            <td>
              <code>--background-dash-sidebar</code>
            </td>
            <td>Sidebar background</td>
          </tr>
          <tr>
            <td>
              <code>--background-dash-canvas</code>
            </td>
            <td>Main content area</td>
          </tr>
          <tr>
            <td>
              <code>--background-overlay</code>
            </td>
            <td>Dropdown/popover backgrounds</td>
          </tr>
          <tr>
            <td>
              <code>--background-dialog</code>
            </td>
            <td>Modal/dialog backgrounds</td>
          </tr>
        </tbody>
      </table>

      <h2>Brand</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--brand-default</code>
            </td>
            <td>Primary brand color (#5BC586 green)</td>
          </tr>
          <tr>
            <td>
              <code>--brand-500</code>
            </td>
            <td>Brand at medium weight</td>
          </tr>
          <tr>
            <td>
              <code>--brand-600</code>
            </td>
            <td>Brand hover/active state</td>
          </tr>
          <tr>
            <td>
              <code>--brand-button</code>
            </td>
            <td>Brand-colored button backgrounds</td>
          </tr>
        </tbody>
      </table>

      <h2>Border</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--border-default</code>
            </td>
            <td>Standard borders</td>
          </tr>
          <tr>
            <td>
              <code>--border-muted</code>
            </td>
            <td>Subtle borders (cards, containers)</td>
          </tr>
          <tr>
            <td>
              <code>--border-strong</code>
            </td>
            <td>High-contrast borders (focus, active)</td>
          </tr>
          <tr>
            <td>
              <code>--border-stronger</code>
            </td>
            <td>Maximum contrast borders</td>
          </tr>
          <tr>
            <td>
              <code>--border-overlay</code>
            </td>
            <td>Dropdown/popover borders</td>
          </tr>
          <tr>
            <td>
              <code>--border-button</code>
            </td>
            <td>Button borders</td>
          </tr>
        </tbody>
      </table>

      <h2>Status Colors</h2>
      <table>
        <thead>
          <tr>
            <th>Token group</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--destructive-*</code>
            </td>
            <td>Error states, delete actions</td>
          </tr>
          <tr>
            <td>
              <code>--warning-*</code>
            </td>
            <td>Warning states, caution indicators</td>
          </tr>
          <tr>
            <td>
              <code>--brand-*</code>
            </td>
            <td>Success states, positive indicators</td>
          </tr>
        </tbody>
      </table>

      <h2>Radius</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--radius-sm</code>
            </td>
            <td>4px</td>
            <td>Small chips, tags</td>
          </tr>
          <tr>
            <td>
              <code>--radius-md</code>
            </td>
            <td>6px</td>
            <td>Buttons, inputs (default)</td>
          </tr>
          <tr>
            <td>
              <code>--radius-lg</code>
            </td>
            <td>8px</td>
            <td>Cards, dialogs</td>
          </tr>
          <tr>
            <td>
              <code>--radius-xl</code>
            </td>
            <td>16px</td>
            <td>Large containers, hero elements</td>
          </tr>
          <tr>
            <td>
              <code>--radius-full</code>
            </td>
            <td>9999px</td>
            <td>Pills, circular avatars</td>
          </tr>
        </tbody>
      </table>

      <h2>Badge Palette</h2>
      <p>7-color system for status badges:</p>
      <table>
        <thead>
          <tr>
            <th>Variant</th>
            <th>Color</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>emerald-dark</code>
            </td>
            <td>Green</td>
            <td>Active, success, enabled</td>
          </tr>
          <tr>
            <td>
              <code>gold-dark</code>
            </td>
            <td>Amber</td>
            <td>Warning, pending, in-progress</td>
          </tr>
          <tr>
            <td>
              <code>rose-dark</code>
            </td>
            <td>Red</td>
            <td>Error, blocked, urgent</td>
          </tr>
          <tr>
            <td>
              <code>blue-dark</code>
            </td>
            <td>Blue</td>
            <td>Info, new, assigned</td>
          </tr>
          <tr>
            <td>
              <code>violet-dark</code>
            </td>
            <td>Purple</td>
            <td>Planning, review</td>
          </tr>
          <tr>
            <td>
              <code>amber-dark</code>
            </td>
            <td>Orange</td>
            <td>Paused, deferred</td>
          </tr>
          <tr>
            <td>
              <code>slate-dark</code>
            </td>
            <td>Gray</td>
            <td>Archived, inactive</td>
          </tr>
        </tbody>
      </table>

      <h2>Animation Tokens</h2>
      <p>Framer Motion spring presets used across components:</p>
      <table>
        <thead>
          <tr>
            <th>Pattern</th>
            <th>Config</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tab indicator</td>
            <td>
              <code>spring(500, 30)</code>
            </td>
            <td>PageTabs active underline</td>
          </tr>
          <tr>
            <td>Sidebar active</td>
            <td>
              <code>spring(500, 30)</code>
            </td>
            <td>PageSidebar active background</td>
          </tr>
          <tr>
            <td>Task card enter</td>
            <td>
              <code>150ms ease</code>
            </td>
            <td>Fade + slide on column entry</td>
          </tr>
          <tr>
            <td>Bracket hover</td>
            <td>
              <code>200ms CSS</code>
            </td>
            <td>BracketLink [ ] appearance</td>
          </tr>
        </tbody>
      </table>

      <h2>Convention</h2>
      <p>
        All new components must use semantic tokens (<code>--foreground-*</code>,{' '}
        <code>--background-*</code>, <code>--border-*</code>, <code>--brand-*</code>). No hardcoded
        colors. Dark mode is the default theme.
      </p>

      <CodeBlock
        code={`/* ✅ Correct — uses semantic token */
.card { background: var(--background-surface-75); }

/* ❌ Wrong — hardcoded color */
.card { background: #1a1a1a; }`}
        lang="css"
      />
    </>
  );
}
