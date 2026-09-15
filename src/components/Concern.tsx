"use client";

import { useState, useRef, type PointerEvent } from "react";
import {
  distanceThresholds,
  illustrativeCalc,
  curveReferenceLines,
  curveDistances,
  predictedLevel,
  realCases,
  distanceSynthesis,
} from "@/data/distance";

const SWL = 120;
const YMIN = 30;
const YMAX = 100;
const W = 760;
const H = 380;
const PAD = { top: 16, right: 20, bottom: 40, left: 40 };
const PLOTW = W - PAD.left - PAD.right;
const PLOTH = H - PAD.top - PAD.bottom;

const DMIN = curveDistances[0];
const DMAX = curveDistances[curveDistances.length - 1];
const LOG_MIN = Math.log10(DMIN);
const LOG_MAX = Math.log10(DMAX);

const xOf = (d: number) => PAD.left + ((Math.log10(d) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * PLOTW;
const yOf = (v: number) => PAD.top + ((YMAX - v) / (YMAX - YMIN)) * PLOTH;
const distanceAtX = (px: number) => {
  const frac = Math.min(1, Math.max(0, (px - PAD.left) / PLOTW));
  return Math.pow(10, LOG_MIN + frac * (LOG_MAX - LOG_MIN));
};

export default function Concern() {
  const [hoverPx, setHoverPx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const hoverD = hoverPx !== null ? distanceAtX(hoverPx) : null;
  const hoverLevel = hoverD !== null ? predictedLevel(SWL, hoverD) : null;

  function handleMove(e: PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    setHoverPx(Math.min(PAD.left + PLOTW, Math.max(PAD.left, px)));
  }

  return (
    <section id="concern" className="rule-top">
      <div className="wrap">
        <p className="eyebrow">At what pairing does it become a concern?</p>
        <h2 className="h2">Turning the formula around</h2>
        <p className="lede">
          Four jurisdictions turn distance into an explicit legal or
          administrative trigger point, rather than leaving it purely to
          case-by-case calculation:
        </p>

        <div
          className="scroll-x"
          style={{
            marginTop: 20,
            background: "var(--surface-1)",
            border: "1px solid var(--rule)",
            borderRadius: 10,
          }}
        >
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, minWidth: 560 }}>
            <thead>
              <tr>
                {["Jurisdiction", "Distance threshold", "What changes at that distance"].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {distanceThresholds.map((t, i) => (
                <tr key={t.jurisdiction} style={{ background: i % 2 ? "var(--surface-2)" : "transparent" }}>
                  <td style={{ ...td, fontWeight: 600, color: "var(--ink-1)" }}>{t.jurisdiction}</td>
                  <td style={td}>{t.thresholdText}</td>
                  <td style={td}>{t.whatChanges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 600,
            margin: "40px 0 8px",
          }}
        >
          How far is &ldquo;far enough&rdquo;?
        </h3>
        <p className="lede">
          Using Hong Kong&rsquo;s own published formula, it&rsquo;s possible to
          work out roughly how far a specific piece of equipment needs to be
          from a resident before it lands under a given limit. Take a
          representative loud breaker at {illustrativeCalc.sourceSwl} dB(A)
          SWL, on hard ground, with no barriers or screening — the most
          conservative, &ldquo;worst case&rdquo; assumption.
        </p>

        <dl
          style={{
            margin: "18px 0 0",
            background: "var(--surface-2)",
            border: "1px solid var(--rule-strong)",
            borderRadius: 8,
            padding: "18px 20px",
            display: "grid",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              color: "var(--accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Illustrative calculation — {illustrativeCalc.sourceSwl} dB(A) source, using {illustrativeCalc.formulaLabel}
          </span>
          {illustrativeCalc.targets.map((t) => (
            <div key={t.targetDb} style={{ fontSize: 14 }}>
              To fall to <strong>{t.targetDb} dB(A)</strong> ({t.label}) —{" "}
              <strong style={{ color: "var(--ink-1)" }}>{t.distanceLabel}</strong>.
            </div>
          ))}
        </dl>
        <p className="note">{illustrativeCalc.caveat}</p>

        <figure style={{ margin: "26px 0 0" }}>
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
                ref={svgRef}
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                role="img"
                aria-label={`Line chart of predicted noise level versus distance for a ${SWL} dB(A) source, log scale, from ${DMIN} to ${DMAX} metres. Reference lines mark representative limits used across the jurisdictions in this dossier.`}
                style={{ display: "block", overflow: "visible", touchAction: "none" }}
                onPointerMove={handleMove}
                onPointerLeave={() => setHoverPx(null)}
              >
                {/* threshold reference lines — recessive, direct-labelled, not a competing hue */}
                {curveReferenceLines.map((r) => (
                  <g key={r.label}>
                    <line
                      x1={PAD.left}
                      y1={yOf(r.value)}
                      x2={PAD.left + PLOTW}
                      y2={yOf(r.value)}
                      stroke="var(--rule-strong)"
                      strokeDasharray="4 3"
                      strokeWidth="1"
                    />
                    <text x={PAD.left + PLOTW} y={yOf(r.value) - 4} fontSize="10" fill="var(--ink-3)" textAnchor="end">
                      {r.label} ({r.value})
                    </text>
                  </g>
                ))}

                {/* axes */}
                <line
                  x1={PAD.left}
                  y1={PAD.top + PLOTH}
                  x2={PAD.left + PLOTW}
                  y2={PAD.top + PLOTH}
                  stroke="var(--rule-strong)"
                  strokeWidth="1"
                />
                {curveDistances.map((d) => (
                  <text
                    key={d}
                    x={xOf(d)}
                    y={PAD.top + PLOTH + 16}
                    fontSize="10.5"
                    fill="var(--ink-3)"
                    textAnchor="middle"
                  >
                    {d}
                  </text>
                ))}
                <text
                  x={PAD.left + PLOTW / 2}
                  y={H - 4}
                  fontSize="11"
                  fill="var(--ink-3)"
                  textAnchor="middle"
                  letterSpacing="0.8"
                >
                  DISTANCE, METRES (LOG SCALE)
                </text>

                {/* the curve is a straight line in log-distance space:
                    level = SWL − (20·log10(d) + 8) */}
                <line
                  x1={xOf(DMIN)}
                  y1={yOf(predictedLevel(SWL, DMIN))}
                  x2={xOf(DMAX)}
                  y2={yOf(predictedLevel(SWL, DMAX))}
                  stroke="var(--series-blue)"
                  strokeWidth="2.5"
                />

                {/* keyboard-focusable checkpoints at the source chart's own sample distances */}
                {curveDistances.map((d) => {
                  const lvl = predictedLevel(SWL, d);
                  return (
                    <circle
                      key={d}
                      cx={xOf(d)}
                      cy={yOf(lvl)}
                      r={4}
                      fill="var(--series-blue)"
                      stroke="var(--surface-1)"
                      strokeWidth="1.5"
                      tabIndex={0}
                      role="img"
                      aria-label={`At ${d} metres, predicted level ${lvl.toFixed(1)} dB(A)`}
                      onFocus={() => setHoverPx(xOf(d))}
                      onBlur={() => setHoverPx(null)}
                      style={{ cursor: "pointer", outline: "none" }}
                    />
                  );
                })}

                {hoverD !== null && hoverLevel !== null && (
                  <g>
                    <line
                      x1={hoverPx as number}
                      y1={PAD.top}
                      x2={hoverPx as number}
                      y2={PAD.top + PLOTH}
                      stroke="var(--ink-3)"
                      strokeWidth="1"
                    />
                    <circle cx={hoverPx as number} cy={yOf(hoverLevel)} r={5} fill="var(--accent)" />
                  </g>
                )}
              </svg>
            </div>
          </div>
          <figcaption
            aria-live="polite"
            style={{ marginTop: 12, fontSize: 13, color: "var(--ink-2)", minHeight: 20 }}
          >
            {hoverD !== null && hoverLevel !== null ? (
              <>
                At <strong style={{ color: "var(--ink-1)" }}>{Math.round(hoverD)} m</strong>, predicted level{" "}
                <strong style={{ color: "var(--ink-1)" }}>{hoverLevel.toFixed(1)} dB(A)</strong>.
              </>
            ) : (
              <span style={{ color: "var(--ink-3)" }}>
                Move across the chart (or tab to a point) for the predicted level at that distance.
              </span>
            )}
          </figcaption>
        </figure>
        <p className="note">
          Curve computed from Distance Attenuation = 20·log₁₀(D) + 8 (the Hong
          Kong GW-TM / BS 5228 formula) for a {SWL} dB(A) source. Horizontal
          lines mark representative limits used across the jurisdictions in
          this series — where the curve crosses a line is the illustrative
          &ldquo;compliance distance&rdquo; for that limit, all else being
          equal.
        </p>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 600,
            margin: "44px 0 12px",
          }}
        >
          Two real cases where the pairing mattered
        </h3>

        <div style={{ display: "grid", gap: 18 }}>
          {realCases.map((c) => (
            <div key={c.jurisdiction}>
              {c.quote && (
                <blockquote
                  style={{
                    margin: "0 0 10px",
                    borderLeft: "3px solid var(--accent)",
                    background: "var(--surface-2)",
                    borderRadius: "0 8px 8px 0",
                    padding: "14px 18px",
                  }}
                >
                  <p style={{ margin: 0, fontStyle: "italic", fontSize: 14, color: "var(--ink-1)" }}>
                    &ldquo;{c.quote}&rdquo;
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
                    — {c.source}
                  </cite>
                </blockquote>
              )}
              <p style={{ fontSize: 14.5, color: "var(--ink-2)", margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>

        <aside
          style={{
            marginTop: 30,
            borderLeft: "3px solid var(--accent)",
            background: "var(--surface-2)",
            borderRadius: "0 10px 10px 0",
            padding: "26px 28px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {distanceSynthesis.headline}
          </h3>
          <p style={{ fontSize: 14.5, color: "var(--ink-2)", margin: "12px 0 0", maxWidth: "74ch" }}>
            {distanceSynthesis.body}
          </p>
          <p style={{ fontSize: 14.5, color: "var(--ink-2)", margin: "12px 0 0", maxWidth: "74ch" }}>
            {distanceSynthesis.body2}
          </p>
        </aside>
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
