'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

/* ----------------------------------------------------------------
   Nav item
   ---------------------------------------------------------------- */
function NavItem({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`block truncate rounded-md px-2 py-1.5 text-[14px] transition-colors ${
        active
          ? 'bg-surface-200 text-foreground'
          : 'text-foreground-light hover:bg-surface-100 hover:text-foreground'
      }`}
    >
      {label}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground px-2 pt-2 pb-3 text-[12px] tracking-[0.08em] uppercase" style={{ fontFamily: 'var(--font-soehne-kraftig)' }}>
      {children}
    </p>
  );
}

/* ----------------------------------------------------------------
   Design sidebar
   ---------------------------------------------------------------- */
const DESIGN_SECTIONS = [
  {
    label: 'Foundations',
    items: [
      { href: '/design/colors', label: 'Color Usage' },
      { href: '/design/typography', label: 'Typography' },
      { href: '/design/spacing', label: 'Spacing' },
      { href: '/design/icons', label: 'Icons' },
    ],
  },
  {
    label: 'Guidelines',
    items: [
      { href: '/design/accessibility', label: 'Accessibility' },
      { href: '/design/writing', label: 'Writing' },
    ],
  },
  {
    label: 'Technical',
    items: [
      { href: '/design/theming', label: 'Theming' },
      { href: '/design/tailwind-classes', label: 'Tailwind Classes' },
    ],
  },
  {
    label: 'Data',
    items: [
      { href: '/design/charts', label: 'Charts' },
      { href: '/design/metrics', label: 'Metric Cards' },
    ],
  },
];

const COMPONENT_ITEMS = [
  { href: '/design/components', label: 'Overview' },
  { href: '/design/components/button', label: 'Button' },
  { href: '/design/components/badge', label: 'Badge' },
  { href: '/design/components/input', label: 'Input' },
  { href: '/design/components/textarea', label: 'Textarea' },
  { href: '/design/components/select', label: 'Select' },
  { href: '/design/components/checkbox', label: 'Checkbox' },
  { href: '/design/components/switch', label: 'Switch' },
  { href: '/design/components/radio-group', label: 'Radio Group' },
  { href: '/design/components/label', label: 'Label' },
  { href: '/design/components/card', label: 'Card' },
  { href: '/design/components/alert', label: 'Alert' },
  { href: '/design/components/dialog', label: 'Dialog' },
  { href: '/design/components/popover', label: 'Popover' },
  { href: '/design/components/tooltip', label: 'Tooltip' },
  { href: '/design/components/tabs', label: 'Tabs' },
  { href: '/design/components/accordion', label: 'Accordion' },
  { href: '/design/components/table', label: 'Table' },
  { href: '/design/components/scroll-area', label: 'Scroll Area' },
  { href: '/design/components/toggle', label: 'Toggle' },
  { href: '/design/components/skeleton', label: 'Skeleton' },
  { href: '/design/components/progress', label: 'Progress' },
  { href: '/design/components/avatar', label: 'Avatar' },
];

function DesignSidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {/* Introduction - always at top, no section header */}
      <ul className="space-y-px pb-1">
        <li>
          <NavItem
            href="/design"
            label="Introduction"
            active={pathname === '/design'}
            onClick={onClose}
          />
        </li>
      </ul>

      <div className="bg-border my-3 h-px" />

      {DESIGN_SECTIONS.map((section, i) => (
        <div key={section.label}>
          {i > 0 && <div className="bg-border my-3 h-px" />}
          <SectionLabel>{section.label}</SectionLabel>
          <ul className="space-y-px">
            {section.items.map(({ href, label }) => (
              <li key={href}>
                <NavItem href={href} label={label} active={pathname === href} onClick={onClose} />
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="bg-border my-3 h-px" />

      <SectionLabel>Components</SectionLabel>
      <ul className="space-y-px">
        {COMPONENT_ITEMS.map(({ href, label }) => (
          <li key={href}>
            <NavItem href={href} label={label} active={pathname === href} onClick={onClose} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------------------------------------------
   Public docs nav sections
   ---------------------------------------------------------------- */
const PUBLIC_NAV_SECTIONS = [
  {
    label: 'Getting Started',
    items: [
      { href: '/getting-started', label: 'Introduction' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    label: 'Concepts',
    items: [
      { href: '/concepts/agents', label: 'Agents' },
      { href: '/concepts/skills', label: 'Skills' },
      { href: '/concepts/workspaces', label: 'Workspaces' },
      { href: '/concepts/permissions', label: 'Permissions' },
      { href: '/concepts/memory', label: 'Memory' },
      { href: '/concepts/integrations', label: 'Integrations' },
    ],
  },
  {
    label: 'Guides',
    items: [
      { href: '/guides/mcp-setup', label: 'MCP Setup' },
      { href: '/guides/agent-lead', label: 'Agent Lead' },
      { href: '/guides/memory', label: 'Memory (Second Brain)' },
      { href: '/guides/voice-setup', label: 'Voice Setup' },
      { href: '/guides/github-integration', label: 'GitHub Integration' },
      { href: '/guides/slack-integration', label: 'Slack Integration' },
      { href: '/guides/api-keys', label: 'API Keys' },
      { href: '/guides/byok', label: 'BYOK' },
      { href: '/guides/billing', label: 'Billing & Plans' },
    ],
  },
  {
    label: 'API Reference',
    items: [
      { href: '/api-reference/overview', label: 'Quick Start' },
      { href: '/api-reference/authentication', label: 'Authentication' },
      { href: '/api-reference/agents', label: 'Agents' },
    ],
  },
];

/* ----------------------------------------------------------------
   Docs sidebar
   ---------------------------------------------------------------- */
function DocsSidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-10 pb-3">
      {PUBLIC_NAV_SECTIONS.map((section, i) => (
        <div key={section.label}>
          {i > 0 && <div className="bg-border my-3 h-px" />}
          {i > 0 && <SectionLabel>{section.label}</SectionLabel>}
          <ul className="space-y-px">
            {section.items.map(({ href, label }) => (
              <li key={href}>
                <NavItem href={href} label={label} active={pathname === href} onClick={onClose} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------
   DocsNav - renders inside sidebar (desktop) or as mobile drawer
   ---------------------------------------------------------------- */
export default function DocsNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isDesign = pathname.startsWith('/design');

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const SidebarContent = isDesign ? DesignSidebarContent : DocsSidebarContent;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="text-foreground-muted hover:bg-surface-200 hover:text-foreground fixed top-2.5 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-md lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      {/* Desktop: just render the nav content (sidebar shell is in DocsLayout) */}
      <div className="hidden flex-1 overflow-y-auto lg:block">
        <SidebarContent />
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`bg-surface-75 fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-200 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-border flex h-12 shrink-0 items-center justify-end border-b px-4">
          <button
            type="button"
            onClick={closeMobile}
            className="text-foreground-muted hover:bg-surface-200 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent onClose={closeMobile} />
      </div>
    </>
  );
}
