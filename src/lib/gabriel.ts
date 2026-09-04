export const GABRIEL_BENCHMARK = 90;

export const CORRECT_MESSAGES = [
  "Almost! You're starting to look like Gabriel. 👀",
  "Correct! Gabriel would approve. 🔥",
  "Nice one! You're getting closer to Gabriel.",
  "Okay... you're getting dangerously close to Gabriel.",
  "Gabriel is starting to get nervous. 😳",
];

export const INCORRECT_MESSAGES = [
  "Oh no... you're not quite like Gabriel yet. 😭",
  "Gabriel wouldn't have missed that one.",
  "Ouch... Gabriel got this one right.",
  "Not quite! Gabriel is still ahead.",
  "Don't worry. Even Gabriel had to learn this one.",
];

export function randomMessage(correct: boolean): string {
  const pool = correct ? CORRECT_MESSAGES : INCORRECT_MESSAGES;
  return pool[Math.floor(Math.random() * pool.length)] ?? pool[0]!;
}

export function streakMessage(streak: number): string | null {
  if (streak >= 10) return "GABRIEL HAS A PROBLEM. 🔥";
  if (streak >= 5) return "Gabriel is starting to get nervous. 👀";
  if (streak >= 3) return "You're warming up...";
  return null;
}

export interface PerformanceLevel {
  title: string;
  message: string;
}

export function performanceLevel(percentage: number): PerformanceLevel {
  if (percentage >= 90)
    return {
      title: "GABRIEL LEVEL REACHED 🏆",
      message: "Gabriel has officially found some competition.",
    };
  if (percentage >= 80)
    return {
      title: "ALMOST GABRIEL LEVEL 🔥",
      message: "You're dangerously close.",
    };
  if (percentage >= 70)
    return {
      title: "GETTING THERE 👀",
      message: "Gabriel is still ahead, but you're catching up.",
    };
  if (percentage >= 60)
    return {
      title: "GABRIEL IS STILL SAFE 😭",
      message: "Time to review those conditionals.",
    };
  return {
    title: "GABRIEL REMAINS UNDEFEATED 💀",
    message: "Back to the grammar books.",
  };
}

export function benchmarkLine(percentage: number): string {
  const diff = percentage - GABRIEL_BENCHMARK;
  if (diff > 0) return `You're ${diff}% ahead of Gabriel. He's not happy. 🔥`;
  if (diff === 0) return "You matched Gabriel exactly. Photo finish. 👀";
  return `You're only ${Math.abs(diff)}% away from Gabriel. 🔥`;
}
