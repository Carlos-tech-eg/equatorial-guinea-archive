'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { SiteSettings } from '@/context/SiteSettingsContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

const defaultSettings: SiteSettings = {
  siteName: 'Guinea Equatorial Archivos',
  description: 'Historical Archive',
  maintenanceMode: false,
  theme: { primaryColor: '#efbf04' },
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'global')).then((snap) => {
      if (snap.exists()) {
        setForm({ ...defaultSettings, ...snap.data() } as SiteSettings);
      }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        siteName: form.siteName,
        description: form.description,
        maintenanceMode: form.maintenanceMode,
        theme: form.theme || defaultSettings.theme,
      });
      if (typeof document !== 'undefined' && form.theme?.primaryColor) {
        document.documentElement.style.setProperty('--primary', form.theme.primaryColor);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading settings…</p>;
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="font-serif text-2xl font-light text-foreground">Site settings</h1>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif text-lg">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Site name</Label>
            <Input
              value={form.siteName}
              onChange={(e) => setForm((f) => ({ ...f, siteName: e.target.value }))}
              placeholder="Site name"
            />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short description"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label>Maintenance mode</Label>
              <p className="text-sm text-muted-foreground">When on, visitors see a maintenance message only.</p>
            </div>
            <Switch
              checked={form.maintenanceMode}
              onCheckedChange={(checked) => setForm((f) => ({ ...f, maintenanceMode: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Theme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Primary color (accent)</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={form.theme?.primaryColor ?? '#efbf04'}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    theme: { ...f.theme, primaryColor: e.target.value },
                  }))
                }
                className="w-12 h-10 rounded border border-border cursor-pointer bg-transparent"
              />
              <Input
                value={form.theme?.primaryColor ?? ''}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    theme: { ...f.theme, primaryColor: e.target.value },
                  }))
                }
                placeholder="#efbf04"
                className="font-mono"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={save}
        disabled={saving}
        className="bg-accent-gold text-primary-foreground hover:bg-accent-gold-muted"
      >
        {saving ? 'Saving…' : 'Save settings'}
      </Button>
    </div>
  );
}
