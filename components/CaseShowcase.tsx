"use client";

import Image from "next/image";
import { useState } from "react";

type ShowcaseImage = {
  src: string;
  alt: string;
  caption: string;
};

type Props = {
  slug: string;
  image?: ShowcaseImage;
};

type BranchRow = {
  id: string;
  branch: string;
  repairs: string;
  stockValue: string;
  sync: string;
  journalRef: string;
  entries: { account: string; debit: string; credit: string }[];
};

const GEEKFIX_BRANCHES: BranchRow[] = [
  {
    id: "pj",
    branch: "Petaling Jaya",
    repairs: "14 active",
    stockValue: "RM 42,680",
    sync: "Synced · 2m ago",
    journalRef: "JRN-PJ-1042",
    entries: [
      { account: "Cash & DuitNow Clearing (PJ)", debit: "680.00", credit: "—" },
      { account: "Repair & Parts Revenue", debit: "—", credit: "680.00" },
      { account: "Parts COGS · OLED Module", debit: "290.00", credit: "—" },
      { account: "Branch Inventory (PJ)", debit: "—", credit: "290.00" },
    ],
  },
  {
    id: "subang",
    branch: "Subang Jaya",
    repairs: "11 active",
    stockValue: "RM 38,420",
    sync: "Synced · 2m ago",
    journalRef: "JRN-SJ-0889",
    entries: [
      { account: "Branch Inventory (Subang)", debit: "3,480.00", credit: "—" },
      { account: "HQ Central Stock Transfer", debit: "—", credit: "3,480.00" },
      { account: "Card Settlement Receivable", debit: "1,420.00", credit: "—" },
      { account: "Repair & Parts Revenue", debit: "—", credit: "1,420.00" },
    ],
  },
  {
    id: "shah-alam",
    branch: "Shah Alam",
    repairs: "9 active",
    stockValue: "RM 31,950",
    sync: "Synced · 4m ago",
    journalRef: "JRN-SA-0614",
    entries: [
      { account: "Salary & OT Expense (Branch)", debit: "18,400.00", credit: "—" },
      { account: "EPF · SOCSO · EIS · HRDF Payable", debit: "—", credit: "3,920.00" },
      { account: "Staff Net Payroll Clearing", debit: "—", credit: "14,480.00" },
    ],
  },
  {
    id: "penang",
    branch: "Penang",
    repairs: "12 active",
    stockValue: "RM 36,100",
    sync: "Synced · 1m ago",
    journalRef: "JRN-PG-0511",
    entries: [
      { account: "Cash & DuitNow Clearing (Penang)", debit: "1,100.00", credit: "—" },
      { account: "Repair & Parts Revenue", debit: "—", credit: "1,100.00" },
      { account: "Warranty Replacement Reserve", debit: "145.00", credit: "—" },
      { account: "Branch Inventory (Penang)", debit: "—", credit: "145.00" },
    ],
  },
];

type Lang = "en" | "bm";

type BouquetOrder = {
  id: string;
  code: string;
  itemEn: string;
  itemBm: string;
  slotEn: string;
  slotBm: string;
  paymentEn: string;
  paymentBm: string;
  stageIndex: number;
  stageEn: string;
  stageBm: string;
  price: number;
  materialCost: number;
};

const AYASHA_ORDERS: BouquetOrder[] = [
  {
    id: "ab-204",
    code: "AB-1204",
    itemEn: "Monochrome Peony Brick Bouquet",
    itemBm: "Jambangan Bunga Bata Peony Monokrom",
    slotEn: "Pickup · Today",
    slotBm: "Ambil sendiri · Hari ini",
    paymentEn: "Deposit paid · DuitNow QR",
    paymentBm: "Deposit dijelaskan · DuitNow QR",
    stageIndex: 4,
    stageEn: "Stage 4 of 7 · In assembly",
    stageBm: "Tahap 4 / 7 · Dalam assembly",
    price: 185,
    materialCost: 68,
  },
  {
    id: "ab-205",
    code: "AB-1205",
    itemEn: "Botanical Rose & Eucalyptus Set",
    itemBm: "Set Ros Botanikal & Eucalyptus",
    slotEn: "Delivery · Today",
    slotBm: "Penghantaran · Hari ini",
    paymentEn: "Full payment · Receipt attached",
    paymentBm: "Bayaran penuh · Resit dilampirkan",
    stageIndex: 5,
    stageEn: "Stage 5 of 7 · Ready / QC",
    stageBm: "Tahap 5 / 7 · Siap / QC",
    price: 240,
    materialCost: 86,
  },
  {
    id: "ab-208",
    code: "AB-1208",
    itemEn: "Custom 3D Builder Arrangement",
    itemBm: "Gubahan Khas Pembina 3D",
    slotEn: "Pickup · Tomorrow",
    slotBm: "Ambil sendiri · Esok",
    paymentEn: "Awaiting 50% deposit",
    paymentBm: "Menunggu deposit 50%",
    stageIndex: 2,
    stageEn: "Stage 2 of 7 · Quotation sent",
    stageBm: "Tahap 2 / 7 · Quotation dihantar",
    price: 210,
    materialCost: 74,
  },
];

export default function CaseShowcase({ slug, image }: Props) {
  const [branchId, setBranchId] = useState<string>(GEEKFIX_BRANCHES[0].id);
  const [lang, setLang] = useState<Lang>("en");
  const [orderId, setOrderId] = useState<string>(AYASHA_ORDERS[0].id);

  if (slug !== "geekfix-erp" && slug !== "ayasha-bloom-ops" && !image) {
    return null;
  }

  const activeBranch =
    GEEKFIX_BRANCHES.find((b) => b.id === branchId) ?? GEEKFIX_BRANCHES[0];
  const activeOrder =
    AYASHA_ORDERS.find((o) => o.id === orderId) ?? AYASHA_ORDERS[0];
  const netProfit = activeOrder.price - activeOrder.materialCost;

  return (
    <section
      className="case-showcase wrap"
      aria-label="System interface and operational studio showcase"
    >
      <div className="case-showcase-grid">
        {image && (
          <figure className="case-plate">
            <div className="sys-bar">
              <div className="sys-id">
                <span className="sys-mark" aria-hidden="true" />
                <span>
                  {slug === "geekfix-erp"
                    ? "Physical operations · 26 branches"
                    : "Bespoke catalogue · Hand-assembled"}
                </span>
              </div>
              <span className="case-plate-tag">Studio plate</span>
            </div>
            <div className="case-plate-media">
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={896}
                preload
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
            </div>
            <figcaption className="case-plate-cap">{image.caption}</figcaption>
          </figure>
        )}

        {slug === "geekfix-erp" && (
          <div className="sys case-ui" aria-label="Interactive GeekFix ERP branch ledger">
            <div className="sys-bar">
              <div className="sys-id">
                <span className="sys-mark" aria-hidden="true" />
                <span>GeekFix ERP — 26 Branches · Malaysia</span>
              </div>
              <span className="case-ui-badge">10-min auto sync</span>
            </div>

            <div className="case-ui-table" role="listbox" aria-label="Select branch to inspect ledger">
              <div className="case-ui-thead" aria-hidden="true">
                <span>Branch</span>
                <span>Repairs</span>
                <span>Stock</span>
                <span>Status</span>
              </div>
              {GEEKFIX_BRANCHES.map((row) => {
                const selected = row.id === activeBranch.id;
                return (
                  <button
                    key={row.id}
                    id={`geekfix-branch-${row.id}`}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`case-ui-row${selected ? " is-selected" : ""}`}
                    onClick={() => setBranchId(row.id)}
                  >
                    <span className="case-ui-strong">{row.branch}</span>
                    <span>{row.repairs}</span>
                    <span className="case-ui-strong">{row.stockValue}</span>
                    <span className="case-ui-muted">{row.sync}</span>
                  </button>
                );
              })}
            </div>

            <div className="sys-trace" aria-live="polite">
              <div className="sys-trace-head">
                <span>Balanced journal · {activeBranch.journalRef}</span>
                <span>MyInvois e-Invoice ready</span>
              </div>
              <div className="case-ledger">
                <div className="case-ledger-head" aria-hidden="true">
                  <span>Account</span>
                  <span>Debit (RM)</span>
                  <span>Credit (RM)</span>
                </div>
                {activeBranch.entries.map((entry) => (
                  <div className="case-ledger-row" key={entry.account}>
                    <span>{entry.account}</span>
                    <span>{entry.debit}</span>
                    <span>{entry.credit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {slug === "ayasha-bloom-ops" && (
          <div
            className="sys case-ui"
            aria-label="Interactive Ayasha Bloom Ops queue and profit tracker"
          >
            <div className="sys-bar">
              <div className="sys-id">
                <span className="sys-mark" aria-hidden="true" />
                <span>
                  {lang === "en"
                    ? "Ayasha Bloom Ops · Today Queue"
                    : "Ayasha Bloom Ops · Giliran Hari Ini"}
                </span>
              </div>
              <div className="sys-toggle" role="tablist" aria-label="Interface language">
                <button
                  id="ayasha-lang-en"
                  type="button"
                  role="tab"
                  aria-selected={lang === "en"}
                  className={lang === "en" ? "is-active" : undefined}
                  onClick={() => setLang("en")}
                >
                  EN
                </button>
                <button
                  id="ayasha-lang-bm"
                  type="button"
                  role="tab"
                  aria-selected={lang === "bm"}
                  className={lang === "bm" ? "is-active" : undefined}
                  onClick={() => setLang("bm")}
                >
                  BM
                </button>
              </div>
            </div>

            <div className="sys-list" role="listbox" aria-label="Select bouquet order">
              {AYASHA_ORDERS.map((order) => {
                const selected = order.id === activeOrder.id;
                return (
                  <button
                    key={order.id}
                    id={`ayasha-order-${order.id}`}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`sys-row${selected ? " is-selected" : ""}`}
                    onClick={() => setOrderId(order.id)}
                  >
                    <span className="sys-ref">{order.code}</span>
                    <span className="sys-main">
                      <span className="sys-title">
                        {lang === "en" ? order.itemEn : order.itemBm}
                      </span>
                      <span className="sys-sub">
                        {lang === "en" ? order.slotEn : order.slotBm}
                      </span>
                    </span>
                    <span className="sys-num">
                      <span className="sys-amount">RM {order.price}</span>
                      <span className="sys-status">
                        {lang === "en" ? order.paymentEn : order.paymentBm}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="sys-trace" aria-live="polite">
              <div className="sys-trace-head">
                <span>
                  {activeOrder.code} ·{" "}
                  {lang === "en" ? activeOrder.stageEn : activeOrder.stageBm}
                </span>
                <span>
                  {lang === "en" ? "Locked material cost" : "Kos bahan dikunci"}
                </span>
              </div>

              <div className="case-progress" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={idx < activeOrder.stageIndex ? "is-filled" : undefined}
                  />
                ))}
              </div>

              <div className="case-profit-grid">
                <div>
                  <span className="sys-step-no">
                    {lang === "en" ? "Order price" : "Harga tempahan"}
                  </span>
                  <strong>RM {activeOrder.price}</strong>
                </div>
                <div>
                  <span className="sys-step-no">
                    {lang === "en" ? "Material cost" : "Kos bahan"}
                  </span>
                  <strong>RM {activeOrder.materialCost}</strong>
                </div>
                <div>
                  <span className="sys-step-no">
                    {lang === "en" ? "Net profit" : "Untung bersih"}
                  </span>
                  <strong>RM {netProfit}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
