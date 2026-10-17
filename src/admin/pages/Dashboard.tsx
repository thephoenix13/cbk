import { Link } from "react-router-dom";
import { Briefcase, FileText, Images, Settings, Users } from "lucide-react";
import { PAGES } from "@/content/sections";

const cards = [
  { to: "/admin/settings", icon: Settings, title: "Site settings", text: "Logo, phone numbers, address, email, footer and search text." },
  { to: "/admin/projects", icon: Briefcase, title: "Projects", text: "Add, edit, reorder or hide the projects on the Our Work page." },
  { to: "/admin/clients", icon: Users, title: "Clients", text: "Manage the client logos shown on the home page." },
  { to: "/admin/media", icon: Images, title: "Media library", text: "Upload and manage pictures used on the website." },
];

const Dashboard = () => (
  <div className="max-w-4xl">
    <h1 className="mb-1 font-heading text-3xl font-bold">Welcome</h1>
    <p className="mb-8 text-muted-foreground">Choose what you would like to update. Changes go live as soon as you press Save.</p>
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((c) => (
        <Link key={c.to} to={c.to} className="rounded-lg border bg-card p-5 transition-shadow hover:shadow-md">
          <c.icon className="mb-3 text-accent" size={24} />
          <h2 className="font-heading text-lg font-semibold">{c.title}</h2>
          <p className="text-sm text-muted-foreground">{c.text}</p>
        </Link>
      ))}
    </div>
    <h2 className="mb-3 mt-10 font-heading text-xl font-semibold">Page content</h2>
    <div className="flex flex-wrap gap-2">
      {PAGES.map((p) => (
        <Link key={p.id} to={`/admin/pages/${p.id}`} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm hover:border-accent">
          <FileText size={14} className="text-accent" /> {p.label}
        </Link>
      ))}
    </div>
  </div>
);

export default Dashboard;
