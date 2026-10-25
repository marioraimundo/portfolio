"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal]";

function prepare(el: HTMLElement) {
  const delay = Number(el.dataset.revealDelay ?? 0);
  if (delay) el.style.transitionDelay = `${delay}ms`;
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      document
        .querySelectorAll<HTMLElement>(`${SELECTOR}:not([data-reveal-state])`)
        .forEach((el) => {
          el.dataset.revealState = "in";
        });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.revealState = "in";
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" },
    );

    const observe = (el: HTMLElement) => {
      if (el.hasAttribute("data-reveal-state")) return;
      prepare(el);
      observer.observe(el);
    };

    document
      .querySelectorAll<HTMLElement>(`${SELECTOR}:not([data-reveal-state])`)
      .forEach(observe);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.hasAttribute("data-reveal")) observe(node);
          node
            .querySelectorAll<HTMLElement>(`${SELECTOR}:not([data-reveal-state])`)
            .forEach(observe);
        }
      }
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
