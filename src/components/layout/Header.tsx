import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_ITEMS = [
  { to: '/', key: 'home' },
  { to: '/eventi', key: 'events' },
  { to: '/orchestra', key: 'orchestra' },
  { to: '/bandi', key: 'bandi' },
  { to: '/contatti', key: 'contact' },
] as const;

export function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 py-5 backdrop-blur-xl transition-all duration-300',
          scrolled
            ? 'border-b border-line bg-bg/85'
            : 'border-b border-transparent bg-bg/60',
        )}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 md:px-12">
          <Link to="/" className="flex items-center gap-3">
            <img src="/img/logo.png" alt="" className="h-9 w-auto" />
            <span className="font-display text-base uppercase tracking-[0.15em]">
              Ludi Sonores
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group relative py-2 text-[0.82rem] uppercase tracking-[0.15em] transition-colors',
                    isActive ? 'text-gold' : 'text-fg hover:text-gold',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {t(`nav.${item.key}`)}
                    <span
                      className={cn(
                        'absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-gold transition-transform duration-[350ms]',
                        'group-hover:origin-left group-hover:scale-x-100',
                        isActive && 'scale-x-100',
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t('nav.menu_close') : t('nav.menu_open')}
              className="cursor-pointer p-2 lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8 px-6">
          {NAV_ITEMS.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'font-display text-3xl transition-colors',
                  isActive ? 'text-gold' : 'text-fg hover:text-gold',
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )
              }
              style={{
                transition: `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s, color .25s ease`,
              }}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
