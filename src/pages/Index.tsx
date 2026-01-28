import { NeuralBackground } from '@/components/NeuralBackground';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { TechSection } from '@/components/TechSection';
import { AudienceSection } from '@/components/AudienceSection';
import { UniversesSection } from '@/components/UniversesSection';
import { SubscribeSection } from '@/components/SubscribeSection';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { MotionConfig } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <MotionConfig reducedMotion={isMobile ? 'always' : 'user'}>
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Scroll progress indicator */}
        {!isMobile && <ScrollProgress />}
        
        {/* Dynamic neural network background */}
        <NeuralBackground />
        
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="relative z-10 overflow-x-hidden overflow-y-hidden">
          <HeroSection />
          <PhilosophySection />
          <TechSection />
          <AudienceSection />
          <UniversesSection />
          <SubscribeSection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Index;
