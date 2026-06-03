import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "@/lib/firebase";

/** Public Firebase Storage download URL (includes token query). */
export function isFirebaseStorageDownloadUrl(url: string): boolean {
  return /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\//i.test(url.trim());
}

/**
 * Obtains a new download URL for the same object (new token). Fixes broken/rotated
 * tokens when the object still exists and Storage rules allow read.
 */
export async function getFreshDownloadUrlFromFirebaseUrl(
  url: string
): Promise<string | null> {
  const trimmed = url.trim();
  const m = trimmed.match(
    /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/([^/]+)\/o\/([^?]+)/i
  );
  if (!m) return null;
  const bucketName = m[1];
  const encodedPath = m[2];
  const objectPath = decodeURIComponent(encodedPath.replace(/\+/g, " "));
  try {
    const bucketRef = getStorage(
      app,
      bucketName.startsWith("gs://") ? bucketName : `gs://${bucketName}`
    );
    const download = getDownloadURL(ref(bucketRef, objectPath));
    const timeoutMs = 8000;
    const timedOut = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), timeoutMs)
    );
    const result = await Promise.race([download, timedOut]);
    return result;
  } catch {
    return null;
  }
}
