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
            flex: 1,
            alignItems: "center",
            gap: 52,
            padding: "40px 56px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 17,
                letterSpacing: 4,
                color: CARD.mute,
              }}
            >
              REEL 2025
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 12,
                fontFamily: "Archivo",
                fontWeight: 700,
                fontSize: 62,
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
                marginTop: 16,
                fontSize: 24,
                lineHeight: 1.3,
                color: CARD.mute,
                maxWidth: 460,
              }}
            >
              Motion designer, character animator and 3D generalist
            </div>
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              width: CARD.thumbWidth,
              height: CARD.thumbHeight,
              background: "#14161a",
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid rgba(236,237,234,0.18)",
            }}
          >
            {frame ? (
              <img
                src={frame}
                alt=""
                width={CARD.thumbWidth}
                height={CARD.thumbHeight}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : null}

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
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  background: "rgba(9,10,11,0.55)",
                  border: "2px solid rgba(236,237,234,0.75)",
                  paddingLeft: 6,
                }}
              >
                <img src={PLAY_ICON} alt="" width={26} height={30} />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            margin: "0 56px",
            borderTop: "1px solid rgba(236,237,234,0.16)",
            padding: "20px 0 40px",
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
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivoBold, style: "normal", weight: 700 },
      ],
    },
  );
}
