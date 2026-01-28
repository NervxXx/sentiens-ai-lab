import { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
}

export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -300]);
  const opacity1 = useTransform(scrollY, [0, 1500], [1, 0.3]);
  const scale1 = useTransform(scrollY, [0, 2000], [1, 1.3]);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        connections: [],
      });
    }
    
    return particles;
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const connectionDistance = 150;
    const mouseInfluence = 200;

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse attraction
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < mouseInfluence && dist > 0) {
        const force = (mouseInfluence - dist) / mouseInfluence * 0.02;
        particle.vx += (dx / dist) * force;
        particle.vy += (dy / dist) * force;
      }

      // Apply velocity with damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary wrap
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const connDx = other.x - particle.x;
        const connDy = other.y - particle.y;
        const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

        if (connDist < connectionDistance) {
          const opacity = (1 - connDist / connectionDistance) * 0.5;
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y, other.x, other.y
          );
          gradient.addColorStop(0, `rgba(0, 243, 255, ${opacity})`);
          gradient.addColorStop(1, `rgba(157, 78, 221, ${opacity})`);
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      // Draw particle
      const particleGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 3
      );
      particleGradient.addColorStop(0, 'rgba(0, 243, 255, 0.8)');
      particleGradient.addColorStop(0.5, 'rgba(0, 243, 255, 0.3)');
      particleGradient.addColorStop(1, 'rgba(0, 243, 255, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = particleGradient;
      ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  useEffect(() => {
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
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      drawParticles(ctx, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

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
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      {/* Parallax gradient overlays */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-glow-pulse"
          style={{ y: y1, opacity: opacity1, scale: scale1 }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-neon-purple/15 rounded-full blur-[100px] animate-glow-pulse"
          style={{ y: y2, opacity: opacity1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-neon-green/10 rounded-full blur-[80px] animate-glow-pulse"
          style={{ y: y3 }}
        />
        {/* Additional parallax orbs */}
        <motion.div 
          className="absolute top-[60%] right-[10%] w-64 h-64 bg-neon-cyan/8 rounded-full blur-[100px]"
          style={{ y: useTransform(scrollY, [0, 3000], [0, -500]) }}
        />
        <motion.div 
          className="absolute top-[80%] left-[15%] w-48 h-48 bg-neon-purple/10 rounded-full blur-[80px]"
          style={{ y: useTransform(scrollY, [0, 3000], [0, -700]) }}
        />
      </motion.div>
      {/* Grid overlay with parallax */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-20"
        style={{ y: useTransform(scrollY, [0, 5000], [0, -100]) }}
      />
    </>
  );
};
