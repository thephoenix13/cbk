import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ImagePlus, Images, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listMedia, uploadImage } from "./media";

interface Props {
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}

export const MediaPicker = ({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (url: string) => void }) => {
  const { data, isLoading } = useQuery({ queryKey: ["media"], queryFn: listMedia, enabled: open });
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Choose from media library</DialogTitle>
        </DialogHeader>
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {data && data.length === 0 && (
          <p className="text-sm text-muted-foreground">No images uploaded yet. Use “Upload new” instead.</p>
        )}
        <div className="grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-4">
          {data?.map((f) => (
            <button
              key={f.name}
              type="button"
              onClick={() => { onPick(f.url); onClose(); }}
              className="aspect-square overflow-hidden rounded-md border bg-muted hover:ring-2 hover:ring-accent"
            >
              <img src={f.url} alt={f.name} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ImageField = ({ value, onChange, hint }: Props) => {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [picker, setPicker] = useState(false);

  const onFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="px-2 text-center text-xs text-muted-foreground">Using the standard picture</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => input.current?.click()}>
            {busy ? <Loader2 className="mr-1 animate-spin" size={14} /> : <ImagePlus className="mr-1" size={14} />}
            Upload new
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setPicker(true)}>
            <Images className="mr-1" size={14} /> Library
          </Button>
          {value && (
            <Button type="button" size="sm" variant="ghost" onClick={() => onChange("")}>
              <Trash2 className="mr-1" size={14} /> Remove
            </Button>
          )}
        </div>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <input ref={input} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      <MediaPicker open={picker} onClose={() => setPicker(false)} onPick={onChange} />
    </div>
  );
};

export default ImageField;
