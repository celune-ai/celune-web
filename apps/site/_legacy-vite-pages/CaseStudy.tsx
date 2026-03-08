import { useParams, useNavigate } from 'react-router-dom';
import { track } from '@vercel/analytics';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import AnimatedBlobs from '@/components/AnimatedBlobs';
import Timeline from '@/components/Timeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect, useRef } from 'react';
import {
  SectionHeader,
  StatCard,
  RightBleedVideo,
  RightBleedImage,
  BottomAlignedMedia,
  ContentCard,
  ValueCard,
} from '@/components/case-study';
import PasswordDialog from '@/components/case-study/PasswordDialog';
import { isProjectUnlocked } from '@/lib/projectUnlock';
import CTASection from '@/components/CTASection';

// Type for lightbox with multiple images
type LightboxData = {
  images: {
    src: string;
    title: string;
  }[];
  currentIndex: number;
} | null;
// Project data - should match PortfolioSection
import notableHealthBg1 from '@/assets/notable-health-hero.jpg';
import notableHealthBg2 from '@/assets/notable-health-bg-2.jpg';
import notableHealthBg3 from '@/assets/notable-health-bg-3.jpg';
import facebookBg1 from '@/assets/facebook-bg-1.jpg';
import facebookBg2 from '@/assets/facebook-bg-2.jpg';
import facebookBg3 from '@/assets/facebook-bg-3.jpg';
import cslDreamhack from '@/assets/csl-dreamhack.jpg';
import cslGamer from '@/assets/csl-gamer.jpg';
import cslFortnite from '@/assets/csl-fortnite.jpg';
import philosophie1 from '@/assets/philosophie-1.png';
import philosophie2 from '@/assets/philosophie-2.png';
import philosophie3 from '@/assets/philosophie-3.png';
import freelance1 from '@/assets/freelance-1.png';
import freelance2 from '@/assets/freelance-2.png';
import freelance3 from '@/assets/freelance-3.png';
import voiceAiImage from '@/assets/voice-ai-image.png';
import staffAboutImage from '@/assets/staff-about-image.png';
import squadsPreview from '@/assets/squads-preview.png';
import squadsAssistants from '@/assets/squads-assistants.jpg';
import squadsFull from '@/assets/squads-full.jpg';
import assistantSquads from '@/assets/assistant-squads.jpg';
import voiceLogs from '@/assets/voice-logs.jpg';
import callEval from '@/assets/call.jpg';
import timeToValueMvp from '@/assets/time-to-value-mvp.jpg';
import sidekickExample from '@/assets/sidekick-example.jpg';
import eligibility from '@/assets/eligibility.jpg';
const projectsData: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    images: string[];
    role: string;
    timeline: string;
    team: string;
    accentColor: string; // Hex color for project accent (blob, labels, etc.)
  }
> = {
  'notable-health': {
    title: 'Notable Health',
    subtitle: '2021 - Present: Senior Product Designer → Staff Product Designer',
    description:
      'Digital products for Health Systems that transform how patients & staff interact with their EHR, using AI & Automation.',
    heroImage: notableHealthBg1,
    images: [notableHealthBg1, notableHealthBg2, notableHealthBg3],
    role: 'Senior Product Designer → Lead Product Designer',
    timeline: '6 months',
    team: 'Cross-functional team of 8',
    accentColor: '#0061FF', // Blue
  },
  facebook: {
    title: 'Facebook',
    subtitle: 'E-Commerce — UX Design',
    description:
      'Distributing internet throughout rural America by providing business tools to Internet Service Providers (ISP).',
    heroImage: facebookBg1,
    images: [facebookBg1, facebookBg2, facebookBg3],
    role: 'Senior UX Designer',
    timeline: '4 months',
    team: 'Product team of 12',
    accentColor: '#FF6B35', // Orange
  },
  philosophie: {
    title: 'Philosophie',
    subtitle: 'Software Design — Development',
    description:
      'Multiple projects spanning different product design & frontend during my time at Philosophie.',
    heroImage: philosophie2,
    images: [philosophie2, philosophie3, philosophie1],
    role: 'Product Designer & Developer',
    timeline: '2 years',
    team: 'Agency model - various clients',
    accentColor: '#00D4AA', // Teal
  },
  'c-star-league': {
    title: 'C-Star League',
    subtitle: 'Mobile App — Product Design',
    description: "Redesigning the world's largest collegiate e-sports league platform.",
    heroImage: cslGamer,
    images: [cslGamer, cslDreamhack, cslFortnite],
    role: 'Lead Product Designer',
    timeline: '8 months',
    team: 'Startup team of 5',
    accentColor: '#FF3366', // Pink/Red
  },
  freelance: {
    title: 'Freelance',
    subtitle: 'Various Clients — Design & Development',
    description:
      'A collection of freelance projects spanning branding, web design, and product development for diverse clients.',
    heroImage: freelance2,
    images: [freelance2, freelance3, freelance1],
    role: 'Independent Consultant',
    timeline: 'Ongoing',
    team: 'Solo & collaborative',
    accentColor: '#9B59B6', // Purple
  },
};

// Section data - single source of truth for titles and navigation
const sections = [
  {
    title: 'Hero',
    category: null,
  },
  {
    title: 'Explore',
    category: null,
  },
  {
    title: 'About Notable',
    category: 'Intro',
  },
  {
    title: 'Notable Milestones',
    category: 'Intro',
  },
  {
    title: 'Conversational Assistants',
    category: 'Assistants',
  },
  {
    title: 'Call Center Crisis',
    category: 'Assistants',
  },
  {
    title: 'Clear Market Needs',
    category: 'Assistants',
  },
  {
    title: 'Selling the Vision',
    category: 'Assistants',
  },
  {
    title: 'Start with Staff',
    category: 'Assistants',
  },
  {
    title: 'Shipped Product',
    category: 'Assistants',
  },
  {
    title: 'Success Metrics',
    category: 'Assistants',
  },
  {
    title: 'Tasks & Sidekick',
    category: 'Human Task',
  },
  {
    title: 'Drowning in Tasks',
    category: 'Human Task',
  },
  {
    title: 'A Problem Worth Solving',
    category: 'Human Task',
  },
  {
    title: 'Auths → Tasks',
    category: 'Human Task',
  },
  {
    title: 'Solution',
    category: 'Human Task',
  },
  {
    title: 'Solution 2',
    category: 'Human Task',
  },
  {
    title: 'Generalized Tasks',
    category: 'Human Task',
  },
  {
    title: 'Task Builder',
    category: 'Human Task',
  },
  {
    title: 'Iterate With Zeal',
    category: 'Human Task',
  },
  {
    title: 'Success Metrics',
    category: 'Human Task',
  },
] as const;

// Section names for dot navigation (derived from sections)
const sectionNames = sections.map((s) => s.title);

// Category anchors for scroll indicator navigation (matches Explore page)
const categoryAnchors = [
  {
    name: 'Intro',
    index: Math.max(
      0,
      sections.findIndex((s) => s.category === 'Intro'),
    ),
  },
  {
    name: 'Assistants',
    index: Math.max(
      0,
      sections.findIndex((s) => s.category === 'Assistants'),
    ),
  },
  {
    name: 'Tasks (Coming Soon)',
    index: Math.max(
      0,
      sections.findIndex((s) => s.category === 'Human Task'),
    ),
  },
];

// Outline sections that link to main content sections (first section of each category)
const outlineSections = [
  {
    title: 'Intro',
    slideIndex: categoryAnchors[0].index,
  },
  {
    title: 'Assistants',
    slideIndex: categoryAnchors[1].index,
  },
  {
    title: 'Human Task',
    slideIndex: categoryAnchors[2].index,
  },
];

// Blob positions for each section - counter-clockwise movement
// Green starts bottom-right, Purple starts top-left (opposite corners)
// Positions pushed to far edges (0/100) for large screens
const blobPositions = [
  // 0: Hero
  {
    green: {
      x: 100,
      y: 100,
    },
    purple: {
      x: 0,
      y: 0,
    },
  },
  // 1: Explore
  {
    green: {
      x: 100,
      y: 95,
    },
    purple: {
      x: 0,
      y: 5,
    },
  },
  // 2: About Notable
  {
    green: {
      x: 100,
      y: 50,
    },
    purple: {
      x: 0,
      y: 50,
    },
  },
  // 3: Notable Milestones
  {
    green: {
      x: 100,
      y: 0,
    },
    purple: {
      x: 0,
      y: 100,
    },
  },
  // 4: Conversational Assistants
  {
    green: {
      x: 50,
      y: 0,
    },
    purple: {
      x: 50,
      y: 100,
    },
  },
  // 5: Call Center Crisis
  {
    green: {
      x: 0,
      y: 0,
    },
    purple: {
      x: 100,
      y: 100,
    },
  },
  // 6: Clear Market Value
  {
    green: {
      x: 0,
      y: 50,
    },
    purple: {
      x: 100,
      y: 50,
    },
  },
  // 7: Selling the Vision
  {
    green: {
      x: 0,
      y: 100,
    },
    purple: {
      x: 100,
      y: 0,
    },
  },
  // 8: Start with Staff
  {
    green: {
      x: 50,
      y: 100,
    },
    purple: {
      x: 50,
      y: 0,
    },
  },
  // 9: Shipped Product
  {
    green: {
      x: 100,
      y: 100,
    },
    purple: {
      x: 0,
      y: 0,
    },
  },
  // 10: Success Metrics
  {
    green: {
      x: 100,
      y: 50,
    },
    purple: {
      x: 0,
      y: 50,
    },
  },
  // 11: Human Tasks
  {
    green: {
      x: 100,
      y: 0,
    },
    purple: {
      x: 0,
      y: 100,
    },
  },
  // 12: Drowning in Tasks (Problems)
  {
    green: {
      x: 50,
      y: 0,
    },
    purple: {
      x: 50,
      y: 100,
    },
  },
  // 13: Clear Market Needs (Value - Tasks)
  {
    green: {
      x: 0,
      y: 50,
    },
    purple: {
      x: 100,
      y: 50,
    },
  },
  // 14: Process (Tasks)
  {
    green: {
      x: 0,
      y: 100,
    },
    purple: {
      x: 100,
      y: 0,
    },
  },
  // 15: Solution (Tasks)
  {
    green: {
      x: 50,
      y: 100,
    },
    purple: {
      x: 50,
      y: 0,
    },
  },
  // 16: Solution 2 (Tasks)
  {
    green: {
      x: 100,
      y: 100,
    },
    purple: {
      x: 0,
      y: 0,
    },
  },
  // 17: Generalized Tasks
  {
    green: {
      x: 50,
      y: 50,
    },
    purple: {
      x: 50,
      y: 50,
    },
  },
  // 18: Task Builder
  {
    green: {
      x: 0,
      y: 100,
    },
    purple: {
      x: 100,
      y: 0,
    },
  },
  // 19: Shipped Tasks
  {
    green: {
      x: 100,
      y: 100,
    },
    purple: {
      x: 0,
      y: 0,
    },
  },
];
export default function CaseStudy() {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExperienceCard, setSelectedExperienceCard] = useState<'patient' | 'staff'>(
    'patient',
  );
  const [lightboxData, setLightboxData] = useState<LightboxData>(null);
  const [lightboxVideo, setLightboxVideo] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Check if project is unlocked on mount
  useEffect(() => {
    if (projectId) {
      const unlocked = isProjectUnlocked(projectId);
      setIsUnlocked(unlocked);
      setIsPasswordDialogOpen(!unlocked);
    }
  }, [projectId]);

  // Helper to open lightbox with single image
  const openLightbox = (src: string, title: string = 'Conversational Assistants') => {
    setLightboxData({
      images: [
        {
          src,
          title,
        },
      ],
      currentIndex: 0,
    });
  };

  // Helper to open lightbox with multiple images
  const openLightboxCarousel = (
    images: {
      src: string;
      title: string;
    }[],
    startIndex: number = 0,
  ) => {
    setLightboxData({
      images,
      currentIndex: startIndex,
    });
  };

  // Navigate lightbox carousel
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxData) return;
    const { images, currentIndex } = lightboxData;
    const newIndex =
      direction === 'prev'
        ? (currentIndex - 1 + images.length) % images.length
        : (currentIndex + 1) % images.length;
    setLightboxData({
      ...lightboxData,
      currentIndex: newIndex,
    });
  };
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const mainRef = useRef<HTMLElement>(null);
  const project = projectId ? projectsData[projectId] : null;

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      const scrollTop = mainRef.current.scrollTop;
      const sectionHeight = window.innerHeight;
      const newSection = Math.round(scrollTop / sectionHeight);
      if (newSection !== activeSection && newSection >= 0 && newSection < sectionNames.length) {
        setActiveSection(newSection);
      }
    };
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeSection]);
  const scrollToSection = (index: number) => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      });
    }
  };
  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 font-heading text-4xl text-foreground">Project not found</h1>
          <Button onClick={() => navigate('/')} variant="default">
            <span>Return Home</span>
          </Button>
        </div>
      </main>
    );
  }

  // Check if we're past the hero section (section 0)
  const showLiquidGlass = activeSection >= 1;

  // Determine navigation variant based on project
  // Light variant (white text) for darker hero images: Philosophie (03), C-Star (04), Freelance (05)
  // Dark variant (black text) for lighter hero images: Notable (01), Facebook (02)
  const navVariant = ['03', '04', '05'].includes(projectId || '') ? 'light' : 'dark';
  return (
    <main
      ref={mainRef}
      className={`scrollbar-hide h-screen min-h-screen touch-pan-y snap-y snap-mandatory bg-background ${isUnlocked ? 'overflow-y-auto' : 'overflow-hidden'}`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        projectId={projectId || ''}
        projectTitle={project.title}
        onSuccess={() => {
          setIsUnlocked(true);
          setIsPasswordDialogOpen(false);
          track('case_study_viewed', { project: projectId ?? 'unknown' });
        }}
        onClose={() => navigate('/')}
      />
      <AnimatedBlobs
        activeSection={activeSection}
        sectionPositions={blobPositions}
        primaryBlobColor={project.accentColor}
      />
      <Navigation
        variant={navVariant}
        scrollContainerRef={mainRef}
        sectionNav={{
          sections: categoryAnchors,
          activeSection,
          onSectionClick: scrollToSection,
        }}
      />

      {/* Fixed Liquid Glass Container - appears after hero */}
      <div
        className={`fixed inset-x-4 bottom-8 top-8 z-10 overflow-hidden rounded-2xl border border-foreground/10 backdrop-blur-xl transition-opacity duration-500 md:inset-x-8 ${showLiquidGlass ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          background:
            'linear-gradient(135deg, rgba(5, 5, 5, 0.45) 0%, rgba(10, 10, 10, 0.40) 100%)',
        }}
      />

      {/* Hero Section */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="relative h-screen w-full snap-start snap-always"
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 via-20% to-transparent to-40%" />

        {/* Back to Projects - Inside Hero */}
        <div className="absolute left-4 top-[calc(5rem+24px)] z-30 md:left-8">
          <button
            onClick={() => navigate(`/#project-${projectId}`)}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#0d0d0d] px-4 py-2 font-inter text-sm font-light text-foreground/70 transition-colors duration-300 hover:text-foreground"
          >
            <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <ArrowLeft size={16} className="relative z-10" />
            <span className="relative z-10">Back to Projects</span>
          </button>
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 md:px-8 md:pb-12 lg:pb-16">
          <p className="mb-2 font-inter text-sm text-foreground/60 md:text-base">
            {project.subtitle}
          </p>
          <h1 className="mb-4 font-heading text-4xl text-foreground md:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="max-w-2xl font-inter text-lg text-foreground/80 md:text-xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Explore/Outline Section */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center px-[120px]"
      >
        <div
          className={`flex flex-col items-center justify-center transition-all duration-500 ${activeSection === 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <p
            className="mb-8 text-center font-inter text-sm tracking-wider md:text-base"
            style={{
              color: project.accentColor,
            }}
          >
            Explore
          </p>
          <nav className="flex flex-col items-center gap-4 md:gap-6">
            {outlineSections.map((section) => (
              <button
                key={section.title}
                onClick={() => scrollToSection(section.slideIndex)}
                className="font-heading text-3xl leading-none text-foreground transition-all duration-300 ease-out hover:scale-[1.03] hover:text-primary md:text-5xl lg:text-6xl"
                style={{
                  lineHeight: 1,
                }}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Key Features Section - First slide of Intro */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center px-[120px] pl-[80px] pr-[40px]"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[40px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-6">
              <SectionHeader
                category="Intro"
                title={sections[2].title}
                accentColor={project.accentColor}
                titleClassName="text-3xl md:text-5xl mb-0"
              />
              <ContentCard
                title="Patient Experiences"
                description={
                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="font-medium text-foreground">
                        Registration, Scheduling, and Messaging:
                      </span>{' '}
                      <span className="text-foreground/70">
                        The digital front door for patients. Eliminates paperwork and wait times,
                        while making patient data more accurate and automated.
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">AI Conversations:</span>{' '}
                      <span className="text-foreground/70">
                        Call center deflection using fully configurable AI Assistants for patients.
                        No more waiting on hold, providing support 24/7 in any language.
                      </span>
                    </div>
                  </div>
                }
                isSelected={selectedExperienceCard === 'patient'}
                selectedColor="#9B59B6"
                onClick={() => setSelectedExperienceCard('patient')}
              />
              <ContentCard
                title="Notable Platform"
                description={
                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="font-medium text-foreground">Flow Builder:</span>{' '}
                      <span className="text-foreground/70">
                        Canvas-based workflow builder purposefully designed for health systems.
                        Digitize hundreds of different healthcare workflows, safely & reliably.
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Flow Studio:</span>{' '}
                      <span className="text-foreground/70">
                        Powers Flow Builder through its rich builder experiences & AI-powered staff
                        productivity tools. Build experiences & connect, manage & maintain data for
                        flows.
                      </span>
                    </div>
                  </div>
                }
                isSelected={selectedExperienceCard === 'staff'}
                selectedColor="#00D4AA"
                onClick={() => setSelectedExperienceCard('staff')}
              />
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{
                maxHeight: '70vh',
              }}
            >
              <img
                src={voiceAiImage}
                alt="Voice AI patient experience"
                loading="lazy"
                className={`max-w-full rounded-lg transition-opacity duration-500 ease-in-out ${selectedExperienceCard === 'patient' ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  maxHeight: '70vh',
                  height: 'auto',
                }}
              />
              <img
                src={staffAboutImage}
                alt="Staff experience tools"
                loading="lazy"
                className={`absolute inset-0 max-w-full rounded-lg transition-opacity duration-500 ease-in-out ${selectedExperienceCard === 'staff' ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  maxHeight: '70vh',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section 1 */}
      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center px-[120px]"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <h2 className="mb-8 font-heading text-3xl text-foreground md:text-5xl">
            {sections[3].title}
          </h2>
          <p className="mb-[80px] font-inter text-base font-light leading-relaxed text-foreground/80 md:text-lg lg:text-[20px]">
            I've been proud of many different accomplishments during my time at Notable, and feel
            blessed to have worked on projects that have helped transform the healthcare industry.
            From improving how patients and staff interact with their health systems, to identifying
            life-saving preventative care for patients, Notable has been the most rewarding and
            impactful work of my career.
          </p>

          {/* Timeline - Only show for Notable Health */}
          {projectId === 'notable-health' && (
            <Timeline
              startYear={2021}
              endYear={2026}
              accentColor={project.accentColor}
              events={[
                {
                  year: 2021,
                  quarter: 'Q1',
                  title: 'Joined Notable Health',
                  description:
                    'Notables first Product Design hire, focusing on patient experiences and establishing foundations for design to scale. This period allowed me to articulate how product design can provide impact to our business.',
                },
                {
                  year: 2022,
                  quarter: 'Q1',
                  title: 'Launched Nucleus',
                  description:
                    'A comprehensive design system that spans both our patient and admin apps. This included the component library, basic documentation, and an all-hands press release to expand awareness & adoption.',
                },
                {
                  year: 2022,
                  quarter: 'Q3',
                  title: 'Noteworthy 1.0',
                  description:
                    'Designed our entire demo lounge experience for our first customer conference. This included a redesigned Patient App with an AI-powered registration experience, and the first release of our scheduling products.',
                },
                {
                  year: 2023,
                  quarter: 'Q2',
                  title: 'Promoted to Staff Designer',
                  description:
                    'Continued my IC track and advanced to a staff designer. At the same time we scaled our product design team from 1 to 4 designers, and I inherited a mentor role to 3 Senior Product Designers.',
                },
                {
                  year: 2023,
                  quarter: 'Q3',
                  title: 'Noteworthy 2.0',
                  description:
                    'Created a cohesive story that allowed Notable to walk customers and prospects through the entire journey of engaging with patients through our new Flow Studio platform - an Admin App used to configure your own healthcare workflows.',
                },
                {
                  year: 2024,
                  quarter: 'Q2',
                  title: 'Design System V2',
                  description:
                    'Led the creation of a comprehensive design system for all products.',
                },
                {
                  year: 2021,
                  quarter: 'Q4',
                  title: 'Series B',
                  description:
                    'After establishing a vision for Notables roadmap, we grew from Series A to B - raising a $100M round.',
                },
                {
                  year: 2024,
                  quarter: 'Q3',
                  title: 'Noteworthy 3.0',
                  description:
                    'This year I showcased our new Human in the loop product called Tasks, which enables our users to create safe & scalable automations within our new Flow Builder workflow orchestration product.',
                },
                {
                  year: 2025,
                  quarter: 'Q2',
                  title: 'Assistants Redesign',
                  description:
                    'Drove internal alignment and buy-in on a redesigned assistants product. This evolved assistants from a basic gpt for websites, to an autonomous conversational agent that could take action on behalf of patients, with a self-serve configuration.',
                },
                {
                  year: 2025,
                  quarter: 'Q4',
                  title: 'Connectors Hub',
                  description:
                    'Currently building a hub to configure connections that pass data safely between Notable and any external system.',
                },
              ]}
            />
          )}
        </div>
      </section>

      {/* Assistants Section 1 */}
      <section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always flex-col items-center overflow-hidden px-[120px]"
      >
        {/* Content centered between top of liquid glass (top-8) and top of image (bottom-8 + 25% height) */}
        <div
          className={`w-full max-w-4xl text-center transition-all duration-500 ${activeSection === 4 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{
            position: 'absolute',
            top: '2rem',
            // liquid glass top margin
            bottom: 'calc(2rem + 45%)',
            // liquid glass bottom margin + image height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '50%',
            transform:
              activeSection === 4 ? 'translateX(-50%)' : 'translateX(-50%) translateY(8px)',
          }}
        >
          <h2 className="mb-8 font-heading text-3xl text-foreground md:text-5xl">
            {sections[4].title}
          </h2>
          <p className="font-inter text-base font-light leading-relaxed text-foreground/80 md:text-lg lg:text-[20px]">
            ​Reducing call center volume & improving patient experiences with AI voice and text
            Assistants.{' '}
          </p>
        </div>
        <BottomAlignedMedia
          src={assistantSquads}
          alt="Conversational Assistant Interface"
          isActive={activeSection === 4}
          onClick={() => openLightbox(assistantSquads, 'Conversational Assistants')}
        />
      </section>

      {/* Assistants Section 2 - Two column layout like About Notable */}
      <section
        ref={(el) => {
          sectionRefs.current[5] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 5 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Problems
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  {sections[5].title}
                </h2>
              </div>

              <div>
                <p className="mb-4 font-inter leading-relaxed text-foreground/80">
                  A patient's first touch point with a new Health System is the call center, and
                  they usually provide a terrible user experience:{' '}
                  <strong className="text-foreground">
                    high wait times, dropped calls, narrow windows of availability
                  </strong>
                  .
                </p>
                <p className="mb-4 font-inter leading-relaxed text-foreground/80">
                  For staff –{' '}
                  <strong className="text-foreground">
                    they're overburdened, underpaid, and highly stressed
                  </strong>
                  , creating an environment ripe for burnout and turnover. They're drowning in
                  calls, and can't ever seem to catch up.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pr-[80px]">
              <StatCard
                value="$13.9M"
                description="Avg annual call center cost, ~43% tied to FTEs. $4.90 avg cost per call, rising to $10–$15 for some systems."
                direction="down"
              />
              <StatCard
                value="$3.4M"
                description="Avg cost for outsourced staff, answering ~600K inbound calls/year across 28 offices at ~$5.70/call."
                direction="down"
              />
              <StatCard
                value="~30%"
                description="Annual call center workforce churn. Health systems are losing their staff faster than they can rehire and train them."
                direction="down"
              />
              <StatCard
                value="~5%"
                description="Avg call abandonment rate, with ~47s hold time and only 80% of calls answered within 60 seconds."
                direction="down"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section
        ref={(el) => {
          sectionRefs.current[6] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center px-[80px]"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 6 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="mb-4 font-inter text-sm tracking-wider"
                style={{
                  color: project.accentColor,
                }}
              >
                Value
              </p>
              <h2 className="mb-4 font-heading text-3xl text-foreground md:text-5xl">
                {sections[6].title}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ValueCard title="AI as Workforce">
                With 30%+ annual churn, healthcare can't hire their way out of their workqueue
                problems. Voice AI models show potential{' '}
                <strong className="text-foreground">reduction of</strong>{' '}
                <strong className="text-foreground">
                  ~30 FTEs → ~$3.0M labor savings + ~$900K operational efficiencies/year
                </strong>
                . AI becomes the elastic digital workforce.
              </ValueCard>
              <ValueCard title="Proven ROI">
                Early results are very promising. Notable's Voice AI shows{' '}
                <strong className="text-foreground">~56–57% call containment</strong>,{' '}
                <strong className="text-foreground">
                  handling 17K–23K+ calls and driving ~$330K annualized savings
                </strong>{' '}
                for a single MyChart Helpdesk line while cutting outsourced agent volume by ~35%.
              </ValueCard>
              <ValueCard title="Cost Disruption">
                Voice-driven contact centers cost $13.9M/year avg with $4.50–$10+ per call. In a
                2M-call center, automating 40–60% of calls{' '}
                <strong className="text-foreground">
                  unlocks $3.6M–$5.4M in annual OpEx savings
                </strong>
                , allowing health systems to spend more on better care for patients.
              </ValueCard>
              <ValueCard title="Patient Improvements">
                AI-powered voice solutions transform the patient calling experience with{' '}
                <strong className="text-foreground">
                  24/7 availability, while also eliminating wait times
                </strong>
                . Patients connect instantly without frustrating transfers or hold queues, getting
                answers and scheduling care whenever they need it.
              </ValueCard>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section 2 */}
      <section
        ref={(el) => {
          sectionRefs.current[7] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 7 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Process
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  {sections[7].title}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">My Role</h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    I kicked this project off with our Head of Product at a company offsite as the
                    Lead Product Designer & acting Product Manager. My charter was to create an
                    end-to-end vision that articulated the way Assistants would be built,
                    configured, and maintained by Staff.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">
                    The Process
                  </h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    After many stakeholder interviews & iterations, I designed an end-to-end
                    prototype which ensured leadership, R&D and delivery were aligned. The alignment
                    driven by this prototype eventually drove this projects prioritization into our
                    roadmap. Over the following quarter, I worked with my PM and Engineering team to
                    build out our MVP (
                    <button
                      onClick={() =>
                        sectionRefs.current[8]?.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                      className="cursor-pointer underline transition-opacity hover:opacity-80"
                      style={{
                        color: project.accentColor,
                      }}
                    >
                      shown in the next section
                    </button>
                    ).
                  </p>
                </div>
              </div>

              <Button asChild className="w-fit !text-white hover:!text-white">
                <a
                  href="https://www.figma.com/proto/BTq8BrlQM18gWNXcLooBXg/Assistant?page-id=14142%3A17106&node-id=14142-20336&viewport=-1199%2C7490%2C0.27&t=e7dRZq0iqQRqcG4R-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=14142%3A17108&show-proto-sidebar=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Prototype</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <RightBleedVideo
              src="/videos/selling-vision-video.mp4"
              onClick={() =>
                setLightboxVideo({
                  src: '/videos/selling-vision-video.mp4',
                  title: 'Selling the Vision',
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Validating the Vision Section */}
      <section
        ref={(el) => {
          sectionRefs.current[8] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 8 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Solution
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  {sections[8].title}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">
                    Initial Focus on Time to Value
                  </h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    The first iteration towards this vision was a support experience for staff. This
                    allowed us to deploy a voice solution for our partners quickly, provide a way to
                    do evaluations, and really deeply learn about the process and user pain
                    points.{' '}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">
                    Iterations
                  </h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Our early MVP allowed us to pull conversation data into a UI for support staff
                    to debug AI Voice & SMS conversations. We learned a lot about what our users
                    needed, and eventually designed this future state, which provides more detail,
                    auditability, and a more streamlined evaluation experience.
                  </p>
                </div>

                <div>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Ultimately, building the Staff experience provided us with the data that we
                    needed to inform the full Assistant builder product.
                  </p>
                </div>
              </div>
            </div>
            <Tabs defaultValue="final" className="flex h-full w-full flex-col">
              {/* Preload MVP image to prevent layout shift */}
              <img src={timeToValueMvp} alt="" className="hidden" aria-hidden="true" />

              <TabsList className="mb-4 self-start bg-foreground/10">
                <TabsTrigger value="final" className="data-[state=active]:bg-foreground/20">
                  Final State
                </TabsTrigger>
                <TabsTrigger value="mvp" className="data-[state=active]:bg-foreground/20">
                  MVP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="final" className="mt-0 flex-1">
                <RightBleedImage
                  src={voiceLogs}
                  alt="Voice Logs Conversation View"
                  onClick={() =>
                    openLightboxCarousel(
                      [
                        {
                          src: voiceLogs,
                          title: 'Final State',
                        },
                        {
                          src: timeToValueMvp,
                          title: 'MVP',
                        },
                      ],
                      0,
                    )
                  }
                />
              </TabsContent>

              <TabsContent value="mvp" className="mt-0 flex-1">
                <RightBleedImage
                  src={timeToValueMvp}
                  alt="MVP Conversation View"
                  onClick={() =>
                    openLightboxCarousel(
                      [
                        {
                          src: voiceLogs,
                          title: 'Final State',
                        },
                        {
                          src: timeToValueMvp,
                          title: 'MVP',
                        },
                      ],
                      1,
                    )
                  }
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Shipped Product Section */}
      <section
        ref={(el) => {
          sectionRefs.current[9] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 9 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Solution
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  {sections[9].title}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Our next big step was to productize the voice agent building experience. Using
                    the lessons learned from using VAPI for our MVP, we released our own Assistant
                    builder.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">
                    Early Innings
                  </h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    The first ever Assistants were deployed at two of our partners using the our MVP
                    release of features in Early January 2026. This big release for Notable is all
                    based on the future state designs I led earlier in 2025. This new product has
                    created a ton of opportunity for Notable, creating new prospective deals as well
                    as increased platform utilization. Our partners are also reaping the benefits,
                    both from call deflection as well as filling their gaps in staff headcount.
                  </p>
                </div>
              </div>
            </div>
            <Tabs defaultValue="assistants" className="flex h-full w-full flex-col">
              {/* Preload Voice Logs video to prevent loading delay on tab switch */}
              <video
                src="/videos/shipped-staff.mp4"
                preload="auto"
                className="hidden"
                aria-hidden="true"
              />

              <TabsList className="mb-4 self-start bg-foreground/10">
                <TabsTrigger value="assistants" className="data-[state=active]:bg-foreground/20">
                  Assistants
                </TabsTrigger>
                <TabsTrigger value="voice-logs" className="data-[state=active]:bg-foreground/20">
                  Voice Logs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="assistants" className="mt-0 flex-1">
                <RightBleedVideo
                  src="/videos/production-experience.mov"
                  onClick={() =>
                    setLightboxVideo({
                      src: '/videos/production-experience.mov',
                      title: 'Shipped Product',
                    })
                  }
                />
              </TabsContent>

              <TabsContent value="voice-logs" className="mt-0 flex-1">
                <RightBleedVideo
                  src="/videos/shipped-staff.mp4"
                  onClick={() =>
                    setLightboxVideo({
                      src: '/videos/shipped-staff.mp4',
                      title: 'Shipped Product',
                    })
                  }
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section
        ref={(el) => {
          sectionRefs.current[10] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 10 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Results
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  {sections[10].title}
                </h2>
              </div>

              <div>
                <p className="mb-4 font-inter leading-relaxed text-foreground/80">
                  We were able to validate our proof of concept by using the vision to sell our
                  product to multiple new and existing partners. 
                  <strong className="text-foreground">
                    Voice Assistants are now deployed at multiple partners, all solving different
                    use-cases.
                  </strong>
                </p>
                <p className="font-inter leading-relaxed text-foreground/80">
                  The inbound voice agent was{' '}
                  <strong className="text-foreground">
                    designed, built, tested, and launched in under 5 weeks
                  </strong>
                  , creating a visible proof point for voice AI with measurable ROI in a little over
                  a month.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pr-[80px]">
              <StatCard
                value="~57%"
                description="Call deflection on inbound helpdesk calls. More than half fully handled by AI without any human transfer."
                direction="up"
              />
              <StatCard
                value="23K+"
                description="Inbound calls handled since go-live, averaging ~200 calls per day with 100% pickup rate and 0 wait time."
                direction="up"
              />
              <StatCard
                value="$330K"
                description="Annualized savings on one helpdesk use case, coming from ~35% reduction in calls ever reaching a human."
                direction="up"
              />
              <StatCard
                value="5 wks"
                description="Speed to value — agent was designed, built, tested, and launched, proving voice AI ROI in a single quarter."
                direction="up"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Human Tasks Hero Section */}
      <section
        ref={(el) => {
          sectionRefs.current[11] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always flex-col items-center overflow-hidden px-[120px]"
      >
        {/* Content centered between top of liquid glass (top-8) and top of image (bottom-8 + 25% height) */}
        <div
          className={`w-full max-w-4xl text-center transition-all duration-500 ${activeSection === 11 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{
            position: 'absolute',
            top: '2rem',
            bottom: 'calc(2rem + 45%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '50%',
            transform:
              activeSection === 11 ? 'translateX(-50%)' : 'translateX(-50%) translateY(8px)',
          }}
        >
          <p
            className="mb-4 font-inter text-sm tracking-wider"
            style={{
              color: project.accentColor,
            }}
          >
            Tasks (Coming Soon)
          </p>
          <h2 className="mb-8 font-heading text-3xl text-foreground md:text-5xl">
            {sections[11].title}
          </h2>
          <p className="font-inter text-base font-light leading-relaxed text-foreground/80 md:text-lg lg:text-[20px]">
            A suite of AI-powered support tools that allow healthcare automations to have a human
            review.
          </p>
        </div>
        <BottomAlignedMedia
          src={sidekickExample}
          alt="Human Tasks Interface"
          isActive={activeSection === 11}
          onClick={() => openLightbox(sidekickExample, 'Human Tasks')}
        />
      </section>

      {/* Problems Section (Duplicate) */}
      <section
        ref={(el) => {
          sectionRefs.current[12] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 12 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Problems
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  Drowning in Tasks
                </h2>
              </div>

              <div>
                <p className="mb-4 font-inter leading-relaxed text-foreground/80">
                  For Prior Authorizations alone, staff on avg. spend roughly 16,667 hours annually
                  manually completing workqueue tasks, costing over $525K in labor cost.{' '}
                  <strong className="text-foreground">
                    This time spent on tasks causes workqueues to grow, delaying critical care for
                    patients.
                  </strong>
                </p>
                <p className="mb-4 font-inter leading-relaxed text-foreground/80">
                  These ever-growing workqueues are unsustainable, without enough staff to support
                  them.{' '}
                  <strong className="text-foreground">
                    This causes longer delays to approve claims, which cause patients to look
                    elsewhere for care.
                  </strong>
                </p>
                <p className="mb-4 font-inter leading-relaxed text-foreground/80">
                  The good news is, this area was ripe for automation.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pr-[80px]">
              <StatCard
                value="$770K+"
                description="Manual referrals consume 25,000 hours and ~$770K in labor per 100,000 referrals processed."
                direction="down"
              />
              <StatCard
                value="$525K+"
                description="Prior auths consume 16,667 hours and over $525K in labor per 100,000 authorizations handled manually."
                direction="down"
              />
              <StatCard
                value="78%"
                description="Patients needing procedures who abandon or delay their care because of prior-auth hurdles and delays."
                direction="down"
              />
              <StatCard
                value="85%"
                description="Authorization volume that cannot be fully automated today, still requiring human review."
                direction="down"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Section (Tasks) */}
      <section
        ref={(el) => {
          sectionRefs.current[13] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center px-[80px]"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 13 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="mb-4 font-inter text-sm tracking-wider"
                style={{
                  color: project.accentColor,
                }}
              >
                Value
              </p>
              <h2 className="mb-4 font-heading text-3xl text-foreground md:text-5xl">
                A Problem Worth Solving
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ValueCard title="Labor Cost Savings">
                Prior Authorizations alone consume{' '}
                <strong className="text-foreground">
                  16,667 hours and $525K+ in labor annually
                </strong>
                . Automating workqueue tasks unlocks significant OpEx reduction while freeing staff
                for higher-value patient care.
              </ValueCard>
              <ValueCard title="AI as Workforce">
                With chronic staffing shortages, healthcare can't hire their way out of their
                workqueue backlogs. AI-powered task automation shows potential{' '}
                <strong className="text-foreground">reduction of manual work by 40–60%</strong>.
              </ValueCard>
              <ValueCard title="Faster Patient Care">
                Delayed referrals & authorizations directly impact patient outcomes. Automating
                routine tasks{' '}
                <strong className="text-foreground">accelerates time-to-approval</strong>, ensuring
                patients can schedule their care instead of leaving.
              </ValueCard>
              <ValueCard title="Scalable Operations">
                Manual human processing doesn't scale. AI-powered Sidekick and Task automation
                enable health systems to{' '}
                <strong className="text-foreground">
                  handle 100K+ authorizations without linear staff increases
                </strong>
                .
              </ValueCard>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section (Tasks) */}
      <section
        ref={(el) => {
          sectionRefs.current[14] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 14 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Process
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  {sections[14].title}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">My Role</h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Tasks started in Q3 2023 as our first solution to tackling the workqueue
                    problems that all health systems face. I partnered with a PM to formalize a plan
                    to build a product around solving the Authorizations Workqueue problem for our
                    partners.
                  </p>
                  <p className="mt-4 font-inter leading-relaxed text-foreground/80">
                    In 2025, I lead a design project to evolve this one use-case into an infinitely
                    scalable general "Tasks" experience, enabling our users to be a
                    human-in-the-loop for our workflow automations.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">
                    The Process
                  </h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Over the quarter, we shadowed staff at customers all over the country learning
                    about the problem space. We gathered and synthesized insights from these
                    eventual users, validated our assumptions & built a PRD which informed our
                    vision demo that could be used for our customer conference: Noteworthy.
                  </p>
                </div>
              </div>
            </div>
            <RightBleedVideo
              src="/videos/auths-uxr.mp4"
              onClick={() =>
                setLightboxVideo({
                  src: '/videos/auths-uxr.mp4',
                  title: 'Auths → Tasks',
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Solution Section (Tasks) */}
      <section
        ref={(el) => {
          sectionRefs.current[15] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 15 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  MVP Solution
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  Authorizations
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Using our research, we designed a product for processing authorizations &
                    referrals, and showed it to our partners. Tasks (previously Work Studio) would
                    use AI to identify & answer questions in insurance portals, automate the
                    submission on high confidence answers, and let a human review the responses that
                    required further validation.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">
                    Learning & Pivoting
                  </h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    This allowed us to plant a flag to know where we wanted to iterate towards as we
                    actually built the solution. However, we ran into a few critical technical
                    blockers which required us to completely pivot. Most insurance portals don't
                    have APIs, so their complex decision trees were just not possible to replicate.
                  </p>
                  <p className="mt-4 font-inter leading-relaxed text-foreground/80">
                    The solution? <strong className="text-foreground">Sidekick</strong> - A browser
                    extension that streamlines the simple data input that staff do manually, while
                    also providing answers to complex clinical questions.
                  </p>
                </div>
              </div>
            </div>
            <RightBleedVideo
              src="/videos/auths-demo-2023.mp4"
              onClick={() =>
                setLightboxVideo({
                  src: '/videos/auths-demo-2023.mp4',
                  title: 'Authorizations',
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Solution Section 2 (Tasks) */}
      <section
        ref={(el) => {
          sectionRefs.current[16] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 16 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Phase Two Solution
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">Sidekick</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Sidekick is an AI assistant for staff submitting Authorizations in payer
                    portals. It speeds up data entry & clinical packet creation, works consistently
                    across portals, & learns from feedback loops so we can safely progress from
                    assisted workflows toward higher levels of automation over time.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-inter text-lg font-semibold text-foreground">
                    Using Prior Failures to Improve
                  </h3>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Our technical barriers helped us quickly learn that our focus should be on how
                    partners can get immediate improvements to staff productivity. Full automation
                    didn't communicate the correct value story. By pivoting our initial
                    authorizations solution to Sidekick, we were able to get far more partners
                    signed on using us to automate their workqueues.
                  </p>
                </div>
              </div>

              <Button asChild className="w-fit !text-white hover:!text-white">
                <a
                  href="https://ehr-workqueue.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Prototype</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <RightBleedVideo
              src="/videos/sidekick-demo.mp4"
              onClick={() =>
                setLightboxVideo({
                  src: '/videos/sidekick-demo.mp4',
                  title: 'Sidekick',
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Generalized Tasks Section */}
      <section
        ref={(el) => {
          sectionRefs.current[17] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 17 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Scaling the Solution
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  Generalized Tasks
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    Tasks for authorizations proved incredibly effective at shrinking workqueues &
                    improving staff efficiency. Our next iteration evolved tasks to support any
                    use-case in Flow Builder by creating a generalized "Human-in-the-loop" Task
                    experience.
                  </p>
                  <p className="mt-4 font-inter leading-relaxed text-foreground/80">
                    Using <strong className="text-foreground">Task Builder</strong>, staff could
                    create any review experience they needed. Some initial use-cases included
                    confirming & manipulating data, executing actions manually, & many more. Now all
                    Flow Builder automations had a reliable way to ensure workflows are deployed
                    safely.
                  </p>
                </div>
              </div>
            </div>
            <Tabs defaultValue="tab1" className="flex h-full w-full flex-col">
              {/* Preload images to prevent loading delay on tab switch */}
              <img src={eligibility} alt="" className="hidden" aria-hidden="true" />
              <img src={callEval} alt="" className="hidden" aria-hidden="true" />

              <TabsList className="mb-4 self-start bg-foreground/10">
                <TabsTrigger value="tab1" className="data-[state=active]:bg-foreground/20">
                  General Review
                </TabsTrigger>
                <TabsTrigger value="voice-evals" className="data-[state=active]:bg-foreground/20">
                  Voice Evals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tab1" className="mt-0 flex-1">
                <RightBleedImage
                  src={eligibility}
                  alt="General Review"
                  onClick={() =>
                    openLightboxCarousel(
                      [
                        {
                          src: eligibility,
                          title: 'General Review',
                        },
                        {
                          src: callEval,
                          title: 'Voice Evals',
                        },
                      ],
                      0,
                    )
                  }
                />
              </TabsContent>

              <TabsContent value="voice-evals" className="mt-0 flex-1">
                <RightBleedImage
                  src={callEval}
                  alt="Voice Evals"
                  onClick={() =>
                    openLightboxCarousel(
                      [
                        {
                          src: eligibility,
                          title: 'General Review',
                        },
                        {
                          src: callEval,
                          title: 'Voice Evals',
                        },
                      ],
                      1,
                    )
                  }
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Task Builder Section */}
      <section
        ref={(el) => {
          sectionRefs.current[18] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 18 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Platform Solution
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">Task Builder</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-inter leading-relaxed text-foreground/80">
                    In order to enable human review for any use-case, we created a Tasks block in
                    Flow Builder. By using a block, users could define exactly where a human would
                    have to intervene in a Flow. This gave builders a ton of flexibility and control
                    over how to deploy safely.
                  </p>
                  <p className="mt-4 font-inter leading-relaxed text-foreground/80">
                    Having a flexible human-in-the-loop task builder lets Notable reliably hit SLAs
                    and unlock many more Flows for builders. Now builders can route edge cases and
                    automation gaps to staff via a single, configurable surface, and Notable doesn't
                    have to dedicate R&D resources to building every new type of task.
                  </p>
                </div>
              </div>
            </div>
            <RightBleedVideo
              src="/videos/task-builder.mp4"
              onClick={() =>
                setLightboxVideo({
                  src: '/videos/task-builder.mp4',
                  title: 'Task Builder',
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Iterate With Zeal Section */}
      <section
        ref={(el) => {
          sectionRefs.current[19] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 19 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Journey
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  {sections[19].title}
                </h2>
              </div>

              {/* Vertical Timeline */}
              <div className="relative flex flex-col gap-0">
                {/* Vertical line */}
                <div
                  className="absolute bottom-[72px] left-[11px] top-6 w-[2px]"
                  style={{
                    backgroundColor: '#363A46',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent, ${project.accentColor}40, ${project.accentColor}80, ${project.accentColor}40, transparent)`,
                    }}
                  />
                </div>

                {/* Timeline items */}
                {[
                  {
                    label: 'Auths MVP',
                    status: 'Pivot Q1 2024',
                    statusColor: 'bg-red-500/20 text-red-400',
                    description:
                      'We validated the concept, and learned the technical constraints deeply.',
                  },
                  {
                    label: 'Sidekick',
                    status: 'Shipped Q4 2024',
                    statusColor: 'bg-green-500/20 text-green-400',
                    secondaryStatus: 'Building V2',
                    secondaryStatusColor: 'bg-yellow-500/20 text-yellow-400',
                    description:
                      'Sidekick is currently deployed, and the full agentic experience is currently prioritized for Q1 2026.',
                  },
                  {
                    label: 'General Tasks',
                    status: 'Shipped Q4 2024',
                    statusColor: 'bg-green-500/20 text-green-400',
                    description:
                      'General tasks are supporting nearly 100 use-cases, with hundreds of thousands of tasks created.',
                  },
                  {
                    label: 'Task Builder',
                    status: 'Shipped Q1 2025',
                    statusColor: 'bg-green-500/20 text-green-400',
                    description:
                      'The builder experience continues to become easier to use, and is powering all deployed tasks today.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-6 py-4">
                    {/* Dot */}
                    <div
                      className="relative z-10 mt-1 h-6 w-6 flex-shrink-0 rounded-full border-2 bg-background"
                      style={{
                        borderColor: project.accentColor,
                      }}
                    />

                    {/* Content */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <span className="font-inter text-lg font-medium text-foreground">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${item.statusColor}`}
                          >
                            {item.status}
                          </span>
                          {item.secondaryStatus && (
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${item.secondaryStatusColor}`}
                            >
                              {item.secondaryStatus}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="max-w-[400px] font-inter text-sm leading-relaxed text-foreground/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Tabs defaultValue="general-tasks" className="flex h-full w-full flex-col">
              {/* Preload videos to prevent loading delay on tab switch */}
              <video
                src="/videos/voice-task-small.mp4"
                preload="auto"
                className="hidden"
                aria-hidden="true"
              />
              <video
                src="/videos/task-builder.mp4"
                preload="auto"
                className="hidden"
                aria-hidden="true"
              />
              <video
                src="/videos/sidekick-currentstate-small.mp4"
                preload="auto"
                className="hidden"
                aria-hidden="true"
              />

              <TabsList className="mb-4 self-start bg-foreground/10">
                <TabsTrigger value="general-tasks" className="data-[state=active]:bg-foreground/20">
                  General Tasks
                </TabsTrigger>
                <TabsTrigger value="task-builder" className="data-[state=active]:bg-foreground/20">
                  Task Builder
                </TabsTrigger>
                <TabsTrigger value="sidekick" className="data-[state=active]:bg-foreground/20">
                  Sidekick
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general-tasks" className="mt-0 flex-1">
                <RightBleedVideo
                  src="/videos/voice-task-small.mp4"
                  onClick={() =>
                    setLightboxVideo({
                      src: '/videos/voice-task-small.mp4',
                      title: 'Iterate With Zeal',
                    })
                  }
                />
              </TabsContent>

              <TabsContent value="task-builder" className="mt-0 flex-1">
                <RightBleedVideo
                  src="/videos/task-builder.mp4"
                  onClick={() =>
                    setLightboxVideo({
                      src: '/videos/task-builder.mp4',
                      title: 'Iterate With Zeal',
                    })
                  }
                />
              </TabsContent>

              <TabsContent value="sidekick" className="mt-0 flex-1">
                <RightBleedVideo
                  src="/videos/sidekick-currentstate-small.mp4"
                  onClick={() =>
                    setLightboxVideo({
                      src: '/videos/sidekick-currentstate-small.mp4',
                      title: 'Iterate With Zeal',
                    })
                  }
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Tasks Success Metrics Section */}
      <section
        ref={(el) => {
          sectionRefs.current[20] = el;
        }}
        className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center pl-[80px] pr-0"
      >
        <div
          className={`w-full max-w-full transition-all duration-500 ${activeSection === 20 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="grid grid-cols-1 items-center gap-[80px] md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <div>
                <p
                  className="mb-4 font-inter text-sm tracking-wider"
                  style={{
                    color: project.accentColor,
                  }}
                >
                  Results
                </p>
                <h2 className="font-heading text-3xl text-foreground md:text-5xl">
                  {sections[20].title}
                </h2>
              </div>

              <div>
                <p className="mb-4 font-inter leading-relaxed text-foreground/80">
                  Tasks and Sidekick have become critical enablers for platform utilization.
                  <strong className="text-foreground">
                    {' '}
                    Without human-in-the-loop capabilities, Notable could only digitize ~15% of
                    workflows. With Tasks, we reach 80%+ coverage.
                  </strong>
                </p>
                <p className="font-inter leading-relaxed text-foreground/80">
                  This expansion makes more flows economically viable, driving{' '}
                  <strong className="text-foreground">
                    multi-hundred-thousand-dollar deployments
                  </strong>{' '}
                  across authorizations, referrals, and denial resolution.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pr-[80px]">
              <StatCard
                value="2–3x"
                description="Staff productivity on prior authorizations—submission time reduced from ~12–18 min to ~4 min per case."
                direction="up"
              />
              <StatCard
                value="99%"
                description="Reduction in referral turnaround time, from ~48 hours down to ~10 minutes with automation + Task review."
                direction="up"
              />
              <StatCard
                value="80%+"
                description="Authorization volume coverage with Tasks + Sidekick, up from ~15% with pure automation alone."
                direction="up"
              />
              <StatCard
                value="$300K+"
                description="ARR per large health system from Task-backed workflows, validating $1M+ annual revenue models."
                direction="up"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox with Carousel */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-50 flex animate-lightbox-in cursor-pointer flex-col bg-black/90"
          onClick={() => setLightboxData(null)}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-4">
              <h3 className="font-inter text-lg text-white/80">
                {lightboxData.images[lightboxData.currentIndex].title}
              </h3>
              {lightboxData.images.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('prev');
                    }}
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                  </button>
                  <span className="font-inter text-sm text-white/60">
                    {lightboxData.currentIndex + 1} / {lightboxData.images.length}
                  </span>
                  <button
                    className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('next');
                    }}
                  >
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>
            <button
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setLightboxData(null)}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          {/* Image */}
          <div className="flex flex-1 items-center justify-center p-8 pt-0">
            <img
              src={lightboxData.images[lightboxData.currentIndex].src}
              alt="Full size preview"
              loading="lazy"
              className="max-h-full max-w-full object-contain shadow-2xl"
              style={{
                borderRadius: '16px',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Video Lightbox */}
      {lightboxVideo && (
        <div
          className="fixed inset-0 z-50 flex animate-lightbox-in cursor-pointer flex-col bg-black/90"
          onClick={() => setLightboxVideo(null)}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6">
            <h3 className="font-inter text-lg text-white/80">{lightboxVideo.title}</h3>
            <button
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setLightboxVideo(null)}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          {/* Video */}
          <div className="flex flex-1 items-center justify-center p-8 pt-0">
            <video
              src={lightboxVideo.src}
              autoPlay
              loop
              controls
              className="max-h-full max-w-full object-contain shadow-2xl"
              style={{
                borderRadius: '16px',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="relative z-20 flex h-screen w-full snap-start snap-always items-center justify-center">
        <CTASection heading="Thanks for your time!" />
      </section>
    </main>
  );
}
