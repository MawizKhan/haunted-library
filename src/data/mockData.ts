export interface VocabularyItem {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  dseExamTip: string;
  exampleSentence: string;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  question: string;
  skillTested: "Inference" | "Vocabulary in Context" | "Tone & Mood" | "Rhetorical Device";
  options: {
    key: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
}

export interface Chamber {
  id: number;
  day: number;
  title: string;
  subtitle: string;
  genre: string;
  readTime: string;
  xpReward: number;
  status: "unlocked" | "completed" | "locked";
  synopsis: string;
  loreLocation: string;
  parts: {
    partNumber: number;
    partTitle: string;
    content: string[];
  }[];
  vocabulary: VocabularyItem[];
  questions: QuizQuestion[];
  badgeRewardId: string;
}

export interface Badge {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: string;
  flavorQuote: string;
}

export interface HouseStanding {
  id: string;
  rank: number;
  name: string;
  motto: string;
  form: string;
  totalXp: number;
  spookCount: number;
  color: string;
  glowColor: string;
  shieldIcon: string;
  isUserHouse?: boolean;
}

export interface StudentScholar {
  id: string;
  rank: number;
  name: string;
  house: string;
  formClass: string;
  xp: number;
  badgesUnlocked: number;
  streak: number;
  avatarSeed: string;
}

export interface UserProfile {
  name: string;
  school: string;
  rank: string;
  totalXp: number;
  streakDays: number;
  completedChambersCount: number;
  totalChambersCount: number;
  activeHouse: string;
  soundEnabled: boolean;
}

export interface HodNoteSection {
  title: string;
  category: string;
  points: string[];
  examTarget: string;
}

export interface DoofyQnA {
  id: string;
  triggerKeywords: string[];
  questionPrompt: string;
  response: string;
  category: "Pedagogy" | "Exam Tactics" | "Gothic Lore" | "Vocabulary";
}

export const initialMockData = {
  userProfile: {
    name: "You / Live Session",
    school: "St. Jude's EMI College (Shatin)",
    rank: "Novice Reader",
    totalXp: 12,
    streakDays: 1,
    completedChambersCount: 0,
    totalChambersCount: 5,
    activeHouse: "House Phoenix",
    soundEnabled: true,
  } as UserProfile,

  chambers: [
    {
      id: 1,
      day: 1,
      title: "The Whispering Elevator of Shatin Tower",
      subtitle: "Gothic Narrative & Urban Legend of the East Rail",
      genre: "Gothic Narrative",
      readTime: "3 min read",
      xpReward: 200,
      status: "unlocked",
      synopsis: "Late at night beneath the neon-drenched spires of Shatin, an ancient bronze elevator refuses to obey standard floor buttons, descending into forgotten archives beneath Shing Mun River.",
      loreLocation: "Shatin Government Offices, Basement Level -4",
      badgeRewardId: "badge-1",
      parts: [
        {
          partNumber: 1,
          partTitle: "Part I: The Descent into the Crepuscular Shaft",
          content: [
            "Rain lashed mercilessly against the monolithic glass towers of Shatin, turning the neon signboards into bleeding smears of emerald and ruby upon the slick asphalt. At precisely 11:43 p.m., the old library auxiliary elevator groans into motion.",
            "Its descent is inexorable, ignoring the frenzied hammering of the emergency override button. Outside the frosted glass transom, the twilight yields to a crepuscular gloom, thick with the scent of waterlogged manuscript paper and copper.",
            "With each passing meter, a sibilant hiss leaks from the ventilation grill—a rhythmic cadence reminiscent of quiet, breathless whispers conjugating Latin declensions in an empty cathedral."
          ]
        },
        {
          partNumber: 2,
          partTitle: "Part II: The Vault of Forgotten Folios",
          content: [
            "When the brass accordion gates finally shudder open, no modern lobby awaits. Instead, a labyrinthine corridor of iron bookshelves stretches beneath damp arches, bathed in a sepulchral green luminesce.",
            "Upon a lectern draped in velvet cobwebs lies an open catalog of overdue volumes dating back to 1911. The ink on the final line is still glistening: 'Reader 404: Your session has commenced.'"
          ]
        }
      ],
      vocabulary: [
        {
          word: "inexorable",
          pronunciation: "/ɪnˈɛksərəbl/",
          partOfSpeech: "adjective",
          definition: "Impossible to stop, prevent, or persuade; relentless.",
          dseExamTip: "HKDSE Paper 1 often tests words expressing inevitability or unstoppable fate in narrative texts.",
          exampleSentence: "The inexorable ticking of the examination clock heightened the tension in the hall."
        },
        {
          word: "crepuscular",
          pronunciation: "/krɪˈpʌskjʊlər/",
          partOfSpeech: "adjective",
          definition: "Resembling or relating to twilight; dim or shadowy.",
          dseExamTip: "Frequently utilized in Band 1 descriptive writing to establish atmospheric, eerie settings instead of simple 'dark'.",
          exampleSentence: "Bats emerged into the crepuscular sky as dusk descended over Lion Rock."
        },
        {
          word: "sibilant",
          pronunciation: "/ˈsɪbələnt/",
          partOfSpeech: "adjective",
          definition: "Making or characterized by a hissing sound (such as 's' or 'sh').",
          dseExamTip: "Essential auditory sensory imagery device (auditory imagery / onomatopoeia) in Gothic literature.",
          exampleSentence: "A sibilant murmur echoed through the empty library corridors as the wind blew."
        },
        {
          word: "sepulchral",
          pronunciation: "/sɪˈpʌlkrəl/",
          partOfSpeech: "adjective",
          definition: "Relating to a tomb or interment; gloomy, hollow, and deathly.",
          dseExamTip: "High-level Band 1 vocabulary indicating graveyard solemnity or chilling cold atmosphere.",
          exampleSentence: "The sepulchral chill of the basement archive sent shivers down the archivist's spine."
        }
      ],
      questions: [
        {
          id: "d1-q1",
          questionNumber: 1,
          question: "In Part I, what does the author's choice of the word 'inexorable' primarily convey about the elevator's descent?",
          skillTested: "Inference",
          options: [
            { key: "A", text: "The elevator operates with modern, smooth mechanical precision." },
            { key: "B", text: "The descent is unstoppable and feels controlled by a chilling, relentless force." },
            { key: "C", text: "The emergency brakes have successfully halted the carriage between floors." },
            { key: "D", text: "The passenger is deliberately choosing to travel downward slowly." }
          ],
          correctAnswer: "B",
          explanation: "'Inexorable' means impossible to stop or prevent. The context emphasizes that despite the frantic hammering of the override button, the elevator continues downwards relentlessly, instilling a sense of dread.",
          xpReward: 100
        },
        {
          id: "d1-q2",
          questionNumber: 2,
          question: "Which literary device is employed in the phrase 'a sibilant hiss leaks from the ventilation grill... like quiet, breathless whispers'?",
          skillTested: "Rhetorical Device",
          options: [
            { key: "A", text: "Hyperbole emphasizing industrial heat" },
            { key: "B", text: "Euphemism softening the elevator's malfunction" },
            { key: "C", text: "Auditory imagery and simile evoking eerie, supernatural unease" },
            { key: "D", text: "Satirical mockery of modern architectural design" }
          ],
          correctAnswer: "C",
          explanation: "The author combines auditory imagery ('sibilant hiss') with a simile ('like quiet, breathless whispers') to generate Gothic atmosphere and suggest an animate, ghostly presence.",
          xpReward: 100
        }
      ]
    },
    {
      id: 2,
      day: 2,
      title: "The Phantom Signal of Victoria Peak",
      subtitle: "Cold War Radio Telemetry & Atmospheric Horror",
      genre: "Psychological Suspense",
      readTime: "4 min read",
      xpReward: 250,
      status: "locked",
      synopsis: "An abandoned British colonial relay station on Mount Austin begins transmitting Morse code frequencies at 3:00 AM, broadcasting names of students logged into the school portal.",
      loreLocation: "Governor's Walk Radar Station, The Peak",
      badgeRewardId: "badge-2",
      parts: [
        {
          partNumber: 1,
          partTitle: "Part I: Frequencies in the Dense Fog",
          content: [
            "Dense alpine fog crept over the ridgelines of Victoria Peak, muffling the distant thrum of Central's metropolis into an eerie, watery silence. Within the rusted enclosure of the decommissioned British radio station, vacuum tubes flickered with sudden amber life.",
            "Static crackled through the antique headphones with the abrasive screech of tearing silk. Then came the cadenced taps: dit-dit-dah-dit. A rhythmic invocation repeating coordinates that pinpointed the exact desk at which you currently sit."
          ]
        },
        {
          partNumber: 2,
          partTitle: "Part II: The Transmitting Voice",
          content: [
            "Through the electromagnetic haze, a voice distorted by magnetic tape loops whispered in clipped colonial English: 'Candidate 0891... your reading comprehension time has expired. Hand in your paper, or remain in the frequency forever.'"
          ]
        }
      ],
      vocabulary: [
        {
          word: "cacophony",
          pronunciation: "/kəˈkɒfəni/",
          partOfSpeech: "noun",
          definition: "A harsh, discordant mixture of sounds.",
          dseExamTip: "Key DSE reading term for evaluating contrasting sensory descriptions.",
          exampleSentence: "A sudden cacophony of radio static pierced the midnight hush."
        },
        {
          word: "spectral",
          pronunciation: "/ˈspɛktrəl/",
          partOfSpeech: "adjective",
          definition: "Of or like a ghost; phantom.",
          dseExamTip: "Useful descriptive adjective for supernatural imagery.",
          exampleSentence: "A spectral glow flickered along the radio antennas."
        }
      ],
      questions: [
        {
          id: "d2-q1",
          questionNumber: 1,
          question: "What atmosphere is created by the description of the 'alpine fog' muffling the city into 'watery silence'?",
          skillTested: "Tone & Mood",
          options: [
            { key: "A", text: "Festive celebration and urban vitality" },
            { key: "B", text: "Profound isolation and impending psychological dread" },
            { key: "C", text: "Warm nostalgia for historical British architecture" },
            { key: "D", text: "Objective scientific precision" }
          ],
          correctAnswer: "B",
          explanation: "The sensory detail of heavy fog isolating the Peak from the vibrant city establishes claustrophobic isolation, typical of psychological suspense.",
          xpReward: 125
        },
        {
          id: "d2-q2",
          questionNumber: 2,
          question: "The radio transmission repeating the reader's exact coordinates creates tension primarily through:",
          skillTested: "Inference",
          options: [
            { key: "A", text: "Breaking the fourth wall and personalizing the threat" },
            { key: "B", text: "Providing GPS data for rescue teams" },
            { key: "C", text: "Proving the equipment was recently repaired" },
            { key: "D", text: "Highlighting standard telecommunication protocols" }
          ],
          correctAnswer: "A",
          explanation: "Personalizing coordinates directly to the reader collapses the barrier between fiction and reality, creating immediate horror.",
          xpReward: 125
        }
      ]
    },
    {
      id: 3,
      day: 3,
      title: "Log of the Archduke: The Tai Po Mangrove Apparition",
      subtitle: "Epistolary Gothic & Victorian Travelogue",
      genre: "Epistolary Gothic",
      readTime: "4 min read",
      xpReward: 250,
      status: "locked",
      synopsis: "Excerpts from the 1898 naturalist expedition into Ting Kok mangroves reveal strange bioluminescent organisms spelling warning glyphs upon the mudflats.",
      loreLocation: "Ting Kok Coastal Research Station, Tai Po",
      badgeRewardId: "badge-3",
      parts: [
        {
          partNumber: 1,
          partTitle: "Part I: Entry dated November 14th, 1898",
          content: [
            "'The brackish tide retreated swiftly at dusk, exposing the twisted stilt roots of the mangrove forest like the skeletal ribs of sunken galleons. Dr. Hargreaves observed peculiar phosphorescent algae organizing themselves into geometric ideograms.'"
          ]
        }
      ],
      vocabulary: [
        {
          word: "phosphorescent",
          pronunciation: "/ˌfɒsfəˈrɛsənt/",
          partOfSpeech: "adjective",
          definition: "Luminescent without undergoing significant heat production; glowing faintly in darkness.",
          dseExamTip: "Atmospheric sensory imagery for nighttime ecological texts.",
          exampleSentence: "The phosphorescent tideline traced eerie contours across the sand."
        }
      ],
      questions: [
        {
          id: "d3-q1",
          questionNumber: 1,
          question: "The comparison of mangrove roots to 'skeletal ribs of sunken galleons' serves as:",
          skillTested: "Rhetorical Device",
          options: [
            { key: "A", text: "A metaphor conveying decay, ancient doom, and nautical tragedy" },
            { key: "B", text: "A factual biological classification" },
            { key: "C", text: "An understated humor device" },
            { key: "D", text: "A rhyme scheme" }
          ],
          correctAnswer: "A",
          explanation: "Comparing nature to skeletal remains reinforces the Gothic motif of mortality and decay.",
          xpReward: 125
        }
      ]
    },
    {
      id: 4,
      day: 4,
      title: "Echoes in the Red Brick Asylum",
      subtitle: "Psychological Thriller & Architectural Horror",
      genre: "Psychological Thriller",
      readTime: "5 min read",
      xpReward: 300,
      status: "locked",
      synopsis: "In the heritage asylum corridors of Sai Ying Pun, the acoustics bend so that echoes answer questions you haven't yet voiced aloud.",
      loreLocation: "Old Mental Hospital, High Street, Sai Ying Pun",
      badgeRewardId: "badge-4",
      parts: [
        {
          partNumber: 1,
          partTitle: "Part I: The Verandah of Whispers",
          content: [
            "The granite rustication and arched verandahs of High Street stand as a somber monument to forgotten sanity. Step across the threshold, and the silence does not comfort; it interrogates."
          ]
        }
      ],
      vocabulary: [
        {
          word: "labyrinthine",
          pronunciation: "/ˌlæbəˈrɪnθaɪn/",
          partOfSpeech: "adjective",
          definition: "Complicated, tortuous, or resembling an intricate maze.",
          dseExamTip: "Commonly used in HKDSE Reading texts to describe confusing thoughts or complex settings.",
          exampleSentence: "The labyrinthine passageways left the investigators disoriented."
        }
      ],
      questions: [
        {
          id: "d4-q1",
          questionNumber: 1,
          question: "How does the phrase 'the silence does not comfort; it interrogates' personify silence?",
          skillTested: "Rhetorical Device",
          options: [
            { key: "A", text: "It portrays absence of sound as an aggressive inquisitor that exposes guilt" },
            { key: "B", text: "It explains the acoustic damping properties of granite" },
            { key: "C", text: "It shows the protagonist enjoys peaceful meditation" },
            { key: "D", text: "It suggests a telephone is ringing in the hallway" }
          ],
          correctAnswer: "A",
          explanation: "Personifying silence as an interrogator attributes menacing intent to the quiet room.",
          xpReward: 150
        }
      ]
    },
    {
      id: 5,
      day: 5,
      title: "The Midnight Archivist: The Grand Finale",
      subtitle: "Supernatural Mystery Finale & DSE Synthesis",
      genre: "Supernatural Mystery",
      readTime: "5 min read",
      xpReward: 500,
      status: "locked",
      synopsis: "The final chamber where the Head Archivist of the Haunted Library challenges you to synthesize all gothic motifs to break the seal and claim the Band 1 Master Certificate.",
      loreLocation: "Sanctum Sanctorum, Band 1 Central Library",
      badgeRewardId: "badge-5",
      parts: [
        {
          partNumber: 1,
          partTitle: "Part I: The Seal of Five Chambers",
          content: [
            "Five black candles ignite spontaneously upon the grand marble study desk. The Head Archivist steps forward from the gloom, holding a golden wax seal stamped with the emblem of St. Jude's EMI College."
          ]
        }
      ],
      vocabulary: [
        {
          word: "incantation",
          pronunciation: "/ˌɪnkænˈteɪʃn/",
          partOfSpeech: "noun",
          definition: "A series of words said as a magic spell or chant.",
          dseExamTip: "Highlights elevated formal diction in literary synthesis.",
          exampleSentence: "He uttered a low incantation that dispelled the shadow."
        }
      ],
      questions: [
        {
          id: "d5-q1",
          questionNumber: 1,
          question: "What does the lighting of all five candles symbolize in the climax of the challenge?",
          skillTested: "Inference",
          options: [
            { key: "A", text: "The culmination of reading discipline and linguistic mastery across the 5 chambers" },
            { key: "B", text: "A routine power outage in the school library" },
            { key: "C", text: "A culinary ceremony preparation" },
            { key: "D", text: "Fire safety inspection compliance" }
          ],
          correctAnswer: "A",
          explanation: "The five candles represent mastery of the 5 days of reading challenge, bringing the journey to full completion.",
          xpReward: 250
        }
      ]
    }
  ] as Chamber[],

  badges: [
    {
      id: "badge-1",
      dayNumber: 1,
      title: "Shadow Scholar",
      description: "Conquered Day 1: The Whispering Elevator of Shatin Tower. Deciphered Gothic vocabulary in the depths.",
      rarity: "Common",
      iconName: "BookOpenCheck",
      unlocked: false,
      requirement: "Complete Day 1 Chamber and score 100% on comprehension questions.",
      flavorQuote: "'He who descends into the crepuscular shaft fears no vocabulary exam.'"
    },
    {
      id: "badge-2",
      dayNumber: 2,
      title: "Cryptic Decipherer",
      description: "Conquered Day 2: The Phantom Signal of Victoria Peak. Intercepted supernatural Morse frequencies.",
      rarity: "Rare",
      iconName: "Radio",
      unlocked: false,
      requirement: "Unlock and complete Day 2 Chamber with all telemetry answered.",
      flavorQuote: "'Static is merely language waiting for a Band 1 scholar to translate.'"
    },
    {
      id: "badge-3",
      dayNumber: 3,
      title: "Spectral Investigator",
      description: "Conquered Day 3: Log of the Archduke. Discovered phosphorescent clues in the Ting Kok mangroves.",
      rarity: "Epic",
      iconName: "Compass",
      unlocked: false,
      requirement: "Complete Day 3 epistolary analysis.",
      flavorQuote: "'The tide takes away the mud, but leaves behind the lexicon of truth.'"
    },
    {
      id: "badge-4",
      dayNumber: 4,
      title: "Grim Historian",
      description: "Conquered Day 4: Echoes in the Red Brick Asylum. Mastered psychological pacing and architectural motifs.",
      rarity: "Legendary",
      iconName: "ScrollText",
      unlocked: false,
      requirement: "Complete Day 4 psychological analysis.",
      flavorQuote: "'Walls retain the echoes of words whispered in earnest.'"
    },
    {
      id: "badge-5",
      dayNumber: 5,
      title: "Master of the Macabre",
      description: "Completed the entire 5-Day Horror Challenge. Crowned Grand Lexicographer of the Haunted Library.",
      rarity: "Mythic",
      iconName: "Crown",
      unlocked: false,
      requirement: "Complete all 5 Chambers and unlock all preceding badges.",
      flavorQuote: "'The library whispers your name now, not in dread, but in veneration.'"
    }
  ] as Badge[],

  houses: [
    {
      id: "house-dragon",
      rank: 1,
      name: "House Dragon",
      motto: "Semper Vigiles (Ever Vigilant)",
      form: "Form 4 & 5 Senior Division",
      totalXp: 14250,
      spookCount: 184,
      color: "from-emerald-500 to-teal-700",
      glowColor: "rgba(16, 185, 129, 0.4)",
      shieldIcon: "ShieldAlert"
    },
    {
      id: "house-griffin",
      rank: 2,
      name: "House Griffin",
      motto: "Sapientia et Fortitudo (Wisdom and Fortitude)",
      form: "Form 3 & 4 Division",
      totalXp: 13800,
      spookCount: 162,
      color: "from-amber-500 to-orange-700",
      glowColor: "rgba(245, 158, 11, 0.4)",
      shieldIcon: "ShieldCheck"
    },
    {
      id: "house-phoenix",
      rank: 3,
      name: "House Phoenix (Your House)",
      motto: "Ex Cineribus Resurgam (From Ashes I Rise)",
      form: "Form 4B EMI Cohort",
      totalXp: 13120,
      spookCount: 147,
      color: "from-purple-500 to-indigo-700",
      glowColor: "rgba(168, 85, 247, 0.4)",
      shieldIcon: "Flame",
      isUserHouse: true
    },
    {
      id: "house-tiger",
      rank: 4,
      name: "House Tiger",
      motto: "Audaces Fortuna Juvat (Fortune Favors the Bold)",
      form: "Form 2 & 3 Junior Division",
      totalXp: 11940,
      spookCount: 129,
      color: "from-rose-500 to-red-700",
      glowColor: "rgba(244, 63, 94, 0.4)",
      shieldIcon: "Shield"
    }
  ] as HouseStanding[],

  topStudents: [
    {
      id: "stud-1",
      rank: 1,
      name: "Chan Tai Man",
      house: "House Dragon",
      formClass: "Class 4B",
      xp: 1420,
      badgesUnlocked: 5,
      streak: 5,
      avatarSeed: "CTM"
    },
    {
      id: "stud-2",
      rank: 2,
      name: "Sarah Wong Sze-Chit",
      house: "House Phoenix",
      formClass: "Class 5A",
      xp: 1350,
      badgesUnlocked: 4,
      streak: 4,
      avatarSeed: "SW"
    },
    {
      id: "stud-3",
      rank: 3,
      name: "Kyle Cheung Ka-Long",
      house: "House Griffin",
      formClass: "Class 4C",
      xp: 1280,
      badgesUnlocked: 4,
      streak: 4,
      avatarSeed: "KC"
    },
    {
      id: "stud-4",
      rank: 4,
      name: "Chloe Leung Sum-Yau",
      house: "House Tiger",
      formClass: "Class 3A",
      xp: 1190,
      badgesUnlocked: 3,
      streak: 3,
      avatarSeed: "CL"
    },
    {
      id: "stud-5",
      rank: 5,
      name: "You (Live Session)",
      house: "House Phoenix",
      formClass: "Class 4B",
      xp: 12,
      badgesUnlocked: 0,
      streak: 1,
      avatarSeed: "YOU"
    }
  ] as StudentScholar[],

  campusTickers: [
    "🔥 Class 4B Chan Tai Man earned +200 XP in Day 1 Chamber!",
    "👻 House Dragon took the lead with 14,250 total XP!",
    "🏆 Sarah Wong (Class 5A) unlocked the 'Shadow Scholar' Badge!",
    "⚠️ Warning: Crepuscular mist detected around the Shatin Tower elevator shaft...",
    "⚡ House Phoenix just gained +5 Spook! points from Live Session!",
    "📜 Head of Department: 'Remember to annotate sensory adjectives for DSE Paper 1 B2!'"
  ],

  hodPedagogicalNotes: [
    {
      title: "Gothic Atmosphere & Sensory Register",
      category: "HKDSE Paper 1 Section B2 Mastery",
      examTarget: "Questions assessing Tone, Mood, and Writer's Stance (Band 5** Criteria)",
      points: [
        "Sensory Imagery: Audit whether texts rely on auditory (sibilant, creaking, muffled) vs. visual (crepuscular, phosphorescent, monochrome) adjectives.",
        "Pathetic Fallacy: Observe how external weather (lashing Shatin rain, suffocating Peak fog) mirrors internal psychological dread.",
        "Lexical Density: Scaffold advanced low-frequency adjectives (inexorable, sepulchral) into active student vocabulary banks."
      ]
    },
    {
      title: "Comprehension & Inferencing Tactics",
      category: "Critical Reading Strategies",
      examTarget: "Questions requiring inference beyond literal meaning ('What does the writer imply...')",
      points: [
        "Rule of Concordance: Verify context clues before selecting dictionary definitions for polysemous words.",
        "Structural Foreshadowing: Note how early mechanical failures in the narrative foreshadow supernatural intervention.",
        "Rhetorical Effectiveness: Guide students to justify WHY an author used a simile rather than just identifying it."
      ]
    },
    {
      title: "Band 1 EMI English Week Integration",
      category: "Cross-Curricular & Student Motivation",
      examTarget: "Gamified Reading Motivation & Inter-House Competition",
      points: [
        "Immediate Reward Loops: Micro-XP increments on correct MCQs trigger positive dopamine associations with challenging literary prose.",
        "Peer Benchmarking: Live house leaderboards foster collective academic pride across Forms 1 through 6.",
        "Official Departmental Certification: Completion of all 5 chambers awards a signed Principal's Commendation for English Portfolio."
      ]
    }
  ] as HodNoteSection[],

  doofyQnAs: [
    {
      id: "q-gothic-tone",
      triggerKeywords: ["tone", "mood", "gothic", "identify"],
      questionPrompt: "How do I identify Gothic tone and mood in HKDSE reading passages?",
      category: "Pedagogy",
      response: "Splendid pedagogical query! In HKDSE Paper 1, 'Tone' refers to the writer's attitude (e.g., foreboding, macabre, detached), while 'Mood' is the emotional atmosphere evoked in the reader (e.g., claustrophobia, apprehension). Look for high-density sensory adjectives: words like 'crepuscular' (twilight), 'sibilant' (hissing), and 'inexorable' (relentless). Notice also pathetic fallacy—the rain outside Shatin Tower isn't mere weather; it's an accomplice to dread!"
    },
    {
      id: "q-vocab-strategies",
      triggerKeywords: ["vocab", "vocabulary", "strategies", "words", "paper 1"],
      questionPrompt: "What are the most effective vocabulary-in-context strategies for Section B2?",
      category: "Exam Tactics",
      response: "Never read vocabulary in a vacuum! In Section B2, examiners deliberately pick secondary definitions. Employ the 'Slot & Substitute' method: mentally blank out the target word (e.g. '[blank] hiss'), test all four options, and verify tone consistency. If the passage is grimly Gothic, a cheerful or merely neutral option is an immediate distractor."
    },
    {
      id: "q-shatin-tower",
      triggerKeywords: ["shatin", "elevator", "day 1", "lore", "story"],
      questionPrompt: "Why is Day 1 set in Shatin Tower instead of a traditional British manor?",
      category: "Gothic Lore",
      response: "Urban Hong Kong Gothic! True Gothic literature thrives on familiar environments made uncanny ('Das Unheimliche'). By placing the whispering elevator in the bustling, glass-and-concrete reality of Shatin above the Shing Mun River, the contrast between ultra-modern efficiency and ancient forgotten underground archives produces acute cognitive dissonance. Our Band 1 readers connect instantly with locations they pass on the East Rail line!"
    },
    {
      id: "q-sensory-words",
      triggerKeywords: ["sensory", "words", "horror", "imagery", "adjectives"],
      questionPrompt: "Can you provide 3 powerful horror sensory words for descriptive essays?",
      category: "Vocabulary",
      response: "Gladly! Here are three Band 5** gems from our Departmental Lexicon: \n1. **Sibilant** (/ˈsɪbələnt/) - auditory: a sharp, hissing whisper that slithers through silence.\n2. **Sepulchral** (/sɪˈpʌlkrəl/) - atmospheric: gloomy and tomb-like, smelling of damp stone and forgotten crypts.\n3. **Crepuscular** (/krɪˈpʌskjʊlər/) - visual: dim, shadowy light of twilight that obscures silhouettes. Incorporate these into your writing tasks for instant stylistic elevation!"
    },
    {
      id: "q-xp-certificate",
      triggerKeywords: ["certificate", "vault", "badges", "points", "xp"],
      questionPrompt: "How can students qualify for the Official Band 1 Departmental Certificate?",
      category: "Exam Tactics",
      response: "To claim the Official Certificate of Excellence, a candidate must brave and successfully complete all 5 Chambers (Day 1 through Day 5), answering all comprehension checks and unlocking the 5 corresponding badges in the Haunted Vault. Once achieved, the certificate unlocks automatically with an authentic holographic school seal, ready for your student portfolio!"
    }
  ] as DoofyQnA[]
};
