// 10 sentence-structure writing drill sets (from WritingFinalPractice.html)
// Auto-converted from the original HTML file, content unchanged.
export const WRITING_STRUCTURES = [
  {
    id: "s1",
    name: "Not only… but also…",
    short: "Not only... but also...",
    rule: 'Use to add a second important point that strengthens or surprises. The first clause must invert subject and verb after "Not only".',
    formula:
      "Not only + [inverted verb + subject] + , but + [subject] + also + [verb] + …",
    example:
      "Not only does renewable energy reduce carbon emissions, but it also creates thousands of jobs in local communities.",
    drills: [
      {
        prompt: "Solar power is cheap. It is also clean.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only is solar power cheap, but it is also clean and environmentally friendly.",
        keywords: 'Invert verb after "Not only": "Not only IS solar power..."',
        why: 'Subject-verb inversion is required after "Not only"   this is the most common error candidates make.',
      },
      {
        prompt:
          "The city has poor air quality. It also has high levels of noise pollution.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only does the city suffer from poor air quality, but it also experiences dangerously high levels of noise pollution.",
        keywords:
          '"Not only DOES the city suffer..."   use "does" for present simple inversion.',
        why: '"Does" is needed for the inverted present simple. Never write "Not only the city has..."',
      },
      {
        prompt:
          "Deforestation destroys habitats. It also increases the risk of flooding.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only does deforestation destroy vital natural habitats, but it also significantly increases the risk of catastrophic flooding.",
        keywords:
          'Add an adverb like "significantly" or "dramatically" to raise the band score.',
        why: 'Adding "significantly" to the second clause shows control of degree   a Band 6 feature.',
      },
      {
        prompt:
          "Online learning is flexible. Students can also study at their own pace.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only is online learning flexible in terms of location, but students can also study at their own pace without time pressure.",
        keywords: '"in terms of" adds specificity   a useful Band 6 phrase.',
        why: 'The phrase "in terms of" specifies which aspect of flexibility you mean, showing precision.',
      },
      {
        prompt: "Fast food is unhealthy. It is also expensive in the long run.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only is fast food detrimental to physical health, but it also proves more expensive than home cooking in the long run.",
        keywords:
          '"detrimental to" is a formal synonym for "bad for"   use it.',
        why: '"Detrimental to" is formal academic vocabulary. Replacing "unhealthy" with this raises the lexical score.',
      },
      {
        prompt: "Cars cause pollution. They also create traffic congestion.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only do cars produce harmful levels of pollution, but they also contribute to severe traffic congestion in urban areas.",
        keywords:
          '"Not only DO cars..."   use "do" for plural subject in present simple.',
        why: '"Do" is the auxiliary for plural subjects in present simple inversion. Do not omit it.',
      },
      {
        prompt:
          "The new law has reduced crime. It has also improved public confidence in the police.",
        instruction:
          'Combine using "Not only... but also..." in present perfect',
        model:
          "Not only has the new law reduced crime rates, but it has also significantly improved public confidence in the police force.",
        keywords:
          '"Not only HAS the law..."   invert "has" before the subject in present perfect.',
        why: 'Present perfect inversion uses "has/have" before the subject, just like a question form.',
      },
      {
        prompt:
          "Social media connects people. It can also spread misinformation quickly.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only does social media connect people across vast distances, but it can also spread harmful misinformation with alarming speed.",
        keywords:
          '"with alarming speed"   manner phrase at the end adds sophistication.',
        why: 'End-of-clause adverbial phrases like "with alarming speed" improve sentence variety and fluency.',
      },
      {
        prompt:
          "Exercise improves physical health. It also boosts mental wellbeing.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only does regular exercise improve physical health, but it also plays a crucial role in boosting mental wellbeing and reducing stress.",
        keywords:
          '"plays a crucial role in" is a strong formal phrase   use it instead of "also boosts".',
        why: '"Plays a crucial role in" is a formal colocation that examiners recognise as a Band 6+ phrase.',
      },
      {
        prompt:
          "The government has invested in green energy. It has also created tax incentives for businesses.",
        instruction: 'Combine using "Not only... but also..."',
        model:
          "Not only has the government invested heavily in green energy infrastructure, but it has also introduced significant tax incentives to encourage businesses to adopt sustainable practices.",
        keywords:
          'Extend the second clause   add "to encourage businesses to adopt sustainable practices".',
        why: 'Extending the second clause with a purpose phrase ("to encourage...") demonstrates complex sentence structure.',
      },
    ],
  },
  {
    id: "s2",
    name: "As well as…",
    short: "As well as...",
    rule: 'Use to add extra information smoothly. "As well as" is followed by a noun or gerund (-ing form), NOT a full clause. It is less formal than "Not only... but also..." and very natural.',
    formula: "[Subject] + [verb] + … , as well as + [noun/gerund phrase] + …",
    example:
      "The report highlights the economic benefits of the policy, as well as addressing its potential social drawbacks.",
    drills: [
      {
        prompt: "Wind energy is cost-effective. It is also sustainable.",
        instruction: 'Combine using "as well as"',
        model:
          "Wind energy is cost-effective, as well as being a sustainable and renewable source of power.",
        keywords: '"as well as BEING"   use gerund (-ing) after "as well as".',
        why: 'After "as well as", always use a gerund or noun   never a full subject-verb clause.',
      },
      {
        prompt:
          "The article discusses the causes of poverty. It also examines possible solutions.",
        instruction: 'Combine using "as well as"',
        model:
          "The article discusses the root causes of poverty, as well as examining a range of possible solutions.",
        keywords: '"as well as EXAMINING"   gerund form required.',
        why: 'This is the sentence fill trap: candidates often write "as well as it examines"   this is grammatically wrong.',
      },
      {
        prompt:
          "Plastic pollution harms marine life. It also contaminates drinking water.",
        instruction: 'Combine using "as well as"',
        model:
          "Plastic pollution causes severe harm to marine life, as well as contaminating freshwater sources and drinking water supplies.",
        keywords: '"as well as CONTAMINATING"   gerund of "contaminate".',
        why: "The gerund preserves the subject (plastic pollution) without repeating it   more elegant than two sentences.",
      },
      {
        prompt:
          "The study found that sleep deprivation affects concentration. It also affects mood.",
        instruction: 'Combine using "as well as"',
        model:
          "The study found that sleep deprivation significantly affects concentration, as well as having a marked negative impact on mood and emotional stability.",
        keywords:
          '"having a marked impact on"   noun phrase construction avoids a second verb clause.',
        why: '"Having a marked impact on" is more formal than "affecting mood"   it signals awareness of collocation.',
      },
      {
        prompt:
          "The new hospital provides emergency care. It also offers outpatient services.",
        instruction: 'Combine using "as well as"',
        model:
          "The new hospital provides round-the-clock emergency care, as well as a wide range of outpatient services for the local community.",
        keywords:
          'After "as well as" here: noun phrase   "a wide range of outpatient services".',
        why: 'You can use either a gerund OR a noun phrase after "as well as". Both are correct.',
      },
      {
        prompt:
          "Remote working saves employees time. It also reduces transport costs.",
        instruction: 'Combine using "as well as"',
        model:
          "Remote working saves employees considerable time on commuting, as well as reducing transport costs for both individuals and employers.",
        keywords: '"as well as REDUCING"   gerund.',
        why: "Combining two financial/practical benefits in one sentence shows summarising skill.",
      },
      {
        prompt:
          "The graph shows a steady increase in electric vehicle sales. It also shows a decline in petrol car sales.",
        instruction: 'Combine using "as well as"   this is describing a graph',
        model:
          "The graph illustrates a steady increase in electric vehicle sales, as well as a corresponding decline in the purchase of petrol-powered cars.",
        keywords:
          '"as well as a corresponding decline"   noun phrase, not gerund.',
        why: 'When describing data, noun phrases after "as well as" are natural and fluent.',
      },
      {
        prompt:
          "Learning a foreign language improves communication skills. It also enhances cognitive ability.",
        instruction: 'Combine using "as well as"',
        model:
          "Learning a foreign language greatly improves communication skills, as well as enhancing cognitive ability and mental flexibility.",
        keywords: '"as well as ENHANCING"   gerund.',
        why: 'The addition of "mental flexibility" extends the second point without requiring a new sentence.',
      },
      {
        prompt:
          "Urban green spaces reduce air pollution. They also give residents space to exercise.",
        instruction: 'Combine using "as well as"',
        model:
          "Urban green spaces play a vital role in reducing air pollution, as well as providing residents with valuable space for exercise and recreation.",
        keywords: '"as well as PROVIDING residents with"   gerund + object.',
        why: '"Providing residents with" restructures the idea more formally than "giving residents".',
      },
      {
        prompt:
          "The programme has trained 500 nurses. It has also funded new medical equipment.",
        instruction: 'Combine using "as well as"',
        model:
          "The programme has successfully trained over 500 nurses, as well as funding the purchase of essential new medical equipment for rural clinics.",
        keywords: '"as well as FUNDING"   gerund in present perfect context.',
        why: 'The gerund after "as well as" does not change form to match tense   always use the base gerund (-ing).',
      },
    ],
  },
  {
    id: "s3",
    name: "Despite / In spite of…",
    short: "Despite / In spite of...",
    rule: "Use to show contrast   that something happens even though there is an obstacle or opposing factor. Must be followed by a NOUN or GERUND, not a full clause. (Despite + the fact that + clause is the exception.)",
    formula:
      "Despite + [noun/gerund], [main clause]. OR [Main clause] despite + [noun/gerund].",
    example:
      "Despite the significant cost of solar panel installation, many households consider it a worthwhile long-term investment.",
    drills: [
      {
        prompt:
          "There are strict laws against pollution. Companies still violate environmental standards.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite the existence of strict environmental laws, many companies continue to violate pollution standards with little consequence.",
        keywords:
          '"Despite THE EXISTENCE OF strict laws"   nominalise the clause into a noun phrase.',
        why: 'Turning "there are strict laws" into "the existence of strict laws" is nominalisation   a key Band 6+ skill.',
      },
      {
        prompt:
          "The evidence clearly supports vaccination. Some people still refuse to vaccinate their children.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite overwhelming scientific evidence supporting the safety and efficacy of vaccination, a significant number of people continue to refuse it for their children.",
        keywords:
          '"overwhelming scientific evidence"   strong adjective colocation.',
        why: '"Overwhelming evidence" is a natural collocation in academic writing. "Clear evidence" is also acceptable but less sophisticated.',
      },
      {
        prompt:
          "Cycling is very good for health. Most people still prefer to drive.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite its well-documented health benefits, cycling remains far less popular than driving among the majority of urban residents.",
        keywords:
          '"its well-documented health benefits"   pronoun + adjective noun phrase.',
        why: 'Using "its" instead of repeating "cycling" shows cohesive reference, a Band 6 feature.',
      },
      {
        prompt:
          "The economy is growing. Many families still struggle with poverty.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite sustained economic growth, a considerable proportion of families continue to experience financial hardship and poverty.",
        keywords: '"a considerable proportion of"   formal quantity phrase.',
        why: '"A considerable proportion of" is more formal and precise than "many"   examiners reward this.',
      },
      {
        prompt:
          "Social media has many risks. Young people continue to use it heavily.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite the numerous and well-publicised risks associated with social media, young people continue to use these platforms for several hours each day.",
        keywords:
          '"the numerous risks associated with"   formal relative noun phrase.',
        why: '"Associated with" is a formal passive participial phrase that examiners look for in Band 6 writing.',
      },
      {
        prompt:
          "The new public transport system is efficient. Car use in the city has not decreased.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite the introduction of an efficient public transport system, car usage within the city has failed to decrease significantly.",
        keywords:
          '"has failed to decrease"   stronger than "has not decreased".',
        why: '"Failed to" implies that the decrease was expected but did not happen   this shows nuance and precision.',
      },
      {
        prompt:
          "The government invested heavily in education. Literacy rates remain low in rural areas.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite heavy government investment in education over the past decade, literacy rates in rural communities remain alarmingly low.",
        keywords: '"over the past decade"   adds time frame, adds detail.',
        why: 'Adding a time frame like "over the past decade" makes your sentence more specific and credible.',
      },
      {
        prompt:
          "Air travel is one of the biggest sources of carbon emissions. Demand for flights keeps rising.",
        instruction: 'Combine using "In spite of"',
        model:
          "In spite of air travel being one of the leading contributors to global carbon emissions, demand for international flights has continued to rise year on year.",
        keywords: '"In spite of air travel BEING"   gerund required.',
        why: 'When the subject of the subordinate idea matches the main clause, a gerund is cleaner than "the fact that".',
      },
      {
        prompt:
          "The report was difficult to understand. The public reacted strongly to its findings.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite the complexity of the report, members of the public responded strongly to its findings and called for immediate action.",
        keywords:
          '"the complexity of the report"   nominalise "difficult to understand".',
        why: "Nominalising adjective phrases into noun phrases (difficult → complexity) is a hallmark of formal academic writing.",
      },
      {
        prompt:
          "Organic food is more expensive. More consumers are choosing it.",
        instruction: 'Combine using "Despite"',
        model:
          "Despite the considerably higher cost of organic food, an increasing number of consumers are choosing it as awareness of health and environmental issues grows.",
        keywords:
          '"an increasing number of consumers"   better than "more consumers".',
        why: '"An increasing number of" is more formal and precise than "more"   it implies a trend rather than just a comparison.',
      },
    ],
  },
  {
    id: "s4",
    name: "However / Nevertheless / Nonetheless",
    short: "However / Nevertheless...",
    rule: 'Use to introduce a contrast or unexpected result. Place a comma after it at the start of a sentence. "Nevertheless" and "Nonetheless" are slightly stronger   they mean "even so, despite everything".',
    formula:
      "[First point]. However/Nevertheless/Nonetheless, [contrasting point].",
    example:
      "Urban farming requires significant initial investment. However, it can provide fresh produce to communities that lack access to affordable food.",
    drills: [
      {
        prompt:
          "Electric cars reduce carbon emissions. They are still too expensive for most people.",
        instruction: 'Write two sentences connected with "However"',
        model:
          "Electric vehicles have the potential to reduce urban carbon emissions significantly. However, their high purchase price continues to place them out of reach for the majority of consumers.",
        keywords:
          'Do not write "However" with a comma in the MIDDLE of a sentence.',
        why: '"However" at the start of a sentence needs a comma after it. It cannot join two clauses with only a comma before it.',
      },
      {
        prompt:
          "The government has introduced new recycling policies. Very little has changed in practice.",
        instruction: 'Write two sentences connected with "Nevertheless"',
        model:
          "The government has introduced a series of comprehensive recycling policies in recent years. Nevertheless, the practical impact on household waste levels has so far been disappointingly limited.",
        keywords:
          '"Nevertheless" is stronger than "However"   it implies that despite everything, the result is the same.',
        why: '"Nevertheless" carries more rhetorical force and is preferred in academic writing when you want to emphasise persistence of a problem.',
      },
      {
        prompt:
          "Exercise is known to improve mental health. Many people with depression find it very difficult to start.",
        instruction: 'Write two sentences connected with "However"',
        model:
          "Regular physical exercise is widely recognised as one of the most effective non-pharmaceutical treatments for depression and anxiety. However, many individuals living with these conditions find it extremely difficult to motivate themselves to begin exercising.",
        keywords:
          '"non-pharmaceutical"   formal adjective that signals academic register.',
        why: 'Using precise adjectives like "non-pharmaceutical" instead of "not involving medicine" raises lexical sophistication.',
      },
      {
        prompt:
          "Wind turbines generate clean energy. Local communities often oppose their construction.",
        instruction: 'Write two sentences connected with "Nevertheless"',
        model:
          "Wind turbines offer a clean and sustainable method of generating electricity with minimal environmental impact during operation. Nevertheless, local communities frequently oppose their construction, citing concerns about noise, visual impact, and effects on wildlife.",
        keywords: '"citing concerns about"   formal participial phrase.',
        why: '"Citing concerns about" compresses a list of reasons into one clause   a Band 6 compression technique.',
      },
      {
        prompt:
          "The data shows a rise in life expectancy. Health inequalities between rich and poor remain severe.",
        instruction: 'Write two sentences connected with "Nonetheless"',
        model:
          "Recent data indicates a significant overall rise in life expectancy across most developed countries. Nonetheless, deep and persistent health inequalities between the wealthiest and poorest members of society remain a serious cause for concern.",
        keywords: '"deep and persistent"   adjective pair for emphasis.',
        why: 'Paired adjectives ("deep and persistent") add emphasis without repeating the noun   a fluency technique.',
      },
      {
        prompt:
          "Online shopping is convenient. It is causing many local shops to close.",
        instruction: 'Write two sentences connected with "However"',
        model:
          "Online shopping undeniably offers consumers an unparalleled level of convenience and choice. However, the rapid growth of e-commerce has contributed significantly to the closure of many traditional local businesses.",
        keywords:
          '"undeniably"   concession adverb that acknowledges the first point before contrasting.',
        why: 'Using "undeniably" before a positive point and then contrasting with "However" is a mature writing move.',
      },
      {
        prompt:
          "The new drug has shown promising results. It has serious side effects.",
        instruction: 'Write two sentences connected with "Nevertheless"',
        model:
          "The newly developed drug has demonstrated promising results in early clinical trials, with significant reductions in symptom severity reported. Nevertheless, concerns remain regarding its serious side effects, which may limit its suitability for widespread use.",
        keywords: '"limit its suitability for widespread use"   formal phrase.',
        why: 'This phrase is more precise than "it cannot be used by many people"   precision is rewarded at Band 6.',
      },
      {
        prompt:
          "Many students prefer to study alone. Group work has clear benefits for learning.",
        instruction: 'Write two sentences connected with "However"',
        model:
          "A significant proportion of students report a personal preference for independent study, believing it allows for greater focus. However, research consistently demonstrates that collaborative group work produces measurable benefits for deeper learning and retention.",
        keywords: '"produces measurable benefits for"   formal colocation.',
        why: '"Produces measurable benefits for" is more formal and precise than "is good for"   avoid vague phrases in academic writing.',
      },
      {
        prompt:
          "The coastal town has invested in flood defences. It remains at risk during extreme weather.",
        instruction: 'Write two sentences connected with "Nonetheless"',
        model:
          "The coastal town has made substantial investments in flood defence infrastructure over the past decade. Nonetheless, the community remains highly vulnerable during periods of extreme weather, particularly as sea levels continue to rise.",
        keywords:
          '"remains highly vulnerable during"   maintain formality throughout.',
        why: "Keeping formal register consistent across both sentences (not mixing formal and informal phrases) is a Band 6 requirement.",
      },
      {
        prompt:
          "Fast food is widely available and cheap. It contributes to rising rates of obesity.",
        instruction: 'Write two sentences connected with "However"',
        model:
          "Fast food remains widely available and highly affordable for the majority of the population, making it a convenient option for many households. However, its excessive consumption has been closely linked to rising rates of obesity and diet-related illness in recent decades.",
        keywords: '"has been closely linked to"   passive formal connection.',
        why: '"Closely linked to" is a formal academic collocation. "Contributes to" is also good. Avoid "causes" alone   it overstates causation.',
      },
    ],
  },
  {
    id: "s5",
    name: "While / Whereas (contrast)",
    short: "While / Whereas...",
    rule: 'Use to contrast two different things, situations, or groups directly. Both clauses must grammatically parallel each other. "Whereas" is more formal than "while".',
    formula: "While/Whereas + [first situation], [contrasting situation].",
    example:
      "While developed nations struggle with the problem of overconsumption, many developing countries face the opposite challenge of insufficient access to basic goods.",
    drills: [
      {
        prompt: "Public transport is cheap. Private cars are expensive to run.",
        instruction: 'Combine using "While"',
        model:
          "While public transport offers a relatively affordable means of travel, private car ownership involves considerable ongoing expense in terms of fuel, insurance, and maintenance.",
        keywords: '"in terms of"   used to specify which aspect is expensive.',
        why: '"In terms of" allows you to list specific cost elements concisely   it is a useful academic phrase.',
      },
      {
        prompt:
          "City residents have good access to services. People in rural areas often struggle to access them.",
        instruction: 'Combine using "Whereas"',
        model:
          "Whereas city residents typically benefit from excellent access to healthcare, education, and employment opportunities, those living in rural areas frequently face significant barriers in accessing equivalent services.",
        keywords:
          '"equivalent services" at the end links back to the first clause without repetition.',
        why: "Using a pronoun or summary noun at the end of the second clause avoids repeating the full list   this is concision.",
      },
      {
        prompt:
          "Young people adapt to technology quickly. Older generations often find it difficult.",
        instruction: 'Combine using "While"',
        model:
          "While younger generations tend to adapt to new technologies rapidly and intuitively, many older individuals find the pace of technological change difficult to keep up with.",
        keywords: '"rapidly and intuitively"   adverb pair after the verb.',
        why: 'Adding a second adverb ("intuitively") adds detail and shows varied language use.',
      },
      {
        prompt:
          "Renewable energy has low running costs. Fossil fuels require constant fuel purchases.",
        instruction: 'Combine using "Whereas"',
        model:
          "Whereas renewable energy sources such as solar and wind have minimal ongoing operational costs once installed, the use of fossil fuels requires continuous and increasingly expensive fuel purchases.",
        keywords: '"once installed"   concise conditional that saves words.',
        why: '"Once installed" compresses "after they have been installed" into two words   economy of expression.',
      },
      {
        prompt:
          "Some students learn best by reading. Others prefer hands-on activities.",
        instruction: 'Combine using "While"',
        model:
          "While some students absorb information most effectively through reading and independent reflection, others demonstrate a clear preference for practical, hands-on learning activities.",
        keywords:
          '"absorb information most effectively through"   formal colocation.',
        why: '"Absorb information" is more formal and specific than "learn"   Band 6 writing uses vocabulary precisely.',
      },
      {
        prompt:
          "Urban areas have more job opportunities. They also have a higher cost of living.",
        instruction:
          'Combine using "While"   concede and contrast within one idea',
        model:
          "While urban areas undoubtedly offer a greater range of employment opportunities, they also impose a considerably higher cost of living, which can offset the financial advantages of higher wages.",
        keywords: '"offset the financial advantages"   formal economic phrase.',
        why: '"Offset" is a precise verb meaning "cancel out the benefit of"   using it shows strong lexical control.',
      },
      {
        prompt:
          "Vitamin supplements are popular. A balanced diet provides the same nutrients naturally.",
        instruction: 'Combine using "Whereas"',
        model:
          "Whereas vitamin supplements have grown increasingly popular as a means of boosting nutritional intake, a well-balanced diet is widely considered capable of providing all the same essential nutrients naturally and more effectively.",
        keywords:
          '"well-balanced"   compound adjective hyphenated before a noun.',
        why: 'Compound adjectives before nouns must be hyphenated ("well-balanced diet", not "well balanced diet").',
      },
      {
        prompt:
          "Developed countries produce most of the world's greenhouse gases. Developing nations suffer the worst effects of climate change.",
        instruction: 'Combine using "While"',
        model:
          "While developed nations are responsible for the vast majority of cumulative global greenhouse gas emissions, it is often the poorest developing countries that experience the most severe consequences of the resulting climate change.",
        keywords:
          '"responsible for" replaces "produce"   more formal colocation.',
        why: '"Responsible for" implies accountability, adding a moral dimension. In summarising, this shows analytical depth.',
      },
      {
        prompt:
          "The internet has made communication faster. It has also reduced privacy.",
        instruction: 'Combine using "While"',
        model:
          "While the internet has dramatically accelerated the pace of global communication, it has simultaneously led to a marked erosion of personal privacy and digital security.",
        keywords:
          '"simultaneously"   adverb that shows two things happening at the same time.',
        why: '"Simultaneously" is more precise than "also"   it shows the two effects are directly connected and concurrent.',
      },
      {
        prompt:
          "Men are more likely to develop heart disease. Women are more at risk from osteoporosis.",
        instruction: 'Combine using "Whereas"',
        model:
          "Whereas men face a statistically higher risk of developing cardiovascular disease throughout their lifetimes, women are considerably more susceptible to osteoporosis, particularly following the menopause.",
        keywords:
          '"statistically higher risk"   adds precision without inventing numbers.',
        why: '"Statistically higher risk" avoids making a claim you cannot back up with data while still being precise.',
      },
    ],
  },
  {
    id: "s6",
    name: "This + noun (cohesion)",
    short: "This + noun (reference)",
    rule: 'After stating a fact or idea, use "This + summary noun" to refer back to it and then add a comment. This avoids repeating words and creates cohesion. Choose the most precise noun that captures the idea.',
    formula:
      "[First sentence]. This + [summary noun] + [adds comment or explanation].",
    example:
      "The study found that children who read for pleasure score higher on literacy tests. This finding has significant implications for how schools structure free time during the school day.",
    drills: [
      {
        prompt:
          "More people are working from home than ever before. It is changing how offices are designed.",
        instruction: 'Use "This + noun" to connect the two ideas',
        model:
          "More people are working from home than at any previous point in modern history. This shift in working patterns is fundamentally changing the purpose and design of traditional office spaces.",
        keywords:
          '"This SHIFT"   "shift" summarises a gradual change in behaviour.',
        why: '"Shift" is the precise summary noun here. Avoid "This thing" or "This situation"   always use a specific noun.',
      },
      {
        prompt:
          "The price of housing has risen sharply in most major cities. Young people can no longer afford to buy homes.",
        instruction: 'Use "This + noun" to connect the two ideas',
        model:
          "The price of housing has risen sharply in most major cities over the past decade. This dramatic increase has made homeownership effectively unattainable for an entire generation of young people.",
        keywords:
          '"This INCREASE"   nominalise "risen sharply" into a noun phrase.',
        why: '"This increase" refers back to the price rise. Adding "dramatic" before it shows you are evaluating, not just reporting.',
      },
      {
        prompt:
          "Scientists have discovered that microplastics are present in human blood. It raises serious health concerns.",
        instruction: 'Use "This + noun"',
        model:
          "Scientists have confirmed the presence of microplastic particles in human blood samples. This alarming discovery has raised urgent questions about the long-term health consequences of plastic pollution.",
        keywords: '"This alarming DISCOVERY"   adjective + summary noun.',
        why: 'Adding an evaluative adjective ("alarming") before the summary noun shows you are analysing the significance, not just summarising.',
      },
      {
        prompt:
          "The government plans to ban petrol cars by 2035. Many people are worried about the transition.",
        instruction: 'Use "This + noun"',
        model:
          "The government has announced a ban on the sale of new petrol and diesel vehicles from 2035. This ambitious policy has provoked considerable debate about whether the nation's charging infrastructure will be ready in time.",
        keywords:
          '"This ambitious POLICY"   evaluative adjective reveals your stance.',
        why: 'Using "ambitious" signals that you understand the scale and difficulty of the plan   it adds analytical depth.',
      },
      {
        prompt:
          "Rates of childhood obesity have tripled in the last thirty years. Urgent action is needed.",
        instruction: 'Use "This + noun"',
        model:
          "Rates of childhood obesity have tripled over the last three decades, with diet and sedentary lifestyles cited as the primary causes. This troubling trend demands urgent and coordinated action from governments, schools, and the food industry alike.",
        keywords:
          '"This troubling TREND"   trend for something that has changed over time.',
        why: '"Trend" is the ideal summary noun for something that has changed over time. "Pattern" and "tendency" can also work.',
      },
      {
        prompt:
          "Many young people spend more than five hours a day on social media. Researchers say it is linked to anxiety.",
        instruction: 'Use "This + noun"',
        model:
          "Many young people now spend in excess of five hours each day on social media platforms. This level of use has been repeatedly linked in peer-reviewed research to elevated rates of anxiety and depression among adolescents.",
        keywords: '"This LEVEL OF USE"   noun phrase that captures degree.',
        why: '"Level of use" captures both the behaviour and its intensity. "This habit" also works but is less precise.',
      },
      {
        prompt:
          "The study found that bilingual children outperform monolingual peers on problem-solving tasks. It suggests language learning has cognitive benefits beyond communication.",
        instruction: 'Use "This + noun"',
        model:
          "The study found that bilingual children consistently outperform their monolingual peers on complex problem-solving tasks. This finding strongly suggests that learning a second language confers cognitive benefits that extend well beyond the ability to communicate.",
        keywords:
          '"This FINDING"   the standard summary noun for research results.',
        why: '"Finding" is the precise academic term for a research result. Always use "finding" or "result"   not "this thing they found".',
      },
      {
        prompt:
          "Air travel accounts for roughly 2.5% of global CO2 emissions. Some argue the real impact is much higher due to other gases released.",
        instruction: 'Use "This + noun"',
        model:
          "Air travel is responsible for approximately 2.5% of global CO2 emissions, though its total climate impact may be considerably higher when other gases are taken into account. This estimate, experts caution, may therefore significantly understate the industry's true environmental cost.",
        keywords: '"This ESTIMATE"   precise noun for a numerical claim.',
        why: 'When referring to statistics or percentages, "estimate" or "figure" are the correct summary nouns   not "number" or "amount".',
      },
      {
        prompt:
          "Many schools have banned the use of smartphones in classrooms. Test scores have improved as a result.",
        instruction: 'Use "This + noun"',
        model:
          "A growing number of schools have introduced blanket bans on the use of smartphones during lessons. This measure has been associated with measurable improvements in test scores and classroom concentration levels.",
        keywords: '"This MEASURE"   policy/action summary noun.',
        why: '"Measure" is the correct formal term for a policy action or rule introduced to address a problem.',
      },
      {
        prompt:
          "The population of the world is expected to reach ten billion by 2050. This creates enormous challenges for food production.",
        instruction: 'Rewrite to use a stronger "This + noun" construction',
        model:
          "The global population is projected to reach ten billion by the middle of this century. This unprecedented demographic expansion will place enormous strain on food production systems, water resources, and arable land.",
        keywords:
          '"unprecedented demographic EXPANSION"   elevated noun phrase.',
        why: 'Using a compound noun phrase ("demographic expansion") instead of "growth in people" signals academic register and precision.',
      },
    ],
  },
  {
    id: "s7",
    name: "In addition / Furthermore / Moreover",
    short: "In addition / Furthermore...",
    rule: 'Use to add a second or third point that supports the same argument. "Moreover" and "Furthermore" add a point that is STRONGER or MORE IMPORTANT than the previous one. Place a comma after them.',
    formula:
      "[First point]. Furthermore/Moreover/In addition, [stronger or additional point].",
    example:
      "The new transport policy will reduce congestion in the city centre. Furthermore, it is expected to generate significant revenue that can be reinvested in public services.",
    drills: [
      {
        prompt:
          "Daily exercise reduces the risk of heart disease. It also helps maintain a healthy weight.",
        instruction: 'Connect using "Furthermore"',
        model:
          "Daily exercise has been shown to significantly reduce the risk of cardiovascular disease. Furthermore, it plays an equally important role in maintaining a healthy body weight and preventing obesity-related conditions.",
        keywords:
          '"plays an equally important role in"   cohesive phrase that links back to the first point.',
        why: '"Equally important" signals that the second point has the same significance as the first   it maintains balance.',
      },
      {
        prompt:
          "Volunteering builds useful skills. It can also improve mental health.",
        instruction: 'Connect using "Moreover"',
        model:
          "Volunteering provides individuals with a range of practical and transferable skills that are valued by employers. Moreover, research consistently indicates that regular voluntary work has a measurable positive impact on mental health and personal wellbeing.",
        keywords:
          '"Moreover"   use when the second point adds something more significant.',
        why: '"Moreover" implies escalation   the point it introduces is typically more important or surprising than the previous one.',
      },
      {
        prompt:
          "Reading improves vocabulary. It also enhances concentration and focus.",
        instruction: 'Connect using "In addition"',
        model:
          "Reading regularly has a well-documented positive effect on vocabulary acquisition and linguistic range. In addition, it is associated with improved powers of concentration and sustained attention, both of which are valuable across all areas of academic study.",
        keywords: '"linguistic range"   formal synonym for "vocabulary".',
        why: '"Linguistic range" is more formal than "vocabulary" and signals awareness of academic register.',
      },
      {
        prompt:
          "The company has reduced its carbon footprint by 30%. It has also invested in renewable energy.",
        instruction: 'Connect using "Furthermore"',
        model:
          "The company has succeeded in reducing its operational carbon footprint by thirty percent over the past financial year. Furthermore, it has committed substantial resources to investing in on-site renewable energy generation, signalling a broader commitment to environmental sustainability.",
        keywords:
          '"committed substantial resources to"   formal phrase for spending or investing.',
        why: '"Committed resources to" is more formal than "invested money in" and implies strategic intent rather than passive spending.',
      },
      {
        prompt:
          "The new school curriculum includes coding lessons. It also covers financial literacy.",
        instruction: 'Connect using "Moreover"',
        model:
          "The revised school curriculum now incorporates coding lessons at both primary and secondary level, preparing students for an increasingly digital economy. Moreover, the inclusion of financial literacy modules equips young people with practical life skills that have long been absent from formal education.",
        keywords:
          '"long been absent from formal education"   adds critical perspective.',
        why: 'Adding "long been absent" implies this is a correction of a past failure   it shows analytical depth, not just summary.',
      },
      {
        prompt:
          "Processed food contains high levels of salt. It also has artificial additives.",
        instruction: 'Connect using "In addition"',
        model:
          "Processed food frequently contains dangerously high levels of sodium, contributing to hypertension and cardiovascular disease. In addition, many such products are heavily laden with artificial colourings, preservatives, and flavour enhancers whose long-term health effects remain poorly understood.",
        keywords:
          '"whose long-term health effects remain poorly understood"   relative clause that adds uncertainty.',
        why: 'Adding a relative clause ("whose...") after the second noun phrase shows complex sentence construction.',
      },
      {
        prompt:
          "Air pollution causes respiratory illnesses. It also affects cognitive development in children.",
        instruction: 'Connect using "Furthermore"',
        model:
          "Air pollution is a leading cause of respiratory illness, particularly in densely populated urban areas. Furthermore, emerging research suggests that prolonged exposure to particulate matter may significantly impair cognitive development in young children, with potentially lasting consequences.",
        keywords:
          '"with potentially lasting consequences"   adverbial phrase of result.',
        why: "Ending with a consequence phrase shows you understand implications   a marker of analytical writing.",
      },
      {
        prompt:
          "The river has been cleaned up. Fish have returned to the area.",
        instruction: 'Connect using "Moreover"',
        model:
          "Sustained conservation efforts have successfully restored the water quality of the river to safe levels after decades of industrial pollution. Moreover, the return of several fish species to the area is a clear indicator that the ecosystem is undergoing genuine and encouraging recovery.",
        keywords:
          '"genuine and encouraging recovery"   evaluative noun phrase.',
        why: 'Evaluating the significance of the evidence ("genuine and encouraging") shows analytical thinking rather than simple description.',
      },
      {
        prompt:
          "The new library provides access to books and computers. It also offers quiet study space.",
        instruction: 'Connect using "In addition"',
        model:
          "The newly opened community library provides free access to an extensive collection of books and state-of-the-art computer facilities. In addition, it offers dedicated quiet study spaces that are particularly valuable for students who lack suitable conditions for study at home.",
        keywords:
          '"particularly valuable for students who lack"   relative clause adding social context.',
        why: 'Adding social context ("for students who lack...") shows awareness of who benefits most, which demonstrates analytical depth.',
      },
      {
        prompt:
          "Cycling is good for personal health. It also reduces pressure on road infrastructure.",
        instruction: 'Connect using "Furthermore"',
        model:
          "Cycling is widely regarded as one of the most effective forms of low-impact exercise for maintaining cardiovascular health. Furthermore, widespread adoption of cycling as a primary mode of urban transport would substantially reduce pressure on road infrastructure and help alleviate chronic traffic congestion.",
        keywords:
          '"widespread adoption of cycling as a primary mode of urban transport"   nominalised subject.',
        why: 'Nominalising "if people cycled more" into "widespread adoption of cycling" makes the sentence more formal and compact.',
      },
    ],
  },
  {
    id: "s8",
    name: "As a result / Consequently / Therefore",
    short: "As a result / Therefore...",
    rule: 'Use to show that one thing CAUSES or LEADS TO another. These are cause-and-effect connectors. "Therefore" is used for logical conclusions. "As a result" and "Consequently" show direct outcomes.',
    formula: "[Cause]. As a result/Consequently/Therefore, [effect].",
    example:
      "The region experienced its driest summer on record. As a result, crop yields fell dramatically, threatening food security for thousands of families.",
    drills: [
      {
        prompt: "The factory closed down. Many workers lost their jobs.",
        instruction: 'Connect using "As a result"',
        model:
          "The closure of the factory, which had been the area's largest employer for over forty years, was announced without warning. As a result, several hundred workers were left without employment and with little prospect of finding comparable work in the local area.",
        keywords:
          '"without warning" and "without employment"   parallel "without" structure.',
        why: 'Parallel structure ("without warning"/"without employment") creates rhythm and coherence in academic writing.',
      },
      {
        prompt:
          "The government cut the education budget. Schools could not afford enough teachers.",
        instruction: 'Connect using "Consequently"',
        model:
          "The government implemented significant cuts to the national education budget as part of its wider austerity programme. Consequently, many schools found themselves unable to recruit or retain sufficient numbers of qualified teachers, leading to larger class sizes and reduced teaching quality.",
        keywords:
          '"leading to larger class sizes"   secondary consequence after the main one.',
        why: 'Adding a secondary consequence ("leading to...") after the main effect shows chain reasoning   a strong analytical skill.',
      },
      {
        prompt:
          "Temperatures in the region have risen by two degrees. Many animal species are migrating north.",
        instruction: 'Connect using "As a result"',
        model:
          "Average temperatures across the region have risen by approximately two degrees Celsius over the past fifty years, disrupting established seasonal patterns. As a result, numerous animal species have begun migrating progressively northward in search of cooler and more suitable habitats.",
        keywords: '"progressively northward"   directional adverb phrase.',
        why: '"Progressively" implies the migration is gradual and ongoing rather than sudden   precision of process.',
      },
      {
        prompt:
          "The road was blocked for three hours due to an accident. Many commuters arrived late for work.",
        instruction: 'Connect using "Therefore"',
        model:
          "A serious traffic accident on the main arterial road into the city caused a complete blockage lasting approximately three hours during the morning rush. Therefore, a large number of commuters were unable to reach their workplaces on time, resulting in widespread disruption to businesses across the city.",
        keywords: '"arterial road"   formal term for a main road.',
        why: '"Arterial road" is the precise formal term. Replace everyday vocabulary with precise terminology wherever possible.',
      },
      {
        prompt:
          "The text argues that social media reduces face-to-face communication. Young people are becoming more socially isolated.",
        instruction: 'Connect using "Consequently"   summarising an argument',
        model:
          "The text argues that widespread social media use has led to a significant reduction in meaningful face-to-face interaction among younger people. Consequently, the author concludes that rising levels of social isolation and loneliness among adolescents are at least partly attributable to the dominance of digital communication.",
        keywords: '"at least partly attributable to"   careful causal claim.',
        why: '"Attributable to" means "caused by" but "at least partly" acknowledges that other factors may also play a role   this shows nuance.',
      },
      {
        prompt:
          "The new drug was found to be highly effective in trials. The government approved it for widespread use.",
        instruction: 'Connect using "As a result"',
        model:
          "The new pharmaceutical compound demonstrated a high degree of efficacy in large-scale clinical trials, with minimal serious side effects reported. As a result, regulatory authorities granted approval for its widespread clinical use within a relatively short timeframe.",
        keywords:
          '"regulatory authorities granted approval"   formal passive for government/official action.',
        why: 'Using the passive voice for official actions ("approval was granted") is standard in formal academic writing.',
      },
      {
        prompt:
          "The charity raised more money than expected. It was able to open a new shelter for homeless people.",
        instruction: 'Connect using "Therefore"',
        model:
          "The charity's annual fundraising campaign exceeded its target by a considerable margin, attracting donations from both corporate sponsors and individual members of the public. Therefore, the organisation was in a position to fund and open a new emergency shelter, providing essential accommodation for an additional two hundred homeless individuals.",
        keywords:
          '"was in a position to fund"   formal phrasing for "was able to".',
        why: '"Was in a position to" is more formal and specific than "could" or "was able to"   use it in formal summarising.',
      },
      {
        prompt:
          "The local river became heavily polluted due to factory runoff. Fishing was banned.",
        instruction: 'Connect using "Consequently"',
        model:
          "The local river became severely polluted following the discharge of industrial waste and chemical runoff from a nearby manufacturing facility. Consequently, local authorities were compelled to impose an indefinite ban on all fishing in the affected stretch of the waterway.",
        keywords: '"were compelled to impose"   passive with strong modal.',
        why: '"Were compelled to" (forced by circumstances) is more nuanced than "had to"   it implies there was no choice.',
      },
      {
        prompt:
          "Many people are working longer hours. Stress-related illness is increasing.",
        instruction: 'Connect using "As a result"',
        model:
          "A growing proportion of the working population is regularly logging significantly more hours than their contracted terms stipulate, driven by job insecurity and increasing workloads. As a result, healthcare professionals have reported a marked rise in stress-related and burnout-related conditions across all age groups and sectors.",
        keywords:
          '"their contracted terms stipulate"   formal reference to employment contracts.',
        why: '"Stipulate" is a formal verb meaning "to require or specify in a contract"   using it shows high-level vocabulary control.',
      },
      {
        prompt:
          "The price of oil fell sharply. Several energy companies reported losses.",
        instruction: 'Connect using "Therefore"',
        model:
          "Global oil prices fell sharply during the final quarter of the year due to a combination of reduced demand and increased production. Therefore, a number of major energy companies reported significant financial losses and were forced to scale back planned investment in new exploration projects.",
        keywords:
          '"scale back planned investment"   phrasal verb in formal register.',
        why: '"Scale back" is an acceptable formal phrasal verb. It means to reduce in scope   an important business/economics term.',
      },
    ],
  },
  {
    id: "s9",
    name: "It is + adjective + that / to",
    short: "It is... that / to...",
    rule: 'Use this impersonal structure to make formal statements, give opinions, or state facts without using "I". It allows you to introduce important points without a personal subject.',
    formula:
      "It is + [adjective] + that + [clause]. OR It is + [adjective] + to + [infinitive].",
    example:
      "It is widely acknowledged that access to clean water is a fundamental human right that governments have a responsibility to protect.",
    drills: [
      {
        prompt: "Everyone agrees that exercise is important for children.",
        instruction: 'Rewrite using "It is + adjective + that"',
        model:
          "It is widely recognised that regular physical exercise is essential for the healthy development of children, both physically and cognitively.",
        keywords: '"It is widely RECOGNISED that"   passive impersonal.',
        why: '"Widely recognised" avoids saying "I think" or "everyone agrees"   it creates an impersonal formal tone.',
      },
      {
        prompt: "We must act quickly to stop climate change.",
        instruction: 'Rewrite using "It is + adjective + to"',
        model:
          "It is imperative that governments and individuals act decisively and without further delay to address the accelerating threat of climate change.",
        keywords:
          '"It is IMPERATIVE that"   strong obligation without personal subject.',
        why: '"Imperative" is a formal synonym for "essential" or "necessary"   it expresses urgency effectively.',
      },
      {
        prompt: "People should not underestimate the importance of sleep.",
        instruction: 'Rewrite using "It is + adjective + to"',
        model:
          "It is a serious mistake to underestimate the profound importance of adequate sleep for physical health, cognitive function, and emotional wellbeing.",
        keywords: '"It is a serious mistake to"   judgement phrase.',
        why: 'Using "a serious mistake" rather than "wrong" shows a more nuanced and formal evaluation.',
      },
      {
        prompt:
          "Researchers have confirmed that diet plays a major role in preventing cancer.",
        instruction: 'Rewrite using "It is + adjective + that"',
        model:
          "It is now well established that dietary choices play a significant role in either increasing or reducing an individual's risk of developing certain types of cancer.",
        keywords:
          '"It is now well ESTABLISHED that"   signals scientific consensus.',
        why: '"Well established" signals that this is settled scientific knowledge rather than a single opinion.',
      },
      {
        prompt: "Young people find it difficult to afford housing.",
        instruction: 'Rewrite using "It is + adjective + for + noun + to"',
        model:
          "It is increasingly difficult for young people on average incomes to afford suitable housing in most major cities, where property prices continue to outstrip wage growth.",
        keywords:
          '"It is increasingly difficult FOR young people ON average incomes TO afford"   full impersonal structure.',
        why: 'The "It is [adj] for [noun] to [verb]" structure is one of the most useful ELLT summarising patterns for stating challenges.',
      },
      {
        prompt: "We cannot ignore the risks of artificial intelligence.",
        instruction: 'Rewrite using "It is + adjective + to"',
        model:
          "It would be irresponsible to ignore the significant ethical, social, and economic risks associated with the rapid and largely unregulated development of artificial intelligence systems.",
        keywords: '"It would be IRRESPONSIBLE to"   conditional adds caution.',
        why: '"Would be irresponsible" is a softer, more cautious claim than "is wrong"   it invites agreement rather than demanding it.',
      },
      {
        prompt: "The study found that reading fiction improves empathy.",
        instruction: 'Rewrite using "It is + adjective + that"',
        model:
          "It is perhaps unsurprising that the study found a positive correlation between regular reading of literary fiction and higher levels of empathy, given the role of fiction in exploring diverse human perspectives.",
        keywords:
          '"It is perhaps UNSURPRISING that"   concedes the finding is logical.',
        why: '"Perhaps unsurprising" is a sophisticated concession   it frames the finding as logical rather than unexpected.',
      },
      {
        prompt: "Only a few people know how to manage money effectively.",
        instruction: 'Rewrite using "It is + adjective + that"',
        model:
          "It is concerning that a relatively small proportion of the population possesses the financial literacy skills necessary to manage personal finances effectively, despite the central role of money management in daily adult life.",
        keywords: '"It is CONCERNING that"   evaluative impersonal.',
        why: '"Concerning" is a strong evaluative adjective that signals you are not just summarising but interpreting   a Band 6 skill.',
      },
      {
        prompt:
          "Air pollution is linked to many deaths each year. This is a serious problem.",
        instruction:
          'Rewrite combining both points with "It is + adjective + that"',
        model:
          "It is deeply troubling that air pollution is estimated to contribute to several million premature deaths annually across the world, the vast majority of which occur in low and middle-income countries.",
        keywords:
          '"It is deeply TROUBLING that"   adverb + evaluative adjective.',
        why: '"Deeply troubling" is stronger than "worrying" and more specific than "bad"   calibrate the intensity of your evaluation adjective.',
      },
      {
        prompt:
          "Scientists say that the ice caps will melt faster than expected.",
        instruction: 'Rewrite using "It is + adjective + that"',
        model:
          "It is now feared that polar ice caps may be melting at a considerably faster rate than existing climate models had projected, with potentially catastrophic consequences for global sea levels.",
        keywords:
          '"It is now FEARED that"   passive reporting verb as adjective structure.',
        why: '"It is feared that" is a passive reporting structure that attributes concern to the scientific community without naming them   useful when you do not have a specific source.',
      },
    ],
  },
  {
    id: "s10",
    name: "The + noun + of + noun (nominalisation)",
    short: "The [noun] of [noun]...",
    rule: "Nominalisation means turning verbs and adjectives into nouns. This makes writing more formal, more compact, and more precise. It is the single most important feature that distinguishes Band 5 from Band 6 writing.",
    formula:
      "Verb → Noun: grow → growth | increase → increase | reduce → reduction | discover → discovery",
    example:
      "WEAK: Scientists discovered that microplastics are dangerous. → STRONG: The discovery of microplastics in human tissue has raised serious concerns about their long-term health effects.",
    drills: [
      {
        prompt:
          "Governments are spending more on renewable energy. This is important.",
        instruction:
          'Rewrite using nominalisation   turn "spending more" into a noun phrase',
        model:
          "The significant increase in government expenditure on renewable energy infrastructure represents a crucial step towards achieving long-term decarbonisation targets.",
        keywords:
          '"the increase in government EXPENDITURE on"   nominalise "spending" → "expenditure".',
        why: '"Expenditure" is the formal nominal form of "spending". Nominalisation + evaluation ("crucial step") = Band 6 structure.',
      },
      {
        prompt: "The climate is getting warmer. This threatens agriculture.",
        instruction: "Rewrite using nominalisation",
        model:
          "The progressive warming of the global climate poses a significant threat to agricultural productivity, particularly in regions that are already experiencing water stress.",
        keywords:
          '"the progressive WARMING of the global climate"   gerund as noun.',
        why: '"The warming of" nominalises "is getting warmer". "Progressive" adds the sense of ongoing gradual change.',
      },
      {
        prompt:
          "Countries are becoming more dependent on technology. This creates risks.",
        instruction: "Rewrite using nominalisation",
        model:
          "The growing dependence of nations on digital technology creates a range of serious security risks, including vulnerability to cyberattack and the potential collapse of critical infrastructure.",
        keywords:
          '"the growing DEPENDENCE of nations on"   abstract noun from "dependent".',
        why: '"Dependence" (noun) replaces "dependent" (adjective) + "becoming" (verb). One noun replaces three words.',
      },
      {
        prompt:
          "The government has failed to act on housing. This has made the problem worse.",
        instruction: "Rewrite using nominalisation",
        model:
          "The government's repeated failure to act decisively on the housing crisis has significantly exacerbated an already acute shortage of affordable residential properties.",
        keywords:
          '"the government\'s repeated FAILURE to act"   possessive + noun.',
        why: 'Using "failure" nominalises "has failed" and allows you to add the evaluative adjective "repeated"   impossible with a verb.',
      },
      {
        prompt:
          "People are migrating from rural to urban areas. This is happening fast.",
        instruction: "Rewrite using nominalisation",
        model:
          "The rapid migration of people from rural communities to urban centres is placing increasing pressure on city infrastructure, housing, and public services.",
        keywords:
          '"The rapid MIGRATION of people from... to"   direction built into noun phrase.',
        why: '"Migration" captures the entire movement idea. "Rapid" replaces "is happening fast". The whole idea is now a subject noun phrase.',
      },
      {
        prompt:
          "Scientists discovered that the drug was effective. This changed medical practice.",
        instruction: "Rewrite using nominalisation",
        model:
          "The discovery of the drug's effectiveness in treating the condition fundamentally transformed medical practice and prompted a significant revision of standard treatment protocols.",
        keywords:
          '"the discovery of the drug\'s EFFECTIVENESS"   chain of nominalisations.',
        why: 'Two nominalisations in one phrase: "discovery" (from discover) + "effectiveness" (from effective). This is advanced nominalisation.',
      },
      {
        prompt:
          "The population is growing older. This puts pressure on pension systems.",
        instruction: "Rewrite using nominalisation",
        model:
          "The progressive ageing of the population in most developed countries is placing unsustainable pressure on existing pension systems, which were designed for a very different demographic reality.",
        keywords:
          '"the progressive AGEING of the population"   gerund nominalisation.',
        why: '"Ageing" as a noun (gerund) replaces "is growing older". Adding "progressive" shows the process is gradual and ongoing.',
      },
      {
        prompt:
          "The government reduced taxes. Businesses started investing again.",
        instruction: "Rewrite using nominalisation   show cause and effect",
        model:
          "The government's reduction in corporate taxation prompted a renewed willingness among businesses to invest in expansion and recruitment.",
        keywords:
          '"the government\'s REDUCTION in taxation PROMPTED a renewed WILLINGNESS to invest".',
        why: "Three nominalisations in one sentence: reduction (reduced), willingness (willing), invest (investment implied). This is expert-level compression.",
      },
      {
        prompt:
          "People are using social media more. This is affecting how they communicate.",
        instruction: "Rewrite using nominalisation",
        model:
          "The dramatic increase in social media use has had a measurable impact on the way in which individuals communicate, with face-to-face interaction declining notably among younger generations.",
        keywords:
          '"the dramatic INCREASE in social media USE" + "IMPACT on the way".',
        why: '"Use" nominalisises "are using". "Impact" nominalises "affecting". Two noun replacements in the opening phrase.',
      },
      {
        prompt: "The river was polluted. Fish died. The ecosystem was damaged.",
        instruction: "Combine all three into ONE sentence using nominalisation",
        model:
          "The severe pollution of the river resulted in a catastrophic decline in fish populations and caused lasting damage to the surrounding aquatic ecosystem.",
        keywords:
          '"the severe POLLUTION of" + "a catastrophic DECLINE in" + "lasting DAMAGE to".',
        why: "Three events → one sentence through three nominalisations. This is the most powerful use of nominalisation in summarising.",
      },
    ],
  },
];
