import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ColorBars } from "./color-bars";
import { RevealText } from "./reveal-text";
import { SocialLinks } from "./social-links";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
  showCta?: boolean;
};

export function SiteFooter({ locale, dict, showCta = true }: SiteFooterProps) {
  return (
    <footer className="mt-auto">
      <div className="h-16 sm:h-20" aria-hidden="true" />

      <div className="bg-ink-2 text-paper">
        <ColorBars className="h-1.5" />

        <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-14 sm:px-6 lg:px-10">
          {showCta ? (
            <>
              <p data-reveal className="data text-paper/55">
                {dict.role}
              </p>

              <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <Link
                  href={`/${locale}/contact`}
                  className="display max-w-[18ch] text-[clamp(1.9rem,5vw,3.5rem)]"
                >
                  <RevealText text={dict.contact.title} delay={80} />
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  data-reveal
                  data-reveal-delay="220"
                  className="group inline-flex items-center gap-3 self-start border border-paper/25 px-5 py-3 text-sm transition-colors hover:border-paper/60"
                >
                  <span
                    aria-hidden="true"
                    className="h-[3px] w-6 bg-bar-c transition-all duration-200 group-hover:w-10"
                  />
                  {dict.contact.cta}
                </Link>
              </div>
            </>
          ) : null}

          <div
            data-reveal
            className={`flex flex-wrap items-end justify-between gap-6 ${
              showCta ? "mt-14 border-t border-paper/12 pt-6" : "pt-2"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo-mr.png"
                alt=""
                width={802}
                height={306}
                className="brand-logo h-7 w-auto sm:h-8"
              />
              <p className="wordmark text-[clamp(1.1rem,2.4vw,1.65rem)] uppercase tracking-[0.04em]">
                {site.name}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper/70">
                <Link href={`/${locale}/work`} className="hover:text-paper">
                  {dict.footer.work}
                </Link>
                <Link href={`/${locale}/about`} className="hover:text-paper">
                  {dict.footer.about}
                </Link>
                <Link href={`/${locale}/quote`} className="hover:text-paper">
                  {dict.footer.quote}
                </Link>
                <Link href={`/${locale}/contact`} className="hover:text-paper">
                  {dict.footer.contact}
                </Link>
              </nav>
              <SocialLinks />
            </div>
          </div>

          <div className="data mt-8 flex flex-wrap justify-between gap-3 text-paper/45">
            <span>
              © {site.year} {site.name}. {dict.footer.rights}
            </span>
            <a href="#top" className="hover:text-paper/80">
              {dict.footer.top}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
