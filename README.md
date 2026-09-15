# Construction Noise Regulation: Singapore in International Context

A data-story website comparing how **ten jurisdictions** define, measure, and
enforce acceptable construction noise — and what the differences reveal about
legal tradition, governance structure, and urban density.

Singapore is the anchor case. The other nine are Hong Kong, China, Japan,
Taiwan, South Korea, Germany, the United Kingdom, Australia (NSW), and the
United States (illustrated by New York City).

The site is built from four source volumes of a comparative regulatory
dossier (September 2026):

| Vol. | Scope |
|------|-------|
| I | Singapore, Hong Kong, UK, Australia, USA, Germany |
| II | Japan, Taiwan, South Korea — against Singapore |
| III | China, Hong Kong, Singapore — visual brief |
| IV | Distance, decibels, and the point of concern — the attenuation formulas, equipment loudness, and measurement-location practice behind every ceiling in Volumes I–III |

---

## The story the site tells

1. **The stakes** — the complaint volumes and the empty US federal seat.
2. **The spectrum** — a two-axis read of *numeric precision* vs *enforcement
   proactivity*. Singapore sits alone in the high/high quadrant.
3. **Ten models side by side** — a sortable comparison of instrument, hours,
   ceiling, and enforcement posture.
4. **A typical weekday** — hour-by-hour permitted / capped / banned bands for
   China, Hong Kong and Singapore. Singapore is the only one never fully
   banned on a weekday.
5. **Noise ceilings** — day vs night limits in dB(A), with the three
   jurisdictions that publish *no fixed number* deliberately omitted rather
   than estimated.
6. **Distance** *(Volume IV)* — the attenuation formulas behind every ceiling,
   and where each jurisdiction actually measures: at the site boundary
   (China, Japan, Taiwan) or at the affected receiver (Singapore, Hong Kong,
   Germany, the BS 5228-derived UK/Australia).
7. **Equipment loudness** *(Volume IV)* — Sound Power Level for ten pieces of
   construction equipment, from a 96 dB wheeled loader to a 122 dB pneumatic
   breaker.
8. **A real worked example** *(Volume IV)* — a Hong Kong EIA's own calculation
   chain from equipment to predicted receptor level at a real 230m distance.
9. **Turning the formula around** *(Volume IV)* — an illustrative "how far is
   far enough" calculation, a log-scale distance/decibel curve against real
   jurisdictional limits, two real enforcement cases, and the source-vs-listener
   synthesis.
10. **What a breach costs** — maximum penalties, approximate US$.
11. **Why the models differ** — density, legal tradition, state structure, and
    enforcement culture; plus the midday ban as the one genuinely cultural marker.
12. **Sources** — 34 primary references across all four volumes.

---

## Design pipeline

This repository is the code end of a three-tool pipeline.

### 1. Canva — visual design

Two designs drive the site's visual language (charcoal ground, warm off-white
type, a single burnt-orange accent reserved for Singapore):

| Design | Canva |
|---|---|
| Editorial share card (1600×900) | [view](https://www.canva.com/d/2Gvfmu5NYKNsegZ) · [edit](https://www.canva.com/d/oOxgKDOlA406uL-) |
| Comparative dossier infographic (800×2000) | [view](https://www.canva.com/d/R2KUIFyk-nkFkr7) · [edit](https://www.canva.com/d/_4MaQiYDWDCtlGc) |

> **Exported assets are not yet committed.** The build environment that
> generated this repo could not reach Canva's asset hosts, so the PNGs were
> never written to disk. To add them: export each design as PNG from Canva and
> drop them in `public/canva/` as `share-card.png` and `infographic.png`. The
> site does not depend on them — the share/OG image is generated in code (see
> `src/app/opengraph-image.tsx`), which mirrors the Canva share card.

### 2. Figma — wireframe

Desktop (1440) and mobile (390) wireframes of every section, built as
auto-layout frames:

**[Noise Level Management — Wireframes](https://www.figma.com/design/QVclgIyl3jGvo6sHxKOjEd)**

The wireframe is the structural spec: 12 desktop sections from nav through
footer, with the scatter, timeline, and bar-chart geometry blocked out before
any component was written.

### 3. Vercel — deployment

Deployed from this repository. See **Deploying** below.

---

## Data model

All content lives in `src/data/` and is the single source of truth for every
chart, table, and caption — no figure is hard-coded in a component.

```
src/data/
  jurisdictions.ts   the ten jurisdictions: instrument, hours, ceilings,
                     penalties, enforcement posture, governing logic, and
                     (Volume IV) where each one measures its limit
  narrative.ts       weekday timeline bands, the four structural drivers,
                     one-line reads, headline stats
  distance.ts        Volume IV: attenuation formulas, equipment sound power
                     levels, the Discovery Bay worked example, distance
                     thresholds, the illustrative calculation, real cases,
                     and the source-vs-listener synthesis
  sources.ts         34 primary sources + the currency disclaimer
```

Two fields — `precision` and `enforcement` — are **qualitative 0–10
assessments** derived from the regulatory texts, used only for the scatter
plot. They are labelled as illustrative in the UI and are not an official
ranking.

### A note on omitted data

Hong Kong, the UK and Australia set no fixed statutory decibel ceiling. Their
bars are **omitted from the chart rather than estimated**, and the omission is
named in the caption — the absence of a number is one of the report's actual
findings, not missing data.

South Korea's measurement-location practice (site boundary vs. receiver) is
not covered by Volume IV's own sources, so the `Distance` section's
jurisdiction table omits it rather than inferring one — `measuredWhere` and
`distanceBuiltIn` are optional fields on `Jurisdiction`, populated only for
the nine jurisdictions the dossier actually documents.

---

## Visualization decisions

Chart colour follows a validated palette rather than taste:

- **Scatter** — one categorical pair (blue + orange), orange reserved for
  Singapore as the anchor entity. Direct-labelled with jurisdiction codes.
- **Ceilings** — a single-hue blue *ordinal* ramp for day vs night, because
  the two bars are one measure at two time bands, not two independent series.
- **Weekday timeline** — the fixed status palette (good / warning / critical),
  paired with **SVG hatch patterns** and a labelled legend so the state is
  never carried by colour alone.
- **Equipment loudness** *(Volume IV)* — a single-hue ordinal bar chart
  (magnitude, one series), sorted descending, with the source-cited min–max
  range drawn as a floating bar rather than collapsed to one figure.
- **Distance/decibel curve** *(Volume IV)* — the attenuation relationship is
  exactly linear in log-distance space, so it's drawn as a straight line
  rather than sampled points; reference thresholds are recessive dashed
  lines with direct labels, not competing hues, since they annotate the
  curve rather than encode a second data series.

All palettes (light and dark) were run through the data-viz palette
validator; every check passes. Each chart also ships a hover layer — the
distance curve adds a pointer-driven crosshair plus keyboard-focusable
checkpoints — and the ceilings chart has a table view.

---

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

Requires Node 20+.

## Deploying

The app is a standard Next.js 16 App Router project and deploys to Vercel with
no configuration. Either import the repository from the Vercel dashboard, or:

```bash
npx vercel --prod
```

## Accessibility & responsiveness

- Light and dark themes, each with its own validated palette; the in-page
  toggle wins over the OS setting in both directions.
- No horizontal page scroll at 390px — wide tables and charts scroll inside
  their own containers, and the comparison table becomes stacked cards below
  820px.
- Scatter points are keyboard-focusable; live regions announce the hovered
  jurisdiction; `prefers-reduced-motion` is honoured.

## Caveat

Regulations are amended periodically — China's framework changed twice in the
year before these volumes were written. Verify current figures against the
primary source before relying on them for a specific project.
