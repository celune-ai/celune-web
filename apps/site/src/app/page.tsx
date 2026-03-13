import { CeluneNav } from '@/components/celune/nav';
import { CeluneHero } from '@/components/celune/hero';
import { CeluneStats } from '@/components/celune/stats';
import { CeluneFeatures } from '@/components/celune/features';
import { CeluneFeatureCards } from '@/components/celune/feature-cards';
import { CeluneDemoShowcase } from '@/components/celune/demo-showcase';
import { ProductShowcase } from '@/components/celune/product-showcase';
import { CelunePricing } from '@/components/celune/pricing';
import { CeluneWaitlist } from '@/components/celune/waitlist';
import { CeluneFooter } from '@/components/celune/footer';
import { FooterArea } from '@/components/celune/footer-area';
import { SectionTracker } from '@/components/celune/section-tracker';
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
        <ProductShowcase />
        <SectionDivider />
        <CeluneDemoShowcase />
        <SectionDivider />
        <CeluneStats />
        <SectionDivider />
        <CeluneFeatures />
        <SectionDivider />
        <CeluneFeatureCards />
        <SectionDivider />
        <CelunePricing />
        <SectionDivider />
        <FooterArea>
          <CeluneWaitlist />
          <SectionDivider />
          <CeluneFooter />
        </FooterArea>
      </GridFrame>
    </>
  );
}
