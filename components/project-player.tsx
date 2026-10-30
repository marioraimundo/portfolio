"use client";

import { useState } from "react";
export function ProjectPlayer({
  poster,
  videoId,
  videoSrc,
  previewSrc,
  alt,
  playLabel,
}: {
  poster: string;
  videoId?: string;
  videoSrc?: string;
  previewSrc?: string;
  alt: string;
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && videoSrc) {
    return (
      <video
        key="full-video"
        src={videoSrc}
        poster={poster}
        controls
        autoPlay
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => {
          event.currentTarget.currentTime = 0;
        }}
        className="absolute inset-0 h-full w-full bg-ink object-contain"
      />
    );
  }

  if (playing && videoId) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd2160`}
        title={alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <>
      {videoSrc ? (
        <video
          key="preview-video"
          src={previewSrc ?? videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 15) {
              event.currentTarget.currentTime = 0;
            }
          }}
          className="absolute inset-0 h-full w-full bg-ink object-contain"
        />
      ) : videoId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=0&end=15&controls=0&rel=0&modestbranding=1&playsinline=1`}
          title={alt}
          tabIndex={-1}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <img
          src={poster}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {(videoSrc || videoId) && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center"
        >
          <span aria-hidden="true" className="flex flex-col items-center gap-3">
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
      )}
    </>
  );
}
