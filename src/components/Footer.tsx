import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
];

const footerLinks = [
  { label: 'Блог', href: '#' },
  { label: 'Вакансии', href: '#' },
  { label: 'Контакты', href: '#' },
  { label: 'Политика конфиденциальности', href: '#' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 overflow-hidden border-t border-border/30">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-background" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
            </div>
            <span className="font-orbitron font-bold text-xl">SentiensApps</span>
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-6 justify-center">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="font-inter text-sm text-muted-foreground">
            SentiensApps. Выращиваем интеллект с {currentYear}.
          </p>
        </div>
      </div>
    </footer>
  );
};
