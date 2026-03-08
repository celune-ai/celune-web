import { CeluneNav } from '@/components/celune/nav';
import { CeluneFooter } from '@/components/celune/footer';

const PROJECTS = [
  {
    title: 'Notable Health',
    subtitle: 'Brand Identity — Web Design',
    description: 'Electronic health records platform for health systems and clinics.',
  },
  {
    title: 'Facebook',
    subtitle: 'E-Commerce — UX Design',
    description: 'Rural internet distribution platform for emerging markets.',
  },
  {
    title: 'Philosophie',
    subtitle: 'Software Design — Development',
    description: 'Design consultancy — multiple product design and development projects.',
  },
  {
    title: 'C-Star League',
    subtitle: 'Mobile App — Product Design',
    description: 'Collegiate esports competition platform and mobile companion app.',
  },
  {
    title: 'Freelance',
    subtitle: 'Various Clients — Design & Development',
    description: 'Selected freelance work across brand identity, web, and product design.',
  },
];

export default function PortfolioPage() {
  return (
    <>
      <CeluneNav />
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Portfolio</h1>
          <p className="mt-2 text-neutral-400">
            Selected work from Smejkal Design — a design-led digital studio.
          </p>

          <div className="mt-12 space-y-6">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="group rounded-lg border border-border bg-surface-50 p-6 transition-colors hover:border-celune-500/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white group-hover:text-celune-400 transition-colors">
                      {project.title}
                    </h2>
                    <p className="mt-0.5 font-mono text-xs text-celune-500/70">{project.subtitle}</p>
                    <p className="mt-2 text-sm text-neutral-400">{project.description}</p>
                  </div>
                  <div className="shrink-0 rounded-md border border-border bg-surface-200 px-3 py-1.5 text-xs text-neutral-500">
                    Coming Soon
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <CeluneFooter />
    </>
  );
}
