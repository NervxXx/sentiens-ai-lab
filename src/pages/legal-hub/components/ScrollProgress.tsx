import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.8), hsl(var(--accent)))',
          boxShadow: '0 0 20px hsl(var(--accent) / 0.6), 0 0 40px hsl(var(--accent) / 0.4)',
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
