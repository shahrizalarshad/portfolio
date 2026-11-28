// Case study untuk setiap projek. Satu blok = satu page di /work/<slug>.
// Semua angka dan fakta datang dari ringkasan sistem sebenar. Jangan letak nama pekerja,
// gaji, atau butiran server kat sini, sebab page ni public.

export type CaseStudy = {
  slug: string;
  title: string;
  kind: string;
  lead: string;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  facts: { value: string; label: string }[];
  flow?: {
    step: string;
    title: string;
    detail: string;
    tags: string[];
  }[];
  does: { area: string; items: string[] }[];
  automates: string[];
  hard: { title: string; body: string }[];
  stack: string[];
};

export const cases: CaseStudy[] = [
  {
    slug: "geekfix-erp",
    title: "GeekFix ERP",
    kind: "ERP system",
    lead: "GeekFix repairs phones and devices at 26 branches across Malaysia. This is the system the business runs on: stock, repair and sales records, HR and payroll, finance and accounting, all in one place.",
    image: {
      src: "/work/geekfix-erp.jpg",
      alt: "Monochrome studio flat-lay of smartphone repair components, precision tools, ESD screw tray, and QR stock labels",
      caption: "26 branches · serialized parts, repair tickets & QR dispatch",
    },
    facts: [
      { value: "26", label: "branches" },
      { value: "~110", label: "active staff" },
      { value: "58,000+", label: "repair jobs on record" },
      { value: "200,000+", label: "stock records" },
    ],
    flow: [
      {
        step: "01",
        title: "26 branches & legacy apps",
        detail: "Existing repair and POS apps keep running without disruption.",
        tags: ["Repair jobs", "Branch stock", "Sales & refunds"],
      },
      {
        step: "02",
        title: "Scheduled 10-min sync",
        detail: "Pulls records in automatically and scopes them by branch and role.",
        tags: ["8 access roles", "Branch isolation", "Zero double entry"],
      },
      {
        step: "03",
        title: "Core ERP & payroll engine",
        detail: "Operations, HR attendance, claims, and statutory Malaysia tables.",
        tags: ["EPF · SOCSO · EIS · HRDF", "Staff portal", "Approvals"],
      },
      {
        step: "04",
        title: "Balanced books & compliance",
        detail: "Double-entry journals, branch P&L, reconciliation and e-Invoice docs.",
        tags: ["Auto journals", "Cashbook", "MyInvois ready"],
      },
    ],
    does: [
      {
        area: "Stock and repairs",
        items: [
          "Stock by branch, transfers between branches, suppliers and purchase orders",
          "Repair jobs, sales, refunds and warranty claims in one view",
          "A map of every branch with its WhatsApp connection status",
        ],
      },
      {
        area: "People",
        items: [
          "Staff records, attendance, shifts, overtime and leave",
          "Monthly payroll with EPF, SOCSO, EIS and HRDF, plus payslips",
          "Commission, expense claims and salary advances with approvals",
          "A phone-friendly staff portal for payslips, leave, schedule and punch card",
        ],
      },
      {
        area: "Money",
        items: [
          "Income, expenses and a cashbook for each branch",
          "Journals, P&L, balance sheet, trial balance and supplier aging",
          "Bank reconciliation, month by month",
          "Documents prepared for Malaysia's MyInvois e-Invoice system",
        ],
      },
    ],
    automates: [
      "Copying sales, job, return, stock and cashbook data between systems",
      "Writing the accounting entries for every sale, refund, purchase and salary",
      "Working out statutory deductions for each staff member",
      "Producing payslips and PDF letters",
      "Totalling commission and supplier aging",
    ],
    hard: [
      {
        title: "Payroll that follows the official tables",
        body: "EPF, SOCSO, EIS and HRDF are calculated from the published contribution tables, with exemptions set per staff member.",
      },
      {
        title: "Bookkeeping that writes itself",
        body: "Every 10 minutes, sales, refunds, purchases, salaries and claims become balanced accounting entries for the right branch. Nobody keys them in twice.",
      },
      {
        title: "Working alongside the older systems",
        body: "Repair jobs and stock still live in older apps. The ERP pulls their data in on a schedule, so the business never had to risk a big switchover.",
      },
      {
        title: "Each person sees only their branches",
        body: "Eight roles, from technician to finance. Finance staff see only the branches they handle, in every report.",
      },
    ],
    stack: ["Laravel", "PHP", "MySQL", "Docker", "AWS"],
  },
  {
    slug: "ayasha-blooms",
    title: "Ayasha Blooms",
    kind: "Order & ops system",
    lead: "Ayasha Blooms makes flower brick bouquets to order, run by a team of two. Orders used to arrive on WhatsApp, by hand and through a separate catalogue. Now one system at app.ayashablooms.com runs every order, payment and ringgit of profit, and feeds the brand website at ayashablooms.com.",
    image: {
      src: "/work/ayasha-blooms.jpg",
      alt: "Monochrome studio photograph of a handcrafted modular brick flower bouquet wrapped in matte architectural paper",
      caption: "Made-to-order brick flower bouquets · tracked from inquiry to profit",
    },
    facts: [
      { value: "2", label: "people running the shop" },
      { value: "7", label: "order stages, inquiry to done" },
      { value: "2", label: "sites on one database" },
      { value: "2", label: "languages, EN and BM" },
    ],
    flow: [
      {
        step: "01",
        title: "Customer browses the brand website",
        detail: "ayashablooms.com shows products, prices and booking rules read live from the system.",
        tags: ["Live prices", "EN & BM", "No double entry"],
      },
      {
        step: "02",
        title: "Customer orders from the catalogue",
        detail: "The catalogue at app.ayashablooms.com takes the order with a date and a pickup or delivery option.",
        tags: ["7-day advance booking", "Closed dates", "Daily order cap"],
      },
      {
        step: "03",
        title: "Staff run it from the Today screen",
        detail: "Catalogue orders arrive as inquiries next to the ones keyed in from WhatsApp, then move through each stage.",
        tags: ["Deposit & receipts", "DuitNow QR", "Status history"],
      },
      {
        step: "04",
        title: "Customer tracker and profit",
        detail: "The customer follows their order live, and the shop sees the profit on every order.",
        tags: ["Live tracker", "Material costs", "Monthly profit"],
      },
    ],
    does: [
      {
        area: "Orders",
        items: [
          "A Today screen: what is due today, what is late, the next 7 days and unpaid balances",
          "Every order in one list with search and status filters, from inquiry to completed",
          "Order details, card message, delivery or pickup, notes and full history",
          "One tap to send a ready-written order summary to WhatsApp",
        ],
      },
      {
        area: "Customers",
        items: [
          "A brand website at ayashablooms.com, in English and Bahasa Melayu",
          "A catalogue with product pages and an order form, styled to match the website",
          "A thank-you page with the deposit amount, bank details and DuitNow QR",
          "An order tracker that moves as staff update the status",
        ],
      },
      {
        area: "Money",
        items: [
          "Deposit, balance and full payments, each with its receipt attached",
          "Material costs per product from a shared materials list",
          "Extra expenses per order, profit per order and a monthly summary",
        ],
      },
    ],
    automates: [
      "Showing the same products, prices, lead time and deposit rate on the brand website",
      "Turning a catalogue order into a staff order, with no retyping",
      "Blocking dates that are closed, less than 7 days away or already fully booked",
      "Working out the deposit due from the shop's deposit rate",
      "Updating the customer's tracker whenever the status changes",
      "Locking in the material cost of each order and totalling profit by month",
    ],
    hard: [
      {
        title: "One source for two sites",
        body: "Staff change a product or a price once in the system. The brand website reads it from the same database, so the two never disagree.",
      },
      {
        title: "A public catalogue on a private database",
        body: "Customers can order without logging in, but they can only read the catalogue and their own order summary. Everything else is visible to registered staff only.",
      },
      {
        title: "Profit that stays true",
        body: "Material prices change. Each order keeps the cost it had when it was placed, so last month's profit does not shift when a price is updated.",
      },
      {
        title: "Built for a phone first",
        body: "The shop runs from phones, so it installs as an app with a bottom menu, opens into a two-column layout on a laptop, and works in English and Bahasa Melayu.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres", "Vercel"],
  },
];
