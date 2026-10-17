import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabase";
import ImageField from "../ImageField";

interface Client {
  id: string;
  name: string;
  logo_url: string;
  sort_order: number;
  is_published: boolean;
}

const ClientsAdmin = () => {
  const qc = useQueryClient();
  const { data: clients, isLoading } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: async (): Promise<Client[]> => {
      const { data, error } = await supabase.from("clients").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: ["admin-clients"] });
    await qc.invalidateQueries({ queryKey: ["clients"] });
  };
  const run = async (fn: () => PromiseLike<{ error: { message: string } | null }>, ok?: string) => {
    const { error } = await fn();
    if (error) toast.error(error.message);
    else {
      if (ok) toast.success(ok);
      await refresh();
    }
  };

  const add = () => {
    if (!name.trim() || !logo) return toast.error("Please enter a name and choose a logo.");
    const next = (clients?.reduce((m, c) => Math.max(m, c.sort_order), -1) ?? -1) + 1;
    run(() => supabase.from("clients").insert({ name: name.trim(), logo_url: logo, sort_order: next }), "Client added.").then(() => {
      setName("");
      setLogo("");
    });
  };

  const swap = (a: Client, b?: Client) => {
    if (!b) return;
    run(async () => {
      const r1 = await supabase.from("clients").update({ sort_order: b.sort_order }).eq("id", a.id);
      if (r1.error) return r1;
      return supabase.from("clients").update({ sort_order: a.sort_order }).eq("id", b.id);
    });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-1 font-heading text-2xl font-bold">Clients</h1>
      <p className="mb-6 text-sm text-muted-foreground">Logos shown in “Our Clientele” on the home page. Hidden clients stay saved but are not shown.</p>

      <div className="mb-8 space-y-4 rounded-lg border bg-card p-5">
        <h2 className="font-heading text-lg font-semibold">Add a client</h2>
        <div className="space-y-1.5">
          <Label>Company name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Logo</Label>
          <ImageField value={logo} onChange={setLogo} hint="A logo on a white or transparent background works best." />
        </div>
        <Button onClick={add}><Plus size={16} className="mr-1" /> Add client</Button>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      <ul className="space-y-2">
        {clients?.map((c, i) => (
          <li key={c.id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded bg-white p-1">
              <img src={c.logo_url} alt={`${c.name} logo`} className="max-h-full max-w-full object-contain" />
            </div>
            <Input
              defaultValue={c.name}
              aria-label="Company name"
              onBlur={(e) => e.target.value.trim() && e.target.value !== c.name && run(() => supabase.from("clients").update({ name: e.target.value.trim() }).eq("id", c.id), "Name updated.")}
            />
            <label className="flex shrink-0 items-center gap-2 text-sm">
              <Switch checked={c.is_published} onCheckedChange={(v) => run(() => supabase.from("clients").update({ is_published: v }).eq("id", c.id))} />
              Visible
            </label>
            <Button size="icon" variant="ghost" disabled={i === 0} onClick={() => swap(c, clients[i - 1])} aria-label="Move up"><ArrowUp size={16} /></Button>
            <Button size="icon" variant="ghost" disabled={i === clients.length - 1} onClick={() => swap(c, clients[i + 1])} aria-label="Move down"><ArrowDown size={16} /></Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive"
              aria-label="Delete client"
              onClick={() => window.confirm(`Delete ${c.name}? This cannot be undone.`) && run(() => supabase.from("clients").delete().eq("id", c.id), "Client deleted.")}
            >
              <Trash2 size={16} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsAdmin;
