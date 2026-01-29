import type { Metadata } from 'next';
import { Navigation } from '@/app/components/navigation';
import { Footer } from '@/app/components/footer';
import { Providers } from '@/app/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guinea Equatorial Archivos | Historical Photo Archive',
  description:
    'A digital archive of historical photographs documenting Equatorial Guinea during the Spanish colonial period (1778–1968).',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
