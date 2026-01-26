import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to width percentage
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 z-[9999] pointer-events-none"
      style={{
        width,
        background: 'linear-gradient(90deg, hsl(var(--neon-cyan)) 0%, hsl(var(--neon-purple)) 50%, hsl(var(--neon-green)) 100%)',
        boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.8), 0 0 20px hsl(var(--neon-purple) / 0.5)',
      }}
    />
  );
};
