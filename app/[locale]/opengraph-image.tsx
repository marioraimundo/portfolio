import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Mario Raimundo — Motion designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const archivoBold = await readFile(
  join(process.cwd(), "assets/fonts/Archivo-Bold.ttf"),
);

const INK = "#090a0b";
const PAPER = "#ecedea";
const MUTE = "#8b918c";
const BARS = ["#f2ce1b", "#2b3ae0", "#2fb56b", "#e23a4e", "#1f6b45"];

export default function Image() {
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
          {BARS.map((color) => (
            <div
              key={color}
              style={{ display: "flex", flex: 1, background: color }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 72,
            fontSize: 22,
            letterSpacing: 4,
            color: MUTE,
          }}
        >
          MOTION DESIGN
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 104,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: PAPER,
            maxWidth: 980,
            fontFamily: "Archivo",
            fontWeight: 700,
          }}
        >
          Mario Raimundo
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 36,
            lineHeight: 1.25,
            color: MUTE,
            maxWidth: 900,
          }}
        >
          Motion designer, character animator and 3D generalist
        </div>

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
          <div style={{ display: "flex", fontSize: 22, color: MUTE }}>
            Broadcast · Brand · 3D · Characters
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 2,
              color: PAPER,
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
