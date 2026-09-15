import {
  attenuationFormulas,
  measurementExcerpts,
  physicsIntro,
  physicsUpshot,
  measurementIntro,
} from "@/data/distance";
import { jurisdictions, ANCHOR_ID } from "@/data/jurisdictions";

// Only jurisdictions this volume actually covers get a row — South Korea's
// measurement practice isn't in the source dossier, so it's omitted rather
// than guessed.
const covered = jurisdictions.filter((j) => j.measuredWhere !== undefined);

export default function Distance() {
  return (
    <section id="distance" className="rule-top" style={{ background: "var(--surface-2)" }}>
      <div className="wrap">
        <p className="eyebrow">Volume IV · Distance</p>
        <h2 className="h2">Distance, decibels, and the point of concern</h2>
        <p className="lede">
          How far from a construction site does noise stop mattering, legally
          speaking — and does the rulebook even ask the question? {physicsIntro}
        </p>
        <p className="lede" style={{ marginTop: 14 }}>
          {physicsUpshot}
        </p>

        <div
          className="scroll-x"
          style={{
            marginTop: 26,
            background: "var(--surface-1)",
            border: "1px solid var(--rule)",
            borderRadius: 10,
          }}
        >
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, minWidth: 620 }}>
            <thead>
              <tr>
                {["Standard / methodology", "Formula", "dB lost per doubling"].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attenuationFormulas.map((f, i) => (
                <tr key={f.standard} style={{ background: i % 2 ? "var(--surface-2)" : "transparent" }}>
                  <td style={td}>{f.standard}</td>
                  <td style={{ ...td, fontFamily: "var(--font-mono)" }}>{f.formula}</td>
                  <td style={td}>{f.dbPerDoubling.toFixed(1)} dB</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Every formula above is a variant of the same &ldquo;20-log&rdquo;
          relationship — what differs is the constant added for the source&rsquo;s
          geometry and the ground surface.
        </p>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 600,
            margin: "40px 0 12px",
          }}
        >
          Where each jurisdiction actually measures
        </h3>
        <p className="lede">{measurementIntro}</p>

        <div
          className="scroll-x"
          style={{
            marginTop: 20,
            background: "var(--surface-1)",
            border: "1px solid var(--rule)",
            borderRadius: 10,
          }}
        >
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, minWidth: 720 }}>
            <thead>
              <tr>
                {["Jurisdiction", "Measured where", "Distance built into the limit?"].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {covered.map((j) => {
                const anchor = j.id === ANCHOR_ID;
                return (
                  <tr key={j.id} style={{ background: anchor ? "var(--accent-soft)" : "transparent" }}>
                    <th
                      scope="row"
                      style={{ ...td, fontWeight: anchor ? 700 : 600, color: anchor ? "var(--accent)" : "var(--ink-1)" }}
                    >
                      {j.name}
                    </th>
                    <td style={td}>{j.measuredWhere}</td>
                    <td style={td}>{j.distanceBuiltIn}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="note">
          South Korea&rsquo;s measurement practice is not covered by this
          volume&rsquo;s sources and is omitted here rather than estimated.
        </p>

        <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
          {measurementExcerpts.map((e) => (
            <blockquote
              key={e.source}
              style={{
                margin: 0,
                borderLeft: "3px solid var(--accent)",
                background: "var(--surface-1)",
                borderRadius: "0 8px 8px 0",
                padding: "14px 18px",
              }}
            >
              <p style={{ margin: 0, fontStyle: "italic", fontSize: 14, color: "var(--ink-1)" }}>
                &ldquo;{e.quote}&rdquo;
              </p>
              <cite
                style={{
                  display: "block",
                  marginTop: 6,
                  fontSize: 12,
                  fontStyle: "normal",
                  color: "var(--ink-3)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                — {e.source}
              </cite>
            </blockquote>
          ))}
        </div>

        <p className="note">
          China, Japan, and Taiwan&rsquo;s boundary-based approach means the
          legal figure carries no information about how far the nearest
          resident actually lives. Singapore, Hong Kong, Germany, and the BS
          5228-derived UK/Australian methodology all build distance into the
          assessment directly.
        </p>
      </div>
    </section>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "13px 16px",
  fontSize: 10.5,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
  fontWeight: 600,
  borderBottom: "1px solid var(--rule-strong)",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "13px 16px",
  borderBottom: "1px solid var(--rule)",
  color: "var(--ink-2)",
  verticalAlign: "top",
  textAlign: "left",
};
