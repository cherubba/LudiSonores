import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center pt-32 pb-20 text-center">
      <span className="font-display text-9xl text-gold leading-none">404</span>
      <h1 className="mt-8 mb-4 text-4xl">{t('common.not_found_title')}</h1>
      <p className="mb-10 max-w-md text-fg-muted">{t('common.not_found_text')}</p>
      <Link to="/">
        <Button>{t('common.go_back')} <span>→</span></Button>
      </Link>
    </Container>
  );
}
