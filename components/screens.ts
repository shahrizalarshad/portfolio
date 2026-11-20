// Skrin UI yang dilukis terus atas canvas, lepas tu jadi texture untuk panel 3D.
// Nak guna screenshot sebenar nanti: ganti fungsi draw dengan ctx.drawImage(gambar, 0, 0, W, H).

const FONT = '"Bricolage Grotesque Variable", system-ui, sans-serif';

type Ctx = CanvasRenderingContext2D;

export type Screen = {
  key: string;
  size: [number, number]; // lebar, tinggi dalam unit 3D
  px: [number, number]; // resolusi canvas
  pos: [number, number, number]; // kedudukan dalam susunan
  dark: boolean;
  draw: (ctx: Ctx, W: number, H: number) => void;
};

const light = { bg: "#ffffff", ink: "#000000", grey: "#8a8a8a", line: "#e4e4e4", soft: "#f4f4f4" };
const dark = { bg: "#000000", ink: "#ffffff", grey: "#9a9a9a", line: "#2b2b2b", soft: "#161616" };

function text(ctx: Ctx, s: string, x: number, y: number, size: number, color: string, weight = 400, align: CanvasTextAlign = "left") {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(s, x, y);
}

function box(ctx: Ctx, x: number, y: number, w: number, h: number, r: number, fill?: string, stroke?: string) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function rule(ctx: Ctx, x1: number, y: number, x2: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x1, y, x2 - x1, 2);
}

function drawDashboard(ctx: Ctx, W: number, H: number) {
  const c = light;
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);

  // sidebar
  ctx.fillStyle = c.soft;
  ctx.fillRect(0, 0, 270, H);
  box(ctx, 44, 48, 44, 44, 12, c.ink);
  const nav = ["Overview", "Orders", "Stock", "Invoices", "Staff"];
  nav.forEach((n, i) => {
    const y = 170 + i * 64;
    if (i === 0) box(ctx, 28, y - 38, 214, 56, 14, c.ink);
    text(ctx, n, 52, y, 26, i === 0 ? c.bg : c.grey, i === 0 ? 600 : 400);
  });

  // header
  const x0 = 330;
  text(ctx, "Overview", x0, 100, 52, c.ink, 600);
  box(ctx, W - 250, 58, 190, 54, 27, undefined, c.line);
  text(ctx, "This month", W - 155, 94, 24, c.ink, 400, "center");

  // tiles
  const tiles = [
    { label: "Orders", value: "128", inverted: false },
    { label: "Revenue", value: "RM 48,250", inverted: true },
    { label: "Low stock", value: "6 items", inverted: false },
  ];
  const tw = (W - x0 - 60 - 2 * 28) / 3;
  tiles.forEach((t, i) => {
    const x = x0 + i * (tw + 28);
    box(ctx, x, 160, tw, 190, 22, t.inverted ? c.ink : c.bg, t.inverted ? undefined : c.line);
    text(ctx, t.label, x + 30, 216, 24, t.inverted ? "#b5b5b5" : c.grey);
    text(ctx, t.value, x + 30, 306, 54, t.inverted ? c.bg : c.ink, 600);
  });

  // chart
  text(ctx, "Orders per week", x0, 430, 26, c.ink, 600);
  const bars = [0.34, 0.5, 0.42, 0.6, 0.48, 0.7, 0.56, 0.66, 0.8, 0.62, 0.86, 1];
  const baseY = H - 70;
  const maxH = 330;
  const gap = 20;
  const bw = (W - x0 - 60 - gap * (bars.length - 1)) / bars.length;
  bars.forEach((b, i) => {
    const h = b * maxH;
    box(ctx, x0 + i * (bw + gap), baseY - h, bw, h, 10, i === bars.length - 1 ? c.ink : "#dcdcdc");
  });
  rule(ctx, x0, baseY + 10, W - 60, c.line);
}

function drawOrders(ctx: Ctx, W: number, H: number) {
  const c = light;
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);
  const p = 56;
  text(ctx, "Orders", p, 104, 50, c.ink, 600);
  box(ctx, W - p - 190, 60, 190, 58, 29, c.ink);
  text(ctx, "New order", W - p - 95, 98, 24, c.bg, 500, "center");

  const cols = [p, 250, 640, W - p];
  const head = 190;
  text(ctx, "Order", cols[0], head, 22, c.grey);
  text(ctx, "Customer", cols[1], head, 22, c.grey);
  text(ctx, "Total", cols[2], head, 22, c.grey);
  text(ctx, "Status", cols[3], head, 22, c.grey, 400, "right");
  rule(ctx, p, head + 22, W - p, c.ink);

  const rows = [
    ["#1042", "Kedai Runcit Maju", "RM 1,840", "Paid"],
    ["#1041", "Bengkel Jaya", "RM 620", "Pending"],
    ["#1040", "Kafe Selera", "RM 2,310", "Paid"],
    ["#1039", "Butik Seri", "RM 455", "Paid"],
    ["#1038", "Klinik Harmoni", "RM 980", "Pending"],
  ];
  rows.forEach((r, i) => {
    const y = head + 96 + i * 84;
    text(ctx, r[0], cols[0], y, 27, c.grey);
    text(ctx, r[1], cols[1], y, 27, c.ink, 500);
    text(ctx, r[2], cols[2], y, 27, c.ink);
    const paid = r[3] === "Paid";
    box(ctx, cols[3] - 138, y - 36, 138, 50, 25, paid ? c.ink : undefined, paid ? undefined : c.line);
    text(ctx, r[3], cols[3] - 69, y - 3, 22, paid ? c.bg : c.ink, 500, "center");
    rule(ctx, p, y + 30, W - p, c.line);
  });
}

function drawInvoice(ctx: Ctx, W: number, H: number) {
  const c = dark;
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);
  const p = 52;
  text(ctx, "Invoice", p, 92, 26, c.grey);
  text(ctx, "INV-0128", p, 162, 60, c.ink, 600);
  text(ctx, "Kedai Runcit Maju", p, 214, 26, c.grey);
  rule(ctx, p, 260, W - p, c.line);

  const items = [
    ["Stock module", "RM 900.00"],
    ["Invoice module", "RM 640.00"],
    ["Staff training", "RM 300.00"],
  ];
  items.forEach((it, i) => {
    const y = 332 + i * 76;
    text(ctx, it[0], p, y, 27, c.ink);
    text(ctx, it[1], W - p, y, 27, c.grey, 400, "right");
  });
  rule(ctx, p, 540, W - p, c.line);
  text(ctx, "Total", p, 612, 26, c.grey);
  text(ctx, "RM 1,840.00", p, 690, 62, c.ink, 600);

  box(ctx, p, H - 130, W - p * 2, 78, 39, c.ink);
  text(ctx, "Mark as paid", W / 2, H - 81, 27, c.bg, 600, "center");
}

function drawForm(ctx: Ctx, W: number, H: number) {
  const c = light;
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);
  const p = 48;
  text(ctx, "New order", p, 100, 46, c.ink, 600);
  const fields = [
    ["Customer", "Kafe Selera"],
    ["Item", "Arabica beans, 5 kg"],
  ];
  fields.forEach((f, i) => {
    const y = 170 + i * 150;
    text(ctx, f[0], p, y, 22, c.grey);
    box(ctx, p, y + 18, W - p * 2, 76, 16, undefined, i === 1 ? c.ink : c.line);
    text(ctx, f[1], p + 26, y + 67, 26, c.ink);
  });
  box(ctx, p, H - 122, W - p * 2, 76, 38, c.ink);
  text(ctx, "Save order", W / 2, H - 74, 26, c.bg, 600, "center");
}

export const screens: Screen[] = [
  { key: "dashboard", size: [4.4, 2.83], px: [1400, 900], pos: [0, 0.25, -0.6], dark: false, draw: drawDashboard },
  { key: "orders", size: [3.1, 2.07], px: [1000, 667], pos: [1.15, -0.75, 0.2], dark: false, draw: drawOrders },
  { key: "invoice", size: [1.55, 2.2], px: [600, 852], pos: [-1.75, -0.45, 0.9], dark: true, draw: drawInvoice },
  { key: "form", size: [1.4, 1.5], px: [560, 600], pos: [1.9, 1.05, 1.0], dark: false, draw: drawForm },
];

export const SCREEN_FONT = `600 40px ${FONT}`;
