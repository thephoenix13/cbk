import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && key);

// Without env vars the site still renders from bundled defaults.
export const supabase = createClient(url ?? "http://localhost", key ?? "missing-key");

export const MEDIA_BUCKET = "media";
