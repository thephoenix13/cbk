import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import {
  DEFAULT_CLIENTS, DEFAULT_PROJECTS, SECTIONS, SETTINGS_DEFAULTS, getSectionDef, type ProjectRow,
} from "./sections";

type Data = Record<string, unknown>;

interface ContentState {
  settings: Data;
  sections: Record<string, Data>; // "page.key" -> data
}

const ContentContext = createContext<ContentState | null>(null);

// Database values win over defaults. Empty strings and nulls fall back, arrays are respected as-is.
export function mergeDefaults(defaults: Data, stored: Data | undefined): Data {
  if (!stored) return { ...defaults };
  const out: Data = { ...defaults };
  for (const [k, v] of Object.entries(stored)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    out[k] = v;
  }
  return out;
}

async function fetchContent(): Promise<ContentState> {
  const [settingsRes, sectionsRes] = await Promise.all([
    supabase.from("site_settings").select("data").eq("id", 1).maybeSingle(),
    supabase.from("page_sections").select("page,key,data"),
  ]);
  if (settingsRes.error) throw settingsRes.error;
  if (sectionsRes.error) throw sectionsRes.error;

  const stored: Record<string, Data> = {};
  for (const row of sectionsRes.data ?? []) stored[`${row.page}.${row.key}`] = row.data as Data;

  const sections: Record<string, Data> = {};
  for (const def of SECTIONS) {
    const id = `${def.page}.${def.key}`;
    sections[id] = mergeDefaults(def.defaults, stored[id]);
  }
  return {
    settings: mergeDefaults(SETTINGS_DEFAULTS, (settingsRes.data?.data as Data) ?? undefined),
    sections,
  };
}

const fallbackState = (): ContentState => ({
  settings: { ...SETTINGS_DEFAULTS },
  sections: Object.fromEntries(SECTIONS.map((s) => [`${s.page}.${s.key}`, { ...s.defaults }])),
});

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending } = useQuery({
    queryKey: ["content"],
    queryFn: fetchContent,
    enabled: supabaseConfigured,
    staleTime: 60_000,
    retry: 1,
  });

  const value = useMemo(() => data ?? fallbackState(), [data]);

  // Hold the first paint briefly so edited text never flashes the old defaults.
  if (supabaseConfigured && isPending) {
    return <div className="min-h-screen bg-background" aria-busy="true" />;
  }
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("ContentProvider missing");
  return ctx;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useSection(page: string, key: string): Record<string, any> {
  const { sections } = useContent();
  return (sections[`${page}.${key}`] ?? getSectionDef(page, key)?.defaults ?? {}) as Record<string, any>;
}

export function useSettings(): Record<string, any> {
  return useContent().settings as Record<string, any>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface ClientItem {
  id: string;
  name: string;
  logo_url: string;
}

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async (): Promise<ClientItem[]> => {
      const { data, error } = await supabase
        .from("clients").select("id,name,logo_url").eq("is_published", true).order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: supabaseConfigured,
    staleTime: 60_000,
  });
}

export const defaultClients = (): ClientItem[] =>
  DEFAULT_CLIENTS.map((c) => ({ id: c.file, name: c.name, logo_url: `/clients/${c.file}` }));

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<ProjectRow[]> => {
      const { data, error } = await supabase
        .from("projects").select("*").eq("is_published", true).order("sort_order");
      if (error) throw error;
      return data as ProjectRow[];
    },
    enabled: supabaseConfigured,
    staleTime: 60_000,
  });
}

export const defaultProjects = (): ProjectRow[] => DEFAULT_PROJECTS;
