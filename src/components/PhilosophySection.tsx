import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Target, Network, type LucideIcon } from 'lucide-react';

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
            Философия <span className="text-gradient-neural">Sentiens</span>
          </h2>
          <p className="font-inter text-muted-foreground max-w-xl mx-auto text-lg">
            Три принципа, которые определяют каждое наше решение и каждую строку кода.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="group"
            >
              <div className="glass-card-hover rounded-2xl p-8 h-full relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl ${pillar.bgClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className={`w-8 h-8 ${pillar.colorClass}`} />
                  <div className={`absolute inset-0 rounded-2xl ${pillar.glowClass} blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>

                {/* Content */}
                <h3 className="font-orbitron text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>

                {/* Decorative line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
