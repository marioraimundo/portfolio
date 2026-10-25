"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

export function ContactForm({
  strings,
}: {
  strings: Dictionary["contact"]["form"];
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `${strings.subject} ${name.trim()}`;
    const body = `${strings.name}: ${name.trim()}\n\n${message.trim()}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[36rem]"
    >
      <div className="grid gap-6">
        <label className="block">
          <span className="data text-mute">{strings.name}</span>
          <input
            type="text"
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={strings.namePlaceholder}
            className="mt-2 block w-full border-b border-paper/25 bg-transparent py-2 text-base text-paper transition-colors placeholder:text-mute/60 focus:border-paper/70"
          />
        </label>

        <label className="block">
          <span className="data text-mute">{strings.message}</span>
          <textarea
            name="message"
            required
            rows={5}
            maxLength={2000}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={strings.messagePlaceholder}
            className="mt-2 block w-full resize-y border-b border-paper/25 bg-transparent py-2 text-base leading-relaxed text-paper transition-colors placeholder:text-mute/60 focus:border-paper/70"
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex cursor-pointer items-center gap-3 border border-paper/20 px-5 py-3 text-sm transition-colors hover:border-paper/60"
      >
        <span
          aria-hidden="true"
          className="h-[3px] w-6 bg-bar-c transition-all duration-200 group-hover:w-10"
        />
        {strings.submit}
      </button>

      <p className="data mt-4 text-mute">{strings.note}</p>
    </form>
  );
}
