"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BiografiaCategory } from "@/data/biografias";
import { normalizePhotoCategory } from "@/lib/photoCategories";
import { formatFirebaseError } from "@/lib/firebaseErrors";

/** Detecta URLs de Firebase/GCS aunque el campo en Firestore use otro nombre. */
function looksLikeFirebaseOrGcsHttpUrl(s: string): boolean {
  const u = s.trim();
  return /^https:\/\/(firebasestorage\.googleapis\.com|storage\.googleapis\.com)\//i.test(u);
}

/** Evita usar el campo genérico `url` para un enlace de fuente que no sea imagen. */
function looksLikeImageHttpUrl(s: string): boolean {
  const t = s.trim();
  if (!/^https?:\/\//i.test(t)) return false;
  const lower = t.toLowerCase();
  if (lower.includes("firebasestorage.googleapis.com")) return true;
  if (lower.includes("storage.googleapis.com")) return true;
  if (lower.includes("images.unsplash.com")) return true;
  if (lower.includes("wikimedia.org") || lower.includes("upload.wikimedia.org")) return true;
  if (lower.includes("drive.google.com") || lower.includes("googleusercontent.com")) return true;
  if (/\.(jpg|jpeg|png|gif|webp|avif|bmp)(\?|#|$)/i.test(t)) return true;
  return false;
}

/** Acepta varios nombres de campo usados en Firestore / admin (Firestore distingue mayúsculas). */
function pickImageUrlString(d: Record<string, unknown>): string | null {
  const keys = [
    "imageUrl",
    "imageURL",
    "ImageUrl",
    "image_url",
    "image",
    "imagen",
    "picture",
    "thumbnail",
    "url",
    "photoUrl",
    "photoURL",
    "src",
  ] as const;
  for (const k of keys) {
    const v = d[k];
    if (typeof v !== "string" || !v.trim()) continue;
    const t = v.trim();
    if (k === "url" && !looksLikeImageHttpUrl(t)) continue;
    if (k === "src" && !looksLikeImageHttpUrl(t)) continue;
    return t;
  }
  for (const v of Object.values(d)) {
    if (typeof v === "string" && v.trim() && looksLikeFirebaseOrGcsHttpUrl(v)) return v.trim();
  }
  return null;
}

// Define local types to match what the UI expects
export interface Photo {
    id: string;
    title: string;
    year: string;
    location: string;
    description: string;
    source: string;
    imageUrl: string | null;
    category?: string;
    bio?: string;
}

export interface BiografiaItem {
    id: string;
    category: string;
    name?: string;
    imageUrl?: string;
    year?: string;
    description?: string;
    works?: unknown[];
}

export function usePhotos(category?: BiografiaCategory) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(collection(db, "photos"));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                setError(null);
                let items = snapshot.docs.map((docSnap) => {
                    const d = docSnap.data() as Record<string, unknown>;
                    const imageUrl = pickImageUrlString(d);
                    const rawCategory = typeof d.category === "string" ? d.category : "";
                    const categorySlug = normalizePhotoCategory(rawCategory);
                    return {
                        id: docSnap.id,
                        ...d,
                        imageUrl,
                        category: categorySlug || rawCategory,
                    };
                }) as (Photo & {
                    createdAt?: { toMillis?: () => number };
                    updatedAt?: { toMillis?: () => number };
                })[];

                if (category) {
                    items = items.filter((p) => normalizePhotoCategory(p.category) === category);
                }

                items.sort(
                    (a, b) =>
                        (b.createdAt?.toMillis?.() ?? b.updatedAt?.toMillis?.() ?? 0) -
                        (a.createdAt?.toMillis?.() ?? a.updatedAt?.toMillis?.() ?? 0),
                );
                setPhotos(items as Photo[]);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching photos:", err);
                const msg = err instanceof Error ? err.message : "Error al leer Firestore";
                const code =
                    err && typeof err === "object" && "code" in err
                        ? String((err as { code: string }).code)
                        : "";
                setError(formatFirebaseError(msg, code));
                setLoading(false);
            },
        );

        return () => unsubscribe();
    }, [category]);

    return { photos, loading, error };
}

export function useBiographies() {
    const [items, setItems] = useState<BiografiaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "biographies"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const p = snapshot.docs.map((docSnap) => {
                const d = docSnap.data() as Record<string, unknown>;
                const imageUrl = pickImageUrlString(d) ?? undefined;
                return {
                    id: docSnap.id,
                    ...d,
                    imageUrl,
                };
            }) as BiografiaItem[];
            setItems(p);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching biographies:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { items, loading };
}
