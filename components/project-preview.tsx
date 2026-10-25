"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type PreviewProject = {
  slug: string;
  client: string;
  title: string;
  poster: string;
  videoSrc?: string;
};

export function ProjectPreview({
  locale,
  project,
  label,
  accent,
  align = "left",
}: {
  locale: Locale;
  project: PreviewProject;
  label: string;
  accent: string;
  align?: "left" | "right";
}) {
  const [active, setActive] = useState(false);
  const playing = active && Boolean(project.videoSrc);
  const right = align === "right";

  return (
    <Link
      href={`/${locale}/work/${project.slug}`}
      data-reveal
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={`group flex h-full flex-col ${
        right ? "md:items-end md:text-right" : "md:items-start"
      }`}
    >
      <p className="data text-mute">{label}</p>
      <p className="display mt-2 text-[clamp(1.5rem,3.6vw,2.75rem)]">
        {project.client}
      </p>
      <p className="mt-1 text-sm text-mute">{project.title}</p>
      <span
        aria-hidden="true"
        className={`mt-4 block h-[3px] w-10 transition-[width] duration-300 group-hover:w-24 ${accent} ${
          right ? "md:ml-auto" : ""
        }`}
      />

      <span
        className="relative mt-6 block aspect-video w-[70%] overflow-hidden rounded-[10px] border border-paper/15 bg-ink-2"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {playing ? (
          <video
            src={project.videoSrc}
            poster={project.poster}
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
            src={project.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {project.videoSrc ? (
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
