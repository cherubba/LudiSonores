import { useTranslation } from 'react-i18next';
import { useReveal } from '@/hooks/useReveal';
import { Container } from '@/components/layout/Container';

export function About() {
  const { t } = useTranslation();
  const imgRef = useReveal<HTMLDivElement>();
  const eyebrowRef = useReveal<HTMLSpanElement>();
  const titleRef = useReveal<HTMLHeadingElement>();
  const p1Ref = useReveal<HTMLParagraphElement>();
  const p2Ref = useReveal<HTMLParagraphElement>();
  const statsRef = useReveal<HTMLDivElement>();

  return (
    <section id="orchestra" className="bg-bg-soft py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div ref={imgRef} className="reveal relative aspect-[4/5]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/img/DSC_6919.jpg')" }}
            />
            <div
              className="absolute -right-8 -bottom-8 hidden aspect-square w-1/2 border-8 border-bg-soft bg-cover bg-center sm:block"
              style={{ backgroundImage: "url('/img/scott-kelley--vNLZFT8Kcg-unsplash.jpg')" }}
            />
          </div>

          <div>
            <span ref={eyebrowRef} className="reveal mono-up text-gold">
              {t('about.eyebrow')}
            </span>
            <h2 ref={titleRef} className="reveal mt-6 mb-8 text-[clamp(2rem,5vw,3.75rem)]">
              {t('about.title_part1')}{' '}
              <em className="italic text-gold">{t('about.title_emphasis')}</em>
              {t('about.title_part2')}
            </h2>
            <p ref={p1Ref} className="reveal mb-5 text-[1.05rem] leading-[1.8] text-fg-muted">
              {t('about.p1')}
            </p>
            <p ref={p2Ref} className="reveal text-[1.05rem] leading-[1.8] text-fg-muted">
              {t('about.p2')}
            </p>

            <div
              ref={statsRef}
              className="reveal mt-12 flex flex-wrap gap-12 border-t border-line pt-12"
            >
              <Stat num="7" label={t('about.stats_years')} />
              <Stat num="40+" label={t('about.stats_concerts')} />
              <Stat num="25" label={t('about.stats_musicians')} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-display text-5xl leading-none text-gold">{num}</div>
      <div className="mt-2 text-xs tracking-[0.2em] text-fg-muted uppercase">{label}</div>
    </div>
  );
}
