import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReveal } from '@/hooks/useReveal';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const { t } = useTranslation();
  const eyebrowRef = useReveal<HTMLDivElement>();
  const subRef = useReveal<HTMLParagraphElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center animate-[var(--animate-kenburns)]"
        style={{ backgroundImage: "url('/img/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-bg/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/60 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-20 md:px-12 md:pb-28">
        <div ref={eyebrowRef} className="reveal mb-8 inline-flex items-center gap-4 text-gold">
          <span className="h-px w-12 bg-gold" />
          <span className="mono-up">{t('hero.eyebrow')}</span>
        </div>

        <h1 className="mb-6 max-w-[14ch] text-[clamp(3rem,10vw,8rem)] leading-none">
          {t('hero.title_part1')} <em className="italic text-gold">{t('hero.title_emphasis')}</em>{' '}
          {t('hero.title_part2')}
        </h1>

        <p
          ref={subRef}
          className="reveal mb-12 max-w-[50ch] leading-relaxed text-fg-muted"
          style={{ transitionDelay: '0.1s' }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          ref={ctaRef}
          className="reveal flex flex-wrap items-center gap-6"
          style={{ transitionDelay: '0.15s' }}
        >
          <Link to="/eventi">
            <Button>
              {t('hero.cta_events')} <span>→</span>
            </Button>
          </Link>
          <Link to="/orchestra">
            <Button variant="ghost">{t('hero.cta_about')}</Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.7rem] uppercase tracking-[0.25em] text-fg-muted animate-[var(--animate-bounce-slow)]">
        <span>{t('hero.scroll')}</span>
        <span className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
