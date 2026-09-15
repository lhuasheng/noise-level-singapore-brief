import { drivers, middayBan } from "@/data/narrative";

export default function Drivers() {
  return (
    <section id="why" className="rule-top">
      <div className="wrap">
        <p className="eyebrow">Why</p>
        <h2 className="h2">Why the models differ</h2>
        <p className="lede">
          Four structural differences do most of the explanatory work — and none
          of them is how much any society values quiet.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
            marginTop: 32,
          }}
        >
          {drivers.map((d, i) => (
            <article
              key={d.title}
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--rule)",
                borderRadius: 10,
                padding: "26px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--accent)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  margin: "10px 0 0",
                  lineHeight: 1.22,
                }}
              >
                {d.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink-2)",
                  margin: "12px 0 0",
                }}
              >
                {d.body}
              </p>
            </article>
          ))}
        </div>

        <aside
          style={{
            marginTop: 26,
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
            {middayBan.headline}
          </h3>
          <p
            style={{
              fontSize: 14.5,
              color: "var(--ink-2)",
              margin: "12px 0 0",
              maxWidth: "72ch",
            }}
          >
            {middayBan.body}
          </p>
        </aside>
      </div>
    </section>
  );
}
