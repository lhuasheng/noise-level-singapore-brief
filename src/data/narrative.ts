export type Band = {
  /** Hour the band starts, 0-24. */
  from: number;
  to: number;
  state: "permitted" | "capped" | "banned";
  label: string;
};

export type TimelineRow = {
  id: string;
  name: string;
  bands: Band[];
  note: string;
};

/** A typical weekday, hour by hour, for the three Chinese-majority cities in Volume III. */
export const weekday: TimelineRow[] = [
  {
    id: "china",
    name: "China",
    bands: [
      { from: 0, to: 6, state: "banned", label: "Night ban — permit required" },
      { from: 6, to: 12, state: "permitted", label: "Permitted, 70 dB boundary limit" },
      { from: 12, to: 14, state: "banned", label: "Midday rest ban (many cities)" },
      { from: 14, to: 22, state: "permitted", label: "Permitted, 70 dB boundary limit" },
      { from: 22, to: 24, state: "banned", label: "Night ban — permit required" },
    ],
    note: "The only one of the three with a midday gap: construction stops for the traditional lunch and rest hours in most cities, on top of the overnight ban.",
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    bands: [
      { from: 0, to: 7, state: "banned", label: "Restricted hours — Construction Noise Permit required" },
      { from: 7, to: 19, state: "permitted", label: "Permitted; no fixed statutory dB cap" },
      { from: 19, to: 24, state: "banned", label: "Restricted hours — Construction Noise Permit required" },
    ],
    note: "Gates the night with a permit rather than a number. Outside 0700–1900, using powered mechanical equipment at all requires a permit — regardless of how quiet the work is.",
  },
  {
    id: "singapore",
    name: "Singapore",
    bands: [
      { from: 0, to: 7, state: "capped", label: "Tightest cap — 55 dB peak near homes" },
      { from: 7, to: 19, state: "permitted", label: "90 dB peak (5-min) / 75 dB Leq" },
      { from: 19, to: 22, state: "capped", label: "Tightened cap" },
      { from: 22, to: 24, state: "capped", label: "Tightest cap — 55 dB peak near homes" },
    ],
    note: "The only one with no red band at all on a typical weekday. Work is never fully banned — only capped ever more tightly as the night goes on.",
  },
];

export type Driver = {
  title: string;
  body: string;
};

/** Why the models diverge — the governance and legal-culture logic. */
export const drivers: Driver[] = [
  {
    title: "Density and land economics",
    body: "Singapore and Hong Kong are small, extremely dense, land-constrained territories where construction is near-continuous and residents have essentially nowhere to retreat to. That raises the political salience of noise as a public-health issue and makes it feasible for the state to fund and mandate universal real-time noise metering across thousands of sites. In lower-density jurisdictions with more physical buffer between construction and housing, the marginal value of that precision is lower — and so is the political pressure to build it.",
  },
  {
    title: "Legal tradition: common law versus civil law",
    body: "The UK, Australia, and the US inherit a common-law nuisance tradition: noise is actionable when it is “unreasonable” in context, a standard designed to be argued case by case rather than encoded as a universal number. Germany's AVV Baulärm reflects the opposite instinct — the civil-law preference for a single, comprehensive administrative rule that removes discretion from the local official. Singapore and Hong Kong, both shaped by British common law but administered by centralized technocratic agencies, have grafted continental-style numeric precision onto a common-law institutional base.",
  },
  {
    title: "State structure: unitary versus federal",
    body: "Singapore has no state, prefecture, city, or district government sitting between national law and the construction site — NEA writes the rule and NEA enforces it, everywhere, identically. Japan (national law → 47 prefectures → ~1,700 municipalities), Taiwan (national standard → city/county bureaus), and Korea (national ordinance → Si/Gun/Gu) are all at least two administrative layers deep. That is exactly why the most advanced tools in this set — Tokyo's stricter vibration ordinance, Taipei's blacklist, Seoul's barrier mandate — appear first as a single big city's initiative rather than a national rule.",
  },
  {
    title: "Enforcement culture: proactive versus reactive",
    body: "Singapore's mandated, continuously logged noise meters make enforcement proactive by design — the regulator does not need to wait for a complaint to know a site is in breach. Hong Kong's permit system is similarly front-loaded. The UK, Australia, and most of the US remain fundamentally complaint-driven: a resident calls 311 or the council, an inspector investigates, and formal notices follow only if informal resolution fails. This reflects a broader distinction between prescriptive regulation and performance-based regulation that specifies only the result and leaves the method to the regulated party.",
  },
];

/** The one cultural marker that legal lineage does not explain. */
export const middayBan = {
  headline: "The midday ban is where lineage gives way to culture",
  body: "All three Volume III cities are majority-Chinese, high-density, high-rise, and under near-constant redevelopment. If shared culture drove the rulebook, you would expect similar regimes. It is legal lineage, not culture, that explains most of the gap: Hong Kong and Singapore both inherited a British colonial-era template — a defined restricted-hours window, a permit as the escape valve, prosecution through a magistrates'-style court. Mainland China's system descends instead from a single national technical standard enforced by hundreds of city-level bureaus. The 12:00–14:00 construction ban is the clearest marker of where that lineage gives way to something more genuinely cultural: it appears across Chinese cities, rooted in the expectation of an afternoon rest, and does not appear in Hong Kong's or Singapore's law at all.",
};

export const oneLineReads = [
  { group: "Singapore & Hong Kong", read: "Precise ceiling, proactively policed." },
  { group: "Germany", read: "Precise ceiling, procedurally triggered." },
  { group: "UK & Australia", read: "No fixed ceiling, locally negotiated." },
  { group: "USA", read: "No floor at all — stringency is whatever the city builds." },
  { group: "Japan", read: "A 1968 framework law run on negotiated compliance." },
  { group: "Taiwan", read: "A precise national standard, enforced with local inventiveness." },
  { group: "South Korea", read: "A loose national floor, forced tighter by complaint data." },
  { group: "China", read: "A flat national number, enforced city by city." },
];

export const stats = [
  {
    value: "16,000+",
    label: "construction-noise complaints a year in Singapore",
    detail: "Complaints supplement, rather than substitute for, continuous automated monitoring.",
  },
  {
    value: "446,000",
    label: "noise complaints filed in New York City in 2017",
    detail: "Noise is the city's single most common 311 complaint category.",
  },
  {
    value: "64.6%",
    label: "of all South Korean noise complaints were construction (2011)",
    detail: "The finding credited with the 2011 tightening of the daytime residential standard to 65 dB(A).",
  },
  {
    value: "1982",
    label: "the year the US federal noise-abatement office was defunded",
    detail: "Created by the Noise Control Act of 1972; never replaced. There is no national US ceiling.",
  },
];
