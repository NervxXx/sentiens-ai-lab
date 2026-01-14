import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Cpu, Clock, Calculator, Palette, MessageCircle, Zap } from 'lucide-react';

const satellites = [
  { icon: Clock, label: 'История', color: 'neon-cyan', angle: 0 },
  { icon: Calculator, label: 'Математика', color: 'neon-purple', angle: 90 },
  { icon: Palette, label: 'Искусство', color: 'neon-green', angle: 180 },
  { icon: MessageCircle, label: 'Язык', color: 'neon-cyan', angle: 270 },
];

export const TechCoreSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredSatellite, setHoveredSatellite] = useState<number | null>(null);

  return (
    <section id="tech-core" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Interactive Diagram */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central Core */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-cyan flex items-center justify-center z-10"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(0, 243, 255, 0.5), 0 0 60px rgba(157, 78, 221, 0.3)',
                    '0 0 50px rgba(0, 243, 255, 0.7), 0 0 80px rgba(157, 78, 221, 0.5)',
                    '0 0 30px rgba(0, 243, 255, 0.5), 0 0 60px rgba(157, 78, 221, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Cpu className="w-14 h-14 text-background" />
              </motion.div>

              {/* Core label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 text-center z-10">
                <span className="font-orbitron text-sm font-semibold text-primary text-glow-cyan">
                  Sentiens Core AI
                </span>
              </div>

              {/* Orbital rings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <circle
                  cx="200"
                  cy="200"
                  r="140"
                  fill="none"
                  stroke="url(#orbital-gradient)"
                  strokeWidth="1"
                  strokeDasharray="10 5"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="orbital-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F3FF" />
                    <stop offset="50%" stopColor="#9D4EDD" />
                    <stop offset="100%" stopColor="#00F3FF" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Satellites */}
              {satellites.map((satellite, index) => {
                const angle = (satellite.angle * Math.PI) / 180;
                const radius = 140;
                const x = 50 + Math.cos(angle) * (radius / 2);
                const y = 50 + Math.sin(angle) * (radius / 2);

                return (
                  <motion.div
                    key={satellite.label}
                    className="absolute"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    onMouseEnter={() => setHoveredSatellite(index)}
                    onMouseLeave={() => setHoveredSatellite(null)}
                  >
                    {/* Connection line */}
                    <svg
                      className="absolute pointer-events-none"
                      style={{
                        width: '200px',
                        height: '200px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <motion.line
                        x1="100"
                        y1="100"
                        x2={100 + Math.cos(angle + Math.PI) * 80}
                        y2={100 + Math.sin(angle + Math.PI) * 80}
                        stroke={hoveredSatellite === index ? '#00F3FF' : 'rgba(0, 243, 255, 0.3)'}
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </svg>

                    {/* Satellite node */}
                    <motion.div
                      className={`relative w-16 h-16 rounded-xl glass-card flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        hoveredSatellite === index ? 'border-primary' : 'border-border'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <satellite.icon className={`w-7 h-7 text-${satellite.color}`} />
                      {hoveredSatellite === index && (
                        <motion.div
                          className="absolute -bottom-8 whitespace-nowrap"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <span className="text-xs font-inter text-primary">{satellite.label}</span>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Pulse on connection */}
                    {hoveredSatellite === index && (
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 3],
                          opacity: [1, 0],
                          x: Math.cos(angle + Math.PI) * 60 - 12,
                          y: Math.sin(angle + Math.PI) * 60 - 12,
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}

              {/* Animated data pulses */}
              {satellites.map((satellite, index) => (
                <motion.div
                  key={`pulse-${index}`}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((satellite.angle * Math.PI) / 180) * 100],
                    y: [0, Math.sin((satellite.angle * Math.PI) / 180) * 100],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-sm font-inter text-secondary border border-secondary/30 mb-6">
              Технологическое сердце
            </span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">
              Единое ядро —
              <br />
              <span className="text-gradient-neural">множество лиц</span>
            </h2>
            <p className="font-inter text-muted-foreground text-lg mb-8 leading-relaxed">
              В отличие от разрозненных ИИ-сервисов, все наши приложения питаются от постоянно обучающегося центрального ядра.
            </p>
            <div className="glass-card rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-neon-green" />
                </div>
                <p className="font-inter text-foreground/80 italic">
                  "Опыт, полученный в диалоге с Леонардо, делает умнее нашего математического гения."
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                'Синергия знаний между всеми приложениями',
                'Постоянное обучение и улучшение',
                'Единая архитектура безопасности',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 font-inter text-muted-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
