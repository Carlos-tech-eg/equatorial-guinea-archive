'use client';

type MastheadBrandTitleProps = {
  line1: string;
  line2: string;
  tagline: string;
};

export function MastheadBrandTitle({ line1, line2, tagline }: MastheadBrandTitleProps) {
  return (
    <div className="text-center">
      <h1 className="font-sans text-lg uppercase tracking-tighter text-[var(--masthead-brand,#4a3728)] sm:text-2xl md:text-3xl lg:text-4xl leading-[1.05]">
        <span className="block font-light">{line1}</span>
        <span className="block font-black">{line2}</span>
      </h1>
      <p className="mt-1 max-w-[280px] mx-auto text-[8px] font-light uppercase tracking-[0.22em] text-[var(--masthead-fg,#1a1a1a)] sm:mt-1.5 sm:max-w-none sm:text-[9px] sm:tracking-[0.35em] md:text-[10px]">
        {tagline}
      </p>
    </div>
  );
}
