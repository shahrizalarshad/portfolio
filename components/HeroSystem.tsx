"use client";

import { useState } from "react";

type Mode = "after" | "before";

type EventRow = {
  id: string;
  ref: string;
  title: string;
  branch: string;
  amount: string;
  status: string;
  trace: [string, string, string];
  note: string;
};

const EVENTS: EventRow[] = [
  {
    id: "repair",
    ref: "JOB-1042",
    title: "iPhone 15 OLED replacement",
    branch: "Petaling Jaya",
    amount: "RM 680",
    status: "Synced",
    trace: ["Stock -1 (PJ)", "INV-1042 issued", "Dr Cash 680 / Cr Sales 680"],
    note: "Posted to PJ branch ledger automatically",
  },
  {
    id: "transfer",
    ref: "TRF-0319",
    title: "Branch stock transfer",
    branch: "HQ → Subang",
    amount: "12 units",
    status: "Synced",
    trace: ["HQ -12 · Subang +12", "DO-0319 logged", "Branch stock reconciled"],
    note: "Live count updated across all 26 branches",
  },
  {
    id: "payroll",
    ref: "PAY-0526",
    title: "Monthly payroll run",
    branch: "110 staff",
    amount: "RM 214,800",
    status: "Posted",
    trace: ["EPF · SOCSO · EIS · HRDF", "110 PDF payslips", "Dr Salary / Cr Statutory & Bank"],
    note: "Calculated from published Malaysian tables",
  },
];

const CHAOS_ITEMS = [
  {
    source: "WhatsApp · Branch Group",
    tag: "14 unread",
    body: "“Boss, PJ branch iPhone 15 screen habis. Subang ada extra ke?”",
    issue: "No live stock count",
  },
  {
    source: "Stock_FINAL_v4_new.xlsx",
    tag: "4 days old",
    body: "Row 214 shows #REF! after two staff edited the sheet on Monday.",
    issue: "Version conflict",
  },
  {
    source: "Payroll_May_manual.xlsx",
    tag: "Manual",
    body: "Recalculate OT, commission, EPF & SOCSO one by one before payday.",
    issue: "Hours of re-checking",
  },
  {
    source: "Cashbook · Paper receipts",
    tag: "Unreconciled",
    body: "3 branch receipts still missing from Friday — key in again later.",
    issue: "Double data entry",
  },
];

export default function HeroSystem() {
  const [mode, setMode] = useState<Mode>("after");
  const [activeId, setActiveId] = useState<string>(EVENTS[0].id);

  const selected = EVENTS.find((e) => e.id === activeId) ?? EVENTS[0];

  return (
    <div className="sys" aria-label="Interactive comparison of spreadsheets versus one unified system">
      <div className="sys-bar">
        <div className="sys-id">
          <span className="sys-mark" aria-hidden="true" />
          <span>{mode === "after" ? "One system · 26 branches" : "4 disconnected tools"}</span>
        </div>

        <div className="sys-toggle" role="tablist" aria-label="System state">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "before"}
            className={mode === "before" ? "is-active" : undefined}
            onClick={() => setMode("before")}
          >
            Before
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "after"}
            className={mode === "after" ? "is-active" : undefined}
            onClick={() => setMode("after")}
          >
            After
          </button>
        </div>
      </div>

      {mode === "after" ? (
        <div className="sys-body" key="after">
          <div className="sys-summary" aria-label="Live totals">
            <div>
              <span className="sys-k">Sync cycle</span>
              <strong className="sys-v">10 min</strong>
            </div>
            <div>
              <span className="sys-k">Double entry</span>
              <strong className="sys-v">Zero</strong>
            </div>
            <div>
              <span className="sys-k">Compliance</span>
              <strong className="sys-v">MyInvois</strong>
            </div>
          </div>

          <div className="sys-list" role="listbox" aria-label="Inspect automated workflows">
            {EVENTS.map((ev) => {
              const active = ev.id === selected.id;
              return (
                <button
                  key={ev.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`sys-row${active ? " is-selected" : ""}`}
                  onClick={() => setActiveId(ev.id)}
                >
                  <span className="sys-ref">{ev.ref}</span>
                  <span className="sys-main">
                    <span className="sys-title">{ev.title}</span>
                    <span className="sys-sub">{ev.branch}</span>
                  </span>
                  <span className="sys-num">
                    <span className="sys-amount">{ev.amount}</span>
                    <span className="sys-status">{ev.status}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="sys-trace" aria-live="polite">
            <div className="sys-trace-head">
              <span>Automated output · {selected.ref}</span>
              <span>{selected.note}</span>
            </div>
            <ol className="sys-steps">
              {selected.trace.map((step, idx) => (
                <li key={step}>
                  <span className="sys-step-no">0{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="sys-body sys-body-chaos" key="before">
          <div className="sys-chaos-grid">
            {CHAOS_ITEMS.map((item) => (
              <article className="sys-slip" key={item.source}>
                <div className="sys-slip-head">
                  <span className="sys-slip-src">{item.source}</span>
                  <span className="sys-slip-tag">{item.tag}</span>
                </div>
                <p className="sys-slip-body">{item.body}</p>
                <span className="sys-slip-issue">{item.issue}</span>
              </article>
            ))}
          </div>

          <div className="sys-chaos-foot">
            <span>4 places to check · manual re-entry every week</span>
            <button type="button" className="sys-fix-btn" onClick={() => setMode("after")}>
              Unify into one system →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
