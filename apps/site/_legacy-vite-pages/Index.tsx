import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import PortfolioSection from '@/components/PortfolioSection';
import CTASection from '@/components/CTASection';
import FooterSection from '@/components/FooterSection';

const homeSections = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Case Studies', id: 'projects' },
  { name: 'Get in Touch', id: 'footer' },
];

const Index = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        // If at bottom, set to last section (Get in Touch)
        if (activeSection !== homeSections.length - 1) {
          setActiveSection(homeSections.length - 1);
        }
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = homeSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(homeSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== i) {
            setActiveSection(i);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(homeSections[index].id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-background">
      <Navigation
        sectionNav={{
          sections: homeSections.map((s, i) => ({ name: s.name, index: i })),
          activeSection,
          onSectionClick: scrollToSection,
        }}
      />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <WelcomeSection />
      </div>
      <PortfolioSection />
      <CTASection />
      <FooterSection />
    </main>
  );
};

export default Index;
