import { useTranslation } from 'react-i18next';
import type { Locale } from '@/types';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage as Locale) || 'it';

  const change = (lng: Locale) => {
    void i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  return (
    <div className="flex items-center gap-1 text-xs tracking-[0.12em]">
      <button
        type="button"
        onClick={() => change('it')}
        className={cn(
          'cursor-pointer px-2 py-1 transition-colors',
          current === 'it' ? 'text-gold' : 'text-fg-muted hover:text-fg',
        )}
      >
        IT
      </button>
      <span className="text-line">/</span>
      <button
        type="button"
        onClick={() => change('en')}
        className={cn(
          'cursor-pointer px-2 py-1 transition-colors',
          current === 'en' ? 'text-gold' : 'text-fg-muted hover:text-fg',
        )}
      >
        EN
      </button>
    </div>
  );
}
