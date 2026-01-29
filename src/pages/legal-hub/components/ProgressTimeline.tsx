import { Shield, FileText, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressTimelineProps {
  activeSection: string;
  progress: number;
}

const sections = [
  { id: 'privacy', icon: Shield },
  { id: 'terms', icon: FileText },
  { id: 'cookies', icon: Cookie },
];

const ProgressTimeline = ({ activeSection, progress }: ProgressTimelineProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-6">
      <div className="relative w-1 h-40 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-300"
          style={{ height: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                isActive
                  ? 'bg-primary text-primary-foreground glow scale-110'
                  : 'glass-subtle text-muted-foreground hover:text-foreground hover:bg-primary/20'
              )}
              aria-label={section.id}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTimeline;
