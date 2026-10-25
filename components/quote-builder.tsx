"use client";

import { useMemo, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const BASE: Record<string, number> = {
  motion: 1500,
  edit: 175,
  "3d": 6500,
  character: 5500,
};

const COMPLEXITY: Record<string, number> = {
  simple: 1,
  medium: 1.35,
  high: 1.8,
};

const DEADLINE: Record<string, number> = {
  standard: 1,
  fast: 1.25,
  rush: 1.5,
};

const FIXED: Record<string, number> = {
  characterDesign: 300,
  rigging: 250,
};

const PER_MINUTE: Record<string, number> = {
  script: 300,
  storyboard: 450,
  sound: 50,
  subtitles: 20,
};

function chipClass(active: boolean) {
  return `cursor-pointer border px-3.5 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-paper focus-within:ring-offset-2 focus-within:ring-offset-ink ${
    active
      ? "border-paper bg-paper text-ink"
      : "border-paper/20 text-paper/70 hover:border-paper/50 hover:text-paper"
  }`;
}

function currency(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function amount(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function extraPriceLabel(id: string, locale: Locale) {
  if (id === "source") return "+25%";
  if (id === "extraFormat") return "+30%";
  if (id === "revision") return "+10%";
  const perMinute = PER_MINUTE[id];
  if (perMinute) return `+${currency(perMinute, locale)}/min`;
  const fixed = FIXED[id];
  if (fixed) return `+${currency(fixed, locale)}`;
  return "";
}

function ExtraChip({
  id,
  label,
  active,
  locale,
  onToggle,
}: {
  id: string;
  label: string;
  active: boolean;
  locale: Locale;
  onToggle: (id: string) => void;
}) {
  return (
    <label className={chipClass(active)}>
      <input
        type="checkbox"
        checked={active}
        onChange={() => onToggle(id)}
        className="sr-only"
      />
      {label}
      <span
        className={`ml-2 text-[11px] ${
          active ? "text-ink/60" : "text-mute"
        }`}
      >
        {extraPriceLabel(id, locale)}
      </span>
    </label>
  );
}

export function QuoteBuilder({
  strings,
  locale,
}: {
  strings: Dictionary["quote"];
  locale: Locale;
}) {
  const [format, setFormat] = useState("motion");
  const [minutes, setMinutes] = useState(0.5);
  const [complexity, setComplexity] = useState("simple");
  const [deadline, setDeadline] = useState("standard");
  const [extras, setExtras] = useState<string[]>([]);

  const formatLabel =
    strings.formatOptions.find((option) => option.id === format)?.label ?? "";
  const complexityLabel =
    strings.complexityOptions.find((option) => option.id === complexity)
      ?.label ?? "";
  const deadlineLabel =
    strings.deadlineOptions.find((option) => option.id === deadline)?.label ??
    "";

  const durationLabel = `${new Intl.NumberFormat(
    locale === "pt" ? "pt-BR" : "en-US",
    { maximumFractionDigits: 2 },
  ).format(minutes)} ${strings.minutes}`;

  const allOptions = [
    ...strings.deliveryOptions,
    ...strings.preOptions,
    ...strings.audioOptions,
  ];

  const extraLabels = allOptions
    .filter((option) => extras.includes(option.id))
    .map((option) => option.label);

  if (extras.includes("revision")) {
    extraLabels.push(strings.revisionsExtra);
  }

  const { range, rate } = useMemo(() => {
    const baseRate =
      (BASE[format] ?? 2000) * (COMPLEXITY[complexity] ?? 1);
    const baseTotal = baseRate * minutes;
    const fixedTotal = extras.reduce(
      (sum, id) => sum + (FIXED[id] ?? 0),
      0,
    );
    const perMinuteTotal = extras.reduce(
      (sum, id) => sum + (PER_MINUTE[id] ?? 0) * minutes,
      0,
    );
    const percentExtras =
      extras.includes("extraFormat") ? baseTotal * 0.3 : 0;

    const projectTotal =
      (baseTotal + fixedTotal + percentExtras) * (DEADLINE[deadline] ?? 1) +
      perMinuteTotal;
    const revisionExtra = extras.includes("revision") ? projectTotal * 0.1 : 0;
    const subtotal = projectTotal + revisionExtra;
    const total = extras.includes("source") ? subtotal * 1.25 : subtotal;

    const low = Math.round(total / 10) * 10;
    const high = Math.round((total * 1.3) / 10) * 10;

    return {
      range: `${currency(low, locale)} – ${amount(high, locale)}`,
      rate: `${currency(baseRate, locale)}/min`,
    };
  }, [format, minutes, complexity, deadline, extras, locale]);

  const message = [
    strings.whatsappIntro,
    "",
    `${strings.summary.project}: ${formatLabel} · ${complexityLabel}`,
    `${strings.summary.rate}: ${rate}`,
    `${strings.summary.duration}: ${durationLabel}`,
    `${strings.summary.deadline}: ${deadlineLabel}`,
    `${strings.summary.extras}: ${
      extraLabels.length ? extraLabels.join(", ") : strings.summary.none
    }`,
    `${strings.estimate}: ${range}`,
    "",
    strings.disclaimer,
  ].join("\n");

  const number = site.whatsapp.replace(/\D/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  function toggleExtra(id: string) {
    setExtras((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <section
      id="quote"
      aria-label={strings.title}
      className="mt-16 scroll-mt-20 border-t border-paper/12 pt-10 sm:mt-20 sm:pt-12"
    >
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_21rem] md:gap-14">
        <div>
          <fieldset className="min-w-0">
            <legend className="data mb-3 text-mute">{strings.format}</legend>
            <div className="flex flex-wrap gap-2">
              {strings.formatOptions.map((option) => (
                <label
                  key={option.id}
                  className={chipClass(format === option.id)}
                >
                  <input
                    type="radio"
                    name="quote-format"
                    value={option.id}
                    checked={format === option.id}
                    onChange={() => setFormat(option.id)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-7 grid gap-7 sm:grid-cols-2">
            <fieldset className="min-w-0">
              <legend className="data mb-3 text-mute">
                {strings.duration}
              </legend>
              <div className="flex items-baseline justify-between gap-3">
                <span className="display text-lg">{durationLabel}</span>
                <span className="data text-mute">15s – 10 min</span>
              </div>
              <input
                type="range"
                min={0.25}
                max={10}
                step={0.25}
                value={minutes}
                onChange={(event) => setMinutes(Number(event.target.value))}
                aria-label={strings.duration}
                aria-valuetext={durationLabel}
                className="mt-3 w-full accent-paper"
              />
              <p className="mt-2 text-[11px] leading-relaxed text-mute">
                {strings.minutesHint}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-mute">
                {strings.rateNote}
              </p>
            </fieldset>

            <fieldset className="min-w-0">
              <legend className="data mb-3 text-mute">
                {strings.complexity}
              </legend>
              <div className="flex flex-wrap gap-2">
                {strings.complexityOptions.map((option) => (
                  <label
                    key={option.id}
                    className={chipClass(complexity === option.id)}
                  >
                    <input
                      type="radio"
                      name="quote-complexity"
                      value={option.id}
                      checked={complexity === option.id}
                      onChange={() => setComplexity(option.id)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <fieldset className="mt-7 min-w-0">
            <legend className="data mb-3 text-mute">
              {strings.deadline}
            </legend>
            <div className="flex flex-wrap gap-2">
              {strings.deadlineOptions.map((option) => (
                <label
                  key={option.id}
                  className={chipClass(deadline === option.id)}
                >
                  <input
                    type="radio"
                    name="quote-deadline"
                    value={option.id}
                    checked={deadline === option.id}
                    onChange={() => setDeadline(option.id)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          {[
            {
              legend: strings.deliverables,
              options: strings.deliveryOptions,
            },
            {
              legend: strings.preProduction,
              options: strings.preOptions,
            },
            {
              legend: strings.audioText,
              options: strings.audioOptions,
            },
          ].map((group) => (
            <fieldset key={group.legend} className="mt-7 min-w-0">
              <legend className="data mb-3 text-mute">{group.legend}</legend>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => (
                  <ExtraChip
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    active={extras.includes(option.id)}
                    locale={locale}
                    onToggle={toggleExtra}
                  />
                ))}
              </div>
            </fieldset>
          ))}

          <fieldset className="mt-7 min-w-0">
            <legend className="data mb-3 text-mute">
              {strings.revisions}
            </legend>
            <p className="mb-2 text-[11px] text-mute">
              {strings.revisionsIncluded}
            </p>
            <ExtraChip
              id="revision"
              label={strings.revisionsExtra}
              active={extras.includes("revision")}
              locale={locale}
              onToggle={toggleExtra}
            />
          </fieldset>
        </div>

        <div className="h-fit rounded-[14px] border border-paper/12 bg-ink-2 p-5 sm:p-6 md:sticky md:top-20 md:self-start">
          <div className="mb-4 flex items-center gap-2 border-b border-paper/10 pb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bar-g opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bar-g" />
            </span>
            <span className="data text-xs text-paper/85">
              {strings.statusAvailable}
            </span>
          </div>

          <p className="data text-mute">{strings.estimate}</p>
          <p
            aria-live="polite"
            className="display mt-2 text-[clamp(1.4rem,2.2vw,1.6rem)]"
          >
            {range}
          </p>

          <dl className="mt-5 space-y-2.5 border-t border-paper/10 pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-mute">{strings.summary.project}</dt>
              <dd className="text-right">{formatLabel}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mute">{strings.summary.complexity}</dt>
              <dd className="text-right">{complexityLabel}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mute">{strings.summary.rate}</dt>
              <dd className="text-right">{rate}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mute">{strings.summary.duration}</dt>
              <dd className="text-right">{durationLabel}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mute">{strings.summary.deadline}</dt>
              <dd className="text-right">{deadlineLabel}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-mute">{strings.summary.extras}</dt>
              <dd className="text-right">
                {extraLabels.length
                  ? extraLabels.join(", ")
                  : strings.summary.none}
              </dd>
            </div>
          </dl>

          <div className="mt-4 space-y-3 border-t border-paper/10 pt-3">
            <div>
              <p className="data text-mute">{strings.paymentTitle}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-paper/70">
                {strings.paymentMethods}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-paper/60">
                {strings.paymentTerms}
              </p>
            </div>
            <p className="border-t border-paper/10 pt-3 text-[11px] leading-relaxed text-paper/60">
              {strings.disclaimer}
            </p>
          </div>

          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group mt-6 flex items-center justify-between gap-3 border border-bar-g/40 bg-bar-g/10 px-4 py-3 text-sm font-medium text-paper transition-all hover:border-bar-g hover:bg-bar-g hover:text-ink focus-visible:ring-2 focus-visible:ring-bar-g"
          >
            <span className="flex items-center gap-2.5">
              <svg
                className="h-4 w-4 shrink-0 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              {strings.cta}
            </span>
            <span aria-hidden="true" className="text-base">
              ↗
            </span>
          </a>

          {site.email && (
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                strings.emailSubject,
              )}&body=${encodeURIComponent(message)}`}
              className="mt-2.5 flex items-center justify-center gap-2 border border-paper/15 px-4 py-2.5 text-xs text-mute transition-colors hover:border-paper/40 hover:text-paper"
            >
              <svg
                className="h-3.5 w-3.5 shrink-0 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              {strings.emailCta}
            </a>
          )}

          <p className="mt-3 text-[11px] leading-relaxed text-paper/40">
            {strings.note}
          </p>
        </div>
      </div>
    </section>
  );
}
