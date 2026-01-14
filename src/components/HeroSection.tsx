import { motion } from 'framer-motion';
import { ArrowDown, Zap, Brain, Sparkles } from 'lucide-react';

export const HeroSection = () => {
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

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 md:left-20"
              animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Brain className="w-8 h-8 text-neon-cyan/40" />
            </motion.div>
            <motion.div
              className="absolute top-32 right-10 md:right-20"
              animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-neon-purple/50" />
            </motion.div>
            <motion.div
              className="absolute bottom-32 left-16"
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
              Новая эра искусственного интеллекта
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-orbitron font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
          >
            <span className="text-foreground">Мы выращиваем</span>
            <br />
            <span className="text-gradient-neural">интеллект.</span>
            <br />
            <span className="text-foreground">Полезный интеллект.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Семейство приложений, где каждая нейросеть — не игрушка, а инструмент для прорыва.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#universes" className="btn-neural flex items-center gap-3 group">
              Исследовать вселенные
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
              </motion.span>
            </a>
            <a href="#philosophy" className="btn-ghost-neural">
              Узнать больше
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '5+', label: 'Вселенных' },
              { value: '∞', label: 'Возможностей' },
              { value: '1', label: 'Ядро ИИ' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-orbitron text-2xl md:text-3xl font-bold text-glow-cyan text-primary mb-1">
                  {stat.value}
                </div>
                <div className="font-inter text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
