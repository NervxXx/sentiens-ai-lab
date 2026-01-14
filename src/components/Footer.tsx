import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Linkedin, MessageCircle, Mail, MapPin, Zap } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
];

const footerLinks = {
  product: [
    { label: 'Epochal Dialog', href: '#' },
    { label: 'MathMind', href: '#' },
    { label: 'Canvas Weaver', href: '#' },
    { label: 'Verba', href: '#' },
  ],
  company: [
    { label: 'О нас', href: '#' },
    { label: 'Блог', href: '#' },
    { label: 'Вакансии', href: '#' },
    { label: 'Контакты', href: '#' },
  ],
  legal: [
    { label: 'Политика конфиденциальности', href: '#' },
    { label: 'Условия использования', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-green flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-background" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
              <span className="font-orbitron font-bold text-2xl bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                SentiensApps
              </span>
            </motion.a>
            
            <p className="font-inter text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Создаем интеллектуальные приложения, которые меняют способ взаимодействия человека с технологиями.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:hello@sentiensapps.com" className="flex items-center gap-3 text-muted-foreground hover:text-neon-cyan transition-colors group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center group-hover:border-neon-cyan/30">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-inter text-sm">hello@sentiensapps.com</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-inter text-sm">Москва, Россия</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-2">
            <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-foreground mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-neon-cyan" />
              Продукты
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-muted-foreground hover:text-neon-cyan transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-purple" />
              Компания
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-muted-foreground hover:text-neon-purple transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon-purple group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-foreground mb-6">
              Правовая информация
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div className="lg:col-span-2">
            <h4 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-foreground mb-6">
              Социальные сети
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass-card text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4" />
                  <span className="font-inter text-xs">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
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
            © {currentYear} SentiensApps. Выращиваем интеллект.
          </p>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-inter text-xs">Создано с</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-neon-cyan" />
            </motion.div>
            <span className="font-inter text-xs">и искусственным интеллектом</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="font-inter text-xs text-muted-foreground">Все системы работают</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
