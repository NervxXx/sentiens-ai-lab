import { useState, useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const docHeightRef = useRef(0);

  useEffect(() => {
    // Cache document height once to avoid repeated reflows
    docHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / docHeightRef.current) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Recalculate on resize
    const handleResize = () => {
      docHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1">
      <div className="absolute inset-0 bg-muted/30" />

      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />

      <div
        className="absolute top-0 h-full w-8 transition-all duration-150 ease-out"
        style={{
          left:
            progress <= 0
              ? '0px'
              : progress >= 100
                ? 'calc(100% - 32px)'
                : `calc(${progress}% - 32px)`,
          background: 'linear-gradient(90deg, transparent, #00ffb3cc, #00ffb3)', // accent 80% opacity
          boxShadow: '0 0 20px #00ffb399, 0 0 40px #00ffb366', // accent 60% and 40% opacity
          opacity: progress > 0 ? 1 : 0,
        }}
      />

      <div className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-150" style={{ width: `${progress}%` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      </div>
    </div>
  );
};

export default ScrollProgress;
