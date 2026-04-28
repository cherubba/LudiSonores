import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { useReveal } from '@/hooks/useReveal';

export default function ContattiPage() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();
  const infoRef = useReveal<HTMLDivElement>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@ludisonores.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error('Invio fallito');
      setSubmitted(true);
    } catch {
      setError(t('contact.form_error'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-20">
        <Container>
          <div ref={headRef} className="reveal max-w-3xl">
            <span className="mono-up text-gold">{t('contact.page_eyebrow')}</span>
            <h1 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]">
              {t('contact.page_title_part1')}{' '}
              <em className="italic text-gold">{t('contact.page_title_emphasis')}</em>
            </h1>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            <div ref={infoRef} className="reveal space-y-10">
              <ContactItem
                Icon={Mail}
                label={t('contact.label_email')}
                value="info@ludisonores.com"
                href="mailto:info@ludisonores.com"
              />
              <ContactItem
                Icon={MapPin}
                label={t('contact.label_address')}
                value="Via G. Genoese Zerbi 13, 00122 Roma"
              />
              <ContactItem
                Icon={Phone}
                label={t('contact.label_phone')}
                value={t('contact.phone_value')}
              />
            </div>

            <div ref={formRef} className="reveal">
              {submitted ? (
                <div className="border border-gold-soft bg-bg-soft p-12 text-center">
                  <h2 className="mb-4 font-display text-3xl text-gold">
                    {t('contact.form_thanks_title')}
                  </h2>
                  <p className="text-fg-muted">{t('contact.form_thanks_text')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="_subject" value={t('contact.subject_default')} />
                  <input type="text" name="_honey" className="hidden" tabIndex={-1} />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label={t('contact.form_name')} name="name" required />
                    <Field label={t('contact.form_email')} name="email" type="email" required />
                  </div>
                  <Field label={t('contact.form_subject')} name="subject" />
                  <TextArea label={t('contact.form_message')} name="message" required rows={6} />
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <Button type="submit" disabled={submitting}>
                    {submitting ? t('contact.form_submitting') : t('contact.form_submit')}{' '}
                    <span>→</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

function Field({ label, name, type = 'text', required }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.2em] text-fg-muted uppercase">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border border-line bg-bg-soft px-4 py-3 font-sans text-fg outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  required,
  rows = 4,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.2em] text-fg-muted uppercase">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="w-full resize-none border border-line bg-bg-soft px-4 py-3 font-sans text-fg outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

interface ContactItemProps {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ Icon, label, value, href }: ContactItemProps) {
  const content = (
    <>
      <div className="flex h-12 w-12 items-center justify-center border border-line text-gold">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xs tracking-[0.25em] text-fg-muted uppercase">{label}</div>
        <div className="mt-1 font-display text-xl">{value}</div>
      </div>
    </>
  );

  return href ? (
    <a href={href} className="flex items-center gap-6 transition-colors hover:text-gold">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-6">{content}</div>
  );
}
