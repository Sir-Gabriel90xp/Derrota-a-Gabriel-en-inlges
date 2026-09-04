import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CONDITIONAL_TYPES,
  QUESTIONS,
  type ConditionalType,
  type Question,
} from "@/data/questions";

export type Phase = "register" | "quiz" | "results";

export interface Student {
  name: string;
  email: string;
}

interface PersistedState {
  student: Student | null;
  phase: Phase;
  /** Question ids in play order. */
  order: number[];
  /** questionId -> shuffled option list. */
  optionOrder: Record<number, string[]>;
  /** questionId -> selected option. */
  answers: Record<number, string>;
  index: number;
}

const STORAGE_KEY = "beat-gabriel:v1";

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = arr[i]!;
    const b = arr[j]!;
    arr[i] = b;
    arr[j] = a;
  }
  return arr;
}

function buildRound(): Pick<PersistedState, "order" | "optionOrder"> {
  const order = shuffle(QUESTIONS).map((q) => q.id);
  const optionOrder: Record<number, string[]> = {};
  for (const q of QUESTIONS) {
    // Error-detection items rely on positional labels, so keep those fixed.
    optionOrder[q.id] =
      q.category === "Error Detection" ? [...q.options] : shuffle(q.options);
  }
  return { order, optionOrder };
}

function initialState(): PersistedState {
  return {
    student: null,
    phase: "register",
    ...buildRound(),
    answers: {},
    index: 0,
  };
}

export interface TypeBreakdown {
  type: ConditionalType;
  correct: number;
  total: number;
  percentage: number;
}

export function useQuiz() {
  const [state, setState] = useState<PersistedState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Restore any in-progress session after hydration.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        if (parsed && Array.isArray(parsed.order) && parsed.order.length) {
          setState(parsed);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, hydrated]);

  const questions: Question[] = useMemo(
    () =>
      state.order
        .map((id) => QUESTIONS.find((q) => q.id === id))
        .filter((q): q is Question => Boolean(q)),
    [state.order],
  );

  const current = questions[state.index];
  const total = questions.length;

  const register = useCallback((student: Student) => {
    setState((s) => ({ ...s, student, phase: "quiz" }));
  }, []);

  const answer = useCallback((questionId: number, option: string) => {
    setState((s) =>
      s.answers[questionId]
        ? s
        : { ...s, answers: { ...s.answers, [questionId]: option } },
    );
  }, []);

  const next = useCallback(() => {
    setState((s) => ({ ...s, index: Math.min(s.index + 1, total - 1) }));
  }, [total]);

  const previous = useCallback(() => {
    setState((s) => ({ ...s, index: Math.max(s.index - 1, 0) }));
  }, []);

  const submit = useCallback(() => {
    setState((s) => ({ ...s, phase: "results" }));
  }, []);

  const retake = useCallback(() => {
    setState((s) => ({
      ...s,
      ...buildRound(),
      answers: {},
      index: 0,
      phase: "quiz",
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState());
  }, []);

  const isCorrect = useCallback(
    (q: Question) => state.answers[q.id] === q.correctAnswer,
    [state.answers],
  );

  /** Consecutive correct answers up to (and including) the last answered item. */
  const streak = useMemo(() => {
    let count = 0;
    for (const q of questions) {
      const given = state.answers[q.id];
      if (given === undefined) break;
      if (given === q.correctAnswer) count += 1;
      else count = 0;
    }
    return count;
  }, [questions, state.answers]);

  const score = useMemo(
    () => questions.filter((q) => state.answers[q.id] === q.correctAnswer).length,
    [questions, state.answers],
  );

  const answeredCount = useMemo(
    () => questions.filter((q) => state.answers[q.id] !== undefined).length,
    [questions, state.answers],
  );

  const percentage = total ? Math.round((score / total) * 100) : 0;

  const breakdown: TypeBreakdown[] = useMemo(
    () =>
      CONDITIONAL_TYPES.map((type) => {
        const items = questions.filter((q) => q.conditionalType === type);
        const correct = items.filter(
          (q) => state.answers[q.id] === q.correctAnswer,
        ).length;
        return {
          type,
          correct,
          total: items.length,
          percentage: items.length
            ? Math.round((correct / items.length) * 100)
            : 0,
        };
      }).filter((b) => b.total > 0),
    [questions, state.answers],
  );

  return {
    hydrated,
    phase: state.phase,
    student: state.student,
    questions,
    current,
    index: state.index,
    total,
    answers: state.answers,
    optionsFor: (q: Question) => state.optionOrder[q.id] ?? q.options,
    register,
    answer,
    next,
    previous,
    submit,
    retake,
    reset,
    isCorrect,
    streak,
    score,
    answeredCount,
    percentage,
    breakdown,
  };
}
