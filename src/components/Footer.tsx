export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface-ink)",
        color: "#8b8880",
        paddingBlock: "48px",
      }}
    >
      <div className="wrap">
        <p style={{ margin: 0, fontSize: 13, maxWidth: "70ch" }}>
          A comparative regulatory dossier on construction-noise management,
          drawn from three volumes covering Singapore, Hong Kong, China, Japan,
          Taiwan, South Korea, Germany, the United Kingdom, Australia and the
          United States.
        </p>
        <p style={{ margin: "14px 0 0", fontSize: 12.5 }}>
          Regulations are amended periodically — China&rsquo;s framework changed
          twice in the year before writing. Verify current figures against the
          primary source before relying on them for a specific project.
        </p>
      </div>
    </footer>
  );
}
