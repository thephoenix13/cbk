import { Star, Handshake, Lightbulb, Leaf, User, HardHat, ClipboardList, Hammer, Monitor, Shield, Award } from "lucide-react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => (
  <>
    <PageHero title="About CBK Infra Projects" subtitle="A decade of engineering excellence from Chakan, Maharashtra" />

    {/* Company Story */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed font-body text-lg">
              CBK Infra Projects was founded in September 2014 in Chakan, Maharashtra, with a vision to redefine how industrial and commercial spaces are built. Over the past decade, we have grown from a focused civil engineering firm into a comprehensive multi-disciplinary company offering civil works, fabrication, interior design, land development, electrical, plumbing, and turnkey solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body text-lg mt-4">
              We operate with our own fleet of heavy equipment and a skilled team of engineers, planners, and technicians — enabling us to take on projects of any scale with confidence and precision.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="aspect-[4/3] rounded-lg bg-secondary/20 border border-border overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-accent/20 flex items-center justify-center">
                <HardHat size={80} className="text-accent/40" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Core Values</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { icon: Star, title: "Quality", desc: "We commit to the highest standards in every single project." },
            { icon: Handshake, title: "Integrity", desc: "We build relationships through transparency and reliability." },
            { icon: Lightbulb, title: "Innovation", desc: "We embrace cutting-edge technology and smart engineering." },
            { icon: Leaf, title: "Sustainability", desc: "We incorporate eco-friendly practices and materials." },
            { icon: User, title: "Client-Centricity", desc: "We design solutions around the needs and vision of our clients." },
          ].map((v, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-accent/50 transition-all h-full">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-accent" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Objectives */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Objectives</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Shield, title: "Quality Excellence", desc: "Deliver projects meeting the highest standards of construction quality, safety, and durability." },
            { icon: User, title: "Client Focus", desc: "Understand and fulfill client needs with customized solutions aligned with their vision." },
            { icon: Leaf, title: "Sustainability", desc: "Incorporate environmentally responsible practices to minimize ecological impact." },
            { icon: Lightbulb, title: "Innovation", desc: "Leverage the latest technologies to enhance efficiency, accuracy, and project outcomes." },
          ].map((o, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <o.icon className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">{o.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{o.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Team</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: HardHat, title: "Civil & Structural Engineers", desc: "Qualified engineers with expertise in designing and executing complex structural projects." },
            { icon: ClipboardList, title: "Project Managers & Supervisors", desc: "Experienced professionals ensuring timely delivery and quality control." },
            { icon: Hammer, title: "Skilled Labor & Technicians", desc: "Well-trained workforce with specialized skills across construction disciplines." },
            { icon: Monitor, title: "CAD Designers & Planners", desc: "Creative professionals translating client visions into detailed technical plans." },
          ].map((t, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all h-full">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <t.icon className="text-accent" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{t.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{t.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Certifications */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Compliance & Certifications</h2>
          <p className="text-center text-muted-foreground font-body mb-16 max-w-2xl mx-auto">
            CBK Infra Projects complies with all statutory regulations and industry standards.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "ISO 9001:2015", desc: "Quality Management" },
            { title: "ISO 45001:2018", desc: "Occupational Health and Safety" },
            { title: "GST Registered", desc: "GST: 27BHWPT3693L1Z3" },
            { title: "MSME Certified", desc: "Recognized small and medium enterprise" },
          ].map((c, i) => (
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

export default About;
