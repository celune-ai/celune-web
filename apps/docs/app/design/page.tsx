import Link from 'next/link';

export const metadata = {
  title: 'Introduction — Design System',
  description:
    'An overview of the Smejkal Design System: the stack, principles, and package structure.',
};

export default function IntroductionPage() {
  return (
    <>
      <p className="text-foreground-muted not-prose mb-2 text-sm">Getting Started</p>
      <h1>Introduction</h1>

      <p className="lead">
        The Smejkal Design System is a unified set of tokens, components, and conventions that keeps
        the admin dashboard and this documentation site visually consistent. It is built on Tailwind
        CSS v4, Radix UI primitives, class-variance-authority, and a token vocabulary that lives in{' '}
        <code>@repo/ui</code>.
      </p>

      <h2>Stack</h2>

      <p>
        Every layer of the system has a specific job. Tailwind v4 handles utility classes and the{' '}
        <code>@theme inline</code> bridge that turns CSS custom properties into utilities. Radix UI
        provides the accessible primitive behavior for interactive components. CVA manages variant
        logic so component APIs stay clean. Lucide React supplies all icons through a single
        consistent set.
      </p>

      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>Technology</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Styling engine</td>
            <td>Tailwind CSS v4</td>
            <td>
              Utility classes, token bridge via <code>@theme inline</code>
            </td>
          </tr>
          <tr>
            <td>Primitives</td>
            <td>Radix UI</td>
            <td>Accessible keyboard behavior, focus management, ARIA</td>
          </tr>
          <tr>
            <td>Variant API</td>
            <td>class-variance-authority (CVA)</td>
            <td>Type-safe component variant definitions</td>
          </tr>
          <tr>
            <td>Class merging</td>
            <td>
              tailwind-merge + clsx via <code>cn()</code>
            </td>
            <td>Conflict-free class composition at runtime</td>
          </tr>
          <tr>
            <td>Icons</td>
            <td>lucide-react</td>
            <td>Named icon imports, consistent stroke weight</td>
          </tr>
          <tr>
            <td>Shared tokens</td>
            <td>
              <code>@repo/ui/theme.css</code>
            </td>
            <td>Single source of truth for all CSS custom properties</td>
          </tr>
          <tr>
            <td>Shared components</td>
            <td>
              <code>@repo/ui/src/components/</code>
            </td>
            <td>Atom-level components consumed by all apps</td>
          </tr>
        </tbody>
      </table>

      <h2>Key principles</h2>

      <h3>Token-driven</h3>
      <p>
        Every color, radius, and shadow is a CSS custom property. Apps import the shared{' '}
        <code>@repo/ui/theme.css</code> token file and expose each token as a Tailwind utility via{' '}
        <code>@theme inline</code> in their own <code>globals.css</code>. Changing a design decision
        in one place propagates to every app automatically.
      </p>

      <h3>Dark-first</h3>
      <p>
        Both the admin app and this docs site apply <code>class="dark"</code> to the HTML element.
        The token system defines light mode values in <code>:root</code> and dark overrides under
        the <code>.dark</code> selector. Dark is the default; light mode support is available
        whenever it is needed.
      </p>

      <h3>Accessible by default</h3>
      <p>
        All interactive components are built on Radix UI primitives, which provide keyboard
        navigation, focus trap management, and correct ARIA attributes out of the box. Focus rings
        use the brand green at 40% opacity so they are visible without being distracting.
      </p>

      <h3>Composable</h3>
      <p>
        Atom components live in <code>@repo/ui/src/components/</code> and are imported through the
        workspace path alias <code>@repo/ui/components/[name]</code>. Page-level patterns — data
        tables, confirmation dialogs, action bars — are composed from atoms inside each app rather
        than being baked into the shared package.
      </p>

      <h2>Package structure</h2>

      <p>
        The monorepo is a Turborepo + pnpm workspace. Design system concerns are spread across three
        packages:
      </p>

      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Contents</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>@repo/ui</code>
            </td>
            <td>
              Shared components, <code>theme.css</code> token file, <code>cn()</code> utility, CVA
              helpers
            </td>
          </tr>
          <tr>
            <td>
              <code>@repo/types</code>
            </td>
            <td>Shared TypeScript interfaces (Supabase row types, component prop types)</td>
          </tr>
          <tr>
            <td>
              <code>@repo/config</code>
            </td>
            <td>Shared ESLint, TypeScript, and Tailwind configuration presets</td>
          </tr>
        </tbody>
      </table>

      <p>
        Each app — <code>apps/web</code>, <code>apps/admin</code>, and <code>apps/docs</code> —
        installs the workspace packages and adds its own
        <code>globals.css</code> with app-specific <code>@theme inline</code>
        overrides where needed.
      </p>

      <h2>How to use this documentation</h2>

      <p>
        The sections in the left sidebar follow the order you would encounter each layer when
        building a new feature: start with accessibility constraints, then choose colors from the
        token vocabulary, follow writing conventions for copy, use icons consistently, understand
        the Tailwind utility mapping, grasp the theming architecture, and finally apply the
        typography system for long-form content.
      </p>

      <blockquote>
        <p>
          This design system is intentionally opinionated. When in doubt, prefer the token over a
          hard-coded value, prefer an existing component over a one-off, and prefer the established
          naming convention over a new one.
        </p>
      </blockquote>

      {/* Prev / Next nav */}
      <div className="not-prose border-border mt-16 flex items-center justify-between border-t pt-8 text-sm">
        <div />
        <Link href="/design/accessibility" className="group flex flex-col items-end gap-0.5">
          <span className="text-foreground-muted text-xs">Next</span>
          <span className="text-foreground-lighter group-hover:text-foreground font-medium transition-colors">
            Accessibility →
          </span>
        </Link>
      </div>
    </>
  );
}
