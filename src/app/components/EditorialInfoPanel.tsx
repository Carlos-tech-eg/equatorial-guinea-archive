'use client';

import { AnimateInView } from '@/app/components/AnimateInView';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type EditorialInfoPanelProps = {
  title: string;
  body1: string;
  pullQuote: string;
  body2: string;
  imageSrc: string;
  imageAlt: string;
};

/** Tarjeta blanca dos columnas (texto + foto), como en Sobre nosotros. */
export function EditorialInfoPanel({
  title,
  body1,
  pullQuote,
  body2,
  imageSrc,
  imageAlt,
}: EditorialInfoPanelProps) {
  return (
    <div className="about-page__overlap relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <AnimateInView>
        <section className="about-page__panel -mt-24 bg-white px-6 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:-mt-32 sm:px-10 sm:py-14 lg:-mt-40 lg:px-16 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <div className="min-w-0 space-y-6">
              <h2 className="font-serif text-3xl font-normal leading-tight text-[#1a1a1a] sm:text-4xl">
                {title}
              </h2>
              <p className="text-[15px] leading-8 text-[#6b6b6b] sm:text-base">{body1}</p>
              <p className="about-page__pull-quote font-serif text-xl font-medium italic leading-snug text-[#1a1a1a] sm:text-2xl lg:text-[1.65rem]">
                {pullQuote}
              </p>
              <p className="text-[15px] leading-8 text-[#6b6b6b] sm:text-base">{body2}</p>
            </div>
            <div className="about-page__figure overflow-hidden lg:pt-2">
              <ImageWithFallback
                src={imageSrc}
                alt={imageAlt}
                className="aspect-[4/3] w-full object-cover grayscale contrast-[1.05]"
              />
            </div>
          </div>
        </section>
      </AnimateInView>
    </div>
  );
}
