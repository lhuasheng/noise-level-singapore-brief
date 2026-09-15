"use client";

import { useState } from "react";
import { weekday, type Band } from "@/data/narrative";

const STATE = {
  permitted: { fill: "var(--status-permitted)", label: "Fully permitted", pattern: "none" },
  capped: { fill: "var(--status-capped)", label: "Permitted, tighter cap", pattern: "url(#hatch-capped)" },
  banned: { fill: "var(--status-banned)", label: "Banned without a permit", pattern: "url(#hatch-banned)" },
} as const;

const TRACK_H = 38;

export default function Weekday() {
  const [tip, setTip] = useState<{ row: string; band: Band } | null>(null);

  return (
    <section id="weekday" className="rule-top" style={{ background: "var(--surface-2)" }}>
      <div className="wrap">
        <p className="eyebrow">The day</p>
        <h2 className="h2">A typical weekday, hour by hour</h2>
        <p className="lede">
          Three Chinese-majority cities, three very different rulebooks.
          Singapore is the only one with no red band at all: work is never fully
          banned on a normal weekday, only capped ever more tightly as the night
          goes on.
        </p>

        <div style={{ marginTop: 32, display: "grid", gap: 20 }}>
          {weekday.map((row) => (
            <div key={row.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontWeight: row.id === "singapore" ? 700 : 600,
                    fontSize: 15,
                    color: row.id === "singapore" ? "var(--accent)" : "var(--ink-1)",
                  }}
                >
                  {row.name}
                </span>
              </div>

              <svg
                viewBox={`0 0 960 ${TRACK_H}`}
                width="100%"
                height={TRACK_H}
                preserveAspectRatio="none"
                role="img"
                aria-label={`${row.name}: ${row.bands
                  .map((b) => `${b.from}:00 to ${b.to}:00 ${STATE[b.state].label.toLowerCase()}`)
                  .join("; ")}`}
                style={{ display: "block", borderRadius: 6, overflow: "hidden" }}
              >
                <defs>
                  <pattern id="hatch-capped" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="8" height="8" fill="var(--status-capped)" />
                    <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(0,0,0,0.26)" strokeWidth="3" />
                  </pattern>
                  <pattern id="hatch-banned" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                    <rect width="6" height="6" fill="var(--status-banned)" />
                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />
                  </pattern>
                </defs>

                {row.bands.map((b, i) => {
                  const bx = (b.from / 24) * 960;
                  const bw = ((b.to - b.from) / 24) * 960;
                  const isTip = tip?.row === row.id && tip.band.from === b.from;
                  return (
                    <rect
                      key={i}
                      x={bx + (i === 0 ? 0 : 1)}
                      y={0}
                      width={Math.max(bw - (i === 0 ? 1 : 2), 1)}
                      height={TRACK_H}
                      fill={STATE[b.state].pattern === "none" ? STATE[b.state].fill : STATE[b.state].pattern}
                      opacity={tip && !isTip ? 0.55 : 1}
                      onMouseEnter={() => setTip({ row: row.id, band: b })}
                      onMouseLeave={() => setTip(null)}
                      style={{ cursor: "pointer" }}
                    />
                  );
                })}
              </svg>

              {tip?.row === row.id && (
                <div
                  role="status"
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: "var(--ink-1)",
                    background: "var(--surface-1)",
                    border: "1px solid var(--rule)",
                    borderRadius: 6,
                    padding: "8px 12px",
                    display: "inline-block",
                  }}
                >
                  <strong>
                    {String(tip.band.from).padStart(2, "0")}:00–
                    {String(tip.band.to).padStart(2, "0")}:00
                  </strong>{" "}
                  — {tip.band.label}
                </div>
              )}
            </div>
          ))}

          {/* hour axis */}
          <div
            aria-hidden="true"
            style={{
              position: "relative",
              height: 18,
              fontSize: 11,
              color: "var(--ink-3)",
            }}
          >
            {[0, 6, 12, 18, 24].map((h) => (
              <span
                key={h}
                style={{
                  position: "absolute",
                  left: `${(h / 24) * 100}%`,
                  transform:
                    h === 0 ? "none" : h === 24 ? "translateX(-100%)" : "translateX(-50%)",
                }}
              >
                {String(h).padStart(2, "0")}:00
              </span>
            ))}
          </div>
        </div>

        {/* Legend — status colour never carries meaning alone */}
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            listStyle: "none",
            padding: 0,
            margin: "26px 0 0",
          }}
        >
          {(["permitted", "capped", "banned"] as const).map((k) => (
            <li key={k} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <svg width="16" height="16" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect
                  width="16" height="16" rx="3"
                  fill={STATE[k].pattern === "none" ? STATE[k].fill : STATE[k].pattern}
                />
              </svg>
              <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
                {STATE[k].label}
              </span>
            </li>
          ))}
        </ul>

        <div style={{ display: "grid", gap: 10, marginTop: 26 }}>
          {weekday.map((r) => (
            <p key={r.id} className="note" style={{ margin: 0 }}>
              <strong style={{ color: "var(--ink-2)" }}>{r.name}.</strong>{" "}
              {r.note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
