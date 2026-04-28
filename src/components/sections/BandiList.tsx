import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReveal } from '@/hooks/useReveal';
import { Container } from '@/components/layout/Container';
import type { Bando } from '@/types';

interface Props {
  bandi: Bando[];
  title: string;
  eyebrow: string;
}

export function BandiList({ bandi, title, eyebrow }: Props) {
  return (
    <section id="bandi" className="py-20 md:py-28">
      <Container>
        <div className="mb-16">
          <span className="mono-up text-gold">{eyebrow}</span>
          <h2 className="mt-6 text-[clamp(2rem,5vw,3.75rem)]">{title}</h2>
        </div>

        <div className="grid border-t border-line">
          {bandi.map((bando, i) => (
            <BandoItem key={bando.id} bando={bando} index={i + 1} delay={i * 0.04} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function BandoItem({
  bando,
  index,
  delay,
}: {
  bando: Bando;
  index: number;
  delay: number;
}) {
  const { t } = useTranslation();
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      to={`/bandi/${bando.slug}`}
      className="reveal group grid cursor-pointer grid-cols-1 gap-4 border-b border-line py-10 transition-[padding] duration-300 hover:pl-6 md:grid-cols-[80px_1fr_auto] md:items-center md:gap-12"
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="font-display text-2xl text-gold">{String(index).padStart(2, '0')}</span>
      <div>
        <h3 className="text-2xl transition-colors group-hover:text-gold">{bando.title}</h3>
        <span className="mt-1 inline-block text-sm tracking-[0.15em] text-fg-muted uppercase">
          {bando.active ? t('bandi.status_active') : t('bandi.status_archived')} · {bando.year}
        </span>
      </div>
      <span className="text-gold transition-transform duration-300 group-hover:translate-x-2">
        →
      </span>
    </Link>
  );
}
