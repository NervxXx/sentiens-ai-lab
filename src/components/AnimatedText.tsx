import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const AnimatedText = ({
  text,
  className = '',
  delay = 0,
  staggerChildren = 0.03,
  as: Component = 'span',
}: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Limit animation to words only, not individual characters
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren * 2, // Slower stagger for better performance
        delayChildren: delay,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          variants={child}
          className="inline-block mr-2 last:mr-0"
          style={{ 
            willChange: 'transform, opacity',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Gradient variant for special titles
export const AnimatedGradientText = ({
  text,
  className = '',
  delay = 0,
  staggerChildren = 0.02,
}: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Limit animation to words only, not individual characters
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren * 2, // Slower stagger for better performance
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: 1000 }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          variants={child}
          className="inline-block text-gradient-neural mr-2 last:mr-0"
          style={{ 
            willChange: 'transform, opacity',
            transformStyle: 'preserve-3d',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
