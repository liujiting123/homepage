/** Site data only. The template layout and components are unchanged. */
export const BLUR_FADE_DELAY = 0.05;

export const siteConfig = {
  // Vercel overrides this in production when a custom deployment URL is needed.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jitingliu.com",
  lastUpdated: "2026.09",
  // Public profile portrait.
  avatarUrl: "/me.png",
  blog: {
    postsPerPage: 6,
  },
} as const;
