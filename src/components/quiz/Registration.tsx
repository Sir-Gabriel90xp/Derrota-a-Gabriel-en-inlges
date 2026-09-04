import { useState, type FormEvent } from "react";
import { Ticker } from "./Ticker";
import type { Student } from "@/hooks/useQuiz";

const TYPES = [
  "Zero",
  "First",
  "Second",
  "Third",
  "Mixed",
  "Advanced",
] as const;

export function Registration({
  onStart,
}: {
  onStart: (student: Student) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Gabriel needs a name to compete against.");
      return;
    }
    onStart({ name: name.trim(), email: email.trim() });
  }

  return (
    <div className="min-h-screen bg-background">
      <Ticker />
      <header className="relative overflow-hidden">
        <div className="diag pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -top-40 -right-40 size-[420px] -rotate-12 rounded-[28%] bg-accent/15" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-14 sm:pt-14">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid size-11 -rotate-3 place-items-center bg-ink font-display text-lg text-paper">
              DG
            </div>
            <div className="leading-tight">
              <p className="font-display text-xl tracking-wide">DAURY GABRIEL</p>
              <p className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase">
                The Best Student · Undefeated
              </p>
            </div>
          </div>

          <h1 className="font-display text-[clamp(3rem,11vw,9rem)] leading-[0.82] tracking-tight">
            CAN YOU
            <br />
            <span className="text-accent">BEAT</span> GABRIEL?
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium text-foreground/70">
            The Ultimate English Conditionals Challenge. 30 questions across Zero,
            First, Second, Third, Mixed &amp; Advanced conditionals. Beat the
            benchmark or get schooled.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-9 max-w-xl rounded-xl bg-card p-6 outline-2 outline-ink shadow-hard-sm sm:p-8"
          >
            <p className="mb-5 text-[11px] font-bold tracking-[0.25em] text-foreground/40 uppercase">
              Student registration
            </p>
            <label className="block">
              <span className="text-xs font-bold tracking-[0.15em] uppercase">
                Full name <span className="text-accent">*</span>
              </span>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
                placeholder="Your full name"
                className="mt-2 w-full rounded-md border-2 border-ink bg-background px-4 py-3 font-semibold outline-none placeholder:font-normal placeholder:text-foreground/35 focus:border-accent"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-xs font-bold tracking-[0.15em] uppercase">
                Email · optional
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                className="mt-2 w-full rounded-md border-2 border-ink bg-background px-4 py-3 font-semibold outline-none placeholder:font-normal placeholder:text-foreground/35 focus:border-accent"
              />
            </label>
            {error ? (
              <p className="mt-3 text-sm font-bold text-accent">{error}</p>
            ) : null}
            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-3 -rotate-1 bg-accent px-8 py-4 font-display text-xl tracking-wide text-accent-foreground shadow-hard-sm transition-transform hover:rotate-0 sm:w-auto"
            >
              START THE CHALLENGE
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <p className="mt-4 text-sm font-semibold text-foreground/50">
              No sign-up · plays in your browser · progress is saved
            </p>
          </form>

          <div className="mt-10 flex flex-wrap gap-2">
            {TYPES.map((t, i) => (
              <span
                key={t}
                className={`px-3 py-1.5 text-[11px] font-bold tracking-[0.15em] uppercase ${
                  i === 2
                    ? "rotate-1 bg-accent text-accent-foreground"
                    : i === 4
                      ? "-rotate-1 bg-gold text-ink"
                      : "bg-ink text-paper"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}
