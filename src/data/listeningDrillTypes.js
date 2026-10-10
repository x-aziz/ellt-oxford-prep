/*
  Listening drills, modelled on the Oxford ELLT listening tasks.

  Every item has a spoken `script` that the app reads aloud with the
  Google UK English Male / Female voices (see features/practice/drillAudio.js).
  Scripts are written the way people actually talk (contractions, short
  sentences, spelled-out numbers) so the voice sounds smooth and natural.

  Script helpers:
    say(text, v)      one voice (v = 0 male-first voice, 1 = the other voice)
    talk([[v, text]]) a conversation / interview with alternating voices
    spk([a, b, c])    three speakers; each is announced ("Speaker A.") first

  Item kinds used by the runner: mc, gap, table.
*/

const say = (text, v = 0) => [{ v, t: text }];
const talk = (lines) => lines.map(([v, t]) => ({ v, t }));
const spk = (lines) =>
  lines.flatMap((t, i) => [
    { v: i, t: `Speaker ${"ABC"[i]}.`, sys: true },
    { v: i, t },
  ]);

const SPEAKERS = ["Speaker A", "Speaker B", "Speaker C", "None of the speakers"];
const SPK_NAMES = ["Speaker A", "Speaker B", "Speaker C"];

const spkItem = (lines, text, ans, why, trap) => ({
  kind: "mc",
  tag: "SPEAKER MATCH",
  script: spk(lines),
  names: SPK_NAMES,
  text,
  opts: SPEAKERS,
  ans,
  why,
  ...(trap ? { trap } : {}),
});

const mcItem = (script, names, text, opts, ans, why) => ({
  kind: "mc",
  tag: "MULTIPLE CHOICE",
  script,
  names,
  text,
  opts,
  ans,
  why,
});

const gapItem = (script, text, ans, alts, why) => ({
  kind: "gap",
  tag: "GAP FILL",
  script,
  text,
  ans,
  alts,
  why,
});

const tableItem = (script, head, rows, answers, why) => ({
  kind: "table",
  tag: "TABLE FILL",
  script,
  text: "Complete the table. Write NO MORE THAN THREE WORDS or a number in each gap.",
  head,
  rows,
  answers,
  why,
});

const units = (items) =>
  items.reduce((n, it) => n + (it.answers ? Object.keys(it.answers).length : 1), 0);

const exercise = (id, title, sub, items) => ({
  id,
  title,
  sub,
  items,
  count: units(items),
  audio: true,
});

/* ---------------------------- Speaker selection ---------------------------- */
const SPEAKER_ITEMS = [
  spkItem(
    [
      "I switched to a plant-based diet mainly for environmental reasons. Although, I'll be honest, I do miss cheese.",
      "For me, it was all about my health. I started eating less meat because my doctor recommended it.",
      "Oh, I haven't changed what I eat at all. But I do recycle a lot more than I used to.",
    ],
    "Which speaker changed their diet mainly for environmental reasons?",
    0,
    "Speaker A says they switched “mainly for environmental reasons”. Speaker B's reason was health.",
  ),
  spkItem(
    [
      "I cycle to work every single day, whatever the weather. It's become part of my routine.",
      "I still drive to work, but I'm seriously thinking about getting an electric car next time I buy one.",
      "I take the train most days. If I'm running late, though, I'll jump in the car.",
    ],
    "Which speaker has already bought an electric car?",
    3,
    "None. Speaker B is only thinking about an electric car. Nobody says they have bought one.",
    "“Thinking about” is not the same as “has already bought”. Check the exact detail.",
  ),
  spkItem(
    [
      "I've read that working from home boosts productivity, but I personally find it much harder to concentrate there.",
      "Our team has been fully remote for three years now, and our output has never been higher.",
      "We tried remote working, but we went back to the office after six months.",
    ],
    "Which speaker says working from home makes it harder to concentrate?",
    0,
    "Speaker A says they find it “much harder to concentrate” at home. Speaker B is positive about remote work.",
  ),
  spkItem(
    [
      "I think social media makes it so much easier to stay close to friends who live abroad.",
      "Honestly, I deleted all my social media accounts last year, and I haven't missed them one bit.",
      "I mostly use social media for work. I don't really use it to keep in touch with friends.",
    ],
    "Which speaker no longer uses social media at all?",
    1,
    "Speaker B “deleted all” their accounts.",
    "Speaker C still uses social media, just for work.",
  ),
  spkItem(
    [
      "I prefer studying early in the morning. My mind feels clearest before anyone else is awake.",
      "I can't focus until at least midday. Mornings are useless for me.",
      "I study best late at night, when the house is finally quiet.",
    ],
    "Which speaker studies most effectively late at night?",
    2,
    "Speaker C says they study best “late at night”.",
  ),
  spkItem(
    [
      "Our company introduced a four-day week last year, and I've genuinely felt much less burnt out.",
      "We tried a four-day week, but we went back to five days after productivity dropped.",
      "My company has never even considered a four-day week.",
    ],
    "Which speaker's company stopped using a four-day week?",
    1,
    "Speaker B's company “went back to five days”.",
    "Speaker A's company still has it. Speaker C's never tried it.",
  ),
  spkItem(
    [
      "I think online courses can never fully replace in-person teaching.",
      "I completed an online degree, and I felt just as prepared as my friends who studied on campus.",
      "I haven't tried online learning, so I can't really compare.",
    ],
    "Which speaker says online study left them less prepared than campus study?",
    3,
    "None. Speaker A is sceptical but has no personal experience stated. Speaker B felt “just as prepared”.",
    "A strong opinion is not the same as personal experience. Do not add what was not said.",
  ),
  spkItem(
    [
      "I always travel with a paper map as a backup, even though I mostly rely on my phone.",
      "I never use paper maps anymore. My phone has everything I need.",
      "I don't trust GPS at all, so I only ever use paper maps.",
    ],
    "Which speaker only ever uses paper maps?",
    2,
    "Speaker C uses “only” paper maps. Speaker A uses both.",
  ),
];

/* ------------------------------ Multiple choice ----------------------------- */
const MC_ITEMS = [
  mcItem(
    say(
      "Many people assume that multitasking saves time. But studies show the opposite. When you keep switching between tasks, your brain has to refocus every single time, and that mental effort actually slows down how quickly you finish everything overall.",
    ),
    null,
    "According to the speaker, what is the real effect of multitasking?",
    [
      "It saves time overall.",
      "It has no measurable effect.",
      "It slows completion because of the effort of refocusing.",
      "It only affects creative tasks.",
    ],
    2,
    "The speaker says switching tasks “slows down” how quickly you finish, because of the effort of refocusing.",
  ),
  mcItem(
    talk([
      [0, "So, when you launched the app, who did you expect to use it?"],
      [
        1,
        "Well, we assumed most of our users would be teenagers. But it turned out that the majority of them were adults, aged between thirty-five and fifty.",
      ],
    ]),
    ["Interviewer", "Founder"],
    "What surprised the speaker about their users?",
    [
      "There were fewer users than expected.",
      "Most users were adults rather than teenagers.",
      "Teenagers were the main users, as predicted.",
      "The app failed to attract any users.",
    ],
    1,
    "They expected teenagers, but most users were aged thirty-five to fifty.",
  ),
  mcItem(
    say(
      "Attention, please, all library members. Because of scheduled maintenance, the library's online catalogue will be unavailable this Saturday, from six in the morning until midday. Don't worry, though. Borrowing books in person will carry on as normal.",
      1,
    ),
    null,
    "What will NOT be affected by the maintenance?",
    [
      "The library's online catalogue.",
      "Borrowing books in person.",
      "Searching for books from home.",
      "Renewing books online.",
    ],
    1,
    "The announcement says borrowing in person “will carry on as normal”.",
  ),
  mcItem(
    say(
      "We often think of forgetting as a flaw in our memory. But some researchers argue that it's actually a useful process, one that helps the brain filter out information it doesn't need.",
    ),
    null,
    "What view do some researchers hold about forgetting?",
    [
      "It always harms learning.",
      "It only happens in old age.",
      "It cannot be studied scientifically.",
      "It may be a useful way of filtering information.",
    ],
    3,
    "Some researchers see forgetting as “a useful process” that filters out unneeded information.",
  ),
  mcItem(
    talk([
      [0, "How come you're so much more productive these days?"],
      [
        1,
        "Well, I used to think that working longer hours meant getting more done. Then I tracked my time for a month, and I realised my most productive hours were actually the first four of the day.",
      ],
    ]),
    ["Friend", "Speaker"],
    "What did the speaker discover from tracking their time?",
    [
      "Their first four hours were the most productive.",
      "Longer hours always meant more output.",
      "They were unproductive all day.",
      "Tracking their time made no difference.",
    ],
    0,
    "They found the “first four” hours of the day were most productive.",
  ),
  mcItem(
    say(
      "Electric cars are often praised for having zero emissions on the road. But there's a catch. At the moment, making their batteries produces more carbon than manufacturing the engine of a petrol car.",
      1,
    ),
    null,
    "What point does the speaker make about electric cars?",
    [
      "They have no environmental impact at all.",
      "Petrol cars are now cleaner overall.",
      "Their batteries never need replacing.",
      "Battery production currently creates more carbon than making a petrol engine.",
    ],
    3,
    "The speaker contrasts zero road emissions with the higher carbon cost of making batteries.",
  ),
  mcItem(
    say(
      "A lot of people think public speaking anxiety fades with experience. But when I spoke to experienced speakers, many told me they still feel nervous. They've just learned to manage it better.",
      1,
    ),
    null,
    "What have experienced speakers learned to do?",
    [
      "Get rid of their nervousness completely.",
      "Avoid speaking in public.",
      "Manage their nervousness better, although it remains.",
      "Feel nervous only during their first few talks.",
    ],
    2,
    "They “still feel nervous” but manage it better.",
  ),
  mcItem(
    talk([
      [1, "Do you think a bigger team always works faster?"],
      [
        0,
        "People assume that a bigger team means faster progress. In my experience, though, teams larger than eight or nine people often slow down, because coordination becomes so much harder.",
      ],
    ]),
    ["Interviewer", "Guest"],
    "What does the speaker say about large teams?",
    [
      "Teams larger than eight or nine can slow down because of coordination problems.",
      "They always work faster than small teams.",
      "Team size has no effect on speed.",
      "Small teams always fail.",
    ],
    0,
    "Teams of more than eight or nine “often slow down” because coordination is harder.",
  ),
];

/* -------------------------------- Gap fill -------------------------------- */
const GAP_ITEMS = [
  gapItem(
    say(
      "Good afternoon, passengers. We're sorry to tell you that your flight to Boston has been delayed by about forty-five minutes, because of a technical inspection.",
    ),
    "The flight was delayed because of a technical _____.",
    "inspection",
    [],
    "The announcement says “because of a technical inspection”.",
  ),
  gapItem(
    say(
      "A quick reminder: all library books must be returned within three weeks. After that, a small daily fine will apply.",
      1,
    ),
    "Late books are charged a daily _____.",
    "fine",
    [],
    "“A small daily fine will apply.”",
  ),
  gapItem(
    say(
      "Just to let you know, the workshop will now take place in the main hall instead of room two-twelve, because of higher than expected demand.",
    ),
    "The workshop moved because of higher than expected _____.",
    "demand",
    [],
    "The speaker says “higher than expected demand”.",
  ),
  gapItem(
    say(
      "Good news for online shoppers. If you buy your tickets online, you'll get a ten percent discount. Tickets bought at the door are full price.",
      1,
    ),
    "Online tickets get a ten percent _____.",
    "discount",
    [],
    "“A ten percent discount.”",
  ),
  gapItem(
    say(
      "Before the experiment begins, we'll ask you to fill in a short questionnaire about your sleep habits.",
    ),
    "Participants fill in a questionnaire about their sleep _____.",
    "habits",
    [],
    "“A short questionnaire about your sleep habits.”",
  ),
  gapItem(
    say(
      "Passengers on the number twelve bus, please note that due to roadworks on Main Street, your bus will be diverted via Church Road until further notice.",
      1,
    ),
    "The number twelve bus will be _____ via Church Road.",
    "diverted",
    [],
    "Write the word exactly as spoken: “diverted”.",
  ),
  gapItem(
    say(
      "The museum's new exhibition focuses on marine life found along the coastline, including several rare species of coral.",
    ),
    "The exhibition includes several rare species of _____.",
    "coral",
    [],
    "“Several rare species of coral.”",
  ),
  gapItem(
    say(
      "If you'd like to apply, please send in your form no later than Friday the fourteenth. I'm afraid we can't accept late applications.",
      1,
    ),
    "Forms must be submitted no later than Friday the _____.",
    "fourteenth",
    ["14th", "14"],
    "The date is “the fourteenth”. Writing 14th is also accepted.",
  ),
  gapItem(
    say(
      "Our customer service team is available from nine in the morning until six in the evening, Monday to Friday.",
    ),
    "Customer service is available until six in the _____.",
    "evening",
    [],
    "“Until six in the evening.”",
  ),
  gapItem(
    say(
      "This year's keynote will be delivered by a leading researcher in renewable energy policy.",
      1,
    ),
    "The keynote speaker specialises in renewable energy _____.",
    "policy",
    [],
    "“Renewable energy policy.”",
  ),
];

/* -------------------------------- Table fill -------------------------------- */
const TABLE_ITEMS = [
  tableItem(
    say(
      "Right, let's look at this term's enrolment figures. Our three most popular courses are Spanish for Beginners, with forty-two students, Introduction to Coding, with sixty-one, and Watercolour Painting, with twenty-nine.",
    ),
    ["Course", "Students"],
    [
      ["{1}", "42"],
      ["Introduction to Coding", "{2}"],
      ["{3}", "29"],
    ],
    {
      1: ["Spanish for Beginners", "Spanish"],
      2: ["61", "sixty-one"],
      3: ["Watercolour Painting", "Watercolor Painting", "Watercolour"],
    },
    "Each blank is a detail stated directly in the announcement.",
  ),
  tableItem(
    say(
      "Please note the clinic's opening hours. On Mondays and Wednesdays, we're open from eight until four. On Tuesdays and Thursdays, we open later, from ten until six. And on Fridays, I'm afraid we're closed all day.",
      1,
    ),
    ["Days", "Opening hours"],
    [
      ["Monday and Wednesday", "8 until {1}"],
      ["Tuesday and Thursday", "{2} until 6"],
      ["Friday", "{3}"],
    ],
    {
      1: ["4", "four", "4pm", "4 pm"],
      2: ["10", "ten", "10am", "10 am"],
      3: ["closed", "closed all day", "shut"],
    },
    "Match each day to the exact time or status the speaker gives.",
  ),
  tableItem(
    say(
      "Our survey asked people what they like to drink. Thirty-five percent said they prefer tea, and forty percent prefer coffee. The remaining twenty-five percent don't drink either one regularly.",
    ),
    ["Drink", "Percentage of people"],
    [
      ["Tea", "{1} %"],
      ["Coffee", "{2} %"],
      ["Neither", "{3} %"],
    ],
    {
      1: ["35", "thirty-five"],
      2: ["40", "forty"],
      3: ["25", "twenty-five"],
    },
    "Each percentage is stated directly for its category.",
  ),
  tableItem(
    say(
      "Just a quick update on the meeting rooms. Room A has been reserved for the finance team, and Room B is for the marketing team. Room C is still free, so anyone can use it.",
      1,
    ),
    ["Room", "Use"],
    [
      ["A", "{1} team"],
      ["B", "{2} team"],
      ["C", "{3}"],
    ],
    {
      1: ["finance"],
      2: ["marketing"],
      3: ["free", "free for general use", "general use", "free for everyone"],
    },
    "Each room is matched to a department or status.",
  ),
  tableItem(
    say(
      "Before you set off, here are the details of the hiking trail. It's six kilometres long, and it takes around two hours to walk. You'll climb about three hundred metres, so bring plenty of water.",
    ),
    ["Hiking trail", "Details"],
    [
      ["Distance", "{1} km"],
      ["Duration", "{2} hours"],
      ["Elevation gain", "{3} metres"],
    ],
    {
      1: ["6", "six"],
      2: ["2", "two"],
      3: ["300", "three hundred"],
    },
    "Each figure is stated directly. Numbers can be written as digits or words.",
  ),
  tableItem(
    say(
      "I'm delighted to report that this year's charity run raised twelve thousand pounds. We had four hundred runners, and the money will help to support two local shelters.",
      1,
    ),
    ["Charity run", "Result"],
    [
      ["Money raised", "£{1}"],
      ["Runners", "{2}"],
      ["Shelters supported", "{3}"],
    ],
    {
      1: ["12000", "12,000", "twelve thousand"],
      2: ["400", "four hundred"],
      3: ["2", "two"],
    },
    "Each number matches the figure given for that category.",
  ),
];

export const LISTENING_DRILL_TYPES = [
  {
    key: "speaker",
    label: "Speaker Selection",
    icon: "🗣️",
    desc: "Listen to three short speakers and choose who said it, including the “None of the speakers” trap, just like Section 3.",
    exercises: [
      exercise(
        "spk-1",
        "Who Said It?",
        "Press play, listen to Speakers A, B and C, then choose the speaker (or None).",
        SPEAKER_ITEMS,
      ),
    ],
  },
  {
    key: "mc",
    label: "Multiple Choice",
    icon: "🎧",
    desc: "Listen to a short talk, announcement or interview and choose the best answer.",
    exercises: [
      exercise(
        "mc-1",
        "Listening Comprehension",
        "Listen, then choose the one answer that matches what you heard.",
        MC_ITEMS,
      ),
    ],
  },
  {
    key: "gapfill3",
    label: "Gap Fill (≤3 words)",
    icon: "📝",
    desc: "Listen and complete the sentence with the exact word(s) you hear, no more than three words.",
    exercises: [
      exercise(
        "gf-1",
        "Complete What You Hear",
        "Write the exact word(s) spoken. Spelling counts.",
        GAP_ITEMS,
      ),
    ],
  },
  {
    key: "tablefill",
    label: "Table Fill (≤3 words)",
    icon: "📊",
    desc: "Listen to an announcement and fill in the table, no more than three words or a number per gap.",
    exercises: [
      exercise(
        "tf-1",
        "Complete the Table",
        "Each gap needs 1–3 words or a number.",
        TABLE_ITEMS,
      ),
    ],
  },
];