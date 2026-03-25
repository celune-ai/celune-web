// ---------------------------------------------------------------------------
// SocialProof — tech stack trust bar + product capability metrics
// ---------------------------------------------------------------------------

const BUILT_ON = [
  { name: 'Anthropic', description: 'AI Models' },
  { name: 'Supabase', description: 'Database' },
  { name: 'Vercel', description: 'Infrastructure' },
  { name: 'Next.js', description: 'Framework' },
];

const CAPABILITIES = [
  { value: '9', label: 'Specialized AI Agents' },
  { value: '50+', label: 'Built-in Skills' },
  { value: 'Real-time', label: 'Persistent Memory' },
  { value: 'MCP', label: 'Open Protocol' },
];

export function SocialProof() {
  return (
    <section id="social-proof" className="relative overflow-hidden">
      <div className="container">
        {/* ── Tech stack trust bar ─────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 py-12">
          <p className="text-xs font-medium tracking-widest text-neutral-600 uppercase">Built on</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {BUILT_ON.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center gap-1">
                <span className="text-sm font-medium text-neutral-400">{tech.name}</span>
                <span className="text-[10px] text-neutral-600">{tech.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Capability metrics ───────────────────────────────── */}
        <div className="grid grid-cols-2 divide-x divide-dashed divide-white/[0.08] border-x border-dashed border-white/[0.08] md:grid-cols-4">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.label}
              className="px-6 py-10 text-center transition-colors duration-300 hover:bg-white/[0.015]"
            >
              <div className="font-heading text-2xl font-medium text-white md:text-3xl">
                {cap.value}
              </div>
              <div className="mt-2 text-xs text-neutral-500">{cap.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
