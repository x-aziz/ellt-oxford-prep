// The original Oxford ELLT Reading Section 3 has 16 questions. The bundled
// mocks only had 12, so these 4 extra questions per mock top them up.
// They are appended automatically by extendReadingMock()   it works on
// mocks coming from Firestore/admin too (matched by mock id), and does
// nothing if a mock already has 16+ Section-3 questions.

const TARGET = 16;

export const READING_EXTRA_S3 = {
  /* ---------- Mock 1   Neuroplasticity ---------- */
  1: [
    {
      type: "mc",
      text: "According to the passage, which brain region was found to be enlarged in experienced London taxi drivers?",
      opts: [
        "A. The cerebellum",
        "B. The hippocampus",
        "C. The prefrontal cortex",
        "D. The amygdala",
      ],
      ans: 1,
      ev: "possessed measurably larger hippocampi   the brain region most closely associated with spatial navigation",
      why: "B   directly stated. The other regions are real brain areas but are never mentioned.",
      trap: "C and D are well-known brain regions   do not choose a region just because you recognise the name.",
    },
    {
      type: "tf",
      text: "The passage claims that adults keep no meaningful plasticity once childhood has ended.",
      opts: ["True", "False", "Not Given"],
      ans: 1,
      ev: "while adults retain meaningful plasticity throughout life",
      why: "FALSE   adults 'retain meaningful plasticity throughout life'; it is only less rapid than in early childhood.",
      trap: "'Declines gradually with age' is not the same as 'disappears'.",
    },
    {
      type: "tf",
      text: "The passage states that taxi drivers who began driving at a younger age showed larger hippocampi.",
      opts: ["True", "False", "Not Given"],
      ans: 2,
      ev: "the degree of enlargement correlated with the length of the driver's experience",
      why: "NOT GIVEN   the passage links enlargement to length of experience, but says nothing about the age at which drivers began.",
      trap: "'Length of experience' and 'age when they started' sound similar but are different claims.",
    },
    {
      type: "mc",
      text: "Why does the author say critics have urged caution about neuroplasticity research?",
      opts: [
        "A. The research has been shown to be falsified",
        "B. Laboratory findings do not always carry over reliably to real-world settings",
        "C. Neuroplasticity has only been observed in animals",
        "D. The effects disappear completely after a few weeks",
      ],
      ans: 1,
      ev: "the transfer of findings from controlled laboratory studies to real-world educational or therapeutic applications remains inconsistent and incompletely understood",
      why: "B   directly paraphrases the final sentence. A, C and D are not stated.",
      trap: "A is far too strong   critics warn against 'overstating' implications, not that the research is false.",
    },
  ],

  /* ---------- Mock 2   Microplastics ---------- */
  2: [
    {
      type: "mc",
      text: "How many synthetic fibres can a single polyester garment release during one washing machine cycle?",
      opts: [
        "A. Up to seventy thousand",
        "B. Up to seven hundred thousand",
        "C. Up to seven million",
        "D. Up to five million",
      ],
      ans: 1,
      ev: "up to seven hundred thousand synthetic fibres during a single washing machine cycle",
      why: "B   seven hundred thousand is stated directly.",
      trap: "Seventy thousand / seven hundred thousand / seven million share the same digits   read the scale word.",
    },
    {
      type: "tf",
      text: "According to the passage, microplastics have been found only in marine environments.",
      opts: ["True", "False", "Not Given"],
      ans: 1,
      ev: "virtually every ecosystem studied: deep ocean trenches, Arctic ice cores, mountain streams, urban soils, and the human body itself",
      why: "FALSE   they are also found in mountain streams, urban soils and the human body.",
      trap: "The passage opens with oceans, but 'virtually every ecosystem' is much wider.",
    },
    {
      type: "tf",
      text: "The passage states that bans on microbeads have measurably reduced the amount of plastic in the oceans.",
      opts: ["True", "False", "Not Given"],
      ans: 2,
      ev: "Several countries have banned microbeads in cosmetics   a measure considered achievable",
      why: "NOT GIVEN   the ban is described as achievable, but no results on ocean plastic levels are reported.",
      trap: "A ban existing is not evidence that it has worked.",
    },
    {
      type: "mc",
      text: "Which of the following is an example of a SECONDARY microplastic, according to the passage?",
      opts: [
        "A. Microbeads added to cosmetics",
        "B. Plastic pellets used in industrial manufacturing",
        "C. Fragments formed as larger plastic items break down through weathering",
        "D. Particles deliberately produced at microscopic scale for a specific purpose",
      ],
      ans: 2,
      ev: "Secondary microplastics arise from the breakdown of larger plastic items through physical weathering, ultraviolet radiation, and biological activity",
      why: "C   secondary = broken down from larger items. A, B and D are all PRIMARY microplastics.",
      trap: "A, B and D all describe primary microplastics (manufactured small on purpose).",
    },
  ],

  /* ---------- Mock 3   Sleep ---------- */
  3: [
    {
      type: "e",
      text: "Which of the following is NOT listed in the passage as a long-term risk of chronic sleep deprivation?",
      opts: [
        "A. Obesity",
        "B. Type 2 diabetes",
        "C. Osteoporosis",
        "D. Cardiovascular disease",
      ],
      ans: 2,
      ev: "elevated risks of obesity, type 2 diabetes, cardiovascular disease, and immunological vulnerability",
      why: "C   osteoporosis is never mentioned. The other three are all listed.",
      trap: "EXCEPT questions: three options ARE in the text. Find the one that isn't.",
    },
    {
      type: "tf",
      text: "According to the passage, a single night of poor sleep has no measurable effect on cognitive performance.",
      opts: ["True", "False", "Not Given"],
      ans: 1,
      ev: "even a single night of poor sleep produces measurable impairment in cognitive performance",
      why: "FALSE   one night already produces 'measurable impairment'.",
      trap: "The passage stresses long-term harm, but explicitly says even ONE night has an effect.",
    },
    {
      type: "tf",
      text: "The passage states that teenagers need more sleep than adults.",
      opts: ["True", "False", "Not Given"],
      ans: 2,
      ev: "between seven and nine hours per night",
      why: "NOT GIVEN   only the adult recommendation is given; teenagers are never discussed.",
      trap: "This is true in real life, but TFNG questions only test what THIS passage says.",
    },
    {
      type: "inf",
      text: "What does the author imply about people who believe they function well on very little sleep?",
      opts: [
        "A. They all carry a rare genetic variant",
        "B. Most of them are probably underestimating the effects of sleep loss",
        "C. They should reduce their sleep further",
        "D. They are healthier than people who sleep nine hours",
      ],
      ans: 1,
      ev: "For the vast majority, however, the belief that one can adapt to chronic short sleep without penalty is not supported by the physiological evidence",
      why: "B   only about three percent have the variant, so for 'the vast majority' the belief is mistaken.",
      trap: "A overgeneralises: the variant is rare (around three percent), not universal among short sleepers.",
    },
  ],

  /* ---------- Mock 4   Gut microbiome ---------- */
  4: [
    {
      type: "mc",
      text: "Approximately how many microorganisms does the human gastrointestinal tract contain?",
      opts: [
        "A. Thirty-eight billion",
        "B. Thirty-eight million",
        "C. Thirty-eight trillion",
        "D. Three hundred and eighty trillion",
      ],
      ans: 2,
      ev: "approximately thirty-eight trillion microorganisms",
      why: "C   trillion, not billion or million.",
      trap: "Billion and trillion differ by a factor of 1,000   check the scale word.",
    },
    {
      type: "tf",
      text: "According to the passage, the gut microbiome has no connection to the immune system.",
      opts: ["True", "False", "Not Given"],
      ans: 1,
      ev: "It plays a pivotal role in training and regulating the immune system from early life",
      why: "FALSE   it plays a 'pivotal role' in training and regulating the immune system.",
      trap: "'Pivotal' = critically important; the claim 'no connection' is the opposite.",
    },
    {
      type: "tf",
      text: "The passage states that probiotic supplements are harmful to health.",
      opts: ["True", "False", "Not Given"],
      ans: 2,
      ev: "The scientific evidence for most commercially available probiotic products, however, falls substantially short of the claims made in their marketing",
      why: "NOT GIVEN   the passage says the evidence is weak, not that probiotics cause harm.",
      trap: "'Not proven to work' is different from 'harmful'.",
    },
    {
      type: "mc",
      text: "What does the passage say about disrupted early microbial colonisation, for example through caesarean delivery?",
      opts: [
        "A. It permanently prevents a healthy microbiome from forming",
        "B. It has been associated with higher rates of allergic and autoimmune conditions",
        "C. It improves the immune system’s ability to respond",
        "D. It only affects digestion, not immunity",
      ],
      ans: 1,
      ev: "has been associated with elevated rates of allergic and autoimmune conditions",
      why: "B   the passage says 'associated with'. A overstates ('permanently'); C and D contradict the text.",
      trap: "A uses 'permanently prevents'   the passage only reports an association.",
    },
  ],
};

/** Returns the mock with Section 3 topped up to 16 questions (if extras exist). */
export function extendReadingMock(mock) {
  if (!mock?.s3?.qs) return mock;
  const have = mock.s3.qs.length;
  if (have >= TARGET) return mock;
  const extras = READING_EXTRA_S3[mock.id];
  if (!extras) return mock;
  const add = extras
    .slice(0, TARGET - have)
    .map((q, i) => ({ ...q, n: have + i + 1 }));
  return { ...mock, s3: { ...mock.s3, qs: [...mock.s3.qs, ...add] } };
}
