/*
  Reading drills, modelled on the Oxford ELLT reading tasks.

  Item kinds used by features/practice/DrillExerciseRunner.jsx:
    order     drag five paragraphs into the correct order
    sentfill  passage with gaps [n]; choose a sentence A–G for each gap
    wordfill  passage with gaps [n]; choose a word from a word bank
    gap       type ONE word taken from the passage
    mc        multiple choice (passage optional; **bold** marks a word)
    tf        True / False / Not Given
*/

const units = (items) =>
  items.reduce(
    (n, it) => n + (it.paras ? it.paras.length : it.gaps ? it.gaps.length : 1),
    0,
  );

const ex = (id, title, sub, items) => ({
  id,
  title,
  sub,
  items,
  count: units(items),
});

const order = (paras) => ({ kind: "order", tag: "PARAGRAPH ORDERING", paras });

const mc = (passage, text, opts, ans, why, tag = "MULTIPLE CHOICE", trap) => ({
  kind: "mc",
  tag,
  passage,
  text,
  opts,
  ans,
  why,
  ...(trap ? { trap } : {}),
});

const tf = (passage, text, ans, why) => ({
  kind: "tf",
  tag: "TRUE / FALSE / NOT GIVEN",
  passage,
  text,
  ans,
  why,
});

const gap = (passage, text, ans, why) => ({
  kind: "gap",
  tag: "GAP FILL",
  passage,
  text,
  ans,
  why,
});

/* ------------------------------ Paragraph ordering ------------------------------ */
const ORDER_BEES = order([
  {
    l: "A",
    pos: 4,
    txt: "However, not everyone welcomes the trend. Some ecologists warn that large numbers of managed honeybees compete for food with wild pollinators such as bumblebees and solitary bees, which are already under pressure from habitat loss.",
    why: "“However” contrasts with the benefits just described, and “the trend” points back to the spread of urban beekeeping. It introduces the criticism that paragraph C answers.",
  },
  {
    l: "B",
    pos: 1,
    txt: "Over the past decade, keeping bees on city rooftops has shifted from an eccentric hobby to a fast-growing movement. Cities such as London, Paris and New York now host thousands of hives, many of them on office blocks and hotel roofs.",
    why: "No pronoun or connector looks backwards. It introduces the topic, so it must come first.",
  },
  {
    l: "C",
    pos: 5,
    txt: "These concerns have led several cities to rethink their approach. Rather than encouraging more hives, they are now planting wildflower corridors and asking beekeepers to register their colonies, so that the number of hives matches the food available.",
    why: "“These concerns” refers to the worries about competition in A. It then gives the cities' response, which makes it the conclusion.",
  },
  {
    l: "D",
    pos: 3,
    txt: "This surprising advantage comes from the variety of plants in parks, gardens and balconies, which flower at different times from early spring to late autumn. As a result, urban honey is often richer in flavour, and colonies tend to survive winters better.",
    why: "“This surprising advantage” can only mean the better food supply described in E.",
  },
  {
    l: "E",
    pos: 2,
    txt: "At first glance, a city seems an unlikely home for bees. Yet urban areas often offer a more varied and more reliable food supply than the countryside, where vast fields of a single crop can leave bees short of nectar for much of the year.",
    why: "It follows the introduction of city hives and explains why they work (“Yet…”). D then builds on this advantage.",
  },
]);

const ORDER_BICYCLE = order([
  {
    l: "A",
    pos: 3,
    txt: "To go faster, designers made the front wheel larger and larger. Unfortunately, this made the bicycle both dangerous and difficult to mount, and falling from such a height could cause serious injury.",
    why: "“To go faster” builds on the slow, jolting boneshaker in D. It describes the problem that E solves.",
  },
  {
    l: "B",
    pos: 5,
    txt: "Thanks to this design, cycling became an everyday form of transport rather than a daring sport. Within a few decades, millions of ordinary people, including many women, were using bicycles to travel to work and gain a new sense of independence.",
    why: "“This design” refers to the safety bicycle in E. It describes the final result.",
  },
  {
    l: "C",
    pos: 1,
    txt: "The bicycle is so familiar today that it is easy to forget how long it took to perfect. The earliest version, built in Germany in 1817, had no pedals at all; riders simply pushed themselves along with their feet.",
    why: "It introduces the topic and the very first machine. Nothing in it points backwards.",
  },
  {
    l: "D",
    pos: 2,
    txt: "Pedals appeared in the 1860s, attached directly to the front wheel. The result was a machine known as the “boneshaker”, named after the jolting ride it gave on rough roads, and it was hardly a comfortable invention.",
    why: "Pedals are a development of the pedal-less machine in C, so D comes second.",
  },
  {
    l: "E",
    pos: 4,
    txt: "The solution came in the 1880s with the “safety bicycle”. Its two wheels were the same size, and a chain linked the pedals to the rear wheel, so riders could sit low and travel quickly without risk.",
    why: "“The solution” answers the danger described in A.",
  },
]);

const ORDER_PLASTIC = order([
  {
    l: "A",
    pos: 2,
    txt: "One reason is that plastic is not a single material. Dozens of different types exist, and each must be sorted and processed separately, which makes recycling slow and expensive.",
    why: "“One reason” explains the low recycling figure given in D.",
  },
  {
    l: "B",
    pos: 4,
    txt: "Because of these limits, many experts now argue that recycling alone will never be enough. They want governments to cut plastic production at its source, for example by banning unnecessary packaging and setting targets for reusable containers.",
    why: "“These limits” sums up the two difficulties in A and E. It gives the experts' conclusion.",
  },
  {
    l: "C",
    pos: 5,
    txt: "Supporters of recycling accept that point, but they insist the system still matters. Even an imperfect process, they say, keeps millions of tonnes of waste out of the oceans each year, and better design could make it far more effective.",
    why: "“That point” refers to the experts' argument in B. This is the reply, so it comes last.",
  },
  {
    l: "D",
    pos: 1,
    txt: "Most people believe that putting plastic in the recycling bin solves the problem. In reality, only around nine percent of all plastic ever produced has been recycled, and the rest has been burned, buried or left to pollute the environment.",
    why: "It introduces the topic with a surprising statistic. The other paragraphs explain it.",
  },
  {
    l: "E",
    pos: 3,
    txt: "Another difficulty is that plastic degrades each time it is reprocessed. A bottle can rarely become a new bottle more than a few times; more often it is turned into lower-quality products such as carpet fibre, which cannot be recycled again.",
    why: "“Another difficulty” adds a second reason after the first one in A.",
  },
]);

/* -------------------------------- Sentence fill -------------------------------- */
const SENT_TRAIN = {
  kind: "sentfill",
  tag: "SENTENCE FILL",
  title: "The Return of the Night Train",
  text: "Ten years ago, many European night trains were being withdrawn, because cheap flights made them seem old-fashioned. [1] Today, the picture looks very different, with several countries investing in new sleeper services.\n\nPart of the reason is environmental. A journey by train produces only a fraction of the carbon emissions of the same trip by plane. [2] Many of them say they are looking for a way to travel that fits their values.\n\nComfort has also improved. Modern sleeper carriages offer private cabins with proper beds, showers and even small desks. [3] Instead of arriving tired from an early flight, passengers wake up in the centre of a new city.\n\nNot everyone is convinced, however. Night trains are expensive to run, and tickets can cost more than a budget flight. [4] Supporters argue that governments should help by cutting the fees charged for using the rail network.\n\n[5] If they do, the night train may soon become an ordinary part of European travel once again.",
  options: [
    { l: "A", txt: "As a result, many operators struggle to make a profit." },
    {
      l: "B",
      txt: "Routes were closed, and in some countries the last sleeper trains stopped running altogether.",
    },
    { l: "C", txt: "The first sleeper trains were introduced in the nineteenth century." },
    { l: "D", txt: "There are signs that some governments are starting to listen." },
    {
      l: "E",
      txt: "Growing concern about climate change has been especially strong among younger travellers.",
    },
    { l: "F", txt: "In effect, the journey doubles as a night in a hotel." },
    { l: "G", txt: "Flights are often delayed by bad weather in winter." },
  ],
  gaps: [
    { n: 1, ans: "B", why: "The next sentence says “Today, the picture looks very different”, so the gap must describe the decline.", },
    { n: 2, ans: "E", why: "“Many of them” needs a plural group before it: younger travellers.", },
    { n: 3, ans: "F", why: "Cabins with beds lead to the idea of sleeping on the train, which replaces a hotel night.", },
    { n: 4, ans: "A", why: "“Expensive to run” leads to “operators struggle to make a profit”, and then supporters ask for help.", },
    { n: 5, ans: "D", why: "“If they do” needs a plural subject, the governments, in the sentence before.", },
  ],
};

const SENT_HANDWRITING = {
  kind: "sentfill",
  tag: "SENTENCE FILL",
  title: "Why Handwriting Still Matters",
  text: "Many schools now encourage children to type rather than write by hand, and few people would deny that keyboards are faster. [1] Researchers, however, have begun to question whether speed is the most important thing.\n\nIn one well-known study, students took notes in a lecture, half using laptops and half using pens. [2] When tested a week later, however, the handwriters answered conceptual questions far more successfully.\n\nThe researchers believe the reason lies in how each group worked. Typists tended to record the lecture word for word, almost without thinking. [3] Because they could not write fast enough to copy everything, they had to decide what mattered and put it in their own words.\n\nStudies of the brain offer further evidence. [4] Writing letters by hand activates areas linked to memory and language more strongly than pressing keys does.\n\nNone of this means that keyboards should be abandoned. [5] The best approach, many teachers suggest, is a balance in which each tool is used for what it does best.",
  options: [
    { l: "A", txt: "For long essays and reports, typing remains the sensible choice." },
    { l: "B", txt: "Those using pens, on the other hand, worked very differently." },
    { l: "C", txt: "Most schools have now banned laptops altogether." },
    {
      l: "D",
      txt: "The laptop users produced much longer notes, and in the short term they seemed to do just as well.",
    },
    {
      l: "E",
      txt: "Typing also lets pupils correct mistakes instantly and produce neat, readable work.",
    },
    {
      l: "F",
      txt: "Images taken while people write reveal a clear difference between the two methods.",
    },
    { l: "G", txt: "Handwriting is slower than typing, so it is unsuitable for examinations." },
  ],
  gaps: [
    { n: 1, ans: "E", why: "It adds another advantage of typing, so “Researchers, however…” can contrast with it.", },
    { n: 2, ans: "D", why: "“However” in the next sentence needs a result that favoured the laptop users first.", },
    { n: 3, ans: "B", why: "“Because they could not write fast enough…” needs a new group (pen users) introduced before it.", },
    { n: 4, ans: "F", why: "It introduces the brain evidence that the next sentence explains.", },
    { n: 5, ans: "A", why: "It gives a case where keyboards are useful, leading to “a balance”.", },
  ],
};

const SENT_CLOTHES = {
  kind: "sentfill",
  tag: "SENTENCE FILL",
  title: "The Problem with Cheap Clothes",
  text: "Fashion has never been cheaper. A T-shirt can cost less than a sandwich, and new styles appear in shops every week. [1] Behind these low prices, however, lies a hidden cost.\n\nThe most obvious cost is environmental. Producing a single cotton T-shirt requires thousands of litres of water. [2] Synthetic fabrics such as polyester avoid this problem, but they release microscopic plastic fibres every time they are washed.\n\nThere is also a human cost. Many garments are made in countries where wages are low and safety rules are weak. [3] In 2013, the collapse of a factory building in Bangladesh killed more than a thousand workers and shocked the world.\n\nSome brands have responded by promising to improve conditions. [4] Critics point out that many of these promises remain unfulfilled, and that the pressure to produce clothes quickly makes real change difficult.\n\nShoppers can make a difference too. [5] Buying fewer items, choosing better quality and repairing what we already own all reduce the demand for fast fashion.",
  options: [
    {
      l: "A",
      txt: "Several large retailers, for example, have pledged to pay fair wages and publish lists of their factories.",
    },
    { l: "B", txt: "Cotton is also much more comfortable than synthetic fabric." },
    { l: "C", txt: "Small changes in our own habits can add up to a large effect." },
    {
      l: "D",
      txt: "Many shoppers now buy more clothes than ever before and wear each item only a few times.",
    },
    { l: "E", txt: "The consequences of this can be tragic." },
    { l: "F", txt: "Clothes are now sold online as well as in shops." },
    {
      l: "G",
      txt: "Growing cotton also requires large amounts of pesticide, which can damage soil and rivers.",
    },
  ],
  gaps: [
    { n: 1, ans: "D", why: "It continues the idea of cheap, disposable fashion before the “hidden cost” is revealed.", },
    { n: 2, ans: "G", why: "“This problem” in the next sentence means the environmental damage from growing cotton.", },
    { n: 3, ans: "E", why: "“The consequences of this” links low wages and weak safety to the factory collapse.", },
    { n: 4, ans: "A", why: "“These promises” needs promises mentioned just before it.", },
    { n: 5, ans: "C", why: "It makes a general point that the following examples explain.", },
  ],
};

/* ----------------------------------- Word fill ----------------------------------- */
const WORD_TREES = {
  kind: "wordfill",
  tag: "WORD FILL",
  title: "The Quiet Power of Trees",
  text: "Trees do far more than make cities look attractive. On a hot summer day, the shade of a single large tree can [1] the temperature of the air around it by several degrees. Trees also [2] carbon dioxide from the atmosphere and store it in their trunks and roots. In addition, their leaves trap dust and pollution, so the air in leafy streets is noticeably [3].\n\nStudies have even shown that patients who can see trees from their hospital windows [4] more quickly than those who look at a wall. Despite these benefits, thousands of mature trees are cut down every year to make [5] for new buildings and roads. Many councils are now trying to [6] this trend by protecting old trees and planting new ones.",
  bank: ["absorb", "careful", "cleaner", "lower", "raise", "recover", "reverse", "space"],
  gaps: [
    { n: 1, ans: "lower", why: "“Lower the temperature”: shade makes the air cooler. “Raise” would be the opposite.", },
    { n: 2, ans: "absorb", why: "Trees “absorb carbon dioxide” and store it.", },
    { n: 3, ans: "cleaner", why: "After “is noticeably”, you need a comparative adjective: cleaner air.", },
    { n: 4, ans: "recover", why: "Patients “recover more quickly”. A verb is needed after “patients who can see…”.", },
    { n: 5, ans: "space", why: "The collocation is “make space for”.", },
    { n: 6, ans: "reverse", why: "“Reverse this trend” means to turn it around.", },
  ],
};

const WORD_LANGUAGE = {
  kind: "wordfill",
  tag: "WORD FILL",
  title: "The Benefits of a Second Language",
  text: "Learning a second language is often seen as a way to [1] job prospects, but its benefits go much further. Research suggests that bilingual people are [2] at switching between tasks, because they constantly choose which language to use. Some studies even indicate that speaking two languages can [3] the onset of memory problems in later life.\n\nOf course, becoming fluent takes time and [4] effort. The most successful learners tend to practise a little every day rather than studying for several hours once a week, since regular exposure helps the brain to [5] new vocabulary. It also helps to find a [6] who will correct your mistakes kindly.",
  bank: ["better", "delay", "improve", "partner", "rarely", "regular", "retain", "silent"],
  gaps: [
    { n: 1, ans: "improve", why: "“Improve job prospects”: a verb that fits “a way to…”.", },
    { n: 2, ans: "better", why: "“Are better at” compares them with other people.", },
    { n: 3, ans: "delay", why: "“Delay the onset” of memory problems means to make them start later.", },
    { n: 4, ans: "regular", why: "An adjective before “effort”. The next sentence stresses practising every day.", },
    { n: 5, ans: "retain", why: "The brain “retains” (keeps) new vocabulary.", },
    { n: 6, ans: "partner", why: "A noun is needed after “a”. A language partner corrects your mistakes.", },
  ],
};

const WORD_SCOOTERS = {
  kind: "wordfill",
  tag: "WORD FILL",
  title: "The Rise of Electric Scooters",
  text: "Electric scooters have become a common [1] in many cities, offering a quick and cheap way to cover short distances. Supporters argue that they [2] traffic jams and cut pollution, because each journey replaces a trip by car.\n\nCritics, however, point out that scooters left on pavements can be [3] for pedestrians, especially people with poor eyesight or limited mobility. Accidents have also [4] sharply in some places, and many of the injuries involve riders who were not wearing helmets. In response, several cities have introduced strict [5], such as speed limits and designated parking areas. Whether scooters will remain popular in the long [6] will depend on how well these problems are solved.",
  bank: ["ease", "hazardous", "increased", "rare", "rules", "run", "shortly", "sight"],
  gaps: [
    { n: 1, ans: "sight", why: "The fixed phrase is “a common sight”.", },
    { n: 2, ans: "ease", why: "Scooters “ease traffic jams”, meaning they make them less severe.", },
    { n: 3, ans: "hazardous", why: "An adjective meaning dangerous: “hazardous for pedestrians”.", },
    { n: 4, ans: "increased", why: "“Accidents have also increased sharply”: a past participle after “have”.", },
    { n: 5, ans: "rules", why: "Speed limits and parking areas are examples of rules.", },
    { n: 6, ans: "run", why: "The fixed phrase is “in the long run”.", },
  ],
};

/* ------------------------- Typed gap fill (one word) ------------------------- */
const TYPED_ITEMS = [
  gap("“Despite repeated warnings from inspectors, the factory continued to discharge untreated waste into the river for over a decade.”", "The factory discharged _____ waste into the river for years.", "untreated", "Lift the exact word from the passage: “untreated” describes the waste."),
  gap("“The committee reached its decision only after three days of heated debate among its twelve members.”", "It took three days of heated _____ before the committee decided.", "debate", "“Debate” appears directly in the passage."),
  gap("“Although the drug reduced symptoms, researchers stressed that the results were still preliminary and required further trials.”", "The findings were described as _____, not final.", "preliminary", "“Preliminary” is the exact word used for the early-stage results."),
  gap("“Volunteers planted over two thousand saplings along the riverbank to help prevent soil erosion.”", "The saplings were planted mainly to prevent soil _____.", "erosion", "The purpose is stated directly: preventing soil erosion."),
  gap("“The museum's new wing, funded entirely by private donors, will open to the public next spring.”", "The new wing was paid for by private _____.", "donors", "“Donors” is the exact word for those who funded it."),
  gap("“Many employees reported feeling more productive after their company introduced a four-day working week on a trial basis.”", "The shorter week was introduced as a _____, not a permanent change.", "trial", "The passage says “on a trial basis”."),
  gap("“Scientists were surprised to find that the lake's water temperature had risen by nearly three degrees in a single decade.”", "The lake's temperature increased within a single _____.", "decade", "The time period is exactly “a decade”."),
  gap("“Critics praised the novel's vivid imagery, though several complained that the narrative unfolded at a frustratingly slow pace.”", "Several critics complained about the slow _____ of the narrative.", "pace", "“Pace” describes how slowly the narrative unfolded."),
  gap("“The airline announced it would suspend all flights to the region following the volcanic eruption.”", "Flights to the region were _____ after the eruption.", "suspended", "Check the verb form: the gap needs “suspended”, not “suspend”."),
  gap("“Despite its small size, the start-up attracted investment from several major venture capital firms within its first year.”", "The start-up gained backing from major venture _____ firms.", "capital", "“Venture capital firms” is the exact phrase."),
];

/* ------------------------------ Vocabulary in context ------------------------------ */
const V = (sentence, word, opts, ans, why) =>
  mc(sentence, `The word “${word}” is closest in meaning to:`, opts, ans, why, "VOCABULARY");

const VOCAB_ITEMS = [
  V("“The board decided to **table** the proposal until next quarter.”", "table", ["to place on a table", "to postpone discussion of", "to vote in favour of", "to write down"], 1, "In a meeting context, to “table” a proposal means to set it aside until later."),
  V("“Her argument, though **elegant**, failed to account for the exception.”", "elegant", ["fashionable and expensive", "long and complicated", "neat and cleverly constructed", "emotional and dramatic"], 2, "An “elegant” argument is intellectually neat and well built, not fashionable."),
  V("“The company's **volatile** stock price worried investors.”", "volatile", ["steadily rising", "very low", "chemically explosive", "unpredictable and changing rapidly"], 3, "In finance, “volatile” describes rapid, unpredictable price swings."),
  V("“Critics called the film's pacing **glacial**.”", "glacial", ["extremely slow", "icy cold", "unusually fast", "confusing"], 0, "Used figuratively, “glacial” means very slow, like a glacier."),
  V("“The findings **corroborate** earlier research.”", "corroborate", ["contradict", "repeat word for word", "support and confirm", "replace"], 2, "“Corroborate” means to support or confirm, the opposite of contradict."),
  V("“The committee's decision was largely **arbitrary**.”", "arbitrary", ["official and binding", "based on whim rather than reason", "carefully reasoned", "widely welcomed"], 1, "“Arbitrary” means lacking clear reasoning or system."),
  V("“The professor's tone was notably **dry** during the lecture.”", "dry", ["lacking moisture", "angry", "enthusiastic", "deadpan and unemotional"], 3, "A “dry” tone is flat, understated and often wryly humorous."),
  V("“The new policy **supersedes** all previous guidelines.”", "supersedes", ["replaces and takes precedence over", "supports alongside", "summarises", "explains"], 0, "“Supersedes” means it replaces and overrides what came before."),
  V("“The report's conclusions were **tentative** at best.”", "tentative", ["confident and final", "uncertain and provisional", "completely wrong", "surprisingly detailed"], 1, "“Tentative” signals hesitancy, the opposite of final."),
  V("“The negotiations reached a sudden **impasse**.”", "impasse", ["breakthrough", "conclusion", "deadlock where no progress is possible", "delay caused by weather"], 2, "An “impasse” is a standstill, not a breakthrough."),
];

/* ------------------------------- True / False / Not Given ------------------------------- */
const NEGATION_ITEMS = [
  tf("“The drug showed no significant side effects in the trial.”", "The drug caused noticeable side effects.", 1, "“No significant side effects” contradicts “caused noticeable side effects”."),
  tf("“Few scientists dispute the theory today.”", "The theory is widely accepted.", 0, "If few dispute it, most accept it: the same meaning stated positively."),
  tf("“It is unlikely that the policy will be reversed before 2030.”", "The policy will definitely change before 2030.", 1, "“Unlikely” contradicts “definitely”."),
  tf("“The results, while promising, have not yet been replicated.”", "Other researchers have confirmed the results.", 1, "“Not yet replicated” means no confirmation has happened."),
  tf("“Unless funding increases, the program cannot continue.”", "The program will continue regardless of funding.", 1, "Continuation depends on funding: the opposite of “regardless”."),
  tf("“Critics argue the benefits are often overstated.”", "All experts agree the benefits are accurately described.", 1, "“Critics” shows explicit disagreement, so “all experts agree” is false."),
  tf("“The species is not extinct, though sightings are rare.”", "The species still exists.", 0, "“Not extinct” means it still exists, even if rarely seen."),
  tf("“It would be inaccurate to say the method always works.”", "The method works in every case.", 1, "The passage denies the “always works” claim."),
  tf("“There is little evidence that diet alone explains the decline.”", "The passage suggests diet is not the only cause of the decline.", 0, "“Little evidence that diet alone explains” means other factors are likely involved."),
  tf("“The transfer of lab findings to real classrooms remains inconsistent.”", "Lab findings apply reliably to real classrooms.", 1, "“Inconsistent” is the opposite of “reliably”."),
];

const NOTGIVEN_ITEMS = [
  tf("“The bakery opens at six every morning and sells bread, cakes and pastries.”", "The bakery also sells coffee.", 2, "Coffee is never mentioned. Not Given means the passage does not say."),
  tf("“Although the film received positive reviews, it earned less than the studio had hoped.”", "The film made a profit.", 2, "It earned less than hoped, but the passage never says whether it made a profit."),
  tf("“Most students in the survey said they preferred studying in the library.”", "Nearly all students in the survey preferred studying at home.", 1, "“Most preferred the library” contradicts “nearly all preferred home”."),
  tf("“The team spent three years developing the software before its release.”", "The software took less than a year to develop.", 1, "Three years contradicts “less than a year”."),
  tf("“The mayor announced that the bridge would close for repairs next month.”", "The bridge will be closed for several months.", 2, "The length of the closure is never given."),
  tf("“Researchers found that the new fertiliser increased crop yields by twelve percent.”", "The fertiliser was tested on wheat.", 2, "The crop type is not mentioned."),
  tf("“The museum is free on Sundays, though a donation is welcome.”", "It costs nothing to enter the museum on Sundays.", 0, "“Free” means it costs nothing. A donation is optional."),
  tf("“Only two of the five candidates had previously worked in government.”", "Three of the candidates had no government experience.", 0, "Five minus two leaves three, so this is True."),
];

/* ---------------------------------- Multiple choice ---------------------------------- */
const MC_ITEMS = [
  mc("“Although caffeine is widely consumed to boost alertness, its effects vary significantly between individuals due to differences in how quickly the liver metabolises it.”", "Why do people respond differently to caffeine?", ["Some people drink more coffee than others.", "Caffeine only affects people who rarely drink coffee.", "The liver breaks it down at different speeds in different people.", "Alertness is not actually linked to caffeine."], 2, "The passage links the differences to how quickly the liver metabolises caffeine."),
  mc("“City planners have increasingly favoured narrower streets and wider pavements, arguing that this discourages speeding while making neighbourhoods more walkable.”", "Why do planners prefer narrower streets?", ["They are cheaper to build.", "They reduce speeding and support walking.", "They allow more cars to park.", "They were required by a new national law."], 1, "Two reasons are given: discouraging speeding and improving walkability."),
  mc("“The probe will take nearly seven years to reach the outer planet, travelling through regions of space where sunlight is too weak to power solar panels.”", "Why can't the probe rely on solar panels for that part of its journey?", ["Solar panels are too heavy to carry.", "The probe will be travelling too fast.", "Solar panels were damaged during launch.", "Sunlight is too weak that far from the sun."], 3, "Weak sunlight, not weight or damage, is the reason."),
  mc("“Although inflation has slowed, prices for basic groceries remain well above pre-pandemic levels, squeezing household budgets.”", "What does the passage say about grocery prices?", ["They are still higher than before the pandemic, despite slower inflation.", "They have returned to pre-pandemic levels.", "They are rising faster than ever before.", "They have no effect on household budgets."], 0, "The key contrast: inflation has slowed, but prices “remain well above” earlier levels."),
  mc("“Participants who kept a daily journal reported lower stress levels after eight weeks, though researchers could not rule out that simply taking time for oneself, rather than writing itself, explained the effect.”", "What uncertainty do the researchers mention?", ["Whether journaling reduces stress at all.", "Whether participants were telling the truth.", "Whether it was the writing or simply the time alone that helped.", "Whether eight weeks was long enough."], 2, "The doubt is about writing versus simply having time alone."),
  mc("“Early critics dismissed the technology as a passing fad, yet within a decade it had become central to how the industry operated.”", "What happened to the technology described?", ["It failed, as critics predicted.", "It was banned within the industry.", "It remained a minor, rarely used tool.", "It became essential despite early scepticism."], 3, "“Dismissed as a passing fad, yet became central” shows success despite doubts."),
  mc("“The treaty was signed in 1954, but it was not ratified by all member states until nearly a decade later, delaying its practical effect.”", "Why did the treaty not take practical effect immediately?", ["It was rejected by most countries.", "Ratification by all members took almost ten more years.", "It was replaced by a newer treaty.", "No countries ever signed it."], 1, "Full ratification took almost a decade after signing."),
  mc("“While the new policy reduced emissions in the three cities where it was tested, experts caution that scaling it nationwide would require infrastructure investment far beyond current budgets.”", "What concern do experts raise about the policy?", ["It did not work in the test cities.", "It was never actually tested.", "Expanding it nationally would cost more than current budgets allow.", "It increased emissions elsewhere."], 2, "The experts' caution is about the cost of a nationwide rollout."),
];

const OG = (passage, right, wrong, rightFirst, why) =>
  mc(
    passage,
    "Which statement is fully supported by the passage, without going further than it says?",
    rightFirst ? [right, wrong] : [wrong, right],
    rightFirst ? 0 : 1,
    why,
    "COMPREHENSION",
  );

const OVERGEN_ITEMS = [
  OG("“Regular exercise was linked to improved mood in the study group.”", "Exercise was associated with improved mood in this study.", "Exercise improves mood in everyone.", true, "“Everyone” is universal. The passage only supports an association in the studied group."),
  OG("“The bridge survived the earthquake with minor damage.”", "The bridge sustained limited damage in this earthquake.", "The bridge is earthquake-proof.", false, "“Earthquake-proof” is absolute. The passage describes one event."),
  OG("“Some patients responded well to the new treatment.”", "Some patients showed a positive response.", "The treatment works for all patients.", true, "“Some” is not “all”."),
  OG("“The policy reduced emissions in three trial cities.”", "The policy lowered emissions in the tested cities.", "The policy will eliminate emissions nationwide.", false, "Reduced is not eliminated, and three trial cities are not the whole nation."),
  OG("“Older students in the sample scored higher on the vocabulary test.”", "Older students in this sample scored higher.", "Age causes higher vocabulary scores.", true, "A correlation is not proof of cause."),
  OG("“The hippocampus is associated with spatial navigation.”", "The hippocampus plays a role in spatial navigation.", "The hippocampus controls all forms of memory.", false, "“All forms of memory” goes far beyond the passage."),
  OG("“The drug reduced symptoms in a majority of trial participants.”", "The drug reduced symptoms for most participants tested.", "The drug cures the condition.", true, "Reducing symptoms is not curing."),
  OG("“Renewable energy adoption has grown quickly in several countries.”", "Renewable energy adoption has increased rapidly in a number of countries.", "Renewable energy has replaced fossil fuels worldwide.", false, "“Several countries” is not “worldwide”, and growth is not replacement."),
  OG("“The reduction in hippocampal volume was observed after retirement.”", "The hippocampus shrank back after drivers stopped working.", "Retired drivers' brains become damaged.", true, "“Shrank back” is neutral. “Damaged” is a dramatic escalation."),
  OG("“Several critics questioned the study's methodology.”", "Some critics raised methodological concerns.", "The study's findings are completely invalid.", false, "Questioning the method does not mean the findings are completely invalid."),
];

const N = (passage, text, opts, ans, why) =>
  mc(passage, text, opts, ans, why, "NUMBERS");

const STATS_ITEMS = [
  N("“Reefs cover less than 1% of the ocean floor, yet support 25% of marine species.”", "What percentage of marine species do reefs support?", ["1%", "25%", "10%", "50%"], 1, "1% is the area of the ocean floor, a different noun from the one asked about."),
  N("“The city's population grew by 12% while unemployment fell to 4%.”", "What happened to unemployment?", ["It rose by 12%.", "It fell by 12%.", "It fell to 4%.", "It rose to 4%."], 2, "12% is population growth, a separate statistic."),
  N("“Only 3% of applicants were accepted, though the program received 40,000 applications.”", "What percentage of applicants were accepted?", ["40%", "0.3%", "30%", "3%"], 3, "40,000 is the number of applications, not the acceptance rate."),
  N("“Sales rose 8% in Q1 but dropped 15% in Q2.”", "What happened to sales in Q2?", ["They dropped 15%.", "They rose 8%.", "They rose 15%.", "They dropped 8%."], 0, "8% belongs to Q1, a different time period."),
  N("“The survey included 500 participants; 62% reported improved sleep.”", "What percentage reported improved sleep?", ["500", "62%", "6.2%", "38%"], 1, "500 is the sample size, not a percentage."),
  N("“Global temperatures have risen about 1.1°C since 1900, with the last decade responsible for 0.3°C of that.”", "How much warming occurred in the last decade?", ["1.1°C", "3°C", "0.3°C", "0.8°C"], 2, "1.1°C is the total since 1900. 0.3°C is the recent-decade share."),
  N("“The trial had a 90% success rate among adults but only 45% among children.”", "What was the success rate for children?", ["45%", "90%", "50%", "135%"], 0, "90% belongs to the adult group."),
  N("“Water use for agriculture is around 70%; industrial use accounts for 20%.”", "What percentage does agriculture use?", ["20%", "90%", "70%", "7%"], 2, "20% is industrial use, a different category."),
  N("“Deforestation reduced forest cover by 18% over 30 years, with 6% of that loss occurring in just the last five years.”", "What percentage of the loss occurred in the last five years?", ["6%", "18%", "3%", "30%"], 0, "18% is the total loss over 30 years."),
  N("“The museum had 2 million visitors this year, up from 1.5 million the prior year, a rise of exactly 33%.”", "What was last year's visitor count?", ["2 million", "1.5 million", "33,000", "3.5 million"], 1, "2 million is this year's figure. The question asks for the prior year."),
];

/* ------------------------------------ Exports ------------------------------------ */
export const READING_DRILL_TYPES = [
  {
    key: "ordering",
    label: "Paragraph Ordering",
    icon: "🔀",
    desc: "Drag five paragraphs into the correct order by tracing pronouns and connectors (this, it, however, despite…), just like Section 1.",
    exercises: [
      ex("ord-1", "Urban Beekeeping", "Drag the paragraphs into the correct order.", [ORDER_BEES]),
      ex("ord-2", "The Story of the Bicycle", "Drag the paragraphs into the correct order.", [ORDER_BICYCLE]),
      ex("ord-3", "Why Recycling Falls Short", "Drag the paragraphs into the correct order.", [ORDER_PLASTIC]),
    ],
  },
  {
    key: "sentencefill",
    label: "Sentence Fill",
    icon: "🧩",
    desc: "Choose the correct sentence for each gap in a passage. There are more sentences than gaps, just like Section 2.",
    exercises: [
      ex("sf-1", "The Return of the Night Train", "Read the sentence before AND after each gap. Two sentences are not used.", [SENT_TRAIN]),
      ex("sf-2", "Why Handwriting Still Matters", "Match each gap to the sentence that fits. Two sentences are not used.", [SENT_HANDWRITING]),
      ex("sf-3", "The Problem with Cheap Clothes", "Check the connectors and pronouns around every gap.", [SENT_CLOTHES]),
    ],
  },
  {
    key: "vocab",
    label: "Vocabulary in Context",
    icon: "📖",
    desc: "Pick the meaning that fits THIS sentence, not the word's most common meaning.",
    exercises: [
      ex("vc-1", "Vocabulary in Context", "Choose the meaning that fits how the word is used here.", VOCAB_ITEMS),
    ],
  },
  {
    key: "gapfill1",
    label: "Gap Fill   One Word",
    icon: "✏️",
    desc: "Complete a passage using a word bank, or type exactly one word taken from the passage.",
    exercises: [
      ex("gf1-1", "The Quiet Power of Trees", "Choose the right word for each gap. Two words are extra.", [WORD_TREES]),
      ex("gf1-2", "The Benefits of a Second Language", "Choose the right word for each gap. Two words are extra.", [WORD_LANGUAGE]),
      ex("gf1-3", "The Rise of Electric Scooters", "Think about the grammar and collocation of each gap.", [WORD_SCOOTERS]),
      ex("gf1-4", "Type the Missing Word", "Lift the exact word from the passage. No paraphrasing.", TYPED_ITEMS),
    ],
  },
  {
    key: "tfng",
    label: "True / False / Not Given",
    icon: "✅",
    desc: "Watch for negation words (not, rarely, unless, inconsistent) that flip the meaning, and for statements the passage never mentions.",
    exercises: [
      ex("tfng-1", "Negation Traps", "You read the right sentence but missed a word like “not”, “few” or “unless”.", NEGATION_ITEMS),
      ex("tfng-2", "False or Not Given?", "Decide whether the passage contradicts the statement or simply does not say.", NOTGIVEN_ITEMS),
    ],
  },
  {
    key: "mc",
    label: "Multiple Choice",
    icon: "🔘",
    desc: "Pick the option that is directly supported by the passage, with no outside knowledge.",
    exercises: [
      ex("mc-1", "Comprehension Multiple Choice", "Four options. Only one is fully supported by the passage.", MC_ITEMS),
      ex("mc-2", "Overgeneralisation Trap", "Avoid the option that claims more than the passage supports.", OVERGEN_ITEMS),
      ex("mc-3", "Number Matching", "Match each number to exactly what the question asks about.", STATS_ITEMS),
    ],
  },
];