import './legal-hub/legal-hub.css';

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, FileText, Cookie } from 'lucide-react';
import { LanguageProvider, useLanguage } from './legal-hub/hooks/useLanguage';
import ParticleBackground from './legal-hub/components/ParticleBackground';
import Header from './legal-hub/components/Header';
import HeroSection from './legal-hub/components/HeroSection';
import LegalSection from './legal-hub/components/LegalSection';
import ProgressTimeline from './legal-hub/components/ProgressTimeline';
import ScrollToTop from './legal-hub/components/ScrollToTop';
import SearchBar from './legal-hub/components/SearchBar';
import Footer from './legal-hub/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';


const LegalContent = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('privacy');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const docHeightRef = useRef(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const { t } = useLanguage();

  useEffect(() => {
    // Cache initial document height
    docHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
    
    // Cache section elements
    const sections = ['privacy', 'terms', 'cookies'];
    sections.forEach(id => {
      sectionRefs.current[id] = document.getElementById(id);
    });

    const prevHtmlOverflowX = document.documentElement.style.overflowX;
    const prevBodyOverflowX = document.body.style.overflowX;

    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    return () => {
      document.documentElement.style.overflowX = prevHtmlOverflowX;
      document.body.style.overflowX = prevBodyOverflowX;
    };
  }, []);

  // Debounce expensive scroll operations
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const progress = (scrollTop / docHeightRef.current) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Debounce expensive layout reads to prevent forced reflows
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        // Use cached elements to avoid repeated DOM queries
        const sections = ['privacy', 'terms', 'cookies'];
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = sectionRefs.current[sections[i]];
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }, 100); // 100ms debounce
    };

    // Update document height on resize
    const handleResize = () => {
      docHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, entry.target.id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('#privacy, #terms, #cookies');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);



  return (
    <div className="legal-hub-theme dark min-h-screen relative overflow-x-hidden">
      <ScrollProgress />
      <ParticleBackground />
      <Header activeSection={activeSection} />
      <ProgressTimeline activeSection={activeSection} progress={scrollProgress} />

      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        <HeroSection />



        <div className="container mx-auto px-4 md:px-6 space-y-12 pb-12">
          <LegalSection
            id="privacy"
            icon={<Shield className="w-7 h-7 text-primary" />}
            title={t('privacy.title')}
            intro={t('privacy.intro')}
            sections={[
              { title: t('privacy.section1.title'), content: t('privacy.section1.content') },
              { title: t('privacy.section2.title'), content: t('privacy.section2.content') },
              { title: t('privacy.section3.title'), content: t('privacy.section3.content') },
              { title: t('privacy.section4.title'), content: t('privacy.section4.content') },
              { title: t('privacy.section5.title'), content: t('privacy.section5.content') },
              { title: t('privacy.section6.title'), content: t('privacy.section6.content') },
              { title: t('privacy.section7.title'), content: t('privacy.section7.content') },
              { title: t('privacy.section8.title'), content: t('privacy.section8.content') },
            ]}
            importantNote={t('privacy.important')}
            isVisible={visibleSections.includes('privacy')}
          />

          <LegalSection
            id="terms"
            icon={<FileText className="w-7 h-7 text-primary" />}
            title={t('terms.title')}
            intro={t('terms.intro')}
            sections={[
              { title: t('terms.section1.title'), content: t('terms.section1.content') },
              { title: t('terms.section2.title'), content: t('terms.section2.content') },
              { title: t('terms.section3.title'), content: t('terms.section3.content') },
              { title: t('terms.section4.title'), content: t('terms.section4.content') },
              { title: t('terms.section5.title'), content: t('terms.section5.content') },
              { title: t('terms.section6.title'), content: t('terms.section6.content') },
              { title: t('terms.section7.title'), content: t('terms.section7.content') },
            ]}
            importantNote={t('terms.important')}
            isVisible={visibleSections.includes('terms')}
          />

          <LegalSection
            id="cookies"
            icon={<Cookie className="w-7 h-7 text-primary" />}
            title={t('cookies.title')}
            intro={t('cookies.intro')}
            sections={[
              { title: t('cookies.section1.title'), content: t('cookies.section1.content') },
              { title: t('cookies.section2.title'), content: t('cookies.section2.content') },
              { title: t('cookies.section3.title'), content: t('cookies.section3.content') },
              { title: t('cookies.section4.title'), content: t('cookies.section4.content') },
              { title: t('cookies.section5.title'), content: t('cookies.section5.content') },
              { title: t('cookies.section6.title'), content: t('cookies.section6.content') },
            ]}
            importantNote={t('cookies.important')}
            isVisible={visibleSections.includes('cookies')}
          />
        </div>

        <Footer />
      </main>

      <SearchBar />
      <ScrollToTop />
    </div>
  );
};

const LegalHub = () => {
  // Устанавливаем мета-теги для страницы через document.title (простой способ без Helmet)
  useEffect(() => {
    document.title = 'Sentiens Legal Hub — Юридические AI-решения';
    
    // Обновляем meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Инновационные AI-решения для юридической практики. Автоматизация документооборота, анализ договоров и правовая консультация с помощью искусственного интеллекта.');
    
    // Обновляем canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://sentiensapps.online/legal/');
    
    return () => {
      // Восстанавливаем оригинальные значения при unmount
      document.title = 'SentiensApps — Мы выращиваем интеллект';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Семейство AI-приложений, где каждая нейросеть — не игрушка, а инструмент для прорыва. Исследуйте вселенные искусственного интеллекта.');
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://sentiensapps.online/');
      }
    };
  }, []);

  return (
    <LanguageProvider>
      <LegalContent />
    </LanguageProvider>
  );
};

export default LegalHub;
