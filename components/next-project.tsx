"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type NextProjectData = {
  slug: string;
  client: string;
  title: string;
  poster: string;
  videoSrc?: string;
};

export function NextProject({
  locale,
  next,
  label,
  accent = "bg-bar-b",
}: {
  locale: Locale;
  next: NextProjectData;
  label: string;
  accent?: string;
}) {
  const [active, setActive] = useState(false);
  const playing = active && Boolean(next.videoSrc);

  return (
    <Link
      href={`/${locale}/work/${next.slug}`}
      data-reveal
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group block border-t border-paper/15 pb-6 pt-8"
    >
      <p className="data text-mute">{label}</p>
      <p className="display mt-2 text-[clamp(1.75rem,5vw,3.25rem)]">
        {next.client}
      </p>
      <p className="mt-1 text-sm text-mute">{next.title}</p>
      <span
        aria-hidden="true"
        className={`mt-5 block h-[3px] w-10 transition-[width] duration-300 group-hover:w-28 ${accent}`}
      />

      <span
        className="relative mt-7 block aspect-video w-full max-w-[32rem] overflow-hidden rounded-[10px] border border-paper/15 bg-ink-2"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {playing ? (
          <video
            src={next.videoSrc}
            poster={next.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            src={next.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {next.videoSrc ? (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/20 transition-opacity duration-200 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="grid h-12 w-12 place-items-center border border-paper/70 bg-ink/85 text-paper">
              <svg
                width="14"
                height="16"
                viewBox="0 0 16 18"
                fill="currentColor"
              >
                <path d="M0 0l16 9L0 18z" />
              </svg>
            </span>
          </span>
        ) : null}
      </span>
    </Link>
  );
}
