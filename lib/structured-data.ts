import { site } from "./site";

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
