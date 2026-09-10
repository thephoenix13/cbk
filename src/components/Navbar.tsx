import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import cbkLogo from "@/assets/cbk-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "Our Approach", to: "/approach" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-secondary/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-20 md:h-24">
        <Link to="/" className="flex items-center">
          <img src={cbkLogo} alt="CBK Infra Projects" className="h-14 md:h-16 w-auto bg-white rounded-md px-2 py-1" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 text-sm font-label font-medium tracking-wide uppercase transition-colors ${
                location.pathname === link.to
                  ? "text-accent"
                  : "text-primary-foreground/80 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact">
            <Button className="ml-4 bg-accent text-accent-foreground hover:bg-accent/90 font-label uppercase tracking-wider text-sm">
              Get a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-primary border-t border-secondary/20 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 font-label uppercase tracking-wide text-sm ${
                location.pathname === link.to
                  ? "text-accent"
                  : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button className="w-full bg-accent text-accent-foreground font-label uppercase tracking-wider text-sm">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
