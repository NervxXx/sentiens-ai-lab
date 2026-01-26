import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, hsl(var(--neon-cyan)) 0%, hsl(var(--neon-purple)) 50%, hsl(var(--neon-green)) 100%)',
        boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.8), 0 0 20px hsl(var(--neon-purple) / 0.5)',
      }}
    />
  );
};
