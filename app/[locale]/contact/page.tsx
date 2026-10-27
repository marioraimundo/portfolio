import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { RevealText } from "@/components/reveal-text";
import { SiteFooter } from "@/components/site-footer";
import { SocialLinks } from "@/components/social-links";
import { getDictionary, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: `${dict.nav.contact} — ${dict.meta.title}`,
    description: dict.contact.body,
  };
}

export default async function ContactPage({
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
          {dict.role}
        </p>

        <div className="mt-6 grid gap-12 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] xl:gap-12">
          <div>
            <h1 className="display max-w-[14ch] text-[clamp(2.5rem,8vw,6rem)]">
              <RevealText
                text={dict.contact.titleLines.join("\n")}
                delay={80}
                animateLastWord
              />
            </h1>

            <p
              data-reveal
              data-reveal-delay="160"
              className="measure mt-8 text-lg leading-relaxed"
            >
              {dict.contact.body}
            </p>
          </div>

          <div data-reveal data-reveal-delay="220" className="max-w-[36rem]">
            <ContactForm strings={dict.contact.form} />

            <p className="data mt-4 text-mute">{dict.contact.reply}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/12 pt-5">
              <Link
                href={`/${locale}/quote`}
                className="group data inline-flex items-center gap-2 text-paper/70 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
              >
                {dict.contact.quoteCta}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-mute underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
              >
                {site.email}
              </a>
            </div>

            <SocialLinks className="mt-5" />
          </div>
        </div>
      </section>

      <SiteFooter locale={locale} dict={dict} showCta={false} />
    </>
  );
}
