const bars = [
  "bg-bar-y",
  "bg-bar-c",
  "bg-bar-g",
  "bg-bar-r",
  "bg-bar-b",
  "bg-ink",
];

export function ColorBars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full ${className}`} aria-hidden="true">
      {bars.map((bar) => (
        <div key={bar} className={`h-full flex-1 ${bar}`} />
      ))}
    </div>
  );
}
