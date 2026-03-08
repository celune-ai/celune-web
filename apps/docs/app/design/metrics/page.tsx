import Link from 'next/link';

export const metadata = {
  title: 'Metric Cards — Design System',
  description:
    'MetricCard compound component: value display, differential indicators, sparklines, and loading states.',
};

export default function MetricsPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Components</p>
      <h1>Metric Cards</h1>

      <p className="lead">
        <code>MetricCard</code> is a compound component for displaying a single KPI: a label, a
        large numeric value, an optional change indicator, and an optional sparkline. It is inspired
        by the Supabase dashboard metric pattern and lives in{' '}
        <code>@repo/ui/components/metric-card</code>.
      </p>

      <pre>
        <code>{`import {
  MetricCard,
  MetricCardHeader,
  MetricCardLabel,
  MetricCardContent,
  MetricCardValue,
  MetricCardDifferential,
  MetricCardSparkline,
} from '@repo/ui/components/metric-card'`}</code>
      </pre>

      <h2>Anatomy</h2>

      <p>
        Each sub-component corresponds to a visual slot. You can use any combination depending on
        what the metric needs to communicate.
      </p>

      <pre>
        <code>{`<MetricCard>
  <MetricCardHeader>
    <MetricCardLabel>Tasks completed</MetricCardLabel>
  </MetricCardHeader>

  <MetricCardContent>
    <MetricCardValue>142</MetricCardValue>
    <MetricCardDifferential variant="positive">+12 this week</MetricCardDifferential>
  </MetricCardContent>

  <MetricCardSparkline data={sparkData} dataKey="count" />
</MetricCard>`}</code>
      </pre>

      <h2>Components</h2>

      <h3 id="metric-card">MetricCard</h3>
      <p>
        Root wrapper rendered as a <code>Card</code>. Sets up context with <code>isLoading</code> so
        child components can coordinate their skeleton states without additional prop threading.
      </p>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>isLoading</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>
              When true, <code>MetricCardValue</code>, <code>MetricCardDifferential</code>, and{' '}
              <code>MetricCardSparkline</code> each render a <code>Skeleton</code> at the
              appropriate size
            </td>
          </tr>
        </tbody>
      </table>

      <h3 id="metric-card-header">MetricCardHeader</h3>
      <p>
        A flex row above the value content. Accepts an optional <code>href</code> — when provided,
        the header renders as an anchor tag, making the entire header area a clickable link (useful
        for metrics that navigate to a detail view).
      </p>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>href</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              When set, wraps the header in an <code>&lt;a&gt;</code> tag. Use a Next.js{' '}
              <code>Link</code> component in the header instead for client-side navigation.
            </td>
          </tr>
        </tbody>
      </table>

      <h3 id="metric-card-label">MetricCardLabel</h3>
      <p>
        The metric name. Renders in <code>text-foreground-lighter text-xs font-medium</code>.
        Accepts an optional <code>tooltip</code> prop — when provided the label renders with a
        dashed underline and a Radix <code>Tooltip</code> on hover.
      </p>

      <pre>
        <code>{`// Simple label
<MetricCardLabel>Tasks completed</MetricCardLabel>

// Label with tooltip
<MetricCardLabel tooltip="Includes all statuses except backlog">
  Active tasks
</MetricCardLabel>`}</code>
      </pre>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>tooltip</code>
            </td>
            <td>
              <code>ReactNode</code>
            </td>
            <td>
              Content shown in a <code>TooltipContent</code> popup on hover. Wrap in{' '}
              <code>TooltipProvider</code> at the page level if multiple metric cards are on the
              same screen.
            </td>
          </tr>
        </tbody>
      </table>

      <h3 id="metric-card-content">MetricCardContent</h3>
      <p>
        A flex row that holds the value and differential side by side, aligned to the baseline. No
        additional props — pass children directly.
      </p>

      <h3 id="metric-card-value">MetricCardValue</h3>
      <p>
        The primary number display. Styled with{' '}
        <code>font-mono text-2xl font-bold tabular-nums</code> for clean numeric alignment. When{' '}
        <code>isLoading</code> is true on the parent <code>MetricCard</code>, renders a{' '}
        <code>Skeleton</code> sized to <code>h-8 w-24</code>.
      </p>

      <pre>
        <code>{`<MetricCardValue>1,284</MetricCardValue>
<MetricCardValue>$4.20</MetricCardValue>
<MetricCardValue>98.4%</MetricCardValue>`}</code>
      </pre>

      <h3 id="metric-card-differential">MetricCardDifferential</h3>
      <p>
        A change indicator with an arrow icon and colored text. Three variants reflect direction and
        sentiment. When <code>isLoading</code> is true, renders a <code>Skeleton</code>.
      </p>

      <table>
        <thead>
          <tr>
            <th>Variant</th>
            <th>Icon</th>
            <th>Color</th>
            <th>Use case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>positive</code>
            </td>
            <td>TrendingUp</td>
            <td>
              <code>text-emerald-400</code>
            </td>
            <td>Metric is up and that is good (task throughput, uptime, coverage)</td>
          </tr>
          <tr>
            <td>
              <code>negative</code>
            </td>
            <td>TrendingDown</td>
            <td>
              <code>text-red-400</code>
            </td>
            <td>Metric is down or represents an error count increasing</td>
          </tr>
          <tr>
            <td>
              <code>default</code>
            </td>
            <td>Minus</td>
            <td>
              <code>text-foreground-lighter</code>
            </td>
            <td>No change, or change direction is neutral / context-dependent</td>
          </tr>
        </tbody>
      </table>

      <pre>
        <code>{`<MetricCardDifferential variant="positive">+12 this week</MetricCardDifferential>
<MetricCardDifferential variant="negative">−3 vs last week</MetricCardDifferential>
<MetricCardDifferential variant="default">No change</MetricCardDifferential>`}</code>
      </pre>

      <blockquote>
        <p>
          <strong>Semantic note:</strong> The <code>positive</code> variant should reflect semantic
          goodness, not just numeric direction. A rising error count should use{' '}
          <code>negative</code> even though the number went up.
        </p>
      </blockquote>

      <h3 id="metric-card-sparkline">MetricCardSparkline</h3>
      <p>
        A miniature recharts <code>AreaChart</code> with a gradient fill and no axes. Intended to
        show trend shape at a glance. Height defaults to <code>40px</code> to fit naturally beneath
        the value row. When <code>isLoading</code> is true, renders a skeleton.
      </p>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>data</code>
            </td>
            <td>
              <code>Array&lt;Record&lt;string, string | number&gt;&gt;</code>
            </td>
            <td>—</td>
            <td>The data array passed to the recharts chart</td>
          </tr>
          <tr>
            <td>
              <code>dataKey</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>—</td>
            <td>Key of the numeric field to plot</td>
          </tr>
          <tr>
            <td>
              <code>color</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>'var(--brand-default)'</code>
            </td>
            <td>Stroke and gradient fill color</td>
          </tr>
          <tr>
            <td>
              <code>height</code>
            </td>
            <td>
              <code>number</code>
            </td>
            <td>
              <code>40</code>
            </td>
            <td>Height in px</td>
          </tr>
        </tbody>
      </table>

      <pre>
        <code>{`const sparkData = [
  { week: 'Feb 3',  count: 4 },
  { week: 'Feb 10', count: 7 },
  { week: 'Feb 17', count: 5 },
  { week: 'Feb 24', count: 11 },
]

<MetricCardSparkline data={sparkData} dataKey="count" />

// Custom color
<MetricCardSparkline
  data={errorData}
  dataKey="errors"
  color="var(--destructive-default)"
/>`}</code>
      </pre>

      <h2>Loading states</h2>

      <p>
        Set <code>isLoading</code> on the root <code>MetricCard</code>. All child display components
        automatically render appropriately sized skeletons — no conditional rendering needed in the
        consumer.
      </p>

      <pre>
        <code>{`// Loading state — all inner components show skeletons automatically
<MetricCard isLoading>
  <MetricCardHeader>
    <MetricCardLabel>Tasks completed</MetricCardLabel>
  </MetricCardHeader>
  <MetricCardContent>
    <MetricCardValue>—</MetricCardValue>
    <MetricCardDifferential variant="default">—</MetricCardDifferential>
  </MetricCardContent>
  <MetricCardSparkline data={[]} dataKey="count" />
</MetricCard>`}</code>
      </pre>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Skeleton size when loading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>MetricCardValue</code>
            </td>
            <td>
              <code>h-8 w-24</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>MetricCardDifferential</code>
            </td>
            <td>
              <code>h-4 w-12</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>MetricCardSparkline</code>
            </td>
            <td>
              Full width, <code>height</code> prop height
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Full example</h2>

      <pre>
        <code>{`import {
  MetricCard,
  MetricCardHeader,
  MetricCardLabel,
  MetricCardContent,
  MetricCardValue,
  MetricCardDifferential,
  MetricCardSparkline,
} from '@repo/ui/components/metric-card'

function TaskVelocityCard({
  weekCount,
  prevWeekCount,
  sparkData,
  isLoading,
}: {
  weekCount: number
  prevWeekCount: number
  sparkData: { week: string; count: number }[]
  isLoading: boolean
}) {
  const delta = weekCount - prevWeekCount
  const variant = delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'default'
  const label = delta === 0 ? 'No change' : \`\${delta > 0 ? '+' : ''}\${delta} vs last week\`

  return (
    <MetricCard isLoading={isLoading}>
      <MetricCardHeader>
        <MetricCardLabel tooltip="Tasks moved to 'done' this calendar week">
          This week
        </MetricCardLabel>
      </MetricCardHeader>

      <MetricCardContent>
        <MetricCardValue>{weekCount}</MetricCardValue>
        <MetricCardDifferential variant={variant}>{label}</MetricCardDifferential>
      </MetricCardContent>

      <MetricCardSparkline data={sparkData} dataKey="count" />
    </MetricCard>
  )
}`}</code>
      </pre>

      <h2>Grid layout</h2>

      <p>Metric cards work best in a responsive grid. Use Tailwind&apos;s grid utilities:</p>

      <pre>
        <code>{`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <MetricCard>…</MetricCard>
  <MetricCard>…</MetricCard>
  <MetricCard>…</MetricCard>
  <MetricCard>…</MetricCard>
</div>`}</code>
      </pre>

      <h2>Dependency note</h2>

      <p>
        <code>MetricCardSparkline</code> uses recharts internally. The same peer dependency
        requirement as the chart components applies: add <code>recharts &gt;=2.0.0</code> to the
        consuming app. If you use <code>MetricCard</code> without <code>MetricCardSparkline</code>,
        recharts is not required.
      </p>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design/charts" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Charts
          </span>
        </Link>
        <div />
      </div>
    </>
  );
}
