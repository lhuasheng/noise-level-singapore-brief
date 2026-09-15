import { jurisdictions, ANCHOR_ID } from "@/data/jurisdictions";

const withUsd = jurisdictions
  .filter((j) => j.penaltyUsd !== null)
  .sort((a, b) => (b.penaltyUsd ?? 0) - (a.penaltyUsd ?? 0));

const MAXV = 32000;

export default function Penalties() {
  return (
    <section id="penalties" className="rule-top" style={{ background: "var(--surface-2)" }}>
      <div className="wrap">
        <p className="eyebrow">The penalty</p>
        <h2 className="h2">What a breach costs</h2>
        <p className="lede">
          Maximum penalty per offence, approximate US$ equivalent. Only three
          regimes in this set publish a directly comparable headline figure; the
          rest enforce through orders, consent conditions, or city-issued
          violations with no national schedule.
        </p>

        <div style={{ display: "grid", gap: 18, marginTop: 30 }}>
          {withUsd.map((j) => {
            const anchor = j.id === ANCHOR_ID;
            const pct = ((j.penaltyUsd ?? 0) / MAXV) * 100;
            return (
              <div key={j.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                    marginBottom: 7,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: anchor ? 700 : 600,
                      fontSize: 14.5,
                      color: anchor ? "var(--accent)" : "var(--ink-1)",
                    }}
                  >
                    {j.name}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
                    ≈US${(j.penaltyUsd ?? 0).toLocaleString("en-US")} ·{" "}
                    <span style={{ color: "var(--ink-3)" }}>{j.penalty}</span>
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--surface-1)",
                    border: "1px solid var(--rule)",
                    borderRadius: 6,
                    height: 26,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: anchor ? "var(--accent)" : "var(--series-blue)",
                      borderRadius: 5,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="note">
          Local-currency figures converted at approximate exchange rates for
          comparability only — not official USD penalties. Real recorded cases:
          a Nanjing contractor fined RMB 11,800 for unpermitted night work
          (2025); Hong Kong&rsquo;s Chevalier Construction paid a combined
          HK$300,000 across two same-day convictions, still cited as a record.
          The UK&rsquo;s Control of Pollution Act caps at £20,000 per offence
          plus a daily penalty — a 2019 Bristol prosecution of West-Tec
          Construction reached £24,000 across twelve breaches of a Section 60
          notice.
        </p>
      </div>
    </section>
  );
}
