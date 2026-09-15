import { ImageResponse } from "next/og";

export const alt =
  "Construction Noise Regulation: Singapore in International Context";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the Canva share card: charcoal ground, warm off-white type, a single
// burnt-orange accent on Singapore, and the weekday timeline as a bottom strip.
export default async function Image() {
  const strip: { w: number; c: string }[] = [
    { w: 7, c: "#fab219" },
    { w: 12, c: "#0ca30c" },
    { w: 2, c: "#fab219" },
    { w: 3, c: "#fab219" },
    { w: 7, c: "#d03b3b" },
    { w: 12, c: "#0ca30c" },
    { w: 5, c: "#d03b3b" },
    { w: 6, c: "#d03b3b" },
    { w: 6, c: "#0ca30c" },
    { w: 2, c: "#d03b3b" },
    { w: 8, c: "#0ca30c" },
    { w: 2, c: "#d03b3b" },
  ];
  const codes = ["SG", "HK", "CN", "JP", "TW", "KR", "DE", "UK", "AU", "US"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1b1b1b",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 3,
              color: "#8b8880",
              marginBottom: 28,
            }}
          >
            COMPARATIVE REGULATORY DOSSIER · 10 JURISDICTIONS
          </div>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              color: "#f7f5f1",
              fontWeight: 700,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            Construction Noise Regulation: Singapore in International Context
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#b9b6ae",
              marginTop: 26,
              maxWidth: 900,
            }}
          >
            How ten jurisdictions define, measure, and enforce acceptable
            construction noise.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "100%", height: 18 }}>
            {strip.map((s, i) => (
              <div
                key={i}
                style={{
                  flexGrow: s.w,
                  background: s.c,
                  marginRight: i === strip.length - 1 ? 0 : 2,
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 20, gap: 26 }}>
            {codes.map((c) => (
              <div
                key={c}
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: c === "SG" ? "#eb6834" : "#8b8880",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
