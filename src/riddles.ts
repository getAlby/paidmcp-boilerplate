const riddles = [
  {
    difficulty: "super-easy",
    riddle: "What has keys but can't open locks?",
    answer: "piano",
  },
  {
    difficulty: "easy",
    riddle: "What has to be broken before you can use it?",
    answer: "egg",
  },
  {
    difficulty: "medium",
    riddle:
      "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    answer: "echo",
  },
  {
    difficulty: "hard",
    riddle: "I can be cracked, made, told, and played. What am I?",
    answer: "joke",
  },
  {
    difficulty: "extra-hard",
    riddle:
      "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "map",
  },
];

export function getRiddle(query: string): {
  riddle: string;
  answer: string;
} {
  // First try to find by difficulty
  const byDifficulty = riddles.find((r) => r.difficulty === query);
  if (byDifficulty) {
    return {
      riddle: byDifficulty.riddle,
      answer: byDifficulty.answer,
    };
  }

  // Then try to find by riddle text (exact match)
  const byRiddle = riddles.find((r) => r.riddle === query);
  if (byRiddle) {
    return {
      riddle: byRiddle.riddle,
      answer: byRiddle.answer,
    };
  }

  return {
    riddle: "Sorry, I don't have a riddle for that query.",
    answer: "",
  };
}
