import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Building2, GraduationCap, Code2, ChevronRight, Sparkles, Target, Lightbulb, MessageCircle, Heart, BookOpen, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedGradientText, AnimatedText } from './AnimatedText';
import { useLocalization } from '@/contexts/LocalizationContext';

interface AudienceCardProps {
  icon: React.ReactNode;
  title: string;
  problem: string;
  solution: string;
  index: number;
  accentGradient: string;
  iconBg: string;
  glowColor: string;
  t: (key: string) => string;
}

const AudienceCard = ({ icon, title, problem, solution, index, accentGradient, iconBg, glowColor, t }: AudienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated glow effect */}
      <motion.div 
        className={cn("absolute -inset-1 rounded-3xl blur-xl opacity-0", glowColor)}
        animate={{ 
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.4 }}
      />
      
      <motion.div 
        className={cn(
          "relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500",
          "bg-gradient-to-br from-background/80 to-background/40",
          "border border-border/50",
          "backdrop-blur-xl",
          isExpanded ? "shadow-2xl shadow-primary/10" : "shadow-lg"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ 
          y: -8,
          borderColor: '#60f0ff80', // hsl(187, 100%, 50%) with 50% opacity
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient accent line with animation */}
        <motion.div 
          className={cn("absolute top-0 left-0 right-0 h-1", accentGradient)}
          animate={{ scaleX: isHovered ? 1 : 0.3, originX: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Shimmer effect on hover - CSS only for performance */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Header - always visible */}
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-5">
            {/* Icon container with enhanced animation */}
            <motion.div 
              animate={{ 
                rotate: isExpanded ? 360 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.6, type: "spring" }}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center",
                "shadow-lg relative",
                iconBg
              )}
            >
              {icon}
              {/* Icon glow */}
              <motion.div 
                className={cn("absolute inset-0 rounded-2xl blur-md", iconBg)}
                animate={{ opacity: isHovered ? 0.6 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Title and preview */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <motion.h3 
                  className="font-orbitron text-xl md:text-2xl font-bold text-foreground"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {title}
                </motion.h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronRight className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
              
              {/* Preview text - shown when collapsed */}
              <AnimatePresence mode="wait">
                {!isExpanded && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 font-inter text-muted-foreground line-clamp-2"
                  >
                    {problem}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                {/* Divider */}
                <div className={cn("h-px mb-6", accentGradient, "opacity-30")} />
                
                {/* Problem section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-destructive" />
                    <span className="font-orbitron text-sm font-semibold text-destructive uppercase tracking-wider">
                      {t('audience.problem_label')}
                    </span>
                  </div>
                  <p className="font-inter text-muted-foreground leading-relaxed pl-7">
                    {problem}
                  </p>
                </div>
                
                {/* Solution section */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-neon-green" />
                    <span className="font-orbitron text-sm font-semibold text-neon-green uppercase tracking-wider">
                      {t('audience.solution_label')}
                    </span>
                  </div>
                  <p className="font-inter text-foreground/90 leading-relaxed pl-7">
                    {solution}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-4 right-4 opacity-10">
                  <Sparkles className="w-20 h-20 text-primary" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const getAudiences = (t: (key: string) => string) => [
  {
    icon: <BookOpen className="w-8 h-8 text-white" />,
    title: t('audience.cards.0.title'),
    problem: t('audience.cards.0.problem'),
    solution: t('audience.cards.0.solution'),
    accentGradient: "bg-gradient-to-r from-blue-500 via-blue-500/50 to-transparent",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-500/70",
    glowColor: "bg-blue-500/30",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    title: t('audience.cards.1.title'),
    problem: t('audience.cards.1.problem'),
    solution: t('audience.cards.1.solution'),
    accentGradient: "bg-gradient-to-r from-yellow-500 via-yellow-500/50 to-transparent",
    iconBg: "bg-gradient-to-br from-yellow-500 to-yellow-500/70",
    glowColor: "bg-yellow-500/30",
  },
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: t('audience.cards.2.title'),
    problem: t('audience.cards.2.problem'),
    solution: t('audience.cards.2.solution'),
    accentGradient: "bg-gradient-to-r from-pink-500 via-pink-500/50 to-transparent",
    iconBg: "bg-gradient-to-br from-pink-500 to-pink-500/70",
    glowColor: "bg-pink-500/30",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    title: t('audience.cards.3.title'),
    problem: t('audience.cards.3.problem'),
    solution: t('audience.cards.3.solution'),
    accentGradient: "bg-gradient-to-r from-green-500 via-green-500/50 to-transparent",
    iconBg: "bg-gradient-to-br from-green-500 to-green-500/70",
    glowColor: "bg-green-500/30",
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: t('audience.cards.4.title'),
    problem: t('audience.cards.4.problem'),
    solution: t('audience.cards.4.solution'),
    accentGradient: "bg-gradient-to-r from-purple-500 via-purple-500/50 to-transparent",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-500/70",
    glowColor: "bg-purple-500/30",
  },
];

export const AudienceSection = () => {
  const { t } = useLocalization();
  const audiences = getAudiences(t);

  return (
    <section id="audience" className="relative py-24 md:py-32 overflow-x-hidden overflow-y-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <motion.div 
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-container relative z-10">
        {/* Header with staggered animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
            className="inline-block px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-sm font-medium mb-6"
          >
            {t('section_badges.audience')}
          </motion.span>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-bold">
              <AnimatedGradientText text={t('section_titles.who_is_this_for')} delay={0.2} />
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-inter text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            {t('audience.description')}
          </motion.p>
        </motion.div>

        {/* Audience cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {audiences.map((audience, index) => (
            <AudienceCard key={index} {...audience} index={index} t={t} />
          ))}
        </div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 font-inter text-sm text-muted-foreground"
        >
          {t('audience.cta')}
        </motion.p>
      </div>
    </section>
  );
};
