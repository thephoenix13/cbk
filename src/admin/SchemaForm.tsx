import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ICONS, ICON_NAMES } from "@/content/icons";
import type { Field } from "@/content/sections";
import ImageField from "./ImageField";
import RichTextEditor from "./RichTextEditor";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Obj = Record<string, any>;

const move = <T,>(arr: T[], i: number, dir: -1 | 1): T[] => {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

const emptyItem = (fields: Field[]): Obj =>
  Object.fromEntries(fields.map((f) => [f.name, f.type === "list" || f.type === "strings" ? [] : ""]));

const RowButtons = ({ index, count, onMove, onRemove }: { index: number; count: number; onMove: (d: -1 | 1) => void; onRemove: () => void }) => (
  <div className="flex shrink-0 gap-1">
    <Button type="button" size="icon" variant="ghost" className="h-8 w-8" disabled={index === 0} onClick={() => onMove(-1)} aria-label="Move up">
      <ArrowUp size={14} />
    </Button>
    <Button type="button" size="icon" variant="ghost" className="h-8 w-8" disabled={index === count - 1} onClick={() => onMove(1)} aria-label="Move down">
      <ArrowDown size={14} />
    </Button>
    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={onRemove} aria-label="Remove">
      <Trash2 size={14} />
    </Button>
  </div>
);

export const IconSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder="Choose an icon" />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {ICON_NAMES.map((n) => {
          const I = ICONS[n];
          return (
            <SelectItem key={n} value={n}>
              <span className="flex items-center gap-2"><I size={16} /> {n}</span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export const FieldInput = ({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) => {
  switch (field.type) {
    case "text":
      return <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "textarea":
      return <Textarea rows={3} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "richtext":
      return <RichTextEditor value={value ?? ""} onChange={onChange} />;
    case "image":
      return <ImageField value={value ?? ""} onChange={onChange} hint={field.hint} />;
    case "icon":
      return <IconSelect value={value ?? ""} onChange={onChange} />;
    case "strings": {
      const items: string[] = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-2">
          {items.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={s} onChange={(e) => onChange(items.map((x, k) => (k === i ? e.target.value : x)))} />
              <RowButtons index={i} count={items.length} onMove={(d) => onChange(move(items, i, d))} onRemove={() => onChange(items.filter((_, k) => k !== i))} />
            </div>
          ))}
          <Button type="button" size="sm" variant="outline" onClick={() => onChange([...items, ""])}>
            <Plus size={14} className="mr-1" /> Add
          </Button>
        </div>
      );
    }
    case "list": {
      const items: Obj[] = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-md border bg-muted/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {field.itemLabel} {i + 1}
                </span>
                <RowButtons index={i} count={items.length} onMove={(d) => onChange(move(items, i, d))} onRemove={() => onChange(items.filter((_, k) => k !== i))} />
              </div>
              <FieldList
                fields={field.fields}
                value={item}
                onChange={(next) => onChange(items.map((x, k) => (k === i ? next : x)))}
              />
            </div>
          ))}
          <Button type="button" size="sm" variant="outline" onClick={() => onChange([...items, emptyItem(field.fields)])}>
            <Plus size={14} className="mr-1" /> Add {field.itemLabel.toLowerCase()}
          </Button>
        </div>
      );
    }
  }
};

export const FieldList = ({ fields, value, onChange }: { fields: Field[]; value: Obj; onChange: (v: Obj) => void }) => (
  <div className="space-y-4">
    {fields.map((f) => (
      <div key={f.name} className="space-y-1.5">
        <Label>{f.label}</Label>
        <FieldInput field={f} value={value[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />
        {"hint" in f && f.hint && f.type !== "image" && <p className="text-xs text-muted-foreground">{f.hint}</p>}
      </div>
    ))}
  </div>
);
