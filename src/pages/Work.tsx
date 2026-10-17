import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Images } from "lucide-react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getIcon } from "@/content/icons";
import { defaultProjects, useProjects, useSection } from "@/content/ContentProvider";
import type { ProjectRow } from "@/content/sections";

const Work = () => {
  const stats = useSection("work", "stats");
  const categories = useSection("work", "categories");
  const process = useSection("work", "process");
  const cta = useSection("work", "cta");
  const projectsQuery = useProjects();
  const projects: ProjectRow[] =
    projectsQuery.data ?? (projectsQuery.isError || !projectsQuery.isFetching ? defaultProjects() : []);
  const [active, setActive] = useState("All");
  const [gallery, setGallery] = useState<ProjectRow | null>(null);

  const cats = categories.items as { icon: string; label: string }[];
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <PageHero page="work" />

      {/* Stats */}
      <section className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {(stats.items as { value: string; label: string }[]).map((s, i) => (
              <div key={i}>
                <div className="font-heading text-3xl md:text-4xl font-bold text-accent">{s.value}</div>
                <div className="font-label uppercase tracking-wider text-xs md:text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{categories.title}</h2>
            <p className="text-center text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-10">{categories.intro}</p>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3 justify-center">
            {cats.map((c, i) => {
              const Icon = getIcon(c.icon);
              const on = active === c.label;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(c.label)}
                  aria-pressed={on}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-label tracking-wide transition-colors ${
                    on ? "bg-accent text-accent-foreground" : "bg-accent/10 text-foreground hover:bg-accent/20"
                  }`}
                >
                  <Icon className={on ? "" : "text-accent"} size={16} />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          {visible.length === 0 && !projectsQuery.isFetching && (
            <p className="text-center text-muted-foreground font-body">No projects in this category yet.</p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((p, i) => {
              const Icon = getIcon(cats.find((c) => c.label === p.category)?.icon);
              return (
                <ScrollReveal key={p.id ?? p.title} delay={(i % 3) * 100}>
                  <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:border-l-4 hover:border-l-accent transition-all h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/10 flex items-center justify-center relative">
                      {p.cover_url ? (
                        <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <Icon size={64} className="text-accent/40" />
                      )}
                      {p.gallery.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setGallery(p)}
                          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-primary/85 px-3 py-1 text-xs font-label uppercase tracking-wider text-primary-foreground hover:bg-primary"
                        >
                          <Images size={14} /> {p.gallery.length + 1} photos
                        </button>
                      )}
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-label uppercase tracking-wider bg-accent/10 text-accent">
                        {p.category}
                      </span>
                      <h3 className="font-heading font-semibold text-xl">{p.title}</h3>
                      <div className="text-sm text-muted-foreground font-body">
                        {p.client && (
                          <div><span className="font-semibold text-foreground">Client:</span> {p.client}</div>
                        )}
                        {p.location && (
                          <div><span className="font-semibold text-foreground">Location:</span> {p.location}</div>
                        )}
                      </div>
                      <RichText html={p.summary} className="prose-sm" />
                      <ul className="space-y-2 mt-auto">
                        {p.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-start gap-2 text-sm font-body text-foreground">
                            <ArrowRight className="text-accent mt-1 shrink-0" size={14} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process recap */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{process.title}</h2>
            <p className="text-center text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-16">{process.intro}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(process.items as { step: string; title: string; desc: string }[]).map((p, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="relative bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all h-full">
                  <span className="text-5xl font-heading font-bold text-accent/20">{p.step}</span>
                  <h3 className="font-heading font-semibold text-lg mt-2 mb-1">{p.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">{cta.title}</h2>
            <p className="text-accent-foreground/80 mb-8 text-lg font-body max-w-xl mx-auto">{cta.text}</p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all font-label uppercase tracking-wider text-base px-10"
              >
                {cta.button}
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Dialog open={Boolean(gallery)} onOpenChange={(o) => !o && setGallery(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-heading">{gallery?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid max-h-[70vh] gap-3 overflow-y-auto sm:grid-cols-2">
            {gallery && [gallery.cover_url, ...gallery.gallery].filter(Boolean).map((url, i) => (
              <img key={i} src={url as string} alt={`${gallery.title} photo ${i + 1}`} className="w-full rounded-md object-cover" loading="lazy" />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Work;
