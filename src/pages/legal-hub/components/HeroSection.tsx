import { Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-24 overflow-hidden w-full max-w-full lg:bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-[120px] pointer-events-none lg:block hidden"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">{t('hero.updated')}</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="gradient-text">{t('hero.title')}</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {t('hero.subtitle')}
          </p>

          <div className="mt-12 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
