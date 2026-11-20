// Semua teks website ada dalam fail ni. Tukar kat sini je, tak payah sentuh component.

export const site = {
  name: "Shahrizal Arshad",
  // Email sebenar dibaca dari environment variable NEXT_PUBLIC_CONTACT_EMAIL (set kat Vercel).
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
  location: "Petaling Jaya, Malaysia",
};

// Link yang buka app email terus, dengan subject siap diisi.
export const contactHref = `mailto:${site.email}?subject=${encodeURIComponent("New project")}`;

export const headline = ["I build the", "software your", "business runs on."];

export const intro =
  "ERP systems, websites and landing pages for small businesses that have outgrown spreadsheets and WhatsApp groups.";

// Client dan syarikat yang pernah guna servis. Untuk tunjuk logo sebenar:
// letak fail dalam public/logos/ dan isi "logo", contoh logo: "/logos/geekfix.png".
// Kalau "logo" kosong, nama syarikat ditunjuk sebagai teks. Sengaja takde link ke sistem client.
export type Client = { name: string; logo: string };

export const clients: Client[] = [
  { name: "GeekFix", logo: "/logos/geekfix.png" },
  { name: "Simpul", logo: "/logos/simpul.png" },
  { name: "Fixbay", logo: "/logos/fixbay.png" },
  { name: "Ayasha", logo: "/logos/ayasha.png" },
];

export type Project = { title: string; what: string; kind: string; href: string };

// Tambah projek baru kat sini: satu blok { title, what, kind, href } untuk setiap projek.
export const projects: Project[] = [
  {
    title: "Flipplan",
    what: "A free place for architects to publish their portfolio as a flipbook.",
    kind: "Web platform",
    href: "#",
  },
  {
    title: "KiraJam",
    what: "Turns shift timesheets into wages for small Malaysian businesses.",
    kind: "SaaS",
    href: "#",
  },
  {
    title: "GeekFix ERP",
    what: "Stock, purchase orders and repair jobs across every branch, tracked in real time.",
    kind: "ERP system",
    href: "#",
  },
];

export const services = [
  {
    title: "ERP systems",
    body: "Stock, orders, invoices and staff in one system shaped around how your team already works.",
  },
  {
    title: "Websites",
    body: "A fast, clear company site you can update yourself, on any screen size.",
  },
  {
    title: "Landing pages",
    body: "One page with one job: get the visitor to book, buy or send a message.",
  },
];

export const about = [
  "On weekdays I work as an SAP technical consultant, writing ABAP and building Fiori apps for large companies. The same discipline goes into the smaller systems I build on my own time.",
  "Before SAP I shipped full-stack Laravel products and worked on Oracle JD Edwards. I hold a degree in IT from UKM and a CompTIA Cloud+ certification.",
];
