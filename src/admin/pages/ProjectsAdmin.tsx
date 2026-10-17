import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSection } from "@/content/ContentProvider";
import type { Field, ProjectRow } from "@/content/sections";
import { supabase } from "@/lib/supabase";
import { FieldList } from "../SchemaForm";

type Row = ProjectRow & { id: string };

const topFields: Field[] = [
  { type: "text", name: "title", label: "Project title" },
  { type: "text", name: "client", label: "Client" },
  { type: "text", name: "location", label: "Location" },
];
const bodyFields: Field[] = [
  { type: "richtext", name: "summary", label: "Description" },
  { type: "strings", name: "highlights", label: "Key points" },
  { type: "image", name: "cover_url", label: "Cover picture", hint: "Shown on the project card. Landscape photos work best." },
  { type: "list", name: "gallery", label: "More photos", itemLabel: "Photo", fields: [{ type: "image", name: "url", label: "Photo" }] },
];

const blank = (sort_order: number): Row => ({
  id: "", title: "", client: "", location: "", category: "", summary: "", highlights: [],
  cover_url: null, gallery: [], sort_order, is_published: true,
});

// Gallery is stored as text[] but edited as a list of { url }.
/* eslint-disable @typescript-eslint/no-explicit-any */
const toForm = (r: Row): Record<string, any> => ({ ...r, cover_url: r.cover_url ?? "", gallery: r.gallery.map((url) => ({ url })) });
const fromForm = (f: Record<string, any>) => ({
  title: String(f.title ?? "").trim(),
  client: f.client ?? "",
  location: f.location ?? "",
  category: f.category ?? "",
  summary: f.summary ?? "",
  highlights: (f.highlights ?? []).filter((h: string) => h.trim()),
  cover_url: f.cover_url || null,
  gallery: (f.gallery ?? []).map((g: { url: string }) => g.url).filter(Boolean),
  is_published: f.is_published !== false,
});

const ProjectsAdmin = () => {
  const qc = useQueryClient();
  const cats = (useSection("work", "categories").items as { label: string }[]).map((c) => c.label).filter((l) => l !== "All");
  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order");
      if (error) throw error;
      return data as Row[];
    },
  });
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: ["admin-projects"] });
    await qc.invalidateQueries({ queryKey: ["projects"] });
  };

  const save = async () => {
    if (!editing) return;
    const payload = fromForm(editing);
    if (!payload.title) return toast.error("Please enter a project title.");
    setSaving(true);
    const res = editing.id
      ? await supabase.from("projects").update(payload).eq("id", editing.id)
      : await supabase.from("projects").insert({ ...payload, sort_order: editing.sort_order });
    setSaving(false);
    if (res.error) return toast.error(res.error.message);
    toast.success("Project saved.");
    setEditing(null);
    await refresh();
  };

  const swap = async (a: Row, b?: Row) => {
    if (!b) return;
    const r1 = await supabase.from("projects").update({ sort_order: b.sort_order }).eq("id", a.id);
    const r2 = await supabase.from("projects").update({ sort_order: a.sort_order }).eq("id", b.id);
    if (r1.error || r2.error) toast.error("Could not reorder.");
    await refresh();
  };

  const nextOrder = (projects?.reduce((m, p) => Math.max(m, p.sort_order), -1) ?? -1) + 1;

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-1 font-heading text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">Projects shown on the Our Work page, in this order.</p>
        </div>
        <Button onClick={() => setEditing(toForm(blank(nextOrder)))}><Plus size={16} className="mr-1" /> Add project</Button>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      <ul className="space-y-2">
        {projects?.map((p, i) => (
          <li key={p.id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded bg-muted text-xs text-muted-foreground">
              {p.cover_url ? <img src={p.cover_url} alt="" className="h-full w-full object-cover" /> : "No photo"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.title}</p>
              <p className="truncate text-xs text-muted-foreground">{[p.category, p.location].filter(Boolean).join(" · ")}</p>
            </div>
            {!p.is_published && <span className="flex items-center gap-1 text-xs text-muted-foreground"><EyeOff size={14} /> Hidden</span>}
            <Button size="icon" variant="ghost" disabled={i === 0} onClick={() => swap(p, projects[i - 1])} aria-label="Move up"><ArrowUp size={16} /></Button>
            <Button size="icon" variant="ghost" disabled={i === projects.length - 1} onClick={() => swap(p, projects[i + 1])} aria-label="Move down"><ArrowDown size={16} /></Button>
            <Button size="icon" variant="outline" onClick={() => setEditing(toForm(p))} aria-label="Edit"><Pencil size={16} /></Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive"
              aria-label="Delete project"
              onClick={async () => {
                if (!window.confirm(`Delete “${p.title}”? This cannot be undone.`)) return;
                const { error } = await supabase.from("projects").delete().eq("id", p.id);
                if (error) toast.error(error.message);
                await refresh();
              }}
            >
              <Trash2 size={16} />
            </Button>
          </li>
        ))}
      </ul>

      <Dialog open={Boolean(editing)} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit project" : "New project"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-5">
              <FieldList fields={topFields} value={editing} onChange={setEditing} />
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={editing.category || undefined} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Choose a category" /></SelectTrigger>
                  <SelectContent>
                    {cats.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    {editing.category && !cats.includes(editing.category) && <SelectItem value={editing.category}>{editing.category}</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
              <FieldList fields={bodyFields} value={editing} onChange={setEditing} />
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={editing.is_published !== false} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} />
                Show on the website
              </label>
              <div className="flex gap-2 border-t pt-4">
                <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save project"}</Button>
                <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsAdmin;
