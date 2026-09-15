export type Source = { n: number; text: string; host: string };

export const sources: Source[] = [
  { n: 1, text: 'National Environment Agency (Singapore), "Construction Noise Control" — maximum permissible noise levels table, and Construction Noise Control FAQs.', host: "nea.gov.sg" },
  { n: 2, text: "Ministry of Sustainability and the Environment (Singapore), Written Parliamentary Replies on construction noise and sound barriers (2024).", host: "mse.gov.sg" },
  { n: 3, text: "Environmental Protection Department (Hong Kong), Noise Control Ordinance restricted-hours definition, TM-GW/TM-PP/TM-DA and EIAO-TM daytime construction-noise standards.", host: "epd.gov.hk" },
  { n: 4, text: "Hong Kong Government press releases on Noise Control Ordinance prosecutions, including the Chevalier Construction record fine (2000) and subsequent cases (2017, 2019).", host: "info.gov.hk" },
  { n: 5, text: 'Ministry of Ecology and Environment (China), GB 12523-2011 "Emission standard of environment noise for boundary of construction site", and listing of GB 12523-2025 (effective 1 Jan 2026).', host: "mee.gov.cn" },
  { n: 6, text: "Noise Pollution Prevention Law of the People's Republic of China (2021, effective 2022), Articles 43 and 77; The Paper (澎湃新闻) explainer on the 2026 Ecological Environment Code.", host: "mee.gov.cn · thepaper.cn" },
  { n: 7, text: "Nanjing Municipal Ecology and Environment Bureau, published administrative penalty decisions for unauthorised night construction noise (2025–2026).", host: "sthjj.nanjing.gov.cn" },
  { n: 8, text: "Beijing Municipal Commission of Housing and Urban-Rural Development, notice on the 22:00–06:00 night construction ban; Shenzhen Municipal Government Gazette on the midday work ban.", host: "zjw.beijing.gov.cn · sz.gov.cn" },
  { n: 9, text: "Ministry of the Environment (Japan), overview of the Noise Regulation Law (騒音規制法の概要); prefectural and municipal guidance on specified-construction-work standards.", host: "env.go.jp" },
  { n: 10, text: "Japan Federation of Construction Contractors (日本建設業連合会), technical note on construction noise and vibration regulation, including Tokyo's stricter local ordinance.", host: "nikkenren.com" },
  { n: 11, text: "Taipei City Government, Construction-Work Noise Control Standards (營建工程噪音管制標準) and Noise Control Standards (噪音管制標準); New Taipei City EPB on the night-permit blacklist.", host: "laws.taipei.gov.tw · epd.ntpc.gov.tw" },
  { n: 12, text: "Korea Legislation Research Institute, Noise and Vibration Control Act; Park & Kim, Korea Environment Institute, Journal of Environmental Impact Assessment 22(4), 2013.", host: "koreascience.kr" },
  { n: 13, text: 'Seoul Solution (Seoul Metropolitan Government), "Anti-Noise Measures for Construction Sites" — the 2011 preventive barrier mandate and real-time monitoring programme.', host: "seoulsolution.kr" },
  { n: 14, text: "UK local-authority guidance on the Control of Pollution Act 1974 s.60/61 and BS 5228 (Tendring District Council; Cheshire West and Chester Council).", host: "tendringdc.gov.uk" },
  { n: 15, text: 'The Construction Index, "Bristol prosecutes noisy builders" (West-Tec Construction Ltd, 2019).', host: "theconstructionindex.co.uk" },
  { n: 16, text: "NSW Environment Protection Authority, Interim and Draft Construction Noise Guidelines.", host: "epa.nsw.gov.au" },
  { n: 17, text: 'NYC Department of Environmental Protection, Noise Code fact sheet; Council Member Ben Kallos, "How We Quieted the Noise in New York City."', host: "nyc.gov · benkallos.com" },
  { n: 18, text: "Umweltpakt Bayern / WEKA guidance summarising AVV Baulärm Immissionsrichtwerte by zone; Bundesverwaltungsgericht decision 7 A 11/11 (2012) on its continuing legal force.", host: "weka.de · gesetze.co" },
  { n: 19, text: 'Rex Deighton-Smith, "Process and performance-based regulation: challenges for regulatory governance and regulatory reform."', host: "onlinepubs.trb.org" },
];

export const disclaimer =
  "Compiled from publicly available regulator guidance, national standards, government notices, and reported enforcement cases as of September 2026. Regulations are amended periodically — China's framework changed twice in the year before writing — so verify current figures against the primary source before relying on them for a specific project.";
