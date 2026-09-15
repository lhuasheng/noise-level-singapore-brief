// Single source of truth for the comparative dossier.
// Sourced from the four volumes of "Construction Noise Regulation" (Sept 2026).
// Figures are general-case, residential-adjacent thresholds as published by each
// regulator. Verify against the primary source before relying on them for a project.

export type Posture = "proactive" | "permit" | "negotiated" | "reactive";

export type Ceiling = {
  /** Headline daytime figure in dB(A), or null where no fixed statutory cap exists. */
  day: number | null;
  /** Headline night figure in dB(A), or null where the regime has no night number. */
  night: number | null;
  /** How the numbers above should be read. */
  note: string;
};

export type Jurisdiction = {
  id: string;
  name: string;
  /** Short label for dense chart axes. */
  short: string;
  region: string;
  volume: 1 | 2 | 3;
  instrument: string;
  regulator: string;
  approach: string;
  dayHours: string;
  nightRule: string;
  ceiling: Ceiling;
  /** Where the regulator actually measures the limit — site boundary vs. the affected receiver. Volume IV. */
  measuredWhere?: string;
  /** Whether distance to the receiver is a direct term in the limit itself. Volume IV; undefined where the dossier does not cover this jurisdiction's practice. */
  distanceBuiltIn?: string;
  penalty: string;
  /** Approximate USD equivalent of the maximum penalty, where the dossier published one. */
  penaltyUsd: number | null;
  posture: Posture;
  /** Illustrative 0-10 read of how numerically precise the standard is. */
  precision: number;
  /** Illustrative 0-10 read of how proactively it is policed. */
  enforcement: number;
  governingLogic: string;
  oneLine: string;
};

export const ANCHOR_ID = "singapore";

export const jurisdictions: Jurisdiction[] = [
  {
    id: "singapore",
    name: "Singapore",
    short: "SG",
    region: "Southeast Asia",
    volume: 1,
    instrument: "EPMA + Control of Noise at Construction Sites Regs",
    regulator: "National Environment Agency (NEA)",
    approach: "Outcome-based numeric ceiling",
    dayHours: "7am–7pm, Mon–Sat",
    nightRule:
      "Progressively lower caps to 10pm; no work Sundays or public holidays; sites within 150m of homes blacked out 10pm Sat – 7am Mon",
    ceiling: {
      day: 90,
      night: 55,
      note: "90 dBA over any 5-minute window and 75 dBA averaged across 7am–7pm, within 150m of a residential building; the cap tightens twice more, at 7pm and again at 10pm.",
    },
    measuredWhere: "1m from the exterior of the affected building",
    distanceBuiltIn:
      "Yes — sites within 150m of a residential building trigger a stricter tier and mandatory real-time metering",
    penalty: "Up to S$40,000 per offence on conviction",
    penaltyUsd: 29600,
    posture: "proactive",
    precision: 9,
    enforcement: 9,
    governingLogic:
      "A dense, land-constrained, unitary city-state with a technocratic regulator: precise numeric standards paired with the state capacity to monitor and enforce them continuously, rather than reactively.",
    oneLine: "Engineered pre-emptively by a single national agency.",
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    short: "HK",
    region: "East Asia",
    volume: 1,
    instrument: "Noise Control Ordinance (Cap. 400) + Technical Memoranda",
    regulator: "Environmental Protection Department (EPD)",
    approach: "Permit-gated restricted hours; guideline ceiling by day",
    dayHours: "7am–7pm, Mon–Sat",
    nightRule:
      "1900–0700 plus all Sundays and holidays: a Construction Noise Permit is required — no permit, no work, regardless of volume",
    ceiling: {
      day: null,
      night: null,
      note: "No statutory daytime cap under the Ordinance itself. A 65–75 dBA guideline binds only designated, EIA-assessed projects; the Acceptable Noise Level on a permit is set by the neighbourhood's Area Sensitivity Rating.",
    },
    measuredWhere: "1m from the external façade of the nearest sensitive receiver",
    distanceBuiltIn:
      "Indirectly — the Area Sensitivity Rating and predictive modelling both use distance; sources beyond 300m are routinely excluded from formal assessment",
    penalty:
      "Up to HK$200,000 on repeat offence, plus HK$20,000 per day continuing",
    penaltyUsd: 25600,
    posture: "permit",
    precision: 5,
    enforcement: 8,
    governingLogic:
      "A close cousin of Singapore's model — dense, permit-driven, hours-gated at night — but looser on ordinary daytime hours, where the ordinance relies on hour restriction rather than a blanket numeric ceiling.",
    oneLine: "Regulates by permit, not by number.",
  },
  {
    id: "china",
    name: "China",
    short: "CN",
    region: "East Asia",
    volume: 3,
    instrument:
      "GB 12523 + Noise Pollution Prevention Law (2021), now folded into the 2026 Ecological Environment Code",
    regulator:
      "Ministry of Ecology and Environment; city-level Ecology and Environment Bureaus",
    approach: "One flat national boundary standard, locally enforced",
    dayHours: "06:00–22:00, with a 12:00–14:00 break in many cities",
    nightRule:
      "Banned 22:00–06:00 without a permit; many cities add a 12:00–14:00 midday ban protecting the traditional afternoon rest",
    ceiling: {
      day: 70,
      night: 55,
      note: "A single flat national figure under GB 12523, with no tiering by building type. GB 12523-2025 took effect 1 January 2026, replacing the 2011 version.",
    },
    measuredWhere: "Site property boundary (场界)",
    distanceBuiltIn:
      "No — the flat 70/55 dB figure carries no information about how far the nearest resident actually lives",
    penalty: "¥10,000–100,000 for unauthorised night work",
    penaltyUsd: 14000,
    posture: "reactive",
    precision: 5,
    enforcement: 5,
    governingLogic:
      "A single national technical standard issued by the environment ministry, sitting inside a recently modernised national law and enforced case by case by hundreds of city-level bureaus, each empowered to fine within a statutory range.",
    oneLine: "A flat national number, enforced city by city.",
  },
  {
    id: "japan",
    name: "Japan",
    short: "JP",
    region: "East Asia",
    volume: 2,
    instrument: "Noise Regulation Law, 1968 (騒音規制法)",
    regulator:
      "National framework; prefecture designates zones; municipality enforces",
    approach: "Negotiated compliance — recommendation before order",
    dayHours: "Zone 1: no work 7pm–7am, ≤10h/day. Zone 2: no work 10pm–6am, ≤14h/day",
    nightRule:
      "Zone 1 also caps consecutive working days at six and bars Sunday and holiday work",
    ceiling: {
      day: 85,
      night: 85,
      note: "A single uniform 85 dB(A) boundary-line ceiling for specified construction work, applied across both zone tiers — blunter and less finely tiered than Singapore's matrix.",
    },
    measuredWhere: "Site boundary line (敷地境界線)",
    distanceBuiltIn: "No — the flat 85 dB(A) figure applies regardless of receptor distance",
    penalty:
      "Fine applies only for failing to file advance notice, filing falsely, or defying an improvement order — not for the initial breach",
    penaltyUsd: null,
    posture: "negotiated",
    precision: 4,
    enforcement: 3,
    governingLogic:
      "A national framework law administered through roughly 1,700 municipalities, run on an administrative-guidance (行政指導) model that strongly prefers negotiated correction over immediate punishment.",
    oneLine: "A 1968 framework law run on negotiated compliance.",
  },
  {
    id: "taiwan",
    name: "Taiwan",
    short: "TW",
    region: "East Asia",
    volume: 2,
    instrument: "Noise Control Act + Noise Control Standards (噪音管制法／標準)",
    regulator: "National standard; city/county Environmental Protection Bureau administers",
    approach: "Four-class zone matrix, locally administered",
    dayHours: "Clock hours shift by zone class across day / evening / night bands",
    nightRule:
      "New Taipei: night-work applications need documented mitigation, and three complaints in a month blacklists a project from further night permits",
    ceiling: {
      day: 100,
      night: 70,
      note: "Maximum instantaneous levels by zone class 1–4: up to 100 dB by day, tapering through 80–85 dB in the evening to 70–75 dB at night, alongside an equivalent-level (Leq) limit.",
    },
    measuredWhere: "Facility boundary (周界)",
    distanceBuiltIn: "No — the zone-class limit applies at the boundary, not by receptor distance",
    penalty: "Complaint-triggered fines, plus a preventive permit blacklist in Taipei/New Taipei",
    penaltyUsd: null,
    posture: "reactive",
    precision: 8,
    enforcement: 5,
    governingLogic:
      "A nationally standardised numeric matrix — structurally close to Singapore's precision — but administered by locally elected city and county governments with a direct political stake in visible complaint volume.",
    oneLine: "A precise national standard, enforced with growing local inventiveness.",
  },
  {
    id: "south-korea",
    name: "South Korea",
    short: "KR",
    region: "East Asia",
    volume: 2,
    instrument: "Noise and Vibration Control Act",
    regulator: "Ministry of Environment (standard); Si/Gun/Gu administers",
    approach: "Loose national floor, tightened reactively; Seoul went preventive",
    dayHours: "Set largely through local permit conditions rather than one statutory clock",
    nightRule:
      "Seoul, since 2011: any site over 1,000 m² must install an engineered soundproof wall rated to cut 26–30 dB before it can obtain a construction permit",
    ceiling: {
      day: 65,
      night: null,
      note: "65 dBA daytime residential, tightened in 2011 after construction was measured at roughly 65% of all national noise complaints; 70 dB+ in commercial areas.",
    },
    penalty: "Administrative penalties via district officials; Seoul layers permit-stage mandates on top",
    penaltyUsd: null,
    posture: "reactive",
    precision: 6,
    enforcement: 6,
    governingLogic:
      "A loose national floor, tightened reactively in response to measured complaint pressure, with the most advanced tools — preventive permitting, continuous monitoring — invented and deployed first by the capital city rather than legislated nationally.",
    oneLine: "A once-loose national floor, forced tighter by complaint data.",
  },
  {
    id: "germany",
    name: "Germany",
    short: "DE",
    region: "Europe",
    volume: 1,
    instrument: "AVV Baulärm, 1970 (under the BImSchG)",
    regulator: "Local building / environment authority (Bau-/Umweltamt)",
    approach: "Zone-and-time-band decibel matrix, no hour ban",
    dayHours: "No clock-hour ban at all — day band runs 07:00–20:00",
    nightRule:
      "No blackout window; the 20:00–07:00 night ceiling of 35–40 dBA in residential zones is itself the deterrent",
    ceiling: {
      day: 50,
      night: 35,
      note: "Indexed to statutory land-use zoning: purely residential 50/35, general residential 55/40, mixed-use 60/45, commercial 65/50, industrial 70 by day, hospitals and spa zones 45/35. Exceeding the zone limit by more than 5 dB(A) obliges the authority to order mitigation.",
    },
    measuredWhere: "Calculated at the nearest affected window (maßgeblicher Immissionsort)",
    distanceBuiltIn:
      "Yes — distance is a direct term in the calculation formula (Dₛ = 20·log₁₀(s) + 11), applied to every individually nearest building however far it sits",
    penalty: "Mitigation order once the measured rating level exceeds the zone limit by >5 dB(A)",
    penaltyUsd: null,
    posture: "reactive",
    precision: 9,
    enforcement: 4,
    governingLogic:
      "Civil-law codification culture: one nationally uniform administrative instrument, cross-indexed to a granular statutory land-use zoning system, applied mechanically rather than through local discretion.",
    oneLine: "A precise ceiling, procedurally triggered.",
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    short: "UK",
    region: "Europe",
    volume: 1,
    instrument: "Control of Pollution Act 1974, s.60/61",
    regulator: "~300 local councils (Environmental Health)",
    approach: '"Best practicable means" — a reasonableness test, not a number',
    dayHours: "~8am–6pm Mon–Fri (council-set)",
    nightRule:
      "Saturday 8am–1pm only; no Sunday work; deviation needs s.61 prior consent",
    ceiling: {
      day: null,
      night: null,
      note: 'No UK-wide statutory decibel limit. Compliance is judged against "best practicable means", informed by the voluntary BS 5228 code, which often applies a relative threshold of roughly 10 dB above background.',
    },
    measuredWhere: "Predicted at the receiver via the BS 5228 methodology; no fixed legal ceiling",
    distanceBuiltIn: "Yes — distance is a direct term in every predictive assessment",
    penalty: "Up to £20,000 per offence, plus a daily penalty for breaching an abatement notice",
    penaltyUsd: null,
    posture: "reactive",
    precision: 1,
    enforcement: 2,
    governingLogic:
      "Common-law nuisance doctrine plus strong local self-government: no fixed national number, case-by-case judgment by the nearest local authority, prosecution only as a last resort.",
    oneLine: "No fixed ceiling, locally negotiated.",
  },
  {
    id: "australia",
    name: "Australia (NSW)",
    short: "AU",
    region: "Oceania",
    volume: 1,
    instrument: "NSW EPA Construction Noise Guideline",
    regulator: "NSW EPA + local councils, via development-consent conditions",
    approach: "Relative noise-management level, not an absolute cap",
    dayHours: "7am–6pm Mon–Fri, 8am–1pm Sat",
    nightRule:
      "No Sunday or public-holiday work under standard hours; a 2021 revision added a preference ladder for out-of-hours work",
    ceiling: {
      day: null,
      night: null,
      note: "Relative, not absolute: ≤10 dB above background (LAeq 15-min) in standard hours, ≤5 dB outside them. Its force comes from being written into development-consent conditions project by project.",
    },
    measuredWhere: "Predicted at the receiver via the BS 5228 methodology; no fixed legal ceiling",
    distanceBuiltIn: "Yes — distance is a direct term in every predictive assessment",
    penalty: "Enforced through consent conditions by the EPA and local councils",
    penaltyUsd: null,
    posture: "reactive",
    precision: 3,
    enforcement: 2,
    governingLogic:
      "The same Anglophone common-law DNA as the UK — relative thresholds, local consent authorities, guideline rather than hard statute — reflecting Australia's inherited regulatory tradition.",
    oneLine: "No fixed ceiling, locally negotiated.",
  },
  {
    id: "united-states",
    name: "United States (NYC)",
    short: "US",
    region: "North America",
    volume: 1,
    instrument: "NYC Noise Code (Local Law 113) — no federal standard",
    regulator: "NYC Dept. of Environmental Protection (DEP)",
    approach: "No federal floor; stringency is whatever the city builds",
    dayHours: "7am–6pm Mon–Fri",
    nightRule:
      "Weekend or after-hours work needs a Department of Buildings variance plus a filed noise-mitigation plan",
    ceiling: {
      day: null,
      night: 75,
      note: "No daytime cap at all. After-hours work is capped at 75 dBA within 200 feet of a residence, phased down from 85 dB between 2018 and 2020; a 2018 reform lets inspectors measure from the street and issue stop-work orders.",
    },
    measuredWhere: "Explicit fixed radius from the residence",
    distanceBuiltIn:
      "Yes — the rule itself is a distance-dB pair: 75 dB(A) within 200 feet (≈61m) of a residence",
    penalty: "City-issued violations; no national penalty schedule exists",
    penaltyUsd: null,
    posture: "reactive",
    precision: 3,
    enforcement: 3,
    governingLogic:
      "Constitutional federalism with an empty federal seat: the 1972 federal noise-abatement office was defunded in 1982 and never replaced, so stringency is a function of local political will and municipal budget.",
    oneLine: "No floor at all — stringency is whatever the city government chooses to build.",
  },
];

export const byId = (id: string) => jurisdictions.find((j) => j.id === id);
