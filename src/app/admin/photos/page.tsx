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
import { usePhotos, type Photo } from '@/hooks/useContent';
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
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Plus, Pencil, Trash2, Link2, Upload, Cloud } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type ImageSource = 'url' | 'upload' | 'gdrive';

function parseGoogleDriveImageUrl(link: string): string {
  if (!link.trim()) return '';
  // https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  // https://drive.google.com/open?id=FILE_ID
  const openMatch = link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  return link;
}

const PHOTO_CATEGORIES = [
  { value: 'musica', label: 'Música' },
  { value: 'politica', label: 'Política' },
  { value: 'cultura', label: 'Cultura' },
  { value: 'personasHistoricas', label: 'Personas Históricas' },
  { value: 'otro', label: 'Otro' },
] as const;

const emptyPhoto = (): Omit<Photo, 'id'> => ({
  title: '',
  year: '',
  location: '',
  description: '',
  source: '',
  imageUrl: '',
  category: '',
  bio: '',
});

export default function AdminPhotosPage() {
  const { photos, loading } = usePhotos();
  const [editing, setEditing] = useState<Photo | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyPhoto());
  const [saving, setSaving] = useState(false);
  const [imageSource, setImageSource] = useState<ImageSource>('url');
  const [gdriveLink, setGdriveLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyPhoto());
    setImageSource('url');
    setGdriveLink('');
    setUploadError(null);
    setSaveError(null);
    setSaveSuccess(false);
    setAdding(true);
  };

  const openEdit = (p: Photo) => {
    setAdding(false);
    setEditing(p);
    setForm({
      title: p.title ?? '',
      year: p.year ?? '',
      location: p.location ?? '',
      description: p.description ?? '',
      source: p.source ?? '',
      imageUrl: p.imageUrl ?? '',
      category: p.category ?? '',
      bio: p.bio ?? '',
    });
    setImageSource('url');
    setGdriveLink('');
  };

  const closeModal = () => {
    setAdding(false);
    setEditing(null);
    setForm(emptyPhoto());
    setImageSource('url');
    setGdriveLink('');
    setUploadError(null);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const save = async () => {
    setSaveError(null);
    setSaveSuccess(false);
    setSaving(true);
    try {
      const data = {
        title: form.title || '',
        year: form.year || '',
        location: form.location || '',
        description: form.description || '',
        source: form.source || '',
        imageUrl: form.imageUrl || '',
        category: form.category || '',
        bio: form.bio || '',
        updatedAt: serverTimestamp(),
      };
      if (editing) {
        await updateDoc(doc(db, 'photos', editing.id), data);
        setSaveSuccess(true);
        setTimeout(() => closeModal(), 1500);
      } else {
        await addDoc(collection(db, 'photos'), { ...data, createdAt: serverTimestamp() });
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
    if (!confirm('Delete this photo?')) return;
    try {
      await deleteDoc(doc(db, 'photos', id));
      if (editing?.id === id) closeModal();
    } catch (e) {
      console.error(e);
    }
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
      const path = `photos/${Date.now()}_${safeName || 'image'}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file, { contentType: file.type || 'image/jpeg' });
      const url = await getDownloadURL(storageRef);
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'message' in err
        ? String((err as { message: string }).message)
        : 'Upload failed';
      const code = err && typeof err === 'object' && 'code' in err ? (err as { code: string }).code : '';
      if (code === 'storage/unauthorized' || message.includes('403') || message.includes('Permission')) {
        setUploadError('Storage permission denied. Make sure you are signed in and Storage rules allow authenticated uploads.');
      } else if (code === 'storage/object-not-found' || message.includes('bucket')) {
        setUploadError('Storage bucket not found. Check Firebase Console → Storage is enabled for this project.');
      } else {
        setUploadError(message);
      }
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

  const isOpen = adding || !!editing;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Photos you add or edit here appear on the main site gallery in real time. Use &quot;View gallery on site&quot; to check.
      </p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl font-light text-foreground">Photos</h1>
          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent-gold hover:underline"
          >
            View gallery on site →
          </a>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
          <Button onClick={openAdd} className="bg-accent-gold text-primary-foreground hover:bg-accent-gold-muted">
            <Plus className="size-4" /> Add photo
          </Button>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit photo' : 'New photo'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Year</Label>
                  <Input
                    value={form.year}
                    onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                    placeholder="e.g. 1968"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Location</Label>
                  <Input
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    placeholder="Location"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Description"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label>Category (e.g. música, política)</Label>
                <Select
                  value={form.category || '_none'}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v === '_none' ? '' : v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_none">—</SelectItem>
                    {PHOTO_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Biografía breve (artista, político, etc.)</Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder="Información biográfica sobre la persona en la foto..."
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label>Source</Label>
                <Input
                  value={form.source}
                  onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                  placeholder="Source"
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
                    <RadioGroupItem value="url" id="src-url" />
                    <Link2 className="size-4 shrink-0" />
                    <span className="text-sm">URL</span>
                  </Label>
                  <Label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 has-[data-state=checked]:border-accent-gold has-[data-state=checked]:bg-accent-gold/10 cursor-pointer">
                    <RadioGroupItem value="upload" id="src-upload" />
                    <Upload className="size-4 shrink-0" />
                    <span className="text-sm">Local</span>
                  </Label>
                  <Label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 has-[data-state=checked]:border-accent-gold has-[data-state=checked]:bg-accent-gold/10 cursor-pointer">
                    <RadioGroupItem value="gdrive" id="src-gdrive" />
                    <Cloud className="size-4 shrink-0" />
                    <span className="text-sm">Drive</span>
                  </Label>
                </RadioGroup>

                {imageSource === 'url' && (
                  <div className="grid gap-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
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
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-sm text-muted-foreground file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-accent-gold file:text-primary-foreground file:cursor-pointer cursor-pointer"
                    />
                    {uploadError && (
                      <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                        {uploadError}
                      </p>
                    )}
                    {uploading && <p className="text-sm text-muted-foreground">Uploading…</p>}
                    {form.imageUrl && !uploadError && (
                      <p className="text-xs text-muted-foreground truncate">Ready: {form.imageUrl}</p>
                    )}
                  </div>
                )}

                {imageSource === 'gdrive' && (
                  <div className="grid gap-2">
                    <Label htmlFor="gdrive-link">Google Drive link</Label>
                    <Input
                      id="gdrive-link"
                      value={gdriveLink}
                      onChange={(e) => setGdriveLink(e.target.value)}
                      placeholder="Paste Drive link (e.g. https://drive.google.com/file/d/.../view)"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={applyGdriveUrl}>
                      Use this image
                    </Button>
                    {form.imageUrl && (
                      <p className="text-xs text-muted-foreground truncate">Image URL set.</p>
                    )}
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
                Saved. It will appear on the main site gallery.
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                onClick={save}
                disabled={saving || uploading}
                className="bg-accent-gold text-primary-foreground hover:bg-accent-gold-muted"
              >
                {saving ? 'Saving…' : uploading ? 'Uploading…' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading photos…</p>
      ) : photos.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-8 text-center text-muted-foreground">
            No photos yet. Add one with the button above.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <Card key={p.id} className="border-border overflow-hidden flex flex-col">
              <a href={`/photo/${p.id}`} target="_blank" rel="noopener noreferrer" className="block flex-1">
                <div className="aspect-[4/3] bg-muted">
                  <ImageWithFallback
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
              <CardHeader className="py-3 px-4 flex flex-row items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <CardTitle className="font-serif text-base truncate">{p.title || '(No title)'}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {p.year} {p.location && `· ${p.location}`}
                  </p>
                  {p.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="outline" size="icon" onClick={() => openEdit(p)} title="Edit">
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => remove(p.id)} className="text-red-500 hover:text-red-600" title="Delete">
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
