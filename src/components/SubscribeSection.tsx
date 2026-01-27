import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Check, Sparkles, BookOpen, FlaskConical, Palette, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const interests = [
  { id: 'history', label: 'История', icon: BookOpen },
  { id: 'science', label: 'Наука', icon: FlaskConical },
  { id: 'creativity', label: 'Творчество', icon: Palette },
  { id: 'business', label: 'Бизнес', icon: Briefcase },
];

export const SubscribeSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Вы успешно подписались на обновления!');
  };

  return (
    <section id="subscribe" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-neon-purple/10 via-neon-cyan/5 to-transparent blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple mb-8"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 243, 255, 0.3)',
                '0 0 40px rgba(0, 243, 255, 0.5)',
                '0 0 20px rgba(0, 243, 255, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail className="w-8 h-8 text-background" />
          </motion.div>

          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6">
            Станьте исследователем{' '}
            <span className="text-gradient-neural">первым</span>
          </h2>
          <p className="font-inter text-muted-foreground text-lg mb-12">
            Подпишитесь, чтобы получить уведомление о запуске каждой новой вселенной и эксклюзивный доступ к бета-тестам.
          </p>

          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Email input */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 blur-xl opacity-50" />
                <div className="relative flex gap-4 flex-col sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите ваш email"
                    required
                    className="flex-1 bg-muted/80 border border-border rounded-xl px-6 py-4 font-inter text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-neural whitespace-nowrap disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" />
                        Отправка...
                      </span>
                    ) : (
                      'Подписаться на запуск'
                    )}
                  </button>
                </div>
              </div>

              {/* Interests */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="font-inter text-sm text-muted-foreground">
                  Выберите интересующие направления:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {interests.map((interest, index) => {
                    const isSelected = selectedInterests.includes(interest.id);
                    return (
                      <motion.button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 font-inter text-sm ${
                          isSelected
                            ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/20'
                            : 'bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:shadow-md'
                        }`}
                      >
                        <motion.span
                          animate={{ rotate: isSelected ? 360 : 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <interest.icon className="w-4 h-4" />
                        </motion.span>
                        {interest.label}
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Check className="w-4 h-4" />
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-2">
                Добро пожаловать в будущее!
              </h3>
              <p className="font-inter text-muted-foreground">
                Вы будете первым узнавать о новых вселенных Sentiens.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
