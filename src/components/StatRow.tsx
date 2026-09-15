import { stats } from "@/data/narrative";

export default function StatRow() {
  return (
    <section style={{ paddingBlock: "clamp(2.5rem, 1.5rem + 4vw, 4rem)" }}>
      <div className="wrap">
        <p className="eyebrow">The stakes</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--rule)",
                borderRadius: 10,
                padding: "22px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 1.4rem + 1.5vw, 2.4rem)",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: "var(--ink-1)",
                  marginTop: 10,
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
              <div
                style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 6 }}
              >
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
