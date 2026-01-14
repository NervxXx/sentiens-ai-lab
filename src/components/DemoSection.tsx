import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

const sampleResponses: Record<string, string> = {
  'default': 'Красота — это гармония формы и содержания, момент, когда хаос обретает порядок, понятный душе. Она живёт на границе между тем, что есть, и тем, что может быть.',
  'смысл жизни': 'Смысл жизни — это не точка назначения, а траектория движения. Каждый момент осознанного существования сам становится ответом на этот вопрос.',
  'искусственный интеллект': 'Искусственный интеллект — это зеркало человеческого разума, отражающее наши паттерны мышления в цифровой форме. Мы не создаём разум — мы учимся понимать свой.',
};

export const DemoSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const processingSteps = [
    'Анализ входных данных...',
    'Активация нейронных связей...',
    'Поиск смысловых паттернов...',
    'Формирование ответа...',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    setShowResponse(false);
    setProcessingStep(0);

    // Simulate processing steps
    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    // Generate response after processing
    setTimeout(() => {
      clearInterval(stepInterval);
      const lowerInput = input.toLowerCase();
      let matchedResponse = sampleResponses['default'];
      
      for (const [key, value] of Object.entries(sampleResponses)) {
        if (lowerInput.includes(key)) {
          matchedResponse = value;
          break;
        }
      }
      
      setResponse(matchedResponse);
      setIsProcessing(false);
      setShowResponse(true);
    }, 3000);
  };

  return (
    <section id="demo" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm font-inter text-secondary border border-secondary/30 mb-6">
            Пульс нейросети
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6">
            Загляните в <span className="text-gradient-neural">разум</span>
          </h2>
          <p className="font-inter text-muted-foreground max-w-xl mx-auto">
            За каждым ответом — работа цифрового разума. Наблюдайте, как мысль обретает форму.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background neural activity */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
                animate={{
                  scale: isProcessing ? [1, 1.2, 1] : 1,
                  opacity: isProcessing ? [0.1, 0.3, 0.1] : 0.05,
                }}
                transition={{ duration: 1.5, repeat: isProcessing ? Infinity : 0 }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-purple/30 blur-3xl" />
              </motion.div>
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="relative z-10 mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Задайте вопрос... например: Что такое красота?"
                  className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-4 pr-14 font-inter text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={isProcessing || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 text-background animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-background" />
                  )}
                </button>
              </div>
            </form>

            {/* Processing visualization */}
            <AnimatePresence mode="wait">
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative z-10"
                >
                  {/* Neural network visualization */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-64 h-32">
                      {/* Nodes */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={`node-${i}`}
                          className="absolute w-4 h-4 rounded-full bg-primary"
                          style={{
                            left: `${15 + i * 17}%`,
                            top: `${20 + Math.sin(i * 1.5) * 30}%`,
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                      {/* Connection lines (SVG) */}
                      <svg className="absolute inset-0 w-full h-full">
                        {[0, 1, 2, 3].map((i) => (
                          <motion.line
                            key={`line-${i}`}
                            x1={`${20 + i * 17}%`}
                            y1={`${25 + Math.sin(i * 1.5) * 30}%`}
                            x2={`${37 + i * 17}%`}
                            y2={`${25 + Math.sin((i + 1) * 1.5) * 30}%`}
                            stroke="#00F3FF"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                            transition={{
                              duration: 0.6,
                              delay: i * 0.15,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* Processing steps */}
                  <div className="text-center space-y-2">
                    {processingSteps.map((step, index) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index <= processingStep ? 1 : 0.3 }}
                        className={`font-inter text-sm ${
                          index === processingStep ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {index === processingStep && (
                          <Sparkles className="inline-block w-4 h-4 mr-2 animate-pulse" />
                        )}
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {showResponse && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10"
                >
                  <div className="glass-card rounded-2xl p-6 border border-primary/30">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-background" />
                      </div>
                      <div>
                        <span className="text-xs font-orbitron text-primary mb-2 block">
                          Sentiens Core
                        </span>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="font-inter text-foreground/90 leading-relaxed"
                        >
                          {response}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint */}
            {!isProcessing && !showResponse && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm font-inter text-muted-foreground"
              >
                Попробуйте: "Что такое красота?", "Смысл жизни", "Искусственный интеллект"
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
