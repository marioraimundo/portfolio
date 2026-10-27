export type SocialIcon =
  | "linkedin"
  | "behance"
  | "instagram"
  | "artstation";

export const site = {
  name: "Mario Raimundo",
  url: "https://marioraimundo.vercel.app",
  year: 2026,
  portfolioUrl: "https://marioraimundo.myportfolio.com/",
  contactUrl: "https://marioraimundo.myportfolio.com/contact",
  reelUrl: "https://youtu.be/I4ga8J_1MUk",
  reelId: "I4ga8J_1MUk",
  whatsapp: "5521995999574",
  email: "mario@raimundo.com.br",
  socials: [
    {
      label: "LinkedIn",
      icon: "linkedin" as SocialIcon,
      href: "https://www.linkedin.com/in/mario-raimundo-445a5596/",
    },
    {
      label: "Behance",
      icon: "behance" as SocialIcon,
      href: "https://behance.net/marioraimundo",
    },
    {
      label: "Instagram",
      icon: "instagram" as SocialIcon,
      href: "https://www.instagram.com/marioraimundo_/",
    },
    {
      label: "ArtStation",
      icon: "artstation" as SocialIcon,
      href: "https://mario_raimundo.artstation.com/",
    },
  ],
} as const;
