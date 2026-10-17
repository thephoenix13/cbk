import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Field } from "@/content/sections";
import { FieldList } from "./SchemaForm";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  fields: Field[];
  initial: Record<string, any>;
  defaults?: Record<string, any>;
  onSave: (data: Record<string, any>) => Promise<void>;
}

// A form for one block of content with Save and "restore standard text" buttons.
const ContentEditor = ({ fields, initial, defaults, onSave }: Props) => {
  const [data, setData] = useState<Record<string, any>>(initial);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);

  const change = (next: Record<string, any>) => {
    setData(next);
    setDirty(true);
  };

  const save = async () => {
    setBusy(true);
    try {
      await onSave(data);
      setDirty(false);
      toast.success("Saved. The change is live on the website.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <FieldList fields={fields} value={data} onChange={change} />
      <div className="flex flex-wrap items-center gap-2 border-t pt-4">
        <Button onClick={save} disabled={busy || !dirty}>{busy ? "Saving…" : "Save changes"}</Button>
        {defaults && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              if (window.confirm("Restore the original text for this block? Unsaved edits will be lost.")) {
                // Remount-free reset: the editors read from `data`, so replace it wholesale.
                change(JSON.parse(JSON.stringify(defaults)));
              }
            }}
          >
            Restore original
          </Button>
        )}
        {dirty && <span className="text-sm text-muted-foreground">You have unsaved changes.</span>}
      </div>
    </div>
  );
};

export default ContentEditor;
