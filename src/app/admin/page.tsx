'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { usePhotos } from '@/hooks/useContent';
import { useBiographies } from '@/hooks/useContent';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export default function AdminDashboardPage() {
  const { photos, loading: photosLoading } = usePhotos();
  const { items: biographies, loading: bioLoading } = useBiographies();

  const recentPhotos = photos.slice(0, 6);
  const recentBios = biographies.slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-2">
          Admin dashboard
        </h1>
        <p className="text-muted-foreground">
          Same data and images as the live site. Manage photos, biographies, and settings below.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/photos" className="block">
          <Card className="border-border hover:border-accent-gold/40 transition-colors h-full">
            <CardHeader>
              <CardTitle className="font-serif text-lg">Photos</CardTitle>
            </CardHeader>
            <CardContent>
              {photosLoading ? (
                <span className="text-muted-foreground">Loading…</span>
              ) : (
                <span className="text-2xl font-light text-foreground">
                  {photos.length}
                </span>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                Gallery items (shown on site)
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/biographies" className="block">
          <Card className="border-border hover:border-accent-gold/40 transition-colors h-full">
            <CardHeader>
              <CardTitle className="font-serif text-lg">Biographies</CardTitle>
            </CardHeader>
            <CardContent>
              {bioLoading ? (
                <span className="text-muted-foreground">Loading…</span>
              ) : (
                <span className="text-2xl font-light text-foreground">
                  {biographies.length}
                </span>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                Biography entries (shown on site)
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/settings" className="block">
          <Card className="border-border hover:border-accent-gold/40 transition-colors h-full">
            <CardHeader>
              <CardTitle className="font-serif text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Site name, maintenance mode, theme color
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="border-t border-border pt-8">
        <h2 className="font-serif text-xl font-light text-foreground mb-4">
          Site content preview (same as public gallery & biografías)
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recent photos</h3>
              <Link href="/admin/photos" className="text-sm text-accent-gold hover:underline">Manage all</Link>
            </div>
            {photosLoading ? (
              <p className="text-muted-foreground text-sm">Loading…</p>
            ) : recentPhotos.length === 0 ? (
              <p className="text-muted-foreground text-sm">No photos yet. Add some in Photos.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {recentPhotos.map((p) => (
                  <Link key={p.id} href={`/photo/${p.id}`} target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-border overflow-hidden bg-card hover:border-accent-gold/40 transition-colors">
                    <div className="aspect-[4/3] bg-muted">
                      <ImageWithFallback
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-foreground truncate">{p.title || '(No title)'}</p>
                      <p className="text-xs text-muted-foreground">{p.year} {p.location && `· ${p.location}`}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recent biographies</h3>
              <Link href="/admin/biographies" className="text-sm text-accent-gold hover:underline">Manage all</Link>
            </div>
            {bioLoading ? (
              <p className="text-muted-foreground text-sm">Loading…</p>
            ) : recentBios.length === 0 ? (
              <p className="text-muted-foreground text-sm">No biographies yet. Add some in Biographies.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {recentBios.map((b) => (
                  <Link key={b.id} href={`/biografias/${b.category}/${b.id}`} target="_blank" rel="noopener noreferrer" className="flex gap-3 rounded-lg border border-border p-2 bg-card hover:border-accent-gold/40 transition-colors">
                    <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={b.imageUrl}
                        alt={b.name ?? ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{b.name || '(No name)'}</p>
                      <p className="text-xs text-muted-foreground">{b.category} {b.year && `· ${b.year}`}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
