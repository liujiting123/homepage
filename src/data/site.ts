/** Site data only. The template layout and components are unchanged. */
export const BLUR_FADE_DELAY = 0.05;

export const siteConfig = {
  // Set this to the actual deployed URL; no production domain is assumed.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  lastUpdated: "2026.09",
  // A transparent PNG keeps the original avatar slot and OG-image reader valid.
  // Replace this asset with the owner's portrait when one is supplied.
  avatarUrl: "/me.png",
  blog: {
    postsPerPage: 6,
  },
} as const;
