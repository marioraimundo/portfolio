import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/lib/i18n";
import { CARD, PLAY_ICON, posterDataUri } from "@/lib/og-card";
import { getProject, projects, tagLabels } from "@/lib/projects";

export const alt = "Selected work — Mario Raimundo";
export const size = { width: CARD.width, height: CARD.height };
export const contentType = "image/png";

const archivoBold = await readFile(
  join(process.cwd(), "assets/fonts/Archivo-Bold.ttf"),
);

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
  const accent = CARD.bars[(index < 0 ? 0 : index) % CARD.bars.length];

  const client = project?.client ?? "Mario Raimundo";
  const title = project?.title ?? "";
  const year = project?.year ?? "";
  const language = isLocale(locale) ? locale : "en";
  const discipline =
    project?.discipline?.[language] ??
    project?.tags.map((tag) => tagLabels[tag][language]).join(", ") ??
    "";

  const poster = await posterDataUri(project?.poster);

  const clientSize =
    client.length > 20 ? 50 : client.length > 14 ? 58 : client.length > 9 ? 64 : 70;

  const clippedDiscipline =
    discipline.length > 64 ? `${discipline.slice(0, 63)}…` : discipline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: CARD.ink,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: CARD.frameHeight,
            position: "relative",
            background: "#14161a",
            overflow: "hidden",
          }}
        >
          {poster ? (
            <img
              src={poster}
              alt=""
              width={CARD.width}
              height={CARD.frameHeight}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : null}

          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 8,
            }}
          >
            <div style={{ display: "flex", flex: 1, background: accent }} />
          </div>

          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 34,
              left: 44,
              padding: "8px 16px",
              background: "rgba(9,10,11,0.72)",
              color: CARD.paper,
              fontSize: 18,
              letterSpacing: 3,
            }}
          >
            SELECTED WORK · {year}
          </div>

          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 92,
                height: 92,
                borderRadius: 46,
                background: "rgba(9,10,11,0.55)",
                border: "2px solid rgba(236,237,234,0.75)",
                paddingLeft: 7,
              }}
            >
              <img src={PLAY_ICON} alt="" width={30} height={34} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "30px 56px 28px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo",
                fontWeight: 700,
                fontSize: clientSize,
                lineHeight: 1.02,
                letterSpacing: -2,
                color: CARD.paper,
                maxWidth: 1040,
              }}
            >
              {client}
            </div>
            {title ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontSize: 28,
                  color: CARD.mute,
                  maxWidth: 1000,
                }}
              >
                {title}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              borderTop: "1px solid rgba(236,237,234,0.16)",
              paddingTop: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 19,
                color: CARD.mute,
                maxWidth: 780,
              }}
            >
              {clippedDiscipline}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                letterSpacing: 2,
                color: CARD.paper,
              }}
            >
              MARIO RAIMUNDO
            </div>
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
