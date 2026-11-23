// Case study untuk setiap projek. Satu blok = satu page di /work/<slug>.
// Semua angka dan fakta datang dari ringkasan sistem sebenar. Jangan letak nama pekerja,
// gaji, atau butiran server kat sini, sebab page ni public.

export type CaseStudy = {
  slug: string;
  title: string;
  kind: string;
  lead: string;
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
];
