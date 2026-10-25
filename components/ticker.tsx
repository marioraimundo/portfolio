import Link from "next/link";
import { type CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";
import { type ClientMark, clientMarks, clients } from "@/lib/projects";

const RUNS = 4;

function Mark({
  mark,
  locale,
  hidden,
}: {
  mark: ClientMark;
  locale: Locale;
  hidden: boolean;
}) {
  const art = (
    <span
      role={mark.slug ? undefined : "img"}
      aria-label={mark.slug ? undefined : mark.name}
      aria-hidden={mark.slug ? true : undefined}
      className="ticker-mark block shrink-0 bg-current"
      style={
        {
          "--mark-h": `${mark.height}px`,
          "--mark-ratio": mark.ratio,
          maskImage: `url("${mark.src}")`,
          WebkitMaskImage: `url("${mark.src}")`,
        } as CSSProperties
      }
    />
  );

  if (!mark.slug) return art;

  return (
    <Link
      href={`/${locale}/work/${mark.slug}`}
      aria-label={mark.name}
      tabIndex={hidden ? -1 : undefined}
      className="block shrink-0 cursor-pointer"
    >
      {art}
    </Link>
  );
}

function TickerRun({
  locale,
  hidden = false,
}: {
  locale: Locale;
  hidden?: boolean;
}) {
  return (
    <div
      className="ticker-run flex shrink-0 items-center gap-9 pr-9 sm:gap-14 sm:pr-14"
      aria-hidden={hidden || undefined}
    >
      {clientMarks.map((mark) => (
        <Mark
          key={mark.name}
          mark={mark}
          locale={locale}
          hidden={hidden}
        />
      ))}
    </div>
  );
}

export function Ticker({
  label,
  locale,
}: {
  label: string;
  locale: Locale;
}) {
  return (
    <div
      className="ticker relative overflow-hidden border-y border-ink/10 bg-paper text-ink"
      tabIndex={0}
      role="group"
      aria-label={label}
    >
      <p className="sr-only">
        {label}: {clients.join(", ")}
      </p>

      <div className="ticker-track flex w-max items-center py-5 sm:py-6">
        {Array.from({ length: RUNS }, (_, index) => (
          <TickerRun key={`a-${index}`} locale={locale} hidden={index > 0} />
        ))}
        {Array.from({ length: RUNS }, (_, index) => (
          <TickerRun key={`b-${index}`} locale={locale} hidden />
        ))}
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-paper to-transparent sm:w-20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-paper to-transparent sm:w-20"
      />
    </div>
  );
}
