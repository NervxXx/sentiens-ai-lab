import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

interface HeaderProps {
  activeSection: string;
}

const Header = ({ activeSection }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'privacy', label: t('nav.privacy') },
    { id: 'terms', label: t('nav.terms') },
    { id: 'cookies', label: t('nav.cookies') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full',
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <Logo size="xs" alt="SentiensApps" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold gradient-text hidden sm:inline">SentiensApps</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn('nav-link text-sm font-medium', activeSection === item.id && 'active')}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center glass-subtle rounded-full p-1">
              <button
                onClick={() => setLanguage('ru')}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  language === 'ru' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                EN
              </button>
            </div>



            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full glass-subtle hover:bg-primary/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 glass rounded-xl p-4 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  activeSection === item.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
