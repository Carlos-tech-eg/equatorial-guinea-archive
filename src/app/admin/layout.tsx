'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent-gold border-t-transparent" />
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <nav className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-medium text-foreground hover:text-accent-gold transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/photos"
              className="text-sm font-medium text-muted-foreground hover:text-accent-gold transition-colors"
            >
              Photos
            </Link>
            <Link
              href="/admin/biographies"
              className="text-sm font-medium text-muted-foreground hover:text-accent-gold transition-colors"
            >
              Biographies
            </Link>
            <Link
              href="/admin/settings"
              className="text-sm font-medium text-muted-foreground hover:text-accent-gold transition-colors"
            >
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                View site
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => auth.signOut().then(() => router.replace('/admin/login'))}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
