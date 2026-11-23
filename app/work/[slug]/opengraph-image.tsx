import { ImageResponse } from "next/og";
import { cases } from "@/lib/cases";
import { site } from "@/lib/content";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function CaseOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug) ?? cases[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: 38, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            <span>Shah</span>
            <span
              style={{
                display: "flex",
                width: 8,
                height: 8,
                background: "#ffffff",
                marginLeft: 4,
                marginBottom: 5,
              }}
            />
          </div>
          <div style={{ fontSize: 22, color: "#9a9a9a" }}>{`${c.kind} · Case study`}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
            }}
          >
            {c.title}
          </div>
          <div style={{ fontSize: 27, color: "#b5b5b5", maxWidth: 940, lineHeight: 1.35 }}>
            {c.lead}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #333333",
            paddingTop: 24,
            width: "100%",
          }}
        >
          {c.facts.slice(0, 4).map((f) => (
            <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em" }}>{f.value}</span>
              <span style={{ fontSize: 18, color: "#9a9a9a" }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
