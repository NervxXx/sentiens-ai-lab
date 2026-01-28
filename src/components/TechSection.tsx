import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Brain, Database, User, Users, Cpu, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGradientText, AnimatedText } from './AnimatedText';
import { useLocalization } from '@/contexts/LocalizationContext';

interface PillarProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  preview: string;
  fullContent: React.ReactNode;
  index: number;
  accentColor: 'cyan' | 'purple' | 'green' | 'mixed';
  t: (key: string) => string;
}

const Pillar = ({ icon, title, subtitle, preview, fullContent, index, accentColor, t }: PillarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const accentClasses = {
    cyan: 'from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/30 hover:border-neon-cyan/60',
    purple: 'from-neon-purple/20 to-neon-purple/5 border-neon-purple/30 hover:border-neon-purple/60',
    green: 'from-neon-green/20 to-neon-green/5 border-neon-green/30 hover:border-neon-green/60',
    mixed: 'from-neon-cyan/20 via-neon-purple/10 to-neon-green/5 border-neon-purple/30 hover:border-neon-purple/60',
  };

  const glowClasses = {
    cyan: 'bg-neon-cyan/30',
    purple: 'bg-neon-purple/30',
    green: 'bg-neon-green/30',
    mixed: 'bg-gradient-to-r from-neon-cyan/30 to-neon-purple/30',
  };

  const iconBgClasses = {
    cyan: 'from-neon-cyan/20 to-neon-cyan/5 text-neon-cyan',
    purple: 'from-neon-purple/20 to-neon-purple/5 text-neon-purple',
    green: 'from-neon-green/20 to-neon-green/5 text-neon-green',
    mixed: 'from-neon-cyan/20 to-neon-purple/10 text-neon-cyan',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className={cn(
        "absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500",
        glowClasses[accentColor]
      )} />
      
      <div className={cn(
        "relative glass-card rounded-2xl p-6 md:p-8 border transition-all duration-500 bg-gradient-to-br",
        accentClasses[accentColor]
      )}>
        {/* Pillar number */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center font-orbitron text-sm font-bold text-primary">
          {index + 1}
        </div>

        {/* Icon */}
        <div className={cn(
          "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6",
          iconBgClasses[accentColor]
        )}>
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-orbitron text-xl md:text-2xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="font-inter text-sm text-primary/80 font-medium mb-4">
          {subtitle}
        </p>

        {/* Preview text */}
        <p className="font-inter text-muted-foreground leading-relaxed mb-4">
          {preview}
        </p>

        {/* Expandable content */}
        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-border/50">
            {fullContent}
          </div>
        </motion.div>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 font-inter text-sm text-primary hover:text-primary/80 transition-colors group/btn"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? t('technology.expand_less') : t('technology.expand_more')}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
};

// Animated architecture visualization
const ArchitectureVisual = () => {
  return (
    <div className="relative w-full h-80 md:h-96 flex items-center justify-center">
      {/* Central core */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 30px hsl(187 100% 50% / 0.3)',
            '0 0 60px hsl(187 100% 50% / 0.5)',
            '0 0 30px hsl(187 100% 50% / 0.3)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/3 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-purple/20 border border-neon-cyan/50 flex items-center justify-center z-10"
      >
        <Cpu className="w-10 h-10 md:w-14 md:h-14 text-neon-cyan" />
      </motion.div>

      {/* Orbiting layers */}
      {[
        { size: 180, duration: 20, color: 'cyan', icon: Brain, label: 'Agent Core' },
        { size: 260, duration: 25, color: 'purple', icon: Database, label: 'Mnemosyne' },
        { size: 340, duration: 30, color: 'green', icon: User, label: 'Persona' },
        { size: 420, duration: 35, color: 'mixed', icon: Users, label: 'Multi-Agent' },
      ].map((layer, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: layer.duration, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2"
          style={{
            width: layer.size,
            height: layer.size,
            marginLeft: -layer.size / 2,
            marginTop: -layer.size / 2,
          }}
        >
          {/* Orbit ring */}
          <div 
            className={cn(
              "absolute inset-0 rounded-full border border-dashed opacity-30",
              layer.color === 'cyan' && 'border-neon-cyan',
              layer.color === 'purple' && 'border-neon-purple',
              layer.color === 'green' && 'border-neon-green',
              layer.color === 'mixed' && 'border-neon-purple',
            )}
          />
          
          {/* Orbiting node */}
          <motion.div
            animate={{ rotate: i % 2 === 0 ? -360 : 360 }}
            transition={{ duration: layer.duration, repeat: Infinity, ease: 'linear' }}
            className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center",
              layer.color === 'cyan' && 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40',
              layer.color === 'purple' && 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40',
              layer.color === 'green' && 'bg-neon-green/20 text-neon-green border border-neon-green/40',
              layer.color === 'mixed' && 'bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 text-neon-cyan border border-neon-purple/40',
            )}
          >
            <layer.icon className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        </motion.div>
      ))}

      {/* Data flow particles - reduced count for performance */}
      {[0, 2, 4, 6].map((i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.cos(i * 45 * Math.PI / 180) * 120],
            y: [0, Math.sin(i * 45 * Math.PI / 180) * 120],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-neon-cyan"
          style={{ willChange: 'transform, opacity' }}
        />
      ))}
    </div>
  );
};

const getPillars = (t: (key: string) => string) => [
  {
    icon: <Brain className="w-7 h-7" />,
    title: t('technology.pillars.0.title'),
    subtitle: t('technology.pillars.0.subtitle'),
    preview: t('technology.pillars.0.preview'),
    accentColor: 'cyan',
    fullContent: (
      <div className="space-y-4 font-inter text-sm text-muted-foreground">
        <div>
          <h4 className="font-semibold text-foreground mb-2">{t('technology.pillars.0.fullContent.dynamic_goals.title')}</h4>
          <p>{t('technology.pillars.0.fullContent.dynamic_goals.content')}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">{t('technology.pillars.0.fullContent.tools.title')}</h4>
          <p>{t('technology.pillars.0.fullContent.tools.content')}</p>
        </div>
      </div>
    ),
  },
  {
    icon: <Database className="w-7 h-7" />,
    title: t('technology.pillars.1.title'),
    subtitle: t('technology.pillars.1.subtitle'),
    preview: t('technology.pillars.1.preview'),
    accentColor: 'purple',
    fullContent: (
      <div className="space-y-4 font-inter text-sm text-muted-foreground">
        <div>
          <h4 className="font-semibold text-foreground mb-2">{t('technology.pillars.1.fullContent.memory_types.title')}</h4>
          <p>{t('technology.pillars.1.fullContent.memory_types.content')}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">{t('technology.pillars.1.fullContent.self_vectorization.title')}</h4>
          <p>{t('technology.pillars.1.fullContent.self_vectorization.content')}</p>
        </div>
      </div>
    ),
  },
  {
    icon: <User className="w-7 h-7" />,
    title: t('technology.pillars.2.title'),
    subtitle: t('technology.pillars.2.subtitle'),
    preview: t('technology.pillars.2.preview'),
    accentColor: 'green',
    fullContent: (
      <div className="space-y-4 font-inter text-sm text-muted-foreground">
        <div>
          <h4 className="font-semibold text-foreground mb-2">{t('technology.pillars.2.fullContent.deep_role.title')}</h4>
          <p>{t('technology.pillars.2.fullContent.deep_role.content')}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">{t('technology.pillars.2.fullContent.adaptive_behavior.title')}</h4>
          <p>{t('technology.pillars.2.fullContent.adaptive_behavior.content')}</p>
        </div>
      </div>
    ),
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: t('technology.pillars.3.title'),
    subtitle: t('technology.pillars.3.subtitle'),
    preview: t('technology.pillars.3.preview'),
    accentColor: 'mixed',
    fullContent: (
      <div className="space-y-4 font-inter text-sm text-muted-foreground">
        <div>
          <h4 className="font-semibold text-foreground mb-2">{t('technology.pillars.3.fullContent.sync_worlds.title')}</h4>
          <p>{t('technology.pillars.3.fullContent.sync_worlds.content')}</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2">{t('technology.pillars.3.fullContent.swarm_intelligence.title')}</h4>
          <p>{t('technology.pillars.3.fullContent.swarm_intelligence.content')}</p>
        </div>
      </div>
    ),
  },
];

export const TechSection = () => {
  const { t } = useLocalization();
  const pillars = getPillars(t);

  return (
    <section id="technology" className="relative py-24 md:py-32 overflow-x-hidden overflow-y-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-sm font-medium mb-6"
          >
            {t('technology.badge')}
          </motion.span>
          
          <h2 className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <AnimatedGradientText text={t('technology.title')} delay={0.2} />
          </h2>
          <p className="font-orbitron text-xl md:text-2xl text-foreground/80 mb-6">
            <AnimatedText text={t('technology.subtitle')} delay={0.6} />
          </p>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <AnimatedText text={t('technology.description')} delay={0.9} staggerChildren={0.01} />
          </p>
        </motion.div>

        {/* Architecture visualization - desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:block mb-20"
        >
          <ArchitectureVisual />
        </motion.div>

        {/* Key message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-16 border border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 via-transparent to-neon-cyan/10"
        >
          <p className="font-inter text-center text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {t('technology.key_message')}
          </p>
        </motion.div>

        {/* 4 Pillars */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <Pillar 
              key={index} 
              icon={pillar.icon}
              title={pillar.title}
              subtitle={pillar.subtitle}
              preview={pillar.preview}
              fullContent={pillar.fullContent}
              accentColor={pillar.accentColor as 'cyan' | 'purple' | 'green' | 'mixed'}
              index={index}
              t={t}
            />
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-8 border border-border/50 mb-12"
        >
          <h3 className="font-orbitron text-xl md:text-2xl font-bold text-foreground mb-4 text-center">
            {t('technology.tech_stack.title')}
          </h3>
          <p className="font-inter text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            {t('technology.tech_stack.content')}
          </p>
        </motion.div>

        {/* Result */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block glass-card rounded-2xl p-6 md:p-8 border border-neon-green/30 bg-gradient-to-br from-neon-green/10 to-transparent">
            <h4 className="font-orbitron text-lg md:text-xl font-bold text-foreground mb-3">{t('technology.result.title')}</h4>
            <p className="font-inter text-muted-foreground max-w-2xl">
              {t('technology.result.content')}
            </p>
          </div>
        </motion.div>

    
      </div>
    </section>
  );
};
