import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NeuralBackgroundLite = () => {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(600px 400px at 20% 10%, rgba(0, 243, 255, 0.10), transparent 60%), radial-gradient(600px 400px at 80% 30%, rgba(142, 45, 226, 0.10), transparent 60%)',
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-15" />
    </>
  );
};

const NeuralBackgroundFull = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  
  // Check screen width for responsive behavior
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Parallax scroll effects - defined at top level
  const { scrollY } = useScroll();
  
  // Pre-compute all transforms to avoid creating them in JSX
  const y1 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -300]);
  const y4 = useTransform(scrollY, [0, 3000], [0, -500]);
  const y5 = useTransform(scrollY, [0, 3000], [0, -700]);
  const yGrid = useTransform(scrollY, [0, 5000], [0, -100]);
  const opacity1 = useTransform(scrollY, [0, 1500], [1, 0.3]);
  const scale1 = useTransform(scrollY, [0, 2000], [1, 1.3]);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    // Reduced particle count for better performance
    const particleCount = Math.min(Math.floor((width * height) / 25000), 40); // Reduced from 60 to 40
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
      });
    }
    
    return particles;
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const connectionDistance = 120;
    const mouseInfluence = 250;

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse attraction
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < mouseInfluence && dist > 0) {
        const force = (mouseInfluence - dist) / mouseInfluence * 0.03;
        particle.vx += (dx / dist) * force;
        particle.vy += (dy / dist) * force;
      }

      // Apply velocity with damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary wrap
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Draw connections (limit to nearby particles for performance)
      const maxConnections = 2; // Reduced from 3 for better performance
      let connectionCount = 0;
      
      for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
        const other = particles[j];
        const connDx = other.x - particle.x;
        const connDy = other.y - particle.y;
        const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

        if (connDist < connectionDistance) {
          const opacity = (1 - connDist / connectionDistance) * 0.4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 243, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
          connectionCount++;
        }
      }

      // Draw particle (simplified)
      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 243, 255, ${0.6 + particle.radius * 0.1})`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  useEffect(() => {
    // Skip canvas animation on small screens (< 800px)
    if (isSmallScreen) {
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let lastTime = 0;
    const targetFPS = 20; // Reduced FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      
      lastTime = currentTime - (deltaTime % frameInterval);
      
      // Throttle expensive operations
      if (deltaTime > 16) { // Skip frame if behind
        return;
      }
      
      drawParticles(ctx, canvas.width, canvas.height);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, drawParticles]);

  return (
    <>
      {/* Canvas particles - only on wide screens (>= 800px) */}
      {!isSmallScreen && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ 
            background: 'transparent',
            willChange: 'transform',
            transform: 'translateZ(0)', // Hardware acceleration
          }}
        />
      )}
      {/* Parallax gradient overlays */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]"
          style={{ y: y1, opacity: opacity1, scale: scale1, willChange: 'transform, opacity' }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-neon-purple/15 rounded-full blur-[100px]"
          style={{ y: y2, opacity: opacity1, willChange: 'transform, opacity' }}
        />
        {!isSmallScreen && (
          <motion.div 
            className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-neon-green/10 rounded-full blur-[80px]"
            style={{ y: y3, willChange: 'transform', transform: 'translateZ(0)' }}
          />
        )}
        {/* Additional parallax orbs - hide some on small screens */}
        {!isSmallScreen && (
          <motion.div 
            className="absolute top-[60%] right-[10%] w-64 h-64 bg-neon-cyan/8 rounded-full blur-[100px]"
            style={{ y: y4, willChange: 'transform', transform: 'translateZ(0)' }}
          />
        )}
        {!isSmallScreen && (
          <motion.div 
            className="absolute top-[80%] left-[15%] w-48 h-48 bg-neon-purple/10 rounded-full blur-[80px]"
            style={{ y: y5, willChange: 'transform', transform: 'translateZ(0)' }}
          />
        )}
      </motion.div>
      {/* Grid overlay with parallax */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-20"
        style={{ y: yGrid, willChange: 'transform' }}
      />
    </>
  );
};

export const NeuralBackground = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(() => window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isSmallScreen) {
    return <NeuralBackgroundLite />;
  }

  return <NeuralBackgroundFull />;
};
