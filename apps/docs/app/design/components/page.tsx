import Link from 'next/link';

export const metadata = {
  title: 'Components - Design System',
  description: 'All atom components in the @repo/ui shared library with usage guidance.',
};

const FORM_COMPONENTS = [
  { href: '/design/components/button', name: 'Button', description: 'Primary action component with semantic variants' },
  { href: '/design/components/input', name: 'Input', description: 'Text input with brand focus ring' },
  { href: '/design/components/textarea', name: 'Textarea', description: 'Multi-line text input' },
  { href: '/design/components/select', name: 'Select', description: 'Radix Select dropdown' },
  { href: '/design/components/checkbox', name: 'Checkbox', description: 'Radix Checkbox with brand checked state' },
  { href: '/design/components/switch', name: 'Switch', description: 'Toggle switch for binary options' },
  { href: '/design/components/radio-group', name: 'Radio Group', description: 'Single-choice selection group' },
  { href: '/design/components/label', name: 'Label', description: 'Accessible form field label' },
];

const DISPLAY_COMPONENTS = [
  { href: '/design/components/badge', name: 'Badge', description: 'Status indicators and classification tags' },
  { href: '/design/components/card', name: 'Card', description: 'Surface container with header, content, footer' },
  { href: '/design/components/alert', name: 'Alert', description: 'Callout boxes with semantic variants' },
  { href: '/design/components/avatar', name: 'Avatar', description: 'User avatar with fallback initials' },
  { href: '/design/components/skeleton', name: 'Skeleton', description: 'Animated loading placeholder' },
  { href: '/design/components/progress', name: 'Progress', description: 'Progress bar with brand fill' },
  { href: '/design/components/table', name: 'Table', description: 'Styled table primitives for data display' },
];

const OVERLAY_COMPONENTS = [
  { href: '/design/components/dialog', name: 'Dialog', description: 'Modal dialog with surface background' },
  { href: '/design/components/popover', name: 'Popover', description: 'Floating content panel' },
  { href: '/design/components/tooltip', name: 'Tooltip', description: 'Dark tooltip on hover' },
];

const NAVIGATION_COMPONENTS = [
  { href: '/design/components/tabs', name: 'Tabs', description: 'Pill-style tab navigation' },
  { href: '/design/components/accordion', name: 'Accordion', description: 'Collapsible content sections' },
  { href: '/design/components/scroll-area', name: 'Scroll Area', description: 'Custom scrollbar styling' },
  { href: '/design/components/toggle', name: 'Toggle', description: 'Binary on/off toggle button' },
];

function ComponentGrid({ items }: { items: { href: string; name: string; description: string }[] }) {
  return (
    <div className="not-prose my-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map(({ href, name, description }) => (
        <Link
          key={href}
          href={href}
          className="border-border bg-surface-75 hover:bg-surface-100 hover:border-border-control rounded-lg border p-4 transition-colors"
        >
          <p className="text-foreground text-sm font-medium">{name}</p>
          <p className="text-foreground-lighter mt-1 text-xs">{description}</p>
        </Link>
      ))}
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <h1>Components</h1>

      <p className="lead">
        All components live in <code>packages/ui/src/components/</code> and are consumed via the
        workspace alias <code>@repo/ui/components/[name]</code>. Each follows the CVA + Radix UI +
        Tailwind pattern and accepts a <code>className</code> prop for overrides.
      </p>

      <blockquote>
        <p>
          The component library uses Tailwind CSS v4. Class names reference design tokens via{' '}
          <code>@theme inline</code>. All color classes like <code>bg-brand</code>,{' '}
          <code>text-foreground-muted</code>, and <code>border-border-control</code> resolve to the
          token values defined in <code>@repo/ui/theme.css</code>.
        </p>
      </blockquote>

      <h2>Form</h2>
      <ComponentGrid items={FORM_COMPONENTS} />

      <h2>Display</h2>
      <ComponentGrid items={DISPLAY_COMPONENTS} />

      <h2>Overlays</h2>
      <ComponentGrid items={OVERLAY_COMPONENTS} />

      <h2>Navigation</h2>
      <ComponentGrid items={NAVIGATION_COMPONENTS} />

      <h2>Fragment patterns</h2>

      <p>
        Fragment components are higher-order patterns composed from atoms. They are built in each
        app rather than shared via <code>@repo/ui</code> since they are layout-specific. Common
        patterns:
      </p>

      <ul>
        <li><strong>Page header</strong> - Breadcrumb + h1 + description + action button(s)</li>
        <li><strong>Form item layout</strong> - Label + Input/Select + description + error message</li>
        <li><strong>Confirmation modal</strong> - Dialog + destructive Button + cancel</li>
        <li><strong>Data table</strong> - Table + sort headers + pagination</li>
        <li><strong>Metric card</strong> - Card + large value + label + trend indicator</li>
        <li><strong>Empty state</strong> - Icon + heading + description + CTA Button</li>
      </ul>

      <h2>Chart components</h2>

      <p>
        The chart library lives in <code>@repo/ui</code> alongside the atom components. It wraps
        recharts with consistent token-based styling and composable slot components.
      </p>

      <ul>
        <li><a href="/design/charts"><strong>Charts</strong></a> - <code>ChartCard</code>, <code>BarChartCard</code>, <code>LineChartCard</code>, <code>LogsBarChart</code>, <code>ChartTooltip</code></li>
        <li><a href="/design/metrics"><strong>Metric Cards</strong></a> - <code>MetricCard</code>, <code>MetricCardValue</code>, <code>MetricCardDifferential</code>, <code>MetricCardSparkline</code></li>
      </ul>
    </>
  );
}
