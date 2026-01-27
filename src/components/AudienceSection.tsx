import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Building2, GraduationCap, Code2, ChevronRight, Sparkles, Target, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudienceCardProps {
  icon: React.ReactNode;
  title: string;
  problem: string;
  solution: string;
  index: number;
  accentGradient: string;
  iconBg: string;
}

const AudienceCard = ({ icon, title, problem, solution, index, accentGradient, iconBg }: AudienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div 
        className={cn(
          "relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500",
          "bg-gradient-to-br from-background/80 to-background/40",
          "border border-border/50 hover:border-primary/50",
          "backdrop-blur-xl",
          isExpanded ? "shadow-2xl shadow-primary/10" : "shadow-lg"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Gradient accent line */}
        <div className={cn("absolute top-0 left-0 right-0 h-1", accentGradient)} />
        
        {/* Header - always visible */}
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-5">
            {/* Icon container */}
            <motion.div 
              animate={{ rotate: isExpanded ? 360 : 0 }}
              transition={{ duration: 0.6 }}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center",
                "shadow-lg",
                iconBg
              )}
            >
              {icon}
            </motion.div>
            
            {/* Title and preview */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-orbitron text-xl md:text-2xl font-bold text-foreground">
                  {title}
                </h3>
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
                      Проблема
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
                      Наше решение
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
      </div>
    </motion.div>
  );
};

export const AudienceSection = () => {
  const audiences = [
    {
      icon: <Building2 className="w-8 h-8 text-white" />,
      title: "Корпорации",
      problem: "Статические тренинги и симуляции не дают реалистичного опыта и обратной связи.",
      solution: "Агенты как «цифровые коллеги» и «клиенты» для отработки переговоров, продаж и управления в динамичных, адаптивных сценариях.",
      accentGradient: "bg-gradient-to-r from-neon-cyan via-neon-cyan/50 to-transparent",
      iconBg: "bg-gradient-to-br from-neon-cyan to-neon-cyan/70",
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      title: "Образовательные платформы",
      problem: "Онлайн-обучение часто пассивно и не учитывает индивидуальный контекст ученика.",
      solution: "Агенты как персональные наставники и интерактивные «персонажи-знания», которые учат через диалог, а не монолог.",
      accentGradient: "bg-gradient-to-r from-neon-purple via-neon-purple/50 to-transparent",
      iconBg: "bg-gradient-to-br from-neon-purple to-neon-purple/70",
    },
    {
      icon: <Code2 className="w-8 h-8 text-white" />,
      title: "Креаторы и разработчики",
      problem: "Создание умных, запоминающихся цифровых персонажей или сложных диалоговых систем требует огромных ресурсов и экспертизы.",
      solution: "Наш движок — это инфраструктура для быстрого создания и внедрения глубоких, автономных агентов в любые продукты и миры.",
      accentGradient: "bg-gradient-to-r from-neon-green via-neon-green/50 to-transparent",
      iconBg: "bg-gradient-to-br from-neon-green to-neon-green/70",
    },
  ];

  return (
    <section id="audience" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-3xl" />

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
            className="inline-block px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-sm font-medium mb-6"
          >
            Аудитория
          </motion.span>
          
          <h2 className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-neural">Для кого это?</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Наша технология создаёт новый класс цифровых сущностей. Мы решаем задачи там, где требуется не просто ответ, а <span className="text-primary font-medium">осмысленный диалог</span>, <span className="text-neon-purple font-medium">управляемая симуляция</span> или <span className="text-neon-green font-medium">живое взаимодействие</span>.
          </p>
        </motion.div>

        {/* Audience cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {audiences.map((audience, index) => (
            <AudienceCard key={index} {...audience} index={index} />
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
          Нажмите на карточку, чтобы узнать больше
        </motion.p>
      </div>
    </section>
  );
};
