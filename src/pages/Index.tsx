import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import RichText from "@/components/RichText";
import heroImg from "@/assets/hero-construction.jpg";
import { getIcon } from "@/content/icons";
import { defaultClients, useClients, useSection } from "@/content/ContentProvider";

interface IconCard { icon: string; title: string; desc: string }

// A few logos are visually small, so they get a taller limit.
const logoSize: Record<string, string> = {
  "Ultra Corpotech": "max-h-32 max-w-full object-contain",
  Acegroup: "max-h-36 max-w-full object-contain",
};

const Index = () => {
  const hero = useSection("home", "hero");
  const stats = useSection("home", "stats");
  const who = useSection("home", "who");
  const services = useSection("home", "services");
  const mission = useSection("home", "mission");
  const clientele = useSection("home", "clientele");
  const industries = useSection("home", "industries");
  const cta = useSection("home", "cta");
  const clientsQuery = useClients();
  const clients = clientsQuery.data ?? (clientsQuery.isError || !clientsQuery.isFetching ? defaultClients() : []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={hero.image || heroImg}
          alt="Steel structure construction site"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 font-heading animate-fade-up">
            {hero.title}
            <br />
            <span className="text-accent">{hero.highlight}</span>
          </h1>
          <p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-10 font-body opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {hero.subtitle}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/services">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all font-label uppercase tracking-wider text-base px-8"
              >
                {hero.cta_primary}
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 font-label uppercase tracking-wider text-base px-8"
              >
                {hero.cta_secondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary text-secondary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-label uppercase tracking-wider text-sm">
            {(stats.items as string[]).map((s, i) => (
              <div key={i} className="py-2">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{who.title}</h2>
              <RichText html={who.body} className="leading-relaxed" />
            </ScrollReveal>
            <div className="grid gap-6">
              {(who.cards as IconCard[]).map((card, i) => {
                const Icon = getIcon(card.icon);
                return (
                  <ScrollReveal key={i} delay={i * 150}>
                    <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg hover:border-accent/50 transition-all group">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                        <Icon className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg mb-1">{card.title}</h3>
                        <p className="text-muted-foreground text-sm font-body">{card.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{services.title}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(services.items as IconCard[]).map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-card border border-border rounded-lg p-8 hover:shadow-xl hover:border-l-4 hover:border-l-accent transition-all group h-full">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <Icon className="text-accent" size={28} />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3">{s.title}</h3>
                    <p className="text-muted-foreground text-sm font-body mb-4">{s.desc}</p>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1 text-accent text-sm font-label uppercase tracking-wider hover:gap-2 transition-all"
                    >
                      {services.link_text} <ArrowRight size={14} />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{mission.title}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {(mission.items as IconCard[]).map((m, i) => {
              const Icon = getIcon(m.icon);
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="text-center p-8 rounded-lg bg-card border border-border hover:shadow-lg transition-all">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="text-accent" size={28} />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3">{m.title}</h3>
                    <p className="text-muted-foreground font-body text-sm">{m.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal>
            <blockquote className="max-w-3xl mx-auto text-muted-foreground italic font-body text-lg border-l-4 border-accent pl-6 text-left">
              "{mission.quote}"
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Clientele */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{clientele.title}</h2>
            <p className="text-center text-muted-foreground font-body text-lg mb-16 max-w-2xl mx-auto">
              {clientele.subtitle}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, i) => (
              <ScrollReveal key={client.id} delay={i * 60}>
                <div className="bg-white border border-border rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all h-40">
                  <img
                    src={client.logo_url}
                    alt={`${client.name} logo`}
                    className={logoSize[client.name] || "max-h-24 max-w-full object-contain"}
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{industries.title}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {(industries.items as { icon: string; label: string }[]).map((ind, i) => {
              const Icon = getIcon(ind.icon);
              return (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="bg-secondary/30 border border-secondary/40 rounded-lg p-6 text-center hover:bg-secondary/50 transition-all">
                    <Icon className="mx-auto mb-4 text-accent" size={32} />
                    <p className="font-label uppercase tracking-wider text-sm">{ind.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
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
    </>
  );
};

export default Index;
