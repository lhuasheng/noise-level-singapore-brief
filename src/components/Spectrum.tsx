"use client";

import { useState } from "react";
import { jurisdictions, ANCHOR_ID } from "@/data/jurisdictions";

const W = 760;
const H = 480;
const PAD = { top: 28, right: 28, bottom: 54, left: 62 };

const x = (v: number) => PAD.left + (v / 10) * (W - PAD.left - PAD.right);
const y = (v: number) => H - PAD.bottom - (v / 10) * (H - PAD.top - PAD.bottom);

export default function Spectrum() {
  const [active, setActive] = useState<string | null>(null);
  const hovered = jurisdictions.find((j) => j.id === active) ?? null;

  return (
    <section id="spectrum" className="rule-top">
      <div className="wrap">
        <p className="eyebrow">The spectrum</p>
        <h2 className="h2">Mapping strictness: precision versus enforcement</h2>
        <p className="lede">
          A single strictness score would flatten real differences in kind, not
          just degree. The useful comparison is two-dimensional — how
          numerically precise is the standard, and how proactively is it policed?
        </p>

        <div
          style={{
            display: "grid",
            gap: 28,
            gridTemplateColumns: "minmax(0, 1fr)",
            marginTop: 30,
            alignItems: "start",
          }}
          className="spectrum-grid"
        >
          <figure style={{ margin: 0 }}>
            <div
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--rule)",
                borderRadius: 10,
                padding: 8,
              }}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                role="img"
                aria-label="Scatter plot of ten jurisdictions by numeric precision and enforcement proactivity. Singapore sits alone in the high-precision, high-enforcement quadrant."
                style={{ display: "block", overflow: "visible" }}
              >
                {/* quadrant guides */}
                <line
                  x1={x(5)} y1={y(0)} x2={x(5)} y2={y(10)}
                  stroke="var(--rule)" strokeWidth="1"
                />
                <line
                  x1={x(0)} y1={y(5)} x2={x(10)} y2={y(5)}
                  stroke="var(--rule)" strokeWidth="1"
                />
                {/* axes */}
                <line
                  x1={x(0)} y1={y(0)} x2={x(10)} y2={y(0)}
                  stroke="var(--rule-strong)" strokeWidth="1"
                />
                <line
                  x1={x(0)} y1={y(0)} x2={x(0)} y2={y(10)}
                  stroke="var(--rule-strong)" strokeWidth="1"
                />

                <text
                  x={x(0)} y={H - 16}
                  fontSize="11" fill="var(--ink-3)"
                  letterSpacing="1.2"
                >
                  NUMERIC PRECISION →
                </text>
                <text
                  x={-y(0)} y={18}
                  transform="rotate(-90)"
                  fontSize="11" fill="var(--ink-3)"
                  letterSpacing="1.2"
                >
                  ENFORCEMENT PROACTIVITY →
                </text>

                {jurisdictions.map((j) => {
                  const isAnchor = j.id === ANCHOR_ID;
                  const isActive = active === j.id;
                  const r = isAnchor ? 9 : 6.5;
                  return (
                    <g
                      key={j.id}
                      onMouseEnter={() => setActive(j.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(j.id)}
                      onBlur={() => setActive(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${j.name}: precision ${j.precision} of 10, enforcement ${j.enforcement} of 10`}
                      style={{ cursor: "pointer", outline: "none" }}
                    >
                      {/* generous invisible hit target */}
                      <circle
                        cx={x(j.precision)} cy={y(j.enforcement)} r={18}
                        fill="transparent"
                      />
                      <circle
                        cx={x(j.precision)}
                        cy={y(j.enforcement)}
                        r={isActive ? r + 3 : r}
                        fill={isAnchor ? "var(--accent)" : "var(--series-blue)"}
                        stroke="var(--surface-1)"
                        strokeWidth="2"
                      />
                      <text
                        x={x(j.precision) + r + 7}
                        y={y(j.enforcement) + 4}
                        fontSize={isAnchor ? "13" : "12"}
                        fontWeight={isAnchor ? 700 : 500}
                        fill={isAnchor ? "var(--ink-1)" : "var(--ink-2)"}
                      >
                        {j.short}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <figcaption className="note">
              Axes are qualitative 0–10 assessments derived from the regulatory
              texts — the presence of a fixed multi-tier dB matrix, and whether
              monitoring is continuous and mandated rather than
              complaint-triggered. Illustrative, not an official ranking.
            </figcaption>
          </figure>

          <div>
            <div
              aria-live="polite"
              style={{
                background: hovered ? "var(--accent-soft)" : "var(--surface-2)",
                border: "1px solid var(--rule)",
                borderRadius: 10,
                padding: "18px 20px",
                minHeight: 128,
              }}
            >
              {hovered ? (
                <>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {hovered.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--ink-2)",
                      marginTop: 6,
                    }}
                  >
                    Precision {hovered.precision}/10 · Enforcement{" "}
                    {hovered.enforcement}/10
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--ink-2)",
                      marginTop: 10,
                    }}
                  >
                    {hovered.oneLine}
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 13, color: "var(--ink-3)" }}>
                  Hover or focus a point to read that jurisdiction&rsquo;s
                  position.
                </div>
              )}
            </div>

            <dl style={{ margin: "22px 0 0", display: "grid", gap: 16 }}>
              {[
                [
                  "High precision, high enforcement",
                  "Singapore, alone in this quadrant — the combination that drives its reputation for strictness.",
                ],
                [
                  "High precision, low enforcement",
                  "Germany: a precise ceiling unchanged since 1970, triggered procedurally rather than monitored.",
                ],
                [
                  "Permit-gated",
                  "Hong Kong: no daytime number, but no night work at all without a permit.",
                ],
                [
                  "Low precision, low enforcement",
                  "The UK and Australia: no fixed ceiling, judged case by case by local authorities.",
                ],
              ].map(([t, b]) => (
                <div key={t}>
                  <dt style={{ fontWeight: 600, fontSize: 13.5 }}>{t}</dt>
                  <dd
                    style={{
                      margin: "3px 0 0",
                      fontSize: 13,
                      color: "var(--ink-2)",
                    }}
                  >
                    {b}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 940px) {
          .spectrum-grid {
            grid-template-columns: minmax(0, 1.55fr) minmax(280px, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
