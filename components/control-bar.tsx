"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { ColorBars } from "./color-bars";
import { ThemeToggle } from "./theme-toggle";

type ControlBarProps = {
  locale: Locale;
  labels: { reel: string; work: string; about: string; quote: string; contact: string };
  theme: { toLight: string; toDark: string };
};

export function ControlBar({ locale, labels, theme }: ControlBarProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const segments = pathname.split("/").filter(Boolean);
  const page = segments[1] ?? "";
  const rest = segments.slice(2).join("/");
  const path = [page, rest].filter(Boolean).join("/");

  const items = [
    {
      href: `/${locale}`,
      label: labels.reel,
      active: page === "",
      color: "bg-bar-b",
    },
    {
      href: `/${locale}/work`,
      label: labels.work,
      active: page === "work",
      color: "bg-bar-r",
    },
    {
      href: `/${locale}/about`,
      label: labels.about,
      active: page === "about",
      color: "bg-bar-g",
    },
    {
      href: `/${locale}/quote`,
      label: labels.quote,
      active: page === "quote",
      color: "bg-bar-c",
    },
    {
      href: `/${locale}/contact`,
      label: labels.contact,
      active: page === "contact",
      color: "bg-bar-y",
    },
  ];

  return (
    <header className="sticky top-0 z-50">
      <ColorBars className="h-1" />
      <div className="relative border-b border-paper/12 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-1 px-1.5 min-[400px]:gap-1.5 min-[400px]:px-2 sm:gap-3 sm:px-6 lg:px-10">
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center gap-3 py-2"
          >
            <Image
              src="/brand/logo-mr.png"
              alt=""
              width={802}
              height={306}
              priority
              className="brand-logo h-4 w-auto min-[400px]:h-[18px] sm:h-6"
            />
            <span className="sr-only">Mario Raimundo</span>
            <span
              aria-hidden="true"
              className="wordmark hidden text-[18px] uppercase tracking-[0.1em] md:inline lg:text-[21.6px]"
            >
              Mario Raimundo
            </span>
          </Link>

          <div className="flex items-center gap-1 min-[400px]:gap-1.5 sm:gap-4">
            <nav
              aria-label="Main"
              className="flex items-center gap-1 min-[400px]:gap-1.5 sm:gap-4"
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`relative text-[9.5px] font-medium transition-colors min-[400px]:text-[10.5px] sm:text-[13px] ${
                    item.active ? "text-paper" : "text-mute hover:text-paper"
                  }`}
                >
                  {item.label}
                  {item.active ? (
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-0 h-[3px] w-4 ${item.color}`}
                    />
                  ) : null}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-0.5 border-l border-paper/15 pl-1 min-[400px]:pl-1.5 sm:gap-1 sm:pl-3">
              {locales.map((code) => (
                <Link
                  key={code}
                  href={`/${code}${path ? `/${path}` : ""}`}
                  aria-current={code === locale ? "true" : undefined}
                  className={`data px-1 py-1 uppercase transition-colors ${
                    code === locale
                      ? "text-paper"
                      : "text-mute hover:text-paper"
                  }`}
                >
                  {code}
                </Link>
              ))}
            </div>

            <ThemeToggle toLight={theme.toLight} toDark={theme.toDark} />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-paper/15" />
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-paper"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
