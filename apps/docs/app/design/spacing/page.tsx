export const metadata = {
  title: 'Spacing & Radius — Design System',
  description: '8px base grid, border radius scale, and shadow tokens.',
};

export default function SpacingPage() {
  return (
    <>
      <h1>Spacing & Radius</h1>

      <p className="lead">
        All spacing follows an 8px base grid. Border radii and shadows are defined as CSS custom
        properties and consumed via Tailwind&apos;s <code>--radius-*</code> tokens.
      </p>

      <h2>Spacing scale</h2>

      <p>
        Use Tailwind&apos;s default spacing utilities (<code>p-1 = 4px</code>,{' '}
        <code>p-2 = 8px</code>, etc.) The design system does not override the spacing scale. Key
        landmarks:
      </p>

      <table>
        <thead>
          <tr>
            <th>Tailwind class</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>p-1 / gap-1</code>
            </td>
            <td>4px</td>
            <td>Tight icon-to-label gaps</td>
          </tr>
          <tr>
            <td>
              <code>p-2 / gap-2</code>
            </td>
            <td>8px</td>
            <td>Component internal padding (small)</td>
          </tr>
          <tr>
            <td>
              <code>p-3 / gap-3</code>
            </td>
            <td>12px</td>
            <td>Button padding, input padding</td>
          </tr>
          <tr>
            <td>
              <code>p-4 / gap-4</code>
            </td>
            <td>16px</td>
            <td>Card padding, default section gap</td>
          </tr>
          <tr>
            <td>
              <code>p-6 / gap-6</code>
            </td>
            <td>24px</td>
            <td>Card header/content, layout columns</td>
          </tr>
          <tr>
            <td>
              <code>p-8 / gap-8</code>
            </td>
            <td>32px</td>
            <td>Page section padding</td>
          </tr>
          <tr>
            <td>
              <code>p-12 / gap-12</code>
            </td>
            <td>48px</td>
            <td>Large section separation</td>
          </tr>
        </tbody>
      </table>

      <h2>Border radius</h2>

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
              <code>--radius-sm / rounded-sm</code>
            </td>
            <td>4px</td>
            <td>Inline code, small badges, tags</td>
          </tr>
          <tr>
            <td>
              <code>--radius-md / rounded-md</code>
            </td>
            <td>6px</td>
            <td>Buttons, inputs, select triggers</td>
          </tr>
          <tr>
            <td>
              <code>--radius-lg / rounded-lg</code>
            </td>
            <td>8px</td>
            <td>Cards, dialogs, popovers</td>
          </tr>
          <tr>
            <td>
              <code>--radius-xl / rounded-xl</code>
            </td>
            <td>12px</td>
            <td>Large panels, feature cards</td>
          </tr>
          <tr>
            <td>
              <code>--radius-full / rounded-full</code>
            </td>
            <td>9999px</td>
            <td>Pills, avatars, toggle switches</td>
          </tr>
        </tbody>
      </table>

      <h2>Shadows</h2>

      <p>
        Shadows are defined as CSS custom properties. In Tailwind, use the standard{' '}
        <code>shadow-sm</code>, <code>shadow-md</code>, <code>shadow-lg</code> utilities which
        Tailwind v4 derives from its built-in scale.
      </p>

      <table>
        <thead>
          <tr>
            <th>Usage</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cards, inputs</td>
            <td>
              <code>shadow-sm</code>
            </td>
          </tr>
          <tr>
            <td>Dropdowns, popovers</td>
            <td>
              <code>shadow-md</code>
            </td>
          </tr>
          <tr>
            <td>Dialogs, sheets</td>
            <td>
              <code>shadow-lg</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Transitions</h2>

      <p>
        All interactive components use <code>transition-colors</code> for color changes and follow a
        150–200ms duration at <code>cubic-bezier(0.4, 0, 0.2, 1)</code>. This is Tailwind&apos;s
        default transition easing. Avoid custom durations unless an animation has a specific
        semantic purpose.
      </p>
    </>
  );
}
