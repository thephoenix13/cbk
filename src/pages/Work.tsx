import { Link } from "react-router-dom";
import {
  Building2,
  Wrench,
  Layers,
  Paintbrush,
  Mountain,
  HardHat,
  Factory,
  Warehouse,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

const categories = [
  { label: "All", icon: HardHat },
  { label: "Civil Works", icon: Building2 },
  { label: "Fabrication", icon: Wrench },
  { label: "Interiors", icon: Paintbrush },
  { label: "Land Development", icon: Mountain },
];

const projects = [
  {
    title: "Industrial Shed Fabrication",
    client: "Leading Automotive OEM",
    location: "Chakan MIDC, Pune",
    category: "Fabrication",
    icon: Wrench,
    summary:
      "Design, fabrication, and erection of a large-span PEB shed engineered for heavy manufacturing operations.",
    highlights: [
      "PEB shed design and erection",
      "Structural welding and crane support",
      "On-time turnkey delivery",
    ],
  },
  {
    title: "Heavy Machinery Foundation",
    client: "Precision Equipment Manufacturer",
    location: "Bhamboli, Pune",
    category: "Civil Works",
    icon: Layers,
    summary:
      "RCC machine foundations engineered for vibration control, load distribution, and long-term operational stability.",
    highlights: [
      "Reinforced concrete foundation",
      "Chemical grouting and anchoring",
      "Precision alignment and levelling",
    ],
  },
  {
    title: "Turnkey Office Interiors",
    client: "Corporate HQ Fit-Out",
    location: "Pune",
    category: "Interiors",
    icon: Paintbrush,
    summary:
      "Complete office interior execution including workstations, partitions, false ceilings, flooring, and lighting.",
    highlights: [
      "Aluminium and glass partitions",
      "False ceiling and decorative finishes",
      "Custom workstations and cabinetry",
    ],
  },
  {
    title: "RCC Compound Wall & Site Works",
    client: "Logistics Park",
    location: "Khed Taluka, Pune",
    category: "Civil Works",
    icon: Building2,
    summary:
      "Precast compound walls, internal roads, and drainage works for a large logistics and warehousing facility.",
    highlights: [
      "Precast compound wall installation",
      "Asphalt and trimix flooring",
      "Stormwater drainage system",
    ],
  },
  {
    title: "Site Leveling & Land Development",
    client: "Industrial Plot Owner",
    location: "Chakan, Maharashtra",
    category: "Land Development",
    icon: Mountain,
    summary:
      "End-to-end site preparation including grading, soil embankment, and contour survey for an industrial plot.",
    highlights: [
      "Site leveling and grading",
      "Soil embankment and compaction",
      "Geo textile and erosion control",
    ],
  },
  {
    title: "Mezzanine Floor & MS Staircases",
    client: "Warehousing Client",
    location: "Pune",
    category: "Fabrication",
    icon: Warehouse,
    summary:
      "Steel mezzanine floors, MS staircases, and safety railings fabricated and erected for storage expansion.",
    highlights: [
      "Mezzanine floor design and erection",
      "MS/SS railings and staircases",
      "Load-tested handover",
    ],
  },
  {
    title: "Trimix Flooring – Production Bay",
    client: "F&B Manufacturer",
    location: "Pune",
    category: "Civil Works",
    icon: Factory,
    summary:
      "High-durability trimix flooring across a production bay engineered for heavy traffic and food-grade conditions.",
    highlights: [
      "Surface hardener trimix flooring",
      "Joint cutting and sealing",
      "Smooth, dust-free finish",
    ],
  },
  {
    title: "Industrial Painting & Renovation",
    client: "Existing Facility Upgrade",
    location: "Chakan MIDC, Pune",
    category: "Interiors",
    icon: Paintbrush,
    summary:
      "Structural and decorative painting across a working facility with minimal disruption to ongoing operations.",
    highlights: [
      "Structural / industrial painting",
      "Decorative emulsion finishes",
      "Phased execution around production",
    ],
  },
];

const stats = [
  { value: "10+", label: "Years Delivering" },
  { value: "150+", label: "Projects Executed" },
  { value: "50+", label: "Industrial Clients" },
  { value: "4", label: "Service Divisions" },
];

const Work = () => (
  <>
    <PageHero
      title="Our Work"
      subtitle="A selection of civil, fabrication, interior, and land development projects delivered across Maharashtra."
    />

    {/* Stats */}
    <section className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent">
                {s.value}
              </div>
              <div className="font-label uppercase tracking-wider text-xs md:text-sm mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Category strip */}
    <section className="py-12 border-b border-border">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Projects Across Every Division
          </h2>
          <p className="text-center text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-10">
            From RCC structures to turnkey interiors, every project is delivered with the same commitment to quality and timeline.
          </p>
        </ScrollReveal>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-foreground rounded-full text-sm font-label tracking-wide"
            >
              <c.icon className="text-accent" size={16} />
              {c.label}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Projects grid */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ScrollReveal key={i} delay={(i % 3) * 100}>
              <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:border-l-4 hover:border-l-accent transition-all h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/10 flex items-center justify-center">
                  <p.icon size={64} className="text-accent/40" />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-label uppercase tracking-wider bg-accent/10 text-accent">
                    {p.category}
                  </span>
                  <h3 className="font-heading font-semibold text-xl">{p.title}</h3>
                  <div className="text-sm text-muted-foreground font-body">
                    <div>
                      <span className="font-semibold text-foreground">Client:</span> {p.client}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Location:</span> {p.location}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm font-body">{p.summary}</p>
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
          ))}
        </div>
      </div>
    </section>

    {/* Capabilities recap */}
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How We Deliver Every Project
          </h2>
          <p className="text-center text-muted-foreground font-body text-lg max-w-3xl mx-auto mb-16">
            A consistent process — from first site visit to final handover — keeps quality, safety, and timelines on track.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Survey & Plan", desc: "Site visit, requirement capture, drawings, and BoQ." },
            { step: "02", title: "Design & Approve", desc: "2D/3D plans, structural design, and client sign-off." },
            { step: "03", title: "Execute", desc: "Mobilization, fabrication, civil, and interior execution." },
            { step: "04", title: "Handover", desc: "Quality checks, snag closure, and on-time handover." },
          ].map((p, i) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-accent-foreground/80 mb-8 text-lg font-body max-w-xl mx-auto">
            Tell us about your site and requirements — we'll put together a plan and a quote.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all font-label uppercase tracking-wider text-base px-10"
            >
              Start a Project
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  </>
);

export default Work;
