import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] w-full min-w-0 flex flex-col items-center justify-center px-4 py-16">
      <p className="text-6xl sm:text-8xl font-serif font-light text-muted-foreground/50 mb-4">
        404
      </p>
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-center max-w-md">
        Esta página no existe.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent-gold text-primary-foreground text-sm font-medium uppercase tracking-[0.15em] rounded-lg hover:bg-accent-gold-muted transition-colors"
      >
        Ir a Inicio
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
