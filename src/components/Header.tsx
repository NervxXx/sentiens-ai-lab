import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useLocalization } from '@/contexts/LocalizationContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLocalization();

  const navItems = [
    { label: t('navigation.philosophy'), href: '#philosophy' },
    { label: t('navigation.technology'), href: '#technology' },
    { label: t('navigation.audience'), href: '#audience' },
    { label: t('navigation.universes'), href: '#universes' },
  ];

  const handleSmoothScroll = (href: string) => {
    // Close menu first
    setIsMenuOpen(false);
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        // Ensure the element is visible and scrollable
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Fallback: manually scroll to element position if needed
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 80; // 80px offset for header
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between border border-border/50">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 p-0.5">
                <img src={logo} alt="SentiensApps Logo" width="40" height="40" loading="lazy" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-neon-cyan/30 blur-xl opacity-0 group-hover:opacity-80 transition-opacity" />
            </div>
            <span className="font-orbitron font-bold text-xl bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              SentiensApps
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Language Switcher and CTA Button Group */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('ru')}
                className={`text-xs px-2 py-1 rounded transition-colors ${language === 'ru' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-muted-foreground hover:text-foreground'}`}
              >
                RU
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-muted-foreground hover:text-foreground'}`}
              >
                EN
              </button>
            </div>
            
            {/* CTA Button */}
            <motion.a
              href="#subscribe"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="btn-neural text-sm py-2 px-6"
            >
              {t('subscribe.button')}
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="glass-card rounded-2xl mt-2 px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleSmoothScroll(item.href)}
                className="font-inter text-muted-foreground hover:text-primary transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleSmoothScroll('#subscribe')} 
              className="btn-neural text-center text-sm py-3"
            >
              {t('subscribe.button')}
            </button>
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center gap-3 pt-2 border-t border-border/30">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setLanguage('ru')}
                className={`text-sm px-3 py-1 rounded transition-colors ${language === 'ru' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Русский
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`text-sm px-3 py-1 rounded transition-colors ${language === 'en' ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-muted-foreground hover:text-foreground'}`}
              >
                English
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
