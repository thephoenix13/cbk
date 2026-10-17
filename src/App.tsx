import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Approach from "./pages/Approach";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ContentProvider, useSettings } from "./content/ContentProvider";

const AdminApp = lazy(() => import("./admin/AdminApp"));

const queryClient = new QueryClient();

// Keeps the browser tab title and search description in sync with the admin's settings.
const SeoSync = () => {
  const { seo_title, seo_description } = useSettings();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      document.title = "CBK Admin";
      return;
    }
    if (seo_title) document.title = seo_title;
    if (seo_description) document.querySelector('meta[name="description"]')?.setAttribute("content", seo_description);
  }, [seo_title, seo_description, pathname]);
  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ContentProvider>
          <SeoSync />
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/approach" element={<Approach />} />
              <Route path="/work" element={<Work />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading…</div>}>
                  <AdminApp />
                </Suspense>
              }
            />
            <Route element={<PublicLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ContentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
