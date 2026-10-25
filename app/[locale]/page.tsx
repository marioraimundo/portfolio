import Link from "next/link";
import { notFound } from "next/navigation";
import { ReelStage } from "@/components/reel-stage";
import { RevealText } from "@/components/reveal-text";
import { Rundown } from "@/components/rundown";
import { SiteFooter } from "@/components/site-footer";
import { Ticker } from "@/components/ticker";
import { getDictionary, isLocale } from "@/lib/i18n";
import { featuredProjects, toRundownItems } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const poster = "/reel/reel-2025.jpg";
  const items = toRundownItems(featuredProjects, locale);

  return (
    <>
      <ReelStage
        poster={poster}
        videoLoopSrc="/reel/reel-loop.mp4"
        name={site.name}
        playLabel={dict.hero.play}
        positioning={dict.hero.positioning}
      />

      <section className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-10">
        <p
          data-reveal
          className="measure text-[clamp(1.15rem,2.1vw,1.6rem)] leading-[1.4] tracking-[-0.01em]"
        >
          {dict.statement}
        </p>
      </section>

      <div data-reveal className="mt-14 sm:mt-16">
        <Ticker label={dict.tickerLabel} locale={locale} />
      </div>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 className="display text-[clamp(1.6rem,3.6vw,2.5rem)]">
            <RevealText text={dict.work.selected} />
          </h2>
          <Link
            href={`/${locale}/work`}
            data-reveal
            data-reveal-delay="120"
            className="shrink-0 text-sm text-mute underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
          >
            {dict.work.all}
          </Link>
        </div>

        <Rundown
          items={items}
          locale={locale}
          labels={{
            client: dict.work.client,
            discipline: dict.work.discipline,
            year: dict.work.year,
            index: dict.work.index,
          }}
        />
      </section>

      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
