import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Target, Network, type LucideIcon } from 'lucide-react';
import { AnimatedText, AnimatedGradientText } from './AnimatedText';

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass: string;
  bgClass: string;
  glowClass: string;
  gradientClass: string;
}

const pillars: Pillar[] = [
  {
    icon: Brain,
    title: 'Глубокий смысл',
    description: 'Мы создаем не просто чат-ботов, а целостные личности и специализированные интеллекты.',
    colorClass: 'text-neon-cyan',
    bgClass: 'bg-neon-cyan/10',
    glowClass: 'bg-neon-cyan/20',
    gradientClass: 'from-neon-cyan to-neon-cyan/50',
  },
  {
    icon: Target,
    title: 'Безупречная польза',
    description: 'Каждое приложение решает конкретную задачу — от обучения до творчества.',
    colorClass: 'text-neon-purple',
    bgClass: 'bg-neon-purple/10',
    glowClass: 'bg-neon-purple/20',
    gradientClass: 'from-neon-purple to-neon-purple/50',
  },
  {
    icon: Network,
    title: 'Живая экосистема',
    description: 'Наши приложения обогащают друг друга, делясь знаниями внутри единой сети Sentiens.',
    colorClass: 'text-neon-green',
    bgClass: 'bg-neon-green/10',
    glowClass: 'bg-neon-green/20',
    gradientClass: 'from-neon-green to-neon-green/50',
  },
];

export const PhilosophySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Central rotating structure */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="w-[500px] h-[500px] opacity-20"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon
              points="100,10 190,60 190,140 100,190 10,140 10,60"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="0.5"
            />
            <polygon
              points="100,30 170,70 170,130 100,170 30,130 30,70"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="0.5"
            />
            <polygon
              points="100,50 150,80 150,120 100,150 50,120 50,80"
              fill="none"
              stroke="url(#gradient3)"
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(187, 100%, 50%)" />
                <stop offset="100%" stopColor="hsl(270, 70%, 58%)" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(270, 70%, 58%)" />
                <stop offset="100%" stopColor="hsl(157, 100%, 50%)" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(157, 100%, 50%)" />
                <stop offset="100%" stopColor="hsl(187, 100%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-inter text-primary border border-primary/30 mb-6 backdrop-blur-sm bg-primary/5">
            Ядро Sentiens
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6">
            <AnimatedText text="Философия" delay={0} />{' '}
            <AnimatedGradientText text="Sentiens" delay={0.4} />
          </h2>
          <p className="font-inter text-muted-foreground max-w-xl mx-auto text-lg">
            <AnimatedText text="Три принципа, которые определяют каждое наше решение и каждую строку кода." delay={0.6} staggerChildren={0.015} />
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + index * 0.15,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group perspective-1000"
            >
              <div className="glass-card-hover rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-500">
                {/* Glow effect on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.gradientClass} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                />
                
                {/* Shimmer effect - CSS transition based */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <motion.div 
                  className={`relative w-16 h-16 rounded-2xl ${pillar.bgClass} flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <pillar.icon className={`w-8 h-8 ${pillar.colorClass}`} />
                  <motion.div 
                    className={`absolute inset-0 rounded-2xl ${pillar.glowClass} blur-xl`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="font-orbitron text-xl font-semibold mb-4 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  <span className="group-hover:text-primary transition-colors">{pillar.title}</span>
                </motion.h3>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>

                {/* Decorative line with animation */}
                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.gradientClass}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
