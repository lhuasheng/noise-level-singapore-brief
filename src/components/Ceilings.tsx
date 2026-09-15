"use client";

import { useState } from "react";
import { jurisdictions, ANCHOR_ID } from "@/data/jurisdictions";

// Only jurisdictions that publish a fixed numeric ceiling can be plotted.
// The ones that do not are named beneath the chart rather than estimated.
const plotted = jurisdictions.filter(
  (j) => j.ceiling.day !== null || j.ceiling.night !== null,
);
const omitted = jurisdictions.filter(
  (j) => j.ceiling.day === null && j.ceiling.night === null,
);

const CH = 300;
const MAXV = 100;
// Vertical headroom so the axis unit label clears the topmost gridline label.
const TOP = 26;

export default function Ceilings() {
  const [tip, setTip] = useState<{ id: string; which: "day" | "night" } | null>(
    null,
  );
  const tipJ = plotted.find((j) => j.id === tip?.id);

  return (
    <section id="ceilings" className="rule-top">
      <div className="wrap">
        <p className="eyebrow">The ceiling</p>
        <h2 className="h2">Noise ceilings, side by side</h2>
        <p className="lede">
          Daytime versus night-time residential limits in dB(A). Hong Kong, the
          UK and Australia set no fixed statutory figure to plot — their bars
          are omitted rather than estimated, which is itself the finding.
        </p>

        {/* Legend */}
        <ul
          style={{
            display: "flex",
            gap: 20,
            listStyle: "none",
            padding: 0,
            margin: "22px 0 14px",
          }}
        >
          {(
            [
              ["day", "Daytime limit", "var(--ramp-day)"],
              ["night", "Night-time limit", "var(--ramp-night)"],
            ] as const
          ).map(([k, label, c]) => (
            <li key={k} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span
                aria-hidden="true"
                style={{
                  width: 16, height: 16, borderRadius: 3,
                  background: c, display: "inline-block", flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{label}</span>
            </li>
          ))}
        </ul>

        <figure style={{ margin: 0 }}>
          <div
            className="scroll-x"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--rule)",
              borderRadius: 10,
              padding: "20px 12px 8px",
            }}
          >
            <div style={{ minWidth: 640 }}>
              <svg
                viewBox={`0 0 700 ${CH + TOP + 64}`}
                width="100%"
                role="img"
                aria-label="Grouped bar chart of daytime and night-time construction-noise limits in decibels for seven jurisdictions."
                style={{ display: "block", overflow: "visible" }}
              >
                {/* gridlines */}
                {[0, 25, 50, 75, 100].map((g) => {
                  const gy = CH - (g / MAXV) * CH + TOP;
                  return (
                    <g key={g}>
                      <line
                        x1={44} y1={gy} x2={690} y2={gy}
                        stroke={g === 0 ? "var(--rule-strong)" : "var(--rule)"}
                        strokeWidth="1"
                      />
                      <text
                        x={36} y={gy + 4}
                        fontSize="11" fill="var(--ink-3)" textAnchor="end"
                      >
                        {g}
                      </text>
                    </g>
                  );
                })}
                <text x={14} y={12} fontSize="11" fill="var(--ink-3)">
                  dB(A)
                </text>

                {plotted.map((j, i) => {
                  const slot = 646 / plotted.length;
                  const gx = 50 + i * slot;
                  const bw = Math.min(26, slot / 3);
                  const isAnchor = j.id === ANCHOR_ID;
                  const bars = [
                    { key: "day" as const, v: j.ceiling.day, fill: "var(--ramp-day)" },
                    { key: "night" as const, v: j.ceiling.night, fill: "var(--ramp-night)" },
                  ];
                  return (
                    <g key={j.id}>
                      {bars.map((b, bi) => {
                        if (b.v === null) return null;
                        const hgt = (b.v / MAXV) * CH;
                        const bx = gx + bi * (bw + 2);
                        const by = CH - hgt + TOP;
                        return (
                          <g
                            key={b.key}
                            onMouseEnter={() => setTip({ id: j.id, which: b.key })}
                            onMouseLeave={() => setTip(null)}
                            style={{ cursor: "pointer" }}
                          >
                            <rect
                              x={bx - 4} y={TOP} width={bw + 8} height={CH}
                              fill="transparent"
                            />
                            <rect
                              x={bx} y={by} width={bw} height={hgt}
                              rx="4"
                              fill={isAnchor && b.key === "day" ? "var(--accent)" : b.fill}
                              opacity={tip && tip.id !== j.id ? 0.45 : 1}
                            />
                            <text
                              x={bx + bw / 2} y={by - 7}
                              fontSize="11" fontWeight={isAnchor ? 700 : 500}
                              fill="var(--ink-2)" textAnchor="middle"
                            >
                              {b.v}
                            </text>
                          </g>
                        );
                      })}
                      <text
                        x={gx + bw + 1}
                        y={CH + TOP + 22}
                        fontSize="11.5"
                        fontWeight={isAnchor ? 700 : 400}
                        fill={isAnchor ? "var(--accent)" : "var(--ink-2)"}
                        textAnchor="middle"
                      >
                        {j.name.replace(" (NYC)", "")}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div
            aria-live="polite"
            style={{
              marginTop: 14,
              minHeight: 46,
              fontSize: 13,
              color: "var(--ink-2)",
            }}
          >
            {tipJ ? (
              <>
                <strong style={{ color: "var(--ink-1)" }}>{tipJ.name}</strong> —{" "}
                {tipJ.ceiling.note}
              </>
            ) : (
              <span style={{ color: "var(--ink-3)" }}>
                Hover a bar for how that jurisdiction&rsquo;s number is defined.
              </span>
            )}
          </div>
        </figure>

        <p className="note">
          <strong style={{ color: "var(--ink-2)" }}>
            No fixed numeric ceiling:
          </strong>{" "}
          {omitted.map((j) => j.name).join(", ")}. The UK judges compliance
          against a &ldquo;best practicable means&rdquo; reasonableness test;
          Australia (NSW) uses a relative limit of ≤10 dB above background; Hong
          Kong&rsquo;s ordinance sets no daytime cap and gates the night with a
          permit instead.
        </p>

        {/* Table view — identity and value are never colour-alone */}
        <details style={{ marginTop: 18 }}>
          <summary
            style={{
              cursor: "pointer",
              fontSize: 13,
              color: "var(--ink-2)",
              fontWeight: 500,
            }}
          >
            View this chart as a table
          </summary>
          <div className="scroll-x" style={{ marginTop: 12 }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                fontSize: 13,
                minWidth: 420,
              }}
            >
              <thead>
                <tr>
                  {["Jurisdiction", "Daytime dB(A)", "Night dB(A)"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        borderBottom: "1px solid var(--rule-strong)",
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jurisdictions.map((j) => (
                  <tr key={j.id}>
                    <td style={cell}>{j.name}</td>
                    <td style={cell}>{j.ceiling.day ?? "— none set"}</td>
                    <td style={cell}>{j.ceiling.night ?? "— none set"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  );
}

const cell: React.CSSProperties = {
  padding: "8px 12px",
  borderBottom: "1px solid var(--rule)",
  color: "var(--ink-2)",
};
