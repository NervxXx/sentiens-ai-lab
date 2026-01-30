import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../hooks/useLanguage';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground glow transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      )}
      aria-label={t('action.scrollTop')}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
