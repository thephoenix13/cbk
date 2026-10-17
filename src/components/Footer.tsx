import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useSettings } from "@/content/ContentProvider";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "Our Approach", to: "/approach" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  const s = useSettings();
  const phones = (s.phones ?? []) as { name: string; number: string }[];
  const addressLines = String(s.address ?? "").split("\n");

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Logo + Tagline */}
        <div className="mb-12">
          <h3 className="font-heading text-2xl font-bold mb-2">CBK Infra Projects</h3>
          <p className="text-primary-foreground/70 font-body text-sm">{s.tagline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Quick Links */}
          <div>
            <h4 className="font-label uppercase tracking-wider text-accent text-sm mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-label uppercase tracking-wider text-accent text-sm mb-4 font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70 font-body">
              {((s.footer_services ?? []) as string[]).map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-label uppercase tracking-wider text-accent text-sm mb-4 font-semibold">Contact</h4>
            <address className="not-italic text-sm text-primary-foreground/70 space-y-3 font-body">
              <p>
                {addressLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < addressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-accent" />
                {phones.map((p) => p.number).join(" / ")}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-accent" />
                {s.email}
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary/20">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-primary-foreground/50 font-body">
          {s.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
