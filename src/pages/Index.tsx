import { NeuralBackground } from '@/components/NeuralBackground';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { UniversesSection } from '@/components/UniversesSection';

import { DemoSection } from '@/components/DemoSection';
import { SubscribeSection } from '@/components/SubscribeSection';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Dynamic neural network background */}
      <NeuralBackground />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <PhilosophySection />
        <UniversesSection />
        
        <DemoSection />
        <SubscribeSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
