import { useTranslation } from 'react-i18next';
import { Container } from '@/components/layout/Container';
import { useReveal } from '@/hooks/useReveal';

export default function OrchestraPage() {
  const { t } = useTranslation();
  const headRef = useReveal<HTMLDivElement>();
  const imgRef = useReveal<HTMLDivElement>();
  const p1Ref = useReveal<HTMLParagraphElement>();
  const p2Ref = useReveal<HTMLParagraphElement>();
  const p3Ref = useReveal<HTMLParagraphElement>();
  const p4Ref = useReveal<HTMLParagraphElement>();
  const statsRef = useReveal<HTMLDivElement>();

  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-20">
        <Container>
          <div ref={headRef} className="reveal max-w-3xl">
            <span className="mono-up text-gold">{t('about.eyebrow')}</span>
            <h1 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]">
              {t('about.title_part1')}{' '}
              <em className="italic text-gold">{t('about.title_emphasis')}</em>
              {t('about.title_part2')}
            </h1>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div ref={imgRef} className="reveal relative aspect-[3/4] order-2 lg:order-1">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/img/DSC_6919.jpg')" }}
              />
            </div>
            <div className="order-1 lg:order-2 lg:pt-12">
              <p ref={p1Ref} className="reveal mb-6 text-lg leading-[1.8] text-fg-muted">
                {t('about.p1')}
              </p>
              <p ref={p2Ref} className="reveal mb-6 text-lg leading-[1.8] text-fg-muted">
                {t('about.p2')}
              </p>
              <p ref={p3Ref} className="reveal mb-6 text-lg leading-[1.8] text-fg-muted">
                {t('about.p3')}
              </p>
              <p ref={p4Ref} className="reveal text-lg leading-[1.8] text-fg-muted">
                {t('about.p4')}
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
    </>
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
