import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/lib/i18n";
import { getProject, projects, tagLabels } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const archivoBold = await readFile(
  join(process.cwd(), "assets/fonts/Archivo-Bold.ttf"),
);

const INK = "#090a0b";
const PAPER = "#ecedea";
const MUTE = "#8b918c";
const BARS = ["#f2ce1b", "#2b3ae0", "#2fb56b", "#e23a4e", "#1f6b45"];

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  const index = projects.findIndex((item) => item.slug === slug);
  const accent = BARS[(index < 0 ? 0 : index) % BARS.length];

  const client = project?.client ?? "Mario Raimundo";
  const title = project?.title ?? "";
  const year = project?.year ?? "";
  const language = isLocale(locale) ? locale : "en";
  const discipline =
    project?.discipline?.[language] ??
    project?.tags.map((tag) => tagLabels[tag][language]).join(", ") ??
    "";

  const clientSize =
    client.length > 18 ? 68 : client.length > 12 ? 84 : client.length > 8 ? 96 : 108;

  const clippedDiscipline =
    discipline.length > 58 ? `${discipline.slice(0, 57)}…` : discipline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: INK,
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", width: "100%", height: 10 }}>
          <div style={{ display: "flex", flex: 1, background: accent }} />
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 64,
            fontSize: 21,
            letterSpacing: 4,
            color: MUTE,
          }}
        >
          SELECTED WORK · {year}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: clientSize,
            lineHeight: 1.02,
            letterSpacing: -2,
            color: PAPER,
            maxWidth: 1010,
            fontFamily: "Archivo",
            fontWeight: 700,
          }}
        >
          {client}
        </div>

        {title ? (
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 38,
              lineHeight: 1.2,
              color: MUTE,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 28,
            borderTop: "1px solid rgba(236,237,234,0.16)",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 21,
              color: MUTE,
              maxWidth: 760,
            }}
          >
            {clippedDiscipline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 2,
              color: PAPER,
            }}
          >
            MARIO RAIMUNDO
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivoBold, style: "normal", weight: 700 },
      ],
    },
  );
}
