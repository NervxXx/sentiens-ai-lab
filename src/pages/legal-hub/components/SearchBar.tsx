import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedCount, setHighlightedCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const existingMarks = document.querySelectorAll('mark.search-highlight');
    existingMarks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
        parent.normalize();
      }
    });

    if (query.length < 2) {
      setHighlightedCount(0);
      return;
    }

    const sections = document.querySelectorAll('#privacy, #terms, #cookies');
    let count = 0;

    sections.forEach((section) => {
      const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, null);

      const textNodes: Text[] = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      textNodes.forEach((textNode) => {
        const text = textNode.textContent || '';
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();

        if (lowerText.includes(lowerQuery)) {
          const parts = text.split(new RegExp(`(${query})`, 'gi'));
          const fragment = document.createDocumentFragment();

          parts.forEach((part) => {
            if (part.toLowerCase() === lowerQuery) {
              const mark = document.createElement('mark');
              mark.className = 'search-highlight bg-accent/40 text-foreground px-0.5 rounded';
              mark.textContent = part;
              fragment.appendChild(mark);
              count++;
            } else {
              fragment.appendChild(document.createTextNode(part));
            }
          });

          textNode.parentNode?.replaceChild(fragment, textNode);
        }
      });
    });

    setHighlightedCount(count);
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setHighlightedCount(0);
  };

  return (
    <div className="fixed bottom-20 right-6 z-40 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="glass rounded-xl p-2 animate-fade-in flex items-center gap-2 w-64">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('action.search')}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
          {query && (
            <button onClick={clearSearch} className="shrink-0">
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      )}

      {isOpen && highlightedCount > 0 && (
        <div className="glass-subtle rounded-lg px-3 py-1.5 text-sm text-muted-foreground">
          {highlightedCount} {highlightedCount === 1 ? 'result' : 'results'}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'p-4 rounded-full transition-all duration-300',
          isOpen ? 'bg-primary text-primary-foreground glow' : 'glass-subtle hover:bg-primary/20'
        )}
        aria-label={t('action.search')}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
