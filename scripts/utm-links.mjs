// Generates UTM-tagged links for every channel, so Vercel Analytics can tell
// Instagram from LinkedIn, Behance, email, etc.
//
// Run: node --experimental-strip-types scripts/utm-links.mjs

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { projects } = await import(
  new URL("../lib/projects.ts", import.meta.url).href
);

const BASE = "https://marioraimundo.vercel.app";

const channels = [
  { source: "instagram", medium: "social" },
  { source: "tiktok", medium: "social" },
  { source: "linkedin", medium: "social" },
  { source: "youtube", medium: "video" },
  { source: "behance", medium: "portfolio-platform" },
  { source: "artstation", medium: "portfolio-platform" },
  { source: "email", medium: "email" },
];

const withUtm = (path, source, medium, campaign) => {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
};

const rows = [["channel", "locale", "page", "slug", "url"]];

for (const channel of channels) {
  for (const locale of ["en", "pt"]) {
    rows.push([
      channel.source,
      locale,
      "home",
      "",
      withUtm(`/${locale}`, channel.source, channel.medium, "portfolio"),
    ]);
    rows.push([
      channel.source,
      locale,
      "work",
      "",
      withUtm(`/${locale}/work`, channel.source, channel.medium, "work-index"),
    ]);
    rows.push([
      channel.source,
      locale,
      "quote",
      "",
      withUtm(`/${locale}/quote`, channel.source, channel.medium, "quote"),
    ]);

    for (const project of projects) {
      rows.push([
        channel.source,
        locale,
        "project",
        project.slug,
        withUtm(
          `/${locale}/work/${project.slug}`,
          channel.source,
          channel.medium,
          `project-${project.slug}`,
        ),
      ]);
    }
  }
}

const csv = rows
  .map((row) => row.map((value) => `"${value}"`).join(","))
  .join("\r\n");

mkdirSync(join(root, "marketing"), { recursive: true });
writeFileSync(join(root, "marketing/project-links.csv"), `\uFEFF${csv}\r\n`);

console.log(`Wrote ${rows.length - 1} UTM links to marketing/project-links.csv`);
