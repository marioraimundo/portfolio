"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ColorBars } from "@/components/color-bars";
import { RevealText } from "@/components/reveal-text";
import { SiteFooter } from "@/components/site-footer";
import { dictionaries } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname() ?? "/en";
  const locale = pathname.split("/").filter(Boolean)[0] === "pt" ? "pt" : "en";

  const copy =
    locale === "pt"
      ? {
          title: "Esse frame não existe.",
          body: "O endereço não corresponde a nenhum projeto. Volte para o índice.",
          cta: "Ver trabalhos",
        }
      : {
          title: "This frame doesn't exist.",
          body: "The address doesn't match any project. Go back to the index.",
          cta: "See the work",
        };

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-10">
        <div className="w-16 pb-4" aria-hidden="true">
          <ColorBars className="h-1" />
        </div>
        <p className="data text-mute">404</p>
        <h1 className="display mt-3 text-[clamp(2rem,6vw,4rem)]">
          <RevealText text={copy.title} delay={80} />
        </h1>
        <p className="measure mt-4 text-mute">{copy.body}</p>
        <Link
          href={`/${locale}/work`}
          className="mt-8 inline-block border border-paper/20 px-5 py-3 text-sm transition-colors hover:border-paper/60"
        >
          {copy.cta}
        </Link>
      </section>

      <SiteFooter locale={locale} dict={dictionaries[locale]} showCta={false} />
    </>
  );
}
