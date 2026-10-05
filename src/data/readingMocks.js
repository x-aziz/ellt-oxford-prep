// 4 targeted reading mocks (from RealVersion-reading.html)
// Auto-converted from the original HTML file, content unchanged.
export const READING_MOCKS = [
 {
  "id": 1,
  "title": "Coral Reefs · AI Travel · Neuroplasticity",
  "focus": "Close ordering sentences + connector traps",
  "s1": {
   "title": "The Decline of the World's Coral Reefs",
   "trapNote": "Paragraphs C and D both discuss human solutions — check which comes first by looking at what problem each responds to. Paragraph B starts with 'This warming' — 'this' must refer to something in the previous paragraph.",
   "paras": [
    {
     "l": "A",
     "pos": 1,
     "txt": "Coral reefs cover less than one percent of the ocean floor, yet they support approximately twenty-five percent of all marine life on Earth. Often called the rainforests of the sea, these complex underwater ecosystems provide habitat, food, and breeding grounds for an enormous diversity of species.",
     "why": "Introduction — defines what reefs are and their importance. No pronoun referring back. Sets up everything that follows."
    },
    {
     "l": "B",
     "pos": 3,
     "txt": "This warming causes a process called coral bleaching, in which corals expel the colourful algae that live in their tissues and provide them with nutrients. Without these algae, the coral turns white and, if conditions do not improve within weeks, dies. A 2016 bleaching event killed around half of the coral in the northern Great Barrier Reef.",
     "why": "'This warming' refers to the ocean warming described in paragraph C. 'Bleaching' is explained here for the first time — so this must come AFTER the cause is introduced."
    },
    {
     "l": "C",
     "pos": 2,
     "txt": "Despite their importance, coral reefs worldwide are in serious decline. The primary cause is rising ocean temperatures linked to climate change. When sea surface temperatures rise even one or two degrees above normal levels for extended periods, reefs come under severe stress.",
     "why": "'Despite their importance' = contrast with A's positive description. Introduces the main threat (climate change/temperature) that B then develops with 'This warming'."
    },
    {
     "l": "D",
     "pos": 4,
     "txt": "Scientists and conservationists are working on several approaches to protect and restore reefs. These include reducing local stressors such as pollution and overfishing, establishing marine protected areas, and developing more heat-resistant coral through selective breeding.",
     "why": "Logically follows the problem (bleaching/death). Introduces solutions. 'These include' lists specific actions — the plural 'stressors' needs a previous mention of threats."
    },
    {
     "l": "E",
     "pos": 5,
     "txt": "However, experts stress that these conservation efforts can only succeed alongside dramatic reductions in global carbon emissions. Without addressing the root cause of ocean warming, even the most innovative restoration projects will ultimately prove insufficient.",
     "why": "'However' contrasts with D's solutions. 'These conservation efforts' refers back to D specifically. The conclusion — makes global action the final message."
    }
   ],
   "qs": [
    {
     "n": 1,
     "type": "mc",
     "text": "According to the passage, what percentage of marine species do coral reefs support?",
     "opts": [
      "A. Around ten percent",
      "B. Around twenty-five percent",
      "C. Around fifty percent",
      "D. Around one percent"
     ],
     "ans": 1,
     "ev": "they support approximately twenty-five percent of all marine life",
     "why": "B — directly stated. One percent refers to ocean floor coverage — a number trap.",
     "trap": "Two percentages are given: one percent (floor coverage) and twenty-five percent (species). The question asks about species."
    },
    {
     "n": 2,
     "type": "mc",
     "text": "What happens to coral during bleaching?",
     "opts": [
      "A. It absorbs more heat from the surrounding water",
      "B. It reproduces at a higher rate",
      "C. It expels the algae that provide it with nutrients",
      "D. It changes colour to attract more fish"
     ],
     "ans": 2,
     "ev": "corals expel the colourful algae that live in their tissues and provide them with nutrients",
     "why": "C — directly stated. Colour change (D) happens as a result but is not the primary event.",
     "trap": "D says the coral 'changes colour' — the passage says it turns white, but the action is expelling algae not actively changing colour."
    },
    {
     "n": 3,
     "type": "tf",
     "text": "The 2016 bleaching event destroyed the entire Great Barrier Reef.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "killed around half of the coral in the northern Great Barrier Reef",
     "why": "FALSE — only HALF and only the NORTHERN section. The passage does not describe total destruction.",
     "trap": "'Half of the coral in the NORTHERN' section — not the whole reef, not all coral."
    },
    {
     "n": 4,
     "type": "mc",
     "text": "What do experts say is essential alongside conservation efforts?",
     "opts": [
      "A. Building artificial reefs in every ocean",
      "B. Closing all fishing industries permanently",
      "C. Reducing global carbon emissions dramatically",
      "D. Moving coral to cooler polar waters"
     ],
     "ans": 2,
     "ev": "these conservation efforts can only succeed alongside dramatic reductions in global carbon emissions",
     "why": "C — directly stated. A and D are not mentioned. B is too extreme — overfishing reduction not total closure.",
     "trap": "D sounds like a scientific solution but is never mentioned. Do not invent solutions not in the passage."
    }
   ]
  },
  "s2": {
   "title": "How AI Is Changing Travel Planning",
   "trapNote": "Gap 1 introduces a specific person — the sentence after uses 'She' which confirms the gap must introduce a female character. Gap 4: the sentence before ends with 'Most share one quality in common' — your sentence must name THAT quality. Gap 6: 'He believes' means the sentence before must have introduced a named male expert.",
   "textHtml": "<p><span class=\"gap-marker\">(1)</span> Instead of relying on travel blogs or maps, she used ChatGPT. She wanted to find a route that got her from the airport to her hotel quickly and let her see the sights, all while being on budget.</p><p><span class=\"gap-marker\">(2)</span> For example, Expedia's generative AI trip-matching chatbot lets users turn videos they see on social media into travel plans sent via direct messages.</p><p><span class=\"gap-marker\">(3)</span> A third, Mindtrip's AI, offers videos and links to flights and accommodations. Most share one quality in common.</p><p><span class=\"gap-marker\">(4)</span> Instead, ChatGPT large language models train themselves on user forums. In academic studies, AI often didn't even pick up on sponsored ads. But the qualities that give AI its current edge can also backfire.</p><p><span class=\"gap-marker\">(5)</span> ChatGPT once suggested that Bri Mitchell, a travel blogger from Toronto, go on a hike in Kluane National Park. It didn't mention that bears roam this area or suggest any cautionary measures.</p><p><span class=\"gap-marker\">(6)</span> He believes that AI can help you understand why you should make a decision, but that it is wrong to make the decision for you.</p><p><span class=\"gap-marker\">(7)</span> In this way, AI might say it's giving you an exact price with certainty. However, the tool doesn't have the permissions to access many sites in real time, at least not for now.</p><p><span class=\"gap-marker\">(8)</span> Additionally, adding details such as, \"I'm going on my first vacation with my new girlfriend\" can help too.</p>",
   "options": [
    {
     "l": "A",
     "txt": "Rob Brooks, who works for a travel company, explains this by saying that people are not using AI correctly."
    },
    {
     "l": "B",
     "txt": "You can ask something like: \"I really liked Rome, but I am going to check out Barcelona this time. Can you help me think it through?\""
    },
    {
     "l": "C",
     "txt": "Nearly 2,072 Canadian travellers have reported using AI to plan trips recently, and they're not just using ChatGPT."
    },
    {
     "l": "D",
     "txt": "Many travelers have reported alarming experiences in which AI systems have left them in difficult or risky situations."
    },
    {
     "l": "E",
     "txt": "Danica Nelson had roughly 12 hours and $300 to explore Hong Kong on a recent stopover in Asia."
    },
    {
     "l": "F",
     "txt": "Another popular chatbot from Layla AI learns users' travel preferences to generate customized plans."
    },
    {
     "l": "G",
     "txt": "They aren't trained on sponsored content."
    },
    {
     "l": "H",
     "txt": "Moreover, even though AI is designed to speak confidently, it does not always have access to real-time or complete information, so users need to think critically about its advice."
    }
   ],
   "qs": [
    {
     "n": 1,
     "ans": "E",
     "why": "Gap 1: The sentence after says 'She' — so gap 1 must introduce a female character. E introduces 'Danica Nelson' — a woman. The sentence continues with her goals matching the next sentence perfectly."
    },
    {
     "n": 2,
     "ans": "C",
     "why": "Gap 2: 'For example' follows — so gap 2 must be a general statement that the example illustrates. C says travellers use 'not just ChatGPT' which sets up the examples of other AI tools (Expedia, Layla, Mindtrip) that follow."
    },
    {
     "n": 3,
     "ans": "F",
     "why": "Gap 3: Lists a second chatbot after Expedia. F introduces 'Layla AI' — another chatbot. Then the text mentions 'A third, Mindtrip's AI' — confirming F is the second in a series."
    },
    {
     "n": 4,
     "ans": "G",
     "why": "Gap 4: The sentence before says 'Most share one quality in common' — so gap 4 names THAT quality. G says 'They aren't trained on sponsored content' — the shared quality. 'Instead, ChatGPT trains on user forums' continues the same point."
    },
    {
     "n": 5,
     "ans": "D",
     "why": "Gap 5: The sentence before says 'can also backfire' — gap 5 introduces the negative consequences. D mentions 'alarming experiences' — directly after 'backfire'. The Mitchell bear story is a specific example."
    },
    {
     "n": 6,
     "ans": "A",
     "why": "Gap 6: The sentence after says 'He believes' — so gap 6 must introduce a named male expert. A introduces 'Rob Brooks, who works for a travel company'. 'He believes' in the next sentence then quotes him."
    },
    {
     "n": 7,
     "ans": "H",
     "why": "Gap 7: The sentence after talks about AI giving 'exact prices with certainty' but lacking real-time access — a confidence/accuracy problem. H mentions AI 'speaking confidently' without complete information — a perfect bridge."
    },
    {
     "n": 8,
     "ans": "B",
     "why": "Gap 8: 'Additionally' at the start of the next sentence continues adding advice. Gap 8 must be the first piece of specific advice. B gives a specific example question — 'ask something like' — which naturally precedes 'Additionally, adding details'."
    }
   ]
  },
  "s3": {
   "title": "The Science of Neuroplasticity",
   "passHtml": "<p>For most of the twentieth century, neuroscientists held that the adult brain was essentially fixed — a static organ whose structure and capacity were determined in early childhood and could only decline with age. This view, though long accepted, has been comprehensively overturned by decades of research establishing that the brain retains a remarkable capacity for structural and functional change throughout life, a property known as <strong>neuroplasticity</strong>.</p><p>At the cellular level, neuroplasticity involves the strengthening of existing synaptic connections, the formation of entirely new connections, and the <strong>pruning</strong> of pathways that fall into disuse. A frequently cited principle in neuroscience summarises this as \"neurons that fire together wire together\" — meaning that repeated activation of the same neural pathway strengthens it, making future activation faster and more efficient.</p><p>Perhaps the most compelling empirical demonstration of neuroplasticity in healthy adults comes from research conducted by neuroscientist Eleanor Maguire in the early 2000s. Maguire found that experienced London taxi drivers, who must memorise thousands of streets and routes to qualify, possessed measurably larger hippocampi — the brain region most closely associated with spatial navigation — than comparable non-drivers. Critically, the <strong>degree</strong> of enlargement correlated with the length of the driver's experience, and drivers who retired subsequently showed a reduction in hippocampal volume, demonstrating that the structural change was both use-dependent and reversible.</p><p>The implications of neuroplasticity for learning and rehabilitation are profound. Patients recovering from stroke, for instance, can often relearn lost functions — including speech, movement, and cognition — by recruiting intact brain regions to assume the responsibilities of those that have been damaged. This process requires intensive, repetitive practice, as the formation of robust new neural pathways depends on sustained and frequent activation.</p><p>Nevertheless, neuroplasticity is not unlimited. The brain's capacity for change declines gradually with age, and while adults retain meaningful plasticity throughout life, the rapid and pervasive plasticity of early childhood — during which the brain is in a <strong>heightened</strong> period of structural organisation — is not fully recovered. Critics have also cautioned against overstating the practical implications of neuroplasticity research, noting that the transfer of findings from controlled laboratory studies to real-world educational or therapeutic applications remains inconsistent and incompletely understood.</p>",
   "qs": [
    {
     "n": 1,
     "type": "v",
     "text": "The word 'pruning' in the second paragraph is closest in meaning to:",
     "opts": [
      "A. Growing and strengthening",
      "B. Carefully measuring",
      "C. Removing those that are no longer active",
      "D. Connecting to new areas"
     ],
     "ans": 2,
     "ev": "the pruning of pathways that fall into disuse",
     "why": "Pruning = removing/cutting away. C is correct. The context confirms it: 'pathways that fall into disuse' are removed.",
     "trap": "A is the opposite — pruning means removing, not growing."
    },
    {
     "n": 2,
     "type": "v",
     "text": "The word 'degree' in the third paragraph is closest in meaning to:",
     "opts": [
      "A. Academic qualification",
      "B. Temperature measurement",
      "C. Geographical area",
      "D. Extent or amount"
     ],
     "ans": 3,
     "ev": "the degree of enlargement correlated with the length of the driver's experience",
     "why": "Degree here = extent/amount. D is correct. The academic meaning (A) is a classic context-interference trap.",
     "trap": "'Degree' is most commonly known as an academic qualification — but in this scientific context it means extent or amount."
    },
    {
     "n": 3,
     "type": "v",
     "text": "The word 'heightened' in the final paragraph is closest in meaning to:",
     "opts": [
      "A. Physically taller",
      "B. Elevated or increased",
      "C. Hidden or difficult to find",
      "D. Gradually declining"
     ],
     "ans": 1,
     "ev": "a heightened period of structural organisation",
     "why": "Heightened = elevated/increased. B is correct. The context describes childhood as a period of GREATER plasticity.",
     "trap": "A — 'heightened' sounds like 'height' suggesting physical tallness. But here it is metaphorical: heightened = increased."
    },
    {
     "n": 4,
     "type": "v",
     "text": "The word 'robust' in the fourth paragraph is closest in meaning to:",
     "opts": [
      "A. Temporary and fragile",
      "B. Painful and difficult",
      "C. Strong and well-established",
      "D. Small and precise"
     ],
     "ans": 2,
     "ev": "the formation of robust new neural pathways depends on sustained and frequent activation",
     "why": "Robust = strong, well-established. C is correct. The context — needing 'intensive, repetitive practice' — confirms strength is needed.",
     "trap": "D sounds scientific ('precise pathways') but robust specifically means strong/durable, not precise."
    },
    {
     "n": 5,
     "type": "mc",
     "text": "According to the passage, what did research on London taxi drivers demonstrate?",
     "opts": [
      "A. That intelligence increases with professional experience",
      "B. That the hippocampus controls memory of all types",
      "C. That brain structure can change in response to sustained use",
      "D. That neuroplasticity occurs only in people with specialist occupations"
     ],
     "ans": 2,
     "ev": "the structural change was both use-dependent and reversible",
     "why": "C — use-dependent structural change. A and D are not stated. B is too broad — hippocampus is linked to spatial navigation specifically.",
     "trap": "D says only specialist occupations show neuroplasticity — the passage later confirms all adults have plasticity."
    },
    {
     "n": 6,
     "type": "mc",
     "text": "According to the passage, what happens to retired London taxi drivers' hippocampi?",
     "opts": [
      "A. They continue to grow after retirement",
      "B. They remain the same size permanently",
      "C. They shrink back towards normal size",
      "D. They become damaged due to reduced activity"
     ],
     "ans": 2,
     "ev": "drivers who retired subsequently showed a reduction in hippocampal volume",
     "why": "C — reduction in volume = shrinking towards normal. B contradicts 'reversible'. A contradicts the reduction finding.",
     "trap": "B says 'remain the same' — the passage explicitly says volume REDUCED after retirement."
    },
    {
     "n": 7,
     "type": "tf",
     "text": "The passage states that neuroplasticity research findings transfer consistently to educational and therapeutic settings.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "the transfer of findings from controlled laboratory studies to real-world applications remains inconsistent and incompletely understood",
     "why": "FALSE — 'remains inconsistent and incompletely understood' directly contradicts 'consistently'.",
     "trap": "The passage discusses applications in the previous paragraph positively — but the final paragraph adds this cautionary note."
    },
    {
     "n": 8,
     "type": "inf",
     "text": "What does the author imply about the original scientific view that the adult brain is fixed?",
     "opts": [
      "A. It was based on deliberately falsified data",
      "B. It was a reasonable view given the evidence available at the time",
      "C. It was never widely accepted by the scientific community",
      "D. It has been proved wrong but still influences medical treatment"
     ],
     "ans": 1,
     "ev": "This view, though long accepted, has been comprehensively overturned",
     "why": "B is implied — 'long accepted' suggests it was a reasonable consensus, not fraud or fringe view. 'Comprehensively overturned' suggests it is now rejected in research.",
     "trap": "A introduces deliberate falsification — nothing in the passage suggests dishonesty. C contradicts 'long accepted'."
    },
    {
     "n": 9,
     "type": "mc",
     "text": "According to the passage, what is required for new neural pathways to form effectively?",
     "opts": [
      "A. Complete rest and sleep",
      "B. Pharmaceutical support",
      "C. Genetic modification",
      "D. Intensive and repeated practice"
     ],
     "ans": 3,
     "ev": "the formation of robust new neural pathways depends on sustained and frequent activation",
     "why": "D — sustained/frequent activation = intensive/repeated practice. A, B, C are not mentioned.",
     "trap": "A (rest) sounds logical for recovery but the passage specifically emphasises practice, not rest."
    },
    {
     "n": 10,
     "type": "p",
     "text": "Which sentence best expresses: 'the rapid and pervasive plasticity of early childhood is not fully recovered'?",
     "opts": [
      "A. Children cannot recover from brain injuries as well as adults can",
      "B. Adults do not retain the same extensive brain adaptability they had as young children",
      "C. Brain plasticity disappears completely when a person reaches adulthood",
      "D. Early childhood experiences determine all adult brain capacity"
     ],
     "ans": 1,
     "ev": "while adults retain meaningful plasticity throughout life, the rapid and pervasive plasticity of early childhood is not fully recovered",
     "why": "B paraphrases accurately: 'not fully recovered' = adults do not retain the same level. C overstates ('disappears completely'). D is not stated.",
     "trap": "C says plasticity 'disappears completely' — the passage says adults still retain 'meaningful plasticity', just less than childhood."
    },
    {
     "n": 11,
     "type": "tf",
     "text": "According to the passage, neurons that fire frequently become slower at transmitting signals.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "repeated activation of the same neural pathway strengthens it, making future activation faster and more efficient",
     "why": "FALSE — repeated activation makes pathways FASTER and more efficient. The passage says the opposite.",
     "trap": "The phrase 'neurons that fire together wire together' might suggest fatigue — but the passage explicitly says they become faster."
    },
    {
     "n": 12,
     "type": "inf",
     "text": "What does the passage imply about the practical use of neuroplasticity in stroke rehabilitation?",
     "opts": [
      "A. It is universally effective and always produces full recovery",
      "B. It offers genuine possibilities but requires significant effort and is not guaranteed",
      "C. It is only effective for young stroke patients",
      "D. It has been abandoned in favour of medication"
     ],
     "ans": 1,
     "ev": "Patients recovering from stroke can often relearn lost functions... This process requires intensive, repetitive practice",
     "why": "B — 'can often' (not always) + requires intensive practice = possible but not guaranteed, requiring effort. A overstates ('universally'). C and D are not stated.",
     "trap": "A says 'universally effective' — 'can often' in the passage is not the same as always."
    }
   ]
  }
 },
 {
  "id": 2,
  "title": "Artificial Light · Gig Economy · Microplastics",
  "focus": "Pronoun-chain ordering + sentence fill connector words",
  "s1": {
   "title": "How Artificial Light Is Disrupting Human Biology",
   "trapNote": "Paragraph D starts with 'This suppression' — the word 'suppression' must be introduced in the paragraph immediately before. Paragraph E starts with 'Despite this knowledge' — knowledge of what? Find the paragraph that explains the problem.",
   "paras": [
    {
     "l": "A",
     "pos": 1,
     "txt": "For most of human history, the only source of light available after dark was fire — dim, warm-toned, and producing minimal blue wavelengths. The human body evolved over millions of years in sync with this natural light cycle, using the presence or absence of light as its primary signal for regulating sleep and wakefulness.",
     "why": "Introduction — historical context, no pronoun references back. Sets up the natural baseline that everything else contrasts with."
    },
    {
     "l": "B",
     "pos": 4,
     "txt": "The consequences of chronic circadian disruption extend far beyond tiredness. Epidemiological studies have linked persistent shift work and irregular sleep patterns to elevated risks of obesity, type 2 diabetes, cardiovascular disease, and certain cancers. The mechanisms are complex, but they involve disrupted hormone cycles, impaired glucose regulation, and compromised immune surveillance.",
     "why": "Follows C (melatonin/circadian effects) and D (suppression meaning) — extends the health consequences further. 'The consequences' summarises what came before."
    },
    {
     "l": "C",
     "pos": 2,
     "txt": "The invention of electric lighting in the nineteenth century, and its subsequent proliferation through the twentieth, fundamentally dismantled this arrangement. Most significantly, the spread of LED technology and the widespread use of smartphones, tablets, and computer screens has saturated the modern environment with blue-spectrum light — precisely the wavelength most effective at suppressing melatonin, the hormone that signals to the body it is time to sleep.",
     "why": "Contrasts with A — 'dismantled this arrangement' means the arrangement described in A. Introduces the key mechanism (melatonin suppression) that D's 'this suppression' refers back to."
    },
    {
     "l": "D",
     "pos": 3,
     "txt": "This suppression delays the onset of sleep, reduces overall sleep duration, and disrupts what scientists call the circadian rhythm — the internal biological clock governing not only sleep but also hormone release, metabolism, body temperature, and many other physiological processes.",
     "why": "'This suppression' refers directly to the melatonin suppression introduced in C. Explains the consequences of suppression. Must come after C."
    },
    {
     "l": "E",
     "pos": 5,
     "txt": "Despite this knowledge, comprehensive policy responses have been limited. Some cities have experimented with amber-toned LED street lighting, which emits less blue light. A number of health organisations have issued guidance recommending screen-free periods before bed. However, in the absence of coordinated regulatory action, the responsibility for managing artificial light exposure falls primarily on individuals.",
     "why": "'Despite this knowledge' = despite knowing all the health consequences described in B. Conclusion — acknowledges the gap between evidence and policy response."
    }
   ],
   "qs": [
    {
     "n": 1,
     "type": "mc",
     "text": "According to the passage, why is blue-spectrum light particularly problematic?",
     "opts": [
      "A. It makes screens difficult to read",
      "B. It is most effective at suppressing melatonin",
      "C. It increases body temperature during the night",
      "D. It is produced only by LED technology"
     ],
     "ans": 1,
     "ev": "blue-spectrum light — precisely the wavelength most effective at suppressing melatonin",
     "why": "B — most effective at suppressing melatonin. D is wrong — smartphones also emit it. A and C are not stated.",
     "trap": "D says 'only by LED' — the passage says LED and smartphones and tablets. LED is not the only source."
    },
    {
     "n": 2,
     "type": "tf",
     "text": "According to the passage, circadian rhythms govern only the sleep-wake cycle.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "the circadian rhythm — governing not only sleep but also hormone release, metabolism, body temperature, and many other physiological processes",
     "why": "FALSE — 'not only sleep but also' lists many other processes. The statement is directly contradicted.",
     "trap": "The passage defines circadian rhythms in the context of sleep — but explicitly extends them beyond sleep using 'not only'."
    },
    {
     "n": 3,
     "type": "mc",
     "text": "What do epidemiological studies show about chronic circadian disruption?",
     "opts": [
      "A. It primarily affects mental health rather than physical health",
      "B. It is only dangerous for shift workers over forty",
      "C. It is linked to multiple serious health conditions",
      "D. It causes immediate and obvious symptoms"
     ],
     "ans": 2,
     "ev": "linked persistent shift work and irregular sleep patterns to elevated risks of obesity, type 2 diabetes, cardiovascular disease, and certain cancers",
     "why": "C — multiple serious conditions listed. A says only mental health — the conditions listed are all physical. D says 'immediate' — the passage discusses chronic (long-term) effects.",
     "trap": "A says 'primarily mental health' — not one of the listed conditions (obesity, diabetes, cardiovascular, cancer) is mental health."
    },
    {
     "n": 4,
     "type": "mc",
     "text": "According to the passage, what happens to individual responsibility for artificial light exposure under current policy?",
     "opts": [
      "A. It has been removed by new legislation",
      "B. It falls primarily on individuals due to limited regulation",
      "C. It is shared equally between employers and employees",
      "D. It is managed by health organisations directly"
     ],
     "ans": 1,
     "ev": "in the absence of coordinated regulatory action, the responsibility falls primarily on individuals",
     "why": "B — directly stated. A contradicts 'limited responses'. C and D are not stated.",
     "trap": "D says health organisations manage it directly — but the passage says they issue guidance, not that they manage exposure."
    }
   ]
  },
  "s2": {
   "title": "The Gig Economy: Flexibility or Insecurity?",
   "trapNote": "Gap 2 must follow 'a perk available to a privileged minority became, briefly, a near-universal experience' — your sentence must continue from 'briefly'. Gap 5 starts the paragraph about drawbacks — the sentence before ends the benefits paragraph. Gap 6: 'He believes' means gap 6 introduced a male expert.",
   "textHtml": "<p>The gig economy — a labour market characterised by short-term contracts and freelance work rather than permanent employment — has expanded dramatically in recent years. Platforms such as Uber, Deliveroo, and Upwork have transformed how millions of people work, offering flexibility that traditional employment cannot match. <span class=\"gap-marker\">(1)</span></p><p>The growth of the gig economy reflects deeper changes in how people think about work. For many workers, particularly younger generations, the appeal of choosing their own hours and working for multiple clients simultaneously outweighs the security of a permanent contract. <span class=\"gap-marker\">(2)</span> Studies suggest that gig workers report higher levels of autonomy and job satisfaction than many in traditional roles.</p><p>However, critics argue that this flexibility often comes at a serious cost. <span class=\"gap-marker\">(3)</span> Unlike employees, independent contractors are typically excluded from legal protections including minimum wage guarantees, paid sick leave, pension contributions, and protection from unfair dismissal. The financial insecurity this creates can be severe, particularly during periods of illness or economic downturn.</p><p>Courts in several countries have begun to challenge the legal classification of gig workers as independent contractors. <span class=\"gap-marker\">(4)</span> These rulings represent a significant shift, though debate continues about what comprehensive worker protection in the gig economy should look like.</p><p><span class=\"gap-marker\">(5)</span> He believes that the future of work lies not in choosing between flexibility and security, but in designing new regulatory frameworks that deliver both simultaneously.</p><p>The challenge for governments is considerable. <span class=\"gap-marker\">(6)</span> Whatever regulatory approach is adopted, the pace of platform innovation means that legislation will constantly need to adapt to new models of work that did not exist when existing laws were written.</p>",
   "options": [
    {
     "l": "A",
     "txt": "In the UK, for example, a Supreme Court ruling determined that Uber drivers are entitled to minimum wage and holiday pay."
    },
    {
     "l": "B",
     "txt": "Professor James Chen, an economist specialising in labour markets, argues that the current system is fundamentally unsustainable."
    },
    {
     "l": "C",
     "txt": "Gig workers are typically classified as independent contractors rather than employees, a distinction with major legal consequences."
    },
    {
     "l": "D",
     "txt": "Existing employment law was designed for a world in which workers had one employer and worked fixed hours in a fixed location."
    },
    {
     "l": "E",
     "txt": "For these workers, the traditional nine-to-five model feels unnecessarily restrictive."
    },
    {
     "l": "F",
     "txt": "This is because the very qualities that make gig work attractive — independence and flexibility — are precisely what remove workers from the scope of employee protection legislation."
    },
    {
     "l": "G",
     "txt": "This number includes not only drivers and delivery workers but also freelance designers, writers, and consultants."
    },
    {
     "l": "H",
     "txt": "It also raises fundamental questions about who bears the cost when workers fall ill, reach retirement, or need parental leave."
    }
   ],
   "qs": [
    {
     "n": 1,
     "ans": "G",
     "why": "Gap 1: After mentioning Uber, Deliveroo, Upwork and 'millions of people'. G provides the supporting detail about who those millions are — 'drivers, delivery workers, designers, writers, consultants'. 'This number' refers back to 'millions'."
    },
    {
     "n": 2,
     "ans": "E",
     "why": "Gap 2: Follows younger generations preferring flexibility. E says 'the nine-to-five model feels unnecessarily restrictive' — explains WHY younger workers prefer flexibility. The sentence after then gives statistics supporting this."
    },
    {
     "n": 3,
     "ans": "C",
     "why": "Gap 3: Starts the paragraph about costs/problems. 'However, critics argue flexibility comes at a serious cost' — gap 3 must name that cost. C names the classification as independent contractors and its 'major legal consequences' — which the rest of the paragraph then explains."
    },
    {
     "n": 4,
     "ans": "A",
     "why": "Gap 4: Courts challenging independent contractor classification. A gives the specific UK example (Uber Supreme Court ruling). 'These rulings' in the next sentence refers back to A's ruling — confirming it."
    },
    {
     "n": 5,
     "ans": "B",
     "why": "Gap 5: The sentence after says 'He believes' — so gap 5 must introduce a named male expert. B introduces 'Professor James Chen'. The word 'He' in the next sentence then refers to Chen."
    },
    {
     "n": 6,
     "ans": "D",
     "why": "Gap 6: After 'The challenge for governments is considerable'. D explains WHY: existing law was designed for a different employment model. H is also plausible but H asks questions — D explains the structural problem, which fits 'challenge is considerable' better."
    },
    {
     "n": 7,
     "ans": "F",
     "why": "F is the unused option. F explains why gig workers lose protections — it would fit after gap 3 option C, but C already handles this. F repeats the explanation already made in the main text."
    },
    {
     "n": 8,
     "ans": "H",
     "why": "Gap 7 (marked as 8 in our count): Actually H fits after gap 4 better than gap 6. H raises questions about 'who bears the cost when workers fall ill' — extending A's ruling to broader implications."
    }
   ]
  },
  "s3": {
   "title": "Microplastics: The Invisible Contaminant",
   "passHtml": "<p>Microplastics — defined as plastic fragments smaller than five millimetres in any dimension — have become one of the most pervasive environmental contaminants on the planet. Since the term was first coined by marine biologist Richard Thompson in 2004, research has documented their presence in virtually every ecosystem studied: deep ocean trenches, Arctic ice cores, mountain streams, urban soils, and the human body itself.</p><p>The routes by which microplastics enter the environment are numerous. Primary microplastics are manufactured at microscopic scale for specific purposes — microbeads in cosmetics, plastic pellets used in industrial manufacturing — and are released directly into waterways during use or processing. Secondary microplastics arise from the breakdown of larger plastic items through physical weathering, ultraviolet radiation, and biological activity. A single polyester garment can release up to seven hundred thousand synthetic fibres during a single washing machine cycle, contributing substantially to the burden of microplastic contamination in domestic wastewater.</p><p>Once in aquatic environments, microplastics are <strong>ingested</strong> by organisms at every level of the food web, from microscopic zooplankton to large marine mammals. Their persistence — plastics do not biodegrade but continue fragmenting into progressively smaller particles — means that concentrations accumulate up the food chain in a process known as <strong>bioaccumulation</strong>. Species that consume large quantities of prey are therefore exposed to particularly high concentrations.</p><p>The health implications of microplastic exposure for humans remain an area of active and <strong>contested</strong> scientific inquiry. Microplastic particles have been detected in human blood, lung tissue, and placental samples. Some laboratory studies have identified potential mechanisms for cellular damage, endocrine disruption, and inflammatory response. However, establishing definitive causal links between microplastic exposure and specific health outcomes in humans has proved methodologically challenging, given the difficulty of conducting controlled exposure studies over sufficient time periods.</p><p>Policy responses have been <strong>fragmented</strong>. Several countries have banned microbeads in cosmetics — a measure considered achievable because it targets a defined and substitutable product category. Addressing the far larger problem of secondary microplastics from fragmentation of existing plastic waste is considerably more complex. International negotiations toward a legally binding global plastics treaty have advanced, though the pace of progress falls significantly short of what many scientists and environmental organisations consider necessary given the scale and urgency of the problem.</p>",
   "qs": [
    {
     "n": 1,
     "type": "v",
     "text": "The word 'ingested' in the third paragraph is closest in meaning to:",
     "opts": [
      "A. Rejected by the body",
      "B. Swallowed or consumed",
      "C. Produced internally",
      "D. Discovered by scientists"
     ],
     "ans": 1,
     "ev": "microplastics are ingested by organisms at every level of the food web",
     "why": "Ingested = swallowed/consumed. B is correct. Context confirms: organisms at every food web level consuming microplastics.",
     "trap": "C says 'produced internally' — ingest means to take in from outside, not to produce."
    },
    {
     "n": 2,
     "type": "v",
     "text": "The word 'bioaccumulation' in the third paragraph is closest in meaning to:",
     "opts": [
      "A. The breakdown of chemicals by living organisms",
      "B. The build-up of substances through the food chain",
      "C. The natural recycling of biological waste",
      "D. The spread of organisms across ecosystems"
     ],
     "ans": 1,
     "ev": "concentrations accumulate up the food chain in a process known as bioaccumulation",
     "why": "Bioaccumulation = build-up through the food chain. B is the correct definition. A describes biodegradation — the opposite.",
     "trap": "A describes breaking DOWN — bioaccumulation is building UP. These are opposite processes."
    },
    {
     "n": 3,
     "type": "v",
     "text": "The word 'contested' in the fourth paragraph is closest in meaning to:",
     "opts": [
      "A. Well-established and proven",
      "B. Recently discovered",
      "C. Debated and disputed",
      "D. Conducted by governments only"
     ],
     "ans": 2,
     "ev": "an area of active and contested scientific inquiry",
     "why": "Contested = debated/disputed. C is correct. The context confirms uncertainty: 'establishing definitive causal links has proved challenging'.",
     "trap": "A is the opposite — 'well-established' contradicts 'contested'."
    },
    {
     "n": 4,
     "type": "v",
     "text": "The word 'fragmented' in the fifth paragraph is closest in meaning to:",
     "opts": [
      "A. Comprehensive and coordinated",
      "B. Broken into separate disconnected parts",
      "C. Deliberately delayed",
      "D. Focused on developing countries only"
     ],
     "ans": 1,
     "ev": "Policy responses have been fragmented",
     "why": "Fragmented = broken into separate parts, inconsistent. B is correct. The context confirms: some countries ban microbeads but larger issues are 'considerably more complex'.",
     "trap": "A is the direct opposite — 'comprehensive and coordinated' is exactly what fragmented means it is NOT."
    },
    {
     "n": 5,
     "type": "mc",
     "text": "According to the passage, who coined the term 'microplastics'?",
     "opts": [
      "A. An environmental policy organisation",
      "B. A chemical engineer in 2001",
      "C. Marine biologist Richard Thompson in 2004",
      "D. A team of researchers at the United Nations"
     ],
     "ans": 2,
     "ev": "the term was first coined by marine biologist Richard Thompson in 2004",
     "why": "C — directly stated. The other options contain invented details.",
     "trap": "The passage specifies both the person (Thompson) and the year (2004). Any option with different details is wrong."
    },
    {
     "n": 6,
     "type": "mc",
     "text": "According to the passage, what is a primary microplastic?",
     "opts": [
      "A. A particle formed from breaking down larger plastic items",
      "B. The most dangerous type of microplastic",
      "C. A microplastic manufactured at microscopic scale for a specific purpose",
      "D. Microplastics found only in the ocean"
     ],
     "ans": 2,
     "ev": "Primary microplastics are manufactured at microscopic scale for specific purposes",
     "why": "C — directly stated. A describes secondary microplastics. B and D are not in the passage.",
     "trap": "A describes SECONDARY microplastics. The passage explicitly distinguishes primary (manufactured small) from secondary (broken down from larger)."
    },
    {
     "n": 7,
     "type": "tf",
     "text": "According to the passage, the health effects of microplastics in humans have been definitively established.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "establishing definitive causal links between microplastic exposure and specific health outcomes in humans has proved methodologically challenging",
     "why": "FALSE — 'proved methodologically challenging' means NOT definitively established.",
     "trap": "The passage says microplastics have been DETECTED in human tissue — but detection is not the same as proven health harm."
    },
    {
     "n": 8,
     "type": "inf",
     "text": "What does the author imply about the ban on microbeads in cosmetics?",
     "opts": [
      "A. It is sufficient to solve the microplastic problem",
      "B. It addresses a small and manageable part of the problem",
      "C. It has been rejected by most countries",
      "D. It targets the main source of microplastic pollution"
     ],
     "ans": 1,
     "ev": "a measure considered achievable because it targets a defined and substitutable product category. Addressing the far larger problem of secondary microplastics is considerably more complex",
     "why": "B is implied — the ban targets something 'achievable' but 'far larger problems' remain. A contradicts 'far larger problem'. C contradicts countries having already banned them.",
     "trap": "A says 'sufficient' — the passage immediately contrasts the ban with the 'far larger problem' of secondary microplastics."
    },
    {
     "n": 9,
     "type": "mc",
     "text": "What happens to microplastics in an ecosystem according to the passage?",
     "opts": [
      "A. They break down into harmless chemicals within months",
      "B. They are filtered out by large marine animals",
      "C. They continue to fragment into smaller particles and accumulate up the food chain",
      "D. They are absorbed by plant life and neutralised"
     ],
     "ans": 2,
     "ev": "plastics do not biodegrade but continue fragmenting into progressively smaller particles... concentrations accumulate up the food chain",
     "why": "C — both processes stated: continued fragmentation AND bioaccumulation. A contradicts 'do not biodegrade'. B and D are not stated.",
     "trap": "A says 'break down into harmless chemicals' — the passage says they fragment into SMALLER PARTICLES, not harmless chemicals."
    },
    {
     "n": 10,
     "type": "p",
     "text": "Which sentence best expresses: 'plastics do not biodegrade but continue fragmenting into progressively smaller particles'?",
     "opts": [
      "A. Plastic pollution has no long-term impact on aquatic environments",
      "B. Plastics eventually disappear through natural environmental processes",
      "C. Rather than decomposing, plastics break into increasingly tiny pieces that persist indefinitely",
      "D. Plastic particles are removed from water by biological organisms"
     ],
     "ans": 2,
     "ev": "plastics do not biodegrade but continue fragmenting into progressively smaller particles",
     "why": "C paraphrases all parts: 'do not biodegrade' = rather than decomposing, 'continue fragmenting' = break into tiny pieces, 'progressively smaller' = increasingly tiny. B directly contradicts the passage.",
     "trap": "B says plastics 'eventually disappear' — the passage explicitly says they do NOT biodegrade."
    },
    {
     "n": 11,
     "type": "mc",
     "text": "According to the passage, why are species high on the food chain particularly affected by microplastics?",
     "opts": [
      "A. They live in areas with higher concentrations of plastic waste",
      "B. They consume large quantities of prey, accumulating the plastics ingested by those prey",
      "C. They have smaller body mass making them more vulnerable",
      "D. They cannot digest plastic at all"
     ],
     "ans": 1,
     "ev": "Species that consume large quantities of prey are therefore exposed to particularly high concentrations",
     "why": "B — consuming prey = accumulating the plastics in that prey. This is bioaccumulation. A is not stated. C and D are not supported.",
     "trap": "D says they 'cannot digest plastic at all' — the passage does not make this claim about any species."
    },
    {
     "n": 12,
     "type": "tf",
     "text": "The passage states that all countries have now agreed to a legally binding global plastics treaty.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "International negotiations toward a legally binding global plastics treaty have advanced, though the pace of progress falls significantly short",
     "why": "FALSE — negotiations are ongoing but 'progress falls significantly short'. No treaty has been finalised.",
     "trap": "'Negotiations have advanced' sounds positive — but 'falls significantly short' means no treaty exists yet."
    }
   ]
  }
 },
 {
  "id": 3,
  "title": "Antibiotic Resistance · Social Media · Sleep",
  "focus": "Step-by-step ordering + similar option vocabulary",
  "s1": {
   "title": "How Antibiotic Resistance Develops",
   "trapNote": "This passage describes a PROCESS — the steps happen in a specific causal order. Paragraph B contains 'As a result' — this requires a cause in the immediately preceding paragraph. Paragraph D contains 'If this happens' — referring to something in C.",
   "paras": [
    {
     "l": "A",
     "pos": 1,
     "txt": "Bacteria reproduce extraordinarily quickly — under optimal conditions, a single bacterium can divide into two every twenty minutes, producing millions of descendants within hours. This rapid reproduction means that any genetic mutation conferring a survival advantage can spread through an entire bacterial population in a very short time.",
     "why": "Introduction — explains the biological mechanism that makes resistance possible. No backward references. Sets up the speed that makes everything else happen."
    },
    {
     "l": "B",
     "pos": 3,
     "txt": "As a result, bacteria possessing this resistance gene survive and reproduce, while susceptible bacteria are killed. Over successive generations, the resistant strain comes to dominate the population. What began as a rare random mutation has now become the defining characteristic of the bacterial community.",
     "why": "'As a result' connects to C's exposure to antibiotics killing susceptible bacteria. Describes the outcome of selection. Must follow C."
    },
    {
     "l": "C",
     "pos": 2,
     "txt": "When a patient takes a course of antibiotics, the drug kills the vast majority of the infecting bacteria. However, if any individual bacterium carries a mutation that reduces the drug's effectiveness, it has a significant survival advantage over its neighbours.",
     "why": "Introduces the antibiotic exposure scenario — the trigger for selection. 'If any bacterium carries a mutation' sets up B's 'As a result, bacteria possessing this resistance gene survive'."
    },
    {
     "l": "D",
     "pos": 4,
     "txt": "If this happens repeatedly — if patients take antibiotics unnecessarily, stop courses early, or if bacteria transfer resistance genes between each other — the resistant strains can establish themselves as the dominant form both within individuals and across communities.",
     "why": "'If this happens' = if resistance develops as described in B. Extends from individual to community level. Introduces the human behaviours that accelerate the process."
    },
    {
     "l": "E",
     "pos": 5,
     "txt": "The implications are profound. Infections that were once easily treatable with standard antibiotics can become difficult or impossible to cure. The World Health Organisation has classified antimicrobial resistance as one of the greatest threats to global health, estimating that drug-resistant infections already cause over seven hundred thousand deaths per year worldwide.",
     "why": "Conclusion — describes the real-world consequences and global scale. 'The implications are profound' summarises everything that came before."
    }
   ],
   "qs": [
    {
     "n": 1,
     "type": "mc",
     "text": "According to the passage, what makes bacterial resistance able to spread so quickly?",
     "opts": [
      "A. Bacteria can survive without oxygen",
      "B. Bacteria reproduce rapidly, spreading any advantageous mutation quickly",
      "C. Antibiotics make bacteria mutate intentionally",
      "D. Resistance genes are carried by viruses"
     ],
     "ans": 1,
     "ev": "This rapid reproduction means that any genetic mutation conferring a survival advantage can spread through an entire bacterial population in a very short time",
     "why": "B — directly stated. C is wrong — mutations are random, not intentional. D is not mentioned.",
     "trap": "C implies bacteria actively mutate in response to antibiotics — the passage says mutations are random and pre-existing."
    },
    {
     "n": 2,
     "type": "tf",
     "text": "According to the passage, antibiotics kill all bacteria in an infection without exception.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "if any individual bacterium carries a mutation that reduces the drug's effectiveness, it has a significant survival advantage",
     "why": "FALSE — the passage explicitly says that bacteria with resistance mutations SURVIVE. Not all bacteria are killed.",
     "trap": "The passage says the drug 'kills the vast majority' — not all. This is the key detail."
    },
    {
     "n": 3,
     "type": "mc",
     "text": "According to the passage, which human behaviour contributes to the spread of resistance?",
     "opts": [
      "A. Using hand sanitiser too frequently",
      "B. Stopping antibiotic courses early",
      "C. Eating processed foods",
      "D. Avoiding vaccination"
     ],
     "ans": 1,
     "ev": "if patients take antibiotics unnecessarily, stop courses early, or if bacteria transfer resistance genes",
     "why": "B — directly stated as one of the listed behaviours. A, C, D are not mentioned.",
     "trap": "A sounds health-related and plausible — but hand sanitiser is never mentioned in this passage."
    },
    {
     "n": 4,
     "type": "mc",
     "text": "How many deaths per year does the WHO estimate drug-resistant infections currently cause?",
     "opts": [
      "A. Over seventy thousand",
      "B. Over seven million",
      "C. Over seven hundred thousand",
      "D. Over seven billion"
     ],
     "ans": 2,
     "ev": "drug-resistant infections already cause over seven hundred thousand deaths per year worldwide",
     "why": "C — seven hundred thousand. Seven million (B) and seven billion (D) are number traps.",
     "trap": "All options start with 'seven' — only the scale word (thousand/million/billion) differs. Listen/read carefully to that word."
    }
   ]
  },
  "s2": {
   "title": "Social Media and Adolescent Mental Health",
   "trapNote": "Gap 1: The text before discusses the growth of social media use. Gap 1 must introduce the mental health debate. Gap 3: 'This correlation' in the sentence after must refer to a correlation mentioned in gap 3. Gap 5: 'Nevertheless' means gap 5 contrasts with the preceding content.",
   "textHtml": "<p>The relationship between social media use and adolescent mental health has become one of the most debated topics in contemporary psychology. Platforms such as Instagram, TikTok, and Snapchat have become central to the social lives of teenagers worldwide. <span class=\"gap-marker\">(1)</span></p><p>Studies examining this association have generally found a correlation between heavy social media use and increased rates of anxiety, depression, and loneliness, particularly among girls. <span class=\"gap-marker\">(2)</span> Researchers point to mechanisms including social comparison, cyberbullying, sleep disruption caused by late-night screen use, and the replacement of face-to-face interaction with less emotionally satisfying digital contact.</p><p><span class=\"gap-marker\">(3)</span> This correlation does not prove causation. It is equally plausible that young people who are already struggling with mental health difficulties turn to social media for distraction or connection, rather than that social media causes their difficulties. Distinguishing between these two causal directions has been a central methodological challenge for researchers in this field.</p><p>Some researchers have argued that the effects of social media are not uniformly negative. <span class=\"gap-marker\">(4)</span> For LGBTQ+ young people, online communities can provide a sense of belonging and access to supportive peers that may be difficult to find locally. Passive scrolling, studies suggest, is more harmful than active participation in online communities.</p><p><span class=\"gap-marker\">(5)</span> Several countries have introduced or proposed age verification requirements for social media platforms, or restrictions on features such as infinite scroll and algorithmic content recommendation. The UK's Online Safety Act and Australia's social media age ban of sixteen represent early steps in this direction, though their effectiveness remains to be evaluated.</p>",
   "options": [
    {
     "l": "A",
     "txt": "However, the picture is considerably more complex than headlines about a social media mental health crisis might suggest."
    },
    {
     "l": "B",
     "txt": "It is important to note, however, that most studies in this area rely on self-reported data, which may not accurately capture actual usage patterns or wellbeing."
    },
    {
     "l": "C",
     "txt": "Policymakers have responded to public concern with a range of regulatory interventions aimed at protecting young users."
    },
    {
     "l": "D",
     "txt": "Nevertheless, the weight of evidence has convinced many governments and health organisations that protective action is warranted even in the absence of definitive causal proof."
    },
    {
     "l": "E",
     "txt": "The question of whether this use is harming young people's mental health has prompted urgent debate among scientists, parents, and policymakers."
    },
    {
     "l": "F",
     "txt": "For some young people, social media offers genuine benefits including creative expression, community, and access to mental health information."
    },
    {
     "l": "G",
     "txt": "A major longitudinal study tracking ten thousand young people over five years found only a small association between social media use and wellbeing outcomes."
    },
    {
     "l": "H",
     "txt": "These platforms are designed by engineers whose primary goal is maximising time on site, not the wellbeing of their youngest users."
    }
   ],
   "qs": [
    {
     "n": 1,
     "ans": "E",
     "why": "Gap 1: Follows the introduction of platforms (Instagram/TikTok). E asks whether use 'is harming young people's mental health' — introducing the debate that the whole passage addresses. The word 'debate' connects perfectly to 'most debated topics'."
    },
    {
     "n": 2,
     "ans": "B",
     "why": "Gap 2: After 'studies generally found a correlation'. B notes that 'most studies rely on self-reported data' — a methodological caveat. 'Researchers point to mechanisms' in the next sentence continues examining the evidence."
    },
    {
     "n": 3,
     "ans": "A",
     "why": "Gap 3: The sentence after says 'This correlation does not prove causation' — so gap 3 must acknowledge complexity. A says 'the picture is considerably more complex' — setting up the causation question. 'However' in A contrasts with the correlation evidence."
    },
    {
     "n": 4,
     "ans": "F",
     "why": "Gap 4: Follows 'effects are not uniformly negative'. F states 'social media offers genuine benefits' — the positive side. The next sentence gives specific LGBTQ+ example supporting this."
    },
    {
     "n": 5,
     "ans": "D",
     "why": "Gap 5: 'Nevertheless' = despite causation not being proven. D says 'many governments are convinced that protective action is warranted even without definitive causal proof' — the 'nevertheless' connects directly. Then the next sentence describes the specific policies."
    },
    {
     "n": 6,
     "ans": "C",
     "why": "Gap 5 (second reading): Actually C fits paragraph 5 better. C says 'Policymakers have responded with regulatory interventions' — which introduces the UK Online Safety Act and Australia ban mentioned next. D fits within the paragraph before."
    },
    {
     "n": 7,
     "ans": "G",
     "why": "G is the unused option. G could fit after gap 2 but B is a better fit there. G introduces a specific study — but the passage is about general patterns, not one specific study at this point."
    },
    {
     "n": 8,
     "ans": "H",
     "why": "H could replace E in gap 1 — both introduce a critical angle. But H focuses on platform design, while E focuses on the mental health debate question, which the passage then systematically addresses."
    }
   ]
  },
  "s3": {
   "title": "The Science and Consequences of Sleep Deprivation",
   "passHtml": "<p>Sleep is not a passive state of physiological rest but an active process of neural maintenance, memory <strong>consolidation</strong>, and metabolic regulation that is as essential to human health as nutrition and exercise. Despite this, chronic sleep deprivation has become a defining feature of modern life in industrialised societies, with surveys across multiple countries consistently finding that significant proportions of adults regularly sleep fewer hours than health guidelines recommend.</p><p>The consequences of insufficient sleep manifest across multiple physiological systems. In the short term, even a single night of poor sleep produces measurable <strong>impairment</strong> in cognitive performance — including reduced attention, slowed reaction time, and compromised decision-making — comparable in some studies to the effects of mild alcohol intoxication. Over the longer term, chronic sleep deprivation is associated with substantially elevated risks of obesity, type 2 diabetes, cardiovascular disease, and immunological vulnerability. The mechanisms connecting sleep loss to these outcomes are numerous and interacting, involving dysregulation of appetite-controlling hormones, elevated inflammatory markers, and disruption of glucose metabolism.</p><p>The relationship between sleep and mental health is particularly close. Sleep disturbance is both a symptom and a cause of depression and anxiety — a bidirectional relationship that can create self-reinforcing cycles in which poor mental health disrupts sleep, which further worsens mental health. Emerging research suggests that the brain's glymphatic system, which clears metabolic waste products including proteins associated with neurodegenerative disease, operates primarily during deep sleep, suggesting a potential link between chronic sleep deprivation and conditions such as Alzheimer's disease.</p><p>Modern life presents multiple <strong>structural</strong> obstacles to adequate sleep. Artificial light, particularly the blue-spectrum light emitted by digital screens, suppresses melatonin production and delays sleep onset. Shift work, which affects around twenty percent of the workforce in industrialised countries, requires workers to sleep at times misaligned with natural circadian rhythms. Social norms in many professional environments implicitly valorise sleep sacrifice as a marker of commitment and productivity.</p><p>The <strong>optimal</strong> duration of sleep for adults, according to consensus guidelines from major sleep medicine organisations, is between seven and nine hours per night. However, individual variation is real: a small proportion of people — genetic research suggests around three percent — carry variants that allow them to function adequately on fewer hours without measurable health consequences. For the vast majority, however, the belief that one can adapt to chronic short sleep without penalty is not supported by the physiological evidence.</p>",
   "qs": [
    {
     "n": 1,
     "type": "v",
     "text": "The word 'consolidation' in the first paragraph is closest in meaning to:",
     "opts": [
      "A. Destruction of neural connections",
      "B. Strengthening and organising stored information",
      "C. Transfer of memories to another person",
      "D. The natural forgetting of unnecessary information"
     ],
     "ans": 1,
     "ev": "memory consolidation",
     "why": "Consolidation = strengthening and organising stored information. B is correct. D is a plausible but incorrect interpretation — consolidation strengthens memories, not erases them.",
     "trap": "D sounds like a logical brain function (forgetting) but consolidation specifically means strengthening and organising, not removing."
    },
    {
     "n": 2,
     "type": "v",
     "text": "The word 'impairment' in the second paragraph is closest in meaning to:",
     "opts": [
      "A. Improvement",
      "B. Measurement",
      "C. Reduction in ability or function",
      "D. Complete elimination of a skill"
     ],
     "ans": 2,
     "ev": "measurable impairment in cognitive performance — including reduced attention, slowed reaction time",
     "why": "Impairment = reduction in ability. C is correct. A is the opposite. D is too extreme — impairment reduces function but does not eliminate it completely.",
     "trap": "A (improvement) is the direct opposite. D overstates — impairment means reduced, not eliminated."
    },
    {
     "n": 3,
     "type": "v",
     "text": "The word 'structural' in the fourth paragraph is closest in meaning to:",
     "opts": [
      "A. Physical and building-related",
      "B. Related to personal habits",
      "C. Built into the systems and organisation of modern life",
      "D. Temporary and easily changed"
     ],
     "ans": 2,
     "ev": "Modern life presents multiple structural obstacles to adequate sleep",
     "why": "Structural = built into the system/organisation. C is correct. A is the literal meaning but here it is metaphorical. D contradicts structural (which implies deep, hard to change).",
     "trap": "A is the literal meaning of structural (relating to physical structures) — but here it means systemic, built into how society is organised."
    },
    {
     "n": 4,
     "type": "v",
     "text": "The word 'optimal' in the fifth paragraph is closest in meaning to:",
     "opts": [
      "A. Average or typical",
      "B. Legally required",
      "C. Best or most effective",
      "D. Minimum acceptable"
     ],
     "ans": 2,
     "ev": "The optimal duration of sleep for adults is between seven and nine hours",
     "why": "Optimal = best/most effective. C is correct. A (average) is not the same — optimal is the ideal, which may differ from average.",
     "trap": "D (minimum) — optimal means the BEST amount, not the lowest acceptable amount. These are different."
    },
    {
     "n": 5,
     "type": "mc",
     "text": "According to the passage, how does poor sleep compare to mild alcohol intoxication?",
     "opts": [
      "A. Poor sleep is considerably less harmful than mild intoxication",
      "B. One night of poor sleep can produce similar cognitive impairment",
      "C. Alcohol and poor sleep have completely different effects on the brain",
      "D. Poor sleep affects only physical performance while alcohol affects thinking"
     ],
     "ans": 1,
     "ev": "comparable in some studies to the effects of mild alcohol intoxication",
     "why": "B — directly stated. A says 'considerably less harmful' — the passage says 'comparable', meaning similar not less. D splits effects artificially.",
     "trap": "A reverses the comparison — 'comparable' means similar in impact, not less harmful."
    },
    {
     "n": 6,
     "type": "tf",
     "text": "According to the passage, poor sleep always causes depression and anxiety.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "Sleep disturbance is both a symptom and a cause of depression and anxiety",
     "why": "FALSE — 'both a symptom AND a cause'. This means sometimes depression causes poor sleep; sometimes poor sleep causes depression. Not always one direction.",
     "trap": "'A cause' sounds like it always causes depression — but the passage presents a bidirectional relationship, not a one-way cause."
    },
    {
     "n": 7,
     "type": "mc",
     "text": "According to the passage, what does the brain's glymphatic system primarily do?",
     "opts": [
      "A. It controls the sleep-wake cycle",
      "B. It produces melatonin during darkness",
      "C. It clears metabolic waste products including proteins linked to neurodegeneration",
      "D. It regulates glucose metabolism during sleep"
     ],
     "ans": 2,
     "ev": "the brain's glymphatic system, which clears metabolic waste products including proteins associated with neurodegenerative disease, operates primarily during deep sleep",
     "why": "C — directly stated. A and B are other brain systems not mentioned here. D is glucose metabolism which is mentioned elsewhere in the passage.",
     "trap": "D mentions glucose metabolism — also discussed in the passage but as a different mechanism. The glymphatic system specifically clears waste products."
    },
    {
     "n": 8,
     "type": "inf",
     "text": "What does the author imply about shift workers?",
     "opts": [
      "A. They choose to work at night and therefore accept the health consequences",
      "B. They face structural challenges to healthy sleep that are not their personal fault",
      "C. They are a small minority not significantly affected by sleep research",
      "D. They sleep more hours overall than day workers to compensate"
     ],
     "ans": 1,
     "ev": "Shift work, which affects around twenty percent of the workforce... requires workers to sleep at times misaligned with natural circadian rhythms",
     "why": "B is implied — shift work is listed as a 'structural obstacle' meaning it is system-level, not personal choice. A implies blame — the passage presents it neutrally as a systemic issue.",
     "trap": "A implies personal choice — but the passage lists shift work as a 'structural obstacle', something imposed by employment requirements."
    },
    {
     "n": 9,
     "type": "mc",
     "text": "What percentage of adults does genetic research suggest can function adequately on fewer than seven hours sleep?",
     "opts": [
      "A. Around ten percent",
      "B. Around twenty percent",
      "C. Around three percent",
      "D. Around fifty percent"
     ],
     "ans": 2,
     "ev": "genetic research suggests around three percent carry variants that allow them to function adequately on fewer hours",
     "why": "C — three percent directly stated. Twenty percent (B) is the shift worker figure — a number trap.",
     "trap": "Twenty percent appears in the same paragraph — for shift workers. Three percent is for the genetic sleep variant. Do not mix them."
    },
    {
     "n": 10,
     "type": "p",
     "text": "Which sentence best expresses: 'the belief that one can adapt to chronic short sleep without penalty is not supported by physiological evidence'?",
     "opts": [
      "A. Some people can train themselves to sleep less without any health effects",
      "B. Science does not support the idea that sleeping few hours regularly is harmless",
      "C. Penalties exist for people who sleep less than seven hours",
      "D. Physiologists are still uncertain about how much sleep humans need"
     ],
     "ans": 1,
     "ev": "the belief that one can adapt to chronic short sleep without penalty is not supported by the physiological evidence",
     "why": "B paraphrases precisely: 'not supported' = science does not support, 'adapt without penalty' = harmless. A says 'some people can' — the passage says even those who believe they adapt still suffer consequences.",
     "trap": "A sounds like it relates to the 3% genetic variant — but the passage says the MAJORITY who believe they can adapt are wrong."
    },
    {
     "n": 11,
     "type": "tf",
     "text": "The passage states that blue-spectrum light from screens prevents melatonin from being produced entirely.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "suppresses melatonin production and delays sleep onset",
     "why": "FALSE — 'suppresses' means reduces/inhibits, not eliminates entirely. 'Delays sleep onset' also suggests sleep eventually comes, not that it is prevented permanently.",
     "trap": "Suppresses does not mean stops completely. The passage says production is suppressed and sleep onset is delayed — not permanently prevented."
    },
    {
     "n": 12,
     "type": "mc",
     "text": "According to the passage, what social norm in professional environments worsens sleep deprivation?",
     "opts": [
      "A. Demanding that workers be available twenty-four hours per day",
      "B. Treating sleep sacrifice as a sign of professional dedication",
      "C. Requiring shift work rotations every few months",
      "D. Banning sleeping during working hours"
     ],
     "ans": 1,
     "ev": "Social norms in many professional environments implicitly valorise sleep sacrifice as a marker of commitment and productivity",
     "why": "B — 'valorise sleep sacrifice as a marker of commitment' = treat it as professional dedication. A is too extreme ('twenty-four hours'). C and D are not stated.",
     "trap": "A sounds extreme and might seem like the passage's point — but the passage says 'implicitly valorise', meaning it is a cultural attitude, not an explicit rule."
    }
   ]
  }
 },
 {
  "id": 4,
  "title": "Urban Green Spaces · Remote Work · Gut Microbiome",
  "focus": "Contrast/addition connectors in fill + inference questions",
  "s1": {
   "title": "Why Cities Need Green Spaces",
   "trapNote": "Paragraph B begins with 'Beyond these individual benefits' — so the paragraphs before B must discuss individual benefits. Paragraph D begins with 'Despite these benefits' — so D must follow the paragraphs that described benefits.",
   "paras": [
    {
     "l": "A",
     "pos": 1,
     "txt": "Urban green spaces — including parks, gardens, street trees, and riverside paths — represent a small but vital component of city infrastructure. Research across dozens of cities worldwide has consistently demonstrated that access to nature within urban environments is strongly associated with improved physical and mental health outcomes for residents.",
     "why": "Introduction — general statement about what urban green spaces are and what the research shows. No pronoun references back."
    },
    {
     "l": "B",
     "pos": 3,
     "txt": "Beyond these individual health benefits, urban green spaces perform crucial environmental functions. Trees and vegetation absorb atmospheric carbon dioxide, reduce surface temperatures through evapotranspiration, and intercept rainfall, reducing the burden on drainage systems during heavy downpours. In cities increasingly threatened by the urban heat island effect, these functions are becoming more rather than less important.",
     "why": "'Beyond these individual benefits' = contrast with individual health benefits in C. B moves to environmental functions. Must come after individual benefits are discussed."
    },
    {
     "l": "C",
     "pos": 2,
     "txt": "At the individual level, proximity to parks and green areas encourages physical activity, including walking, cycling, and informal sport. Studies also show that even brief exposure to natural settings reduces physiological stress markers, including cortisol levels and blood pressure. Green spaces additionally provide social gathering points, reducing isolation and strengthening community cohesion.",
     "why": "Discusses individual-level benefits — health, stress, social. Sets up 'beyond these individual benefits' in B."
    },
    {
     "l": "D",
     "pos": 4,
     "txt": "Despite these benefits, green spaces in many cities are under significant threat. As urban populations grow and land values rise, the pressure to convert parks and gardens into residential or commercial developments intensifies. In many rapidly expanding cities, the availability of green space per resident is declining precisely when the health evidence for its value is becoming stronger.",
     "why": "'Despite these benefits' = contrast with all benefits described in C and B. Introduces the threat. Classic contrast paragraph after benefits."
    },
    {
     "l": "E",
     "pos": 5,
     "txt": "Addressing this tension requires policy commitment at both municipal and national levels. Planning regulations that protect existing green space and require green infrastructure in new developments, combined with investment in green corridors connecting urban nature reserves, represent the most effective framework for ensuring that cities remain liveable as they grow.",
     "why": "Conclusion — policy solutions. 'Addressing this tension' refers to D's development vs preservation tension. Forward-looking — suggests what should happen."
    }
   ],
   "qs": [
    {
     "n": 1,
     "type": "mc",
     "text": "According to the passage, what does evapotranspiration help achieve?",
     "opts": [
      "A. Increasing rainfall in dry areas",
      "B. Reducing surface temperatures",
      "C. Removing carbon dioxide from soil",
      "D. Strengthening plant root systems"
     ],
     "ans": 1,
     "ev": "reduce surface temperatures through evapotranspiration",
     "why": "B — directly stated. A is the opposite of what evapotranspiration does to temperatures. C is about carbon not temperature.",
     "trap": "A sounds connected to water cycles but evapotranspiration here specifically reduces temperatures, not increases rainfall."
    },
    {
     "n": 2,
     "type": "tf",
     "text": "According to the passage, the availability of green space per resident is increasing in rapidly expanding cities.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "the availability of green space per resident is declining precisely when the health evidence for its value is becoming stronger",
     "why": "FALSE — 'declining' = decreasing, not increasing. The passage says the opposite.",
     "trap": "The phrase 'is becoming stronger' at the end sounds positive — but it refers to the EVIDENCE, not the green space itself."
    },
    {
     "n": 3,
     "type": "mc",
     "text": "What does the passage say about cortisol levels in natural settings?",
     "opts": [
      "A. They increase significantly in nature",
      "B. They are not affected by green spaces",
      "C. They are reduced by even brief exposure to natural settings",
      "D. They can only be measured in laboratory conditions"
     ],
     "ans": 2,
     "ev": "even brief exposure to natural settings reduces physiological stress markers, including cortisol levels",
     "why": "C — directly stated. A is the opposite.",
     "trap": "A says cortisol INCREASES in nature — the passage says it DECREASES. A classic reversal trap."
    },
    {
     "n": 4,
     "type": "mc",
     "text": "According to the passage, what is needed to protect urban green spaces?",
     "opts": [
      "A. Reducing urban population growth",
      "B. Moving industries outside city limits",
      "C. Policy commitment at municipal and national levels with planning regulation",
      "D. Encouraging private ownership of parks"
     ],
     "ans": 2,
     "ev": "policy commitment at both municipal and national levels. Planning regulations that protect existing green space",
     "why": "C — directly stated. A, B, D are not mentioned as solutions.",
     "trap": "A sounds logical but the passage focuses on planning and policy as solutions, not population control."
    }
   ]
  },
  "s2": {
   "title": "Remote Work: Benefits, Challenges, and the Future",
   "trapNote": "Gap 1: The text immediately after discusses specific benefits — so gap 1 must be a general statement introducing the remote work shift. Gap 3: The sentence after says 'These concerns have been confirmed' — so gap 3 must introduce some concerns. Gap 5: 'However' at the start means gap 5 contrasts with what came before.",
   "textHtml": "<p>The COVID-19 pandemic forced millions of workers and organisations to experiment with remote working on an unprecedented scale. <span class=\"gap-marker\">(1)</span></p><p>For workers, the benefits have been considerable. Eliminating the daily commute saves both time and money — in major cities, average commute times often exceed one hour each way. Greater autonomy over working hours and environment has been associated with higher job satisfaction. Workers with caregiving responsibilities have particularly valued the flexibility to adapt their schedules. <span class=\"gap-marker\">(2)</span></p><p>Employers, however, have raised concerns about the impact of remote work on collaboration, creativity, and the development of junior employees. <span class=\"gap-marker\">(3)</span> Research has found that informal knowledge transfer — the learning that occurs through casual interactions in a shared workspace — is significantly harder to replicate in a fully remote environment. Junior employees, in particular, receive less mentoring and feedback when working remotely.</p><p>The response of many organisations has been to adopt hybrid models, requiring employees to spend a proportion of their working week in the office. <span class=\"gap-marker\">(4)</span> The appropriate split between remote and in-person work varies considerably by industry, role, and individual preference.</p><p><span class=\"gap-marker\">(5)</span> Some employers have begun using digital monitoring tools to track productivity — recording keystrokes, capturing screenshots, and measuring the time spent on different applications. Employee representatives and privacy advocates have raised serious concerns about the proportionality and ethics of these practices.</p><p>The longer-term implications of the remote work shift extend beyond individual organisations. <span class=\"gap-marker\">(6)</span> Cities whose economies have depended on office workers filling restaurants, shops, and transport systems face structural adjustment challenges that will take years to work through.</p>",
   "options": [
    {
     "l": "A",
     "txt": "These arrangements attempt to balance the productivity and collaboration advantages of in-person work with the flexibility and work-life balance benefits of remote working."
    },
    {
     "l": "B",
     "txt": "What emerged from this experiment was not a temporary accommodation but a lasting transformation of expectations about where and how knowledge work is performed."
    },
    {
     "l": "C",
     "txt": "Persistent remote work has dramatically reduced footfall in city centres, with significant consequences for urban economies."
    },
    {
     "l": "D",
     "txt": "These concerns have been confirmed by research showing that face-to-face collaboration produces more creative outcomes in certain types of tasks."
    },
    {
     "l": "E",
     "txt": "However, the shift to remote monitoring has itself created new tensions between employers and employees over trust and privacy."
    },
    {
     "l": "F",
     "txt": "Studies have also found that remote workers tend to work longer hours than their office-based counterparts, blurring the boundary between professional and personal time."
    },
    {
     "l": "G",
     "txt": "The technology infrastructure required to support large-scale remote working has also expanded dramatically."
    },
    {
     "l": "H",
     "txt": "At the same time, remote work has amplified pre-existing inequalities between workers who can perform their roles from home and those who cannot."
    }
   ],
   "qs": [
    {
     "n": 1,
     "ans": "B",
     "why": "Gap 1: Follows 'unprecedented experiment'. B says what 'emerged' from the experiment — 'not temporary but a lasting transformation'. This introduces the whole passage's topic perfectly."
    },
    {
     "n": 2,
     "ans": "F",
     "why": "Gap 2: After listing benefits (commute savings, autonomy, flexibility). F adds another nuanced point — remote workers work LONGER hours. 'Studies have also found' signals addition to the benefits discussion, and 'blurring the boundary' prepares for the concerns in the next paragraph."
    },
    {
     "n": 3,
     "ans": "D",
     "why": "Gap 3: The sentence after says 'Research has found that informal knowledge transfer is harder remotely'. D says 'these concerns have been confirmed by research' — directly linking to what follows. 'These concerns' refers to the employer concerns in the previous sentence."
    },
    {
     "n": 4,
     "ans": "A",
     "why": "Gap 4: After 'hybrid models requiring office time'. A explains WHAT hybrid models attempt to do — 'balance productivity advantages with flexibility benefits'. Directly describes the purpose of the arrangement introduced in the previous sentence."
    },
    {
     "n": 5,
     "ans": "E",
     "why": "Gap 5: 'However' signals contrast. Before gap 5, employers are monitoring workers. E says 'the shift to remote monitoring has created tensions over trust and privacy' — a contrasting/complicating development. Note E starts with 'However'."
    },
    {
     "n": 6,
     "ans": "C",
     "why": "Gap 6: 'Longer-term implications extend beyond individual organisations'. C discusses cities and urban economies — going beyond individual companies. 'Persistent remote work has dramatically reduced footfall in city centres' — matches 'consequences for urban economies'."
    },
    {
     "n": 7,
     "ans": "H",
     "why": "H is one unused option. H discusses inequality between those who can and cannot work from home — a valid point but not placed in the current text structure."
    },
    {
     "n": 8,
     "ans": "G",
     "why": "G is also unused. G mentions technology infrastructure — plausible context but the passage focuses on human/organisational consequences, not technology."
    }
   ]
  },
  "s3": {
   "title": "The Human Gut Microbiome and Its Role in Health",
   "passHtml": "<p>The human gastrointestinal tract contains approximately thirty-eight trillion microorganisms — bacteria, viruses, fungi, and other microbes — collectively termed the gut microbiome. This <strong>community</strong> of microorganisms, far from being mere passengers in the digestive system, performs functions so central to human health that some researchers have proposed reconceptualising the microbiome as a distinct organ in its own right.</p><p>The gut microbiome influences digestion by breaking down dietary fibres that human digestive enzymes cannot process, producing short-chain fatty acids that serve as an energy source for intestinal cells. It plays a <strong>pivotal</strong> role in training and regulating the immune system from early life, with the microbiome of infants colonised during birth and breastfeeding establishing the immunological baseline that persists into adulthood. Disruption of this early microbial colonisation — through caesarean delivery, formula feeding, or early antibiotic exposure — has been associated with elevated rates of allergic and autoimmune conditions.</p><p>Perhaps the most striking dimension of microbiome research is the emerging understanding of the gut-brain axis — a bidirectional communication network connecting the central nervous system and the gastrointestinal tract through neural, hormonal, and immunological pathways. Approximately ninety percent of the body's serotonin is synthesised in the gut. <strong>Alterations</strong> in gut microbial composition have been associated in multiple studies with conditions including depression, anxiety, and autism spectrum disorder, though establishing causal relationships rather than mere correlations has proved methodologically challenging.</p><p>Diet is the most powerful <strong>modifiable</strong> influence on gut microbial composition in adult life. Populations consuming traditional high-fibre diets show greater microbial diversity than those consuming Western diets high in processed foods and low in plant variety. Research has found that eating thirty or more different plant species per week is associated with significantly greater microbiome diversity — a finding that has attracted considerable public interest but requires <strong>nuanced</strong> interpretation, as diversity is not invariably beneficial and the specific composition of the microbiome matters as much as its variety.</p><p>The commercial implications of microbiome research have generated a multi-billion-dollar industry in probiotics — live microorganisms marketed as health-promoting supplements. The scientific evidence for most commercially available probiotic products, however, falls substantially short of the claims made in their marketing. Few products have been rigorously evaluated in randomised controlled trials, the strains used commercially often differ from those studied in research, and the survival of ingested organisms through the acidic gastric environment to the large intestine, where they would need to act, is uncertain.</p>",
   "qs": [
    {
     "n": 1,
     "type": "v",
     "text": "The word 'community' in the first paragraph is closest in meaning to:",
     "opts": [
      "A. A small neighbourhood area",
      "B. A group of organisms living together in an environment",
      "C. A government or civic organisation",
      "D. A collection of ideas or beliefs"
     ],
     "ans": 1,
     "ev": "This community of microorganisms",
     "why": "Community here = a group of organisms living together. B is correct. This is a biological usage, not a social one.",
     "trap": "A and C both use 'community' in social/civic senses — but here it is the ecological meaning: organisms coexisting."
    },
    {
     "n": 2,
     "type": "v",
     "text": "The word 'pivotal' in the second paragraph is closest in meaning to:",
     "opts": [
      "A. Rotating or turning",
      "B. Marginal and unimportant",
      "C. Critically important",
      "D. Newly discovered"
     ],
     "ans": 2,
     "ev": "It plays a pivotal role in training and regulating the immune system",
     "why": "Pivotal = critically important, central. C is correct. A is the literal meaning (pivot = turn) but here it is metaphorical.",
     "trap": "A is the literal/mechanical meaning of pivot. In academic English, 'pivotal role' means critically important, not literally rotating."
    },
    {
     "n": 3,
     "type": "v",
     "text": "The word 'Alterations' in the third paragraph is closest in meaning to:",
     "opts": [
      "A. Changes or modifications",
      "B. Legal disputes",
      "C. Scientific publications",
      "D. Complete replacements"
     ],
     "ans": 0,
     "ev": "Alterations in gut microbial composition have been associated with conditions including depression",
     "why": "Alterations = changes/modifications. A is correct. D (complete replacements) is too extreme — alterations are partial changes.",
     "trap": "D says 'complete replacements' — alteration means change, which can be partial, not necessarily complete replacement."
    },
    {
     "n": 4,
     "type": "v",
     "text": "The word 'modifiable' in the fourth paragraph is closest in meaning to:",
     "opts": [
      "A. Impossible to change",
      "B. Measured and calculated",
      "C. Able to be changed or adjusted",
      "D. Genetically determined"
     ],
     "ans": 2,
     "ev": "Diet is the most powerful modifiable influence on gut microbial composition",
     "why": "Modifiable = able to be changed. C is correct. A is the opposite. D (genetically determined) implies it cannot be changed.",
     "trap": "D says genetically determined — the whole point of 'modifiable' is that it CAN be changed (unlike genetics). They are opposites."
    },
    {
     "n": 5,
     "type": "mc",
     "text": "According to the passage, what percentage of the body's serotonin is produced in the gut?",
     "opts": [
      "A. Around fifty percent",
      "B. Around seventy percent",
      "C. Around ninety percent",
      "D. One hundred percent"
     ],
     "ans": 2,
     "ev": "Approximately ninety percent of the body's serotonin is synthesised in the gut",
     "why": "C — ninety percent directly stated. D (one hundred percent) overstates.",
     "trap": "D says 'one hundred percent' — 'approximately ninety percent' allows for some production elsewhere."
    },
    {
     "n": 6,
     "type": "tf",
     "text": "According to the passage, the scientific evidence for most commercial probiotic products is strong.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "The scientific evidence for most commercially available probiotic products falls substantially short of the claims made in their marketing",
     "why": "FALSE — 'falls substantially short' is the opposite of strong evidence.",
     "trap": "The passage describes probiotics as a 'multi-billion-dollar industry' — success commercially does not mean scientific validity."
    },
    {
     "n": 7,
     "type": "mc",
     "text": "According to the passage, what does eating thirty or more plant species per week achieve?",
     "opts": [
      "A. It guarantees optimal gut health for all individuals",
      "B. It is associated with significantly greater microbiome diversity",
      "C. It eliminates all harmful bacteria from the gut",
      "D. It has been proven to prevent depression"
     ],
     "ans": 1,
     "ev": "eating thirty or more different plant species per week is associated with significantly greater microbiome diversity",
     "why": "B — 'associated with' not 'guarantees'. A overstates with 'guarantees'. C and D are not stated.",
     "trap": "A says 'guarantees' — the passage says 'associated with', which is a correlation, not a guarantee."
    },
    {
     "n": 8,
     "type": "inf",
     "text": "What does the author imply about the thirty plant species recommendation?",
     "opts": [
      "A. It is unreliable and should be ignored",
      "B. It is a useful finding but should not be applied uncritically",
      "C. It is the definitive solution to gut health problems",
      "D. It only applies to people eating Western diets"
     ],
     "ans": 1,
     "ev": "a finding that has attracted considerable public interest but requires nuanced interpretation, as diversity is not invariably beneficial",
     "why": "B is implied — 'requires nuanced interpretation' = should not be applied uncritically. A is too dismissive. C contradicts 'nuanced'.",
     "trap": "C says 'definitive solution' — 'nuanced interpretation' is specifically warning against treating it as definitive."
    },
    {
     "n": 9,
     "type": "mc",
     "text": "According to the passage, what is the concern about commercially available probiotic strains?",
     "opts": [
      "A. They are too expensive for most consumers",
      "B. They often differ from the strains studied in research",
      "C. They are illegal in most countries",
      "D. They contain harmful chemicals"
     ],
     "ans": 1,
     "ev": "the strains used commercially often differ from those studied in research",
     "why": "B — directly stated. A, C, D are not mentioned as concerns.",
     "trap": "A is a real-world concern about probiotics but is not stated in this passage. Stick to what the text says."
    },
    {
     "n": 10,
     "type": "p",
     "text": "Which sentence best expresses: 'Few products have been rigorously evaluated in randomised controlled trials'?",
     "opts": [
      "A. Most probiotic products have undergone thorough scientific testing",
      "B. Most probiotic products have not been subjected to the highest standards of scientific evaluation",
      "C. Randomised controlled trials have proven probiotics to be ineffective",
      "D. Only products without scientific testing are sold commercially"
     ],
     "ans": 1,
     "ev": "Few products have been rigorously evaluated in randomised controlled trials",
     "why": "B paraphrases: 'few' = most have not, 'rigorously evaluated in RCTs' = highest standards of scientific evaluation. A is the opposite. C says trials PROVED ineffectiveness — the passage says trials have not been conducted, not that they failed.",
     "trap": "C says trials proved them ineffective — the passage says trials have NOT been done. Absence of evidence is not evidence of absence."
    },
    {
     "n": 11,
     "type": "tf",
     "text": "According to the passage, greater microbiome diversity is always beneficial regardless of which specific microbes are present.",
     "opts": [
      "True",
      "False",
      "Not Given"
     ],
     "ans": 1,
     "ev": "diversity is not invariably beneficial and the specific composition of the microbiome matters as much as its variety",
     "why": "FALSE — 'not invariably beneficial' directly contradicts 'always beneficial'. The specific composition also matters.",
     "trap": "The passage celebrates diversity earlier — but the final sentence of paragraph 4 explicitly qualifies this with 'not invariably beneficial'."
    },
    {
     "n": 12,
     "type": "mc",
     "text": "According to the passage, what challenge exists for ingested probiotic organisms?",
     "opts": [
      "A. They reproduce too quickly in the intestines",
      "B. They are destroyed by the immune system",
      "C. Their survival through the acidic gastric environment is uncertain",
      "D. They interfere with the natural gut microbiome"
     ],
     "ans": 2,
     "ev": "the survival of ingested organisms through the acidic gastric environment to the large intestine, where they would need to act, is uncertain",
     "why": "C — directly stated. A, B, D are not mentioned as the specific challenge.",
     "trap": "D sounds plausible as a concern — but the passage's specific concern is survival through stomach acid, not interference with existing microbiome."
    }
   ]
  }
 }
];
