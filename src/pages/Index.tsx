import { Link } from "react-router-dom";
import {
  Building2,
  Wrench,
  Paintbrush,
  Mountain,
  Car,
  Package,
  UtensilsCrossed,
  Pill,
  Building,
  ArrowRight,
  Star,
  Lightbulb,
  Handshake,
} from "lucide-react";

import sanyLogo from "@/assets/clients/sany.png";
import ultraCorpotechLogo from "@/assets/clients/ultra-corpotech.png";
import packTimeLogo from "@/assets/clients/pack-time.png";
import kingfaLogo from "@/assets/clients/kingfa.png";
import acegroupLogo from "@/assets/clients/acegroup.png";
import liebherrLogo from "@/assets/clients/liebherr1.jpg";
import fafecoLogo from "@/assets/clients/fafeco.png";
import sgsLogo from "@/assets/clients/sgs.png";
import coldstarLogo from "@/assets/clients/coldstar.png";
import hufLogo from "@/assets/clients/huf.png";
import cotswoldLogo from "@/assets/clients/cotswold.png";
import kalaDefenceLogo from "@/assets/clients/kala-defence.jpeg";
import montanriLiftsLogo from "@/assets/clients/montanri-lifts.png";
import ecoprocessLogo from "@/assets/clients/ecoprocess.jpeg";
import mskhSeatingLogo from "@/assets/clients/mskh-seating.jpeg";
import kalorisLogo from "@/assets/clients/kaloris-smart-healing.jpeg";
import mahindraNewLogo from "@/assets/clients/mahindra-new.jpg";
import sujanContitech from "@/assets/clients/sujan-contitech.svg";
import synergyInfratechLogo from "@/assets/clients/synergy-infratech.jpeg";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import heroImg from "@/assets/hero-construction.jpg";

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Steel structure construction site"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 font-heading animate-fade-up">
            CBK INFRA PROJECTS
            <br />
            <span className="text-accent">Committed To Superior Quality</span>
          </h1>
          <p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-10 font-body opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Engineering excellence since 2014. Building industrial and commercial spaces across Maharashtra.
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
                Explore Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 font-label uppercase tracking-wider text-base px-8"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary text-secondary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-label uppercase tracking-wider text-sm">
            {["Est. 2014", "10+ Years Experience", "4 Service Divisions", "Chakan, Pune"].map((s, i) => (
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed font-body text-lg">
                CBK Infra Projects is a Chakan-based engineering firm founded in September 2014. We specialize in civil
                engineering, fabrication, and interior design — delivering comprehensive design, development, and
                execution services across various industries with the highest standards of quality, efficiency, and
                safety.
              </p>
            </ScrollReveal>
            <div className="grid gap-6">
              {[
                {
                  icon: Building2,
                  title: "Established Excellence",
                  desc: "Founded in September 2014, grown into a comprehensive civil engineering firm in Chakan, Maharashtra.",
                },
                {
                  icon: Wrench,
                  title: "Comprehensive Services",
                  desc: "Specializing in civil work, PEB structure and shed work, heavy machinery foundations, RCC structural work, trimix flooring and interior design work.",
                },
                {
                  icon: Package,
                  title: "Well-Equipped",
                  desc: "Operating with own machinery and heavy earth-moving equipment, mobilizing resources for projects of any size.",
                },
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:shadow-lg hover:border-accent/50 transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <card.icon className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-1">{card.title}</h3>
                      <p className="text-muted-foreground text-sm font-body">{card.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Core Services</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "Civil Works",
                desc: "Structural design, RCC, site development, flooring, building construction",
              },
              {
                icon: Wrench,
                title: "Fabrication",
                desc: "Steel fabrication, PEB sheds, metalwork, precision welding",
              },
              {
                icon: Paintbrush,
                title: "Interior Design",
                desc: "Turnkey interiors, false ceilings, custom furniture, office spaces",
              },
              {
                icon: Mountain,
                title: "Land Development",
                desc: "Site leveling, soil embankment, geo textile, contour surveys",
              },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card border border-border rounded-lg p-8 hover:shadow-xl hover:border-l-4 hover:border-l-accent transition-all group h-full">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <s.icon className="text-accent" size={28} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm font-body mb-4">{s.desc}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 text-accent text-sm font-label uppercase tracking-wider hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Mission & Vision</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Star,
                title: "Industry Leadership",
                desc: "Becoming a leading provider of innovative engineering solutions",
              },
              {
                icon: Lightbulb,
                title: "Transformative Spaces",
                desc: "Enhancing functionality, safety, and aesthetics of industrial spaces",
              },
              {
                icon: Handshake,
                title: "Lasting Relationships",
                desc: "Building long-term partnerships through excellence and trust",
              },
            ].map((m, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center p-8 rounded-lg bg-card border border-border hover:shadow-lg transition-all">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <m.icon className="text-accent" size={28} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3">{m.title}</h3>
                  <p className="text-muted-foreground font-body text-sm">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <blockquote className="max-w-3xl mx-auto text-center text-muted-foreground italic font-body text-lg border-l-4 border-accent pl-6 text-left">
              "We aim to transform industrial spaces by delivering high-quality, efficient, and customized services
              through cutting-edge technology, skilled craftsmanship, and a commitment to excellence."
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Clientele */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Our Clientele</h2>
            <p className="text-center text-muted-foreground font-body text-lg mb-16 max-w-2xl mx-auto">
              Trusted by leading companies across industries
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { logo: sanyLogo, name: "SANY" },
              { logo: liebherrLogo, name: "Liebherr" },
              { logo: kingfaLogo, name: "Kingfa" },
              { logo: montanriLiftsLogo, name: "Montanri Lifts" },
              { logo: ultraCorpotechLogo, name: "Ultra Corpotech", imgClassName: "max-h-32 max-w-full object-contain" },
              { logo: acegroupLogo, name: "Acegroup", imgClassName: "max-h-36 max-w-full object-contain" },
              { logo: packTimeLogo, name: "Pack Time" },
              { logo: ecoprocessLogo, name: "Ecoprocess" },
              { logo: fafecoLogo, name: "Fafeco" },
              { logo: sgsLogo, name: "SGS" },
              { logo: kalaDefenceLogo, name: "Kala Defence" },
              { logo: mskhSeatingLogo, name: "MSKH Seating" },
              { logo: kalorisLogo, name: "Kaloris Smart Healing" },
              { logo: mahindraNewLogo, name: "Mahindra & Mahindra" },
              { logo: sujanContitech, name: "Sujan Contitech" },
              { logo: synergyInfratechLogo, name: "Synergy Infratech Power Systems" },
              { logo: cotswoldLogo, name: "Cotswold" },
              { logo: hufLogo, name: "Huf" },
              { logo: coldstarLogo, name: "ColdStar" },
            ].map((client, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="bg-white border border-border rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all h-40">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className={client.imgClassName || "max-h-24 max-w-full object-contain"}
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Industries We Serve</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Car, label: "Automotive Manufacturing" },
              { icon: Package, label: "Warehousing & Logistics" },
              { icon: UtensilsCrossed, label: "Food & Beverage" },
              { icon: Pill, label: "Pharmaceuticals" },
              { icon: Building, label: "Commercial & Corporate" },
            ].map((ind, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-secondary/30 border border-secondary/40 rounded-lg p-6 text-center hover:bg-secondary/50 transition-all">
                  <ind.icon className="mx-auto mb-4 text-accent" size={32} />
                  <p className="font-label uppercase tracking-wider text-sm">{ind.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
              Ready to Build Something Exceptional?
            </h2>
            <p className="text-accent-foreground/80 mb-8 text-lg font-body max-w-xl mx-auto">
              Get in touch with our team today for a free project consultation.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all font-label uppercase tracking-wider text-base px-10"
              >
                Contact Us Today
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Index;
