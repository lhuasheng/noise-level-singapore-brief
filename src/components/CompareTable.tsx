"use client";

import { useMemo, useState } from "react";
import { jurisdictions, ANCHOR_ID, type Jurisdiction } from "@/data/jurisdictions";

type SortKey = "name" | "precision" | "enforcement";

const postureLabel: Record<Jurisdiction["posture"], string> = {
  proactive: "Proactive",
  permit: "Permit-gated",
  negotiated: "Negotiated",
  reactive: "Complaint-led",
};

export default function CompareTable() {
  const [sort, setSort] = useState<SortKey>("name");

  const rows = useMemo(() => {
    const copy = [...jurisdictions];
    if (sort === "name") return copy.sort((a, b) => a.name.localeCompare(b.name));
    return copy.sort((a, b) => b[sort] - a[sort]);
  }, [sort]);

  return (
    <section id="compare" className="rule-top">
      <div className="wrap">
        <p className="eyebrow">Compare</p>
        <h2 className="h2">Ten regulatory models, side by side</h2>
        <p className="lede">
          Singapore&rsquo;s model — exact, tiered decibel limits, mandatory
          real-time noise meters, and centrally issued fines — sits at one end
          of a spectrum that runs through Hong Kong, China, Japan, Taiwan, South
          Korea, Germany, the United Kingdom, Australia, and the fragmented,
          city-by-city United States.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            margin: "26px 0 14px",
          }}
        >
          <span style={{ fontSize: 12, color: "var(--ink-3)" }}>Sort by</span>
          {(
            [
              ["name", "Name"],
              ["precision", "Numeric precision"],
              ["enforcement", "Enforcement"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              aria-pressed={sort === k}
              style={{
                fontSize: 12.5,
                padding: "6px 12px",
                borderRadius: 999,
                cursor: "pointer",
                border: "1px solid var(--rule-strong)",
                background: sort === k ? "var(--ink-1)" : "transparent",
                color: sort === k ? "var(--surface-0)" : "var(--ink-2)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Wide screens: a real table. Narrow: stacked cards. */}
        <div className="scroll-x compare-table">
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              minWidth: 900,
              fontSize: 13.5,
              background: "var(--surface-1)",
              border: "1px solid var(--rule)",
              borderRadius: 10,
            }}
          >
            <caption
              style={{
                captionSide: "bottom",
                textAlign: "left",
                fontSize: 12,
                color: "var(--ink-3)",
                paddingTop: 12,
              }}
            >
              Singapore is highlighted as the anchor case throughout.
            </caption>
            <thead>
              <tr>
                {[
                  "Jurisdiction",
                  "Legal instrument",
                  "Default hours",
                  "Residential ceiling",
                  "Enforcement posture",
                ].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((j) => {
                const anchor = j.id === ANCHOR_ID;
                return (
                  <tr
                    key={j.id}
                    style={{
                      background: anchor ? "var(--accent-soft)" : "transparent",
                    }}
                  >
                    <th scope="row" style={{ ...td, fontWeight: 700, color: "var(--ink-1)" }}>
                      {j.name}
                      {anchor && (
                        <span
                          style={{
                            display: "block",
                            fontSize: 10.5,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            fontWeight: 700,
                            marginTop: 3,
                          }}
                        >
                          Anchor case
                        </span>
                      )}
                    </th>
                    <td style={td}>{j.instrument}</td>
                    <td style={td}>{j.dayHours}</td>
                    <td style={td}>
                      {j.ceiling.day === null && j.ceiling.night === null
                        ? "No fixed ceiling"
                        : `${j.ceiling.day ?? "—"} day / ${j.ceiling.night ?? "—"} night dB(A)`}
                    </td>
                    <td style={td}>{postureLabel[j.posture]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="compare-cards" style={{ display: "none", gap: 14 }}>
          {rows.map((j) => {
            const anchor = j.id === ANCHOR_ID;
            return (
              <article
                key={j.id}
                style={{
                  background: anchor ? "var(--accent-soft)" : "var(--surface-1)",
                  border: `1px solid ${anchor ? "var(--accent)" : "var(--rule)"}`,
                  borderRadius: 10,
                  padding: "18px 18px",
                }}
              >
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
                  {j.name}
                </h3>
                <dl style={{ margin: "12px 0 0", display: "grid", gap: 10 }}>
                  {[
                    ["Instrument", j.instrument],
                    ["Default hours", j.dayHours],
                    [
                      "Ceiling",
                      j.ceiling.day === null && j.ceiling.night === null
                        ? "No fixed ceiling"
                        : `${j.ceiling.day ?? "—"} day / ${j.ceiling.night ?? "—"} night dB(A)`,
                    ],
                    ["Enforcement", postureLabel[j.posture]],
                    ["Penalty", j.penalty],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt
                        style={{
                          fontSize: 10.5,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--ink-3)",
                          fontWeight: 600,
                        }}
                      >
                        {k}
                      </dt>
                      <dd style={{ margin: "2px 0 0", fontSize: 13.5, color: "var(--ink-2)" }}>
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>

        <p className="note">
          Figures are the general-case, residential-adjacent thresholds cited in
          each regulator&rsquo;s own published guidance. Most regimes carve out
          further exceptions for emergency, infrastructure-critical, or minor
          works.
        </p>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .compare-table { display: none; }
          .compare-cards { display: grid !important; }
        }
      `}</style>
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
  padding: "15px 16px",
  borderBottom: "1px solid var(--rule)",
  color: "var(--ink-2)",
  verticalAlign: "top",
  textAlign: "left",
};
