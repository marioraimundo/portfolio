import type { SocialIcon } from "@/lib/site";
import { site } from "@/lib/site";

function Icon({ name }: { name: SocialIcon }) {
  if (name === "instagram") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="3.6"
          y="3.6"
          width="16.8"
          height="16.8"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <path d="M4.6 8.7h3.1V20H4.6zM6.15 3.6a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM9.9 8.7h3v1.6c.5-1 1.7-1.9 3.4-1.9 2.9 0 4.2 1.8 4.2 4.8V20h-3.1v-6.2c0-1.6-.6-2.5-2-2.5-1.4 0-2.4 1-2.4 2.7V20H9.9z" />
      </svg>
    );
  }

  if (name === "artstation") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z" />
      </svg>
    );
  }

  return (
    <span
      className="text-[13px] font-extrabold leading-none tracking-[-0.03em]"
      aria-hidden="true"
    >
      Bē
    </span>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {site.socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="grid h-9 w-9 place-items-center rounded-lg border border-paper/20 text-paper/70 transition-colors hover:border-paper/60 hover:bg-paper/5 hover:text-paper"
          >
            <Icon name={social.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
