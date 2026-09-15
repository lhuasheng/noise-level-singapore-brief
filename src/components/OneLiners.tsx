import { oneLineReads } from "@/data/narrative";

export default function OneLiners() {
  return (
    <section
      style={{
        background: "var(--surface-ink)",
        color: "var(--ink-on-dark-1)",
      }}
    >
      <div className="wrap">
        <p className="eyebrow" style={{ color: "#8b8880" }}>
          In summary
        </p>
        <h2 className="h2" style={{ color: "#fbfaf8" }}>
          One line on each model
        </h2>

        <dl style={{ margin: "34px 0 0" }}>
          {oneLineReads.map((r, i) => (
            <div
              key={r.group}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr)",
                gap: 4,
                padding: "16px 0",
                borderTop: i === 0 ? "none" : "1px solid #33322e",
              }}
              className="oneliner-row"
            >
              <dt style={{ fontWeight: 600, fontSize: 15.5, color: "#fbfaf8" }}>
                {r.group}
              </dt>
              <dd style={{ margin: 0, fontSize: 15, color: "#b9b6ae" }}>
                {r.read}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        @media (min-width: 760px) {
          .oneliner-row {
            grid-template-columns: 280px minmax(0, 1fr) !important;
            gap: 24px !important;
            align-items: baseline;
          }
        }
      `}</style>
    </section>
  );
}
