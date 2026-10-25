"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type ReelStageProps = {
  poster: string;
  name: string;
  playLabel: string;
  positioning: string;
  videoLoopSrc?: string;
};

export function ReelStage({
  poster,
  name,
  playLabel,
  positioning,
  videoLoopSrc,
}: ReelStageProps) {
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) setReducedMotion(true);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10">
      <p className="mb-3 text-[13px] leading-snug tracking-[0.01em] text-mute sm:text-sm">
        {positioning}
      </p>

      <div className="frame relative w-full bg-ink-2">
        <div className="relative aspect-[4/3] bg-ink sm:aspect-video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${site.reelId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd2160`}
              title={`${name} — Reel`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <>
              {videoLoopSrc && !reducedMotion ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={poster}
                  aria-hidden="true"
                  className="anim-frame absolute inset-0 h-full w-full object-cover"
                >
                  <source src={videoLoopSrc} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={poster}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1440px) 1400px, 100vw"
                  className="anim-frame object-cover"
                />
              )}
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={playLabel}
                className="group absolute inset-0 flex cursor-pointer items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className="flex flex-col items-center gap-3"
                >
                  <span className="grid h-16 w-16 place-items-center border border-paper/70 bg-ink/95 text-paper transition-colors duration-200 group-hover:bg-paper group-hover:text-ink sm:h-20 sm:w-20">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 16 18"
                      fill="currentColor"
                    >
                      <path d="M0 0l16 9L0 18z" />
                    </svg>
                  </span>
                  <span className="data hidden bg-ink/90 px-2 py-1 uppercase tracking-[0.14em] text-paper sm:inline">
                    {playLabel}
                  </span>
                </span>
              </button>

            </>
          )}
        </div>
      </div>
    </section>
  );
}
