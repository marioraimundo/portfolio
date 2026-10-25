"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { RundownItem } from "@/lib/projects";

type RundownProps = {
  items: RundownItem[];
  locale: Locale;
  labels: {
    client: string;
    discipline: string;
    year: string;
    index: string;
  };
};

function RundownRow({
  item,
  index,
  locale,
}: {
  item: RundownItem;
  index: number;
  locale: Locale;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/${locale}/work/${item.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-x-4 py-4 transition-colors hover:bg-paper/[0.045] md:grid-cols-[2.5rem_8.5rem_minmax(0,1fr)_11rem_4.5rem] md:gap-x-5 md:py-3"
    >
      <span className="data hidden text-mute transition-colors group-hover:text-bar-b md:block">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="relative block aspect-video w-full overflow-hidden rounded-[8px] border border-paper/15 bg-ink-2">
        {hovered && item.videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={item.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={item.poster}
            alt=""
            fill
            sizes="136px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
      </span>

      <span className="min-w-0">
        <span className="data flex gap-3 text-mute md:hidden">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="ml-auto">{item.year}</span>
        </span>
        <span className="display mt-1 block text-[clamp(1.25rem,2.3vw,1.75rem)] leading-tight md:mt-0">
          {item.client}
        </span>
        <span className="mt-0.5 block text-sm text-mute transition-colors group-hover:text-paper/70">
          {item.title}
        </span>
        <span className="data mt-2 block text-mute md:hidden">
          {item.disciplines}
        </span>
      </span>

      <span className="data hidden text-mute md:block">
        {item.disciplines}
      </span>

      <span className="data hidden justify-self-start text-mute md:block">
        {item.year}
      </span>
    </Link>
  );
}

export function Rundown({ items, locale, labels }: RundownProps) {
  return (
    <div>
      <div
        data-reveal
        className="hidden border-b border-paper/12 pb-3 md:grid md:grid-cols-[2.5rem_8.5rem_minmax(0,1fr)_11rem_4.5rem] md:gap-x-5"
        aria-hidden="true"
      >
        <span className="data text-mute">{labels.index}</span>
        <span aria-hidden="true" />
        <span className="data text-mute">{labels.client}</span>
        <span className="data text-mute">{labels.discipline}</span>
        <span className="data text-mute">{labels.year}</span>
      </div>

      <ul className="border-t border-paper/12 md:border-t-0">
        {items.map((item, index) => (
          <li
            key={item.slug}
            data-reveal
            data-reveal-delay={index < 8 ? index * 60 : 0}
            className="border-b border-paper/12"
          >
            <RundownRow item={item} index={index} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}
