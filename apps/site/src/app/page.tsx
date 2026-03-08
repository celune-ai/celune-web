import { CeluneNav } from '@/components/celune/nav';
import { CeluneHero } from '@/components/celune/hero';
import { CeluneStats } from '@/components/celune/stats';
import { CeluneFeatures } from '@/components/celune/features';
import { CeluneFeatureCards } from '@/components/celune/feature-cards';
import { CeluneDemoShowcase } from '@/components/celune/demo-showcase';
import { CeluneHowItWorks } from '@/components/celune/how-it-works';
import { CeluneAgentLead } from '@/components/celune/agent-lead';
import { CeluneSecondBrain } from '@/components/celune/second-brain';
import { CelunePricing } from '@/components/celune/pricing';
import { CeluneWaitlist } from '@/components/celune/waitlist';
import { CeluneFooter } from '@/components/celune/footer';
import { SectionTracker } from '@/components/celune/section-tracker';
import { NebulaBg } from '@/components/celune/nebula-bg';
import { GridFrame, SectionDivider } from '@/components/celune/grid-frame';
import { StarField } from '@/components/celune/star-field';

export default function Home() {
  return (
    <>
      <StarField />
      <SectionTracker />
      <CeluneNav />
      <GridFrame>
        <CeluneHero />
        <SectionDivider />
        <CeluneDemoShowcase />
        <SectionDivider />
        <CeluneStats />
        <SectionDivider />
        <CeluneFeatures />
        <SectionDivider />
        <CeluneFeatureCards />
        <SectionDivider />
        <CeluneHowItWorks />
        <SectionDivider />
        <CeluneAgentLead />
        <SectionDivider />
        <CeluneSecondBrain />
        <SectionDivider />
        <CelunePricing />
        <SectionDivider />
        <div className="relative">
          <NebulaBg />
          <CeluneWaitlist />
        </div>
        <SectionDivider />
        <CeluneFooter />
      </GridFrame>
    </>
  );
}
