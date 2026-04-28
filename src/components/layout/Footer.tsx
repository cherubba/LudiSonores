import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { Container } from './Container';

const FacebookIcon = (props: { size?: number }) => (
  <svg width={props.size ?? 16} height={props.size ?? 16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
  </svg>
);
const InstagramIcon = (props: { size?: number }) => (
  <svg width={props.size ?? 16} height={props.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = (props: { size?: number }) => (
  <svg width={props.size ?? 16} height={props.size ?? 16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const NAV_LINKS = [
  { to: '/', key: 'home' },
  { to: '/eventi', key: 'events' },
  { to: '/orchestra', key: 'orchestra' },
  { to: '/bandi', key: 'bandi' },
] as const;

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line bg-[#050505] pt-20 pb-8">
      <Container>
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <img src="/img/logo.png" alt="Ludi Sonores" className="mb-6 h-14" />
            <p className="max-w-[35ch] text-sm text-fg-muted">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {t('footer.col_navigate')}
            </h4>
            <ul className="flex flex-col gap-3.5">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[0.92rem] text-fg-muted transition-colors hover:text-gold"
                  >
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {t('footer.col_contact')}
            </h4>
            <ul className="flex flex-col gap-3.5 text-[0.92rem] text-fg-muted">
              <li>
                <a
                  href="mailto:info@ludisonores.com"
                  className="transition-colors hover:text-gold"
                >
                  info@ludisonores.com
                </a>
              </li>
              <li>Via G. Genoese Zerbi 13</li>
              <li>00122 Roma</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {t('footer.col_follow')}
            </h4>
            <div className="flex gap-4">
              {[
                { href: 'https://www.facebook.com/ludisonores', Icon: FacebookIcon, label: 'Facebook' },
                { href: 'https://www.instagram.com/ludisonores/', Icon: InstagramIcon, label: 'Instagram' },
                { href: 'https://www.youtube.com/@orchestraludisonores4566', Icon: YoutubeIcon, label: 'YouTube' },
                { href: 'mailto:info@ludisonores.com', Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-line text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-8 text-xs text-fg-muted">
          <span>© 2026 Ludi Sonores APS · C.F./P.IVA 18098831003</span>
          <span>{t('footer.rights')}</span>
        </div>
      </Container>
    </footer>
  );
}
