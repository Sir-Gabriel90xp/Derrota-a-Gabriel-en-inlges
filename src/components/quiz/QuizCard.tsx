import { useEffect, useMemo, useState } from "react";
import type { Question } from "@/data/questions";
import { randomMessage, streakMessage } from "@/lib/gabriel";
import { Ticker } from "./Ticker";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function QuizCard({
  question,
  options,
  index,
  total,
  selected,
  streak,
  studentName,
  onSelect,
  onPrevious,
  onNext,
  onSubmit,
}: {
  question: Question;
  options: string[];
  index: number;
  total: number;
  selected?: string | undefined;
  streak: number;
  studentName: string;
  onSelect: (option: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  const isLast = index === total - 1;
  const answered = selected !== undefined;
  const correct = selected === question.correctAnswer;

  const [feedback, setFeedback] = useState<string | null>(null);
  useEffect(() => {
    setFeedback(answered ? randomMessage(correct) : null);
    // Re-roll the taunt only when the question changes or it is first answered.
  }, [question.id, answered, correct]);

  const streakLine = useMemo(() => streakMessage(streak), [streak]);
  const progress = Math.round(((index + 1) / total) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Ticker />
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl tracking-tight sm:text-3xl">
              CAN YOU BEAT GABRIEL?
            </h1>
            <p className="text-[11px] font-bold tracking-[0.25em] text-foreground/40 uppercase">
              The Ultimate English Conditionals Challenge
            </p>
          </div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase">
            {studentName} <span className="text-foreground/40">vs</span>{" "}
            <span className="text-accent">Gabriel</span>
          </p>
        </div>

        <div className="overflow-hidden rounded-xl bg-card outline-2 outline-ink shadow-hard">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-secondary/40 px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="font-display text-xl tracking-wide sm:text-2xl">
                Q <span className="text-accent">{index + 1}</span> / {total}
              </span>
              <span className="-rotate-1 bg-accent px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-accent-foreground uppercase">
                {question.conditionalType}
              </span>
            </div>
            {streak >= 3 ? (
              <div className="flex items-center gap-2 bg-ink px-3 py-1.5 text-xs font-bold tracking-[0.15em] text-gold uppercase">
                🔥 {streak} in a row
              </div>
            ) : null}
          </div>

          <div className="h-2 bg-secondary">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-5 sm:p-9">
            <p className="mb-3 text-[11px] font-bold tracking-[0.25em] text-foreground/40 uppercase">
              {question.category} · {question.difficulty}
            </p>
            {question.context ? (
              <p className="mb-4 border-l-4 border-accent pl-3 text-sm font-medium text-foreground/60 italic">
                {question.context}
              </p>
            ) : null}
            <h2 className="font-display text-[clamp(1.4rem,3.4vw,2.4rem)] leading-tight tracking-tight">
              {question.question}
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {options.map((option, i) => {
                const isSelected = selected === option;
                const isAnswer = option === question.correctAnswer;
                const base =
                  "rounded-md border-2 px-5 py-4 text-left font-semibold transition-colors";
                let cls = `${base} border-ink hover:bg-ink hover:text-paper`;
                if (answered) {
                  if (isAnswer)
                    cls = `${base} border-success bg-success/10 text-foreground`;
                  else if (isSelected)
                    cls = `${base} border-destructive bg-destructive/10 text-foreground`;
                  else cls = `${base} border-ink/20 text-foreground/50`;
                }
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={answered}
                    onClick={() => onSelect(option)}
                    className={cls}
                  >
                    <span className="mr-3 font-display text-lg text-accent">
                      {LETTERS[i]}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {answered ? (
              <div className="animate-rise mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-md bg-ink px-5 py-4 text-paper">
                  <span className="grid size-9 shrink-0 place-items-center bg-accent font-display text-lg">
                    {correct ? "🔥" : "😭"}
                  </span>
                  <p className="font-semibold">{feedback}</p>
                </div>
                <div className="rounded-md border-2 border-ink/15 bg-secondary/40 px-5 py-4">
                  <p className="text-[11px] font-bold tracking-[0.25em] text-foreground/40 uppercase">
                    Grammar breakdown
                  </p>
                  <p className="mt-2 font-medium">{question.explanation}</p>
                </div>
                {streakLine ? (
                  <p className="font-display text-lg tracking-wide text-accent">
                    {streakLine}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onPrevious}
                disabled={index === 0}
                className="rounded-md border-2 border-ink px-4 py-3 font-display text-base tracking-wide transition-colors hover:bg-secondary disabled:opacity-30 sm:px-6 sm:text-lg"
              >
                ← Previous
              </button>
              {isLast ? (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="rounded-md bg-accent px-5 py-3 font-display text-base tracking-wide text-accent-foreground transition-colors hover:bg-ink hover:text-paper sm:px-8 sm:text-lg"
                >
                  SUBMIT QUIZ
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNext}
                  className="rounded-md bg-ink px-5 py-3 font-display text-base tracking-wide text-paper transition-colors hover:bg-accent sm:px-8 sm:text-lg"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
