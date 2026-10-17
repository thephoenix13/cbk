import { ArrowRight, Building2, Layers, Paintbrush } from "lucide-react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { getIcon } from "@/content/icons";
import { useSection } from "@/content/ContentProvider";

interface IconCard { icon: string; title: string; desc: string }

const Placeholder = ({ image, alt, children }: { image?: string; alt: string; children: React.ReactNode }) => (
  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-secondary/20 to-accent/10 border border-border flex items-center justify-center overflow-hidden">
    {image ? <img src={image} alt={alt} className="w-full h-full object-cover" loading="lazy" /> : children}
  </div>
);

const Services = () => {
  const civil = useSection("services", "civil");
  const foundations = useSection("services", "foundations");
  const fab = useSection("services", "fabrication");
  const land = useSection("services", "land");
  const interiors = useSection("services", "interiors");
  const additional = useSection("services", "additional");

  return (
    <>
      <PageHero page="services" />

      {/* Civil Works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <Placeholder image={civil.image} alt={civil.title}>
                <Building2 size={80} className="text-accent/30" />
              </Placeholder>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{civil.title}</h2>
              <p className="text-muted-foreground font-body text-lg mb-6">{civil.intro}</p>
              <ul className="space-y-3">
                {(civil.points as string[]).map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground font-body">
                    <ArrowRight className="text-accent mt-1 shrink-0" size={16} />
                    {s}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Structure & Machinery Foundations */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{foundations.title}</h2>
              <p className="text-muted-foreground font-body text-lg mb-8">{foundations.intro}</p>
              <div className="grid gap-4">
                {(foundations.items as { title: string; desc: string }[]).map((c, i) => (
                  <div key={i} className="p-5 bg-card border border-border rounded-lg hover:shadow-md hover:border-l-4 hover:border-l-accent transition-all">
                    <h3 className="font-heading font-semibold mb-1">{c.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{c.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="order-1 lg:order-2">
              <Placeholder image={foundations.image} alt={foundations.title}>
                <Layers size={80} className="text-accent/30" />
              </Placeholder>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PEB & Shed Fabrication */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{fab.title}</h2>
            <p className="text-center text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-16">{fab.intro}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {(fab.steps as { step: string; title: string; desc: string }[]).map((p, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="relative bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all">
                  <span className="text-5xl font-heading font-bold text-accent/20">{p.step}</span>
                  <h3 className="font-heading font-semibold text-lg mt-2 mb-1">{p.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="bg-muted/50 rounded-lg p-8 border border-border">
              <h3 className="font-heading font-semibold text-lg mb-4">{fab.extras_title}</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {(fab.extras as string[]).map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-body text-foreground">
                    <ArrowRight className="text-accent shrink-0" size={14} /> {s}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Land Development */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{land.title}</h2>
            <p className="text-center text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-16">{land.intro}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-8">
            {(land.items as IconCard[]).map((l, i) => {
              const Icon = getIcon(l.icon);
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-l-4 hover:border-l-accent transition-all h-full">
                    <Icon className="text-accent mb-4" size={28} />
                    <h3 className="font-heading font-semibold text-lg mb-2">{l.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{l.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interior Design */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{interiors.title}</h2>
            <p className="text-center text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-16">{interiors.intro}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {(interiors.items as { title: string; desc: string; image?: string }[]).map((c, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all h-full">
                  <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/10 flex items-center justify-center">
                    {c.image ? (
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <Paintbrush size={40} className="text-accent/30" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-2">{c.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{c.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {(interiors.tags as string[]).map((s, i) => (
                <span key={i} className="px-4 py-2 bg-accent/10 text-foreground rounded-full text-sm font-label tracking-wide">
                  {s}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{additional.title}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(additional.items as IconCard[]).map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-l-4 hover:border-l-accent transition-all h-full">
                    <Icon className="text-accent mb-3" size={24} />
                    <h3 className="font-heading font-semibold mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{s.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
