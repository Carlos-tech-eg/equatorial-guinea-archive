/**
 * Legacy entry - use @/lib/firebase for a single Firebase instance.
 * Re-exports from the canonical config to avoid double initialization.
 */
export { app, auth, db, storage, analytics } from "@/lib/firebase";
