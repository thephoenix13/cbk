import { useQuery, useQueryClient } from "@tanstack/react-query";
import { mergeDefaults } from "@/content/ContentProvider";
import { SETTINGS_DEFAULTS, SETTINGS_FIELDS } from "@/content/sections";
import { supabase } from "@/lib/supabase";
import ContentEditor from "../ContentEditor";

const SettingsPage = () => {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("data").eq("id", 1).maybeSingle();
      if (error) throw error;
      return (data?.data ?? {}) as Record<string, unknown>;
    },
    gcTime: 0,
  });

  return (
    <div className="max-w-3xl">
      <h1 className="mb-1 font-heading text-2xl font-bold">Site settings</h1>
      <p className="mb-6 text-sm text-muted-foreground">Contact details, logo and search-engine text used across the whole website.</p>
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-destructive">Could not load settings. Please refresh.</p>}
      {data && (
        <div className="rounded-lg border bg-card p-6">
          <ContentEditor
            fields={SETTINGS_FIELDS}
            initial={mergeDefaults(SETTINGS_DEFAULTS, data)}
            defaults={SETTINGS_DEFAULTS}
            onSave={async (next) => {
              const { error } = await supabase.from("site_settings").upsert({ id: 1, data: next });
              if (error) throw error;
              await qc.invalidateQueries({ queryKey: ["content"] });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
