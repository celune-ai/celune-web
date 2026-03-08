export const metadata = {
  title: 'Components — Design System',
  description: 'All atom components in the @repo/ui shared library with usage guidance.',
};

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

      <h2>Atom components</h2>

      <h3 id="button">Button</h3>
      <p>
        Import: <code>@repo/ui/components/button</code>
      </p>
      <p>
        The primary action component. Variants map to semantic intent. All variants share the same
        size scale and focus ring.
      </p>

      <table>
        <thead>
          <tr>
            <th>Variant</th>
            <th>Use case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>default</code> / <code>primary</code>
            </td>
            <td>Primary CTAs, form submits, strong positive actions</td>
          </tr>
          <tr>
            <td>
              <code>secondary</code>
            </td>
            <td>Less prominent actions, paired with a primary button</td>
          </tr>
          <tr>
            <td>
              <code>outline</code>
            </td>
            <td>Tertiary actions, cancel buttons</td>
          </tr>
          <tr>
            <td>
              <code>ghost</code>
            </td>
            <td>Icon buttons, contextual actions in dense UI</td>
          </tr>
          <tr>
            <td>
              <code>destructive</code>
            </td>
            <td>Delete, remove, irreversible actions</td>
          </tr>
          <tr>
            <td>
              <code>warning</code>
            </td>
            <td>Actions with side effects, non-destructive but caution-warranting</td>
          </tr>
          <tr>
            <td>
              <code>link</code>
            </td>
            <td>In-text navigation, lowest priority actions</td>
          </tr>
        </tbody>
      </table>

      <h4>Size scale</h4>
      <p>
        Three sizes: <strong>sm</strong> (28px), <strong>md</strong> (32px, default),{' '}
        <strong>lg</strong> (40px). Each has a matching icon-only variant.
      </p>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Height</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>sm</code>
            </td>
            <td>28px (h-7)</td>
            <td>
              Filter bars, toggle pills, inline controls. Used in filter rows and toolbars (type
              filters, sort modes, sprint toggles).
            </td>
          </tr>
          <tr>
            <td>
              <code>md</code> (default)
            </td>
            <td>32px (h-8)</td>
            <td>
              Action bar buttons, form actions, dialogs. The standard size for page-level actions
              like &quot;New Task&quot;, &quot;View PRD&quot;, split buttons.
            </td>
          </tr>
          <tr>
            <td>
              <code>lg</code>
            </td>
            <td>40px (h-10)</td>
            <td>Hero CTAs, landing page buttons.</td>
          </tr>
          <tr>
            <td>
              <code>icon</code>
            </td>
            <td>32px (h-8 w-8)</td>
            <td>Square icon-only button at md size.</td>
          </tr>
          <tr>
            <td>
              <code>icon-sm</code>
            </td>
            <td>28px (h-7 w-7)</td>
            <td>
              Small square icon button. Used for inline edit/save icons on naked inputs and compact
              toolbar controls.
            </td>
          </tr>
          <tr>
            <td>
              <code>icon-md</code>
            </td>
            <td>32px (h-8 w-8)</td>
            <td>Medium square icon button. Used for action bar icon menus (e.g. MoreVertical).</td>
          </tr>
        </tbody>
      </table>

      <pre>
        <code>{`import { Button } from '@repo/ui/components/button'

<Button>Save changes</Button>              {/* md (default) */}
<Button variant="outline">Cancel</Button>
<Button variant="destructive">Delete project</Button>
<Button size="sm" variant="outline">Filter</Button>
<Button size="lg">Get Started</Button>
<Button size="icon-sm" variant="outline"><Pencil /></Button>
<Button size="icon-md" variant="ghost"><MoreVertical /></Button>`}</code>
      </pre>

      <h3 id="badge">Badge</h3>
      <p>
        Import: <code>@repo/ui/components/badge</code>
      </p>
      <p>
        Status indicators, count chips, and classification tags. Renders as an{' '}
        <code>inline-flex</code> pill. All variants inherit the base size and border-radius — only
        color changes.
      </p>

      <table>
        <thead>
          <tr>
            <th>Variant</th>
            <th>Color</th>
            <th>Use case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>default</code>
            </td>
            <td>Brand (solid)</td>
            <td>Primary label, selected state</td>
          </tr>
          <tr>
            <td>
              <code>secondary</code>
            </td>
            <td>Surface-300 background</td>
            <td>Neutral metadata, normal priority</td>
          </tr>
          <tr>
            <td>
              <code>outline</code>
            </td>
            <td>Border only</td>
            <td>Subtle tags, assignee chips</td>
          </tr>
          <tr>
            <td>
              <code>brand</code>
            </td>
            <td>Brand-200 background, brand-600 text</td>
            <td>Project names, brand-associated labels</td>
          </tr>
          <tr>
            <td>
              <code>success</code>
            </td>
            <td>Brand-200 background (alias of brand)</td>
            <td>Completed state, positive outcomes</td>
          </tr>
          <tr>
            <td>
              <code>warning</code>
            </td>
            <td>Warning-200 background, warning-600 text</td>
            <td>High priority, caution states</td>
          </tr>
          <tr>
            <td>
              <code>destructive</code>
            </td>
            <td>Destructive-200 background, destructive-600 text</td>
            <td>Urgent priority, error states, deletion</td>
          </tr>
          <tr>
            <td>
              <code>ghost</code>
            </td>
            <td>Surface-200 background, lighter text</td>
            <td>Low priority, inactive or deprioritized labels</td>
          </tr>
        </tbody>
      </table>

      <pre>
        <code>{`import { Badge } from '@repo/ui/components/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Normal</Badge>
<Badge variant="warning">High</Badge>
<Badge variant="destructive">Urgent</Badge>
<Badge variant="ghost">Low</Badge>
<Badge variant="brand">Project name</Badge>
<Badge variant="outline">Rick</Badge>`}</code>
      </pre>

      <p>
        For truncating text inside a badge (e.g. long project names), wrap the content in a{' '}
        <code>span</code> with <code>truncate</code> and constrain the badge with{' '}
        <code>max-w-full</code>:
      </p>

      <pre>
        <code>{`<Badge variant="brand" className="max-w-full">
  <span className="truncate">{projectName}</span>
</Badge>`}</code>
      </pre>

      <h3 id="input">Input</h3>
      <p>
        Import: <code>@repo/ui/components/input</code>
      </p>
      <p>
        Standard text input with brand-green focus ring. Uses <code>border-border-control</code> at
        rest and <code>ring-2 ring-brand/40 border-brand</code> on focus.
      </p>

      <h3 id="naked-input">Naked Input</h3>
      <p>
        Import: <code>@repo/ui/components/naked-input</code>
      </p>
      <p>
        A borderless inline-edit input that auto-sizes to its content width. Used for in-place
        editing of titles, names, and other text that should look like static text until clicked.
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
              <code>value</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>Current input value</td>
          </tr>
          <tr>
            <td>
              <code>onChange</code>
            </td>
            <td>
              <code>(value: string) =&gt; void</code>
            </td>
            <td>Called on every keystroke</td>
          </tr>
          <tr>
            <td>
              <code>onSave</code>
            </td>
            <td>
              <code>(value: string) =&gt; void</code>
            </td>
            <td>Called on blur, Enter, or Tab</td>
          </tr>
          <tr>
            <td>
              <code>onCancel</code>
            </td>
            <td>
              <code>() =&gt; void</code>
            </td>
            <td>Called on Escape</td>
          </tr>
          <tr>
            <td>
              <code>inputClassName</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>Applied to both the input and the hidden sizer span for font matching</td>
          </tr>
        </tbody>
      </table>

      <p>Behavior:</p>
      <ul>
        <li>Auto-focuses on mount with cursor at end of text (not selecting all)</li>
        <li>
          Width auto-sizes to content via a hidden sizer <code>span</code>
        </li>
        <li>Transparent background, no border — blends with surrounding text</li>
        <li>
          Pair with a <code>Button size=&quot;icon-xs&quot;</code> for a save/cancel icon
        </li>
      </ul>

      <pre>
        <code>{`import { NakedInput } from '@repo/ui/components/naked-input'

// Editing state
const [editing, setEditing] = useState(false)
const [draft, setDraft] = useState(project.name)

// In JSX — toggle between static text and naked input
{editing ? (
  <NakedInput
    value={draft}
    onChange={setDraft}
    onSave={handleSave}
    onCancel={() => setEditing(false)}
    inputClassName="text-xl font-medium text-foreground"
  />
) : (
  <button onClick={() => setEditing(true)}>
    {project.name}
    <Button size="icon-sm" variant="outline">
      <Pencil />
    </Button>
  </button>
)}`}</code>
      </pre>

      <h3 id="textarea">Textarea</h3>
      <p>
        Import: <code>@repo/ui/components/textarea</code>
      </p>
      <p>Same focus and border treatment as Input. Set rows for height.</p>

      <h3 id="select">Select</h3>
      <p>
        Import: <code>@repo/ui/components/select</code>
      </p>
      <p>
        Radix Select with matching input styling. Exports: <code>Select</code>,{' '}
        <code>SelectTrigger</code>, <code>SelectContent</code>, <code>SelectItem</code>,{' '}
        <code>SelectValue</code>, <code>SelectGroup</code>, <code>SelectSeparator</code>.
      </p>

      <h3 id="checkbox">Checkbox</h3>
      <p>
        Import: <code>@repo/ui/components/checkbox</code>
      </p>
      <p>
        Radix Checkbox. Checked state uses <code>bg-brand</code>. Pair with a <code>Label</code>{' '}
        component using Radix&apos;s <code>htmlFor</code> / <code>id</code> pattern.
      </p>

      <h3 id="switch">Switch</h3>
      <p>
        Import: <code>@repo/ui/components/switch</code>
      </p>
      <p>
        Radix Switch. On state: <code>bg-brand</code>. Off: <code>bg-surface-400</code>.
      </p>

      <h3 id="radio-group">Radio Group</h3>
      <p>
        Import: <code>@repo/ui/components/radio-group</code>
      </p>
      <p>
        Exports: <code>RadioGroup</code>, <code>RadioGroupItem</code>.
      </p>

      <h3 id="label">Label</h3>
      <p>
        Import: <code>@repo/ui/components/label</code>
      </p>
      <p>
        Radix Label. Automatically handles <code>peer-disabled</code> opacity. Always pair with form
        controls using matching <code>id</code> /<code>htmlFor</code>.
      </p>

      <h3 id="card">Card</h3>
      <p>
        Import: <code>@repo/ui/components/card</code>
      </p>
      <p>
        Surface container using <code>bg-surface-100 border-border</code>. Exports:{' '}
        <code>Card</code>, <code>CardHeader</code>, <code>CardTitle</code>,{' '}
        <code>CardDescription</code>, <code>CardContent</code>, <code>CardFooter</code>.
      </p>

      <h3 id="alert">Alert</h3>
      <p>
        Import: <code>@repo/ui/components/alert</code>
      </p>
      <p>
        Callout boxes. Variants: <code>default</code>, <code>info</code>, <code>success</code>,{' '}
        <code>warning</code>, <code>destructive</code>. All use the corresponding <code>-200</code>{' '}
        background with <code>-600</code> text.
      </p>

      <h3 id="skeleton">Skeleton</h3>
      <p>
        Import: <code>@repo/ui/components/skeleton</code>
      </p>
      <p>Animated pulse loading placeholder. Use in place of content while data loads.</p>

      <h3 id="progress">Progress</h3>
      <p>
        Import: <code>@repo/ui/components/progress</code>
      </p>
      <p>
        Radix Progress with brand fill. Accepts a <code>value</code> prop (0–100).
      </p>

      <h3 id="avatar">Avatar</h3>
      <p>
        Import: <code>@repo/ui/components/avatar</code>
      </p>
      <p>
        Radix Avatar with <code>bg-brand-200 text-brand-600</code> fallback initials. Exports:{' '}
        <code>Avatar</code>, <code>AvatarImage</code>, <code>AvatarFallback</code>.
      </p>

      <h3 id="dialog">Dialog</h3>
      <p>
        Import: <code>@repo/ui/components/dialog</code>
      </p>
      <p>
        Radix Dialog with <code>bg-surface-100</code> background. Exports: <code>Dialog</code>,{' '}
        <code>DialogContent</code>, <code>DialogHeader</code>, <code>DialogTitle</code>,{' '}
        <code>DialogDescription</code>, <code>DialogFooter</code>, <code>DialogClose</code>,{' '}
        <code>DialogTrigger</code>.
      </p>

      <h3 id="popover">Popover</h3>
      <p>
        Import: <code>@repo/ui/components/popover</code>
      </p>
      <p>
        Radix Popover. <code>bg-surface-100 border-border</code> with slide-in animations. Exports:{' '}
        <code>Popover</code>, <code>PopoverTrigger</code>, <code>PopoverContent</code>,{' '}
        <code>PopoverAnchor</code>.
      </p>

      <h3 id="tooltip">Tooltip</h3>
      <p>
        Import: <code>@repo/ui/components/tooltip</code>
      </p>
      <p>
        Radix Tooltip. Dark <code>bg-surface-400</code> background for contrast against light and
        dark surfaces. Wrap app root with <code>TooltipProvider</code>. Exports:{' '}
        <code>Tooltip</code>, <code>TooltipTrigger</code>, <code>TooltipContent</code>,{' '}
        <code>TooltipProvider</code>.
      </p>

      <h3 id="tabs">Tabs</h3>
      <p>
        Import: <code>@repo/ui/components/tabs</code>
      </p>
      <p>
        Radix Tabs. Active tab: <code>bg-background text-foreground</code>
        elevated on a <code>bg-surface-200</code> pill background. Exports: <code>Tabs</code>,{' '}
        <code>TabsList</code>, <code>TabsTrigger</code>, <code>TabsContent</code>.
      </p>

      <h3 id="accordion">Accordion</h3>
      <p>
        Import: <code>@repo/ui/components/accordion</code>
      </p>
      <p>
        Radix Accordion with CSS-variable-driven height animation (
        <code>animate-accordion-down</code> / <code>animate-accordion-up</code>
        ). Requires the keyframes defined in admin&apos;s <code>globals.css</code>. Exports:{' '}
        <code>Accordion</code>, <code>AccordionItem</code>, <code>AccordionTrigger</code>,{' '}
        <code>AccordionContent</code>.
      </p>

      <h3 id="table">Table</h3>
      <p>
        Import: <code>@repo/ui/components/table</code>
      </p>
      <p>
        Native HTML table with design token classes. Hover rows use <code>bg-surface-200/50</code>.
        Exports: <code>Table</code>, <code>TableHeader</code>, <code>TableBody</code>,{' '}
        <code>TableRow</code>, <code>TableHead</code>, <code>TableCell</code>,{' '}
        <code>TableFooter</code>, <code>TableCaption</code>.
      </p>

      <h3 id="scroll-area">Scroll Area</h3>
      <p>
        Import: <code>@repo/ui/components/scroll-area</code>
      </p>
      <p>
        Radix ScrollArea. Styled scrollbar thumb using <code>bg-border-strong</code>. Exports:{' '}
        <code>ScrollArea</code>, <code>ScrollBar</code>.
      </p>

      <h3 id="toggle">Toggle</h3>
      <p>
        Import: <code>@repo/ui/components/toggle</code>
      </p>
      <p>
        Radix Toggle. On state: <code>bg-surface-300 text-foreground</code>. Variants:{' '}
        <code>default</code> (transparent), <code>outline</code>
        (bordered).
      </p>

      <h2>Fragment patterns</h2>

      <p>
        Fragment components are higher-order patterns composed from atoms. They are built in each
        app rather than shared via <code>@repo/ui</code> since they are layout-specific. Common
        patterns:
      </p>

      <ul>
        <li>
          <strong>Page header</strong> — Breadcrumb + h1 + description + action button(s)
        </li>
        <li>
          <strong>Form item layout</strong> — Label + Input/Select + description + error message
        </li>
        <li>
          <strong>Confirmation modal</strong> — Dialog + destructive Button + cancel
        </li>
        <li>
          <strong>Data table</strong> — Table + sort headers + pagination
        </li>
        <li>
          <strong>Metric card</strong> — Card + large value + label + trend indicator
        </li>
        <li>
          <strong>Empty state</strong> — Icon + heading + description + CTA Button
        </li>
      </ul>

      <h2>Chart components</h2>

      <p>
        The chart library lives in <code>@repo/ui</code> alongside the atom components. It wraps
        recharts with consistent token-based styling and composable slot components. See the
        dedicated documentation pages for full API reference and usage examples.
      </p>

      <ul>
        <li>
          <a href="/design/charts">
            <strong>Charts</strong>
          </a>{' '}
          — <code>ChartCard</code>, <code>BarChartCard</code>, <code>LineChartCard</code>,{' '}
          <code>LogsBarChart</code>, <code>ChartTooltip</code>
        </li>
        <li>
          <a href="/design/metrics">
            <strong>Metric Cards</strong>
          </a>{' '}
          — <code>MetricCard</code>, <code>MetricCardValue</code>,{' '}
          <code>MetricCardDifferential</code>, <code>MetricCardSparkline</code>
        </li>
      </ul>
    </>
  );
}
