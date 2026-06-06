'use client';

import { useState, type FormEvent } from 'react';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { useLocale } from '@/app/providers';
import { AnimateInView } from '@/app/components/AnimateInView';

export function HomeContactSection() {
  const { t } = useLocale();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const archiveEmail = t('about.emailValue');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(t('home.contact.mailSubject'));
    const body = encodeURIComponent(
      `${t('home.contact.mailName')}: ${name}\n${t('home.contact.mailEmail')}: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${archiveEmail}?subject=${subject}&body=${body}`;
  }

  const infoItems: { icon: typeof MapPin; label: string; href?: string }[] = [
    { icon: MapPin, label: t('home.contact.address') },
    { icon: Mail, label: archiveEmail, href: `mailto:${archiveEmail}` },
    { icon: Phone, label: t('home.contact.phone'), href: 'tel:+447868959948' },
    { icon: Globe, label: t('home.contact.web') },
  ];

  return (
    <section id="contacto" className="home-contact museum-band scroll-mt-24 border-t border-border/80 bg-[#faf6f0] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateInView>
          <div className="home-contact__wrap relative mx-auto max-w-5xl">
            <aside className="home-contact__aside" aria-labelledby="home-contact-title">
              <h2 id="home-contact-title" className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                {t('home.contact.title')}
              </h2>
              <ul className="mt-8 space-y-6 sm:mt-10">
                {infoItems.map(({ icon: Icon, label, href }) => (
                  <li key={label} className="flex gap-3 text-sm leading-relaxed text-white/92">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/90" aria-hidden />
                    {href ? (
                      <a href={href} className="break-all transition hover:text-white">
                        {label}
                      </a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="home-contact__panel">
              <h3 className="font-serif text-2xl font-semibold text-[#1e2a3a] sm:text-3xl">
                {t('home.contact.formTitle')}
              </h3>
              <p className="mt-2 text-sm text-[#6b7280] sm:text-base">{t('home.contact.formSubtitle')}</p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('home.contact.namePlaceholder')}
                  className="home-contact__input"
                />
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('home.contact.emailPlaceholder')}
                  className="home-contact__input"
                />
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('home.contact.messagePlaceholder')}
                  className="home-contact__input home-contact__textarea"
                />
                <button type="submit" className="home-contact__submit">
                  {t('home.contact.send')}
                </button>
              </form>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
