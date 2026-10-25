import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteBuilder } from "@/components/quote-builder";
import { RevealText } from "@/components/reveal-text";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: `${dict.nav.quote} — ${dict.meta.title}`,
    description: dict.quote.intro,
  };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 pt-14 sm:px-6 sm:pt-20 lg:px-10">
        <p data-reveal className="data text-mute">
          {dict.nav.quote}
        </p>

        <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.5rem,8vw,6rem)]">
          <RevealText text={dict.quote.title} delay={80} />
        </h1>

        <p
          data-reveal
          data-reveal-delay="140"
          className="measure mt-6 text-lg leading-relaxed text-mute"
        >
          {dict.quote.intro}
        </p>

        <QuoteBuilder strings={dict.quote} locale={locale} />
      </section>

      <SiteFooter locale={locale} dict={dict} showCta={false} />
    </>
  );
}
