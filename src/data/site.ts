/** Shared site metadata. */
export const BLUR_FADE_DELAY = 0.05;

export const siteConfig = {
  // Vercel overrides this in production when a custom deployment URL is needed.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jitingliu.com",
  lastUpdated: "2026.09",
  // Public profile portrait (optimized WebP).
  avatarUrl: "/me.webp",
  // Square PNG variant for the OG card, whose renderer cannot decode WebP.
  ogAvatarUrl: "/me-og.png",
  blog: {
    postsPerPage: 6,
  },
} as const;
