import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Loads a project poster as a data URI so ImageResponse can render it. */
export async function posterDataUri(poster?: string): Promise<string | null> {
  if (!poster) return null;

  try {
    if (poster.startsWith("/")) {
      const file = await readFile(join(process.cwd(), "public", poster));
      const type = poster.endsWith(".png")
        ? "image/png"
        : poster.endsWith(".webp")
          ? "image/webp"
          : "image/jpeg";
      return `data:${type};base64,${file.toString("base64")}`;
    }

    const response = await fetch(poster);
    if (!response.ok) return null;
    const type = response.headers.get("content-type") ?? "image/jpeg";
    const buffer = Buffer.from(await response.arrayBuffer());
    return `data:${type};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function reelFrameDataUri(): Promise<string | null> {
  return posterDataUri("/reel/og-frame.jpg");
}

export const PLAY_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38"><path d="M2 2 L32 19 L2 36 Z" fill="#ecedea"/></svg>`,
  );

export const CARD = {
  width: 1200,
  height: 630,
  ink: "#090a0b",
  paper: "#ecedea",
  mute: "#8b918c",
  bars: ["#f2ce1b", "#2b3ae0", "#2fb56b", "#e23a4e", "#1f6b45"],
  frameHeight: 372,
} as const;
