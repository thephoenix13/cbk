import { ClipboardList, Play, BarChart3, CheckCircle, Truck, HardHat, Factory, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";

const Approach = () => (
  <>
    <PageHero title="Our Project Management Approach" subtitle="Structured. Transparent. Delivered on time." />

    {/* Overview */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-4xl mx-auto text-center">
            CBK Infra Projects adopts a meticulous and structured approach to project management. Each project is managed from inception to completion by a dedicated team of engineers, planners, and site supervisors to ensure timelines, budget control, safety, and quality standards are consistently met.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* 4-Step Process */}
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Process</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ClipboardList, step: "01", title: "Planning", desc: "Project scope and requirements analysis" },
            { icon: Play, step: "02", title: "Execution", desc: "Systematic implementation with quality control" },
            { icon: BarChart3, step: "03", title: "Monitoring", desc: "Continuous progress tracking and reporting" },
            { icon: CheckCircle, step: "04", title: "Completion", desc: "Final quality assurance and handover" },
          ].map((p, i) => (
            <ScrollReveal key={i} delay={i * 200}>
              <div className="relative bg-card border border-border rounded-lg p-8 text-center hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <p.icon className="text-accent" size={28} />
                </div>
                <span className="font-label text-accent/50 text-sm uppercase tracking-widest">Step {p.step}</span>
                <h3 className="font-heading font-semibold text-xl mt-2 mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{p.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Equipment & Resources */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Equipment & Resources</h2>
          <p className="text-center text-muted-foreground font-body max-w-3xl mx-auto mb-16 text-lg">
            We operate a full fleet of in-house heavy equipment, enabling rapid deployment, cost efficiency, and total control over execution timelines.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Excavators", desc: "High-capacity excavators for efficient earthwork operations" },
            { icon: HardHat, title: "Dozers", desc: "Powerful dozers for site leveling and grading" },
            { icon: Factory, title: "Batching Plants", desc: "Modern batching plants for quality concrete production" },
            { icon: Wrench, title: "Welding & Fabrication Machinery", desc: "Advanced equipment for precision metal fabrication" },
          ].map((e, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all h-full">
                <div className="h-40 bg-gradient-to-br from-secondary/20 to-accent/10 flex items-center justify-center">
                  <e.icon size={48} className="text-accent/30" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">{e.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{e.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Approach;
