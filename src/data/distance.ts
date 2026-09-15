// Volume IV: "Distance, Decibels, and the Point of Concern" (Sept 2026).
// Companion to Volumes I–III. Covers the distance-attenuation relationship
// underlying every ceiling in jurisdictions.ts: how sound falls off with
// distance, where each regulator actually measures its limit, how loud
// construction equipment really is at the source, and at what distance a
// given limit is actually met.

export type AttenuationFormula = {
  standard: string;
  formula: string;
  dbPerDoubling: number;
};

/** Every formula here is a variant of the same "20-log" relationship — what
 * differs is the constant added for source geometry and ground surface. */
export const attenuationFormulas: AttenuationFormula[] = [
  {
    standard: "General point source, free field (spherical spreading)",
    formula: "20·log₁₀(d₂/d₁)",
    dbPerDoubling: 6.0,
  },
  {
    standard: "UK BS 5228 / Hong Kong GW-TM (hemispherical, hard ground)",
    formula: "20·log₁₀(D) + 8",
    dbPerDoubling: 6.0,
  },
  {
    standard: "BS 5228, soft/absorptive ground correction",
    formula: "25·log₁₀(d₂/d₁)",
    dbPerDoubling: 7.5,
  },
  {
    standard: "Germany, AVV Baulärm / VDI 2714 (spherical)",
    formula: "Dₛ = 20·log₁₀(s) + 11",
    dbPerDoubling: 6.0,
  },
  {
    standard: "Line source (e.g. a haul road or continuous traffic stream)",
    formula: "10·log₁₀(d₂/d₁)",
    dbPerDoubling: 3.0,
  },
];

export type Excerpt = {
  quote: string;
  source: string;
};

/** The two measurement-convention excerpts from §2. */
export const measurementExcerpts: Excerpt[] = [
  {
    quote:
      "Noise measurements shall be taken at one metre away from the outside of any affected building",
    source: "National Environment Agency (Singapore), Construction Noise Control",
  },
  {
    quote: "...assessed at 1m from the external facade",
    source:
      "Environmental Protection Department (Hong Kong), EIA Report eia_2182013, Table 5.1 note",
  },
];

export type Equipment = {
  name: string;
  /** Shorter label for the bar chart's left-hand axis; the full name still
   * appears in the hover caption and aria-label. Falls back to `name`. */
  shortLabel?: string;
  /** Sound Power Level in dB(A). Equal to swlMax when the source cites a single figure. */
  swlMin: number;
  swlMax: number;
  reference: string;
};

/** Sound Power Level (SWL) — a machine's total acoustic output, independent
 * of distance. Figures drawn directly from BS 5228 reference tables and
 * Hong Kong EPD technical memoranda, as reproduced in real EIAs. */
export const equipmentSwl: Equipment[] = [
  { name: "Hand-held/excavator-mounted pneumatic breaker", shortLabel: "Pneumatic breaker", swlMin: 118, swlMax: 122, reference: "BS 5228 Table C.1.9 / HK GW-TM CNP027" },
  { name: "Petrol hand-held circular saw", swlMin: 119, swlMax: 119, reference: "BS 5228 Table C.4.70" },
  { name: "Dump truck", swlMin: 119, swlMax: 119, reference: "BS 5228 Table C.9-16" },
  { name: "Asphalt paver (+ tipper lorry)", swlMin: 112, swlMax: 112, reference: "BS 5228 Table C.5-32" },
  { name: "Large rotary bored piling rig", swlMin: 111, swlMax: 111, reference: "BS 5228 Table C.3.14" },
  { name: "Vibratory compactor (asphalt)", swlMin: 111, swlMax: 111, reference: "BS 5228 Table C.5-29" },
  { name: "Road planer", swlMin: 110, swlMax: 110, reference: "BS 5228 Table C.5.7" },
  { name: "Bulldozer / dozer", swlMin: 105, swlMax: 105, reference: "BS 5228 Table C.5-12" },
  { name: "Tracked excavator", swlMin: 97, swlMax: 103, reference: "BS 5228 Tables C.5-35 / C.8.10" },
  { name: "Wheeled backhoe loader", swlMin: 96, swlMax: 96, reference: "BS 5228 Table C.2-8" },
];

export type WorkedExampleRow = {
  equipment: string;
  swl: number;
  distanceM: number;
  attenuationDb: number;
  predictedDb: number;
  predictedWithFacadeDb: number;
};

/** A real Hong Kong EPD project profile — the full chain from equipment to
 * predicted receptor level, at a real 230m separation distance. */
export const workedExample = {
  project: "Discovery Bay Area N1 debris-resisting barrier, Hong Kong",
  formula: "Distance Attenuation, dB(A) = 20·log₁₀(D) + 8 — D = slant distance, metres",
  facadeCorrectionNote:
    "A +3 dB(A) façade correction is standard practice for a hard building surface reflecting sound back toward the meter.",
  rows: [
    { equipment: "Excavator / loader", swl: 112, distanceM: 230, attenuationDb: -55, predictedDb: 57, predictedWithFacadeDb: 60 },
    { equipment: "Pneumatic breaker (excavator-mounted)", swl: 122, distanceM: 230, attenuationDb: -55, predictedDb: 67, predictedWithFacadeDb: 70 },
    { equipment: "Air compressor", swl: 104, distanceM: 230, attenuationDb: -55, predictedDb: 49, predictedWithFacadeDb: 62 },
  ] satisfies WorkedExampleRow[],
};

export type DistanceThreshold = {
  jurisdiction: string;
  thresholdText: string;
  whatChanges: string;
};

/** Jurisdictions that turn distance into an explicit legal or administrative
 * trigger point, rather than leaving it purely to case-by-case calculation. */
export const distanceThresholds: DistanceThreshold[] = [
  {
    jurisdiction: "Singapore",
    thresholdText: "150 m",
    whatChanges:
      "Triggers the stricter residential limit tier, mandatory real-time noise meters, and the Sunday/public-holiday no-work rule",
  },
  {
    jurisdiction: "Hong Kong (EIA practice)",
    thresholdText: "300 m",
    whatChanges: "Sources beyond this are routinely excluded from formal assessment altogether",
  },
  {
    jurisdiction: "New York City",
    thresholdText: "200 ft (≈61 m)",
    whatChanges: "The 75 dB(A) after-hours ceiling applies only within this radius of a residence",
  },
  {
    jurisdiction: "Germany",
    thresholdText: "No fixed threshold",
    whatChanges: "Every individually nearest building is calculated by formula, however far away it sits",
  },
];

export type IllustrativeTarget = {
  targetDb: number;
  label: string;
  distanceLabel: string;
};

/** Turning the HK GW-TM formula around: for a representative loud breaker at
 * 120 dB(A) SWL, on hard ground with no barriers (the most conservative
 * "worst case" assumption), how far before a given limit is met? */
export const illustrativeCalc = {
  sourceSwl: 120,
  formulaLabel: "20·log₁₀(D) + 8",
  targets: [
    {
      targetDb: 70,
      label: "China's national daytime limit; also Hong Kong's ASR-C daytime guideline",
      distanceLabel: "roughly 126 metres",
    },
    {
      targetDb: 55,
      label: "A typical night-time limit in China, Singapore, and Hong Kong's ASR-A band",
      distanceLabel: "roughly 710 metres",
    },
    {
      targetDb: 45,
      label: "Near the WHO-referenced night-time comfort guideline",
      distanceLabel: "roughly 2.2 kilometres",
    },
  ] satisfies IllustrativeTarget[],
  caveat:
    "These are unobstructed, hard-ground, no-barrier distances — a genuine worst case. Real sites achieve their limits at far shorter distances by using barriers, enclosures, quieter equipment, or simply because buildings and terrain interrupt the line of sight.",
};

export type ReferenceLine = {
  label: string;
  value: number;
};

/** Reference thresholds plotted against the predicted-level curve. */
export const curveReferenceLines: ReferenceLine[] = [
  { label: "Singapore day peak", value: 90 },
  { label: "HK / NYC daytime guideline", value: 75 },
  { label: "China / HK daytime limit", value: 70 },
  { label: "Common night limit", value: 55 },
  { label: "WHO-referenced night comfort", value: 45 },
];

/** distances in metres, log-spaced, matching the source chart. */
export const curveDistances = [5, 10, 20, 40, 80, 160, 320, 640, 1280, 2560];

/** Distance-attenuation curve for a 120 dB(A) source using the HK GW-TM / BS
 * 5228 formula: level = SWL − (20·log₁₀(D) + 8). */
export function predictedLevel(swl: number, distanceM: number): number {
  return swl - (20 * Math.log10(distanceM) + 8);
}

export type RealCase = {
  jurisdiction: string;
  quote: string;
  source: string;
  body: string;
};

export const realCases: RealCase[] = [
  {
    jurisdiction: "Hong Kong",
    quote: "the construction site was only 20 metres away from Block D",
    source:
      "EPD press release, Queen Elizabeth Hospital construction noise prosecution, Hong Kong (contractors fined HK$60,000 total)",
    body: "At 20 metres from a hospital ward, essentially any significant construction activity is inherently a “concern” under Hong Kong's framework — the distance is so short that the GW-TM formula predicts almost no useful attenuation at all, which is precisely why this case resulted in prosecution rather than a compliance calculation.",
  },
  {
    jurisdiction: "Singapore",
    quote: "",
    source: "",
    body: "In Singapore, a 2023 case captured on social media involved a resident reporting road-construction noise over 65 dB(A) within 150 metres of a residential area at 3am — a reading that would breach the standard night-time limit for that distance band, except that NEA classified the specific works as a “critical infrastructure diversion” exempt from the ordinary no-work rule. The case illustrates that the dB/distance pairing is necessary but not sufficient to predict enforcement outcomes — exemption categories sit on top of the numeric framework in every jurisdiction reviewed in this series.",
  },
];

export const distanceSynthesis = {
  headline: "Regulate the source, or regulate the listener?",
  body: "Every system in this dossier is, underneath its specific numbers, making one of two choices. China, Japan, and Taiwan regulate the source: fix a number at the property line and hold every project to it, leaving the actual exposure of any particular resident as an accident of geometry — a big site with a deep buffer protects its neighbours far better than the law requires; a small infill site meets the identical legal number while sitting metres from someone's bedroom window. Singapore, Hong Kong, Germany, and the BS 5228 methodology used across the UK and Australia regulate the listener: the number that matters is calculated or measured at the actual nearest affected building, so distance is not incidental to compliance — it is the calculation.",
  body2: "This split tracks the same legal-lineage pattern found across the earlier volumes in this series: common-law, British-derived systems (Hong Kong, Singapore, and the BS 5228 methodology inherited by the UK and Australia) build the receptor into the math from the start; civil-law/administrative-standard systems with their own separate lineage (China, Japan, Taiwan, and — differently again — Germany's own formula-based tradition) tend to fix a single number and apply it uniformly, whether at a property boundary (China, Japan, Taiwan) or, in Germany's more unusual case, through its own nationally uniform distance formula. Distance, in other words, isn't a detail bolted onto noise law — whether it's counted at all is one of the clearest fingerprints of which legal tradition wrote the rule.",
};

export const physicsIntro =
  "Sound pressure falls off with distance because the same acoustic energy spreads over an ever-larger area. For a small (“point”) source radiating in all directions in open air, the level drops by 6 dB every time the distance doubles; for a source effectively radiating into a hemisphere (a machine sitting on hard, reflective ground — the usual construction-site assumption), the maths works out to the same 6 dB-per-doubling rate, just with a different constant term.";

export const physicsUpshot =
  "The practical upshot: a machine loud enough to breach a limit at 20 metres does not become quiet at 40 metres — it typically drops by only about 6 dB, a noticeable but modest reduction. Halving the perceived loudness of a sound generally takes roughly a 10 dB drop, so under ideal open conditions a source needs its distance roughly tripled — not doubled — before most people would judge it “half as loud.” Real construction sites rarely get that luxury of open distance, which is exactly why barriers, screening, and building layout matter as much as raw metres in every system reviewed here.";

export const measurementIntro =
  "The single biggest design choice a noise regulation makes is where the limit is measured — at the construction site's own boundary, regardless of who lives beyond it; or at (or predicted to) the nearest affected building, however far that happens to be. This single choice determines whether distance is built into the rule at all.";
