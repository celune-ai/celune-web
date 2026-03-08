'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { categories, getDocsByCategory, getDocHref } from '@/lib/docs';

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
      className={`block truncate rounded-md px-2 py-1.5 text-sm transition-colors ${
        active
          ? 'bg-surface-200 text-foreground'
          : 'text-foreground-lighter hover:bg-surface-100 hover:text-foreground'
      }`}
    >
      {label}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground-muted px-2 pt-2 pb-1 text-[10px] font-medium tracking-[0.08em] uppercase">
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
  { href: '/design/components', hash: '', label: 'Overview' },
  { href: '/design/components#button', hash: '#button', label: 'Button' },
  { href: '/design/components#badge', hash: '#badge', label: 'Badge' },
  { href: '/design/components#input', hash: '#input', label: 'Input' },
  { href: '/design/components#textarea', hash: '#textarea', label: 'Textarea' },
  { href: '/design/components#select', hash: '#select', label: 'Select' },
  { href: '/design/components#checkbox', hash: '#checkbox', label: 'Checkbox' },
  { href: '/design/components#switch', hash: '#switch', label: 'Switch' },
  { href: '/design/components#radio-group', hash: '#radio-group', label: 'Radio Group' },
  { href: '/design/components#label', hash: '#label', label: 'Label' },
  { href: '/design/components#card', hash: '#card', label: 'Card' },
  { href: '/design/components#alert', hash: '#alert', label: 'Alert' },
  { href: '/design/components#dialog', hash: '#dialog', label: 'Dialog' },
  { href: '/design/components#popover', hash: '#popover', label: 'Popover' },
  { href: '/design/components#tooltip', hash: '#tooltip', label: 'Tooltip' },
  { href: '/design/components#tabs', hash: '#tabs', label: 'Tabs' },
  { href: '/design/components#accordion', hash: '#accordion', label: 'Accordion' },
  { href: '/design/components#table', hash: '#table', label: 'Table' },
  { href: '/design/components#scroll-area', hash: '#scroll-area', label: 'Scroll Area' },
  { href: '/design/components#toggle', hash: '#toggle', label: 'Toggle' },
  { href: '/design/components#skeleton', hash: '#skeleton', label: 'Skeleton' },
  { href: '/design/components#progress', hash: '#progress', label: 'Progress' },
  { href: '/design/components#avatar', hash: '#avatar', label: 'Avatar' },
];

function DesignSidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {/* Introduction — always at top, no section header */}
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
        {COMPONENT_ITEMS.map(({ href, hash: itemHash, label }) => {
          const onComponentsPage = pathname === '/design/components';
          const active = onComponentsPage && hash === itemHash;
          return (
            <li key={href}>
              <NavItem href={href} label={label} active={active} onClick={onClose} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ----------------------------------------------------------------
   Public docs nav sections (Sprint 2 pages — links may 404 for now)
   ---------------------------------------------------------------- */
const PUBLIC_NAV_SECTIONS = [
  {
    label: 'Getting Started',
    items: [{ href: '/getting-started', label: 'Introduction' }],
  },
  {
    label: 'Concepts',
    items: [
      { href: '/concepts/agents', label: 'Agents' },
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
      { href: '/api-reference/overview', label: 'Overview' },
      { href: '/api-reference/authentication', label: 'Authentication' },
      { href: '/api-reference/agents', label: 'Agents' },
    ],
  },
  {
    label: 'Support',
    items: [{ href: '/faq', label: 'FAQ' }],
  },
];

/* ----------------------------------------------------------------
   Docs sidebar
   ---------------------------------------------------------------- */
function DocsSidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {/* Public documentation sections */}
      {PUBLIC_NAV_SECTIONS.map((section, i) => (
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

      {/* Public pages (existing — will be reorganized in branding task) */}
      {(() => {
        const publicDocs = getDocsByCategory('Public');
        if (publicDocs.length === 0) return null;
        return (
          <>
            <div className="bg-border my-3 h-px" />
            <SectionLabel>Public</SectionLabel>
            <ul className="space-y-px">
              {publicDocs.map((doc) => {
                const href = getDocHref(doc);
                return (
                  <li key={doc.slug}>
                    <NavItem
                      href={href}
                      label={doc.title}
                      active={pathname === href}
                      onClick={onClose}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        );
      })()}
    </div>
  );
}

/* ----------------------------------------------------------------
   DocsNav — desktop sticky sidebar + mobile drawer
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

      {/* Desktop sidebar */}
      <aside className="border-border bg-surface-75 sticky top-[49px] hidden h-[calc(100vh-49px)] w-[269px] shrink-0 flex-col border-r lg:flex">
        <SidebarContent />
      </aside>

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
