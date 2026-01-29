import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Legal = () => {
  const { t } = useLocalization();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="relative z-10 overflow-x-hidden overflow-y-hidden">
        <div className="section-container pt-28 pb-16">
          <div className="max-w-4xl">
            <h1 className="font-orbitron text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('legal_page.title')}
            </h1>
            <p className="font-inter text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              {t('legal_page.subtitle')}
            </p>
            <p className="font-inter text-xs text-muted-foreground">
              {t('legal_page.updated')}
            </p>
          </div>

          <div className="mt-12 space-y-12 max-w-4xl">
            <section id="privacy" className="scroll-mt-28">
              <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t('legal_page.privacy.title')}
              </h2>
              <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                {t('legal_page.privacy.intro')}
              </p>

              <div className="space-y-4">
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.privacy.section1.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.privacy.section1.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.privacy.section2.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.privacy.section2.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.privacy.section3.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.privacy.section3.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.privacy.section4.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.privacy.section4.content')}</p>
                </div>
              </div>

              <div className="mt-6 glass-card rounded-xl p-5 border border-neon-purple/20">
                <p className="font-inter text-foreground">{t('legal_page.privacy.important')}</p>
              </div>
            </section>

            <section id="terms" className="scroll-mt-28">
              <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t('legal_page.terms.title')}
              </h2>
              <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                {t('legal_page.terms.intro')}
              </p>

              <div className="space-y-4">
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.terms.section1.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.terms.section1.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.terms.section2.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.terms.section2.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.terms.section3.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.terms.section3.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.terms.section4.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.terms.section4.content')}</p>
                </div>
              </div>

              <div className="mt-6 glass-card rounded-xl p-5 border border-neon-purple/20">
                <p className="font-inter text-foreground">{t('legal_page.terms.important')}</p>
              </div>
            </section>

            <section id="cookies" className="scroll-mt-28">
              <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t('legal_page.cookies.title')}
              </h2>
              <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                {t('legal_page.cookies.intro')}
              </p>

              <div className="space-y-4">
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.cookies.section1.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.cookies.section1.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.cookies.section2.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.cookies.section2.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.cookies.section3.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.cookies.section3.content')}</p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-inter font-semibold text-foreground mb-2">{t('legal_page.cookies.section4.title')}</h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">{t('legal_page.cookies.section4.content')}</p>
                </div>
              </div>

              <div className="mt-6 glass-card rounded-xl p-5 border border-neon-purple/20">
                <p className="font-inter text-foreground">{t('legal_page.cookies.important')}</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
