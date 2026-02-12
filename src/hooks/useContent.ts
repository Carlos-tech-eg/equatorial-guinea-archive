"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define local types to match what the UI expects
export interface Photo {
    id: string;
    title: string;
    year: string;
    location: string;
    description: string;
    source: string;
    imageUrl: string;
    category?: string;
    bio?: string;
}

export interface BiografiaItem {
    id: string;
    category: string;
    name?: string;
    imageUrl: string;
    year?: string;
    description?: string;
    works?: any[];
}

export function usePhotos() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Basic query
        const q = query(collection(db, "photos"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as (Photo & { createdAt?: { toMillis?: () => number }; updatedAt?: { toMillis?: () => number } })[];
            // Newest first so admin uploads appear at top on the site
            items.sort((a, b) => (b.createdAt?.toMillis?.() ?? b.updatedAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? a.updatedAt?.toMillis?.() ?? 0));
            setPhotos(items as Photo[]);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching photos:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { photos, loading };
}

export function useBiographies() {
    const [items, setItems] = useState<BiografiaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "biographies"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const p = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BiografiaItem[];
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
