"use client";

import { useState } from "react";
import { equipmentSwl } from "@/data/distance";

const sorted = [...equipmentSwl].sort((a, b) => b.swlMax - a.swlMax);

const MINV = 90;
const MAXV = 125;
const W = 700;
const ROWH = 34;
const LABELW = 260;
const PLOTW = W - LABELW - 60;

const scale = (v: number) => ((v - MINV) / (MAXV - MINV)) * PLOTW;

export default function EquipmentLoudness() {
  const [hover, setHover] = useState<string | null>(null);
  const hovered = sorted.find((e) => e.name === hover);
  const H = sorted.length * ROWH + 40;

  return (
    <section id="equipment" className="rule-top">
      <div className="wrap">
        <p className="eyebrow">How loud construction equipment actually is</p>
        <h2 className="h2">Sound power level at the source</h2>
        <p className="lede">
          Sound Power Level (SWL) describes a machine&rsquo;s total acoustic
          output, independent of distance; regulators then apply the
          distance-attenuation formulas to predict what a specific machine
          sounds like at a specific distance. Figures are drawn directly from
          BS 5228 reference tables and Hong Kong EPD technical memoranda, as
          reproduced in real environmental impact assessments.
        </p>

        <figure style={{ margin: "28px 0 0" }}>
          <div
            className="scroll-x"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--rule)",
              borderRadius: 10,
              padding: "16px 12px 8px",
            }}
          >
            <div style={{ minWidth: 640 }}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                role="img"
                aria-label="Horizontal bar chart of sound power levels for ten pieces of construction equipment, ranging from 96 to 122 dB(A)."
                style={{ display: "block", overflow: "visible" }}
              >
                {[90, 100, 110, 120].map((g) => {
                  const gx = LABELW + scale(g);
                  return (
                    <g key={g}>
                      <line x1={gx} y1={0} x2={gx} y2={H - 24} stroke="var(--rule)" strokeWidth="1" />
                      <text x={gx} y={H - 8} fontSize="11" fill="var(--ink-3)" textAnchor="middle">
                        {g}
                      </text>
                    </g>
                  );
                })}

                {sorted.map((e, i) => {
                  const y = i * ROWH + 8;
                  const barX = LABELW;
                  const barMaxW = scale(e.swlMax);
                  const isHover = hover === e.name;
                  return (
                    <g
                      key={e.name}
                      onMouseEnter={() => setHover(e.name)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(e.name)}
                      onBlur={() => setHover(null)}
                      tabIndex={0}
                      role="img"
                      aria-label={`${e.name}: ${e.swlMin === e.swlMax ? e.swlMax : `${e.swlMin} to ${e.swlMax}`} dB(A), ${e.reference}`}
                      style={{ cursor: "pointer", outline: "none" }}
                    >
                      <rect x={0} y={y - 4} width={W} height={ROWH - 4} fill="transparent" />
                      <text
                        x={LABELW - 14}
                        y={y + 14}
                        fontSize="12.5"
                        fontWeight={isHover ? 600 : 400}
                        fill="var(--ink-2)"
                        textAnchor="end"
                      >
                        {e.shortLabel ?? e.name}
                      </text>
                      <rect
                        x={barX}
                        y={y}
                        width={Math.max(barMaxW, 2)}
                        height={18}
                        rx="4"
                        fill="var(--series-blue)"
                        opacity={hover && !isHover ? 0.45 : 1}
                      />
                      {e.swlMin !== e.swlMax && (
                        <line
                          x1={barX + scale(e.swlMin)}
                          y1={y - 2}
                          x2={barX + scale(e.swlMin)}
                          y2={y + 20}
                          stroke="var(--surface-1)"
                          strokeWidth="2"
                        />
                      )}
                      <text
                        x={barX + barMaxW + 8}
                        y={y + 14}
                        fontSize="11.5"
                        fontWeight={600}
                        fill="var(--ink-1)"
                      >
                        {e.swlMin === e.swlMax ? e.swlMax : `${e.swlMin}–${e.swlMax}`}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
          <figcaption
            aria-live="polite"
            style={{ marginTop: 12, fontSize: 13, color: "var(--ink-2)", minHeight: 20 }}
          >
            {hovered ? (
              <>
                <strong style={{ color: "var(--ink-1)" }}>{hovered.name}</strong> — {hovered.reference}
              </>
            ) : (
              <span style={{ color: "var(--ink-3)" }}>Hover a bar for its source reference.</span>
            )}
          </figcaption>
        </figure>

        <p className="note">
          Values in dB(A) Sound Power Level. A range indicates the source
          table itself cites a spread rather than a single figure.
        </p>
      </div>
    </section>
  );
}
