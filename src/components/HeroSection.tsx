import { motion } from 'framer-motion';
import { ArrowDown, Zap, Brain, Sparkles } from 'lucide-react';
import { AnimatedText, AnimatedGradientText } from './AnimatedText';
import { useLocalization } from '@/contexts/LocalizationContext';

export const HeroSection = () => {
  const { t } = useLocalization();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Central glowing orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 blur-3xl" />
        <div className="absolute inset-12 rounded-full border border-neon-cyan/20" />
        <div className="absolute inset-24 rounded-full border border-neon-purple/20" />
        <div className="absolute inset-36 rounded-full border border-neon-cyan/10" />
      </motion.div>

      <div className="section-container relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-20 left-4 md:left-20"
              animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Brain className="w-8 h-8 text-neon-cyan/40" />
            </motion.div>
            <motion.div
              className="absolute top-32 right-4 md:right-20"
              animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-neon-purple/50" />
            </motion.div>
            <motion.div
              className="absolute bottom-32 left-8 md:left-16"
              animate={{ y: [-5, 15, -5] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Sparkles className="w-7 h-7 text-neon-green/40" />
            </motion.div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-inter text-muted-foreground">
              {t('hero.title')}
            </span>
          </motion.div>

          {/* Main heading with letter-by-letter animation */}
          <h1 className="font-orbitron font-bold text-4xl sm:text-3xl md:text-3xl lg:text-6xl mb-6 leading-tight">
            <span className="block text-foreground">
              <AnimatedText text={t('hero.subtitle').split('.')[0]} delay={0.3} />
            </span>
            <span className="block">
              <AnimatedGradientText text={t('hero.subtitle').split('.')[1].trim()} delay={0.8} />
            </span>
            <span className="block text-foreground">
              <AnimatedText text={t('hero.subtitle').split('.')[2]?.trim() || ''} delay={1.3} />
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#universes" className="btn-neural flex items-center gap-3 group">
              {t('hero.cta_primary')}
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
              </motion.span>
            </a>
            <a href="#philosophy" className="btn-ghost-neural">
              {t('hero.cta_secondary')}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
