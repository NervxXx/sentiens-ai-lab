import { motion } from 'framer-motion';
import { Twitter, Linkedin, Youtube, Instagram, Mail, MapPin, Zap, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Logo } from '@/components/Logo';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sentiens-apps', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/SentiensApps', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/@SentiensApps', label: 'YouTube' },
    { icon: Instagram, href: 'https://www.instagram.com/sentiensapps/', label: 'Instagram' },
  ];

  return (
    <footer className="relative pt-24 pb-8 overflow-x-hidden overflow-y-hidden">
      {/* Neural grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <motion.a
              href="#"
              className="flex items-center gap-3 group mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 p-0.5">
                  <Logo size="sm" alt="SentiensApps" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-neon-cyan/30 blur-xl opacity-0 group-hover:opacity-80 transition-opacity" />
              </div>
              <span className="font-orbitron font-bold text-2xl bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                SentiensApps
              </span>
            </motion.a>
            
            <p className="font-inter text-muted-foreground mb-6 max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href={`mailto:${t('footer.email')}`} className="flex items-center gap-3 text-muted-foreground hover:text-neon-cyan transition-colors group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center group-hover:border-neon-cyan/30">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-inter text-sm">{t('footer.email')}</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-inter text-sm">{t('footer.location')}</span>
              </div>
            </div>
          </div>

          {/* Products column */}
          <div className="lg:col-span-2">
            <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-foreground mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-neon-cyan" />
              {t('footer.products')}
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                href="https://epochaldialog.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-sm text-muted-foreground hover:text-neon-cyan transition-colors text-left relative group"
              >
                <span className="relative">
                  Epochal Dialog
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
                </span>
              </a>
              <a
                href="https://talktrainerlab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-sm text-muted-foreground hover:text-neon-cyan transition-colors text-left relative group"
              >
                <span className="relative">
                  TalkTrainer lab
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
                </span>
              </a>
              <a
                href="https://templatefly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-sm text-muted-foreground hover:text-neon-cyan transition-colors text-left relative group"
              >
                <span className="relative">
                  TemplateFly
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
                </span>
              </a>
              <a
                href="https://leaplingo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-sm text-muted-foreground hover:text-neon-cyan transition-colors text-left relative group"
              >
                <span className="relative">
                  LeapLingo
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            </nav>
          </div>

          {/* Legal navigation column */}
          <div className="lg:col-span-2">
            <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-purple" />
              {t('nav.home')}
            </h4>
            <nav className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('privacy')}
                className="font-inter text-sm text-muted-foreground hover:text-neon-purple transition-colors text-left relative group"
              >
                <span className="relative">
                  {t('nav.privacy')}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-purple group-hover:w-full transition-all duration-300" />
                </span>
              </button>
              <button
                onClick={() => scrollToSection('terms')}
                className="font-inter text-sm text-muted-foreground hover:text-neon-purple transition-colors text-left relative group"
              >
                <span className="relative">
                  {t('nav.terms')}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-purple group-hover:w-full transition-all duration-300" />
                </span>
              </button>
              <button
                onClick={() => scrollToSection('cookies')}
                className="font-inter text-sm text-muted-foreground hover:text-neon-purple transition-colors text-left relative group"
              >
                <span className="relative">
                  {t('nav.cookies')}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-purple group-hover:w-full transition-all duration-300" />
                </span>
              </button>
            </nav>
          </div>

          {/* Social column */}
          <div className="lg:col-span-2">
            <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-foreground mb-6">
              {t('footer.social')}
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300 group w-40"
                >
                  <social.icon className="w-4 h-4" />
                  <span className="font-inter text-xs truncate">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Spacer column */}
          <div className="lg:col-span-2"></div>
        </div>

        {/* Divider with animation */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
          <motion.div 
            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent"
            animate={{ 
              left: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-inter text-xs">{t('footer.made_with')}</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-neon-cyan" />
            </motion.div>
            <span className="font-inter text-xs">{t('footer.and_ai')}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="font-inter text-xs text-muted-foreground">{t('footer.systems_operational')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
