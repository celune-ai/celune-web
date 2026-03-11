'use client';

import { Mail, MoreVertical, Pencil, AlertCircle, Info, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Shared inline demo components (hand-crafted to match design tokens) */
/* ------------------------------------------------------------------ */

export function DemoButton({
  children,
  variant = 'default',
  size = 'md',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'warning' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:pointer-events-none disabled:opacity-50';

  const variants: Record<string, string> = {
    default: 'bg-brand text-black hover:bg-brand/80',
    secondary: 'bg-surface-300 text-foreground hover:bg-surface-200',
    outline: 'border border-border-control bg-transparent text-foreground hover:bg-surface-200',
    ghost: 'text-foreground hover:bg-surface-200',
    destructive: 'bg-destructive-500 text-white hover:bg-destructive-500/80',
    warning: 'bg-warning-500 text-black hover:bg-warning-500/80',
    link: 'text-brand underline-offset-4 hover:underline p-0 h-auto',
  };

  const sizes: Record<string, string> = {
    sm: 'h-7 px-3 text-xs',
    md: 'h-8 px-4',
    lg: 'h-10 px-6',
    icon: 'h-8 w-8',
    'icon-sm': 'h-7 w-7',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
}

export function DemoBadge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'brand' | 'success' | 'warning' | 'destructive' | 'ghost';
}) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors';

  const variants: Record<string, string> = {
    default: 'bg-brand text-black',
    secondary: 'bg-surface-300 text-foreground',
    outline: 'border border-border text-foreground',
    brand: 'bg-brand-200 text-brand-600',
    success: 'bg-brand-200 text-brand-600',
    warning: 'bg-warning-200 text-warning-600',
    destructive: 'bg-destructive-200 text-destructive-600',
    ghost: 'bg-surface-200 text-foreground-lighter',
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

export function DemoInput({ placeholder = 'Enter text...' }: { placeholder?: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border-border-control bg-surface-100 text-foreground placeholder:text-foreground-muted focus:ring-brand/40 focus:border-brand h-8 w-64 rounded-md border px-3 text-sm focus:ring-2 focus:outline-none"
    />
  );
}

export function DemoTextarea() {
  return (
    <textarea
      placeholder="Write a message..."
      rows={3}
      className="border-border-control bg-surface-100 text-foreground placeholder:text-foreground-muted focus:ring-brand/40 focus:border-brand w-80 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
    />
  );
}

export function DemoCheckbox({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <label className="flex items-center gap-2">
      <span className={`flex h-4 w-4 items-center justify-center rounded border ${checked ? 'bg-brand border-brand' : 'border-border-control bg-surface-100'}`}>
        {checked && (
          <svg className="h-3 w-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-foreground text-sm">{label}</span>
    </label>
  );
}

export function DemoSwitch({ on = false }: { on?: boolean }) {
  return (
    <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${on ? 'bg-brand' : 'bg-surface-400'}`}>
      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </span>
  );
}

export function DemoCard() {
  return (
    <div className="border-border bg-surface-100 w-80 rounded-lg border">
      <div className="border-border border-b px-6 py-4">
        <h4 className="text-foreground text-sm font-medium">Card Title</h4>
        <p className="text-foreground-lighter mt-1 text-xs">Card description text</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-foreground-light text-sm">Card content goes here. This is the main body of the card.</p>
      </div>
      <div className="border-border flex justify-end gap-2 border-t px-6 py-3">
        <DemoButton variant="outline" size="sm">Cancel</DemoButton>
        <DemoButton size="sm">Save</DemoButton>
      </div>
    </div>
  );
}

export function DemoAlert({
  variant = 'default',
  title,
  description,
}: {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'destructive';
  title: string;
  description: string;
}) {
  const styles: Record<string, { bg: string; text: string; icon: typeof AlertCircle }> = {
    default: { bg: 'bg-surface-100 border-border', text: 'text-foreground', icon: Info },
    info: { bg: 'bg-brand-200/20 border-brand-200', text: 'text-brand-600', icon: Info },
    success: { bg: 'bg-brand-200/20 border-brand-200', text: 'text-brand-600', icon: CheckCircle },
    warning: { bg: 'bg-warning-200/20 border-warning-200', text: 'text-warning-600', icon: AlertTriangle },
    destructive: { bg: 'bg-destructive-200/20 border-destructive-200', text: 'text-destructive-600', icon: AlertCircle },
  };

  const s = styles[variant];
  const Icon = s.icon;

  return (
    <div className={`w-80 rounded-lg border p-4 ${s.bg}`}>
      <div className="flex gap-3">
        <Icon size={16} className={`mt-0.5 shrink-0 ${s.text}`} />
        <div>
          <p className={`text-sm font-medium ${s.text}`}>{title}</p>
          <p className="text-foreground-light mt-1 text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function DemoSelect() {
  return (
    <div className="border-border-control bg-surface-100 text-foreground flex h-8 w-48 items-center justify-between rounded-md border px-3 text-sm">
      <span className="text-foreground-muted">Select option...</span>
      <ChevronDown size={14} className="text-foreground-muted" />
    </div>
  );
}

export function DemoSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-surface-300 h-4 w-48 animate-pulse rounded" />
      <div className="bg-surface-300 h-4 w-64 animate-pulse rounded" />
      <div className="bg-surface-300 h-4 w-40 animate-pulse rounded" />
    </div>
  );
}

export function DemoProgress({ value = 65 }: { value?: number }) {
  return (
    <div className="bg-surface-300 h-2 w-64 overflow-hidden rounded-full">
      <div className="bg-brand h-full rounded-full transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export function DemoAvatar({ initials = 'ES' }: { initials?: string; src?: string }) {
  return (
    <div className="bg-brand-200 text-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
      {initials}
    </div>
  );
}

export function DemoTabs() {
  return (
    <div className="bg-surface-200 inline-flex gap-1 rounded-lg p-1">
      <span className="bg-background text-foreground rounded-md px-3 py-1.5 text-sm font-medium shadow-sm">Overview</span>
      <span className="text-foreground-muted rounded-md px-3 py-1.5 text-sm">Settings</span>
      <span className="text-foreground-muted rounded-md px-3 py-1.5 text-sm">Activity</span>
    </div>
  );
}

export function DemoDialog() {
  return (
    <div className="bg-surface-100 border-border w-96 rounded-lg border shadow-lg">
      <div className="px-6 pt-6 pb-2">
        <h4 className="text-foreground text-base font-medium">Delete project?</h4>
        <p className="text-foreground-lighter mt-2 text-sm">This action cannot be undone. All tasks and data associated with this project will be permanently removed.</p>
      </div>
      <div className="flex justify-end gap-2 px-6 py-4">
        <DemoButton variant="outline" size="sm">Cancel</DemoButton>
        <DemoButton variant="destructive" size="sm">Delete</DemoButton>
      </div>
    </div>
  );
}

export function DemoTooltip() {
  return (
    <div className="flex items-center gap-3">
      <DemoButton variant="ghost" size="icon-sm"><Pencil size={14} /></DemoButton>
      <div className="bg-surface-400 rounded-md px-3 py-1.5 text-xs text-white shadow-md">
        Edit task
        <div className="bg-surface-400 absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
      </div>
    </div>
  );
}

/* Re-export icons used in component pages */
export { Mail, MoreVertical, Pencil } from 'lucide-react';
