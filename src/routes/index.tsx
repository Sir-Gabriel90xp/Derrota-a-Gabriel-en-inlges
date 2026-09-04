import { createFileRoute } from "@tanstack/react-router";
import { QuizCard } from "@/components/quiz/QuizCard";
import { Registration } from "@/components/quiz/Registration";
import { Results } from "@/components/quiz/Results";
import { useQuiz } from "@/hooks/useQuiz";

const TITLE = "Can You Beat Gabriel? — The Ultimate English Conditionals Challenge";
const DESCRIPTION =
  "A 30-question C1 English conditionals quiz: zero, first, second, third, mixed and advanced structures. Score against the Gabriel benchmark.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const quiz = useQuiz();

  if (!quiz.hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  if (quiz.phase === "register" || !quiz.student) {
    return <Registration onStart={quiz.register} />;
  }

  if (quiz.phase === "results") {
    return (
      <Results
        studentName={quiz.student.name}
        questions={quiz.questions}
        answers={quiz.answers}
        score={quiz.score}
        total={quiz.total}
        percentage={quiz.percentage}
        breakdown={quiz.breakdown}
        onRetake={quiz.retake}
        onExit={quiz.reset}
      />
    );
  }

  const current = quiz.current;
  if (!current) return <div className="min-h-screen bg-background" />;

  return (
    <QuizCard
      question={current}
      options={quiz.optionsFor(current)}
      index={quiz.index}
      total={quiz.total}
      selected={quiz.answers[current.id]}
      streak={quiz.streak}
      studentName={quiz.student.name}
      onSelect={(option) => quiz.answer(current.id, option)}
      onPrevious={quiz.previous}
      onNext={quiz.next}
      onSubmit={quiz.submit}
    />
  );
}
