import type { Metadata, Viewport } from 'next';
import { TickerMasthead } from '@/app/components/TickerMasthead';
import { Footer } from '@/app/components/footer';
import { Providers } from '@/app/providers';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guinea Equatorial Archivos | Historical Photo Archive',
  description:
    'A digital archive of historical photographs documenting Equatorial Guinea during the Spanish colonial period (1778–1968).',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="min-h-screen min-w-0 bg-background text-foreground font-sans overflow-x-hidden">
        <Providers>
          <TickerMasthead />
          <main>
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
