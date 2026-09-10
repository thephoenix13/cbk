import { Building2, Wrench, Compass, MapPin, Layers, PenTool, Paintbrush, Droplets, Zap, Key, Settings, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";

const Services = () => (
  <>
    <PageHero title="Our Services" subtitle="Comprehensive engineering solutions under one roof" />

    {/* Civil Works */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-secondary/20 to-accent/10 border border-border flex items-center justify-center">
              <Building2 size={80} className="text-accent/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Civil Works</h2>
            <p className="text-muted-foreground font-body text-lg mb-6">
              From office and industrial building construction to RCC structural works and specialized flooring, our civil division handles every aspect of construction with precision and durability.
            </p>
            <ul className="space-y-3">
              {[
                "Office and industrial building construction",
                "RCC structural works",
                "Retaining and compound walls",
                "STP, ETP, WTP tank construction",
                "Asphalt, bitumen, and trimix flooring",
                "Precast compound walls, curbstones, road dividers",
              ].map((s, i) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Structure & Machinery Foundations</h2>
            <p className="text-muted-foreground font-body text-lg mb-8">
              Specialized foundations engineered for heavy industrial machinery, ensuring stability, precision, and long-term performance.
            </p>
            <div className="grid gap-4">
              {[
                { title: "Machine Foundation", desc: "Specialized heavy machinery foundations engineered for stability, precision, and long-term performance." },
                { title: "Chemical Grouting & Epoxy Flooring", desc: "Chemical grouting and epoxy flooring solutions to ensure durability and protection against environmental factors." },
                { title: "Waterproofing & Shuttering", desc: "Waterproofing and shuttering works for industrial applications requiring durability and precision." },
              ].map((c, i) => (
                <div key={i} className="p-5 bg-card border border-border rounded-lg hover:shadow-md hover:border-l-4 hover:border-l-accent transition-all">
                  <h3 className="font-heading font-semibold mb-1">{c.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{c.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} className="order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-secondary/20 to-accent/10 border border-border flex items-center justify-center">
              <Layers size={80} className="text-accent/30" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* PEB & Shed Fabrication */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">PEB & Conventional Shed Construction</h2>
          <p className="text-center text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-16">
            Our fabrication division delivers high-quality, customized solutions including shed fabrication, conventional shed work, industrial shed work, railings, platforms, mezzanine floors, and staircases.
          </p>
        </ScrollReveal>

        {/* Process Flow */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { step: "01", title: "Design", desc: "Custom steel structure design" },
            { step: "02", title: "Fabrication", desc: "Precision metalwork and welding" },
            { step: "03", title: "Erection", desc: "Professional installation services" },
            { step: "04", title: "Completion", desc: "Quality assurance and handover" },
          ].map((p, i) => (
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
            <h3 className="font-heading font-semibold text-lg mb-4">Additional Fabrication Services</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {["PEB shed fabrication and erection", "Industrial shed construction", "MS/SS railings and staircases", "Platforms, mezzanine flooring", "Structural welding"].map((s, i) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Land Development Services</h2>
          <p className="text-center text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-16">
            Comprehensive land preparation services that lay the groundwork for successful construction projects.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: "Site Leveling & Grading", desc: "Professional site leveling and grading services to prepare land for construction projects." },
            { icon: Building2, title: "Soil Embankment", desc: "Professional soil management and embankment construction for stable foundations and proper drainage." },
            { icon: Compass, title: "Contour & Geo Textile Survey", desc: "Comprehensive contour surveys and geo textile solutions for soil stabilization and erosion control." },
          ].map((l, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-l-4 hover:border-l-accent transition-all h-full">
                <l.icon className="text-accent mb-4" size={28} />
                <h3 className="font-heading font-semibold text-lg mb-2">{l.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{l.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Interior Design */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Interior Design Excellence</h2>
          <p className="text-center text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-16">
            Transforming industrial and commercial spaces with thoughtful, functional, and aesthetic interior solutions.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { title: "Office Interiors", desc: "Complete office design and execution including workstations, partitions, and storage solutions." },
            { title: "Custom Solutions", desc: "Bespoke furniture, cabinetry, and fixtures tailored to specific requirements and aesthetics." },
            { title: "Renovation Services", desc: "Reimagining and upgrading existing spaces with modern design elements and functional improvements." },
          ].map((c, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all h-full">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/10 flex items-center justify-center">
                  <Paintbrush size={40} className="text-accent/30" />
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
            {["Turnkey office interiors", "False ceilings, tiling", "Aluminum and glass partitions", "Custom furniture and workstations", "Renovation and remodeling"].map((s, i) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Additional Services</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Paintbrush, title: "Painting Services", desc: "Structural/industrial painting, decorative and emulsion finishes" },
            { icon: PenTool, title: "Designing & Planning", desc: "2D & 3D architectural planning, RCC and PEB structure planning, interior layout consultancy" },
            { icon: Droplets, title: "Sanitary & Plumbing", desc: "Sewage/stormwater pipeline, complete plumbing systems (UPVC, CPVC, GI, MS, SS), washroom renovation and RCC chambers" },
            { icon: Zap, title: "Electrical Works", desc: "Industrial and commercial electrical installations, lighting, cabling, load management" },
            { icon: Key, title: "Turnkey Solutions", desc: "Lock and key project delivery for civil, fabrication, and interiors; fast-track execution" },
            { icon: Settings, title: "Maintenance Services", desc: "Civil structure repairs, interior and fabrication maintenance, plumbing and electrical support" },
          ].map((s, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-l-4 hover:border-l-accent transition-all h-full">
                <s.icon className="text-accent mb-3" size={24} />
                <h3 className="font-heading font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Services;
