import Link from 'next/link';

export const metadata = {
  title: 'Components - Design System',
  description:
    'Browse all UI components in the Celune design system with usage guidance, live previews, and API documentation.',
};

const FORM_COMPONENTS = [
  { href: '/design/components/button', name: 'Button', description: 'Triggers actions with semantic intent variants' },
  { href: '/design/components/input', name: 'Input', description: 'Captures single-line text with brand focus ring' },
  { href: '/design/components/textarea', name: 'Textarea', description: 'Captures multi-line text input' },
  { href: '/design/components/select', name: 'Select', description: 'Presents a list of options in a dropdown' },
  { href: '/design/components/checkbox', name: 'Checkbox', description: 'Toggles a boolean value on or off' },
  { href: '/design/components/switch', name: 'Switch', description: 'Toggles a setting between two states' },
  { href: '/design/components/radio-group', name: 'Radio Group', description: 'Selects one option from a set' },
  { href: '/design/components/label', name: 'Label', description: 'Associates accessible text with a form control' },
];

const DISPLAY_COMPONENTS = [
  { href: '/design/components/badge', name: 'Badge', description: 'Displays status, counts, or classification tags' },
  { href: '/design/components/card', name: 'Card', description: 'Groups related content in a surface container' },
  { href: '/design/components/alert', name: 'Alert', description: 'Communicates contextual feedback to the user' },
  { href: '/design/components/avatar', name: 'Avatar', description: 'Represents a user with an image or initials' },
  { href: '/design/components/skeleton', name: 'Skeleton', description: 'Indicates loading state with animated placeholders' },
  { href: '/design/components/progress', name: 'Progress', description: 'Shows completion percentage of a task' },
  { href: '/design/components/table', name: 'Table', description: 'Organizes data in rows and columns' },
];

const OVERLAY_COMPONENTS = [
  { href: '/design/components/dialog', name: 'Dialog', description: 'Interrupts with a modal requiring user action' },
  { href: '/design/components/popover', name: 'Popover', description: 'Floats supplementary content near a trigger' },
  { href: '/design/components/tooltip', name: 'Tooltip', description: 'Shows brief context on hover or focus' },
];

const NAVIGATION_COMPONENTS = [
  { href: '/design/components/tabs', name: 'Tabs', description: 'Switches between content panels' },
  { href: '/design/components/accordion', name: 'Accordion', description: 'Expands and collapses content sections' },
  { href: '/design/components/scroll-area', name: 'Scroll Area', description: 'Provides custom-styled scrollbars' },
  { href: '/design/components/toggle', name: 'Toggle', description: 'Presses on or off for a single option' },
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
        A library of production-ready UI components built with CVA, Radix UI, and Tailwind CSS v4.
        Import any component via <code>@repo/ui/components/[name]</code>. Every component accepts
        a <code>className</code> prop for one-off overrides.
      </p>

      <blockquote>
        <p>
          All color classes like <code>bg-brand</code>, <code>text-foreground-muted</code>, and{' '}
          <code>border-border-control</code> resolve to design tokens defined in{' '}
          <code>@repo/ui/theme.css</code> via Tailwind v4&apos;s <code>@theme inline</code> directive.
        </p>
      </blockquote>

      <h2>Form controls</h2>
      <p>Components for capturing user input in forms, settings panels, and onboarding flows.</p>
      <ComponentGrid items={FORM_COMPONENTS} />

      <h2>Data display</h2>
      <p>Components for presenting content, status indicators, and loading states.</p>
      <ComponentGrid items={DISPLAY_COMPONENTS} />

      <h2>Overlays</h2>
      <p>Components that float above the page to capture attention or provide context.</p>
      <ComponentGrid items={OVERLAY_COMPONENTS} />

      <h2>Navigation</h2>
      <p>Components for organizing and navigating between content sections.</p>
      <ComponentGrid items={NAVIGATION_COMPONENTS} />

      <h2>Composition patterns</h2>

      <p>
        These higher-order patterns are composed from the atom components above. They live in each
        app rather than in <code>@repo/ui</code> because they are layout-specific.
      </p>

      <ul>
        <li><strong>Page header</strong> — Breadcrumb + heading + description + action buttons</li>
        <li><strong>Form item</strong> — Label + Input/Select + helper text + error message</li>
        <li><strong>Confirmation modal</strong> — Dialog + destructive Button + cancel</li>
        <li><strong>Data table</strong> — Table + sortable headers + pagination controls</li>
        <li><strong>Metric card</strong> — Card + large value + label + trend indicator</li>
        <li><strong>Empty state</strong> — Icon + heading + description + CTA Button</li>
      </ul>

      <h2>Charts</h2>

      <p>
        Chart components wrap Recharts with consistent token-based styling and composable slots.
      </p>

      <ul>
        <li><a href="/design/charts"><strong>Charts</strong></a> — <code>ChartCard</code>, <code>BarChartCard</code>, <code>LineChartCard</code>, <code>LogsBarChart</code>, <code>ChartTooltip</code></li>
        <li><a href="/design/metrics"><strong>Metric cards</strong></a> — <code>MetricCard</code>, <code>MetricCardValue</code>, <code>MetricCardDifferential</code>, <code>MetricCardSparkline</code></li>
      </ul>
    </>
  );
}
