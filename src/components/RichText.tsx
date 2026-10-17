import DOMPurify from "dompurify";

interface RichTextProps {
  html: string;
  className?: string;
}

// Renders admin-authored rich text. Plain strings (no tags) are wrapped in a paragraph.
const RichText = ({ html, className = "" }: RichTextProps) => {
  const source = /^\s*</.test(html) ? html : `<p>${html}</p>`;
  const clean = DOMPurify.sanitize(source, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li", "h2", "h3", "h4", "blockquote"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
  return (
    <div
      className={`prose prose-lg max-w-none font-body text-muted-foreground prose-headings:font-heading prose-a:text-accent prose-strong:text-foreground ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};

export default RichText;
