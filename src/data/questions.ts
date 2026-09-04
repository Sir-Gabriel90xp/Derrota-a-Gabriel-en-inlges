export type ConditionalType =
  | "Zero Conditional"
  | "First Conditional"
  | "Second Conditional"
  | "Third Conditional"
  | "Mixed Conditionals"
  | "Advanced Conditionals";

export type QuestionCategory =
  | "Multiple Choice"
  | "Error Detection"
  | "Sentence Completion"
  | "Sentence Transformation"
  | "Contextual"
  | "C1 Challenge";

export type Difficulty = "C1 Foundation" | "C1 Intermediate" | "C1 Advanced";

export interface Question {
  id: number;
  category: QuestionCategory;
  conditionalType: ConditionalType;
  difficulty: Difficulty;
  /** Optional short scenario shown above the prompt. */
  context?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const CONDITIONAL_TYPES: ConditionalType[] = [
  "Zero Conditional",
  "First Conditional",
  "Second Conditional",
  "Third Conditional",
  "Mixed Conditionals",
  "Advanced Conditionals",
];

/**
 * Question database — 30 C1-level items on English conditionals only.
 * Add more items by appending objects with the same shape; the quiz engine
 * picks up everything exported here automatically.
 */
export const QUESTIONS: Question[] = [
  // ── 1–10 · C1 Foundation ───────────────────────────────────────────────
  {
    id: 1,
    category: "Sentence Completion",
    conditionalType: "Zero Conditional",
    difficulty: "C1 Foundation",
    context: "A technician explains hardware behaviour to a new colleague.",
    question: "If a server __________ above 80°C, the system automatically shuts it down.",
    options: ["runs", "will run", "would run", "had run"],
    correctAnswer: "runs",
    explanation:
      "The zero conditional describes a general truth or automatic result: 'If + present simple, present simple'. Both clauses stay in the present simple.",
  },
  {
    id: 2,
    category: "Contextual",
    conditionalType: "Zero Conditional",
    difficulty: "C1 Foundation",
    context: "You are describing a fixed routine in your department.",
    question:
      "Which sentence correctly expresses a routine that is always true at work?",
    options: [
      "If a client complains, the account manager calls them within an hour.",
      "If a client complains, the account manager would call them within an hour.",
      "If a client will complain, the account manager calls them within an hour.",
      "If a client complained, the account manager calls them within an hour.",
    ],
    correctAnswer:
      "If a client complains, the account manager calls them within an hour.",
    explanation:
      "Habits, routines and general truths take the zero conditional: present simple in both clauses. 'Will' never follows 'if' in this pattern.",
  },
  {
    id: 3,
    category: "Multiple Choice",
    conditionalType: "First Conditional",
    difficulty: "C1 Foundation",
    question:
      "If the funding round __________ through, we will open a second office in Lisbon.",
    options: ["goes", "will go", "went", "would go"],
    correctAnswer: "goes",
    explanation:
      "The first conditional describes a real future possibility: 'If + present simple, will + base verb'. The if-clause stays in the present simple.",
  },
  {
    id: 4,
    category: "Multiple Choice",
    conditionalType: "First Conditional",
    difficulty: "C1 Foundation",
    context: "A warning to a student before an exam.",
    question: "Choose the correct warning.",
    options: [
      "If you don't back up your thesis, you may lose months of work.",
      "If you won't back up your thesis, you may lose months of work.",
      "If you didn't back up your thesis, you may lose months of work.",
      "If you hadn't backed up your thesis, you may lose months of work.",
    ],
    correctAnswer:
      "If you don't back up your thesis, you may lose months of work.",
    explanation:
      "Warnings about real future consequences use the first conditional. The result clause can take 'may', 'might', 'can' or 'should' instead of 'will'.",
  },
  {
    id: 5,
    category: "Error Detection",
    conditionalType: "First Conditional",
    difficulty: "C1 Foundation",
    question:
      "Which part is incorrect? 'If the flight (A) will be delayed again, (B) call the hotel (C) and tell them (D) we'll arrive late.'",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation:
      "'Will' does not appear in the if-clause of a first conditional. It should be 'If the flight is delayed again, call the hotel…' — an imperative result clause is perfectly correct here.",
  },
  {
    id: 6,
    category: "Sentence Completion",
    conditionalType: "Second Conditional",
    difficulty: "C1 Foundation",
    question:
      "If I __________ a remote contract, I would move to Valencia tomorrow.",
    options: ["got", "get", "had got", "would get"],
    correctAnswer: "got",
    explanation:
      "The second conditional talks about unreal or hypothetical present/future situations: 'If + past simple, would + base verb'.",
  },
  {
    id: 7,
    category: "Contextual",
    conditionalType: "Second Conditional",
    difficulty: "C1 Foundation",
    context: "Your friend asks for advice about a job offer.",
    question: "Which sentence gives advice using the second conditional?",
    options: [
      "If I were you, I would negotiate the salary before signing.",
      "If I am you, I will negotiate the salary before signing.",
      "If I had been you, I would negotiate the salary before signing.",
      "If I were you, I will negotiate the salary before signing.",
    ],
    correctAnswer: "If I were you, I would negotiate the salary before signing.",
    explanation:
      "'If I were you…' is the standard advice formula. In formal English, 'were' is used for all persons in the second conditional.",
  },
  {
    id: 8,
    category: "Multiple Choice",
    conditionalType: "Third Conditional",
    difficulty: "C1 Foundation",
    question:
      "If we __________ the deadline earlier, we would have hired extra staff.",
    options: ["had known", "knew", "would know", "have known"],
    correctAnswer: "had known",
    explanation:
      "The third conditional refers to an unreal past: 'If + past perfect, would have + past participle'.",
  },
  {
    id: 9,
    category: "Error Detection",
    conditionalType: "Third Conditional",
    difficulty: "C1 Foundation",
    question:
      "Which part is incorrect? 'If she (A) had taken the earlier train, she (B) would have (C) went (D) straight to the interview.'",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation:
      "The third conditional uses 'would have + past participle'. The past participle of 'go' is 'gone', not 'went' — so it should be 'would have gone'.",
  },
  {
    id: 10,
    category: "Sentence Transformation",
    conditionalType: "Third Conditional",
    difficulty: "C1 Foundation",
    question:
      "Choose the sentence closest in meaning to: 'I didn't read the contract, so I signed a bad deal.'",
    options: [
      "If I had read the contract, I wouldn't have signed a bad deal.",
      "If I read the contract, I wouldn't sign a bad deal.",
      "If I hadn't read the contract, I would have signed a bad deal.",
      "If I would have read the contract, I wouldn't sign a bad deal.",
    ],
    correctAnswer:
      "If I had read the contract, I wouldn't have signed a bad deal.",
    explanation:
      "A regret about a completed past action becomes a third conditional, and the meaning is reversed: negative fact → positive condition.",
  },

  // ── 11–20 · C1 Intermediate ────────────────────────────────────────────
  {
    id: 11,
    category: "Sentence Completion",
    conditionalType: "Mixed Conditionals",
    difficulty: "C1 Intermediate",
    question:
      "If I had accepted that scholarship, I __________ in Berlin right now.",
    options: ["would be living", "would have lived", "will live", "lived"],
    correctAnswer: "would be living",
    explanation:
      "Past condition → present result is a mixed conditional: 'If + past perfect, would + base verb (now)'. The result refers to the present, so 'would have lived' is wrong.",
  },
  {
    id: 12,
    category: "Contextual",
    conditionalType: "Mixed Conditionals",
    difficulty: "C1 Intermediate",
    context: "A colleague is chronically disorganised and missed yesterday's deadline.",
    question: "Which sentence expresses a present condition with a past result?",
    options: [
      "If he were more organised, he would have submitted the report yesterday.",
      "If he had been more organised, he would be submitting the report yesterday.",
      "If he is more organised, he would have submitted the report yesterday.",
      "If he would be more organised, he had submitted the report yesterday.",
    ],
    correctAnswer:
      "If he were more organised, he would have submitted the report yesterday.",
    explanation:
      "A permanent present characteristic plus a past consequence gives the mixed pattern 'If + past simple, would have + past participle'.",
  },
  {
    id: 13,
    category: "Multiple Choice",
    conditionalType: "Second Conditional",
    difficulty: "C1 Intermediate",
    question:
      "If the startup __________ to relocate, I might not follow it abroad.",
    options: ["decided", "decides", "had decided", "would decide"],
    correctAnswer: "decided",
    explanation:
      "An imaginary future situation takes the second conditional. 'Might' softens the result clause but the if-clause still uses the past simple.",
  },
  {
    id: 14,
    category: "Error Detection",
    conditionalType: "Second Conditional",
    difficulty: "C1 Intermediate",
    question:
      "Which part is incorrect? 'If I (A) would have (B) more free time, I (C) would learn (D) Japanese properly.'",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation:
      "'Would' does not belong in the if-clause. The second conditional needs the past simple: 'If I had more free time, I would learn Japanese properly.'",
  },
  {
    id: 15,
    category: "Sentence Transformation",
    conditionalType: "First Conditional",
    difficulty: "C1 Intermediate",
    question:
      "Choose the sentence closest in meaning to: 'You will fail the module if you don't submit the essay.'",
    options: [
      "Unless you submit the essay, you will fail the module.",
      "Unless you don't submit the essay, you will fail the module.",
      "Provided that you submit the essay, you will fail the module.",
      "Even if you submit the essay, you will fail the module.",
    ],
    correctAnswer: "Unless you submit the essay, you will fail the module.",
    explanation:
      "'Unless' already means 'if not', so it is never followed by another negative. 'If you don't submit' = 'unless you submit'.",
  },
  {
    id: 16,
    category: "Sentence Completion",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Intermediate",
    question:
      "You can use the company car __________ you return it with a full tank.",
    options: ["as long as", "in case", "even if", "otherwise"],
    correctAnswer: "as long as",
    explanation:
      "'As long as' (like 'provided that' / 'providing that') sets a condition that must be met. 'In case' expresses precaution, not a condition.",
  },
  {
    id: 17,
    category: "Multiple Choice",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Intermediate",
    question: "Take a power bank __________ the airport charging points are busy.",
    options: ["in case", "unless", "provided that", "even if"],
    correctAnswer: "in case",
    explanation:
      "'In case' describes a precaution taken beforehand because something might happen. It is not the same as 'if', which describes the condition itself.",
  },
  {
    id: 18,
    category: "Contextual",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Intermediate",
    context: "The offer is generous, but your decision will not change.",
    question: "Which sentence keeps that meaning?",
    options: [
      "Even if they double the salary, I'm not moving to another city.",
      "Unless they double the salary, I'm not moving to another city.",
      "Provided that they double the salary, I'm not moving to another city.",
      "In case they double the salary, I'm not moving to another city.",
    ],
    correctAnswer: "Even if they double the salary, I'm not moving to another city.",
    explanation:
      "'Even if' signals that the result stays the same regardless of the condition — concession, not dependence.",
  },
  {
    id: 19,
    category: "Sentence Transformation",
    conditionalType: "Mixed Conditionals",
    difficulty: "C1 Intermediate",
    question:
      "Choose the sentence closest in meaning to: 'She invested in the fund years ago, so she isn't worried about money today.'",
    options: [
      "If she hadn't invested in the fund years ago, she would be worried about money today.",
      "If she hadn't invested in the fund years ago, she wouldn't have been worried about money today.",
      "If she didn't invest in the fund years ago, she would be worried about money today.",
      "If she doesn't invest in the fund, she will be worried about money today.",
    ],
    correctAnswer:
      "If she hadn't invested in the fund years ago, she would be worried about money today.",
    explanation:
      "Past cause with a present consequence = mixed conditional: past perfect in the if-clause, 'would + base verb' for the present result.",
  },
  {
    id: 20,
    category: "Error Detection",
    conditionalType: "Mixed Conditionals",
    difficulty: "C1 Intermediate",
    question:
      "Which part is incorrect? 'If they (A) had chosen a cheaper supplier, the project (B) would have (C) still be (D) within budget now.'",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation:
      "The result refers to the present ('now'), so the mixed pattern needs 'would still be', not 'would have … be'. Remove 'have'.",
  },

  // ── 21–30 · C1 Advanced / Challenge ────────────────────────────────────
  {
    id: 21,
    category: "C1 Challenge",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Advanced",
    question:
      "__________ about the security flaw, we would have postponed the launch.",
    options: ["Had we known", "If we would know", "Would we have known", "Did we know"],
    correctAnswer: "Had we known",
    explanation:
      "Formal inversion replaces 'if' in the third conditional: 'If we had known' → 'Had we known'. The subject follows the auxiliary and 'if' disappears.",
  },
  {
    id: 22,
    category: "C1 Challenge",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Advanced",
    question:
      "__________ the position, I would have to relocate to Singapore within a month.",
    options: ["Were I to accept", "If I would accept", "Had I accept", "Should I accepted"],
    correctAnswer: "Were I to accept",
    explanation:
      "'Were + subject + to + infinitive' is the inverted, formal version of the second conditional for hypothetical future situations: 'If I accepted / were to accept…'.",
  },
  {
    id: 23,
    category: "C1 Challenge",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Advanced",
    context: "Closing line of a formal client email.",
    question: "__________ any further assistance, please contact our support desk.",
    options: [
      "Should you require",
      "Would you require",
      "Had you required",
      "Were you required",
    ],
    correctAnswer: "Should you require",
    explanation:
      "'Should + subject + base verb' is the inverted first conditional used in formal writing: 'If you require any further assistance…'.",
  },
  {
    id: 24,
    category: "C1 Challenge",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Advanced",
    question:
      "Choose the sentence closest in meaning to: 'The mentor's support was the only reason I finished the degree.'",
    options: [
      "But for my mentor's support, I would never have finished the degree.",
      "But for my mentor's support, I would never finish the degree.",
      "Unless my mentor's support, I would never have finished the degree.",
      "Even if my mentor's support, I would never have finished the degree.",
    ],
    correctAnswer:
      "But for my mentor's support, I would never have finished the degree.",
    explanation:
      "'But for + noun' means 'if it hadn't been for'. With a past result it combines with 'would have + past participle'.",
  },
  {
    id: 25,
    category: "C1 Challenge",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Advanced",
    question:
      "__________ the backup generator, the whole data centre would have gone offline.",
    options: [
      "If it hadn't been for",
      "If it weren't for",
      "If it isn't for",
      "If it wouldn't have been for",
    ],
    correctAnswer: "If it hadn't been for",
    explanation:
      "For a past hypothetical use 'If it hadn't been for + noun'. 'If it weren't for' refers to a present situation instead.",
  },
  {
    id: 26,
    category: "Multiple Choice",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Advanced",
    question:
      "We need the signed form by Friday; __________, your enrolment will be cancelled.",
    options: ["otherwise", "unless", "provided that", "whether"],
    correctAnswer: "otherwise",
    explanation:
      "'Otherwise' means 'if that does not happen'. It links a requirement to its negative consequence and stands alone, unlike 'unless'.",
  },
  {
    id: 27,
    category: "Contextual",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Advanced",
    context: "The outcome is the same in both scenarios.",
    question: "Which sentence expresses that correctly?",
    options: [
      "Whether or not the market recovers, we're freezing recruitment.",
      "Provided that the market recovers, we're freezing recruitment.",
      "Unless the market recovers or not, we're freezing recruitment.",
      "In case the market recovers or not, we're freezing recruitment.",
    ],
    correctAnswer: "Whether or not the market recovers, we're freezing recruitment.",
    explanation:
      "'Whether or not' covers both alternatives, showing the result does not depend on which one happens.",
  },
  {
    id: 28,
    category: "Error Detection",
    conditionalType: "Advanced Conditionals",
    difficulty: "C1 Advanced",
    question:
      "Which part is incorrect? 'Had (A) I have realised (B) how competitive the programme was, (C) I would have applied (D) a year earlier.'",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation:
      "Inversion already carries the past perfect: 'Had I realised…'. Adding 'have' duplicates the auxiliary.",
  },
  {
    id: 29,
    category: "Sentence Transformation",
    conditionalType: "Mixed Conditionals",
    difficulty: "C1 Advanced",
    question:
      "Choose the sentence closest in meaning to: 'I'm terrible with numbers, which is why I lost money on that trade last year.'",
    options: [
      "If I weren't so bad with numbers, I wouldn't have lost money on that trade last year.",
      "If I hadn't been so bad with numbers, I wouldn't lose money on that trade last year.",
      "If I am not so bad with numbers, I wouldn't have lost money on that trade last year.",
      "Were I not so bad with numbers, I wouldn't lose money on that trade last year.",
    ],
    correctAnswer:
      "If I weren't so bad with numbers, I wouldn't have lost money on that trade last year.",
    explanation:
      "An ongoing present characteristic causing a specific past result takes the mixed form 'If + past simple, would have + past participle'.",
  },
  {
    id: 30,
    category: "C1 Challenge",
    conditionalType: "Mixed Conditionals",
    difficulty: "C1 Advanced",
    question:
      "__________ that funding round, the company __________ profitable today.",
    options: [
      "Had it not been for / might not be",
      "If it were not for / might not have been",
      "Had it not been for / might not have been",
      "Were it not for / might not being",
    ],
    correctAnswer: "Had it not been for / might not be",
    explanation:
      "'Had it not been for' is the inverted past hypothetical, and 'today' forces a present result, so the mixed result clause is 'might not be'.",
  },
];
