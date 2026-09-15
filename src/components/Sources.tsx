import { sources, disclaimer } from "@/data/sources";

export default function Sources() {
  return (
    <section id="sources" className="rule-top">
      <div className="wrap">
        <p className="eyebrow">Sources</p>
        <h2 className="h2">Where these figures come from</h2>
        <p className="lede">
          Compiled from publicly available regulator guidance, national
          standards, government notices, and reported enforcement cases as of
          September 2026.
        </p>

        <ol
          style={{
            listStyle: "none",
            counterReset: "src",
            padding: 0,
            margin: "30px 0 0",
            border: "1px solid var(--rule)",
            borderRadius: 10,
            background: "var(--surface-1)",
            overflow: "hidden",
          }}
        >
          {sources.map((s, i) => (
            <li
              key={s.n}
              style={{
                display: "grid",
                gridTemplateColumns: "34px minmax(0, 1fr)",
                gap: 12,
                padding: "14px 18px",
                borderTop: i === 0 ? "none" : "1px solid var(--rule)",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--ink-3)",
                  fontFamily: "var(--font-mono)",
                  paddingTop: 2,
                }}
              >
                {String(s.n).padStart(2, "0")}
              </span>
              <span>
                <span style={{ fontSize: 13.5, color: "var(--ink-2)" }}>
                  {s.text}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "var(--ink-3)",
                    fontFamily: "var(--font-mono)",
                    marginTop: 4,
                  }}
                >
                  {s.host}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <p className="note">{disclaimer}</p>
      </div>
    </section>
  );
}
