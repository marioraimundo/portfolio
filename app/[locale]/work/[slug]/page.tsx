import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectPlayer } from "@/components/project-player";
import { ProjectPreview } from "@/components/project-preview";
import { RevealText } from "@/components/reveal-text";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import {
  getNextProject,
  getProject,
  projects,
  tagLabels,
} from "@/lib/projects";
import { site } from "@/lib/site";

const PROJECT_ACCENTS = [
  "bg-bar-y",
  "bg-bar-b",
  "bg-bar-g",
  "bg-bar-r",
  "bg-bar-dg",
];

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.client} — ${project.title}`,
    description: project.brief[locale],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const next = getNextProject(slug);
  const index = projects.findIndex((item) => item.slug === slug);
  const nextIndex = (index + 1) % projects.length;
  const prevIndex = (index - 1 + projects.length) % projects.length;
  const prev = projects[prevIndex];
  const nextAccent = PROJECT_ACCENTS[nextIndex % PROJECT_ACCENTS.length];
  const prevAccent = PROJECT_ACCENTS[prevIndex % PROJECT_ACCENTS.length];
  const disciplines =
    project.discipline?.[locale] ??
    project.tags.map((tag) => tagLabels[tag][locale]).join(", ");

  const spec = [
    { label: dict.project.client, value: project.client },
    { label: dict.project.year, value: project.year },
    { label: dict.project.discipline, value: disciplines },
  ];

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 lg:px-10">
        <Link
          href={`/${locale}/work`}
          className="data text-mute transition-colors hover:text-paper"
        >
          {dict.project.back}
        </Link>

        <div className="mt-6 flex items-baseline justify-between gap-4">
          <p className="data text-mute">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </p>
          <p className="data text-mute">{project.year}</p>
        </div>

        <h1 className="display mt-2 text-[clamp(2.25rem,7vw,5.5rem)]">
          <RevealText text={project.client} delay={80} />
        </h1>
        <p className="mt-1 text-lg text-mute">{project.title}</p>

        <div className="mt-8 grid gap-8 border-t border-paper/15 pt-8 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
          <div className="h-fit lg:sticky lg:top-24">
            <p className="measure text-base leading-relaxed">
              {project.brief[locale]}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={`/${locale}/quote`}
                className="group inline-flex items-center gap-3 bg-paper px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper/85"
              >
                {dict.project.start}
                <span
                  aria-hidden="true"
                  className="h-[3px] w-6 bg-bar-b transition-all duration-200 group-hover:w-9"
                />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="data text-mute underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
              >
                {dict.project.emailCta}
              </a>
            </div>

            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-3 border border-paper/20 px-4 py-2.5 text-sm transition-colors hover:border-paper/60"
              >
                <span
                  aria-hidden="true"
                  className="h-[3px] w-6 bg-bar-b transition-all duration-200 group-hover:w-9"
                />
                {dict.project.watch}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}

            {!project.videoId && !project.videoSrc && (
              <p className="data mt-3 text-mute">{dict.project.note}</p>
            )}

            <dl className="mt-8 border-t border-paper/15">
              {spec.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-paper/15 py-3"
                >
                  <dt className="data shrink-0 text-mute">{row.label}</dt>
                  <dd className="text-right text-sm">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="frame relative aspect-video w-full self-start bg-ink-2">
            <ProjectPlayer
              poster={project.poster}
              videoId={project.videoId}
              videoSrc={project.videoSrc}
              alt={`${project.client} — ${project.title}`}
              playLabel={dict.project.play}
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 border-t border-paper/15 pb-8 pt-8 md:grid-cols-2 md:gap-12">
          <ProjectPreview
            locale={locale}
            project={prev}
            label={dict.project.previous}
            accent={prevAccent}
          />
          <ProjectPreview
            locale={locale}
            project={next}
            label={dict.project.next}
            accent={nextAccent}
            align="right"
          />
        </div>
      </div>

      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
