import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { RevealText } from "@/components/reveal-text";
import { SocialLinks } from "@/components/social-links";
import { getDictionary, isLocale } from "@/lib/i18n";
import { clients } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: `${dict.nav.about} — ${dict.meta.title}`,
    description: dict.about.bio[0],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const about = dict.about;

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 pt-14 sm:px-6 sm:pt-20 lg:px-10">
        <p data-reveal className="data text-mute">
          {about.kicker}
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] xl:gap-20">
          <aside data-reveal className="order-first md:order-none">
            <div className="frame relative aspect-square overflow-hidden bg-ink-2">
              <Image
                src="/about/mario-raimundo-2026.jpg"
                alt={about.portraitAlt}
                fill
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 384px, (min-width: 768px) 288px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="data mt-3 flex items-center justify-between gap-3 text-mute">
              <span>{about.location}</span>
              <span aria-hidden="true">MR</span>
            </div>
            <SocialLinks className="mt-4" />
          </aside>

          <div className="max-w-[38rem]">
            <h1 className="display text-[clamp(2.25rem,4.5vw,3.5rem)]">
              <RevealText text={about.title} delay={120} />
            </h1>

            <div
              data-reveal
              data-reveal-delay="320"
              className="measure mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-paper/85 sm:text-lg"
            >
              {about.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="career-title"
        className="mx-auto mt-16 max-w-[1440px] px-4 sm:mt-24 sm:px-6 lg:px-10"
      >
        <h2 id="career-title" data-reveal className="data text-mute">
          {about.career}
        </h2>

        <ol className="mt-5">
          {about.timeline.map((entry) => (
            <li
              key={`${entry.company}-${entry.period}`}
              data-reveal
              className="grid gap-1 border-t border-paper/12 py-4 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6 sm:py-5"
            >
              <span className="data text-mute">{entry.period}</span>
              <span className="min-w-0">
                <span className="display text-[1.35rem] leading-tight sm:text-[1.5rem]">
                  {entry.role}
                </span>
                <span className="mt-0.5 block text-sm text-mute sm:mt-0 sm:ml-3 sm:inline">
                  {entry.company}
                </span>
              </span>
              <span className="data text-mute">{entry.place}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-14 max-w-[1440px] px-4 pb-2 sm:mt-20 sm:px-6 lg:px-10">
        <div
          data-reveal
          className="grid gap-10 border-t border-paper/15 pt-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <h2 className="data text-mute">{about.toolkit}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.tools.map((tool) => (
                <li
                  key={tool}
                  className="border border-paper/20 px-3 py-1.5 text-sm text-paper/80"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="data text-mute">{about.clientsLabel}</h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/80">
              {clients.join(" · ")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="group mt-6 inline-flex items-center gap-3 border border-paper/20 px-5 py-3 text-sm transition-colors hover:border-paper/60"
            >
              <span
                aria-hidden="true"
                className="h-[3px] w-6 bg-bar-c transition-all duration-200 group-hover:w-10"
              />
              {about.cta}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter locale={locale} dict={dict} showCta={false} />
    </>
  );
}
