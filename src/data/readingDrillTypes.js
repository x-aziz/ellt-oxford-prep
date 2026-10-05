import { READING_DRILLS } from './readingDrills.js';

const byKey = Object.fromEntries(READING_DRILLS.map((d) => [d.key, d]));

const NEW_GAPFILL_ONE_WORD = [
  { p: "Passage: “Despite repeated warnings from inspectors, the factory continued to discharge untreated waste into the river for over a decade.”<br>Complete: The factory discharged _____ waste into the river for years.", a: "untreated", why: "The one-word answer must be lifted exactly from the passage — 'untreated' describes the waste." },
  { p: "Passage: “The committee reached its decision only after three days of heated debate among its twelve members.”<br>Complete: It took three days of heated _____ before the committee decided.", a: "debate", why: "'Debate' appears directly in the passage describing the discussion." },
  { p: "Passage: “Although the drug reduced symptoms, researchers stressed that the results were still preliminary and required further trials.”<br>Complete: The findings were described as _____, not final.", a: "preliminary", why: "'Preliminary' is the exact word used to describe the early-stage results." },
  { p: "Passage: “Volunteers planted over two thousand saplings along the riverbank to help prevent soil erosion.”<br>Complete: The saplings were planted mainly to prevent soil _____.", a: "erosion", why: "The passage states the purpose directly: preventing soil erosion." },
  { p: "Passage: “The museum's new wing, funded entirely by private donors, will open to the public next spring.”<br>Complete: The new wing was paid for by private _____.", a: "donors", why: "'Donors' is the exact word referring to those who funded the wing." },
  { p: "Passage: “Many employees reported feeling more productive after their company introduced a four-day working week on a trial basis.”<br>Complete: The shorter week was introduced as a _____, not a permanent change.", a: "trial", why: "The passage specifies 'on a trial basis', so the missing word is 'trial'." },
  { p: "Passage: “Scientists were surprised to find that the lake's water temperature had risen by nearly three degrees in a single decade.”<br>Complete: The lake's temperature increased within a single _____.", a: "decade", why: "The time period given in the passage is exactly 'a decade'." },
  { p: "Passage: “Critics praised the novel's vivid imagery, though several complained that the narrative unfolded at a frustratingly slow pace.”<br>Complete: Several critics complained about the slow _____ of the narrative.", a: "pace", why: "'Pace' is used explicitly in the passage to describe how slowly the narrative unfolded." },
  { p: "Passage: “The airline announced it would suspend all flights to the region following the volcanic eruption.”<br>Complete: Flights to the region were _____ after the eruption.", a: "suspended", why: "The passage states flights were 'suspended' — note the verb form matches the gap exactly." },
  { p: "Passage: “Despite its small size, the start-up attracted investment from several major venture capital firms within its first year.”<br>Complete: The start-up gained backing from major venture _____ firms.", a: "capital", why: "'Venture capital firms' is the exact phrase; the missing word is 'capital'." },
];

const NEW_MULTIPLE_CHOICE = [
  { p: "Passage: “Although caffeine is widely consumed to boost alertness, its effects vary significantly between individuals due to differences in how quickly the liver metabolises it.”<br>Question: Why do people respond differently to caffeine?<br>A) Some people drink more coffee than others. B) The liver breaks it down at different speeds in different people. C) Caffeine only affects people who rarely drink coffee. D) Alertness is not actually linked to caffeine.", a: "B", why: "The passage directly states that differences come from how quickly the liver metabolises caffeine." },
  { p: "Passage: “City planners have increasingly favoured narrower streets and wider pavements, arguing that this discourages speeding while making neighbourhoods more walkable.”<br>Question: Why do planners prefer narrower streets?<br>A) They are cheaper to build. B) They reduce speeding and support walking. C) They allow more cars to park. D) They were required by a new national law.", a: "B", why: "The passage gives exactly two reasons: discouraging speeding and improving walkability." },
  { p: "Passage: “The probe will take nearly seven years to reach the outer planet, travelling through regions of space where sunlight is too weak to power solar panels.”<br>Question: Why can't the probe rely on solar panels for that part of its journey?<br>A) Solar panels are too heavy to carry. B) Sunlight is too weak that far from the sun. C) The probe will be travelling too fast. D) Solar panels were damaged during launch.", a: "B", why: "The passage explains that weak sunlight, not weight or damage, is the reason." },
  { p: "Passage: “Although inflation has slowed, prices for basic groceries remain well above pre-pandemic levels, squeezing household budgets.”<br>Question: What does the passage say about grocery prices?<br>A) They have returned to pre-pandemic levels. B) They are still higher than before the pandemic despite slower inflation. C) They are rising faster than ever before. D) They have no effect on household budgets.", a: "B", why: "The key contrast is 'inflation has slowed' but prices 'remain well above' earlier levels." },
  { p: "Passage: “Participants who kept a daily journal reported lower stress levels after eight weeks, though researchers could not rule out that simply taking time for oneself, rather than writing itself, explained the effect.”<br>Question: What uncertainty do the researchers mention?<br>A) Whether journaling reduces stress at all. B) Whether it was the writing or just the time alone that helped. C) Whether participants were telling the truth. D) Whether eight weeks was too short a trial.", a: "B", why: "The passage specifically raises doubt about writing vs. simply having time alone." },
  { p: "Passage: “Early critics dismissed the technology as a passing fad, yet within a decade it had become central to how the industry operated.”<br>Question: What happened to the technology described?<br>A) It failed as critics predicted. B) It became essential despite early scepticism. C) It was banned within the industry. D) It remained a minor, rarely used tool.", a: "B", why: "'Dismissed as a passing fad, yet became central' shows success despite doubts." },
  { p: "Passage: “The treaty was signed in 1954, but it was not ratified by all member states until nearly a decade later, delaying its practical effect.”<br>Question: Why did the treaty not take practical effect immediately?<br>A) It was rejected by most countries. B) Ratification by all members took almost ten more years. C) It was replaced by a newer treaty. D) No countries ever signed it.", a: "B", why: "The passage states full ratification took almost a decade after signing." },
  { p: "Passage: “While the new policy reduced emissions in the three cities where it was tested, experts caution that scaling it nationwide would require infrastructure investment far beyond current budgets.”<br>Question: What concern do experts raise about the policy?<br>A) It did not work in the test cities. B) Expanding it nationally would cost more than current budgets allow. C) It was never actually tested. D) It increased emissions elsewhere.", a: "B", why: "Experts' caution is specifically about the cost of nationwide infrastructure." },
];

export const READING_DRILL_TYPES = [
  {
    key: 'ordering',
    label: 'Paragraph Ordering',
    icon: '🔀',
    desc: 'Trace pronouns and connectors (this, it, however, despite…) to find the correct paragraph order.',
    exercises: [
      { id: 'ord-1', title: byKey.ordering.title, sub: byKey.ordering.sub, items: byKey.ordering.items },
    ],
  },
  {
    key: 'sentencefill',
    label: 'Sentence Fill',
    icon: '🧩',
    desc: 'Choose the correct candidate sentence for a gap in the middle or end of a passage.',
    exercises: [
      { id: 'sf-1', title: byKey.gapfill.title, sub: byKey.gapfill.sub, items: byKey.gapfill.items },
    ],
  },
  {
    key: 'vocab',
    label: 'Vocabulary in Context',
    icon: '📖',
    desc: "Pick the meaning that fits THIS sentence, not the word's most common meaning.",
    exercises: [
      { id: 'vc-1', title: byKey.vocab.title, sub: byKey.vocab.sub, items: byKey.vocab.items },
    ],
  },
  {
    key: 'gapfill1',
    label: 'Gap Fill — One Word',
    icon: '✏️',
    desc: 'Complete a sentence using exactly one word taken directly from the passage.',
    exercises: [
      { id: 'gf1-1', title: 'Complete From the Passage', sub: 'Lift the exact word from the text — no paraphrasing.', items: NEW_GAPFILL_ONE_WORD },
      { id: 'gf1-2', title: byKey.stats.title, sub: byKey.stats.sub, items: byKey.stats.items },
    ],
  },
  {
    key: 'tfng',
    label: 'True / False / Not Given',
    icon: '✅',
    desc: 'Watch for negation words (not, rarely, unless, inconsistent) that flip the meaning.',
    exercises: [
      { id: 'tfng-1', title: byKey.negation.title, sub: byKey.negation.sub, items: byKey.negation.items },
    ],
  },
  {
    key: 'mc',
    label: 'Multiple Choice',
    icon: '🔘',
    desc: 'Pick the option that is directly supported by the passage — no outside knowledge.',
    exercises: [
      { id: 'mc-1', title: 'Comprehension Multiple Choice', sub: 'Four options — only one is fully supported by the passage.', items: NEW_MULTIPLE_CHOICE },
      { id: 'mc-2', title: byKey.overgen.title, sub: byKey.overgen.sub, items: byKey.overgen.items },
    ],
  },
];