# CAN YOU BEAT GABRIEL?

**The Ultimate English Conditionals Challenge** — a 30-question C1 quiz on English
conditionals (zero, first, second, third, mixed and advanced structures), scored
against the fictional benchmark of Daury Gabriel, "The Best Student".

## Features

- Student registration (name required, email optional), stored for the session
- One question per screen, progress bar, conditional-type badge, Previous / Next / Submit
- Question types: multiple choice, error detection, sentence completion, sentence
  transformation, contextual and C1 challenge (inversion, `but for`, `had it not been for`…)
- Gabriel taunt messages on every answer + dynamic streak system (3 / 5 / 10 in a row)
- Final score, Gabriel benchmark comparison, performance level, per-conditional
  animated bars, perfect-score confetti celebration
- Full answer review with your answer, the correct answer and a grammar explanation
- Try Again re-randomises questions and answer options and resets score/streak
- Progress is preserved across refresh via `localStorage`
- Fully responsive: desktop, laptop, tablet and mobile

## Tech stack

- React 19 + TypeScript
- TanStack Start / TanStack Router (file-based routing, SSR)
- Vite 7
- Tailwind CSS v4 (design tokens in `src/styles.css`)

## Project structure

```
src/
  data/questions.ts          # the question database (typed, easy to extend)
  hooks/useQuiz.ts           # quiz engine: state, scoring, streaks, persistence
  lib/gabriel.ts             # Gabriel messages, streak lines, performance levels
  components/quiz/           # Registration, QuizCard, Results, Ticker
  routes/__root.tsx          # HTML shell, fonts, metadata
  routes/index.tsx           # the app (registration → quiz → results)
  styles.css                 # design system tokens, animations, utilities
```

## Adding more questions

Append objects to `QUESTIONS` in `src/data/questions.ts`:

```ts
{
  id: 31,
  category: "Multiple Choice",
  conditionalType: "Second Conditional",
  difficulty: "C1 Intermediate",
  context: "Optional short scenario.",
  question: "If I __________ you, I'd take the offer.",
  options: ["were", "am", "was being", "would be"],
  correctAnswer: "were",
  explanation: "Advice uses 'If I were you…'.",
}
```

Everything else (scoring, per-type breakdown, randomisation) picks it up automatically.

## Export / download the project

1. In Lovable, open the **GitHub** menu in the top bar and either export the project
   to a repository (then `git clone` it), or use **Download / Export project** to get
   a ZIP of the complete source.
2. Unzip it (or clone the repo) anywhere on your machine. No Lovable-only services are
   required — the app runs entirely in the browser.

## Run locally

Requires Node.js 20+ (or [Bun](https://bun.sh)).

```bash
npm install       # or: bun install
npm run dev       # or: bun run dev
```

Open the URL printed in the terminal (default http://localhost:8080).

## Add background music (autoplay)

This project includes a simple audio player that tries to autoplay a looping
track when the app loads. To enable it:

1. Place your audio file at `public/music.mp3` (recommended: short loop, MP3 or OGG).
2. The app will attempt to play it automatically; if the browser blocks autoplay
  it will show a "Click to play audio" overlay — the user must interact once.
3. Users can mute/unmute via the button at the bottom-right; the preference is
  saved to `localStorage`.

If you want to change the file path, edit `src/components/AudioPlayer.tsx` and
update the `src` attribute of the `<audio>` element.

## Production build

```bash
npm run build     # builds the production bundle
npm run start     # serves the production build
```

The build output can be deployed to any Node-compatible or edge host.
