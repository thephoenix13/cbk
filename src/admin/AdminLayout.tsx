import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Building2, ExternalLink, FileText, Images, LayoutDashboard, LogOut, Settings, Users, Briefcase, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/content/sections";
import { useAuth } from "./AuthProvider";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-accent text-accent-foreground" : "text-primary-foreground/80 hover:bg-primary-foreground/10"
  }`;

const AdminLayout = () => {
  const { session, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-8 text-center">
        <h1 className="mb-2 text-xl font-semibold">No admin access</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          You are signed in as {session.user.email}, but this account is not set up as an administrator.
        </p>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30 md:flex-row">
      <aside className="shrink-0 bg-primary p-4 text-primary-foreground md:min-h-screen md:w-64">
        <div className="mb-6 flex items-center gap-2 px-2 font-heading text-lg font-bold">
          <Building2 size={20} className="text-accent" /> CBK Admin
        </div>
        <nav className="flex flex-wrap gap-1 md:flex-col">
          <NavLink to="/admin" end className={linkClass}><LayoutDashboard size={16} /> Dashboard</NavLink>
          <NavLink to="/admin/settings" className={linkClass}><Settings size={16} /> Site settings</NavLink>
          <p className="mt-3 hidden px-3 text-xs uppercase tracking-wider text-primary-foreground/50 md:block">Pages</p>
          {PAGES.map((p) => (
            <NavLink key={p.id} to={`/admin/pages/${p.id}`} className={linkClass}><FileText size={16} /> {p.label}</NavLink>
          ))}
          <p className="mt-3 hidden px-3 text-xs uppercase tracking-wider text-primary-foreground/50 md:block">Collections</p>
          <NavLink to="/admin/projects" className={linkClass}><Briefcase size={16} /> Projects</NavLink>
          <NavLink to="/admin/clients" className={linkClass}><Users size={16} /> Clients</NavLink>
          <NavLink to="/admin/media" className={linkClass}><Images size={16} /> Media library</NavLink>
        </nav>
        <div className="mt-6 space-y-1 border-t border-primary-foreground/10 pt-4">
          <NavLink to="/admin/guide" className={linkClass}><LifeBuoy size={16} /> Help &amp; guide</NavLink>
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 text-sm text-primary-foreground/80 hover:text-accent">
            <ExternalLink size={16} /> View website
          </a>
          <button onClick={signOut} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-primary-foreground/80 hover:text-accent">
            <LogOut size={16} /> Sign out
          </button>
          <p className="truncate px-3 pt-2 text-xs text-primary-foreground/40">{session.user.email}</p>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
