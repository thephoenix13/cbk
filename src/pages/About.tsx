import { Award, HardHat } from "lucide-react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import RichText from "@/components/RichText";
import { getIcon } from "@/content/icons";
import { useSection } from "@/content/ContentProvider";

interface IconCard { icon: string; title: string; desc: string }

const About = () => {
  const story = useSection("about", "story");
  const values = useSection("about", "values");
  const objectives = useSection("about", "objectives");
  const team = useSection("about", "team");
  const certs = useSection("about", "certs");

  return (
    <>
      <PageHero page="about" />

      {/* Company Story */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{story.title}</h2>
              <RichText html={story.body} className="leading-relaxed [&_p+p]:mt-4" />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="aspect-[4/3] rounded-lg bg-secondary/20 border border-border overflow-hidden">
                {story.image ? (
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-accent/20 flex items-center justify-center">
                    <HardHat size={80} className="text-accent/40" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{values.title}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {(values.items as IconCard[]).map((v, i) => {
              const Icon = getIcon(v.icon);
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-accent/50 transition-all h-full">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{v.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{objectives.title}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {(objectives.items as IconCard[]).map((o, i) => {
              const Icon = getIcon(o.icon);
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-1">{o.title}</h3>
                      <p className="text-muted-foreground text-sm font-body">{o.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{team.title}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(team.items as IconCard[]).map((t, i) => {
              const Icon = getIcon(t.icon);
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all h-full">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{t.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{t.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{certs.title}</h2>
            <p className="text-center text-muted-foreground font-body mb-16 max-w-2xl mx-auto">{certs.intro}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(certs.items as { title: string; desc: string }[]).map((c, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="border-2 border-accent/30 rounded-lg p-6 text-center hover:border-accent transition-all bg-accent/5">
                  <Award className="mx-auto mb-4 text-accent" size={32} />
                  <h3 className="font-heading font-semibold text-lg mb-1">{c.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
