import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CARD, PLAY_ICON, reelFrameDataUri } from "@/lib/og-card";

export const alt = "Mario Raimundo — Motion designer";
export const size = { width: CARD.width, height: CARD.height };
export const contentType = "image/png";

const archivoBold = await readFile(
  join(process.cwd(), "assets/fonts/Archivo-Bold.ttf"),
);

export default async function Image() {
  const frame = await reelFrameDataUri();

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
          {frame ? (
            <img
              src={frame}
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
            {CARD.bars.map((color) => (
              <div
                key={color}
                style={{ display: "flex", flex: 1, background: color }}
              />
            ))}
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
            REEL 2025
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
                width: 104,
                height: 104,
                borderRadius: 52,
                background: "rgba(9,10,11,0.55)",
                border: "2px solid rgba(236,237,234,0.75)",
                paddingLeft: 8,
              }}
            >
              <img src={PLAY_ICON} alt="" width={34} height={38} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "34px 56px 30px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 17,
                letterSpacing: 4,
                color: CARD.mute,
              }}
            >
              MOTION DESIGN
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                fontFamily: "Archivo",
                fontWeight: 700,
                fontSize: 66,
                lineHeight: 1,
                letterSpacing: -2,
                color: CARD.paper,
              }}
            >
              Mario Raimundo
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 10,
                fontSize: 26,
                color: CARD.mute,
              }}
            >
              Motion designer, character animator and 3D generalist
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              borderTop: "1px solid rgba(236,237,234,0.16)",
              paddingTop: 18,
            }}
          >
            <div style={{ display: "flex", fontSize: 20, color: CARD.mute }}>
              Broadcast · Brand · 3D · Characters
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 1,
                color: CARD.paper,
              }}
            >
              marioraimundo.vercel.app
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
