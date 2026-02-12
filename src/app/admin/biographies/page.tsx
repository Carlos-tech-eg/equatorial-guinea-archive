'use client';

import { useState, useRef } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useBiographies, type BiografiaItem } from '@/hooks/useContent';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Plus, Pencil, Trash2, Link2, Upload, Cloud } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const BIO_CATEGORIES = [
  { value: 'cultura', label: 'Cultura' },
  { value: 'musica', label: 'Música' },
  { value: 'personasHistoricas', label: 'Personas Históricas' },
  { value: 'politica', label: 'Política' },
] as const;

type ImageSource = 'url' | 'upload' | 'gdrive';

function parseGoogleDriveImageUrl(link: string): string {
  if (!link.trim()) return '';
  const fileMatch = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  const openMatch = link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  return link;
}

const emptyBio = (): Omit<BiografiaItem, 'id'> => ({
  category: '',
  name: '',
  imageUrl: '',
  year: '',
  description: '',
  works: [],
});

export default function AdminBiographiesPage() {
  const { items: biographies, loading } = useBiographies();
  const [editing, setEditing] = useState<BiografiaItem | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyBio());
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageSource, setImageSource] = useState<ImageSource>('url');
  const [gdriveLink, setGdriveLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyBio());
    setImageSource('url');
    setGdriveLink('');
    setUploadError(null);
    setAdding(true);
  };

  const openEdit = (b: BiografiaItem) => {
    setAdding(false);
    setEditing(b);
    setForm({
      category: b.category ?? '',
      name: b.name ?? '',
      imageUrl: b.imageUrl ?? '',
      year: b.year ?? '',
      description: b.description ?? '',
      works: Array.isArray(b.works) ? b.works : [],
    });
    setImageSource('url');
    setGdriveLink('');
    setUploadError(null);
  };

  const closeModal = () => {
    setAdding(false);
    setEditing(null);
    setForm(emptyBio());
    setSaveError(null);
    setSaveSuccess(false);
    setImageSource('url');
    setGdriveLink('');
    setUploadError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file (e.g. JPG, PNG).');
      e.target.value = '';
      return;
    }
    setUploadError(null);
    setUploading(true);
    try {
      const safeName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
      const path = `biographies/${Date.now()}_${safeName || 'image'}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file, { contentType: file.type || 'image/jpeg' });
      const url = await getDownloadURL(storageRef);
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'message' in err ? String((err as { message: string }).message) : 'Upload failed';
      setUploadError(msg);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const applyGdriveUrl = () => {
    const url = parseGoogleDriveImageUrl(gdriveLink);
    if (url) setForm((f) => ({ ...f, imageUrl: url }));
  };

  const save = async () => {
    setSaveError(null);
    setSaveSuccess(false);
    setSaving(true);
    try {
      const data = {
        category: form.category || '',
        name: form.name || '',
        imageUrl: form.imageUrl || '',
        year: form.year || '',
        description: form.description || '',
        works: Array.isArray(form.works) ? form.works : [],
        updatedAt: serverTimestamp(),
      };
      if (editing) {
        await updateDoc(doc(db, 'biographies', editing.id), data);
        setSaveSuccess(true);
        setTimeout(() => closeModal(), 1500);
      } else {
        await addDoc(collection(db, 'biographies'), { ...data, createdAt: serverTimestamp() });
        setSaveSuccess(true);
        setTimeout(() => closeModal(), 1500);
      }
    } catch (e: unknown) {
      const msg = e && typeof e === 'object' && 'message' in e ? String((e as { message: string }).message) : 'Failed to save';
      setSaveError(msg);
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this biography?')) return;
    try {
      await deleteDoc(doc(db, 'biographies', id));
      if (editing?.id === id) closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const isOpen = adding || !!editing;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl font-light text-foreground">Biographies</h1>
          <a href="/biografias" target="_blank" rel="noopener noreferrer" className="text-sm text-accent-gold hover:underline">
            View on site →
          </a>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
          <Button onClick={openAdd} className="bg-accent-gold text-primary-foreground hover:bg-accent-gold-muted">
            <Plus className="size-4" /> Add biography
          </Button>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit biography' : 'New biography'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BIO_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Name"
                />
              </div>
              <div className="grid gap-2">
                <Label>Year</Label>
                <Input
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                  placeholder="e.g. 1924–1979"
                />
              </div>
              <div className="grid gap-2">
                <Label>Descripción / Biografía</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Información biográfica sobre el artista, político, etc."
                  rows={5}
                />
              </div>

              <div className="grid gap-3">
                <Label>Image source</Label>
                <RadioGroup
                  value={imageSource}
                  onValueChange={(v) => setImageSource(v as ImageSource)}
                  className="grid grid-cols-3 gap-2"
                >
                  <Label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 has-[data-state=checked]:border-accent-gold has-[data-state=checked]:bg-accent-gold/10 cursor-pointer">
                    <RadioGroupItem value="url" id="bio-src-url" />
                    <Link2 className="size-4 shrink-0" />
                    <span className="text-sm">URL</span>
                  </Label>
                  <Label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 has-[data-state=checked]:border-accent-gold has-[data-state=checked]:bg-accent-gold/10 cursor-pointer">
                    <RadioGroupItem value="upload" id="bio-src-upload" />
                    <Upload className="size-4 shrink-0" />
                    <span className="text-sm">Local</span>
                  </Label>
                  <Label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 has-[data-state=checked]:border-accent-gold has-[data-state=checked]:bg-accent-gold/10 cursor-pointer">
                    <RadioGroupItem value="gdrive" id="bio-src-gdrive" />
                    <Cloud className="size-4 shrink-0" />
                    <span className="text-sm">Drive</span>
                  </Label>
                </RadioGroup>

                {imageSource === 'url' && (
                  <div className="grid gap-2">
                    <Label htmlFor="bio-image-url">Image URL</Label>
                    <Input
                      id="bio-image-url"
                      value={form.imageUrl}
                      onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                )}

                {imageSource === 'upload' && (
                  <div className="grid gap-2">
                    <Label>Upload from device</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-sm text-muted-foreground file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-accent-gold file:text-primary-foreground file:cursor-pointer cursor-pointer"
                    />
                    {uploadError && (
                      <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">{uploadError}</p>
                    )}
                    {uploading && <p className="text-sm text-muted-foreground">Uploading…</p>}
                    {form.imageUrl && !uploadError && <p className="text-xs text-muted-foreground truncate">Ready.</p>}
                  </div>
                )}

                {imageSource === 'gdrive' && (
                  <div className="grid gap-2">
                    <Label htmlFor="bio-gdrive">Google Drive link</Label>
                    <Input
                      id="bio-gdrive"
                      value={gdriveLink}
                      onChange={(e) => setGdriveLink(e.target.value)}
                      placeholder="Paste Drive link..."
                    />
                    <Button type="button" variant="outline" size="sm" onClick={applyGdriveUrl}>
                      Use this image
                    </Button>
                    {form.imageUrl && <p className="text-xs text-muted-foreground">Image URL set.</p>}
                  </div>
                )}
              </div>
            </div>
            {saveError && (
              <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                {saveError}
              </p>
            )}
            {saveSuccess && (
              <p className="text-sm text-green-600 bg-green-500/10 border border-green-500/30 rounded-md px-3 py-2">
                Saved. It will appear on the main site.
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={save} disabled={saving || uploading} className="bg-accent-gold text-primary-foreground hover:bg-accent-gold-muted">
                {saving ? 'Saving…' : uploading ? 'Uploading…' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading biographies…</p>
      ) : biographies.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-8 text-center text-muted-foreground">
            No biographies yet. Add one with the button above.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {biographies.map((b) => (
            <Card key={b.id} className="border-border overflow-hidden flex flex-col">
              <a href={`/biografias/${b.category}/${b.id}`} target="_blank" rel="noopener noreferrer" className="block">
                <div className="aspect-[4/3] bg-muted">
                  <ImageWithFallback
                    src={b.imageUrl}
                    alt={b.name ?? ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
              <CardHeader className="py-3 px-4 flex flex-row items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <CardTitle className="font-serif text-base truncate">{b.name || '(No name)'}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {b.category} {b.year && `· ${b.year}`}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="outline" size="icon" onClick={() => openEdit(b)} title="Edit">
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => remove(b.id)} className="text-red-500 hover:text-red-600" title="Delete">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
