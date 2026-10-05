// Writing mocks — every mock has exactly two sections, like the real exam:
//   Section 1: SUMMARISE a text. Text type rotates: Narrative, Expository,
//              Persuasive, Descriptive.
//   Section 2: ESSAY. Type is one of:
//              'advdis'  (advantages & disadvantages — the most common),
//              'agree'   (agree / disagree),
//              'opinion' (what is your opinion?).
//
// To add a mock: copy one object, change the id and content. keyTerms are
// words a good summary should mention (used by the auto-checker).

export const ESSAY_LABEL = {
  advdis: 'Advantages & Disadvantages Essay',
  agree: 'Agree / Disagree Essay',
  opinion: 'Opinion Essay',
};

export const WRITING_MOCKS = [
  {
    id: 1,
    title: 'The Last Ferry · Remote Work',
    focus: 'Narrative summary + Advantages/Disadvantages essay',
    s1: {
      textType: 'Narrative',
      title: 'The Last Ferry',
      text:
        'Tomas had piloted the island ferry for thirty-one years, and tonight was its final crossing. A new bridge would open at dawn. As the engines hummed, passengers he had carried since childhood crowded the deck, sharing sandwiches and old stories. Mrs. Alvarez, who had once ridden to hospital aboard the boat during a storm, pressed a small brass bell into his hands. At the harbour, the crowd fell quiet. Tomas rang the bell once, helped the last passenger ashore, and tied the ropes for the final time. Walking home beneath the lights of the bridge, he felt sadness, but also pride that his boat had connected the island for three generations.',
      minWords: 40,
      maxWords: 70,
      keyTerms: ['ferry', 'bridge', 'final', 'last', 'passengers', 'bell', 'pride', 'proud', 'sad', 'generations'],
      model:
        'Tomas, an island ferry pilot of thirty-one years, makes his final crossing before a new bridge opens. Long-time passengers join him, and one gives him a brass bell as a gift. After ringing it and securing the boat, he walks home feeling both sad and proud that the ferry linked the community for generations.',
    },
    s2: {
      essayType: 'advdis',
      prompt:
        'More and more companies now allow their employees to work from home.\n\nDiscuss the advantages and disadvantages of this trend. Give reasons for your answer and include relevant examples.',
      minWords: 200,
      maxWords: 320,
      model:
        'Remote working has become increasingly common, and it brings both clear benefits and real drawbacks.\n\nOne major advantage is flexibility. Employees save hours of commuting each week, which they can spend on family, exercise or rest. As a result, many report lower stress and higher job satisfaction. Companies also benefit, since they can reduce office costs and recruit talented people from anywhere in the world. Furthermore, working from home allows people with caring responsibilities or disabilities to remain in employment, which makes workplaces more inclusive.\n\nHowever, there are significant disadvantages. Firstly, isolation is a serious problem. Without everyday conversation, workers may feel disconnected from colleagues, and junior staff in particular miss the informal mentoring that happens in an office. Secondly, the boundary between work and personal life can blur, leading some employees to work longer hours and suffer burnout. In addition, collaboration on complex projects can be slower when teams rely entirely on video calls.\n\nIn conclusion, remote work offers valuable flexibility and cost savings, but it also risks loneliness and overwork. I believe the most sensible approach is a hybrid model, in which employees spend part of the week at home and part in the office, so that both individuals and companies enjoy the advantages while limiting the disadvantages.',
    },
  },

  {
    id: 2,
    title: 'The Waggle Dance · University Education',
    focus: 'Expository summary + Agree/Disagree essay',
    s1: {
      textType: 'Expository',
      title: 'How Honeybees Give Directions',
      text:
        "When a honeybee finds a rich source of nectar, it returns to the hive and performs a 'waggle dance' to tell its sisters where to go. The dancer moves in a figure-of-eight pattern, shaking its body along the straight middle section. The angle of this run relative to vertical shows the direction of the food in relation to the sun, while the length of the waggle indicates distance: roughly one second of waggling for every kilometre. Other bees follow the dancer closely, feeling the movements with their antennae, and then fly out to find the flowers. Scientists first decoded this system in the 1940s, and it remains one of the few known examples of symbolic communication in insects.",
      minWords: 40,
      maxWords: 70,
      keyTerms: ['bee', 'dance', 'waggle', 'direction', 'distance', 'nectar', 'hive', 'angle', 'sun'],
      model:
        'Honeybees that discover nectar perform a waggle dance in the hive. The angle of the dance shows the direction of the food relative to the sun, and the length of the waggle shows the distance. Nearby bees follow the movements and fly to the flowers, making this a rare example of symbolic communication in insects.',
    },
    s2: {
      essayType: 'agree',
      prompt:
        'Some people believe that universities should teach practical job skills rather than academic subjects.\n\nTo what extent do you agree or disagree with this view? Give reasons for your answer and include relevant examples.',
      minWords: 200,
      maxWords: 320,
      model:
        'I partly agree that universities should place more emphasis on practical skills, but I do not believe academic knowledge should be abandoned.\n\nOn the one hand, graduates today often struggle to find work because employers want people who can solve real problems from the first day. Courses that include internships, teamwork projects and technical training therefore prepare students far better for the labour market. For example, engineering students who work with local companies usually gain confidence and contacts that purely theoretical study cannot provide.\n\nOn the other hand, academic education develops abilities that no short training course can replace. Studying history, philosophy or pure science teaches students to analyse evidence, question assumptions and communicate complex ideas clearly. These skills remain valuable even when specific technologies change. Moreover, many important discoveries have come from research that had no immediate practical purpose.\n\nFurthermore, if universities focused only on current job requirements, graduates might be unprepared when industries change. A flexible mind is a more lasting asset than a narrow skill set.\n\nIn conclusion, I agree to some extent that practical training deserves a larger place in university programmes, yet the best approach is a balance in which theory and practice support each other.',
    },
  },

  {
    id: 3,
    title: 'Plant a Tree · Tourism',
    focus: 'Persuasive summary + Advantages/Disadvantages essay',
    s1: {
      textType: 'Persuasive',
      title: 'Plant a Tree, Cool a City',
      text:
        'Our city is getting hotter, and we can no longer afford to ignore the solution growing in front of us. Trees cool streets by up to five degrees, clean the air we breathe and give children somewhere safe to play. Yet each year we pave over more green space for car parks that stand half empty. This must change. The council should plant ten thousand trees within five years and protect every mature tree from unnecessary removal. The cost is small compared with hospital bills for heat-related illness. Every resident can help, too: adopt a tree on your street, water it in summer and speak up at local meetings. Act now, and our grandchildren will thank us.',
      minWords: 40,
      maxWords: 70,
      keyTerms: ['tree', 'city', 'council', 'heat', 'cool', 'green', 'plant', 'residents', 'act'],
      model:
        'The author urges the city to plant ten thousand trees within five years and protect mature ones, arguing that trees cool streets, clean the air and provide play space. Since the cost is lower than treating heat illness, residents are also encouraged to care for trees and press the council to act.',
    },
    s2: {
      essayType: 'advdis',
      prompt:
        'International tourism is growing rapidly in many parts of the world.\n\nDiscuss the advantages and disadvantages of tourism for the countries that receive visitors. Give reasons for your answer and include relevant examples.',
      minWords: 200,
      maxWords: 320,
      model:
        'Tourism has expanded dramatically in recent decades, and receiving countries experience both benefits and problems.\n\nThe most obvious advantage is economic. Visitors spend money on hotels, restaurants and transport, creating jobs for local people and income for governments. In some small countries, tourism provides the majority of foreign currency. In addition, the industry encourages investment in airports, roads and public facilities which residents can also use. Tourism can even help preserve culture, because traditional crafts and festivals become valuable attractions.\n\nNevertheless, there are serious disadvantages. First, huge numbers of visitors can damage the environment through pollution, waste and the erosion of natural sites. Second, popular destinations often suffer from rising prices, so that local residents struggle to afford housing in their own neighbourhoods. Moreover, jobs in tourism are frequently seasonal and low paid, which leaves workers vulnerable when demand falls, as happened during the pandemic.\n\nOverall, tourism can bring prosperity and cultural pride, but only if it is managed carefully. In my opinion, governments should limit visitor numbers at fragile sites and ensure that profits are shared fairly with local communities, so that the advantages outweigh the disadvantages.',
    },
  },

  {
    id: 4,
    title: 'The Night Market · Public Transport',
    focus: 'Descriptive summary + Opinion essay',
    s1: {
      textType: 'Descriptive',
      title: 'The Harbour Night Market',
      text:
        'As darkness settles over the harbour, the night market flickers into life. Strings of yellow bulbs sway above narrow aisles, and the smell of grilled squid and sweet coconut pancakes drifts through the warm air. Vendors call out in rapid, rhythmic voices while sizzling woks hiss behind them. Stalls glitter with silver bracelets, hand-painted fans and mountains of bright silk scarves. Children weave between the crowds clutching sticky skewers, and the low thump of a street drummer pulses beneath the chatter. Beyond the last stall, the black water of the bay reflects the lights, so the whole scene seems to float.',
      minWords: 40,
      maxWords: 70,
      keyTerms: ['market', 'night', 'smell', 'food', 'vendors', 'stalls', 'lights', 'crowd', 'harbour', 'bay'],
      model:
        "The passage describes a lively harbour night market after dark. Bulbs light narrow aisles filled with the smells of grilled food, vendors' calls and colourful goods, while children and a drummer add to the energy. The bay reflects the lights, making the scene appear to float.",
    },
    s2: {
      essayType: 'opinion',
      prompt:
        'Some people think that governments should spend money on public transport rather than building new roads.\n\nWhat is your opinion? Give reasons for your answer and include relevant examples.',
      minWords: 200,
      maxWords: 320,
      model:
        'In my opinion, governments should give priority to public transport instead of constructing more roads, because it offers greater long-term benefits for society.\n\nFirstly, new roads rarely solve congestion. Research shows that wider highways simply attract more cars, so traffic returns to its previous level within a few years. By contrast, an efficient metro or bus network can move many more passengers in the same space, which reduces journey times for everyone.\n\nSecondly, public transport is better for the environment and for health. Fewer private cars mean less air pollution and lower carbon emissions, which helps cities meet climate targets. Cleaner air also reduces respiratory illness, saving money in hospitals.\n\nFurthermore, affordable buses and trains give access to jobs and education for people who cannot own a car, such as students, older residents and low-income families. This promotes equality and strengthens the local economy.\n\nAdmittedly, some rural areas depend on roads and still need maintenance. However, this does not justify large-scale road building in cities, where alternatives exist.\n\nIn conclusion, I strongly believe that investing in public transport is a wiser and fairer use of public money than building new roads.',
    },
  },
];
