import { useState } from "react";
import type { Question } from "@/data/questions";
import type { TypeBreakdown } from "@/hooks/useQuiz";
import { GABRIEL_BENCHMARK, benchmarkLine, performanceLevel } from "@/lib/gabriel";
import { Ticker } from "./Ticker";

const CONFETTI = [
  { left: "8%", delay: "0.1s", size: "size-3", tone: "bg-accent" },
  { left: "22%", delay: "1.2s", size: "size-2", tone: "bg-gold" },
  { left: "38%", delay: "0.6s", size: "size-2.5", tone: "bg-paper" },
  { left: "54%", delay: "1.8s", size: "size-3", tone: "bg-accent" },
  { left: "70%", delay: "0.9s", size: "size-2", tone: "bg-gold" },
  { left: "86%", delay: "1.5s", size: "size-2.5", tone: "bg-paper" },
];

export function Results({
  studentName,
  questions,
  answers,
  score,
  total,
  percentage,
  breakdown,
  onRetake,
  onExit,
}: {
  studentName: string;
  questions: Question[];
  answers: Record<number, string>;
  score: number;
  total: number;
  percentage: number;
  breakdown: TypeBreakdown[];
  onRetake: () => void;
  onExit: () => void;
}) {
  const [showReview, setShowReview] = useState(false);
  const perfect = score === total && total > 0;
  const level = performanceLevel(percentage);

  return (
    <div className="min-h-screen bg-background">
      <Ticker />
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6">
        {perfect ? (
          <div className="relative mb-6 overflow-hidden rounded-xl bg-ink p-8 text-center text-paper shadow-hard-accent sm:p-12">
            {CONFETTI.map((c) => (
              <span
                key={c.left}
                className={`confetti absolute top-0 ${c.size} ${c.tone}`}
                style={{ left: c.left, animationDelay: c.delay }}
              />
            ))}
            <p className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
              Perfect score · {studentName}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-none">
              YOU BEAT GABRIEL. 🏆
            </h2>
            <p className="mt-4 font-display text-4xl text-gold">
              {score} / {total} · 100%
            </p>
            <p className="mt-4 font-medium text-paper/70">
              Congratulations. You have officially reached Gabriel Level.
            </p>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl bg-ink p-6 text-paper shadow-hard-accent sm:p-8">
            <p className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
              Final result · {studentName}
            </p>
            <div className="mt-4 flex items-end gap-4">
              <span className="font-display text-6xl leading-none sm:text-7xl">
                {score}
                <span className="text-3xl text-accent sm:text-4xl">/{total}</span>
              </span>
              <span className="mb-1 font-display text-3xl text-gold">
                {percentage}%
              </span>
            </div>
            <div className="mt-6 inline-block -rotate-2 bg-accent px-4 py-2 font-display text-xl tracking-wide text-accent-foreground sm:text-2xl">
              {level.title}
            </div>
            <p className="mt-4 font-medium text-paper/70">"{level.message}"</p>

            <p className="mt-6 text-[11px] font-bold tracking-[0.3em] text-paper/40 uppercase">
              Your Gabriel level
            </p>
            <div className="mt-3 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <div className="flex justify-between text-xs font-bold tracking-wide text-paper/50 uppercase">
                  <span>Your score</span>
                  <span>{percentage}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-paper/15">
                  <div
                    className="animate-bar h-full rounded-full bg-accent"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold tracking-wide text-paper/50 uppercase">
                  <span>Gabriel benchmark</span>
                  <span>{GABRIEL_BENCHMARK}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-paper/15">
                  <div
                    className="animate-bar h-full rounded-full bg-gold"
                    style={{ width: `${GABRIEL_BENCHMARK}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 font-semibold text-gold">{benchmarkLine(percentage)}</p>
          </div>

          <div className="rounded-xl bg-card p-6 outline-2 outline-ink shadow-hard sm:p-8">
            <p className="mb-5 text-[11px] font-bold tracking-[0.3em] text-foreground/40 uppercase">
              Performance by conditional
            </p>
            <div className="space-y-4">
              {breakdown.map((b) => (
                <div key={b.type}>
                  <div className="flex justify-between text-sm font-bold">
                    <span>{b.type}</span>
                    <span className="text-accent">{b.percentage}%</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-full bg-secondary">
                    <div
                      className={`animate-bar h-full rounded-full ${
                        b.percentage >= 80 ? "bg-ink" : "bg-accent"
                      }`}
                      style={{ width: `${b.percentage}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-foreground/40">
                    {b.correct} of {b.total} correct
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-foreground/50">
            Review every answer, read the grammar breakdown, then push your streak
            further.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowReview((v) => !v)}
              className="rounded-md border-2 border-ink px-6 py-3 font-display text-lg tracking-wide transition-colors hover:bg-secondary"
            >
              {showReview ? "HIDE REVIEW" : "REVIEW ANSWERS"}
            </button>
            <button
              type="button"
              onClick={onRetake}
              className="-rotate-1 rounded-md bg-accent px-8 py-3 font-display text-lg tracking-wide text-accent-foreground transition-colors hover:bg-ink hover:text-paper"
            >
              TRY AGAIN →
            </button>
            <button
              type="button"
              onClick={onExit}
              className="rounded-md px-4 py-3 font-display text-lg tracking-wide text-foreground/40 transition-colors hover:text-foreground"
            >
              NEW STUDENT
            </button>
          </div>
        </div>

        {showReview ? (
          <div className="animate-rise mt-8 space-y-4">
            <h3 className="font-display text-3xl tracking-tight">
              ANSWER <span className="text-accent">REVIEW</span>
            </h3>
            {questions.map((q, i) => {
              const given = answers[q.id];
              const ok = given === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className="rounded-xl bg-card p-5 outline-2 outline-ink sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-lg tracking-wide">
                      Question {i + 1}
                    </span>
                    <span className="bg-ink px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-paper uppercase">
                      {q.conditionalType}
                    </span>
                    <span
                      className={`px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase ${
                        ok
                          ? "bg-success text-paper"
                          : "bg-destructive text-destructive-foreground"
                      }`}
                    >
                      {ok ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                  {q.context ? (
                    <p className="mt-3 text-sm font-medium text-foreground/50 italic">
                      {q.context}
                    </p>
                  ) : null}
                  <p className="mt-3 font-semibold">{q.question}</p>
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <p>
                      <span className="font-bold tracking-[0.15em] text-foreground/40 uppercase">
                        Your answer:{" "}
                      </span>
                      <span className={ok ? "font-bold" : "font-bold text-destructive"}>
                        {given ?? "No answer"}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold tracking-[0.15em] text-foreground/40 uppercase">
                        Correct answer:{" "}
                      </span>
                      <span className="font-bold text-success">{q.correctAnswer}</span>
                    </p>
                  </div>
                  <p className="mt-3 border-l-4 border-accent pl-3 font-medium text-foreground/70">
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
