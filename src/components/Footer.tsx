import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      {/* Logo + Tagline */}
      <div className="mb-12">
        <h3 className="font-heading text-2xl font-bold mb-2">CBK Infra Projects</h3>
        <p className="text-primary-foreground/70 font-body text-sm">
          Civil Interior Fabrication — Committed To Superior Quality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Quick Links */}
        <div>
          <h4 className="font-label uppercase tracking-wider text-accent text-sm mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: "Home", to: "/" },
              { label: "About", to: "/about" },
              { label: "Services", to: "/services" },
              { label: "Our Work", to: "/work" },
              { label: "Our Approach", to: "/approach" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
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
            <li>Civil Works</li>
            <li>Fabrication</li>
            <li>Interior Design</li>
            <li>Land Development</li>
            <li>Turnkey Solutions</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-label uppercase tracking-wider text-accent text-sm mb-4 font-semibold">Contact</h4>
          <address className="not-italic text-sm text-primary-foreground/70 space-y-3 font-body">
            <p>
              Gat No. 226/2, Ground Floor, Shop No. 12,<br />
              Vrindavan Complex, Chakan MIDC Phase-2,<br />
              Near Surin Automotive, Bhamboli,<br />
              Taluka - Khed, Dist - Pune 410501,<br />
              Maharashtra, India
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-accent" />
              +91 74107 47284 / +91 90113 93839
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-accent" />
              info@cbkinfraprojects.com
            </p>
          </address>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-secondary/20">
      <div className="container mx-auto px-4 py-4 text-center text-xs text-primary-foreground/50 font-body">
        © 2025 CBK Infra Projects. All Rights Reserved. | GST: 27BHWPT3693L1Z3 | Est. 2014
      </div>
    </div>
  </footer>
);

export default Footer;
