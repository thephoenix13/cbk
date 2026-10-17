import ScrollReveal from "./ScrollReveal";
import { useSection } from "@/content/ContentProvider";

interface PageHeroProps {
  page: string;
}

// Title and subtitle come from the admin-editable "hero" block of each page.
const PageHero = ({ page }: PageHeroProps) => {
  const { title, subtitle } = useSection(page, "hero");
  return (
    <section className="relative bg-primary py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-90" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            {subtitle}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PageHero;
