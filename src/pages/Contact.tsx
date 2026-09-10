import { useState } from "react";
import { MapPin, Phone, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero title="Contact Us" subtitle="Let's discuss your next project" />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <ScrollReveal>
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground text-sm font-body">
                      Gat No. 226/2, Ground Floor, Shop No. 12,<br />
                      Vrindavan Complex, Chakan MIDC Phase-2,<br />
                      Near Surin Automotive, Bhamboli,<br />
                      Taluka - Khed, Dist - Pune 410501,<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground text-sm font-body">
                      Mr. Omkar Gurav — <a href="tel:+917410747284" className="text-accent hover:underline">+91 74107 47284</a><br />
                      Mr. Virendra Gholap — <a href="tel:+919011393839" className="text-accent hover:underline">+91 90113 93839</a>
                    </p>
                    <div className="flex gap-3 mt-2">
                      <a href="https://wa.me/917410747284" target="_blank" rel="noopener noreferrer" className="text-xs font-label uppercase tracking-wider text-accent hover:underline">
                        WhatsApp Omkar
                      </a>
                      <a href="https://wa.me/919011393839" target="_blank" rel="noopener noreferrer" className="text-xs font-label uppercase tracking-wider text-accent hover:underline">
                        WhatsApp Virendra
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Email</h3>
                    <a href="mailto:info@cbkinfraprojects.com" className="text-accent hover:underline text-sm font-body">
                      info@cbkinfraprojects.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">GST No.</h3>
                    <p className="text-muted-foreground text-sm font-body">27BHWPT3693L1Z3</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={200}>
              {submitted ? (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-12 text-center">
                  <h3 className="font-heading text-2xl font-bold mb-4 text-accent">Thank You!</h3>
                  <p className="text-muted-foreground font-body">
                    Our team will reach out to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-5">
                  <h3 className="font-heading text-xl font-semibold mb-2">Send an Enquiry</h3>
                  <Input placeholder="Full Name" required className="font-body" />
                  <Input placeholder="Company Name" className="font-body" />
                  <Input placeholder="Phone Number" type="tel" required className="font-body" />
                  <Input placeholder="Email Address" type="email" required className="font-body" />
                  <Select required>
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Service Required" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Civil Works", "Fabrication", "Interior Design", "Land Development", "Turnkey Solution", "Other"].map((s) => (
                        <SelectItem key={s} value={s.toLowerCase().replace(/ /g, "-")}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Project Description" rows={4} className="font-body" />
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-label uppercase tracking-wider hover:scale-[1.02] transition-all">
                    Send Enquiry
                  </Button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="rounded-lg overflow-hidden border border-border h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30236.69!2d73.86!3d18.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b70c10d3e36f%3A0x506f5b98b0c3e7e4!2sChakan%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CBK Infra Projects Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
