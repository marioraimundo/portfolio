import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { site } from "./site";

type PageMetadataInput = {
  locale: Locale;
  /** Path after the locale, e.g. "/about" or "/work/volkswagen-maxi-performance". */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonical = `/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `/en${path}`,
        pt: `/pt${path}`,
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      siteName: site.name,
      url: canonical,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
