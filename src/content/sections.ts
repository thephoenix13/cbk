// Single source of truth for editable content.
// - `fields` drive the admin editor forms.
// - `defaults` are the public fallback AND the seed for the database.
// Images are never listed in defaults: an empty image means "use the bundled picture".

export type Field =
  | { type: "text" | "textarea" | "richtext" | "image" | "icon"; name: string; label: string; hint?: string }
  | { type: "strings"; name: string; label: string; hint?: string }
  | { type: "list"; name: string; label: string; itemLabel: string; fields: Field[] };

export interface SectionDef {
  page: string;
  key: string;
  label: string;
  fields: Field[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaults: Record<string, any>;
}

export const PAGES: { id: string; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "approach", label: "Our Approach" },
  { id: "work", label: "Our Work" },
  { id: "contact", label: "Contact" },
];

const t = (name: string, label: string): Field => ({ type: "text", name, label });
const ta = (name: string, label: string): Field => ({ type: "textarea", name, label });
const rt = (name: string, label: string): Field => ({ type: "richtext", name, label });
const img = (name: string, label: string, hint?: string): Field => ({ type: "image", name, label, hint });
const icon = (name = "icon"): Field => ({ type: "icon", name, label: "Icon" });
const strings = (name: string, label: string): Field => ({ type: "strings", name, label });
const list = (name: string, label: string, itemLabel: string, fields: Field[]): Field => ({
  type: "list", name, label, itemLabel, fields,
});

const hero = (page: string, title: string, subtitle: string): SectionDef => ({
  page,
  key: "hero",
  label: "Page heading",
  fields: [t("title", "Title"), ta("subtitle", "Subtitle")],
  defaults: { title, subtitle },
});

const iconCards = [icon(), t("title", "Title"), ta("desc", "Description")];

export const SECTIONS: SectionDef[] = [
  // ------------------------------------------------------------------ HOME
  {
    page: "home", key: "hero", label: "Hero banner",
    fields: [
      img("image", "Background image", "Wide photo, at least 1600px across."),
      t("title", "Main heading"), t("highlight", "Highlighted heading line"),
      ta("subtitle", "Subtitle"), t("cta_primary", "Primary button text"), t("cta_secondary", "Secondary button text"),
    ],
    defaults: {
      title: "CBK INFRA PROJECTS",
      highlight: "Committed To Superior Quality",
      subtitle: "Engineering excellence since 2014. Building industrial and commercial spaces across Maharashtra.",
      cta_primary: "Explore Our Services",
      cta_secondary: "Contact Us",
    },
  },
  {
    page: "home", key: "stats", label: "Stats bar",
    fields: [strings("items", "Items")],
    defaults: { items: ["Est. 2014", "10+ Years Experience", "4 Service Divisions", "Chakan, Pune"] },
  },
  {
    page: "home", key: "who", label: "Who we are",
    fields: [t("title", "Heading"), rt("body", "Text"), list("cards", "Highlights", "Highlight", iconCards)],
    defaults: {
      title: "Who We Are",
      body: "<p>CBK Infra Projects is a Chakan-based engineering firm founded in September 2014. We specialize in civil engineering, fabrication, and interior design — delivering comprehensive design, development, and execution services across various industries with the highest standards of quality, efficiency, and safety.</p>",
      cards: [
        { icon: "Building2", title: "Established Excellence", desc: "Founded in September 2014, grown into a comprehensive civil engineering firm in Chakan, Maharashtra." },
        { icon: "Wrench", title: "Comprehensive Services", desc: "Specializing in civil work, PEB structure and shed work, heavy machinery foundations, RCC structural work, trimix flooring and interior design work." },
        { icon: "Package", title: "Well-Equipped", desc: "Operating with own machinery and heavy earth-moving equipment, mobilizing resources for projects of any size." },
      ],
    },
  },
  {
    page: "home", key: "services", label: "Core services",
    fields: [t("title", "Heading"), t("link_text", "Link text"), list("items", "Services", "Service", iconCards)],
    defaults: {
      title: "Our Core Services",
      link_text: "Learn More",
      items: [
        { icon: "Building2", title: "Civil Works", desc: "Structural design, RCC, site development, flooring, building construction" },
        { icon: "Wrench", title: "Fabrication", desc: "Steel fabrication, PEB sheds, metalwork, precision welding" },
        { icon: "Paintbrush", title: "Interior Design", desc: "Turnkey interiors, false ceilings, custom furniture, office spaces" },
        { icon: "Mountain", title: "Land Development", desc: "Site leveling, soil embankment, geo textile, contour surveys" },
      ],
    },
  },
  {
    page: "home", key: "mission", label: "Mission & vision",
    fields: [t("title", "Heading"), list("items", "Cards", "Card", iconCards), ta("quote", "Quote")],
    defaults: {
      title: "Our Mission & Vision",
      items: [
        { icon: "Star", title: "Industry Leadership", desc: "Becoming a leading provider of innovative engineering solutions" },
        { icon: "Lightbulb", title: "Transformative Spaces", desc: "Enhancing functionality, safety, and aesthetics of industrial spaces" },
        { icon: "Handshake", title: "Lasting Relationships", desc: "Building long-term partnerships through excellence and trust" },
      ],
      quote: "We aim to transform industrial spaces by delivering high-quality, efficient, and customized services through cutting-edge technology, skilled craftsmanship, and a commitment to excellence.",
    },
  },
  {
    page: "home", key: "clientele", label: "Clientele heading",
    fields: [t("title", "Heading"), t("subtitle", "Subtitle")],
    defaults: { title: "Our Clientele", subtitle: "Trusted by leading companies across industries" },
  },
  {
    page: "home", key: "industries", label: "Industries we serve",
    fields: [t("title", "Heading"), list("items", "Industries", "Industry", [icon(), t("label", "Name")])],
    defaults: {
      title: "Industries We Serve",
      items: [
        { icon: "Car", label: "Automotive Manufacturing" },
        { icon: "Package", label: "Warehousing & Logistics" },
        { icon: "UtensilsCrossed", label: "Food & Beverage" },
        { icon: "Pill", label: "Pharmaceuticals" },
        { icon: "Building", label: "Commercial & Corporate" },
      ],
    },
  },
  {
    page: "home", key: "cta", label: "Call-to-action banner",
    fields: [t("title", "Heading"), ta("text", "Text"), t("button", "Button text")],
    defaults: {
      title: "Ready to Build Something Exceptional?",
      text: "Get in touch with our team today for a free project consultation.",
      button: "Contact Us Today",
    },
  },

  // ----------------------------------------------------------------- ABOUT
  hero("about", "About CBK Infra Projects", "A decade of engineering excellence from Chakan, Maharashtra"),
  {
    page: "about", key: "story", label: "Our story",
    fields: [t("title", "Heading"), rt("body", "Text"), img("image", "Picture")],
    defaults: {
      title: "Our Story",
      body: "<p>CBK Infra Projects was founded in September 2014 in Chakan, Maharashtra, with a vision to redefine how industrial and commercial spaces are built. Over the past decade, we have grown from a focused civil engineering firm into a comprehensive multi-disciplinary company offering civil works, fabrication, interior design, land development, electrical, plumbing, and turnkey solutions.</p><p>We operate with our own fleet of heavy equipment and a skilled team of engineers, planners, and technicians — enabling us to take on projects of any scale with confidence and precision.</p>",
    },
  },
  {
    page: "about", key: "values", label: "Core values",
    fields: [t("title", "Heading"), list("items", "Values", "Value", iconCards)],
    defaults: {
      title: "Our Core Values",
      items: [
        { icon: "Star", title: "Quality", desc: "We commit to the highest standards in every single project." },
        { icon: "Handshake", title: "Integrity", desc: "We build relationships through transparency and reliability." },
        { icon: "Lightbulb", title: "Innovation", desc: "We embrace cutting-edge technology and smart engineering." },
        { icon: "Leaf", title: "Sustainability", desc: "We incorporate eco-friendly practices and materials." },
        { icon: "User", title: "Client-Centricity", desc: "We design solutions around the needs and vision of our clients." },
      ],
    },
  },
  {
    page: "about", key: "objectives", label: "Objectives",
    fields: [t("title", "Heading"), list("items", "Objectives", "Objective", iconCards)],
    defaults: {
      title: "Our Objectives",
      items: [
        { icon: "Shield", title: "Quality Excellence", desc: "Deliver projects meeting the highest standards of construction quality, safety, and durability." },
        { icon: "User", title: "Client Focus", desc: "Understand and fulfill client needs with customized solutions aligned with their vision." },
        { icon: "Leaf", title: "Sustainability", desc: "Incorporate environmentally responsible practices to minimize ecological impact." },
        { icon: "Lightbulb", title: "Innovation", desc: "Leverage the latest technologies to enhance efficiency, accuracy, and project outcomes." },
      ],
    },
  },
  {
    page: "about", key: "team", label: "Our team",
    fields: [t("title", "Heading"), list("items", "Roles", "Role", iconCards)],
    defaults: {
      title: "Our Team",
      items: [
        { icon: "HardHat", title: "Civil & Structural Engineers", desc: "Qualified engineers with expertise in designing and executing complex structural projects." },
        { icon: "ClipboardList", title: "Project Managers & Supervisors", desc: "Experienced professionals ensuring timely delivery and quality control." },
        { icon: "Hammer", title: "Skilled Labor & Technicians", desc: "Well-trained workforce with specialized skills across construction disciplines." },
        { icon: "Monitor", title: "CAD Designers & Planners", desc: "Creative professionals translating client visions into detailed technical plans." },
      ],
    },
  },
  {
    page: "about", key: "certs", label: "Compliance & certifications",
    fields: [t("title", "Heading"), ta("intro", "Intro"), list("items", "Certificates", "Certificate", [t("title", "Title"), t("desc", "Description")])],
    defaults: {
      title: "Compliance & Certifications",
      intro: "CBK Infra Projects complies with all statutory regulations and industry standards.",
      items: [
        { title: "ISO 9001:2015", desc: "Quality Management" },
        { title: "ISO 45001:2018", desc: "Occupational Health and Safety" },
        { title: "GST Registered", desc: "GST: 27BHWPT3693L1Z3" },
        { title: "MSME Certified", desc: "Recognized small and medium enterprise" },
      ],
    },
  },

  // -------------------------------------------------------------- SERVICES
  hero("services", "Our Services", "Comprehensive engineering solutions under one roof"),
  {
    page: "services", key: "civil", label: "Civil works",
    fields: [t("title", "Heading"), ta("intro", "Intro"), strings("points", "Bullet points"), img("image", "Picture")],
    defaults: {
      title: "Civil Works",
      intro: "From office and industrial building construction to RCC structural works and specialized flooring, our civil division handles every aspect of construction with precision and durability.",
      points: [
        "Office and industrial building construction", "RCC structural works", "Retaining and compound walls",
        "STP, ETP, WTP tank construction", "Asphalt, bitumen, and trimix flooring",
        "Precast compound walls, curbstones, road dividers",
      ],
    },
  },
  {
    page: "services", key: "foundations", label: "Structure & machinery foundations",
    fields: [t("title", "Heading"), ta("intro", "Intro"), list("items", "Items", "Item", [t("title", "Title"), ta("desc", "Description")]), img("image", "Picture")],
    defaults: {
      title: "Structure & Machinery Foundations",
      intro: "Specialized foundations engineered for heavy industrial machinery, ensuring stability, precision, and long-term performance.",
      items: [
        { title: "Machine Foundation", desc: "Specialized heavy machinery foundations engineered for stability, precision, and long-term performance." },
        { title: "Chemical Grouting & Epoxy Flooring", desc: "Chemical grouting and epoxy flooring solutions to ensure durability and protection against environmental factors." },
        { title: "Waterproofing & Shuttering", desc: "Waterproofing and shuttering works for industrial applications requiring durability and precision." },
      ],
    },
  },
  {
    page: "services", key: "fabrication", label: "PEB & shed construction",
    fields: [
      t("title", "Heading"), ta("intro", "Intro"),
      list("steps", "Process steps", "Step", [t("step", "Number"), t("title", "Title"), t("desc", "Description")]),
      t("extras_title", "Extra services heading"), strings("extras", "Extra services"),
    ],
    defaults: {
      title: "PEB & Conventional Shed Construction",
      intro: "Our fabrication division delivers high-quality, customized solutions including shed fabrication, conventional shed work, industrial shed work, railings, platforms, mezzanine floors, and staircases.",
      steps: [
        { step: "01", title: "Design", desc: "Custom steel structure design" },
        { step: "02", title: "Fabrication", desc: "Precision metalwork and welding" },
        { step: "03", title: "Erection", desc: "Professional installation services" },
        { step: "04", title: "Completion", desc: "Quality assurance and handover" },
      ],
      extras_title: "Additional Fabrication Services",
      extras: ["PEB shed fabrication and erection", "Industrial shed construction", "MS/SS railings and staircases", "Platforms, mezzanine flooring", "Structural welding"],
    },
  },
  {
    page: "services", key: "land", label: "Land development",
    fields: [t("title", "Heading"), ta("intro", "Intro"), list("items", "Services", "Service", iconCards)],
    defaults: {
      title: "Land Development Services",
      intro: "Comprehensive land preparation services that lay the groundwork for successful construction projects.",
      items: [
        { icon: "MapPin", title: "Site Leveling & Grading", desc: "Professional site leveling and grading services to prepare land for construction projects." },
        { icon: "Building2", title: "Soil Embankment", desc: "Professional soil management and embankment construction for stable foundations and proper drainage." },
        { icon: "Compass", title: "Contour & Geo Textile Survey", desc: "Comprehensive contour surveys and geo textile solutions for soil stabilization and erosion control." },
      ],
    },
  },
  {
    page: "services", key: "interiors", label: "Interior design",
    fields: [
      t("title", "Heading"), ta("intro", "Intro"),
      list("items", "Cards", "Card", [t("title", "Title"), ta("desc", "Description"), img("image", "Picture")]),
      strings("tags", "Tags"),
    ],
    defaults: {
      title: "Interior Design Excellence",
      intro: "Transforming industrial and commercial spaces with thoughtful, functional, and aesthetic interior solutions.",
      items: [
        { title: "Office Interiors", desc: "Complete office design and execution including workstations, partitions, and storage solutions." },
        { title: "Custom Solutions", desc: "Bespoke furniture, cabinetry, and fixtures tailored to specific requirements and aesthetics." },
        { title: "Renovation Services", desc: "Reimagining and upgrading existing spaces with modern design elements and functional improvements." },
      ],
      tags: ["Turnkey office interiors", "False ceilings, tiling", "Aluminum and glass partitions", "Custom furniture and workstations", "Renovation and remodeling"],
    },
  },
  {
    page: "services", key: "additional", label: "Additional services",
    fields: [t("title", "Heading"), list("items", "Services", "Service", iconCards)],
    defaults: {
      title: "Additional Services",
      items: [
        { icon: "Paintbrush", title: "Painting Services", desc: "Structural/industrial painting, decorative and emulsion finishes" },
        { icon: "PenTool", title: "Designing & Planning", desc: "2D & 3D architectural planning, RCC and PEB structure planning, interior layout consultancy" },
        { icon: "Droplets", title: "Sanitary & Plumbing", desc: "Sewage/stormwater pipeline, complete plumbing systems (UPVC, CPVC, GI, MS, SS), washroom renovation and RCC chambers" },
        { icon: "Zap", title: "Electrical Works", desc: "Industrial and commercial electrical installations, lighting, cabling, load management" },
        { icon: "Key", title: "Turnkey Solutions", desc: "Lock and key project delivery for civil, fabrication, and interiors; fast-track execution" },
        { icon: "Settings", title: "Maintenance Services", desc: "Civil structure repairs, interior and fabrication maintenance, plumbing and electrical support" },
      ],
    },
  },

  // -------------------------------------------------------------- APPROACH
  hero("approach", "Our Project Management Approach", "Structured. Transparent. Delivered on time."),
  {
    page: "approach", key: "overview", label: "Overview",
    fields: [rt("text", "Text")],
    defaults: {
      text: "<p>CBK Infra Projects adopts a meticulous and structured approach to project management. Each project is managed from inception to completion by a dedicated team of engineers, planners, and site supervisors to ensure timelines, budget control, safety, and quality standards are consistently met.</p>",
    },
  },
  {
    page: "approach", key: "process", label: "Our process",
    fields: [
      t("title", "Heading"), t("step_label", "Step label"),
      list("items", "Steps", "Step", [icon(), t("step", "Number"), t("title", "Title"), ta("desc", "Description")]),
    ],
    defaults: {
      title: "Our Process",
      step_label: "Step",
      items: [
        { icon: "ClipboardList", step: "01", title: "Planning", desc: "Project scope and requirements analysis" },
        { icon: "Play", step: "02", title: "Execution", desc: "Systematic implementation with quality control" },
        { icon: "BarChart3", step: "03", title: "Monitoring", desc: "Continuous progress tracking and reporting" },
        { icon: "CheckCircle", step: "04", title: "Completion", desc: "Final quality assurance and handover" },
      ],
    },
  },
  {
    page: "approach", key: "equipment", label: "Equipment & resources",
    fields: [
      t("title", "Heading"), ta("intro", "Intro"),
      list("items", "Equipment", "Item", [icon(), t("title", "Title"), ta("desc", "Description"), img("image", "Photo")]),
    ],
    defaults: {
      title: "Equipment & Resources",
      intro: "We operate a full fleet of in-house heavy equipment, enabling rapid deployment, cost efficiency, and total control over execution timelines.",
      items: [
        { icon: "Truck", title: "Excavators", desc: "High-capacity excavators for efficient earthwork operations" },
        { icon: "HardHat", title: "Dozers", desc: "Powerful dozers for site leveling and grading" },
        { icon: "Factory", title: "Batching Plants", desc: "Modern batching plants for quality concrete production" },
        { icon: "Wrench", title: "Welding & Fabrication Machinery", desc: "Advanced equipment for precision metal fabrication" },
      ],
    },
  },

  // ------------------------------------------------------------------ WORK
  hero("work", "Our Work", "A selection of civil, fabrication, interior, and land development projects delivered across Maharashtra."),
  {
    page: "work", key: "stats", label: "Numbers bar",
    fields: [list("items", "Numbers", "Number", [t("value", "Value"), t("label", "Label")])],
    defaults: {
      items: [
        { value: "10+", label: "Years Delivering" },
        { value: "150+", label: "Projects Executed" },
        { value: "50+", label: "Industrial Clients" },
        { value: "4", label: "Service Divisions" },
      ],
    },
  },
  {
    page: "work", key: "categories", label: "Project categories",
    fields: [
      t("title", "Heading"), ta("intro", "Intro"),
      list("items", "Categories", "Category", [icon(), t("label", "Name")]),
    ],
    defaults: {
      title: "Projects Across Every Division",
      intro: "From RCC structures to turnkey interiors, every project is delivered with the same commitment to quality and timeline.",
      items: [
        { icon: "HardHat", label: "All" },
        { icon: "Building2", label: "Civil Works" },
        { icon: "Wrench", label: "Fabrication" },
        { icon: "Paintbrush", label: "Interiors" },
        { icon: "Mountain", label: "Land Development" },
      ],
    },
  },
  {
    page: "work", key: "process", label: "How we deliver",
    fields: [
      t("title", "Heading"), ta("intro", "Intro"),
      list("items", "Steps", "Step", [t("step", "Number"), t("title", "Title"), ta("desc", "Description")]),
    ],
    defaults: {
      title: "How We Deliver Every Project",
      intro: "A consistent process — from first site visit to final handover — keeps quality, safety, and timelines on track.",
      items: [
        { step: "01", title: "Survey & Plan", desc: "Site visit, requirement capture, drawings, and BoQ." },
        { step: "02", title: "Design & Approve", desc: "2D/3D plans, structural design, and client sign-off." },
        { step: "03", title: "Execute", desc: "Mobilization, fabrication, civil, and interior execution." },
        { step: "04", title: "Handover", desc: "Quality checks, snag closure, and on-time handover." },
      ],
    },
  },
  {
    page: "work", key: "cta", label: "Call-to-action banner",
    fields: [t("title", "Heading"), ta("text", "Text"), t("button", "Button text")],
    defaults: {
      title: "Have a Project in Mind?",
      text: "Tell us about your site and requirements — we'll put together a plan and a quote.",
      button: "Start a Project",
    },
  },

  // --------------------------------------------------------------- CONTACT
  hero("contact", "Contact Us", "Let's discuss your next project"),
  {
    page: "contact", key: "form", label: "Enquiry form",
    fields: [
      t("title", "Form heading"), strings("services", "Service options"),
      t("success_title", "Thank-you heading"), ta("success_text", "Thank-you text"),
    ],
    defaults: {
      title: "Send an Enquiry",
      services: ["Civil Works", "Fabrication", "Interior Design", "Land Development", "Turnkey Solution", "Other"],
      success_title: "Thank You!",
      success_text: "Our team will reach out to you within 24 hours.",
    },
  },
  {
    page: "contact", key: "map", label: "Map",
    fields: [{ type: "text", name: "embed_url", label: "Google Maps embed URL", hint: "Google Maps > Share > Embed a map > copy the src address." }],
    defaults: {
      embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30236.69!2d73.86!3d18.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b70c10d3e36f%3A0x506f5b98b0c3e7e4!2sChakan%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    },
  },
];

// ---------------------------------------------------------- site settings
export const SETTINGS_FIELDS: Field[] = [
  img("logo", "Logo", "Shown in the top bar. Transparent or white-background PNG works best."),
  t("tagline", "Tagline (footer)"),
  ta("address", "Address"),
  list("phones", "Phone numbers", "Phone", [t("name", "Contact person"), t("number", "Number (with country code)")]),
  t("email", "Email address"),
  t("gst", "GST number"),
  t("copyright", "Footer copyright line"),
  strings("footer_services", "Services listed in footer"),
  t("seo_title", "Browser tab title"),
  ta("seo_description", "Search engine description"),
];

export const SETTINGS_DEFAULTS = {
  tagline: "Civil Interior Fabrication — Committed To Superior Quality",
  address: "Gat No. 226/2, Ground Floor, Shop No. 12,\nVrindavan Complex, Chakan MIDC Phase-2,\nNear Surin Automotive, Bhamboli,\nTaluka - Khed, Dist - Pune 410501,\nMaharashtra, India",
  phones: [
    { name: "Mr. Omkar Gurav", number: "+91 74107 47284" },
    { name: "Mr. Virendra Gholap", number: "+91 90113 93839" },
  ],
  email: "info@cbkinfraprojects.com",
  gst: "27BHWPT3693L1Z3",
  copyright: "© 2025 CBK Infra Projects. All Rights Reserved. | GST: 27BHWPT3693L1Z3 | Est. 2014",
  footer_services: ["Civil Works", "Fabrication", "Interior Design", "Land Development", "Turnkey Solutions"],
  seo_title: "CBK Infra Projects — Civil Interior Fabrication | Chakan, Pune",
  seo_description: "CBK Infra Projects — Engineering excellence since 2014. Leading civil works, fabrication, interior design & land development services in Chakan, Pune, Maharashtra.",
} as Record<string, unknown>;

// ------------------------------------------------------- default clients/projects
export const DEFAULT_CLIENTS: { name: string; file: string }[] = [
  { name: "SANY", file: "sany.png" },
  { name: "Liebherr", file: "liebherr1.jpg" },
  { name: "Kingfa", file: "kingfa.png" },
  { name: "Montanri Lifts", file: "montanri-lifts.png" },
  { name: "Ultra Corpotech", file: "ultra-corpotech.png" },
  { name: "Acegroup", file: "acegroup.png" },
  { name: "Pack Time", file: "pack-time.png" },
  { name: "Ecoprocess", file: "ecoprocess.jpeg" },
  { name: "Fafeco", file: "fafeco.png" },
  { name: "SGS", file: "sgs.png" },
  { name: "Kala Defence", file: "kala-defence.jpeg" },
  { name: "MSKH Seating", file: "mskh-seating.jpeg" },
  { name: "Kaloris Smart Healing", file: "kaloris-smart-healing.jpeg" },
  { name: "Mahindra & Mahindra", file: "mahindra-new.jpg" },
  { name: "Sujan Contitech", file: "sujan-contitech.svg" },
  { name: "Synergy Infratech Power Systems", file: "synergy-infratech.jpeg" },
  { name: "Cotswold", file: "cotswold.png" },
  { name: "Huf", file: "huf.png" },
  { name: "ColdStar", file: "coldstar.png" },
  { name: "Atomberg", file: "atomberg.png" },
];

export interface ProjectRow {
  id?: string;
  title: string;
  client: string;
  location: string;
  category: string;
  summary: string;
  highlights: string[];
  cover_url: string | null;
  gallery: string[];
  sort_order: number;
  is_published: boolean;
}

const p = (title: string, client: string, location: string, category: string, summary: string, highlights: string[]): Omit<ProjectRow, "sort_order"> => ({
  title, client, location, category, summary: `<p>${summary}</p>`, highlights, cover_url: null, gallery: [], is_published: true,
});

export const DEFAULT_PROJECTS: ProjectRow[] = [
  p("Industrial Shed Fabrication", "Leading Automotive OEM", "Chakan MIDC, Pune", "Fabrication",
    "Design, fabrication, and erection of a large-span PEB shed engineered for heavy manufacturing operations.",
    ["PEB shed design and erection", "Structural welding and crane support", "On-time turnkey delivery"]),
  p("Heavy Machinery Foundation", "Precision Equipment Manufacturer", "Bhamboli, Pune", "Civil Works",
    "RCC machine foundations engineered for vibration control, load distribution, and long-term operational stability.",
    ["Reinforced concrete foundation", "Chemical grouting and anchoring", "Precision alignment and levelling"]),
  p("Turnkey Office Interiors", "Corporate HQ Fit-Out", "Pune", "Interiors",
    "Complete office interior execution including workstations, partitions, false ceilings, flooring, and lighting.",
    ["Aluminium and glass partitions", "False ceiling and decorative finishes", "Custom workstations and cabinetry"]),
  p("RCC Compound Wall & Site Works", "Logistics Park", "Khed Taluka, Pune", "Civil Works",
    "Precast compound walls, internal roads, and drainage works for a large logistics and warehousing facility.",
    ["Precast compound wall installation", "Asphalt and trimix flooring", "Stormwater drainage system"]),
  p("Site Leveling & Land Development", "Industrial Plot Owner", "Chakan, Maharashtra", "Land Development",
    "End-to-end site preparation including grading, soil embankment, and contour survey for an industrial plot.",
    ["Site leveling and grading", "Soil embankment and compaction", "Geo textile and erosion control"]),
  p("Mezzanine Floor & MS Staircases", "Warehousing Client", "Pune", "Fabrication",
    "Steel mezzanine floors, MS staircases, and safety railings fabricated and erected for storage expansion.",
    ["Mezzanine floor design and erection", "MS/SS railings and staircases", "Load-tested handover"]),
  p("Trimix Flooring – Production Bay", "F&B Manufacturer", "Pune", "Civil Works",
    "High-durability trimix flooring across a production bay engineered for heavy traffic and food-grade conditions.",
    ["Surface hardener trimix flooring", "Joint cutting and sealing", "Smooth, dust-free finish"]),
  p("Industrial Painting & Renovation", "Existing Facility Upgrade", "Chakan MIDC, Pune", "Interiors",
    "Structural and decorative painting across a working facility with minimal disruption to ongoing operations.",
    ["Structural / industrial painting", "Decorative emulsion finishes", "Phased execution around production"]),
].map((row, i) => ({ ...row, sort_order: i }));

export const getSectionDef = (page: string, key: string) =>
  SECTIONS.find((s) => s.page === page && s.key === key);
