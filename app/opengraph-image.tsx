import { ImageResponse } from "next/og";
import { intro, site } from "@/lib/content";

export const alt = `${site.name} — Systems, websites and landing pages`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#000000",
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
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: 42, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            <span>Shah</span>
            <span
              style={{
                display: "flex",
                width: 9,
                height: 9,
                background: "#000000",
                marginLeft: 4,
                marginBottom: 5,
              }}
            />
          </div>
          <div style={{ fontSize: 22, color: "#6f6f6f" }}>{site.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: "-0.045em",
            }}
          >
            <span>I build the software</span>
            <span>your business runs on.</span>
          </div>
          <div style={{ fontSize: 28, color: "#6f6f6f", maxWidth: 880, lineHeight: 1.35 }}>
            {intro}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #000000",
            paddingTop: 24,
            fontSize: 22,
            color: "#000000",
          }}
        >
          <span>ERP systems · Websites · Landing pages</span>
          <span style={{ color: "#6f6f6f" }}>SAP · Laravel · Next.js</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
