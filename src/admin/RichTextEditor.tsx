import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Underline, Heading2, Heading3, List, ListOrdered, Link2, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2, 3] }, link: { openOnClick: false } })],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[140px] px-3 py-2 focus:outline-none font-body",
      },
    },
  });

  // Follow external changes such as "Restore original".
  useEffect(() => {
    if (!editor) return;
    const current = editor.isEmpty ? "" : editor.getHTML();
    if (value !== current) editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link address (leave empty to remove the link)", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "" || url.trim() === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
    }
  };

  const tools = [
    { label: "Bold", icon: Bold, run: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { label: "Italic", icon: Italic, run: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { label: "Underline", icon: Underline, run: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive("underline") },
    { label: "Heading", icon: Heading2, run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { label: "Subheading", icon: Heading3, run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
    { label: "Bulleted list", icon: List, run: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { label: "Numbered list", icon: ListOrdered, run: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { label: "Link", icon: Link2, run: setLink, active: editor.isActive("link") },
    { label: "Undo", icon: Undo2, run: () => editor.chain().focus().undo().run(), active: false },
    { label: "Redo", icon: Redo2, run: () => editor.chain().focus().redo().run(), active: false },
  ];

  return (
    <div className="rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring">
      <div className="flex flex-wrap gap-1 border-b border-input p-1">
        {tools.map((t) => (
          <Button
            key={t.label}
            type="button"
            size="icon"
            variant={t.active ? "secondary" : "ghost"}
            className="h-8 w-8"
            title={t.label}
            aria-label={t.label}
            onClick={t.run}
          >
            <t.icon size={16} />
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
