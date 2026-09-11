import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/siteConfig";

export const runtime = "edge";
export const alt = `${siteConfig.company.name} — ${siteConfig.company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0e0c",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c8f542",
          }}
        >
          Creator & Brand Growth Agency
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#c8f542",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {siteConfig.company.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 48,
              fontWeight: 600,
              color: "#f2f4ef",
              letterSpacing: "-0.03em",
            }}
          >
            {siteConfig.company.tagline}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#a8b0a0", marginTop: 8 }}>
            Gaming · Esports · Crypto · Sports · Fintech
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#6d7668" }}>
          India · Global
        </div>
      </div>
    ),
    { ...size }
  );
}
