export default function Hero() {
  return (
    <section
      id="top"
      style={{
        background: "var(--surface-ink)",
        color: "var(--ink-on-dark-1)",
        paddingBlock: "clamp(4rem, 2rem + 9vw, 8rem)",
      }}
    >
      <div className="wrap">
        <p className="eyebrow" style={{ color: "#8b8880" }}>
          Comparative regulatory dossier · 10 jurisdictions
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(2.25rem, 1.2rem + 4.6vw, 4.25rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            margin: "1rem 0 0",
            color: "#fbfaf8",
            maxWidth: "18ch",
          }}
        >
          Construction Noise Regulation:{" "}
          <span style={{ color: "var(--accent)" }}>Singapore</span> in
          International Context
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 0.95rem + 0.4vw, 1.2rem)",
            color: "#b9b6ae",
            maxWidth: "58ch",
            marginTop: "1.5rem",
          }}
        >
          Every jurisdiction here accepts the same premise: construction noise is
          an unavoidable cost of a growing city, and the state has a legitimate
          role in bounding it. What differs sharply is how that boundary is
          drawn.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: "2.25rem",
          }}
        >
          <a
            href="#compare"
            style={{
              background: "#fbfaf8",
              color: "#1b1b1b",
              padding: "13px 22px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Read the comparison
          </a>
          <a
            href="#sources"
            style={{
              border: "1px solid #45443f",
              color: "#e7e4de",
              padding: "13px 22px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Jump to sources
          </a>
        </div>
      </div>
    </section>
  );
}
