import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../hooks/useLanguage';

interface LegalSectionProps {
  id: string;
  icon: ReactNode;
  title: string;
  intro: string;
  sections: {
    title: string;
    content: string;
  }[];
  importantNote?: string;
  isVisible: boolean;
}

const LegalSection = ({ id, icon, title, intro, sections, importantNote, isVisible }: LegalSectionProps) => {
  const [expandedSections, setExpandedSections] = useState<number[]>(() => sections.map((_, i) => i));
  const { t } = useLanguage();

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const toggleAll = () => {
    if (expandedSections.length === sections.length) {
      setExpandedSections([]);
    } else {
      setExpandedSections(sections.map((_, i) => i));
    }
  };

  return (
    <section
      id={id}
      className={cn('scroll-mt-24 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}
    >
      <div className="legal-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <h2 className="legal-section-title font-bold gradient-text">{title}</h2>
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-6">{intro}</p>

        <button
          onClick={toggleAll}
          className="mb-6 text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
        >
          {expandedSections.length === sections.length ? (
            <>
              <ChevronUp className="w-4 h-4" />
              {t('action.collapse')}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              {t('action.expand')}
            </>
          )}
        </button>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border border-border/50 rounded-lg overflow-hidden transition-colors hover:border-primary/30"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-semibold text-foreground">{section.title}</span>
                {expandedSections.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  expandedSections.includes(index) ? 'max-h-120 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="px-4 pb-4">
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {importantNote && (
          <div className="important-block mt-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-foreground font-medium">{importantNote}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LegalSection;
