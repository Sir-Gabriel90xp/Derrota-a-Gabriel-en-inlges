const LINE =
  "Can you beat Gabriel? · The ultimate English conditionals challenge · 30 questions · C1 level ·";

export function Ticker() {
  return (
    <div className="overflow-hidden border-b-2 border-accent bg-ink py-2 text-paper">
      <div className="animate-marq flex whitespace-nowrap text-[11px] font-bold tracking-[0.25em] uppercase">
        <span className="pr-8">{LINE}</span>
        <span className="pr-8">{LINE}</span>
      </div>
    </div>
  );
}
