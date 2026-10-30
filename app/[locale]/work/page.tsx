import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RevealText } from "@/components/reveal-text";
import { Rundown } from "@/components/rundown";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { projects, toRundownItems } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return pageMetadata({
    locale,
    path: "/work",
    title: `${dict.work.title} — ${dict.meta.title}`,
    description: dict.meta.description,
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const items = toRundownItems(projects, locale);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 sm:pt-14 lg:px-10">
        <header className="flex items-baseline justify-between gap-4">
          <h1 className="display text-[clamp(2.25rem,6vw,4.5rem)]">
            <RevealText text={dict.work.title} />
          </h1>
          <p data-reveal data-reveal-delay="120" className="data shrink-0 text-mute">
            {dict.work.count(projects.length)}
          </p>
        </header>

        <div className="mt-8">
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
        </div>
      </section>

      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
