import { supabase, MEDIA_BUCKET } from "@/lib/supabase";

export interface MediaFile {
  name: string;
  url: string;
  size: number;
  created_at: string;
}

const MAX_EDGE = 1920;
const MAX_BYTES = 5 * 1024 * 1024;

const slug = (s: string) =>
  s.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "image";

// Shrinks large photos and converts them to WebP so the public site stays fast.
async function compress(file: File): Promise<{ blob: Blob; ext: string; type: string }> {
  if (file.type === "image/svg+xml") return { blob: file, ext: "svg", type: file.type };
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp", 0.85));
  if (!blob) throw new Error("Could not process this image.");
  return { blob, ext: "webp", type: "image/webp" };
}

export const publicUrl = (name: string) =>
  supabase.storage.from(MEDIA_BUCKET).getPublicUrl(name).data.publicUrl;

export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file (JPG, PNG, WebP or SVG).");
  const { blob, ext, type } = await compress(file);
  if (blob.size > MAX_BYTES) throw new Error("This image is still over 5 MB after compression. Please use a smaller one.");
  const name = `${Date.now()}-${slug(file.name)}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(name, blob, { contentType: type, cacheControl: "31536000" });
  if (error) throw error;
  return publicUrl(name);
}

export async function listMedia(): Promise<MediaFile[]> {
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .list("", { limit: 500, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw error;
  return (data ?? [])
    .filter((f) => f.id && f.name !== ".emptyFolderPlaceholder")
    .map((f) => ({
      name: f.name,
      url: publicUrl(f.name),
      size: (f.metadata?.size as number) ?? 0,
      created_at: f.created_at ?? "",
    }));
}

export async function deleteMedia(name: string) {
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([name]);
  if (error) throw error;
}
