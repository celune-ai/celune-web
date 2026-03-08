import Link from 'next/link';

export const metadata = {
  title: 'Charts — Design System',
  description:
    'Chart component library for @repo/ui: composable wrappers around recharts with consistent dark-theme styling.',
};

export default function ChartsPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Components</p>
      <h1>Charts</h1>

      <p className="lead">
        The chart library in <code>@repo/ui</code> is a composable wrapper around{' '}
        <a href="https://recharts.org" target="_blank" rel="noopener noreferrer">
          recharts
        </a>{' '}
        that applies the design token vocabulary consistently. All chart components are dark-theme
        compatible and use semantic CSS custom properties — never hardcoded colors.
      </p>

      <blockquote>
        <p>
          <strong>Peer dependency:</strong> Add <code>recharts &gt;=2.0.0</code> to the consuming
          app&apos;s dependencies. <code>@repo/ui</code> lists it as a peer dependency only — it
          does not bundle recharts.
        </p>
      </blockquote>

      <h2>Architecture</h2>

      <p>
        The system is split into three layers. The core layer provides a shared context, Card
        wrapper, and slot components. The wrapper layer adds recharts-specific chart types. A
        standalone component handles the specialized stacked-bar log pattern.
      </p>

      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Import path</th>
            <th>Contents</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>chart.tsx</code>
            </td>
            <td>
              <code>@repo/ui/components/chart</code>
            </td>
            <td>
              Core context, <code>ChartCard</code>, <code>ChartHeader</code>,{' '}
              <code>ChartContent</code>, <code>ChartFooter</code>, <code>ChartTooltip</code>,{' '}
              <code>ChartConfig</code> type, <code>useChart</code> hook
            </td>
          </tr>
          <tr>
            <td>
              <code>bar-chart.tsx</code>
            </td>
            <td>
              <code>@repo/ui/components/bar-chart</code>
            </td>
            <td>
              <code>BarChartCard</code> — recharts <code>BarChart</code> wrapper
            </td>
          </tr>
          <tr>
            <td>
              <code>line-chart.tsx</code>
            </td>
            <td>
              <code>@repo/ui/components/line-chart</code>
            </td>
            <td>
              <code>LineChartCard</code> — recharts <code>LineChart</code> / <code>AreaChart</code>{' '}
              wrapper
            </td>
          </tr>
          <tr>
            <td>
              <code>logs-bar-chart.tsx</code>
            </td>
            <td>
              <code>@repo/ui/components/logs-bar-chart</code>
            </td>
            <td>
              <code>LogsBarChart</code> — compact stacked status bars
            </td>
          </tr>
        </tbody>
      </table>

      <h2>ChartConfig</h2>

      <p>
        Every chart that uses <code>ChartTooltip</code> receives a <code>config</code> prop of type{' '}
        <code>ChartConfig</code>. The config maps each data key to a display label, an optional
        fixed color, and an optional theme-aware color map.
      </p>

      <pre>
        <code>{`import type { ChartConfig } from '@repo/ui/components/chart'

// Fixed color (same in light and dark)
const config: ChartConfig = {
  count: { label: 'Tasks', color: 'var(--brand-default)' },
}

// Theme-aware color (resolve automatically based on data-theme)
const config: ChartConfig = {
  revenue: {
    label: 'Revenue',
    theme: {
      light: 'hsl(152.9deg 60% 52.9%)',
      dark:  'hsl(153.1deg 60.2% 52.7%)',
    },
  },
}`}</code>
      </pre>

      <p>
        When using <code>theme</code> colors, the current theme class on the root element determines
        which value is used. Use CSS custom properties via <code>var(--brand-default)</code> for
        colors that already adapt automatically through the token system — this is the preferred
        approach and avoids needing the <code>theme</code> key at all.
      </p>

      <h2>Core components</h2>

      <h3 id="chart-card">ChartCard</h3>
      <p>
        The root wrapper. Provides <code>ChartContext</code> with <code>isLoading</code>,{' '}
        <code>isDisabled</code>, and <code>config</code>. Renders as a <code>Card</code> from{' '}
        <code>@repo/ui/components/card</code>.
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
              Propagates to <code>ChartContent</code> which renders a Skeleton instead of children
            </td>
          </tr>
          <tr>
            <td>
              <code>isDisabled</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>
              Applies <code>opacity-60 pointer-events-none</code> to the whole card
            </td>
          </tr>
          <tr>
            <td>
              <code>config</code>
            </td>
            <td>
              <code>ChartConfig</code>
            </td>
            <td>
              <code>{'{}'}</code>
            </td>
            <td>
              Passed to <code>ChartTooltip</code> automatically via context
            </td>
          </tr>
        </tbody>
      </table>

      <h3 id="chart-header">ChartHeader</h3>
      <p>
        A two-column row inside the card: a left column holds the title and optional metric summary,
        a right column holds an optional action element (e.g. a refresh button or time-range
        selector).
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
              <code>title</code>
            </td>
            <td>
              <code>ReactNode</code>
            </td>
            <td>Chart title rendered as a small semibold label</td>
          </tr>
          <tr>
            <td>
              <code>metric</code>
            </td>
            <td>
              <code>ReactNode</code>
            </td>
            <td>Secondary line below the title — typically a summary stat or date range</td>
          </tr>
          <tr>
            <td>
              <code>action</code>
            </td>
            <td>
              <code>ReactNode</code>
            </td>
            <td>Right-aligned slot for buttons or controls</td>
          </tr>
        </tbody>
      </table>

      <h3 id="chart-content">ChartContent</h3>
      <p>
        The main chart area. Reads <code>isLoading</code> from context: if loading, renders a{' '}
        <code>Skeleton</code> at the specified height. If <code>isEmpty</code> is true, renders a
        centered empty state message. Otherwise renders children in a sized container.
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
              <code>height</code>
            </td>
            <td>
              <code>number</code>
            </td>
            <td>
              <code>224</code>
            </td>
            <td>Pixel height of the chart area (and the Skeleton when loading)</td>
          </tr>
          <tr>
            <td>
              <code>isEmpty</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>Shows centered empty state instead of children</td>
          </tr>
          <tr>
            <td>
              <code>emptyMessage</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>'No data available'</code>
            </td>
            <td>Text shown in empty state</td>
          </tr>
        </tbody>
      </table>

      <h3 id="chart-footer">ChartFooter</h3>
      <p>
        A below-chart slot for captions, data source notes, or legend summaries. Renders as a{' '}
        <code>CardFooter</code> with <code>text-foreground-lighter text-xs</code>.
      </p>

      <h3 id="chart-tooltip">ChartTooltip</h3>
      <p>
        A recharts <code>Tooltip</code> with consistent dark-surface styling. Reads{' '}
        <code>config</code> from <code>ChartContext</code> to resolve labels and colors for each
        data key. Can be placed inside any recharts chart.
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
              <code>labelFormatter</code>
            </td>
            <td>
              <code>(label: string) =&gt; string</code>
            </td>
            <td>Transform the x-axis label shown at the top of the tooltip</td>
          </tr>
          <tr>
            <td>
              <code>valueFormatter</code>
            </td>
            <td>
              <code>(value: number, name: string) =&gt; string</code>
            </td>
            <td>Format numeric values (e.g. add units, currency symbols)</td>
          </tr>
          <tr>
            <td>
              <code>config</code>
            </td>
            <td>
              <code>ChartConfig</code>
            </td>
            <td>Override the context config for this tooltip instance</td>
          </tr>
        </tbody>
      </table>

      <h3 id="use-chart">useChart</h3>
      <p>
        Hook that reads the nearest <code>ChartContext</code>. Use inside custom recharts content
        renderers or child components to access <code>isLoading</code>, <code>isDisabled</code>, and{' '}
        <code>config</code> without prop drilling.
      </p>

      <pre>
        <code>{`import { useChart } from '@repo/ui/components/chart'

function CustomLegend() {
  const { config } = useChart()
  return (
    <div>
      {Object.entries(config).map(([key, { label, color }]) => (
        <span key={key} style={{ color }}>{label}</span>
      ))}
    </div>
  )
}`}</code>
      </pre>

      <h2>Bar chart</h2>

      <h3 id="bar-chart-card">BarChartCard</h3>
      <p>
        A complete card with <code>ChartCard</code>, optional <code>ChartHeader</code>, a recharts{' '}
        <code>BarChart</code> inside <code>ChartContent</code>, and optional{' '}
        <code>ChartFooter</code>. Supports vertical bars (default) and horizontal bars.
      </p>

      <pre>
        <code>{`import { BarChartCard } from '@repo/ui/components/bar-chart'
import type { ChartConfig } from '@repo/ui/components/chart'

const config: ChartConfig = {
  count: { label: 'Tasks completed', color: 'var(--brand-default)' },
}

const data = [
  { week: 'Feb 3', count: 4 },
  { week: 'Feb 10', count: 7 },
  { week: 'Feb 17', count: 5 },
  { week: 'Feb 24', count: 11 },
]

<BarChartCard
  title="Weekly velocity"
  data={data}
  dataKey="count"
  config={config}
  categoryKey="week"
  height={224}
/>`}</code>
      </pre>

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
              <code>DataPoint[]</code>
            </td>
            <td>—</td>
            <td>recharts data array</td>
          </tr>
          <tr>
            <td>
              <code>dataKey</code>
            </td>
            <td>
              <code>string | string[]</code>
            </td>
            <td>—</td>
            <td>Key(s) to render as bars. Pass an array for grouped bars.</td>
          </tr>
          <tr>
            <td>
              <code>config</code>
            </td>
            <td>
              <code>ChartConfig</code>
            </td>
            <td>—</td>
            <td>Label and color mapping for each data key</td>
          </tr>
          <tr>
            <td>
              <code>categoryKey</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>
              <code>'name'</code>
            </td>
            <td>Key used for the category axis</td>
          </tr>
          <tr>
            <td>
              <code>layout</code>
            </td>
            <td>
              <code>'horizontal' | 'vertical'</code>
            </td>
            <td>
              <code>'horizontal'</code>
            </td>
            <td>
              <code>horizontal</code> = vertical bars (standard); <code>vertical</code> = horizontal
              bars (agent breakdown, rankings)
            </td>
          </tr>
          <tr>
            <td>
              <code>colorKey</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>—</td>
            <td>
              Property on each data point to use as per-bar fill (overrides <code>config</code>{' '}
              color)
            </td>
          </tr>
          <tr>
            <td>
              <code>showGrid</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>
              Render a <code>CartesianGrid</code> using <code>--border-default</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>showYAxis</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>true</code>
            </td>
            <td>Show the value axis</td>
          </tr>
          <tr>
            <td>
              <code>showXAxis</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>true</code>
            </td>
            <td>Show the category axis</td>
          </tr>
          <tr>
            <td>
              <code>height</code>
            </td>
            <td>
              <code>number</code>
            </td>
            <td>
              <code>224</code>
            </td>
            <td>Chart area height in px</td>
          </tr>
          <tr>
            <td>
              <code>syncId</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>—</td>
            <td>recharts syncId for linked tooltips across charts</td>
          </tr>
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
            <td>Shows Skeleton in place of chart</td>
          </tr>
          <tr>
            <td>
              <code>title</code>, <code>metric</code>, <code>action</code>, <code>footer</code>
            </td>
            <td>
              <code>ReactNode</code>
            </td>
            <td>—</td>
            <td>
              Forwarded to <code>ChartHeader</code> / <code>ChartFooter</code>; omitting them
              suppresses those sections entirely
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Horizontal bars (rankings / agent breakdown)</h4>
      <pre>
        <code>{`<BarChartCard
  title="Completions by agent"
  data={agentData}
  dataKey="count"
  config={config}
  categoryKey="label"
  layout="vertical"
  colorKey="color"   // each data point has a .color field
  showYAxis={true}
  height={224}
/>`}</code>
      </pre>

      <h4>Grouped bars</h4>
      <pre>
        <code>{`const config: ChartConfig = {
  done:    { label: 'Done',    color: 'var(--brand-default)' },
  blocked: { label: 'Blocked', color: 'var(--destructive-default)' },
}

<BarChartCard
  data={data}
  dataKey={['done', 'blocked']}
  config={config}
  categoryKey="week"
/>`}</code>
      </pre>

      <h2>Line chart</h2>

      <h3 id="line-chart-card">LineChartCard</h3>
      <p>
        Wraps recharts <code>LineChart</code> (or <code>AreaChart</code> when <code>showArea</code>{' '}
        is true). Supports multiple lines via array <code>dataKey</code>.
      </p>

      <pre>
        <code>{`import { LineChartCard } from '@repo/ui/components/line-chart'

const config: ChartConfig = {
  tokens: { label: 'Tokens', color: 'var(--brand-default)' },
}

<LineChartCard
  title="Token usage over time"
  data={data}
  dataKey="tokens"
  config={config}
  categoryKey="week"
  showArea
  height={224}
/>`}</code>
      </pre>

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
              <code>dataKey</code>
            </td>
            <td>
              <code>string | string[]</code>
            </td>
            <td>—</td>
            <td>Key(s) to render as lines</td>
          </tr>
          <tr>
            <td>
              <code>showArea</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>
              Switches to <code>AreaChart</code> with a gradient fill below each line
            </td>
          </tr>
          <tr>
            <td>
              <code>showDots</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>Render static dots on every data point (hover dots are always shown)</td>
          </tr>
          <tr>
            <td>
              <code>showGrid</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>Show horizontal grid lines</td>
          </tr>
          <tr>
            <td>
              <code>showYAxis</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>true</code>
            </td>
            <td>Show the value (Y) axis</td>
          </tr>
          <tr>
            <td>
              <code>showXAxis</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>true</code>
            </td>
            <td>Show the category (X) axis</td>
          </tr>
          <tr>
            <td>
              <code>syncId</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>—</td>
            <td>recharts syncId for linked charts</td>
          </tr>
          <tr>
            <td>
              <code>height</code>, <code>isLoading</code>, <code>title</code>, <code>metric</code>,{' '}
              <code>action</code>, <code>footer</code>
            </td>
            <td>—</td>
            <td>—</td>
            <td>
              Same as <code>BarChartCard</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Multi-line with area fills</h4>
      <pre>
        <code>{`const config: ChartConfig = {
  input_tokens:  { label: 'Input',  color: 'var(--brand-default)' },
  output_tokens: { label: 'Output', color: '#a78bfa' },
}

<LineChartCard
  data={data}
  dataKey={['input_tokens', 'output_tokens']}
  config={config}
  categoryKey="date"
  showArea
  showGrid
/>`}</code>
      </pre>

      <h2>Logs bar chart</h2>

      <h3 id="logs-bar-chart">LogsBarChart</h3>
      <p>
        A compact stacked bar chart for visualising status counts over time. Inspired by the
        Supabase dashboard log viewer. Status colors are fixed semantic constants:{' '}
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: '#34B27B' }} />
          <code className="text-xs">ok</code>
        </span>
        {', '}
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: '#F59E0B' }} />
          <code className="text-xs">warning</code>
        </span>
        {', '}
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: '#F04438' }} />
          <code className="text-xs">error</code>
        </span>
        .
      </p>

      <p>
        Unlike the other chart components, <code>LogsBarChart</code> is a standalone component — it
        does not use <code>ChartCard</code> internally. Embed it inside any container with the
        height you need.
      </p>

      <pre>
        <code>{`import { LogsBarChart } from '@repo/ui/components/logs-bar-chart'
import type { LogsDataPoint } from '@repo/ui/components/logs-bar-chart'

const data: LogsDataPoint[] = [
  { timestamp: '2026-02-28T00:00:00Z', ok_count: 142, error_count: 3, warning_count: 8 },
  { timestamp: '2026-02-28T01:00:00Z', ok_count: 98,  error_count: 0, warning_count: 2 },
  { timestamp: '2026-02-28T02:00:00Z', ok_count: 203, error_count: 11, warning_count: 4 },
]

// Compact (default h-24, no axis labels)
<LogsBarChart data={data} />

// With timestamps on the X axis
<LogsBarChart data={data} height={96} showTimestamps />

// Inside a card header
<Card>
  <CardHeader>
    <CardTitle>API Health — Last 24h</CardTitle>
  </CardHeader>
  <CardContent className="px-4 pb-4 pt-0">
    <LogsBarChart data={data} />
  </CardContent>
</Card>`}</code>
      </pre>

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
              <code>LogsDataPoint[]</code>
            </td>
            <td>—</td>
            <td>
              Array of <code>{'{ timestamp, ok_count, error_count, warning_count }'}</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>height</code>
            </td>
            <td>
              <code>number</code>
            </td>
            <td>
              <code>96</code>
            </td>
            <td>Height in px</td>
          </tr>
          <tr>
            <td>
              <code>showTimestamps</code>
            </td>
            <td>
              <code>boolean</code>
            </td>
            <td>
              <code>false</code>
            </td>
            <td>Render an X axis with locale-formatted HH:MM labels</td>
          </tr>
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
            <td>Renders a Skeleton at the given height</td>
          </tr>
        </tbody>
      </table>

      <h2>Composing a custom chart</h2>

      <p>
        Use the bare <code>Chart</code> provider (not <code>ChartCard</code>) when you need the
        context and <code>ChartTooltip</code> without the Card wrapper — for example, embedding a
        chart inside an existing panel.
      </p>

      <pre>
        <code>{`import {
  Chart,
  ChartTooltip,
  type ChartConfig,
} from '@repo/ui/components/chart'
import { ResponsiveContainer, LineChart, Line } from 'recharts'

const config: ChartConfig = {
  value: { label: 'Score', color: 'var(--brand-default)' },
}

<Chart config={config} isLoading={loading} className="h-40 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <ChartTooltip />
      <Line type="monotone" dataKey="value" stroke="var(--brand-default)" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
</Chart>`}</code>
      </pre>

      <h2>Styling reference</h2>

      <p>
        All chart components use semantic tokens. The axis tick color is{' '}
        <code>var(--foreground-lighter)</code> at <code>fontSize 11</code>. Grid lines use{' '}
        <code>var(--border-default)</code>. Tooltip background is <code>bg-surface-200</code> with a{' '}
        <code>border-border</code> stroke and <code>rounded-lg</code> corners.
      </p>

      <table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Token / class</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Axis ticks</td>
            <td>
              <code>var(--foreground-lighter)</code>, <code>fontSize: 11</code>
            </td>
          </tr>
          <tr>
            <td>Axis lines / tick lines</td>
            <td>
              Hidden (<code>axisLine=false</code>, <code>tickLine=false</code>)
            </td>
          </tr>
          <tr>
            <td>Grid</td>
            <td>
              <code>var(--border-default)</code>, dashed <code>3 3</code>
            </td>
          </tr>
          <tr>
            <td>Tooltip background</td>
            <td>
              <code>bg-surface-200</code>
            </td>
          </tr>
          <tr>
            <td>Tooltip border</td>
            <td>
              <code>border-border rounded-lg</code>
            </td>
          </tr>
          <tr>
            <td>Bar radius (vertical)</td>
            <td>
              <code>[4, 4, 0, 0]</code> top corners only
            </td>
          </tr>
          <tr>
            <td>Bar radius (horizontal)</td>
            <td>
              <code>[0, 4, 4, 0]</code> right corners only
            </td>
          </tr>
          <tr>
            <td>Line stroke width</td>
            <td>
              <code>2</code>
            </td>
          </tr>
          <tr>
            <td>Hover dot radius</td>
            <td>
              <code>4</code>
            </td>
          </tr>
          <tr>
            <td>Primary chart color</td>
            <td>
              <code>var(--brand-default)</code>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <Link href="/design/components" className="group flex flex-col gap-0.5">
          <span className="text-foreground-muted text-xs">Previous</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            ← Components
          </span>
        </Link>
        <Link href="/design/metrics" className="group flex flex-col items-end gap-0.5">
          <span className="text-foreground-muted text-xs">Next</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            Metric Cards →
          </span>
        </Link>
      </div>
    </>
  );
}
