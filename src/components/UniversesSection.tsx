import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Calculator, Palette, MessageCircle, ArrowRight, Lock, Zap } from 'lucide-react';

const mainApp = {
  id: 'epochal-dialog',
  name: 'Epochal Dialog',
  description: 'Погрузитесь в диалоги с величайшими умами истории. От Сократа до Эйнштейна — каждая беседа меняет ваше понимание мира.',
  icon: Clock,
  status: 'active',
  tags: ['История', 'Образование', 'ИИ-личности'],
};

const upcomingApps = [
  {
    id: 'mathmind',
    name: 'MathMind',
    description: 'Ваш ИИ-наставник по точным наукам',
    icon: Calculator,
    status: 'coming',
  },
  {
    id: 'canvas-weaver',
    name: 'Canvas Weaver',
    description: 'Соавтор в генеративном искусстве',
    icon: Palette,
    status: 'coming',
  },
  {
    id: 'verba',
    name: 'Verba',
    description: 'Мастер языка и переговоров',
    icon: MessageCircle,
    status: 'coming',
  },
];

export const UniversesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="universes" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm font-inter text-neon-green border border-neon-green/30 mb-6">
            Наши вселенные
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6">
            Порталы в новые <span className="text-gradient-neural">возможности</span>
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
                  Войти в эпоху
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
          <p className="text-center font-inter text-muted-foreground mb-8">
            Новые вселенные на стадии запуска. Следите за обновлениями.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingApps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-6 h-full relative overflow-hidden border border-border/50 hover:border-muted-foreground/30 transition-colors duration-500">
                  {/* Locked overlay */}
                  <div className="absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <span className="text-sm font-inter text-muted-foreground">Скоро</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <app.icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-orbitron font-semibold mb-1">{app.name}</h4>
                      <p className="text-sm font-inter text-muted-foreground">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  {/* Shimmer effect */}
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
