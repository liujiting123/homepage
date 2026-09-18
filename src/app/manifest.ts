import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import enMessages from "@/i18n/messages/en/personal.json";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: enMessages.name.full,
    short_name: enMessages.name.full,
    description: enMessages.headline.replace(/\n/g, ", "),
    start_url: `${siteConfig.url}/en/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    scope: `${siteConfig.url}/`,
    lang: "en",
    icons: [
      {
        src: `${siteConfig.url}/favicon.ico`,
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
