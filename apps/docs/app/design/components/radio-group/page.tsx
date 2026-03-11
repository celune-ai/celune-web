import { CodeBlock } from '@/components/code-block';

export const metadata = {
  title: 'Radio Group - Components - Design System',
  description:
    'Selects one option from a set of mutually exclusive choices.',
};

export default function RadioGroupPage() {
  return (
    <>
      <h1>Radio Group</h1>
      <p>
        Selects one option from a set of mutually exclusive choices. Built on Radix RadioGroup,
        the selected indicator uses <code>bg-brand</code> (<code>--brand</code>) for consistency
        with other form controls.
      </p>

      <h2>Installation</h2>

      <CodeBlock code={`import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group'`} lang="tsx" />

      <h2>Examples</h2>

      <h3>Basic</h3>

      <CodeBlock code={`import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group'
import { Label } from '@repo/ui/components/label'

<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`} lang="tsx" />

      <h3>Controlled</h3>

      <CodeBlock code={`const [plan, setPlan] = useState('free')

<RadioGroup value={plan} onValueChange={setPlan}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="free" id="free" />
    <Label htmlFor="free">Free</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="pro" id="pro" />
    <Label htmlFor="pro">Pro - $12/mo</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="team" id="team" />
    <Label htmlFor="team">Team - $49/mo</Label>
  </div>
</RadioGroup>`} lang="tsx" />

      <h3>With descriptions</h3>
      <p>Add helper text below each label for complex choices like plan selection.</p>

      <CodeBlock code={`<RadioGroup defaultValue="email">
  <div className="flex items-start gap-2">
    <RadioGroupItem value="email" id="notify-email" className="mt-1" />
    <div>
      <Label htmlFor="notify-email">Email</Label>
      <p className="text-foreground-muted text-xs">
        Receive notifications via email.
      </p>
    </div>
  </div>
  <div className="flex items-start gap-2">
    <RadioGroupItem value="sms" id="notify-sms" className="mt-1" />
    <div>
      <Label htmlFor="notify-sms">SMS</Label>
      <p className="text-foreground-muted text-xs">
        Receive notifications via text message.
      </p>
    </div>
  </div>
</RadioGroup>`} lang="tsx" />

      <h2>Usage guidelines</h2>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Use a RadioGroup when there are 2-5 mutually exclusive options and users benefit
            from seeing all choices at once.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use a RadioGroup for 6+ options. Use a Select dropdown to save space and reduce
            visual complexity.
          </p>
        </div>
      </div>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border-brand/40 rounded-lg border-t-2 p-4">
          <p className="text-brand-600 mb-2 text-sm font-medium">Do</p>
          <p className="text-foreground-light text-sm">
            Always select a sensible default so the form is never in an empty state.
          </p>
        </div>
        <div className="border-destructive-500/40 rounded-lg border-t-2 p-4">
          <p className="text-destructive-500 mb-2 text-sm font-medium">Don&apos;t</p>
          <p className="text-foreground-light text-sm">
            Use radio buttons for multi-select scenarios. Use Checkboxes when users can pick
            more than one option.
          </p>
        </div>
      </div>

      <h2>API reference</h2>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>value</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>defaultValue</code></td>
            <td><code>string</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>onValueChange</code></td>
            <td><code>(value: string) =&gt; void</code></td>
            <td>--</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
          </tr>
          <tr>
            <td><code>orientation</code></td>
            <td><code>{`"horizontal" | "vertical"`}</code></td>
            <td><code>{`"vertical"`}</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Accessibility</h2>

      <h3>Keyboard interactions</h3>

      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ArrowDown</code> / <code>ArrowRight</code></td>
            <td>Moves focus and selection to the next radio item</td>
          </tr>
          <tr>
            <td><code>ArrowUp</code> / <code>ArrowLeft</code></td>
            <td>Moves focus and selection to the previous radio item</td>
          </tr>
          <tr>
            <td><code>Tab</code></td>
            <td>Moves focus to the radio group (or out of it)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Radix RadioGroup renders with <code>role=&quot;radiogroup&quot;</code> and each item
        with <code>role=&quot;radio&quot;</code>. The group manages <code>aria-checked</code>{' '}
        automatically. Always pair each <code>RadioGroupItem</code> with a visible{' '}
        <code>Label</code>.
      </p>

      <h2>Related components</h2>
      <ul>
        <li><a href="/design/components/select">Select</a> — Better for 5+ options in a compact dropdown</li>
        <li><a href="/design/components/checkbox">Checkbox</a> — For multi-select (non-exclusive) choices</li>
        <li><a href="/design/components/label">Label</a> — Required companion for each radio item</li>
      </ul>
    </>
  );
}
