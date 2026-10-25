const corners = [
  { className: "left-0 top-0 border-l border-t" },
  { className: "right-0 top-0 border-r border-t" },
  { className: "bottom-0 left-0 border-b border-l" },
  { className: "bottom-0 right-0 border-b border-r" },
];

export function SafeFrame({
  tone = "dark",
  inset = "clamp(12px, 3vw, 40px)",
}: {
  tone?: "dark" | "light";
  inset?: string;
}) {
  const color = tone === "dark" ? "border-paper/45" : "border-ink/30";

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ padding: inset }}
      aria-hidden="true"
    >
      <div className="relative h-full w-full">
        {corners.map((corner) => (
          <div
            key={corner.className}
            className={`absolute h-4 w-4 ${color} ${corner.className}`}
          />
        ))}
      </div>
    </div>
  );
}
