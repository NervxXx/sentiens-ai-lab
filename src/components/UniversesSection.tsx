import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Calculator, Palette, MessageCircle, ArrowRight, Lock, Zap } from 'lucide-react';
import { AnimatedText, AnimatedGradientText } from './AnimatedText';
import { useLocalization } from '@/contexts/LocalizationContext';

const getMainApp = (t: (key: string) => string) => ({
  id: 'epochal-dialog',
  name: t('universes.main_app.name'),
  description: t('universes.main_app.description'),
  icon: Clock,
  status: 'active',
  tags: [
    t('universes.tags.history'),
    t('universes.tags.education'),
    t('universes.tags.ai_personalities'),
  ],
});

const getUpcomingApps = (t: (key: string) => string) => [
  {
    id: 'TalkTrainer-lab',
    name: t('universes.upcoming.0.name'),
    description: t('universes.upcoming.0.description'),
    icon: Calculator,
    status: 'coming',
  },
  {
    id: 'TemplateFly',
    name: t('universes.upcoming.1.name'),
    description: t('universes.upcoming.1.description'),
    icon: Palette,
    status: 'coming',
  },
  {
    id: 'LeapLingo',
    name: t('universes.upcoming.2.name'),
    description: t('universes.upcoming.2.description'),
    icon: MessageCircle,
    status: 'coming',
  },
];

export const UniversesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useLocalization();
  
  const mainApp = getMainApp(t);
  const upcomingApps = getUpcomingApps(t);

  return (
    <section id="universes" ref={sectionRef} className="relative py-32 overflow-x-hidden overflow-y-hidden">
      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm font-inter text-neon-green border border-neon-green/30 mb-6">
            {t('universes.title')}
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6">
            <AnimatedText text={t('universes.subtitle').split(' ')[0]} delay={0} />{' '}
            <AnimatedGradientText text={t('universes.subtitle').split(' ').slice(1).join(' ')} delay={0.5} />
          </h2>
        </motion.div>

        {/* Main App - Epochal Dialog */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="group relative glass-card-hover rounded-3xl overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                style={{
                  backgroundImage: 'radial-gradient(circle at center, rgba(0, 243, 255, 0.1) 0%, transparent 50%)',
                  backgroundSize: '100% 100%',
                }}
              />
            </div>

            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              {/* Left: Icon & Visual */}
              <div className="relative">
                <motion.div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Clock className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                  <div className="absolute inset-0 rounded-3xl pulse-glow" />
                </motion.div>
                {/* Orbiting elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-neon-cyan/30 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap className="w-4 h-4 text-neon-cyan" />
                </motion.div>
              </div>

              {/* Right: Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {mainApp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-inter bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-orbitron text-2xl md:text-4xl font-bold mb-4 text-glow-cyan">
                  {mainApp.name}
                </h3>
                <p className="font-inter text-muted-foreground text-lg mb-8 max-w-xl">
                  {mainApp.description}
                </p>
                <motion.a
                  href="#demo"
                  className="btn-neural inline-flex items-center gap-3 group/btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('universes.main_app.cta')}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>

            {/* Border glow on hover */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-500" />
          </div>
        </motion.div>

        {/* Upcoming Apps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center font-inter text-muted-foreground mb-8"
          >
            {t('universes.coming_soon')}
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingApps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-6 h-full relative overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
                  {/* Locked overlay with improved animation */}
                  <motion.div 
                    className="absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="text-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <span className="text-sm font-inter text-muted-foreground">{t('universes.upcoming.0.status')}</span>
                    </motion.div>
                  </motion.div>

                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <app.icon className="w-6 h-6 text-muted-foreground" />
                    </motion.div>
                    <div>
                      <h4 className="font-orbitron font-semibold mb-1">{app.name}</h4>
                      <p className="text-sm font-inter text-muted-foreground">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  {/* Shimmer effect - CSS-based for better performance */}
                  <div className="absolute inset-0 shimmer opacity-30" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
