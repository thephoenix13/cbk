import { useState } from "react";
import { MapPin, Phone, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { useSection, useSettings } from "@/content/ContentProvider";
import { enquiryMailto, sendEnquiry, type Enquiry } from "@/lib/enquiry";

const empty: Enquiry = { name: "", company: "", phone: "", email: "", service: "", message: "", website: "" };
const waNumber = (n: string) => n.replace(/\D/g, "");

const Contact = () => {
  const settings = useSettings();
  const form = useSection("contact", "form");
  const map = useSection("contact", "map");
  const [values, setValues] = useState<Enquiry>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");

  const phones = (settings.phones ?? []) as { name: string; number: string }[];
  const addressLines = String(settings.address ?? "").split("\n");
  const set = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.website) return setStatus("sent"); // bot: pretend success, send nothing
    setStatus("sending");
    setStatus(await sendEnquiry(values));
  };

  return (
    <>
      <PageHero page="contact" />

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
                      {addressLines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < addressLines.length - 1 && <br />}
                        </span>
                      ))}
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
                      {phones.map((p, i) => (
                        <span key={i}>
                          {p.name} — <a href={`tel:+${waNumber(p.number)}`} className="text-accent hover:underline">{p.number}</a>
                          {i < phones.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {phones.map((p, i) => (
                        <a key={i} href={`https://wa.me/${waNumber(p.number)}`} target="_blank" rel="noopener noreferrer" className="text-xs font-label uppercase tracking-wider text-accent hover:underline">
                          WhatsApp {p.name.replace(/^Mr\.?\s*|^Ms\.?\s*|^Mrs\.?\s*/i, "").split(" ")[0]}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">Email</h3>
                    <a href={`mailto:${settings.email}`} className="text-accent hover:underline text-sm font-body">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">GST No.</h3>
                    <p className="text-muted-foreground text-sm font-body">{settings.gst}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={200}>
              {status === "sent" ? (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-12 text-center">
                  <h3 className="font-heading text-2xl font-bold mb-4 text-accent">{form.success_title}</h3>
                  <p className="text-muted-foreground font-body">{form.success_text}</p>
                </div>
              ) : status === "fallback" ? (
                <div className="bg-card border border-border rounded-lg p-10 text-center space-y-4">
                  <h3 className="font-heading text-xl font-semibold">One more step</h3>
                  <p className="text-muted-foreground font-body text-sm">
                    We couldn't send your enquiry automatically. Please press the button to send it from your email app,
                    or write to us at {settings.email}.
                  </p>
                  <a href={enquiryMailto(String(settings.email), values)}>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-label uppercase tracking-wider">
                      Send by email
                    </Button>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-5">
                  <h3 className="font-heading text-xl font-semibold mb-2">{form.title}</h3>
                  <Input placeholder="Full Name" required value={values.name} onChange={set("name")} className="font-body" />
                  <Input placeholder="Company Name" value={values.company} onChange={set("company")} className="font-body" />
                  <Input placeholder="Phone Number" type="tel" required value={values.phone} onChange={set("phone")} className="font-body" />
                  <Input placeholder="Email Address" type="email" required value={values.email} onChange={set("email")} className="font-body" />
                  <Select required value={values.service || undefined} onValueChange={(v) => setValues((x) => ({ ...x, service: v }))}>
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Service Required" />
                    </SelectTrigger>
                    <SelectContent>
                      {(form.services as string[]).map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Project Description" rows={4} value={values.message} onChange={set("message")} className="font-body" />
                  {/* Honeypot field: hidden from people, filled in by bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={values.website}
                    onChange={set("website")}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-label uppercase tracking-wider hover:scale-[1.02] transition-all"
                  >
                    {status === "sending" ? "Sending…" : "Send Enquiry"}
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
                src={map.embed_url}
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
