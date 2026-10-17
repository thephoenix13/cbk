import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import RichText from "@/components/RichText";
import { getIcon } from "@/content/icons";
import { useSection } from "@/content/ContentProvider";

interface Step { icon: string; step: string; title: string; desc: string }
interface Item { icon: string; title: string; desc: string; image?: string }

const Approach = () => {
  const overview = useSection("approach", "overview");
  const process = useSection("approach", "process");
  const equipment = useSection("approach", "equipment");

  return (
    <>
      <PageHero page="approach" />

      {/* Overview */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <RichText html={overview.text} className="md:prose-xl leading-relaxed mx-auto text-center" />
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{process.title}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(process.items as Step[]).map((p, i, all) => {
              const Icon = getIcon(p.icon);
              return (
                <ScrollReveal key={i} delay={i * 200}>
                  <div className="relative bg-card border border-border rounded-lg p-8 text-center hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon className="text-accent" size={28} />
                    </div>
                    <span className="font-label text-accent/50 text-sm uppercase tracking-widest">
                      {process.step_label} {p.step}
                    </span>
                    <h3 className="font-heading font-semibold text-xl mt-2 mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{p.desc}</p>
                    {i < all.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30" />
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment & Resources */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{equipment.title}</h2>
            <p className="text-center text-muted-foreground font-body max-w-3xl mx-auto mb-16 text-lg">{equipment.intro}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(equipment.items as Item[]).map((e, i) => {
              const Icon = getIcon(e.icon);
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all h-full">
                    <div className="h-40 bg-gradient-to-br from-secondary/20 to-accent/10 flex items-center justify-center">
                      {e.image ? (
                        <img src={e.image} alt={e.title} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <Icon size={48} className="text-accent/30" />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading font-semibold text-lg mb-2">{e.title}</h3>
                      <p className="text-muted-foreground text-sm font-body">{e.desc}</p>
                    </div>
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

export default Approach;
