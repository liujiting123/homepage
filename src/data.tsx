import { Icons } from "@/components/icons";
import { siteConfig } from "@/data/site";

export const DATA = {
  url: siteConfig.url,
  lastUpdated: siteConfig.lastUpdated,
  name: "Jiting Liu",
  description: "Robot Learning & Embodied AI",
  chinese: {
    name: "刘纪霆",
  },
  navbar: [
    { href: "/", icon: Icons.home, label: "Home" },
    { href: "/resume.pdf", icon: Icons.fileuser, label: "CV" },
  ],
  // Location is not inferred from temporary research visits.
  location: "",
  locationLink: "",
  discover: [
    {
      name: "Template",
      url: "https://github.com/zhengzangw/nextjs-portfolio-blog-research",
    },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/liujiting123",
        icon: Icons.github,
        footer: true,
      },
      X: {
        name: "X",
        url: "",
        icon: Icons.x,
        footer: false,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "",
        icon: Icons.linkedin,
        footer: false,
      },
      email: {
        name: "Email",
        url: "mailto:liujiting616@gmail.com",
        icon: Icons.email,
        footer: false,
      },
    },
  },
} as const;

export function getEmail(): string {
  return DATA.contact.social.email.url;
}
