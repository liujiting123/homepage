/** Shared site metadata. */
export const BLUR_FADE_DELAY = 0.05;

export const siteConfig = {
  // Vercel overrides this in production when a custom deployment URL is needed.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jitingliu.com",
  lastUpdated: "2026.09",
  // Use the same PNG avatar on the homepage and in link previews.
  avatarUrl: "/avatar.png",
  ogAvatarUrl: "/avatar.png",
  blog: {
    postsPerPage: 6,
  },
} as const;
