import { NeuralBackground } from '@/components/NeuralBackground';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { UniversesSection } from '@/components/UniversesSection';
import { TechCoreSection } from '@/components/TechCoreSection';
import { DemoSection } from '@/components/DemoSection';
import { SubscribeSection } from '@/components/SubscribeSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Dynamic neural network background */}
      <NeuralBackground />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <PhilosophySection />
        <UniversesSection />
        <TechCoreSection />
        <DemoSection />
        <SubscribeSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
