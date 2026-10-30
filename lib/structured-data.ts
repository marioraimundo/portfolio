import { site } from "./site";

function absolute(url: string) {
  return url.startsWith("http") ? url : `${site.url}${url}`;
}

export function structuredData() {
  const personId = `${site.url}/#person`;
  const businessId = `${site.url}/#business`;
  const websiteId = `${site.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        image: `${site.url}/about/mario-raimundo-2026.jpg`,
        email: `mailto:${site.email}`,
        jobTitle: "Motion designer",
        description:
          "Motion designer, character animator and 3D generalist based in Rio de Janeiro, working across broadcast packages, brand films, 3D and character animation.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rio de Janeiro",
          addressCountry: "BR",
        },
        worksFor: {
          "@type": "Organization",
          name: "Globo",
        },
        knowsAbout: [
          "Motion design",
          "Broadcast design",
          "3D animation",
          "Character animation",
          "Rigging",
          "Compositing",
          "Blender",
          "After Effects",
        ],
        sameAs: site.socials.map((social) => social.href),
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: `${site.name} — Motion Design`,
        url: site.url,
        image: `${site.url}/about/mario-raimundo-2026.jpg`,
        description:
          "Motion design, broadcast packages, brand films and 3D animation for agencies, broadcasters and brands.",
        email: `mailto:${site.email}`,
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rio de Janeiro",
          addressCountry: "BR",
        },
        areaServed: [
          { "@type": "Country", name: "Brazil" },
          { "@type": "Place", name: "Worldwide" },
        ],
        knowsLanguage: ["pt-BR", "en"],
        sameAs: site.socials.map((social) => social.href),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        inLanguage: ["en", "pt-BR"],
        publisher: { "@id": personId },
      },
    ],
  };
}

type ProjectLike = {
  slug: string;
  client: string;
  title: string;
  year: string;
  poster: string;
  tags: string[];
  brief: Record<"en" | "pt", string>;
};

export function projectStructuredData({
  project,
  locale,
  discipline,
}: {
  project: ProjectLike;
  locale: "en" | "pt";
  discipline: string;
}) {
  const url = `${site.url}/${locale}/work/${project.slug}`;
  const name = `${project.client} — ${project.title}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${site.url}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "pt" ? "Trabalhos" : "Work",
            item: `${site.url}/${locale}/work`,
          },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name,
        headline: name,
        description: project.brief[locale],
        url,
        image: absolute(project.poster),
        dateCreated: project.year,
        creator: { "@id": `${site.url}/#person` },
        inLanguage: locale === "pt" ? "pt-BR" : "en",
        genre: project.tags,
        keywords: discipline,
        isPartOf: { "@id": `${site.url}/#website` },
      },
    ],
  };
}
