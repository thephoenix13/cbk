import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteMedia, listMedia, uploadImage } from "../media";

const MediaAdmin = () => {
  const qc = useQueryClient();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const { data, isLoading } = useQuery({ queryKey: ["media"], queryFn: listMedia });

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    for (const f of Array.from(files)) {
      try {
        await uploadImage(f);
      } catch (e) {
        toast.error(`${f.name}: ${e instanceof Error ? e.message : "upload failed"}`);
      }
    }
    setBusy(false);
    if (input.current) input.current.value = "";
    await qc.invalidateQueries({ queryKey: ["media"] });
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-1 font-heading text-2xl font-bold">Media library</h1>
          <p className="text-sm text-muted-foreground">Pictures are resized and compressed automatically. Deleting a picture that is still in use will leave a blank space on the website.</p>
        </div>
        <Button onClick={() => input.current?.click()} disabled={busy}>
          {busy ? <Loader2 size={16} className="mr-1 animate-spin" /> : <Upload size={16} className="mr-1" />} Upload pictures
        </Button>
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
      </div>
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {data?.length === 0 && <p className="rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground">No pictures uploaded yet.</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data?.map((f) => (
          <figure key={f.name} className="overflow-hidden rounded-lg border bg-card">
            <div className="aspect-square bg-muted">
              <img src={f.url} alt={f.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="flex items-center justify-between gap-1 p-2">
              <span className="truncate text-xs text-muted-foreground" title={f.name}>{f.size ? `${Math.round(f.size / 1024)} KB` : f.name}</span>
              <span className="flex shrink-0">
                <Button size="icon" variant="ghost" className="h-7 w-7" aria-label="Copy address" onClick={() => navigator.clipboard.writeText(f.url).then(() => toast.success("Address copied."))}>
                  <Copy size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-destructive"
                  aria-label="Delete picture"
                  onClick={async () => {
                    if (!window.confirm("Delete this picture permanently?")) return;
                    try {
                      await deleteMedia(f.name);
                      await qc.invalidateQueries({ queryKey: ["media"] });
                    } catch (e) {
                      toast.error(e instanceof Error ? e.message : "Could not delete.");
                    }
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default MediaAdmin;
