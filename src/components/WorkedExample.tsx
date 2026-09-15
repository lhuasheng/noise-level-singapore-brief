import { workedExample } from "@/data/distance";

export default function WorkedExample() {
  return (
    <section id="worked-example" className="rule-top" style={{ background: "var(--surface-2)" }}>
      <div className="wrap">
        <p className="eyebrow">A real worked example</p>
        <h2 className="h2">From equipment to receptor, in one calculation</h2>
        <p className="lede">
          A Hong Kong project profile for the {workedExample.project} shows the
          full chain from equipment to predicted receptor level, using the
          GW-TM&rsquo;s own formula and a real 230-metre separation distance.
        </p>

        <div
          className="scroll-x"
          style={{
            marginTop: 22,
            background: "var(--surface-1)",
            border: "1px solid var(--rule)",
            borderRadius: 10,
          }}
        >
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, minWidth: 680 }}>
            <thead>
              <tr>
                {["Equipment", "SWL, dB(A)", "Distance, m", "Attenuation, dB", "Predicted at receptor, dB(A)"].map(
                  (h) => (
                    <th key={h} style={th}>
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {workedExample.rows.map((r, i) => (
                <tr key={r.equipment} style={{ background: i % 2 ? "var(--surface-2)" : "transparent" }}>
                  <td style={td}>{r.equipment}</td>
                  <td style={td}>{r.swl}</td>
                  <td style={td}>{r.distanceM}</td>
                  <td style={td}>{r.attenuationDb}</td>
                  <td style={{ ...td, fontWeight: 600, color: "var(--ink-1)" }}>
                    {r.predictedDb}{" "}
                    <span style={{ fontWeight: 400, color: "var(--ink-3)" }}>
                      ({r.predictedWithFacadeDb} with façade correction)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: 18,
            background: "var(--surface-1)",
            border: "1px solid var(--rule-strong)",
            borderRadius: 8,
            padding: "14px 18px",
            fontFamily: "var(--font-mono)",
            fontSize: 13.5,
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "var(--ink-3)",
              textAlign: "left",
              marginBottom: 6,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Hong Kong GW-TM / BS 5228-derived formula
          </span>
          {workedExample.formula}
        </div>

        <p className="note">
          Raw calculation as filed in the project&rsquo;s EPD profile. {workedExample.facadeCorrectionNote}
        </p>
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
