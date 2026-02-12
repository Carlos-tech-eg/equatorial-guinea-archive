"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface SiteSettings {
    siteName: string;
    description: string;
    maintenanceMode: boolean;
    theme: {
        primaryColor: string;
    };
}

const defaultSettings: SiteSettings = {
    siteName: "Guinea Equatorial Archivos",
    description: "Historical Archive",
    maintenanceMode: false,
    theme: {
        primaryColor: "#efbf04", // Default Gold
    },
};

interface SiteSettingsContextType {
    settings: SiteSettings;
    loading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
    settings: defaultSettings,
    loading: true,
});

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen to Firestore
        const unsubscribe = onSnapshot(
            doc(db, "settings", "global"),
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data() as SiteSettings;
                    setSettings(data);

                    // Apply Theme Instantly
                    if (data.theme?.primaryColor) {
                        document.documentElement.style.setProperty("--primary", data.theme.primaryColor);
                        // Also update Tailwind variable if configured or just use CSS variable
                        // Assuming the CSS uses var(--primary)
                    }
                }
                setLoading(false);
            },
            (err) => {
                console.error("Settings listener error:", err);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <SiteSettingsContext.Provider value={{ settings, loading }}>
            {settings.maintenanceMode ? (
                <MaintenancePage />
            ) : (
                children
            )}
        </SiteSettingsContext.Provider>
    );
}

function MaintenancePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">Maintenance Mode</h1>
                <p>The archive is currently being updated. Please check back soon.</p>
            </div>
        </div>
    );
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
