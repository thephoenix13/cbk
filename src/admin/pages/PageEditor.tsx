import { useParams, Navigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mergeDefaults } from "@/content/ContentProvider";
import { PAGES, SECTIONS } from "@/content/sections";
import { supabase } from "@/lib/supabase";
import ContentEditor from "../ContentEditor";

const PageEditor = () => {
  const { page = "" } = useParams();
  const qc = useQueryClient();
  const meta = PAGES.find((p) => p.id === page);
  const sections = SECTIONS.filter((s) => s.page === page);

  const { data: stored, isLoading, error } = useQuery({
    queryKey: ["admin-sections", page],
    queryFn: async () => {
      const { data, error } = await supabase.from("page_sections").select("key,data").eq("page", page);
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.key, r.data as Record<string, unknown>]));
    },
    enabled: Boolean(meta),
    gcTime: 0,
  });

  if (!meta) return <Navigate to="/admin" replace />;

  return (
    <div className="max-w-3xl">
      <h1 className="mb-1 font-heading text-2xl font-bold">{meta.label} page</h1>
      <p className="mb-6 text-sm text-muted-foreground">Open a block below, change it and press Save. Changes appear on the website straight away.</p>
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-destructive">Could not load content. Please refresh.</p>}
      {stored && (
        <Accordion type="single" collapsible className="rounded-lg border bg-card px-4">
          {sections.map((s) => (
            <AccordionItem key={s.key} value={s.key}>
              <AccordionTrigger className="font-heading text-lg">{s.label}</AccordionTrigger>
              <AccordionContent forceMount className="pb-6 pt-2 data-[state=closed]:hidden">
                <ContentEditor
                  fields={s.fields}
                  initial={mergeDefaults(s.defaults, stored[s.key])}
                  defaults={s.defaults}
                  onSave={async (data) => {
                    const sort_order = SECTIONS.indexOf(s);
                    const { error } = await supabase
                      .from("page_sections").upsert({ page: s.page, key: s.key, data, sort_order });
                    if (error) throw error;
                    await qc.invalidateQueries({ queryKey: ["content"] });
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default PageEditor;
