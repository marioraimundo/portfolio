import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/quote", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const languageAlternates = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${site.url}/${locale}${path}`]),
    ),
  });

  const pages = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: languageAlternates(route.path),
    })),
  );

  const work = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: languageAlternates(`/work/${project.slug}`),
    })),
  );

  return [...pages, ...work];
}
